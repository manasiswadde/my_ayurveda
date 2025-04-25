import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlantInfo.css';

const PlantInfo = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const plants = [
    {
      id: 1,
      name: 'Abutilon Indicum',
      image: '/images/abutilonindicum.jpeg',
      description: 'Abutilon Indicum, commonly known as Indian Mallow, is used in traditional medicine for its anti-inflammatory and analgesic properties.',
      uses: 'Treats ulcers, diarrhea, and respiratory disorders.',
      details: 'It has a wide range of medicinal uses in Ayurveda and traditional medicine, including treating wounds, asthma, and fever. It is also known for improving digestion and relieving joint pain.',
    },
    {
      id: 2,
      name: 'Aloe Vera',
      image: '/images/aloevera.jpg',
      description: 'Aloe Vera is a succulent plant used for its healing and soothing properties.',
      uses: 'Treats skin conditions, promotes digestion, and hydrates the skin.',
      details: 'Aloe Vera is widely used for skincare, sunburn relief, and digestive aid. It contains enzymes that help with inflammation and promote wound healing.',
    },
    {
      id: 3,
      name: 'Amla',
      image: '/images/amla.jpg',
      description: 'Amla, also known as Indian Gooseberry, is rich in Vitamin C and antioxidants.',
      uses: 'Boosts immunity, improves digestion, and promotes hair growth.',
    },
    {
      id: 4,
      name: 'Arjuna',
      image: '/images/arjuna.jpg',
      description: 'Arjuna is known for its cardioprotective properties and is used in Ayurvedic medicine.',
      uses: 'Supports heart health, reduces cholesterol, and improves circulation.',
    },
    {
      id: 5,
      name: 'Ashwagandha',
      image: '/images/ashwagandha.jpeg',
      description: 'Ashwagandha is an adaptogen used to reduce stress and improve vitality.',
      uses: 'Reduces anxiety, boosts energy, and enhances cognitive function.',
    },
    {
      id: 6,
      name: 'Bitter Melon',
      image: '/images/bittermelon.jpeg',
      description: 'Bitter Melon is known for its blood sugar-regulating properties.',
      uses: 'Helps manage diabetes, improves skin health, and aids digestion.',
    },
    {
      id: 7,
      name: 'Boswellia',
      image: '/images/boswellia.jpg',
      description: 'Boswellia, also known as Indian Frankincense, is used for its anti-inflammatory properties.',
      uses: 'Treats arthritis, improves joint health, and reduces inflammation.',
    },
    {
      id: 8,
      name: 'Brahmi',
      image: '/images/brahmi.jpg',
      description: 'Brahmi is a herb known for its cognitive-enhancing properties.',
      uses: 'Improves memory, reduces anxiety, and promotes mental clarity.',
    },
    {
      id: 9,
      name: 'Cardamom',
      image: '/images/cardamom.jpg',
      description: 'Cardamom is a spice known for its digestive and aromatic properties.',
      uses: 'Aids digestion, freshens breath, and improves respiratory health.',
    },
    {
      id: 10,
      name: 'Costus Igneus',
      image: '/images/costusigneus.jpg',
      description: 'Costus Igneus, also known as Insulin Plant, is used for its blood sugar-regulating properties.',
      uses: 'Helps manage diabetes and improves insulin sensitivity.',
    },
    {
      id: 11,
      name: 'Cumin',
      image: '/images/cumin.jpeg',
      description: 'Cumin is a spice known for its digestive and antioxidant properties.',
      uses: 'Aids digestion, boosts immunity, and improves skin health.',
    },
    {
      id: 12,
      name: 'Gotu Kola',
      image: '/images/gotukola.jpeg',
      description: 'Gotu Kola is a herb known for its cognitive and skin health benefits.',
      uses: 'Improves memory, reduces anxiety, and promotes wound healing.',
    },
    {
      id: 13,
      name: 'Guduchi',
      image: '/images/guduchi.jpg',
      description: 'Guduchi, also known as Giloy, is known for its immune-boosting properties.',
      uses: 'Boosts immunity, reduces fever, and improves digestion.',
    },
    {
      id: 14,
      name: 'Guggulu',
      image: '/images/guggulu.jpg',
      description: 'Guggulu is a resin known for its anti-inflammatory and lipid-lowering properties.',
      uses: 'Reduces cholesterol, treats arthritis, and promotes weight loss.',
    },
    {
      id: 15,
      name: 'Henna',
      image: '/images/henna.jpeg',
      description: 'Henna is a plant used for its natural dye and cooling properties.',
      uses: 'Conditions hair, cools the body, and treats skin conditions.',
    },
    {
      id: 16,
      name: 'Licorice Root',
      image: '/images/licoriceroot.jpeg',
      description: 'Licorice Root is known for its soothing and anti-inflammatory properties.',
      uses: 'Treats sore throat, improves digestion, and reduces inflammation.',
    },
    {
      id: 17,
      name: 'Manjistha',
      image: '/images/manjistha.jpg',
      description: 'Manjistha is a herb known for its blood-purifying properties.',
      uses: 'Detoxifies the blood, improves skin health, and reduces inflammation.',
    },
    {
      id: 18,
      name: 'Melia Dubia',
      image: '/images/meliadubia.jpg',
      description: 'Melia Dubia is a fast-growing tree used for its medicinal properties.',
      uses: 'Treats skin disorders, improves digestion, and boosts immunity.',
    },
    {
      id: 19,
      name: 'Moringa',
      image: '/images/moringa.jpeg',
      description: 'Moringa is a nutrient-rich plant known for its antioxidant properties.',
      uses: 'Boosts immunity, improves skin health, and regulates blood sugar.',
    },
    {
      id: 20,
      name: 'Neem',
      image: '/images/neem.jpg',
      description: 'Neem is a versatile plant with antibacterial and antifungal properties.',
      uses: 'Treats skin disorders, boosts immunity, and purifies blood.',
    },
    {
      id: 21,
      name: 'Punarnava',
      image: '/images/punarnava.jpg',
      description: 'Punarnava is a herb known for its diuretic and anti-inflammatory properties.',
      uses: 'Reduces swelling, improves kidney function, and detoxifies the body.',
    },
    {
      id: 22,
      name: 'Shatavari',
      image: '/images/shatavari.jpg',
      description: 'Shatavari is a herb known for its rejuvenating and hormone-balancing properties.',
      uses: 'Supports female reproductive health, improves digestion, and boosts immunity.',
    },
    {
      id: 23,
      name: 'Triphala',
      image: '/images/triphala.jpg',
      description: 'Triphala is a traditional Ayurvedic formulation made from three fruits.',
      uses: 'Improves digestion, detoxifies the body, and promotes overall health.',
    },
    {
      id: 24,
      name: 'Tulsi',
      image: '/images/tulsi.jpeg',
      description: 'Tulsi, also known as Holy Basil, is revered for its medicinal and spiritual properties.',
      uses: 'Boosts immunity, reduces stress, and improves respiratory health.',
    },
    {
      id: 25,
      name: 'Turmeric',
      image: '/images/turmeric.jpg',
      description: 'Turmeric is a spice known for its anti-inflammatory and antioxidant properties.',
      uses: 'Helps with arthritis, improves digestion, and enhances skin health.',
    },
    
  ];

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="plant-info-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <h1 className="page-heading">Plant Information</h1>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for plants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="plant-cards-container">
        {filteredPlants.map((plant) => (
          <div
            key={plant.id}
            className="plant-card"
            onClick={() => navigate(`/plant/${plant.id}`, { state: plant })}
          >
            <img src={plant.image} alt={plant.name} className="plant-image" />
            <h2 className="plant-name">{plant.name}</h2>
            <p className="plant-description">{plant.description}</p>
            <p className="plant-uses">
              <strong>Uses:</strong> {plant.uses}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantInfo;
