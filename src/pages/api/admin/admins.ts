import type { APIRoute } from "astro";
import { addAdmin, listAdmins, removeAdmin } from "@/lib/admin/admins";
import { requireAdmin } from "@/lib/admin/auth";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const GET: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request);
  if (!admin) return json({ ok: false, error: "unauthorized" }, 401);
  const admins = await listAdmins();
  return json({ ok: true, admins });
};

export const POST: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request);
  if (!admin) return json({ ok: false, error: "unauthorized" }, 401);

  let payload: { email?: string } = {};
  try {
    payload = (await request.json()) as { email?: string };
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }
  const email = (payload.email ?? "").trim();
  if (!email) return json({ ok: false, error: "email_required" }, 400);

  const result = await addAdmin(email, admin.email);
  if (!result.ok) return json({ ok: false, error: result.error }, 400);
  const admins = await listAdmins();
  return json({ ok: true, admins });
};

export const DELETE: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request);
  if (!admin) return json({ ok: false, error: "unauthorized" }, 401);

  let payload: { email?: string } = {};
  try {
    payload = (await request.json()) as { email?: string };
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }
  const email = (payload.email ?? "").trim().toLowerCase();
  if (!email) return json({ ok: false, error: "email_required" }, 400);
  if (email === admin.email) {
    return json({ ok: false, error: "cannot_remove_self" }, 400);
  }

  const result = await removeAdmin(email);
  if (!result.ok) return json({ ok: false, error: result.error }, 400);
  const admins = await listAdmins();
  return json({ ok: true, admins });
};
