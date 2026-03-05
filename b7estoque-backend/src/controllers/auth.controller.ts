import { Request, Response } from 'express';
import { AuthLoginSchema } from '../validators/auth.validator';
import * as userService from '../services/user.service';
import { AppError } from '../utils/apperror';

export const login = async (req: Request, res: Response) => {
  const data = AuthLoginSchema.parse(req.body); 
  const result = await userService.login(data.email, data.password);
  if (!result) {
    throw new AppError('Credenciais inválidas', 401);
  }
  return res.status(200).json({ error: null, data: result});
};

export const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [bearer, token] = authHeader.split(' ');
    if (token) {
      await userService.logout(token);
    }
  }
  
  return res.status(200).json({ error: null, data: { message: 'Logout realizado com sucesso'} });
};