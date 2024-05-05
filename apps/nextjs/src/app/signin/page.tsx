import Link from "next/link";

import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { credentials, lucia, validateRequest } from "@tyfons-lab/auth";
import { type ActionResult, Form } from "../_form";
import { UserType, db, eq, schema } from "@tyfons-lab/db";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <>
      <h1>Sign in</h1>
      <Form action={signin}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button type="submit">Continue</button>
      </Form>
      <Link href="/signup">Create an account</Link>
    </>
  );
}

async function signin(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");
  const sessionCookie = await credentials.signIn(
    username as string,
    password as string,
  );
  if ("error" in sessionCookie) {
    return sessionCookie;
  }
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
