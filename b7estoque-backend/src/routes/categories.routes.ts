import { Router } from 'express';
import * as categoriesController from '../controllers/categories.controller';

const router = Router();

router.post('/', categoriesController.createCategory);

export default router;