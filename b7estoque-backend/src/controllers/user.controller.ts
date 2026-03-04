import { Request, Response } from 'express';
import { createUserSchema } from '../validators/user.validator';
import * as userService from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  const data = createUserSchema.parse(req.body);
  const user = await userService.createUser(data);
  return res.status(201).json({ error: null, data: user});
};