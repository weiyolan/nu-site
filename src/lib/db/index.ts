import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env.mjs";
// https://v2.lucia-auth.com/database-adapters/postgres/

const connectionString = env.DATABASE_URL;
export const client = postgres(connectionString);
export const db = drizzle(client);
