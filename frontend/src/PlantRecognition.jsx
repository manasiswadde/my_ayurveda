import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { plants } from './plantData';
import './PlantRecognition.css';

const PlantRecognition = ({ onPlantIdentified }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [identifiedPlant, setIdentifiedPlant] = useState(null);
  const [ayurvedicDetails, setAyurvedicDetails] = useState(null);

  // Plant.id API configuration
  const PLANT_ID_API_KEY = import.meta.env.VITE_PLANT_ID_API_KEY;
  const PLANT_ID_API_URL = 'https://api.plant.id/v3/identification';

  const handleBack = () => {
    navigate('/feature');
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
    // Convert scientific name to lowercase and remove any extra spaces
    const normalizedName = scientificName.toLowerCase().trim();
    
    // Find matching plant from your database
    return plants.find(plant => {
      // Check scientific name (if available)
      if (plant.scientificName) {
        if (plant.scientificName.toLowerCase() === normalizedName) {
          return true;
        }
      }
      
      // Check common names (if available)
      if (plant.commonNames) {
        if (plant.commonNames.some(name => name.toLowerCase() === normalizedName)) {
          return true;
        }
      }
      
      // Check plant name as fallback
      if (plant.name.toLowerCase() === normalizedName) {
        return true;
      }
      
      // Additional fuzzy matching for partial matches
      if (normalizedName.includes('aloe vera') || normalizedName.includes('aloe barbadensis')) {
        return plant.name.toLowerCase() === 'aloe vera';
      }
      
      return false;
    });
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

      const response = await axios.post(PLANT_ID_API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': PLANT_ID_API_KEY
        }
      });

      if (response.data.result?.classification?.suggestions && response.data.result.classification.suggestions.length > 0) {
        const plantResult = response.data.result.classification.suggestions[0];
        const ayurvedicPlant = findAyurvedicMatch(plantResult.name);
        
        if (ayurvedicPlant) {
          onPlantIdentified(ayurvedicPlant);
          navigate('/ayurvedic-profile');
        } else {
          setError('This plant is not found in our Ayurvedic database. Please try another plant.');
        }
      } else {
        setError('Could not identify the plant. Please try with a different image.');
      }
    } catch (err) {
      console.error('Error:', err);

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
      <button className="back-button" onClick={handleBack}>Back</button>
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
          </div>
        )}

        {ayurvedicDetails && (
          <div className="ayurvedic-section">
            <h2>Ayurvedic Profile</h2>
            
            <div className="plant-header">
              <img 
                src={ayurvedicDetails.image} 
                alt={ayurvedicDetails.name}
                className="ayurvedic-image"
              />
              <div className="plant-names">
                <h3>{ayurvedicDetails.name}</h3>
                <p><strong>Scientific Name:</strong> {ayurvedicDetails.scientificName}</p>
                <p><strong>Sanskrit Name:</strong> {ayurvedicDetails.sanskritName}</p>
                <p><strong>Common Names:</strong> {ayurvedicDetails.commonNames.join(', ')}</p>
              </div>
            </div>

            <div className="medicinal-uses">
              <h3>Medicinal Uses</h3>
              <ul>
                {ayurvedicDetails.medicinialUses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>

            <div className="parts-used">
              <h3>Parts Used</h3>
              {Object.entries(ayurvedicDetails.partsUsed).map(([part, description]) => (
                <div key={part} className="part-item">
                  <strong>{part.replace('_', ' ').charAt(0).toUpperCase() + part.slice(1)}:</strong> {description}
                </div>
              ))}
            </div>

            <div className="preparation-methods">
              <h3>How to Use</h3>
              {Object.entries(ayurvedicDetails.preparationMethods).map(([method, description]) => (
                <div key={method} className="method-item">
                  <strong>{method.charAt(0).toUpperCase() + method.slice(1)}:</strong> {description}
                </div>
              ))}
            </div>

            <div className="dosage-precautions">
              <h3>Dosage and Precautions</h3>
              <div className="standard-dosage">
                <strong>Standard Dosage:</strong>
                <ul>
                  {Object.entries(ayurvedicDetails.dosageAndPrecautions.standardDosage).map(([form, dosage]) => (
                    <li key={form}>
                      <strong>{form.charAt(0).toUpperCase() + form.slice(1)}:</strong> {dosage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="precautions">
                <strong>Precautions:</strong>
                <ul>
                  {ayurvedicDetails.dosageAndPrecautions.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="active-compounds">
              <h3>Active Compounds</h3>
              {ayurvedicDetails.activeCompounds.map((compound, index) => (
                <div key={index} className="compound-item">
                  <strong>{compound.name}:</strong> {compound.properties}
                </div>
              ))}
            </div>

            <div className="traditional-knowledge">
              <h3>Traditional Knowledge</h3>
              <div className="ayurvedic-properties">
                <p><strong>Rasa (Taste):</strong> {ayurvedicDetails.traditionalKnowledge.rasa.join(', ')}</p>
                <p><strong>Guna (Properties):</strong> {ayurvedicDetails.traditionalKnowledge.guna.join(', ')}</p>
                <p><strong>Virya (Potency):</strong> {ayurvedicDetails.traditionalKnowledge.virya}</p>
                <p><strong>Vipaka (Post-digestive effect):</strong> {ayurvedicDetails.traditionalKnowledge.vipaka}</p>
                <p><strong>Effect on Doshas:</strong> {ayurvedicDetails.traditionalKnowledge.doshaEffect}</p>
              </div>
            </div>

            <div className="habitat-cultivation">
              <h3>Habitat and Cultivation</h3>
              <p><strong>Natural Habitat:</strong> {ayurvedicDetails.habitatAndCultivation.naturalHabitat}</p>
              <p><strong>Cultivation:</strong> {ayurvedicDetails.habitatAndCultivation.cultivation}</p>
              <p><strong>Growing Conditions:</strong> {ayurvedicDetails.habitatAndCultivation.growingConditions}</p>
            </div>

            <div className="classical-references">
              <h3>Classical References</h3>
              {ayurvedicDetails.classicalReferences.map((reference, index) => (
                <div key={index} className="reference-item">
                  <strong>{reference.text}:</strong> {reference.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantRecognition; 