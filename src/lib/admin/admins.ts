import { db } from "@/lib/db";

export const SEED_EMAIL = (process.env.ADMIN_SEED_EMAIL ?? "contact@zaftech.co").toLowerCase();

let setupReady: Promise<void> | null = null;

const setup = async () => {
  if (!db) throw new Error("Database not configured (DATABASE_URL missing)");
  if (!setupReady) {
    setupReady = (async () => {
      await db`
        CREATE TABLE IF NOT EXISTS admins (
          email TEXT PRIMARY KEY,
          added_by TEXT,
          created_at TEXT NOT NULL
        );
      `;
      const inserted = await db`
        INSERT INTO admins (email, added_by, created_at)
        VALUES (${SEED_EMAIL}, ${"system"}, ${new Date().toISOString()})
        ON CONFLICT (email) DO NOTHING
        RETURNING email;
      `;
      if ((inserted as unknown[]).length > 0) {
        console.log(`[admins] Seeded admin: ${SEED_EMAIL}`);
      }
    })().catch((err) => {
      console.error("[admins] Setup failed:", err);
      setupReady = null; // allow retry on next call
      throw err;
    });
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
  if (!db) {
    console.error("[admins] isAdmin called but db is null (DATABASE_URL unset)");
    return false;
  }
  const e = email.trim().toLowerCase();
  if (!e) return false;
  try {
    await setup();
  } catch (err) {
    console.error("[admins] setup() failed inside isAdmin:", err);
    return false;
  }
  const rows = await db`SELECT 1 FROM admins WHERE email = ${e} LIMIT 1;`;
  const ok = (rows as unknown[]).length > 0;
  if (!ok) {
    console.warn(`[admins] isAdmin denied: ${e} not in admins table`);
  }
  return ok;
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
