import { Request, Response } from 'express';
import * as StatisticsService from '@/api/statistics/statistics.service';

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await StatisticsService.getAppStatistics();
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
};
