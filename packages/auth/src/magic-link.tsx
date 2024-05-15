import { Argon2id } from "oslo/password";
import { z } from "zod";
import { sendSignInEmail } from "@tyfons-lab/email-templates";

const emailZodSchema = z.string().email().min(5).max(32);
const tokenZodSchema = z.string().max(64);

async function initiateSignIn(email: string | null) {
  const result = emailZodSchema.safeParse(email);
  if (!result.success) {
    return {
      error: result.error.message,
    };
  }

  sendSignInEmail(result.data, "test code");
}
async function validateSignIn(token: string | null) {
  const result = tokenZodSchema.safeParse(token);
  if (!result.success) {
    return {
      error: result.error.message,
    };
  }

  // const existingUser = await db
  //   .select()
  //   .from(schema.users)
  //   .where(eq(schema.users.username, username));

  // if (existingUser[0] === undefined) {
  //   return {
  //     error: "Incorrect username or password",
  //   };
  // }

  // const session = await lucia.createSession(existingUser[0].id, {});
  // const sessionCookie = lucia.createSessionCookie(session.id);

  // return sessionCookie;
}

const magicLink = {
  initiateSignIn,
  validateSignIn,
};

export default magicLink;
