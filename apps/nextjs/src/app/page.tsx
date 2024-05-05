import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { credentials, lucia, validateRequest } from "@tyfons-lab/auth";
import { type ActionResult, Form } from "./_form";

import { Suspense } from "react";

import { api } from "@/trpc/server";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export default async function HomePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/signin");
  }
  // You can await this here if you don't want to show Suspense fallback below
  const posts = api.post.all();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
        <h1>Hi, {user.username}!</h1>
        <p>Your user ID is {user.id}.</p>
        <Form action={logout}>
          <button type="submit">Sign out</button>
        </Form>

        <CreatePostForm />
        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList posts={posts} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function logout(): Promise<ActionResult> {
  "use server";
  const sessionCookie = await credentials.signOut();
  if ("error" in sessionCookie) return sessionCookie;
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/signin");
}
