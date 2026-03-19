import { Router } from 'express';
import * as movesController from '../controllers/move.controller';

const router = Router();

router.post('/', movesController.addMove);
router.get('/', movesController.listMoves);

export default router;