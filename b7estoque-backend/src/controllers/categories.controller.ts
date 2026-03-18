import { Request, Response } from 'express';
import { categoryIdSchema, createCategorySchema, listCategoriesSchema, updateCategorySchema } from "../validators/category.validator";
import * as categoryService from '../services/categories.service';
import { AppError } from '../utils/apperror';

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

export const getCategory = async (req: Request, res: Response) => {
  const { id } = categoryIdSchema.parse(req.params);
  const category = await categoryService.getCategoryById(id);
  if (!category) throw new AppError("Categoria não encontrada", 404);
  return res.status(200).json({ error: null, data: category });
}

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = categoryIdSchema.parse(req.params);
  const data = updateCategorySchema.parse(req.body);
  const updatedCategory = await categoryService.updateCategory(id, data);
  if (!updatedCategory) throw new AppError("Categoria não encontrada", 404);
  return res.status(200).json({ error: null, data: updatedCategory });
}