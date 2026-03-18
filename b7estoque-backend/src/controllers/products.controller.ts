import { Request, Response } from 'express';
import * as productService from '../services/products.service';
import { createProductSchema } from '../validators/product.validator';

export const createProduct = async (req: Request, res: Response) => {
  const data = createProductSchema.parse(req.body);
  const product = await productService.createProduct(data);
  return res.status(201).json({ error: null, data: product});
};

