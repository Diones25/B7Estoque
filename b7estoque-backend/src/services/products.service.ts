import { eq, ilike, isNull, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { categories, NewProduct, products } from "../db/schema";
import { AppError } from "../utils/apperror";
import * as categoryService from './categories.service';

export const createProduct = async (data: NewProduct) => {
  console.log("caiu aqui");
  const category = await categoryService.getCategoryById(data.categoryId);
  if (!category) throw new AppError("Categoria nao encontrada", 404);
  const result = await db
    .insert(products)
    .values(data)
    .returning();
  if(!result[0]) return null;
  return result[0];
}

export const listProducts = async (name?: string, offset: number = 0, limit: number = 10) => {
  const whereCondition = name
    ? sql`${products.deletedAt} IS NULL AND ${ilike(products.name, `%${name}%`)}`
    : isNull(products.deletedAt);


  
  const productsList = await db
    .select({
      id: products.id,
      name: products.name,
      categoryId: products.categoryId,
      categoryName: categories.name,
      unitPrice: products.unitPrice,
      unitType: products.unitType,
      quantity: products.quantity,
      minimumQuantity: products.minimumQuantity,
      maximumQuantity: products.maximumQuantity,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(whereCondition)
    .offset(offset)
    .limit(limit);
  return productsList;
}