import { z } from "zod";
import { sendSignInEmail } from "@tyfons-lab/email-templates";
import { authService, userService } from "@tyfons-lab/db/services";
import { generateIdFromEntropySize } from "lucia";

const emailZodSchema = z.string().email().min(5).max(32);
const tokenZodSchema = z.string().max(64);

async function initiateSignIn(email: string | null) {
  const result = emailZodSchema.safeParse(email);
  if (!result.success) {
    return {
      error: result.error.message,
    };
  }

  let user = await userService.getByEmail(result.data);
  if ("error" in user) {
    const id = generateIdFromEntropySize(10);
    user = await userService.create({ id: id, email: result.data });
    if ("error" in user) {
      return user;
    }
  }
  const id = generateIdFromEntropySize(10);
  const tokenObj = await authService.createToken({ id, userId: user.id });
  if ("error" in tokenObj) {
    return tokenObj;
  }
  console.log(tokenObj);
  sendSignInEmail(result.data, tokenObj.token);
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
