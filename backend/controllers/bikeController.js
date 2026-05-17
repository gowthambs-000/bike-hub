import Bike from '../models/Bike.js';

// @desc    Get all showroom bikes
// @route   GET /api/bikes
// @access  Public
export const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({});
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new bike entry
// @route   POST /api/bikes
// @access  Public
export const createBike = async (req, res) => {
  try {
    const { name, type, pricePerDay, isAvailable } = req.body;

    // Build the bike entry using all passed data fields from Thunder Client
    const newBike = new Bike({
      name,
      type,
      pricePerDay,
      isAvailable // Captures true or false seamlessly
    });

    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};