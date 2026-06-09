import type { APIRoute } from "astro";
import { buildAuthUrl } from "@/lib/admin/oauth";
import { buildStateCookie, randomState } from "@/lib/admin/session";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const state = randomState();
    const url = buildAuthUrl(request, state);
    return new Response(null, {
      status: 302,
      headers: {
        Location: url,
        "Set-Cookie": buildStateCookie(state),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "OAuth not configured";
    return new Response(`OAuth configuration error: ${message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
};
