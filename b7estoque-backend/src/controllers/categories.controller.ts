import { Request, Response } from 'express';
import { createCategorySchema, listCategoriesSchema } from "../validators/category.validator";
import * as categoryService from '../services/categories.service';

export const createCategory = async (req: Request, res: Response) => {
  const data = createCategorySchema.parse(req.body);
  const category = await categoryService.createCategory(data);
  return res.status(201).json({ error: null, data: category});
};

export const listCategories = async (req: Request, res: Response) => {
  const { includeProductsCount } = listCategoriesSchema.parse(req.query);
  const categories = await categoryService.listCategories(includeProductsCount);
  return res.status(200).json({ error: null, data: categories });
}