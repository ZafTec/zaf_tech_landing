import type { AstroGlobal } from "astro";
import type { APIContext } from "astro";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin/admins";

export type AuthedAdmin = {
  email: string;
  userId: string;
  name?: string | null;
  image?: string | null;
};

/**
 * One of three outcomes:
 *  - "ok"       — signed in AND on the admin list. `admin` is populated.
 *  - "denied"   — signed in but the email is not in the admins table. `email`
 *                 is populated so the caller can show "X is not allowed."
 *  - "anon"     — no valid session at all.
 */
export type AdminCheck =
  | { state: "ok"; admin: AuthedAdmin }
  | { state: "denied"; email: string }
  | { state: "anon" };

const extractHeaders = (source: AstroGlobal | APIContext | Request): Headers =>
  source instanceof Request ? source.headers : (source as { request: Request }).request.headers;

export const checkAdmin = async (
  source: AstroGlobal | APIContext | Request,
): Promise<AdminCheck> => {
  const headers = extractHeaders(source);
  let session;
  try {
    session = await auth.api.getSession({ headers });
  } catch (err) {
    console.error("[checkAdmin] getSession failed:", err);
    return { state: "anon" };
  }
  if (!session?.user?.email) return { state: "anon" };

  const email = session.user.email.toLowerCase();
  const allowed = await isAdmin(email);
  if (!allowed) {
    console.warn(`[checkAdmin] denied: ${email} not in admins table`);
    return { state: "denied", email };
  }

  return {
    state: "ok",
    admin: {
      email,
      userId: session.user.id,
      name: session.user.name ?? null,
      image: session.user.image ?? null,
    },
  };
};

/**
 * Convenience: returns the AuthedAdmin or null. For API routes that only need
 * a yes/no answer. Page frontmatter should prefer `checkAdmin` so it can show
 * the right error message on the login page.
 */
export const requireAdmin = async (
  source: AstroGlobal | APIContext | Request,
): Promise<AuthedAdmin | null> => {
  const result = await checkAdmin(source);
  return result.state === "ok" ? result.admin : null;
};

/**
 * Helper for .astro pages. Returns a Response to redirect to, OR the admin
 * if signed in & allowed. Use as:
 *
 *   const auth = await guardAdminPage(Astro);
 *   if (auth instanceof Response) return auth;
 *   const admin = auth;
 */
export const guardAdminPage = async (
  astro: AstroGlobal,
): Promise<Response | AuthedAdmin> => {
  const result = await checkAdmin(astro);
  if (result.state === "ok") return result.admin;
  if (result.state === "denied") {
    return astro.redirect(`/admin/login?error=not_admin&email=${encodeURIComponent(result.email)}`);
  }
  return astro.redirect("/admin/login");
};
