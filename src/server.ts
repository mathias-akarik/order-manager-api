import express, { Request, Response } from 'express';
import cors from 'cors';  // Import CORS middleware
import morgan from 'morgan';  // Import Morgan for logging
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Allow local development
    'https://raftlabs-order-manager-assessment.vercel.app' // Allow production frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies and credentials
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Use morgan for logging every request to the console
app.use(morgan('dev'));  // Logs requests in a concise format

app.use(express.json());  // For parsing application/json

// Use /api prefix for menu and order routes
app.use('/api', menuRoutes);  // Prefix with /api
app.use('/api', orderRoutes);  // Prefix with /api

// Basic server check
app.get('/', (req: Request, res: Response) => {
  res.send('Order Management API');
});

// Export app for testing purposes
export default app;

const PORT = process.env.PORT || 10000; // Render uses 10000 by default

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
