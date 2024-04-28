import { drizzle } from "drizzle-orm/postgres-js";

import { connectionStr } from "./config";
import * as auth from "./schema/auth";
import * as post from "./schema/post";
import postgres from "postgres";

export const schema = { ...auth, ...post };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";

const pgClient = postgres(connectionStr);

export const db = drizzle(pgClient, { schema });

export * from "./validators"

