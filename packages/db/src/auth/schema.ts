import { timestamp, pgEnum, text, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "../pgTable";
import { metadata } from "../_metadataSchema";

export const roleEnum = pgEnum("role", [
  "normal",
  "employee",
  "manager",
  "admin",
]);

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  // username: text("username").notNull().unique(),
  // password: text("password").notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image", { length: 255 }),
  role: roleEnum("role").default("normal"),
  ...metadata,
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
