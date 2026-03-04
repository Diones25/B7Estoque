import { Request, Response, NextFunction} from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/apperror";

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message, data: null });
  }

  if (error instanceof ZodError) {
    const errorMessage = error.issues.map((err) => err.message).join(", ");
    return res.status(400).json({ error: errorMessage, data: null });
  }

  console.error('Error: ',error);
  return res.status(500).json({ error: 'Erro interno do servidor', data: null });
}