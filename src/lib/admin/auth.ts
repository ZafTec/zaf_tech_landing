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
 * Require an authenticated user whose email is in the admins table.
 *
 * Pass either an `Astro` global (in a .astro frontmatter), an API context
 * (`{ request }`), or a raw Request. Returns `null` if not authorized so
 * callers can redirect.
 */
export const requireAdmin = async (
  source: AstroGlobal | APIContext | Request,
): Promise<AuthedAdmin | null> => {
  const headers =
    source instanceof Request
      ? source.headers
      : (source as { request: Request }).request.headers;

  let session;
  try {
    session = await auth.api.getSession({ headers });
  } catch (err) {
    console.error("[requireAdmin] getSession failed:", err);
    return null;
  }
  if (!session?.user?.email) return null;

  const email = session.user.email.toLowerCase();
  const allowed = await isAdmin(email);
  if (!allowed) {
    console.warn(`[requireAdmin] denied: ${email} not in admins table`);
    return null;
  }

  return {
    email,
    userId: session.user.id,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
  };
};
