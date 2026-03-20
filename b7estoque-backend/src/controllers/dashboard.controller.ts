import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service';
import { dateRangeSchema } from '../validators/dashboard.validator';

export const getInventoryValue = async (req: Request, res: Response) => {
  const totalValue = await dashboardService.getInventoryValue();
  return res.status(200).json({ error: null, data: { totalValue } });
}

export const getMovesSummary = async (req: Request, res: Response) => {
  const query = dateRangeSchema.parse(req.query);
  const data = await dashboardService.getMovesSummary(query);
  return res.status(200).json({ error: null, data });
}

export const getMovesGraph = async (req: Request, res: Response) => {
  const query = dateRangeSchema.parse(req.query);
  const data = await dashboardService.getMovesGraph(query);
  return res.status(200).json({ error: null, data });
}

export const getLowStockProducts = async (req: Request, res: Response) => {
  const data = await dashboardService.getLowStockProducts();
  return res.status(200).json({ error: null, data });
}

export const getStagnantProducts = async (req: Request, res: Response) => {
  const query = dateRangeSchema.parse(req.query);
  const data = await dashboardService.getStagnantProducts(query);
  return res.status(200).json({ error: null, data });
}