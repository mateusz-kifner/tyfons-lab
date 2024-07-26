"use client";
import { api } from "@/trpc/react";
import { Button } from "@tyfons-lab/ui-web/button";

export default function HomePage() {
  const { data } = api.post.all.useQuery();
  const { mutateAsync } = api.post.create.useMutation();

  return (
    <>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Button
        onClick={() => {
          mutateAsync({ title: "test", content: "test" })
            .then(() => {})
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        test
      </Button>
    </>
  );
}
