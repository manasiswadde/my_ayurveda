import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PlantDetails.css';

const PlantDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plant = location.state;
  
  // State for image zoom effect
  const [isZoomed, setIsZoomed] = useState(false);

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

  // Enhanced benefits with icons
  const benefits = plant.benefits || [
    "Anti-inflammatory", 
    "Analgesic", 
    "Natural healing", 
    "Antioxidant", 
    "Digestive aid"
  ];
  
  // Enhanced properties with more information
  const properties = [
    { name: "Nature", value: plant.nature || "Cooling" },
    { name: "Taste", value: plant.taste || "Bitter, Sweet" },
    { name: "Dosha", value: plant.dosha || "Pitta, Kapha" },
    { name: "Potency", value: plant.potency || "Medium" },
    { name: "Part Used", value: plant.partUsed || "Leaves, Roots, Seeds" },
    { name: "Habitat", value: plant.habitat || "Tropical & Subtropical Regions" }
  ];

  // More detailed plant information
  const detailedInfo = {
    growthPattern: plant.growthPattern || "Annual herb growing up to 1-2 meters tall with velvety branches and heart-shaped leaves",
    traditionalUse: plant.traditionalUse || "Used in traditional Ayurvedic medicine for centuries, particularly for inflammatory conditions and wound healing",
    chemicalConstituents: plant.chemicalConstituents || "Contains flavonoids, alkaloids, steroids, tannins, saponins, and various essential oils that contribute to its medicinal properties",
    research: plant.research || "Recent studies have shown potential antimicrobial, antidiabetic, and hepatoprotective effects, confirming many traditional uses"
  };

  return (
    <div className="plant-detail-page">
      {/* Modified header section to prevent overlap */}
      <div className="header-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span>←</span> Go Back
        </button>
      </div>
      
      <div className="main-content">
        {/* Plant image section */}
        <div 
          className="plant-image-container" 
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="plant-image" 
            style={{ 
              transform: isZoomed ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        </div>
        
        {/* Plant names after the image */}
        <div className="plant-info-header">
          <h1 className="plant-name">{plant.name}</h1>
          <p className="scientific-name">{plant.scientificName || "Abutilon indicum"}</p>
          
          <div className="benefit-tags">
            {benefits.map((benefit, index) => (
              <span key={index} className="benefit-tag">{benefit}</span>
            ))}
          </div>
        </div>
        
        <p className="plant-description">
          {plant.description || 
            "Abutilon indicum, commonly known as Indian Mallow, is a medicinal herb highly valued in traditional medicine systems. Its soft, velvety leaves and vibrant yellow flowers make it easily recognizable. The plant is known for its exceptional healing properties and has been used for centuries to treat various ailments."}
        </p>
        
        <div className="uses-section">
          <h2 className="section-title">Medicinal Uses</h2>
          <p className="uses-content">
            {plant.uses || 
              "The plant is primarily used to treat inflammatory conditions, urinary disorders, and digestive issues. The leaf extract is applied to wounds and ulcers to promote healing. Root decoctions are used for treating fever and chest infections. The seeds have diuretic properties and are used in urinary disorders. Flower extracts are used in bronchial conditions and as a general tonic for overall wellness."}
          </p>
        </div>
        
        <h2 className="section-title">Medicinal Properties</h2>
        <div className="properties-grid">
          {properties.map((prop, index) => (
            <div key={index} className="property-card">
              <h3 className="property-title">{prop.name}</h3>
              <p className="property-value">{prop.value}</p>
            </div>
          ))}
        </div>
        
        <div className="details-section">
          <h2 className="details-title">Botanical Characteristics</h2>
          <p className="details-content">{detailedInfo.growthPattern}</p>
        </div>
        
        <div className="details-section">
          <h2 className="details-title">Traditional Medicine History</h2>
          <p className="details-content">{detailedInfo.traditionalUse}</p>
        </div>
        
        <div className="details-section">
          <h2 className="details-title">Chemical Composition</h2>
          <p className="details-content">{detailedInfo.chemicalConstituents}</p>
        </div>
        
        <div className="details-section">
          <h2 className="details-title">Scientific Research</h2>
          <p className="details-content">{detailedInfo.research}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;