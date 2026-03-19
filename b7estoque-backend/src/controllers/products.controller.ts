import { Request, Response } from 'express';
import * as productService from '../services/products.service';
import { createProductSchema, listProductsSchema } from '../validators/product.validator';

export const createProduct = async (req: Request, res: Response) => {
  const data = createProductSchema.parse(req.body);
  const product = await productService.createProduct(data);
  return res.status(201).json({ error: null, data: product});
};

export const listProducts = async (req: Request, res: Response) => {
  const { name, offset, limit } = listProductsSchema.parse(req.query);
  const products = await productService.listProducts(name, offset, limit);
  return res.status(200).json({ error: null, data: products });
}
