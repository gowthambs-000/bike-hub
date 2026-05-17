import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import bikeRoutes from './routes/bikeRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Link our modular routes
app.use('/api/bikes', bikeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🏍️  Server kicking it on port ${PORT}`));