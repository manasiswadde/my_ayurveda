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
  const PLANT_ID_API_KEY = import.meta.env.VITE_PLANT_ID_API_KEY;
  const PLANT_ID_API_URL = 'https://api.plant.id/v3/identification';

  const getWikipediaDescription = async (plantName) => {
    try {
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(plantName)}`);
      return response.data.extract;
    } catch (error) {
      console.error('Error fetching Wikipedia description:', error);
      return null;
    }
  };

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

    if (!PLANT_ID_API_KEY) {
      setError('API key is not configured');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const base64Data = selectedImage.split(',')[1];

      const data = {
        images: [base64Data],
        classification_level: "species",
        similar_images: true
      };

      console.log('Sending request with API key:', PLANT_ID_API_KEY.substring(0, 5) + '...');

      const response = await axios.post(PLANT_ID_API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': PLANT_ID_API_KEY
        }
      });

      console.log('Full API Response:', JSON.stringify(response.data, null, 2));

      if (response.data.result?.classification?.suggestions && response.data.result.classification.suggestions.length > 0) {
        const plantResult = response.data.result.classification.suggestions[0];
        
        // Fetch Wikipedia description
        const wikiDescription = await getWikipediaDescription(plantResult.name);
        console.log('Wikipedia description:', wikiDescription);
        
        setIdentifiedPlant({
          plant_name: plantResult.name,
          probability: plantResult.probability,
          plant_details: {
            wiki_description: {
              value: wikiDescription || 'Description not available. We will fetch more details about this plant from Wikipedia.'
            }
          }
        });

        const ayurvedicPlant = findAyurvedicMatch(plantResult.name);
        setAyurvedicDetails(ayurvedicPlant);
      } else {
        setError('Could not identify the plant. Please try with a different image.');
      }
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      console.error('Error headers:', err.response?.headers);

      if (err.response?.status === 401) {
        setError('Invalid API key. Please check your configuration.');
      } else if (err.response?.status === 400) {
        setError('Invalid request format. Please check the image format and try again.');
      } else if (err.response?.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
        setError(`Failed to identify plant: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      }
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
            {identifiedPlant.plant_details?.common_names && (
              <p><strong>Common Names:</strong> {identifiedPlant.plant_details.common_names.join(', ')}</p>
            )}
            
            <div className="description">
              <h3>Description</h3>
              <p>{identifiedPlant.plant_details?.wiki_description?.value}</p>
            </div>

            {identifiedPlant.plant_details?.url && (
              <p>
                <strong>Learn more: </strong>
                <a href={identifiedPlant.plant_details.url} target="_blank" rel="noopener noreferrer">
                  Wikipedia
                </a>
              </p>
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