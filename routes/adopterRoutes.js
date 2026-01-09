import express from 'express';
import {
  getAllAdopters,
  getAdopterById,
  searchAdopters,
  createAdopter,
  updateAdopter,
  deleteAdopter
} from '../controllers/adopterController.js';
import { validateAdopter } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllAdopters);
router.get('/search', searchAdopters);
router.get('/:id', getAdopterById);
router.post('/', validateAdopter, createAdopter);
router.put('/:id', validateAdopter, updateAdopter);
router.delete('/:id', deleteAdopter);

export default router;
