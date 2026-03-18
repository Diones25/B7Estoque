import { Request, Response } from 'express';
import { createCategorySchema } from "../validators/category.validator";
import * as categoryService from '../services/categories.service';

export const createCategory = async (req: Request, res: Response) => {
  const data = createCategorySchema.parse(req.body);
  const category = await categoryService.createCategory(data);
  return res.status(201).json({ error: null, data: category});
};