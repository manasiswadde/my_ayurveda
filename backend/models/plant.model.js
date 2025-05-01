import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true
  },
  scientificName: {
    type: String,
    required: [true, 'Scientific name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  benefits: [{
    type: String,
    required: [true, 'At least one benefit is required']
  }],
  uses: [{
    type: String
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Herb', 'Shrub', 'Tree', 'Climber', 'Other']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Check if the model exists before creating it
export const Plant = mongoose.models.Plant || mongoose.model('Plant', plantSchema); 