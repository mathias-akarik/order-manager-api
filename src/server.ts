import express, { Request, Response } from 'express';
import cors from 'cors';  // Import CORS middleware
import morgan from 'morgan';  // Import Morgan for logging
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',  // Allow local development
    'https://raftlabs-order-manager-assessment.vercel.app',  // Allow production frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true,  // Allow credentials (cookies, authorization headers)
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
};

// Apply CORS middleware globally before routes
app.use(cors(corsOptions));

// Use morgan for logging every request to the console
app.use(morgan('dev'));  // Logs requests in a concise format

// Parse JSON request bodies
app.use(express.json());  // For parsing application/json

// Use /api prefix for menu and order routes
app.use('/api', menuRoutes);  // Menu routes with /api prefix
app.use('/api', orderRoutes);  // Order routes with /api prefix

// Basic server health check route
app.get('/', (req: Request, res: Response) => {
  res.send('Order Management API');
});

// Export app for testing purposes (e.g. for unit tests)
export default app;

// Set the server to listen on the appropriate port (Render uses 10000 by default)
const PORT = process.env.PORT || 10000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

