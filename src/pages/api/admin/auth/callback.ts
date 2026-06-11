import type { APIRoute } from "astro";
import { isAdmin } from "@/lib/admin/admins";
import { exchangeCodeForUser } from "@/lib/admin/oauth";
import {
  OAUTH_STATE_COOKIE,
  buildClearStateCookie,
  buildSessionCookie,
  readCookie,
  signSession,
} from "@/lib/admin/session";

export const prerender = false;

const redirectTo = (location: string, setCookies: string[] = []) => {
  const headers = new Headers({ Location: location });
  for (const c of setCookies) headers.append("Set-Cookie", c);
  return new Response(null, { status: 302, headers });
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  if (oauthError) {
    console.warn("[admin/auth] Google returned error:", oauthError);
    return redirectTo(`/admin/login?error=${encodeURIComponent(oauthError)}`, [buildClearStateCookie()]);
  }

  const expectedState = readCookie(request.headers.get("cookie"), OAUTH_STATE_COOKIE);
  if (!code || !state || !expectedState || state !== expectedState) {
    console.warn("[admin/auth] state mismatch", { hasCode: !!code, hasState: !!state, hasCookie: !!expectedState });
    return redirectTo("/admin/login?error=state_mismatch", [buildClearStateCookie()]);
  }

  let user;
  try {
    user = await exchangeCodeForUser(request, code);
  } catch (err) {
    console.error("[admin/auth] exchangeCodeForUser failed:", err);
    const message = err instanceof Error ? err.message : "unknown";
    return redirectTo(
      `/admin/login?error=${encodeURIComponent("exchange_failed")}&detail=${encodeURIComponent(message.slice(0, 120))}`,
      [buildClearStateCookie()],
    );
  }

  const email = user.email.toLowerCase();

  let allowed: boolean;
  try {
    allowed = await isAdmin(email);
  } catch (err) {
    console.error("[admin/auth] isAdmin threw:", err);
    const message = err instanceof Error ? err.message : "unknown";
    return redirectTo(
      `/admin/login?error=db_error&detail=${encodeURIComponent(message.slice(0, 120))}`,
      [buildClearStateCookie()],
    );
  }

  if (!allowed) {
    console.warn(`[admin/auth] Sign-in denied for ${email} (not in admins table)`);
    return redirectTo(`/admin/login?error=not_admin&email=${encodeURIComponent(email)}`, [
      buildClearStateCookie(),
    ]);
  }

  console.log(`[admin/auth] Signed in: ${email}`);
  const session = await signSession(email);
  return redirectTo("/admin", [buildSessionCookie(session), buildClearStateCookie()]);
};
