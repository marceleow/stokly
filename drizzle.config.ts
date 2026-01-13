import type { Config } from "drizzle-kit";
import { env } from "./env";

export default {
  dialect: "turso",
  schema: "drizzle/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN,
  },
} satisfies Config;
