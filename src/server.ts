import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://order-manager-assessment.vercel.app',  // Allow production frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
};

// Apply CORS middleware globally
app.use(cors(corsOptions));  // This will handle OPTIONS requests automatically

// Log the headers of each response for debugging purposes
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Response Headers:', res.getHeaders());
  });
  next();
});

app.use(morgan('dev'));  // Logs requests in a concise format
app.use(express.json());

// Use /api prefix for menu and order routes
app.use('/api', menuRoutes);  
app.use('/api', orderRoutes);

// Basic server check
app.get('/', (req: Request, res: Response) => {
  res.send('Order Management API');
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
