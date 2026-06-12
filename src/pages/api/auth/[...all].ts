import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";

export const prerender = false;

// Log every BetterAuth-handled request (sign-in, OAuth callback, MCP
// register/authorize/token, etc.) so the trail of a claude.ai connection
// attempt is reconstructable from `docker logs zaftech`.
export const ALL: APIRoute = async (ctx) => {
  const { request } = ctx;
  const url = new URL(request.url);
  const tag = `[auth:${url.pathname.replace(/^\/api\/auth\//, "")}]`;
  const ua = request.headers.get("user-agent") ?? "—";
  console.log(`${tag} ${request.method} ${url.pathname}${url.search}  ua="${ua}"`);

  ctx.request.headers.set("x-forwarded-for", ctx.clientAddress);
  try {
    const res = await auth.handler(ctx.request);
    const loc = res.headers.get("location");
    console.log(`${tag} → ${res.status}${loc ? ` location=${loc}` : ""}`);
    return res;
  } catch (err) {
    console.error(`${tag} handler threw:`, err);
    throw err;
  }
};
