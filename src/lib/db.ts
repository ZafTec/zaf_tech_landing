import { SQL } from "bun";

const connectionString = process.env.DATABASE_URL;

export const db = connectionString ? new SQL(connectionString) : null;

if (!db) {
  console.error("[db] DATABASE_URL is not set — admin + form endpoints will fail.");
}
