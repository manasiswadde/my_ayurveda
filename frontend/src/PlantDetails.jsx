import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PlantDetails.css';

const PlantDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plant = location.state;

  if (!plant) {
    return (
      <div className="plant-detail-page">
        <h2>Plant not found</h2>
        <button className="back-button" onClick={() => navigate(-1)}>
          <span>←</span> Go Back
        </button>
      </div>
    );
  }

  // Example benefits - ideally these would come from your plant data
  const benefits = plant.benefits || ["Anti-inflammatory", "Analgesic", "Natural healing"];
  
  // Example properties - these would ideally come from your data
  const properties = [
    { name: "Nature", value: "Cooling" },
    { name: "Taste", value: "Bitter, Sweet" },
    { name: "Dosha", value: "Pitta, Kapha" },
    { name: "Potency", value: "Medium" }
  ];

  return (
    <div className="plant-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <span>←</span> Go Back
      </button>
      
      <h1 className="plant-name">{plant.name}</h1>
      <p className="scientific-name">{plant.scientificName || "Abutilon Indicum"}</p>
      
      <div className="benefit-tags">
        {benefits.map((benefit, index) => (
          <span key={index} className="benefit-tag">{benefit}</span>
        ))}
      </div>
      
      <div className="center-container">
        <img src={plant.image} alt={plant.name} className="plant-image" />
        
        <div className="text-content">
          <p className="plant-description">{plant.description}</p>
          
          <div className="plant-uses">
            <strong>Uses</strong> 
            {plant.uses}
          </div>
          
          <div className="medicinal-properties">
            {properties.map((prop, index) => (
              <div key={index} className="property-card">
                <h3>{prop.name}</h3>
                <p>{prop.value}</p>
              </div>
            ))}
          </div>
          
          <div className="plant-details">
            <strong>Details</strong> 
            {plant.details}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;