import { Request, Response } from 'express';
import * as productService from '../services/products.service';
import { createProductSchema, listProductsSchema, productIdSchema } from '../validators/product.validator';
import { AppError } from '../utils/apperror';

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

export const getProduct = async (req: Request, res: Response) => {
  const { id } = productIdSchema.parse(req.params);
  const product = await productService.getProductByIdWithDetails(id);
  if (!product) throw new AppError('Produto não encontrado', 404);
  return res.status(200).json({ error: null, data: product });
};