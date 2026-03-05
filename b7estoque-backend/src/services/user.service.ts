import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { NewUser, users } from "../db/schema";
import { formatUser } from "../helpers/formatUser";
import { getUserByEmail } from "../helpers/getUserByEmail";
import { hashPassword } from "../helpers/hasPassword";
import { verifyPassword } from "../helpers/verifyPassword";
import { AppError } from "../utils/apperror";
import crypto from 'crypto';

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

export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) return null;
  
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) return null;

  const token = crypto.randomBytes(32).toString('hex');
  await db
    .update(users)
    .set({ token, updatedAt: new Date() })
    .where(eq(users.id, user.id));
  
  const userFormatted = formatUser(user);

  return { ...userFormatted, token };
}

export const logout = async (token: string) => {
  await db
    .update(users)
    .set({ token: null, updatedAt: new Date() })
    .where(eq(users.token, token));
}