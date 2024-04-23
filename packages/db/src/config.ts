import type { Config } from "drizzle-kit";
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

// Push requires SSL so use URL instead of username/password
// export const connectionStr = new URL(env.DATABASE_URL);
// connectionStr.searchParams.set("ssl", '{"rejectUnauthorized":true}');

export const connectionStr = env.DATABASE_URL;

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: { connectionString: connectionStr },
  tablesFilter: ["tyfons_lab_*"],
} satisfies Config;
