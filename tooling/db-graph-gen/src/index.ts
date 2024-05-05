export const name = "db-graph-gen";

import { schema } from "@tyfons-lab/db";
import { pgGenerate } from "drizzle-dbml-generator"; // Using Postgres for this example

const out = "./schema.dbml";
const relational = true;

pgGenerate({ schema, out, relational });
