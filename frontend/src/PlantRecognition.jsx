import React, { useState, useRef, useEffect } from 'react';
import { plants } from './plantData';
import './PlantRecognition.css';

const PlantRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedPlant, setMatchedPlant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);
  const [plantImages, setPlantImages] = useState([]);

  // Load all plant images on component mount
  useEffect(() => {
    const loadPlantImages = async () => {
      try {
        const loadedImages = await Promise.all(
          plants.map(async (plant) => {
            const img = new Image();
            img.src = plant.image;
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
            return {
              ...plant,
              imageElement: img
            };
          })
        );
        setPlantImages(loadedImages);
      } catch (err) {
        setError('Failed to load plant images. Please try again later.');
        console.error('Error loading plant images:', err);
      }
    };

    loadPlantImages();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setMatchedPlant(null);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const getImageData = (image) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Resize image to a standard size for comparison
        const maxSize = 300;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to grayscale for shape analysis
        const imageData = ctx.getImageData(0, 0, width, height);
        const grayscaleData = convertToGrayscale(imageData);
        
        resolve({
          colorData: imageData,
          grayscaleData,
          width,
          height
        });
      };
      
      img.src = image;
    });
  };

  const convertToGrayscale = (imageData) => {
    const data = imageData.data;
    const grayscaleData = new Uint8ClampedArray(data.length);
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Convert to grayscale using luminance formula
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      
      grayscaleData[i] = gray;
      grayscaleData[i + 1] = gray;
      grayscaleData[i + 2] = gray;
      grayscaleData[i + 3] = a;
    }
    
    return grayscaleData;
  };

  const calculateColorHistogram = (imageData) => {
    const histogram = new Array(256).fill(0);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue; // Skip transparent pixels
      
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Convert RGB to grayscale
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      histogram[gray]++;
    }
    
    // Normalize histogram
    const total = histogram.reduce((sum, val) => sum + val, 0);
    return histogram.map(val => val / total);
  };

  const calculateEdgeDensity = (grayscaleData, width, height) => {
    let edgeCount = 0;
    let totalPixels = 0;
    
    // Simple edge detection using Sobel operator
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = (y * width + x) * 4;
        
        // Sobel kernels
        const gx = 
          -1 * grayscaleData[i - width * 4 - 4] + 
          -2 * grayscaleData[i - width * 4] + 
          -1 * grayscaleData[i - width * 4 + 4] +
          1 * grayscaleData[i + width * 4 - 4] + 
          2 * grayscaleData[i + width * 4] + 
          1 * grayscaleData[i + width * 4 + 4];
          
        const gy = 
          -1 * grayscaleData[i - width * 4 - 4] + 
          -2 * grayscaleData[i - 4] + 
          -1 * grayscaleData[i + width * 4 - 4] +
          1 * grayscaleData[i - width * 4 + 4] + 
          2 * grayscaleData[i + 4] + 
          1 * grayscaleData[i + width * 4 + 4];
          
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        if (magnitude > 50) edgeCount++;
        totalPixels++;
      }
    }
    
    return edgeCount / totalPixels;
  };

  const calculateSimilarity = (features1, features2) => {
    // Compare color histograms
    const histogramDiff = features1.histogram.reduce((sum, val, i) => 
      sum + Math.abs(val - features2.histogram[i]), 0);
    
    // Compare edge densities
    const edgeDiff = Math.abs(features1.edgeDensity - features2.edgeDensity);
    
    // Combine features with weights
    const similarity = 1 - (0.7 * histogramDiff + 0.3 * edgeDiff);
    return Math.max(0, Math.min(1, similarity));
  };

  const extractFeatures = (imageData) => {
    return {
      histogram: calculateColorHistogram(imageData.colorData),
      edgeDensity: calculateEdgeDensity(
        imageData.grayscaleData,
        imageData.width,
        imageData.height
      )
    };
  };

  const processImage = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    if (plantImages.length === 0) {
      setError('Plant images are still loading. Please wait a moment.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const uploadedImageData = await getImageData(selectedImage);
      const uploadedFeatures = extractFeatures(uploadedImageData);
      
      let bestMatch = null;
      let highestSimilarity = 0;
      let matches = [];

      for (const plant of plantImages) {
        const canvas = document.createElement('canvas');
        canvas.width = plant.imageElement.width;
        canvas.height = plant.imageElement.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(plant.imageElement, 0, 0);
        
        const plantImageData = await getImageData(plant.image);
        const plantFeatures = extractFeatures(plantImageData);
        
        const similarity = calculateSimilarity(uploadedFeatures, plantFeatures);
        matches.push({ plant, similarity });

        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          bestMatch = plant;
        }
      }

      // Sort matches by similarity for debugging
      matches.sort((a, b) => b.similarity - a.similarity);
      console.log('Top 3 matches:', matches.slice(0, 3).map(m => ({
        name: m.plant.name,
        similarity: m.similarity
      })));

      if (bestMatch && highestSimilarity > 0.3) { // Minimum similarity threshold
        setMatchedPlant({
          ...bestMatch,
          confidence: Math.round(highestSimilarity * 100)
        });
      } else {
        setError('No matching plant found. Please try a different image.');
      }
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Error processing image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Plant Recognition</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100"
        />
      </div>

      {selectedImage && (
        <div className="mb-4">
          <img
            src={selectedImage}
            alt="Selected plant"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
          <button
            onClick={processImage}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Identify Plant'}
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {matchedPlant && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">{matchedPlant.name}</h2>
          <p className="text-sm text-gray-600 mb-2">
            Confidence: {matchedPlant.confidence}%
          </p>
          <img
            src={matchedPlant.image}
            alt={matchedPlant.name}
            className="w-48 h-48 object-cover rounded-lg mb-4"
          />
          <p className="mb-4">{matchedPlant.description}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Uses:</h3>
            <ul className="list-disc list-inside">
              {matchedPlant.uses.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Medicinal Properties:</h3>
            <ul className="list-disc list-inside">
              {matchedPlant.medicinalProperties.map((property, index) => (
                <li key={index}>{property}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantRecognition; 