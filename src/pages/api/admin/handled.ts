import type { APIRoute } from "astro";
import { requireAdmin } from "@/lib/admin/auth";
import { isValidType, setHandled } from "@/lib/admin/submissions";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request);
  if (!admin) return json({ ok: false, error: "unauthorized" }, 401);

  let payload: { type?: string; id?: string; handled?: boolean } = {};
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }
  const { type, id, handled } = payload;
  if (!type || !isValidType(type)) return json({ ok: false, error: "invalid_type" }, 400);
  if (!id) return json({ ok: false, error: "id_required" }, 400);
  if (typeof handled !== "boolean") return json({ ok: false, error: "handled_required" }, 400);

  try {
    const handled_at = await setHandled(type, id, handled);
    return json({ ok: true, handled_at });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[admin/handled] failed:", err);
    return json({ ok: false, error: message }, 500);
  }
};
