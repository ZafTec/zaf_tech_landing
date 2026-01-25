import { beforeAll, afterAll, test, expect } from "bun:test";
import { SQL } from "bun";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  test("contact api skipped without DATABASE_URL", () => {
    expect(true).toBe(true);
  });
} else {
  const db = new SQL(databaseUrl);

  beforeAll(async () => {
    await db`DROP TABLE IF EXISTS contact_submissions`;
  });

  afterAll(async () => {
    await db`DROP TABLE IF EXISTS contact_submissions`;
    if (typeof db.close === "function") {
      await db.close();
    }
  });

  test("contact api writes submissions to the database", async () => {
    const { POST } = await import("../src/pages/api/contact");

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "bun-test",
        "x-real-ip": "127.0.0.1",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Hello from the test suite.",
      }),
    });

    const response = await POST({ request } as { request: Request });
    expect(response.status).toBe(201);

    const rows = await db`
      SELECT name, email, message
      FROM contact_submissions
      WHERE email = ${"test@example.com"}
    `;

    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe("Test User");
    expect(rows[0].message).toBe("Hello from the test suite.");
  });

  test("contact api validates required fields", async () => {
    const { POST } = await import("../src/pages/api/contact");

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        email: "",
        message: "",
      }),
    });

    const response = await POST({ request } as { request: Request });
    expect(response.status).toBe(400);
  });
}
