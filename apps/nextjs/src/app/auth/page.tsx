import { redirect } from "next/navigation";

export default async function Page() {
  return redirect("/auth/magic-link");
}