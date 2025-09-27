import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './api/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middlewares
// Configuración de CORS
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (ej. Postman, apps móviles)
    if (!origin) return callback(null, true);

    // Si el origen está en la lista de permitidos, se acepta
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La política de CORS para este sitio no permite el acceso desde el origen especificado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
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
