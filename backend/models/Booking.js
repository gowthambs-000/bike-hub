import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bikeName: { type: String, required: true },
  rentalDays: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);