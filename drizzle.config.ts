import type { Config } from "drizzle-kit";
import { env } from "@/lib/env.mjs";

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
