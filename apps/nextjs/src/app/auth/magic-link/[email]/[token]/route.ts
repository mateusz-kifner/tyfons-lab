"use server";
import { magicLink } from "@tyfons-lab/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

interface Query {
  params: {
    email: string;
    token: string;
  };
}

export async function GET(req: NextRequest, { params }: Query) {
  const { email, token } = params;

  const email_decoded = decodeURIComponent(email);
  // email_decoded: string, token: string
  const sessionCookie = await magicLink.validateSignIn(email_decoded, token);
  if ("error" in sessionCookie) {
    return redirect(`/auth/magic-link/error?message=${sessionCookie.error}`);
  }
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}
