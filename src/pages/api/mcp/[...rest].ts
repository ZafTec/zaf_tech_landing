// Minimal JSON-RPC 2.0 / MCP endpoint.
// Spec: https://modelcontextprotocol.io/specification/2024-11-05
//
// Auth flow:
//   1. Client obtains an OAuth access token from BetterAuth's MCP plugin
//      (discovery at /.well-known/oauth-authorization-server, registration
//      and token endpoints under /api/auth/mcp/*).
//   2. Client sends Bearer <token> on every request to this endpoint.
//   3. We resolve the token to a (userId) via auth.api.getMcpSession,
//      look up that user's email, and confirm they're in the `admins`
//      table. Non-admins get 403.

import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin/admins";
import { TOOLS, TOOLS_BY_NAME } from "@/lib/admin/mcp-tools";
import { db } from "@/lib/db";
import { publicUrl } from "@/lib/public-url";

export const prerender = false;

const SUPPORTED_PROTOCOL = "2024-11-05";

type RpcRequest = { jsonrpc: "2.0"; id?: string | number | null; method: string; params?: unknown };
type RpcResult = { jsonrpc: "2.0"; id: string | number | null; result: unknown };
type RpcError = { jsonrpc: "2.0"; id: string | number | null; error: { code: number; message: string; data?: unknown } };

const json = (body: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });

const rpcOk = (id: string | number | null | undefined, result: unknown): RpcResult => ({
  jsonrpc: "2.0",
  id: id ?? null,
  result,
});
const rpcErr = (
  id: string | number | null | undefined,
  code: number,
  message: string,
  data?: unknown,
): RpcError => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message, ...(data !== undefined ? { data } : {}) } });

// Brief request label used in every log line so traces are correlatable.
// IMPORTANT: compute once per request and pass it through — never call this
// twice on the same request, or the random fallback will hand out two
// different IDs and the log trail becomes impossible to follow.
const makeReqId = (request: Request): string =>
  request.headers.get("mcp-session-id") ??
  request.headers.get("x-request-id") ??
  Math.random().toString(36).slice(2, 8);

const unauthorized = (id: string, reason: string) => {
  const metadataUrl = `${publicUrl("/.well-known/oauth-protected-resource")}`;
  console.warn(`[mcp:${id}] 401 ${reason} — resource_metadata=${metadataUrl}`);
  return new Response(JSON.stringify({ error: "unauthorized", reason }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
      "WWW-Authenticate": `Bearer resource_metadata="${metadataUrl}"`,
    },
  });
};

const forbidden = (id: string, email: string) => {
  console.warn(`[mcp:${id}] 403 ${email} is not on the admins list`);
  return json({ error: "forbidden", reason: "not_admin", email }, 403);
};

/** Walk the bearer token → session → user → admin chain, logging each step. */
const getAuthedAdminEmail = async (request: Request, id: string): Promise<string | null> => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    console.warn(`[mcp:${id}] no Authorization header`);
    return null;
  }
  if (!authHeader.toLowerCase().startsWith("bearer ")) {
    console.warn(`[mcp:${id}] Authorization header is not a Bearer token (got "${authHeader.slice(0, 12)}…")`);
    return null;
  }

  let session;
  try {
    session = await auth.api.getMcpSession({ headers: request.headers });
  } catch (err) {
    console.error(`[mcp:${id}] auth.api.getMcpSession threw:`, err);
    return null;
  }
  if (!session) {
    console.warn(`[mcp:${id}] getMcpSession returned null (token invalid, expired, or audience mismatch)`);
    return null;
  }
  if (!session.userId) {
    console.warn(`[mcp:${id}] session has no userId`, { scopes: session.scopes, clientId: session.clientId });
    return null;
  }
  if (!db) {
    console.error(`[mcp:${id}] DB is not configured; cannot resolve session.userId=${session.userId}`);
    return null;
  }

  const rows = (await db`SELECT email FROM "user" WHERE id = ${session.userId} LIMIT 1;`) as Array<{ email: string }>;
  const email = rows[0]?.email?.toLowerCase();
  if (!email) {
    console.warn(`[mcp:${id}] no user row for userId=${session.userId}`);
    return null;
  }
  if (!(await isAdmin(email))) {
    console.warn(`[mcp:${id}] ${email} is not an admin (session.userId=${session.userId})`);
    // Return the email so the caller can choose 403 vs 401.
    throw Object.assign(new Error("not_admin"), { email });
  }
  console.log(`[mcp:${id}] authed as ${email} (userId=${session.userId})`);
  return email;
};

const handleRpc = async (req: RpcRequest, adminEmail: string, logId: string): Promise<RpcResult | RpcError> => {
  try {
    switch (req.method) {
      case "initialize": {
        console.log(`[mcp:${logId}] initialize from ${adminEmail}`);
        return rpcOk(req.id, {
          protocolVersion: SUPPORTED_PROTOCOL,
          serverInfo: { name: "zaftech-admin-mcp", version: "1.0.0" },
          capabilities: { tools: { listChanged: false } },
        });
      }
      case "ping":
        return rpcOk(req.id, {});
      case "tools/list": {
        console.log(`[mcp:${logId}] tools/list from ${adminEmail}`);
        return rpcOk(req.id, {
          tools: TOOLS.map((t) => ({
            name: t.name,
            description: t.description,
            inputSchema: t.inputSchema,
          })),
        });
      }
      case "tools/call": {
        const params = (req.params ?? {}) as { name?: string; arguments?: Record<string, unknown> };
        const name = params.name;
        if (!name) return rpcErr(req.id, -32602, "Tool name is required");
        const tool = TOOLS_BY_NAME[name];
        if (!tool) {
          console.warn(`[mcp:${logId}] unknown tool requested: ${name}`);
          return rpcErr(req.id, -32601, `Unknown tool: ${name}`);
        }
        console.log(`[mcp:${logId}] tools/call ${name} from ${adminEmail}`);
        try {
          const result = await tool.handler(params.arguments ?? {}, { adminEmail });
          return rpcOk(req.id, {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          console.warn(`[mcp:${logId}] tool ${name} failed for ${adminEmail}: ${message}`);
          return rpcOk(req.id, {
            isError: true,
            content: [{ type: "text", text: `Error: ${message}` }],
          });
        }
      }
      // Some MCP clients send these during init/teardown.
      case "notifications/initialized":
      case "notifications/cancelled":
        return rpcOk(req.id, {});
      default:
        console.warn(`[mcp:${logId}] unknown method: ${req.method}`);
        return rpcErr(req.id, -32601, `Method not found: ${req.method}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[mcp:${logId}] handler crashed for ${req.method}:`, err);
    return rpcErr(req.id, -32603, "Internal error", { detail: message });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const id = makeReqId(request);
  const ua = request.headers.get("user-agent") ?? "—";
  console.log(`[mcp:${id}] POST ${request.url}  ua="${ua}"`);

  let adminEmail: string | null;
  try {
    adminEmail = await getAuthedAdminEmail(request, id);
  } catch (err) {
    // Thrown specifically when the user is authed but not an admin.
    const email = (err as { email?: string }).email ?? "";
    return forbidden(id, email);
  }
  if (!adminEmail) return unauthorized(id, "missing-or-invalid-token");

  let payload: RpcRequest | RpcRequest[];
  try {
    payload = (await request.json()) as RpcRequest | RpcRequest[];
  } catch (err) {
    console.warn(`[mcp:${id}] body is not valid JSON:`, err);
    return json(rpcErr(null, -32700, "Parse error"), 400);
  }

  if (Array.isArray(payload)) {
    const responses = await Promise.all(payload.map((req) => handleRpc(req, adminEmail!, id)));
    return json(responses);
  }
  const response = await handleRpc(payload, adminEmail, id);
  return json(response);
};

export const GET: APIRoute = async ({ request }) => {
  // Some clients probe GET for SSE — we don't support streaming yet.
  const id = makeReqId(request);
  const ua = request.headers.get("user-agent") ?? "—";
  console.log(`[mcp:${id}] GET ${request.url} (SSE not implemented)  ua="${ua}"`);
  let adminEmail: string | null;
  try {
    adminEmail = await getAuthedAdminEmail(request, id);
  } catch (err) {
    const email = (err as { email?: string }).email ?? "";
    return forbidden(id, email);
  }
  if (!adminEmail) return unauthorized(id, "missing-or-invalid-token");
  return json({ error: "Use POST for JSON-RPC. SSE/streaming transport is not implemented." }, 405);
};

// CORS preflight. claude.ai may send OPTIONS on behalf of a user's browser
// before issuing the POST.
export const OPTIONS: APIRoute = async ({ request }) => {
  const id = makeReqId(request);
  const origin = request.headers.get("origin") ?? "*";
  console.log(`[mcp:${id}] OPTIONS preflight from origin=${origin}`);
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "authorization, content-type, mcp-protocol-version, mcp-session-id",
      "Access-Control-Expose-Headers": "www-authenticate, mcp-session-id",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  });
};
