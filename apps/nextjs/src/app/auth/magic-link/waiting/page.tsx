"use client";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tyfons-lab/ui-web/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { env } from "process";
import { useEffect, useState } from "react";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default function Page() {
  const [count, setCount] = useState(0);
  const { data, isRefetching } = api.auth.getSession.useQuery(undefined, {
    refetchInterval: count < 30 ? 5000 : 15000,
  });

  useEffect(() => {
    if (isRefetching) {
      setCount(count + 1);
    }
  }, [isRefetching]);

  if (data) {
    return redirect("/");
  }

  return (
    <Card className="mx-auto mt-6 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Check your email.</CardTitle>
      </CardHeader>
      <CardContent>
        Click the link in the email to sign in.
        <br />
        <br />
        <Link href="/">{getBaseUrl()}</Link>
      </CardContent>
    </Card>
  );
}
