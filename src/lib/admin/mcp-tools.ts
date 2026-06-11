import { getSubmission, isValidType, listSubmissions, setHandled, type SubmissionType } from "@/lib/admin/submissions";
import { sendMail } from "@/lib/mail";

export type ToolContext = { adminEmail: string };

type ToolHandler = (args: Record<string, unknown>, ctx: ToolContext) => Promise<unknown>;

export type ToolDef = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: ToolHandler;
};

const SUBMISSION_TYPE_SCHEMA = {
  type: "string",
  enum: ["contact", "careers", "audit"],
  description: "Which submissions table to operate on.",
};

const requireString = (v: unknown, name: string): string => {
  if (typeof v !== "string" || !v.trim()) throw new Error(`${name} is required`);
  return v;
};
const requireType = (v: unknown): SubmissionType => {
  const s = requireString(v, "type");
  if (!isValidType(s)) throw new Error(`type must be contact | careers | audit`);
  return s;
};

export const TOOLS: ToolDef[] = [
  {
    name: "list_submissions",
    description:
      "List recent form submissions of a given type. Use `status` to filter handled vs open submissions.",
    inputSchema: {
      type: "object",
      properties: {
        type: SUBMISSION_TYPE_SCHEMA,
        status: { type: "string", enum: ["open", "handled", "all"], default: "open" },
        limit: { type: "integer", minimum: 1, maximum: 500, default: 50 },
      },
      required: ["type"],
    },
    handler: async (args) => {
      const type = requireType(args.type);
      const status = (args.status as "open" | "handled" | "all" | undefined) ?? "open";
      const limit = typeof args.limit === "number" ? args.limit : 50;
      const items = await listSubmissions(type, { status, limit });
      return { count: items.length, items };
    },
  },
  {
    name: "get_submission",
    description: "Fetch a single submission by type and ID with all stored fields.",
    inputSchema: {
      type: "object",
      properties: {
        type: SUBMISSION_TYPE_SCHEMA,
        id: { type: "string", description: "Submission UUID." },
      },
      required: ["type", "id"],
    },
    handler: async (args) => {
      const type = requireType(args.type);
      const id = requireString(args.id, "id");
      const item = await getSubmission(type, id);
      if (!item) throw new Error("Submission not found");
      return item;
    },
  },
  {
    name: "send_reachout",
    description:
      "Send a reply email to the submitter (contact or careers only). On success the submission is marked handled. Audit submissions are not eligible.",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["contact", "careers"] },
        id: { type: "string" },
        subject: { type: "string", minLength: 1 },
        body: { type: "string", minLength: 1, description: "Plain-text email body." },
      },
      required: ["type", "id", "subject", "body"],
    },
    handler: async (args, ctx) => {
      const type = requireType(args.type);
      if (type === "audit") throw new Error("send_reachout is not supported for audit submissions");
      const id = requireString(args.id, "id");
      const subject = requireString(args.subject, "subject");
      const body = requireString(args.body, "body");
      const sub = await getSubmission(type, id);
      if (!sub) throw new Error("Submission not found");
      const to = String(sub.email);
      if (!to) throw new Error("Submission has no email");
      const info = await sendMail({ to, subject, text: body, replyTo: ctx.adminEmail });
      const handled_at = await setHandled(type, id, true);
      return { ok: true, to, messageId: info.messageId, handled_at };
    },
  },
  {
    name: "mark_handled",
    description: "Mark a submission as handled (sets handled_at to now).",
    inputSchema: {
      type: "object",
      properties: {
        type: SUBMISSION_TYPE_SCHEMA,
        id: { type: "string" },
      },
      required: ["type", "id"],
    },
    handler: async (args) => {
      const type = requireType(args.type);
      const id = requireString(args.id, "id");
      const handled_at = await setHandled(type, id, true);
      return { ok: true, handled_at };
    },
  },
  {
    name: "mark_unhandled",
    description: "Re-open a previously-handled submission (clears handled_at).",
    inputSchema: {
      type: "object",
      properties: {
        type: SUBMISSION_TYPE_SCHEMA,
        id: { type: "string" },
      },
      required: ["type", "id"],
    },
    handler: async (args) => {
      const type = requireType(args.type);
      const id = requireString(args.id, "id");
      const handled_at = await setHandled(type, id, false);
      return { ok: true, handled_at };
    },
  },
];

export const TOOLS_BY_NAME: Record<string, ToolDef> = Object.fromEntries(TOOLS.map((t) => [t.name, t]));
