import type { APIRoute } from "astro";
import { requireAdmin } from "@/lib/admin/auth";
import { getSubmission, isValidType, setHandled } from "@/lib/admin/submissions";
import { sendMail } from "@/lib/mail";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request);
  if (!admin) return json({ ok: false, error: "unauthorized" }, 401);

  let payload: { type?: string; id?: string; subject?: string; body?: string } = {};
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }
  const { type, id, subject, body } = payload;
  if (!type || !isValidType(type)) return json({ ok: false, error: "invalid_type" }, 400);
  if (type === "audit") return json({ ok: false, error: "reachout_not_supported_for_audit" }, 400);
  if (!id) return json({ ok: false, error: "id_required" }, 400);
  if (!subject?.trim() || !body?.trim()) return json({ ok: false, error: "subject_and_body_required" }, 400);

  let submission;
  try {
    submission = await getSubmission(type, id);
  } catch (err) {
    console.error("[admin/reachout] lookup failed:", err);
    return json({ ok: false, error: "lookup_failed" }, 500);
  }
  if (!submission) return json({ ok: false, error: "submission_not_found" }, 404);

  const to = String(submission.email);
  if (!to) return json({ ok: false, error: "no_email_on_submission" }, 400);

  try {
    const info = await sendMail({ to, subject, text: body, replyTo: admin.email });
    const handled_at = await setHandled(type, id, true);
    console.log(`[admin/reachout] ${admin.email} → ${to} (type=${type}, id=${id}, msgId=${info.messageId})`);
    return json({ ok: true, messageId: info.messageId, handled_at });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[admin/reachout] send failed:", err);
    return json({ ok: false, error: message }, 500);
  }
};
