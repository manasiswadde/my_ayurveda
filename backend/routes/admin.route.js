import express from 'express';
import { isAdmin } from '../middleware/auth.middleware.js';
import { 
  getAllUsers,
  createUser,
  updateUser, 
  deleteUser,
  getAllPlants,
  createPlant,
  updatePlant,
  deletePlant,
  getPlant
} from '../controllers/admin.controller.js';
import {User } from '../models/user.model.js';

const router = express.Router();

// Apply admin middleware to all routes
router.use(isAdmin);

// User management routes
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

// Plant management routes
router.get('/plants', getAllPlants);
router.get('/plants/:plantId', getPlant);
router.post('/plants', createPlant);
router.put('/plants/:plantId', updatePlant);
router.delete('/plants/:plantId', deletePlant);

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 