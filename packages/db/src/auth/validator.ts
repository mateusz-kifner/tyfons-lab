import type { users } from "./schema";

export type UserType = typeof users.$inferInsert;
