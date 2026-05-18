import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// POST route to register a new superbike booking request
router.post('/add', async (req, res) => {
  try {
    const { bikeName, rentalDays, customerName, customerPhone } = req.body;
    
    const newBooking = new Booking({
      bikeName,
      rentalDays,
      customerName,
      customerPhone
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, data: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET route so admins can see all reservation logs (Optional bonus)
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;