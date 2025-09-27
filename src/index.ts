import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from '@/api';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // Permitir solo el frontend
app.use(express.json());

// API Routes
app.use('/api/v1', apiRouter);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Signal Watcher Backend is running!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
