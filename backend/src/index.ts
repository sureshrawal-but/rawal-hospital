import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import { logger } from './utils/logger';

const app = express();

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Rawal Hospital API', docs: '/api/health', frontend: config.frontendUrl });
});

// Vercel strips the /api prefix from serverless function URLs, so restore it
if (process.env.VERCEL) {
  app.use((req, _res, next) => {
    if (req.url && !req.url.startsWith('/api')) {
      req.url = '/api' + req.url;
    }
    next();
  });
}

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined', { stream: { write: (message: string) => logger.http(message.trim()) } }));

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use('/api/v1', routes);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Rawal Hospital API is running', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;

// Only start the server in non-serverless environments
if (!process.env.VERCEL) {
  const startServer = async () => {
    await connectDatabase();
    app.listen(config.port, () => {
      logger.info(`Rawal Hospital API running on port ${config.port} in ${config.nodeEnv} mode`);
      console.log(`Server: http://localhost:${config.port}`);
      console.log(`Health: http://localhost:${config.port}/api/health`);
    });
  };

  startServer().catch((error) => {
    logger.error('Failed to start server:', error);
    process.exit(1);
  });
}
