import { lucia, validateRequest } from "./auth";

export * from "./auth";
export type { UserSession as Session } from "./auth";
export { default as magicLink } from "./magic-link";
async function signOut() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  return sessionCookie;
}
export { signOut };
