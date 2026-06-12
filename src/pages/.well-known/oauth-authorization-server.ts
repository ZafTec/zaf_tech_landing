import type { APIRoute } from "astro";
import { oAuthDiscoveryMetadata } from "better-auth/plugins";
import { auth } from "@/lib/auth";

export const prerender = false;

const handler = oAuthDiscoveryMetadata(auth);

export const GET: APIRoute = async ({ request }) => {
  const ua = request.headers.get("user-agent") ?? "—";
  console.log(`[well-known:oauth-authorization-server] GET  ua="${ua}"`);
  const res = await handler(request);
  console.log(`[well-known:oauth-authorization-server] → ${res.status}`);
  return res;
};
