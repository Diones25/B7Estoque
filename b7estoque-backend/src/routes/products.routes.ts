import { Router } from 'express';
import * as productsController from '../controllers/products.controller';

const router = Router();

router.post('/', productsController.createProduct);

export default router;