import { validateRequest } from "@tyfons-lab/auth/react";
import { redirect } from "next/navigation";

async function ChatPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth");
  }

  return <div>Chat</div>;
}

export default ChatPage;
