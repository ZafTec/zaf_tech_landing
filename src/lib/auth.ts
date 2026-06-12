import { betterAuth } from "better-auth";
import { mcp } from "better-auth/plugins";
import { Pool } from "pg";
import { publicUrl } from "@/lib/public-url";

// IMPORTANT: do NOT throw at module load.
// Astro's middleware imports `auth`, and the middleware runs for every page —
// including static routes during `astro build` prerender, where the prod
// secrets are deliberately absent. Throwing here would fail the Docker build.
// Missing values surface at request time with a real error from BetterAuth.
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
  // BetterAuth's own logger. Routes warnings + errors to stderr so they
  // show up in `docker logs zaftech` instead of disappearing.
  logger: {
    level: process.env.BETTER_AUTH_LOG_LEVEL === "debug" ? "debug" : "info",
    log: (level, message, ...rest) => {
      const tag = `[better-auth:${level}]`;
      if (level === "error") console.error(tag, message, ...rest);
      else if (level === "warn") console.warn(tag, message, ...rest);
      else console.log(tag, message, ...rest);
    },
  },
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
      // audience claim on issued tokens, so it must be exact (scheme +
      // host + path) — not just the origin.
      resource: publicUrl("/api/mcp"),
    }),
  ],
});
