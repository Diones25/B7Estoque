import { db } from "../db/connection";
import { NewProduct, products } from "../db/schema";
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
