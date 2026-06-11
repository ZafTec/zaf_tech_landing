import { db } from "@/lib/db";

export type SubmissionType = "contact" | "careers" | "audit";

const TABLES: Record<SubmissionType, string> = {
  contact: "contact_submissions",
  careers: "career_applications",
  audit: "audit_submissions",
};

export const isValidType = (t: string): t is SubmissionType =>
  t === "contact" || t === "careers" || t === "audit";

type Row = Record<string, unknown> & {
  id: string;
  name: string;
  email: string;
  created_at: string;
  handled_at: string | null;
};

const requireDb = () => {
  if (!db) throw new Error("DATABASE_URL is not configured");
  return db;
};

export const getSubmission = async (type: SubmissionType, id: string): Promise<Row | null> => {
  const sql = requireDb();
  let rows: Row[] = [];
  if (type === "contact") {
    rows = (await sql`SELECT * FROM contact_submissions WHERE id = ${id} LIMIT 1;`) as Row[];
  } else if (type === "careers") {
    rows = (await sql`SELECT * FROM career_applications WHERE id = ${id} LIMIT 1;`) as Row[];
  } else {
    rows = (await sql`SELECT * FROM audit_submissions WHERE id = ${id} LIMIT 1;`) as Row[];
  }
  return rows[0] ?? null;
};

export const listSubmissions = async (
  type: SubmissionType,
  opts: { status?: "open" | "handled" | "all"; limit?: number } = {},
): Promise<Row[]> => {
  const sql = requireDb();
  const limit = Math.max(1, Math.min(500, opts.limit ?? 100));
  const status = opts.status ?? "all";

  if (type === "contact") {
    if (status === "open") {
      return (await sql`SELECT * FROM contact_submissions WHERE handled_at IS NULL ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
    }
    if (status === "handled") {
      return (await sql`SELECT * FROM contact_submissions WHERE handled_at IS NOT NULL ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
    }
    return (await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
  }
  if (type === "careers") {
    if (status === "open") {
      return (await sql`SELECT * FROM career_applications WHERE handled_at IS NULL ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
    }
    if (status === "handled") {
      return (await sql`SELECT * FROM career_applications WHERE handled_at IS NOT NULL ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
    }
    return (await sql`SELECT * FROM career_applications ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
  }
  if (status === "open") {
    return (await sql`SELECT * FROM audit_submissions WHERE handled_at IS NULL ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
  }
  if (status === "handled") {
    return (await sql`SELECT * FROM audit_submissions WHERE handled_at IS NOT NULL ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
  }
  return (await sql`SELECT * FROM audit_submissions ORDER BY created_at DESC LIMIT ${limit};`) as Row[];
};

export const setHandled = async (
  type: SubmissionType,
  id: string,
  handled: boolean,
): Promise<string | null> => {
  const sql = requireDb();
  const value = handled ? new Date().toISOString() : null;
  let rows: Array<{ handled_at: string | null }> = [];
  if (type === "contact") {
    rows = (await sql`UPDATE contact_submissions SET handled_at = ${value} WHERE id = ${id} RETURNING handled_at;`) as typeof rows;
  } else if (type === "careers") {
    rows = (await sql`UPDATE career_applications SET handled_at = ${value} WHERE id = ${id} RETURNING handled_at;`) as typeof rows;
  } else {
    rows = (await sql`UPDATE audit_submissions SET handled_at = ${value} WHERE id = ${id} RETURNING handled_at;`) as typeof rows;
  }
  if (rows.length === 0) throw new Error("Submission not found");
  return rows[0].handled_at;
};

// Silence the unused-export lint when this file is imported only for types.
export const __tables = TABLES;
