"use client";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

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

  return <>waiting</>;
}
