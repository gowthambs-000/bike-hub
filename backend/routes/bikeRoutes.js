import express from 'express';
import { getBikes, createBike } from '../controllers/bikeController.js';

const router = express.Router();

router.route('/')
  .get(getBikes)
  .post(createBike);

export default router;