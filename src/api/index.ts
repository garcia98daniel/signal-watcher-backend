import { Router } from 'express';
import watchlistRoutes from './watchlists/watchlists.routes';
import eventRoutes from './events/events.routes';
import statisticsRoutes from './statistics/statistics.routes';

const router = Router();

router.use('/watchlists', watchlistRoutes);
router.use('/events', eventRoutes);
router.use('/statistics', statisticsRoutes);

export default router;
