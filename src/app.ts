// src/app.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://order-manager-assessment.vercel.app',
    'http://localhost:3000',
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// API routes
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);

// Health check
app.get('/', (_, res) => {
  res.send('Order Management API');
});

export default app;
