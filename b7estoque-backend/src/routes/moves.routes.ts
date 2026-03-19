import { Router } from 'express';
import * as movesController from '../controllers/move.controller';

const router = Router();

router.post('/', movesController.addMove);

export default router;