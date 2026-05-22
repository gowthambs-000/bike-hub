const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
// Note: If you have bikeRoutes or bookingRoutes, import them here too:
// const bikeRoutes = require('./routes/bikeRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middleware
app.use(express.json()); // Allows backend to read JSON data from frontend

// CORS Configuration (Allows frontend to talk to backend)
app.use(cors({
  origin: '*', // For development. Change this to your Vercel URL later!
  credentials: true
}));

// Route Middlewares
app.use('/api/auth', authRoutes);
// app.use('/api/bikes', bikeRoutes);       // Uncomment if you have this
// app.use('/api/bookings', bookingRoutes); // Uncomment if you have this

// Root Test Route
app.get('/', (req, res) => {
  res.send('Bike Hub API is running smoothly...');
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bike-hub';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected successfully!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB database connection error:', err.message);
  });