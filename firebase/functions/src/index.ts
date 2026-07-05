import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

admin.initializeApp();

const app = express();

const corsOptions = {
  origin: ['https://rawal-hospital.web.app', 'https://rawal-hospital.firebaseapp.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Rawal Hospital API is running on Firebase',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// Import and mount backend routes
import apiRoutes from '../../../backend/src/routes/index';
app.use('/api/v1', apiRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Export as Firebase Cloud Function
export const api = functions.https.onRequest(app);

// Scheduled function for daily cleanup
export const dailyCleanup = functions.pubsub.schedule('0 2 * * *').onRun(async (_context) => {
  console.log('Running daily cleanup...');
  try {
    const db = admin.firestore();
    const expired = await db.collection('tokens')
      .where('expiresAt', '<', new Date())
      .limit(500)
      .get();

    let batch = db.batch();
    let count = 0;
    expired.forEach((doc) => {
      batch.delete(doc.ref);
      count++;
      if (count % 500 === 0) {
        batch.commit();
        batch = db.batch();
      }
    });
    if (count % 500 !== 0) {
      await batch.commit();
    }
    console.log(`Cleaned up ${count} expired tokens`);
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
  return null;
});
