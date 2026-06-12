import express from 'express';
import passport from 'passport';
import {
  handleGoogleCallback,
  getProfile,
  logout,
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  handleGoogleCallback
);

router.get('/profile', isAuthenticated, getProfile);
router.post('/logout', logout);

export default router;
