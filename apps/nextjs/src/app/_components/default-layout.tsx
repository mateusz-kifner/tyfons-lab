import type { ReactNode } from "react";
import Header from "./header";

async function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      {children}
    </div>
  );
}

export default DefaultLayout;
