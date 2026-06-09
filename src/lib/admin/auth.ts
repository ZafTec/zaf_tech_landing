import { isAdmin } from "@/lib/admin/admins";
import { SESSION_COOKIE, readCookie, verifySession } from "@/lib/admin/session";

export type AuthedAdmin = { email: string };

// Verifies the session cookie and confirms the email is still in the admins
// table. Returns null when not authorized so callers can redirect.
export const requireAdmin = async (request: Request): Promise<AuthedAdmin | null> => {
  const token = readCookie(request.headers.get("cookie"), SESSION_COOKIE);
  const payload = await verifySession(token);
  if (!payload) return null;
  const allowed = await isAdmin(payload.email);
  if (!allowed) return null;
  return { email: payload.email };
};
