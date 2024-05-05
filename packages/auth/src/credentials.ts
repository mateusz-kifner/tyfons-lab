import { db, eq, schema } from "@tyfons-lab/db";
import { Argon2id } from "oslo/password";
import { lucia, validateRequest } from "./auth";
import { generateId } from "lucia";

async function signIn(username: string | null, password: string | null) {
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, username));

  if (existingUser[0] === undefined) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser[0].password,
    password,
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser[0].id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return sessionCookie;
}

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

async function signUp(username: string | null, password: string | null) {
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await db.insert(schema.users).values({
      id: userId,
      username,
      password: hashedPassword,
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return sessionCookie;
  } catch (e) {
    console.log(e);
    // if (e instanceof  && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
    // 	return {
    // 		error: "Username already used"
    // 	};
    // }
    return {
      error: "An unknown error occurred",
    };
  }
}

async function deleteUser(userId: string) {
  await db.delete(schema.users).where(eq(schema.users.id, userId));
}

const credentials = {
  signIn,
  signOut,
  signUp,
  deleteUser,
};

export default credentials;
