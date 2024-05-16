import { drizzle } from "drizzle-orm/postgres-js";

import { connectionStr } from "./config";
import * as schemaInternal from "./schemas";
import postgres from "postgres";

export { pgTable as tableCreator } from "./pgTable";

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";

const pgClient = postgres(connectionStr);
export const schema = { ...schemaInternal }; // this is needed because of bug in pnpm that prevents inference of nested exported types ( TS2742: The inferred type of 'createCallerFactory' cannot be named without a reference to '../node_modules/@tyfons-lab/db/dist/schemas'. This is likely not portable. A type annotation is necessary.)
export const db = drizzle(pgClient, { schema });

export type DBType = typeof db;

export * from "./validators";
