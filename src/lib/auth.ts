import { betterAuth } from "better-auth";
import { mcp } from "better-auth/plugins";
import { Pool } from "pg";

// IMPORTANT: do NOT throw at module load.
// Astro's middleware imports `auth`, and the middleware runs for every page —
// including static routes during `astro build` prerender, where the prod
// secrets are deliberately absent. Throwing here would fail the Docker build.
// Missing values are surfaced at request time (BetterAuth returns its own
// error when OAuth is actually exercised).
const env = (name: string): string => {
  const v = process.env[name];
  if (!v) console.warn(`[auth] ${name} is not set — auth/OAuth requests will fail until it's configured.`);
  return v ?? "";
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: pool,
  socialProviders: {
    google: {
      clientId: env("GOOGLE_CLIENT_ID"),
      clientSecret: env("GOOGLE_CLIENT_SECRET"),
    },
  },
  plugins: [
    mcp({
      loginPage: "/admin/login",
      // Canonical MCP resource URL. claude.ai matches this against the
      // audience claim on issued tokens, so it must be exact (scheme + host
      // + path) — not just the origin.
      resource: process.env.BETTER_AUTH_URL
        ? `${process.env.BETTER_AUTH_URL.replace(/\/$/, "")}/api/mcp`
        : undefined,
    }),
  ],
});
