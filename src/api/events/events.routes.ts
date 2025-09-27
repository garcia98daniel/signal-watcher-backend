import { Router } from 'express';
import * as eventController from './events.controller';

const router = Router();

router.get('/', eventController.getAllEvents);
router.post('/simulate', eventController.simulateNewEvent);

export default router;
