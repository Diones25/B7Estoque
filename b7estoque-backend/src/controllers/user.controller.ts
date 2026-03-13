import { Request, Response } from 'express';
import { createUserSchema, listUsersSchema } from '../validators/user.validator';
import * as userService from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  const data = createUserSchema.parse(req.body);
  const user = await userService.createUser(data);
  return res.status(201).json({ error: null, data: user});
};

export const listUsers = async (req: Request, res: Response) => {
  const { offset, limit } = listUsersSchema.parse(req.query);
  const users = await userService.listUsers(offset, limit);
  return res.status(200).json({ error: null, data: users });
}