import express from 'express';
import {
  createMemory,
  getMemoriesByAlbum,
  updateMemory,
  deleteMemory,
} from '../controllers/memoryController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, createMemory);
router.get('/album/:albumId', isAuthenticated, getMemoriesByAlbum);
router.put('/:id', isAuthenticated, updateMemory);
router.delete('/:id', isAuthenticated, deleteMemory);

export default router;
