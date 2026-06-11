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

// Determine the public-facing origin of THIS server, respecting reverse
// proxies. BetterAuth's `BETTER_AUTH_URL` is the authoritative source in
// production; we fall back to `x-forwarded-proto` + `host` headers, then
// the request URL. This is critical for the WWW-Authenticate discovery URL
// — clients refuse to follow http:// links pointed at https-only sites.
const publicOrigin = (request: Request): string => {
  const fromEnv = process.env.BETTER_AUTH_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (proto && host) return `${proto}://${host}`;
  return new URL(request.url).origin;
};

const unauthorized = (request: Request) => {
  // RFC 6750 + MCP: include a WWW-Authenticate header pointing to the
  // protected resource metadata so clients can discover the OAuth server.
  const metadataUrl = `${publicOrigin(request)}/.well-known/oauth-protected-resource`;
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
      "WWW-Authenticate": `Bearer resource_metadata="${metadataUrl}"`,
    },
  });
};

const getAuthedAdminEmail = async (request: Request): Promise<string | null> => {
  const session = await auth.api.getMcpSession({ headers: request.headers });
  if (!session?.userId) return null;
  if (!db) return null;
  const rows = (await db`SELECT email FROM "user" WHERE id = ${session.userId} LIMIT 1;`) as Array<{ email: string }>;
  const email = rows[0]?.email?.toLowerCase();
  if (!email) return null;
  if (!(await isAdmin(email))) return null;
  return email;
};

const handleRpc = async (req: RpcRequest, adminEmail: string): Promise<RpcResult | RpcError> => {
  try {
    switch (req.method) {
      case "initialize": {
        return rpcOk(req.id, {
          protocolVersion: SUPPORTED_PROTOCOL,
          serverInfo: { name: "zaftech-admin-mcp", version: "1.0.0" },
          capabilities: { tools: { listChanged: false } },
        });
      }
      case "ping": {
        return rpcOk(req.id, {});
      }
      case "tools/list": {
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
        if (!tool) return rpcErr(req.id, -32601, `Unknown tool: ${name}`);
        try {
          const result = await tool.handler(params.arguments ?? {}, { adminEmail });
          return rpcOk(req.id, {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          console.warn(`[mcp] tool ${name} failed for ${adminEmail}:`, message);
          return rpcOk(req.id, {
            isError: true,
            content: [{ type: "text", text: `Error: ${message}` }],
          });
        }
      }
      // The runtime no-ops below are required by some MCP clients during the
      // initialize/teardown handshake.
      case "notifications/initialized":
      case "notifications/cancelled": {
        return rpcOk(req.id, {});
      }
      default:
        return rpcErr(req.id, -32601, `Method not found: ${req.method}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[mcp] handler crashed for ${req.method}:`, err);
    return rpcErr(req.id, -32603, "Internal error", { detail: message });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const adminEmail = await getAuthedAdminEmail(request);
  if (!adminEmail) return unauthorized(request);

  let payload: RpcRequest | RpcRequest[];
  try {
    payload = (await request.json()) as RpcRequest | RpcRequest[];
  } catch {
    return json(rpcErr(null, -32700, "Parse error"), 400);
  }

  if (Array.isArray(payload)) {
    const responses = await Promise.all(payload.map((req) => handleRpc(req, adminEmail)));
    return json(responses);
  }
  const response = await handleRpc(payload, adminEmail);
  return json(response);
};

export const GET: APIRoute = async ({ request }) => {
  // Some clients probe GET for SSE — we don't support streaming yet, but
  // returning 405 with the standard WWW-Authenticate keeps discovery happy.
  const adminEmail = await getAuthedAdminEmail(request);
  if (!adminEmail) return unauthorized(request);
  return json({ error: "Use POST for JSON-RPC. SSE/streaming transport is not implemented." }, 405);
};

// CORS preflight. claude.ai sends OPTIONS on behalf of the user's browser
// before issuing the POST; without this it sees a network error.
export const OPTIONS: APIRoute = async ({ request }) => {
  const origin = request.headers.get("origin") ?? "*";
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
