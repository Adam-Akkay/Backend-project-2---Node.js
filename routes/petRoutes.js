import express from 'express';
import {
  getAllPets,
  getPetById,
  searchPets,
  createPet,
  updatePet,
  deletePet
} from '../controllers/petController.js';
import { validatePet } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllPets);
router.get('/search', searchPets);
router.get('/:id', getPetById);
router.post('/', validatePet, createPet);
router.put('/:id', validatePet, updatePet);
router.delete('/:id', deletePet);

export default router;
