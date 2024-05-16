import { users } from "../auth/schema";
import { eq, inArray, sql } from "drizzle-orm";
import type { User, UpdatedUser } from "./validator";
import { type DBType, db } from "..";
import type { MetadataType } from "../types/MetadataType";

// compile query ahead of time
const userPrepareGetById = db.query.users
  .findFirst({
    where: eq(users.id, sql.placeholder("id")),
  })
  .prepare("userPrepareGetById");

async function getById(id: number): Promise<User> {
  const user = await userPrepareGetById.execute({ id });
  if (!user)
    throw new Error(`[UserService]: Could not find user with id ${id}`);
  return user;
}

// compile query ahead of time
const userPrepareGetManyById = db
  .select()
  .from(users)
  .where(inArray(users.id, sql.placeholder("ids")))
  .prepare("userPrepareGetManyById");

async function getManyByIds(ids: number[]): Promise<User[]> {
  const users = await userPrepareGetManyById.execute({ ids });
  if (users.length !== ids.length)
    throw new Error(`[UserService]: Could not find users with ids ${ids}`);
  return users;
}

async function create(userData: User, tx: DBType = db): Promise<User> {
  const newUser = await tx.insert(users).values(userData).returning();
  if (!newUser[0])
    throw new Error(
      `[UserService]: Could not create user with name ${userData?.name}`,
    );
  return newUser[0];
}

async function deleteById(id: string, tx: DBType = db): Promise<User> {
  const deletedUser = await tx
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  if (!deletedUser[0])
    throw new Error(`[UserService]: Could not delete user with id ${id}`);
  return deletedUser[0];
}

async function update(
  userData: UpdatedUser & MetadataType,
  tx: DBType = db,
): Promise<User> {
  const { id, ...dataToUpdate } = userData;
  const updatedUser = await tx
    .update(users)
    .set(dataToUpdate)
    .where(eq(users.id, id))
    .returning();
  if (!updatedUser[0])
    throw new Error(`[UserService]: Could not update user with id ${id}`);
  return updatedUser[0];
}

const userService = { getById, getManyByIds, create, deleteById, update };

export default userService;
