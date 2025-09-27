import { Router } from 'express';
import * as watchlistController from './watchlists.controller';

const router = Router();

router.get('/', watchlistController.getAllWatchlists);
router.post('/', watchlistController.createNewWatchlist);
router.delete('/:id', watchlistController.deleteSingleWatchlist);

export default router;
