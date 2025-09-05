import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database/script.js';
import bookRoutes from './routes/books.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


connectDatabase();

app.use('/api', bookRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});