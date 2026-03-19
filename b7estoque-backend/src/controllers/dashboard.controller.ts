import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service';

export const getInventoryValue = async (req: Request, res: Response) => {
  const totalValue = await dashboardService.getInventoryValue();
  return res.status(200).json({ error: null, data: { totalValue } });
}