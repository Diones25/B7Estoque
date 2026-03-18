import { eq, isNull, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { categories, NewCategory, products } from "../db/schema";

export const createCategory = async (data: NewCategory) => {
  const result = await db.insert(categories).values(data).returning();
  return result[0];
}

export const listCategories = async (includeProductsCount: boolean = false) => {
  if (includeProductsCount) {
    const categoriesWithCount = await db
      .select({
        id: categories.id,
        name: categories.name,
        createdAt: categories.createdAt,
        productsCount: sql<number>`count(${products.id})::int`
      })
      .from(categories)
      .leftJoin(products, eq(categories.id, products.categoryId)) 
      .where(isNull(categories.deletedAt))
      .groupBy(categories.id);
    return categoriesWithCount;
  }

  const categoriesList = await db
    .select()
    .from(categories)
    .where(isNull(categories.deletedAt))
  return categoriesList;
}

export const getCategoryById = async (id: string) => {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);
  const category = result[0];
  if (!category || category.deletedAt) return null;
  return category;
}