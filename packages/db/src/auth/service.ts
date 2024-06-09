import { type DBType, db } from "..";
import type { Err } from "../Err";
import { authTokens } from "./schema";
import type { AuthToken, NewAuthToken } from "./validator";

async function createToken(
  authTokenData: NewAuthToken,
  tx: DBType = db,
): Promise<AuthToken | Err> {
  const newAuthToken = await tx
    .insert(authTokens)
    .values(authTokenData)
    .returning();
  if (!newAuthToken[0]) return { error: "Could not create authToken" };
  return newAuthToken[0];
}

const authService = { createToken };

export default authService;
