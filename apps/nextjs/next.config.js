import { fileURLToPath } from "url";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@tyfons-lab/api",
    "@tyfons-lab/auth",
    "@tyfons-lab/db",
    "@tyfons-lab/ui-web",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  env: {
    NEXT_PUBLIC_WS_SERVER_URL: process.env.EXPO_PUBLIC_WS_SERVER_URL,
  },
  experimental: {
    serverComponentsExternalPackages: ["oslo"],
  },
};

export default config;
