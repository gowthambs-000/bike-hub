import mongoose from 'mongoose';

const bikeSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Mountain, Cruiser, Road
  pricePerDay: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

const Bike = mongoose.model('Bike', bikeSchema);
export default Bike;