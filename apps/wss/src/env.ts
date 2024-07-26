import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  server: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
