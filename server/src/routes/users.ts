import express from 'express';
import User from '../models/User.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

export default router;
