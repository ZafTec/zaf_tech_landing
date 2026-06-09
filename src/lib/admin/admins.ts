import { db } from "@/lib/db";

export const SEED_EMAIL = (process.env.ADMIN_SEED_EMAIL ?? "contact@zaftech.co").toLowerCase();

let setupReady: Promise<void> | null = null;

const setup = () => {
  if (!db) return Promise.reject(new Error("Database not configured"));
  if (!setupReady) {
    setupReady = (async () => {
      await db`
        CREATE TABLE IF NOT EXISTS admins (
          email TEXT PRIMARY KEY,
          added_by TEXT,
          created_at TEXT NOT NULL
        );
      `;
      // Seed the bootstrap admin if no rows exist for it. We don't overwrite,
      // we just guarantee one row is present so the first sign-in works.
      await db`
        INSERT INTO admins (email, added_by, created_at)
        VALUES (${SEED_EMAIL}, ${"system"}, ${new Date().toISOString()})
        ON CONFLICT (email) DO NOTHING;
      `;
    })();
  }
  return setupReady;
};

export type AdminRow = {
  email: string;
  added_by: string | null;
  created_at: string;
};

export const listAdmins = async (): Promise<AdminRow[]> => {
  if (!db) return [];
  await setup();
  const rows = await db`SELECT email, added_by, created_at FROM admins ORDER BY created_at ASC;`;
  return rows as AdminRow[];
};

export const isAdmin = async (email: string): Promise<boolean> => {
  if (!db) return false;
  await setup();
  const e = email.trim().toLowerCase();
  if (!e) return false;
  const rows = await db`SELECT 1 FROM admins WHERE email = ${e} LIMIT 1;`;
  return (rows as unknown[]).length > 0;
};

export const addAdmin = async (email: string, addedBy: string): Promise<{ ok: boolean; error?: string }> => {
  if (!db) return { ok: false, error: "Database not configured" };
  await setup();
  const e = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return { ok: false, error: "Invalid email" };
  }
  await db`
    INSERT INTO admins (email, added_by, created_at)
    VALUES (${e}, ${addedBy.toLowerCase()}, ${new Date().toISOString()})
    ON CONFLICT (email) DO NOTHING;
  `;
  return { ok: true };
};

export const removeAdmin = async (email: string): Promise<{ ok: boolean; error?: string }> => {
  if (!db) return { ok: false, error: "Database not configured" };
  await setup();
  const e = email.trim().toLowerCase();
  if (e === SEED_EMAIL) {
    return { ok: false, error: "Cannot remove the seed admin" };
  }
  await db`DELETE FROM admins WHERE email = ${e};`;
  return { ok: true };
};
