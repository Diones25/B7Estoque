import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { users } from "../db/schema";

export const validateToken = async (token: string) => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.token, token))
    .limit(1);

  const user = result[0];
  if (!user || user.deletedAt) return null;
  return user;
}