import Link from "next/link";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { magicLink, validateRequest } from "@tyfons-lab/auth";
import { type ActionResult, Form } from "../../_form";
import { Input } from "@tyfons-lab/ui-web/input";
import { Label } from "@tyfons-lab/ui-web/label";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <>
      <h1>Sign in</h1>
      <Form action={signin}>
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" />
        <br />
        <button type="submit">Continue</button>
      </Form>
    </>
  );
}

async function signin(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const email = formData.get("email");
  const sessionCookie = await magicLink.initiateSignIn(email as string);
  if (sessionCookie === undefined || "error" in sessionCookie) {
    return sessionCookie ?? { error: null };
  }
  console.log(email);
  return redirect("/");
}
