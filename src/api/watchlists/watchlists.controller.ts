import { Request, Response } from 'express';
import * as watchlistService from '@/core/watchlists/watchlists.service';

export const getAllWatchlists = async (req: Request, res: Response) => {
  try {
    const watchlists = await watchlistService.getWatchlists();
    res.status(200).json(watchlists);
  } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Error al obtener las listas de observación' });
  }
};

export const createNewWatchlist = async (req: Request, res: Response) => {
  try {
    const newWatchlist = await watchlistService.createWatchlist(req.body);
    res.status(201).json(newWatchlist);
  } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Error al crear la lista de observación' });
  }
};

export const deleteSingleWatchlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await watchlistService.deleteWatchlist(id);
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Error al eliminar la lista de observación' });
  }
};
