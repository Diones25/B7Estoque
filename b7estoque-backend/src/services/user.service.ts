import { db } from "../db/connection";
import { NewUser, users } from "../db/schema";
import { formatUser } from "../helpers/formatUser";
import { getUserByEmail } from "../helpers/getUserByEmail";
import { hashPassword } from "../helpers/hasPassword";
import { AppError } from "../utils/apperror";

export const createUser = async (data: NewUser) => {
  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    throw new AppError('Em-mail já está em uso', 400);
  }

  const hashedPassword = await hashPassword(data.password);

  const newUser: NewUser = {
    ...data,
    password: hashedPassword
  };

  const result = await db.insert(users).values(newUser).returning();
  const user = result[0];

  return formatUser(user);
}

