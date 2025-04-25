import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturesPage.css'; // Ensure the CSS file is correctly linked

const FeaturesPage = () => {
  const navigate = useNavigate();

  // Event handlers for button clicks
  const handleIdentifyPlant = () => {
    navigate('/plant-recognition');
  };

  const handleExplorePlant = () => {
    navigate('/plant-info'); // Navigate to the PlantInfo page
  };

  const handleExploreRemedies = () => {
    navigate('/remedies'); // Navigate to the RemediesPage
  };

  return (
    <div className="features-page">
      <h1 className="features-heading">Our Features</h1>
      <div className="features-container">
        {/* Feature 1: Plant Recognition */}
        <div className="feature-card">
          <img src="/images/feature-img1.jpg" alt="Plant Recognition" className="feature-image" />
          <h2 className="feature-title">Plant Recognition</h2>
          <p className="feature-description">
            Identify plants instantly using our advanced AI-powered plant recognition tool.
          </p>
          <button className="feature-button identify-plant" onClick={handleIdentifyPlant}>
            Identify Plant
          </button>
        </div>

        {/* Feature 2: Plant Information */}
        <div className="feature-card">
          <img src="/images/feature-img2.jpg" alt="Plant Information" className="feature-image" />
          <h2 className="feature-title">Plant Information</h2>
          <p className="feature-description">
            Get detailed information about various plants, their uses, and benefits.
          </p>
          <button className="feature-button explore-plant" onClick={handleExplorePlant}>
            Explore Plants
          </button>
        </div>

        {/* Feature 3: Ayurveda Plant Remedies */}
        <div className="feature-card">
          <img src="/images/feature-img3.jpg" alt="Ayurveda Remedies" className="feature-image" />
          <h2 className="feature-title">Ayurveda Plant Remedies</h2>
          <p className="feature-description">
            Discover Ayurvedic remedies for common diseases using natural plants.
          </p>
          <button className="feature-button explore-remedies" onClick={handleExploreRemedies}>
            Explore Remedies
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;