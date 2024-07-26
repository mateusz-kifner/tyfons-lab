import { redirect } from "next/navigation";
import { magicLink, validateRequest } from "@tyfons-lab/auth";
import { type ActionResult, Form } from "../../_form";
import { Input } from "@tyfons-lab/ui-web/input";
import { Label } from "@tyfons-lab/ui-web/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tyfons-lab/ui-web/card";
import { Button } from "@tyfons-lab/ui-web/button";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <Card className="mx-auto mt-6 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form action={signin}>
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" id="email" />
            <br />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </Form>
        </div>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}

async function signin(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const email = formData.get("email");
  const sessionCookie = await magicLink.initiateSignIn(email as string);
  if (sessionCookie === null || "error" in sessionCookie) {
    return sessionCookie ?? { error: null };
  }
  console.log(sessionCookie);
  return redirect("/auth/magic-link/waiting");
}
