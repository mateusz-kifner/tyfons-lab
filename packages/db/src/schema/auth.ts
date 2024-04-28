import {
  index,
  integer,
  primaryKey,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { randomUUID } from "crypto";


export const users = pgTable("user", {
	id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password:  text("password").notNull()
});

export const sessions = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

