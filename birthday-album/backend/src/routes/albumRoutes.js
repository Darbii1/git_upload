import express from 'express';
import {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from '../controllers/albumController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, createAlbum);
router.get('/', isAuthenticated, getAlbums);
router.get('/:id', isAuthenticated, getAlbumById);
router.put('/:id', isAuthenticated, updateAlbum);
router.delete('/:id', isAuthenticated, deleteAlbum);

export default router;
