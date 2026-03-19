import { Request, Response } from 'express';
import * as moveService from '../services/move.service';
import { createMoveSchema } from '../validators/move.validator';
import { AppError } from '../utils/apperror';

export const addMove = async (req: Request, res: Response) => {
  if(!req.user) throw new AppError("Não autorizado", 401);
  const data = createMoveSchema.parse(req.body);
  const move = await moveService.addMove({
    ...data,
    userId: req.user.id
  });
  return res.status(201).json({ error: null, data: move});
};