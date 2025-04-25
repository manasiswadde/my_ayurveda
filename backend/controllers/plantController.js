import Plant from '../models/Plant.js';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to preprocess image
async function preprocessImage(imageBuffer) {
  try {
    // Resize image to a standard size
    const processedImage = await sharp(imageBuffer)
      .resize(200, 200)
      .toBuffer();
    
    return processedImage;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw error;
  }
}

// Function to get image color histogram
async function getImageHistogram(imageBuffer) {
  try {
    const { data, info } = await sharp(imageBuffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const histogram = new Array(256).fill(0);
    for (let i = 0; i < data.length; i += 3) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = Math.round((r + g + b) / 3);
      histogram[gray]++;
    }

    // Normalize histogram
    const total = histogram.reduce((sum, val) => sum + val, 0);
    return histogram.map(val => val / total);
  } catch (error) {
    console.error('Error getting image histogram:', error);
    throw error;
  }
}

// Function to calculate histogram similarity
function calculateSimilarity(hist1, hist2) {
  let similarity = 0;
  for (let i = 0; i < hist1.length; i++) {
    similarity += Math.min(hist1[i], hist2[i]);
  }
  return similarity;
}

// Function to find similar plants
async function findSimilarPlants(inputHistogram) {
  try {
    const plants = await Plant.find({});
    let bestMatch = null;
    let highestSimilarity = 0;

    for (const plant of plants) {
      // Get the first image for comparison
      const imagePath = path.join(process.cwd(), plant.images[0]);
      const imageBuffer = await fs.promises.readFile(imagePath);
      const processedImage = await preprocessImage(imageBuffer);
      const plantHistogram = await getImageHistogram(processedImage);
      
      const similarity = calculateSimilarity(inputHistogram, plantHistogram);
      
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = plant;
      }
    }

    return { plant: bestMatch, confidence: highestSimilarity };
  } catch (error) {
    console.error('Error finding similar plants:', error);
    throw error;
  }
}

// Controller functions
export const identifyPlant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Preprocess image
    const processedImage = await preprocessImage(req.file.buffer);
    
    // Get image histogram
    const inputHistogram = await getImageHistogram(processedImage);

    // Find similar plants
    const { plant: identifiedPlant, confidence } = await findSimilarPlants(inputHistogram);

    if (!identifiedPlant) {
      return res.status(404).json({ error: 'No matching plant found' });
    }

    // Return plant information
    res.json({
      name: identifiedPlant.name,
      scientificName: identifiedPlant.scientificName,
      description: identifiedPlant.description,
      uses: identifiedPlant.uses,
      medicinalProperties: identifiedPlant.medicinalProperties,
      confidence: Math.round(confidence * 100)
    });
  } catch (error) {
    console.error('Error identifying plant:', error);
    res.status(500).json({ error: 'Failed to identify plant' });
  }
};

export const addPlant = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    const { name, scientificName, description, uses, medicinalProperties } = req.body;

    // Save images
    const imagePaths = req.files.map(file => file.path);

    // Create new plant
    const plant = new Plant({
      name,
      scientificName,
      description,
      uses: JSON.parse(uses),
      medicinalProperties: JSON.parse(medicinalProperties),
      images: imagePaths
    });

    await plant.save();

    res.status(201).json({ message: 'Plant added successfully', plant });
  } catch (error) {
    console.error('Error adding plant:', error);
    res.status(500).json({ error: 'Failed to add plant' });
  }
};

export default {
  identifyPlant,
  addPlant
}; 