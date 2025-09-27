import { Router } from 'express';
import * as StatisticsController from '@/api/statistics/statistics.controller';

const router = Router();

router.get('/', StatisticsController.getStatistics);

export default router;
