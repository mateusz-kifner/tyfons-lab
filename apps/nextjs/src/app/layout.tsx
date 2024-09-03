import "./globals.css";
import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@tyfons-lab/ui-web";
import { ThemeProvider, ThemeToggle } from "@tyfons-lab/ui-web/theme";
import { Toaster } from "@tyfons-lab/ui-web/sonner";

import { TRPCReactProvider } from "@/trpc/react";

import { env } from "@/env";
import DefaultLayout from "./_components/default-layout";
import { WebSocketsProvider } from "@/wsc/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production" ? "" : "http://localhost:3000",
  ),
  title: "Tyfons Lab",
  description: "Tyfons laboratory for testing new webdev ideas",
  openGraph: {
    title: "Tyfons Lab",
    description: "Tyfons laboratory for testing new webdev ideas",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Tyfons Lab",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <WebSocketsProvider>
              <DefaultLayout>{props.children}</DefaultLayout>
              <ReactQueryDevtools initialIsOpen={false} />
            </WebSocketsProvider>
          </TRPCReactProvider>
          <div className="absolute right-4 bottom-4">
            <ThemeToggle />
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
