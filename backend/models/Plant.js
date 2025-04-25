import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  scientificName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uses: {
    type: [String],
    required: true
  },
  medicinalProperties: {
    type: [String],
    required: true
  },
  images: {
    type: [String], // Array of image URLs
    required: true
  },
  features: {
    type: [String], // Array of distinguishing features
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Plant', plantSchema); 