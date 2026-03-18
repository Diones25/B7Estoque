import { Router } from 'express';
import * as categoriesController from '../controllers/categories.controller';

const router = Router();

router.post('/', categoriesController.createCategory);
router.get('/', categoriesController.listCategories);
router.get('/:id', categoriesController.getCategory);

export default router;