import type { APIRoute } from "astro";
import { buildClearSessionCookie } from "@/lib/admin/session";

export const prerender = false;

const logout = () =>
  new Response(null, {
    status: 302,
    headers: {
      Location: "/admin/login",
      "Set-Cookie": buildClearSessionCookie(),
    },
  });

export const GET: APIRoute = () => logout();
export const POST: APIRoute = () => logout();
