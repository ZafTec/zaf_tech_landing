import { betterAuth } from "better-auth";
import { mcp } from "better-auth/plugins";
import { Pool } from "pg";

const requireEnv = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
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
      clientId: requireEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
    },
  },
  plugins: [
    mcp({ loginPage: "/admin/login" }),
  ],
});
