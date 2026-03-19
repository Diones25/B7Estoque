import { Request, Response } from 'express';
import * as moveService from '../services/move.service';
import { createMoveSchema, listMovesSchema } from '../validators/move.validator';
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

export const listMoves = async (req: Request, res: Response) => {
  const query = listMovesSchema.parse(req.query);
  const moves = await moveService.listMoves(query);
  return res.status(200).json({ error: null, data: moves });
}