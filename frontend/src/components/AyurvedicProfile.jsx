import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AyurvedicProfile.css';

const AyurvedicProfile = ({ plant }) => {
  const navigate = useNavigate();

  if (!plant) {
    return (
      <div className="no-plant-found">
        <h2>No plant information available</h2>
        <button onClick={() => navigate('/plant-recognition')} className="back-button">
          Go Back to Plant Recognition
        </button>
      </div>
    );
  }

  return (
    <div className="ayurvedic-profile-container">
      <button onClick={() => navigate('/plant-recognition')} className="back-button">
        ← Back to Plant Recognition
      </button>

      <h1>Ayurvedic Profile</h1>
      
      <div className="profile-content">
        <div className="plant-header">
          <img 
            src={plant.image} 
            alt={plant.name}
            className="plant-image"
          />
          <div className="plant-names">
            <h2>{plant.name}</h2>
            <p><strong>Scientific Name:</strong> {plant.scientificName}</p>
            <p><strong>Sanskrit Name:</strong> {plant.sanskritName}</p>
            <p><strong>Common Names:</strong> {plant.commonNames.join(', ')}</p>
          </div>
        </div>

        <section className="medicinal-uses">
          <h3>Medicinal Uses</h3>
          <ul>
            {plant.medicinialUses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </section>

        <section className="parts-used">
          <h3>Parts Used</h3>
          {Object.entries(plant.partsUsed).map(([part, description]) => (
            <div key={part} className="part-item">
              <strong>{part.replace('_', ' ').charAt(0).toUpperCase() + part.slice(1)}:</strong>
              <p>{description}</p>
            </div>
          ))}
        </section>

        <section className="preparation-methods">
          <h3>Preparation Methods</h3>
          {Object.entries(plant.preparationMethods).map(([method, description]) => (
            <div key={method} className="method-item">
              <strong>{method.charAt(0).toUpperCase() + method.slice(1)}:</strong>
              <p>{description}</p>
            </div>
          ))}
        </section>

        <section className="dosage-precautions">
          <h3>Dosage and Precautions</h3>
          <div className="dosage">
            <h4>Standard Dosage</h4>
            <ul>
              {Object.entries(plant.dosageAndPrecautions.standardDosage).map(([form, dosage]) => (
                <li key={form}>
                  <strong>{form.charAt(0).toUpperCase() + form.slice(1)}:</strong> {dosage}
                </li>
              ))}
            </ul>
          </div>
          <div className="precautions">
            <h4>Precautions</h4>
            <ul>
              {plant.dosageAndPrecautions.precautions.map((precaution, index) => (
                <li key={index}>{precaution}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="active-compounds">
          <h3>Active Compounds</h3>
          {plant.activeCompounds.map((compound, index) => (
            <div key={index} className="compound-item">
              <strong>{compound.name}:</strong>
              <p>{compound.properties}</p>
            </div>
          ))}
        </section>

        <section className="traditional-knowledge">
          <h3>Traditional Knowledge</h3>
          <div className="knowledge-grid">
            <div className="knowledge-item">
              <strong>Rasa (Taste):</strong>
              <p>{plant.traditionalKnowledge.rasa.join(', ')}</p>
            </div>
            <div className="knowledge-item">
              <strong>Guna (Properties):</strong>
              <p>{plant.traditionalKnowledge.guna.join(', ')}</p>
            </div>
            <div className="knowledge-item">
              <strong>Virya (Potency):</strong>
              <p>{plant.traditionalKnowledge.virya}</p>
            </div>
            <div className="knowledge-item">
              <strong>Vipaka (Post-digestive effect):</strong>
              <p>{plant.traditionalKnowledge.vipaka}</p>
            </div>
            <div className="knowledge-item">
              <strong>Effect on Doshas:</strong>
              <p>{plant.traditionalKnowledge.doshaEffect}</p>
            </div>
          </div>
        </section>

        <section className="habitat-cultivation">
          <h3>Habitat and Cultivation</h3>
          <div className="habitat-info">
            <p><strong>Natural Habitat:</strong> {plant.habitatAndCultivation.naturalHabitat}</p>
            <p><strong>Cultivation:</strong> {plant.habitatAndCultivation.cultivation}</p>
            <p><strong>Growing Conditions:</strong> {plant.habitatAndCultivation.growingConditions}</p>
            {plant.habitatAndCultivation.harvestingPeriod && (
              <p><strong>Harvesting Period:</strong> {plant.habitatAndCultivation.harvestingPeriod}</p>
            )}
            {plant.habitatAndCultivation.propagation && (
              <p><strong>Propagation:</strong> {plant.habitatAndCultivation.propagation}</p>
            )}
          </div>
        </section>

        <section className="classical-references">
          <h3>Classical References</h3>
          {plant.classicalReferences.map((reference, index) => (
            <div key={index} className="reference-item">
              <strong>{reference.text}:</strong>
              <p>{reference.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AyurvedicProfile; 