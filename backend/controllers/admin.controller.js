import { User } from '../models/user.model.js';
import { Plant } from '../models/plant.model.js';
import bcrypt from 'bcryptjs';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

// Create new user (admin only)
export const createUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    // Return user without password
    const userWithoutPassword = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
};

// Update user (admin only)
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullname, email, role, password } = req.body;

    // Prepare update object
    const updateData = {};
    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
};

// Delete a user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
};

// Get all plants (admin only)
export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    return res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch plants'
    });
  }
};

// Get single plant by ID (admin only)
export const getPlant = async (req, res) => {
  try {
    const { plantId } = req.params;
    const plant = await Plant.findById(plantId);
    
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    return res.status(200).json({
      success: true,
      plant
    });
  } catch (error) {
    console.error('Error fetching plant:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch plant'
    });
  }
};

// Create new plant (admin only)
export const createPlant = async (req, res) => {
  try {
    const { name, scientificName, description, benefits, uses, category, imageUrl } = req.body;

    const plant = await Plant.create({
      name,
      scientificName,
      description,
      benefits,
      uses,
      category,
      imageUrl
    });

    return res.status(201).json({
      success: true,
      message: 'Plant created successfully',
      plant
    });
  } catch (error) {
    console.error('Error creating plant:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create plant'
    });
  }
};

// Update plant (admin only)
export const updatePlant = async (req, res) => {
  try {
    const { plantId } = req.params;
    const updateData = req.body;

    const plant = await Plant.findByIdAndUpdate(
      plantId,
      updateData,
      { new: true }
    );

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Plant updated successfully',
      plant
    });
  } catch (error) {
    console.error('Error updating plant:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update plant'
    });
  }
};

// Delete a plant (admin only)
export const deletePlant = async (req, res) => {
  try {
    const { plantId } = req.params;
    const plant = await Plant.findByIdAndDelete(plantId);
    
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Plant deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting plant:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete plant'
    });
  }
};