import Bike from '../models/Bike.js';

// Get all bikes -> GET /api/bikes
export const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({});
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a bike entry -> POST /api/bikes
export const createBike = async (req, res) => {
  try {
    const { name, type, pricePerDay } = req.body;
    const newBike = new Bike({ name, type, pricePerDay });
    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};