import { db } from "../db/connection";
import { categories, NewCategory } from "../db/schema";

export const createCategory = async (data: NewCategory) => {
  const result = await db.insert(categories).values(data).returning();
  return result[0];
}