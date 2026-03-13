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

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) return null;

  const user = await userService.getUserByIdPublic(req.user.id);
  if (!user) throw new AppError('Usuário não encontrado', 404);
  
  return res.status(200).json({ error: null, data: user });
}