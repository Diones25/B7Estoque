import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/apperror";
import { validateToken } from "../helpers/validateToken";
import { User } from "../db/schema";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new AppError("Não autorizado", 401));

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return next(new AppError("Não autorizado", 401));

  const user = await validateToken(token);
  if (!user) return next(new AppError("Não autorizado", 401));
  
  req.user = user;
  next();
}