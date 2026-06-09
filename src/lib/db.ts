import { SQL } from "bun";

const connectionString = process.env.DATABASE_URL;

export const db = connectionString ? new SQL(connectionString) : null;
export const isDbReady = () => db !== null;
