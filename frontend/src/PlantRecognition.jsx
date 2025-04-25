import React, { useState } from 'react';
import axios from 'axios';
import { plants } from './plantData';
import './PlantRecognition.css';

const PlantRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [identifiedPlant, setIdentifiedPlant] = useState(null);
  const [ayurvedicDetails, setAyurvedicDetails] = useState(null);

  // Plant.id API configuration
  const PLANT_ID_API_KEY = import.meta.env.VITE_PLANT_ID_API_KEY || 'YOUR_API_KEY_HERE';
  const PLANT_ID_API_URL = 'https://api.plant.id/v2/identify';

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10000000) { // 10MB limit
        setError('Image size should be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setError('');
        setIdentifiedPlant(null);
        setAyurvedicDetails(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const findAyurvedicMatch = (scientificName) => {
    // Convert scientific name to lowercase for case-insensitive matching
    const normalizedName = scientificName.toLowerCase();
    
    // Find matching plant from your database
    return plants.find(plant => 
      plant.scientificName?.toLowerCase() === normalizedName ||
      plant.commonNames?.some(name => name.toLowerCase() === normalizedName)
    );
  };

  const identifyPlant = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Convert base64 image to binary
      const base64Data = selectedImage.split(',')[1];

      // Prepare data for Plant.id API
      const data = {
        api_key: PLANT_ID_API_KEY,
        images: [base64Data],
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: ["common_names", "url", "wiki_description", "taxonomy"]
      };

      // Make API request to Plant.id
      const response = await axios.post(PLANT_ID_API_URL, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.suggestions && response.data.suggestions.length > 0) {
        const plantResult = response.data.suggestions[0];
        setIdentifiedPlant(plantResult);

        // Find matching Ayurvedic plant
        const ayurvedicPlant = findAyurvedicMatch(plantResult.plant_name);
        setAyurvedicDetails(ayurvedicPlant);
      } else {
        setError('Could not identify the plant. Please try with a different image.');
      }
    } catch (err) {
      console.error('Error identifying plant:', err);
      setError('Failed to identify plant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plant-recognition-container">
      <h1>Plant Recognition</h1>
      
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        
        {selectedImage && (
          <div className="preview-section">
            <img 
              src={selectedImage} 
              alt="Selected plant" 
              className="preview-image"
            />
            <button 
              onClick={identifyPlant}
              disabled={loading}
              className="identify-button"
            >
              {loading ? 'Identifying...' : 'Identify Plant'}
            </button>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {identifiedPlant && (
          <div className="result-section">
            <h2>Identified Plant</h2>
            <p><strong>Scientific Name:</strong> {identifiedPlant.plant_name}</p>
            <p><strong>Confidence:</strong> {Math.round(identifiedPlant.probability * 100)}%</p>
            
            {identifiedPlant.plant_details?.wiki_description?.value && (
              <div className="description">
                <h3>Description</h3>
                <p>{identifiedPlant.plant_details.wiki_description.value}</p>
              </div>
            )}
          </div>
        )}

        {ayurvedicDetails && (
          <div className="ayurvedic-section">
            <h2>Ayurvedic Details</h2>
            <img 
              src={ayurvedicDetails.image} 
              alt={ayurvedicDetails.name}
              className="ayurvedic-image"
            />
            <h3>{ayurvedicDetails.name}</h3>
            <p><strong>Sanskrit Name:</strong> {ayurvedicDetails.sanskritName}</p>
            <div className="uses">
              <h3>Medicinal Uses</h3>
              <ul>
                {ayurvedicDetails.uses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>
            <div className="preparation">
              <h3>How to Use</h3>
              <p>{ayurvedicDetails.preparation}</p>
            </div>
            {ayurvedicDetails.precautions && (
              <div className="precautions">
                <h3>Precautions</h3>
                <p>{ayurvedicDetails.precautions}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantRecognition; 