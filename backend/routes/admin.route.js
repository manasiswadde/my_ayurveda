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

export default router; 