"use client";
import { api } from "@/trpc/react";
import { WebSocketsContext } from "@/wsc/client";
import { Button } from "@tyfons-lab/ui-web/button";
import { useContext } from "react";

export default function HomePage() {
  const { data } = api.post.all.useQuery();
  const { mutateAsync } = api.post.create.useMutation();
  const wsContext = useContext(WebSocketsContext);

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
      <Button
        onClick={() => {
          if (wsContext === null) return;
          wsContext.sendMessage("test");
        }}
      >
        send WS
      </Button>
    </>
  );
}
