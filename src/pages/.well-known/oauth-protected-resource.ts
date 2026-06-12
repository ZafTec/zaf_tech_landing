import type { APIRoute } from "astro";
import { oAuthProtectedResourceMetadata } from "better-auth/plugins";
import { auth } from "@/lib/auth";

export const prerender = false;

const handler = oAuthProtectedResourceMetadata(auth);

export const GET: APIRoute = async ({ request }) => {
  const ua = request.headers.get("user-agent") ?? "—";
  console.log(`[well-known:oauth-protected-resource] GET  ua="${ua}"`);
  const res = await handler(request);
  console.log(`[well-known:oauth-protected-resource] → ${res.status}`);
  return res;
};
