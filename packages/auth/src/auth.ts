import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import type { Session, User } from "lucia";
import { db } from "@tyfons-lab/db";
import { cookies } from "next/headers";
import { cache } from "react";
import { env } from "../env";
import { sessions, users } from "@tyfons-lab/db/schemas";
import type { UserType } from "@tyfons-lab/db/validators";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export type UserSession =
  | { user: User; session: Session }
  | { user: null; session: null };

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      name: attributes.name,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<UserType, "id">;
  }
}

export const validateRequest = cache(
  async (callback?: () => Promise<UserSession>): Promise<UserSession> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);
