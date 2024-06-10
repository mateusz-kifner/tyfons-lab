"use client";

import { DropdownMenuItem } from "@tyfons-lab/ui-web/dropdown-menu";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const { mutateAsync } = api.auth.signOut.useMutation();
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        mutateAsync()
          .then(() => {
            router.push("/");
          })
          .catch((e) => console.log(e));
      }}
    >
      Sign Out
    </DropdownMenuItem>
  );
}

export default SignOutButton;
