import type { APIRoute } from "astro";
import { SQL } from "bun";

const connectionString = process.env.DATABASE_URL;
const db = connectionString ? new SQL(connectionString) : null;
let tableReady: Promise<void> | null = null;

const ensureTable = () => {
  if (!db) {
    return Promise.reject(new Error("Database not configured"));
  }
  if (!tableReady) {
    tableReady = db`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        user_agent TEXT,
        ip_address TEXT,
        created_at TEXT NOT NULL
      );
    `.then(() => undefined);
  }
  return tableReady;
};

export const POST: APIRoute = async ({ request }) => {
  if (!db) {
    return new Response(
      JSON.stringify({ ok: false, error: "Database not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  let payload: Record<string, string> = {};

  if (contentType.includes("application/json")) {
    payload = (await request.json()) as Record<string, string>;
  } else {
    const formData = await request.formData();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        payload[key] = value;
      }
    });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing required fields" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "";

  await ensureTable();

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await db`
    INSERT INTO contact_submissions (id, name, email, message, user_agent, ip_address, created_at)
    VALUES (${id}, ${name}, ${email}, ${message}, ${userAgent}, ${ipAddress}, ${createdAt});
  `;

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
