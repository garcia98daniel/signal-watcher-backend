import { Request, Response } from 'express';
import * as eventService from '@/core/events/events.service';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};

export const simulateNewEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = await eventService.createSimulatedEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Error al simular el evento' });
  }
};
