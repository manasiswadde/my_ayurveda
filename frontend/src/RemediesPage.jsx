import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RemediesPage.css'; // Ensure the CSS file is correctly linked

const RemediesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // List of Ayurvedic remedies organized by condition
  const remediesByCondition = [
    {
      condition: 'Diabetes',
      remedies: [
        {
          name: 'Bitter Melon (Karela, Momordica charantia)',
          usage: 'Extract the juice of fresh bitter melon and drink 30–50 ml on an empty stomach every morning.',
          info: 'Bitter melon contains compounds that mimic insulin and help lower blood sugar levels.',
        },
        {
          name: 'Fenugreek (Methi, Trigonella foenum-graecum)',
          usage: 'Soak 1–2 teaspoons of fenugreek seeds overnight. Chew the seeds and drink the water in the morning.',
          info: 'Fenugreek seeds are rich in soluble fiber, which slows down carbohydrate absorption.',
        },
      ],
    },
    {
      condition: 'Respiratory Disorders',
      remedies: [
        {
          name: 'Tulsi (Holy Basil, Ocimum sanctum)',
          usage: 'Boil 8–10 fresh tulsi leaves in water for 5 minutes. Add ginger and honey for taste. Drink this tea twice daily.',
          info: 'Tulsi has anti-inflammatory and antimicrobial properties.',
        },
        {
          name: 'Ginger (Adrak, Zingiber officinale)',
          usage: 'Boil grated ginger in water for 10 minutes. Add honey and lemon. Drink this tea 2–3 times a day.',
          info: 'Ginger reduces inflammation in the airways.',
        },
      ],
    },
    {
      condition: 'Wounds and Infections',
      remedies: [
        {
          name: 'Turmeric (Haldi, Curcuma longa)',
          usage: 'Mix turmeric powder with water or coconut oil to make a paste. Apply it to the wound.',
          info: 'Turmeric has antiseptic properties.',
        },
      ],
    },
    {
      condition: 'Menstrual Disorders',
      remedies: [
        {
          name: 'Shatavari (Asparagus racemosus)',
          usage: 'Take 1–2 grams of shatavari powder with milk twice daily.',
          info: 'Shatavari regulates hormones.',
        },
      ],
    },
    {
      condition: 'Eye Disorders',
      remedies: [
        {
          name: 'Triphala (Amalaki, Bibhitaki, Haritaki)',
          usage: 'Soak triphala powder in water overnight. Use the water to wash your eyes in the morning.',
          info: 'Triphala improves eye health.',
        },
      ],
    },
    {
      condition: 'Parasitic Infections',
      remedies: [
        {
          name: 'Vidanga (Embelia ribes)',
          usage: 'Take 1–2 grams of vidanga powder with honey or warm water.',
          info: 'Vidanga eliminates intestinal worms.',
        },
      ],
    },
    {
      condition: 'Cancer',
      remedies: [
        {
          name: 'Curcumin (from Turmeric, Curcuma longa)',
          usage: 'Mix 1 teaspoon of turmeric powder in warm milk and drink daily.',
          info: 'Curcumin has anti-cancer properties.',
        },
      ],
    },
    {
      condition: 'Piles',
      remedies: [
        {
          name: 'Haritaki (Terminalia chebula)',
          usage: 'Take 1–2 grams of haritaki powder with warm water at night.',
          info: 'Haritaki improves digestion and relieves constipation, which helps in managing piles.',
        },
        {
          name: 'Radish (Raphanus sativus)',
          usage: 'Drink radish juice daily or include radish in your diet.',
          info: 'Radish helps reduce inflammation and bleeding associated with piles.',
        },
      ],
    },
    {
      condition: 'Thyroid Disorders',
      remedies: [
        {
          name: 'Ashwagandha (Withania somnifera)',
          usage: 'Take 1–2 grams of ashwagandha powder with warm milk daily.',
          info: 'Ashwagandha helps balance thyroid hormones and improves energy levels.',
        },
        {
          name: 'Guggul (Commiphora wightii)',
          usage: 'Take 500 mg of guggul extract twice daily with water.',
          info: 'Guggul stimulates thyroid function and is beneficial for hypothyroidism.',
        },
      ],
    },
    {
      condition: 'Kidney Stones',
      remedies: [
        {
          name: 'Punarnava (Boerhavia diffusa)',
          usage: 'Boil punarnava roots in water and drink the decoction twice daily.',
          info: 'Punarnava acts as a diuretic and helps flush out kidney stones.',
        },
        {
          name: 'Varuna (Crataeva nurvala)',
          usage: 'Take 1–2 grams of varuna bark powder with water twice daily.',
          info: 'Varuna helps dissolve kidney stones and supports urinary health.',
        },
      ],
    },
    {
      condition: 'Insomnia',
      remedies: [
        {
          name: 'Brahmi (Bacopa monnieri)',
          usage: 'Take 1–2 teaspoons of brahmi powder with warm milk before bed.',
          info: 'Brahmi calms the mind and promotes restful sleep.',
        },
        {
          name: 'Jatamansi (Nardostachys jatamansi)',
          usage: 'Take 1 gram of jatamansi powder with warm water at night.',
          info: 'Jatamansi is a natural sedative that helps treat insomnia.',
        },
      ],
    },
    {
      condition: 'Anemia',
      remedies: [
        {
          name: 'Amla (Indian Gooseberry, Phyllanthus emblica)',
          usage: 'Consume 1–2 teaspoons of amla powder with water daily.',
          info: 'Amla is rich in vitamin C, which enhances iron absorption.',
        },
        {
          name: 'Punarnava (Boerhavia diffusa)',
          usage: 'Drink punarnava juice or decoction daily.',
          info: 'Punarnava improves hemoglobin levels and treats anemia.',
        },
      ],
    },
    {
      condition: 'Obesity',
      remedies: [
        {
          name: 'Garcinia (Garcinia cambogia)',
          usage: 'Take 500 mg of garcinia extract twice daily before meals.',
          info: 'Garcinia suppresses appetite and aids in weight loss.',
        },
        {
          name: 'Triphala (Amalaki, Bibhitaki, Haritaki)',
          usage: 'Take 1–2 grams of triphala powder with warm water at night.',
          info: 'Triphala detoxifies the body and improves metabolism.',
        },
      ],
    },
    {
      condition: 'Migraine',
      remedies: [
        {
          name: 'Butterbur (Petasites hybridus)',
          usage: 'Take 50–75 mg of butterbur extract daily.',
          info: 'Butterbur reduces the frequency and intensity of migraines.',
        },
        {
          name: 'Peppermint (Mentha piperita)',
          usage: 'Apply peppermint oil to the temples or inhale its aroma.',
          info: 'Peppermint has a cooling effect and relieves migraine pain.',
        },
      ],
    },
    {
      condition: 'High Cholesterol',
      remedies: [
        {
          name: 'Garlic (Allium sativum)',
          usage: 'Chew 2–3 raw garlic cloves daily or add garlic to your meals.',
          info: 'Garlic lowers LDL (bad cholesterol) and improves heart health.',
        },
        {
          name: 'Coriander (Coriandrum sativum)',
          usage: 'Soak 1–2 teaspoons of coriander seeds in water overnight. Drink the water in the morning.',
          info: 'Coriander seeds reduce cholesterol levels.',
        },
      ],
    },
    {
      condition: 'Gastritis',
      remedies: [
        {
          name: 'Licorice (Glycyrrhiza glabra)',
          usage: 'Take 1–2 grams of licorice root powder with water before meals.',
          info: 'Licorice soothes the stomach lining and reduces acidity.',
        },
        {
          name: 'Aloe Vera (Aloe barbadensis)',
          usage: 'Drink 30 ml of aloe vera juice daily before meals.',
          info: 'Aloe vera reduces inflammation in the stomach.',
        },
      ],
    },
    {
      condition: 'Dandruff',
      remedies: [
        {
          name: 'Neem (Azadirachta indica)',
          usage: 'Boil neem leaves in water, let it cool, and use it as a hair rinse.',
          info: 'Neem has antifungal properties that treat dandruff.',
        },
        {
          name: 'Amla (Phyllanthus emblica)',
          usage: 'Mix amla powder with water to make a paste. Apply it to the scalp and rinse after 30 minutes.',
          info: 'Amla nourishes the scalp and prevents dandruff.',
        },
      ],
    },
    {
      condition: 'Hair Loss',
      remedies: [
        {
          name: 'Bhringraj (Eclipta alba)',
          usage: 'Apply bhringraj oil to the scalp and massage gently. Leave it overnight and wash in the morning.',
          info: 'Bhringraj promotes hair growth and reduces hair fall.',
        },
        {
          name: 'Coconut Oil (Cocos nucifera)',
          usage: 'Massage warm coconut oil into the scalp 2–3 times a week.',
          info: 'Coconut oil strengthens hair follicles and prevents breakage.',
        },
      ],
    },
    {
      condition: 'Allergies',
      remedies: [
        {
          name: 'Turmeric (Curcuma longa)',
          usage: 'Mix 1 teaspoon of turmeric powder in warm milk and drink daily.',
          info: 'Turmeric has anti-allergic and anti-inflammatory properties.',
        },
        {
          name: 'Tulsi (Ocimum sanctum)',
          usage: 'Chew 4–5 fresh tulsi leaves daily or drink tulsi tea.',
          info: 'Tulsi boosts immunity and reduces allergic reactions.',
        },
      ],
    },
    {
      condition: 'Varicose Veins',
      remedies: [
        {
          name: 'Horse Chestnut (Aesculus hippocastanum)',
          usage: 'Take 300 mg of horse chestnut extract daily.',
          info: 'Horse chestnut improves blood circulation and reduces swelling in veins.',
        },
        {
          name: 'Gotu Kola (Centella asiatica)',
          usage: 'Take 1–2 grams of gotu kola powder with water daily.',
          info: 'Gotu kola strengthens blood vessels and reduces varicose veins.',
        },
      ],
    },
    {
      condition: 'Eczema',
      remedies: [
        {
          name: 'Neem (Azadirachta indica)',
          usage: 'Apply neem oil or neem leaf paste to the affected area.',
          info: 'Neem has antibacterial and anti-inflammatory properties.',
        },
        {
          name: 'Aloe Vera (Aloe barbadensis)',
          usage: 'Apply fresh aloe vera gel to the skin. Leave it on for 20 minutes and rinse with water.',
          info: 'Aloe vera soothes itching and inflammation.',
        },
      ],
    },
    {
      condition: 'Gout',
      remedies: [
        {
          name: 'Giloy (Tinospora cordifolia)',
          usage: 'Boil giloy stems in water and drink the decoction twice daily.',
          info: 'Giloy reduces uric acid levels and treats gout.',
        },
        {
          name: 'Cherry (Prunus avium)',
          usage: 'Consume fresh cherries or cherry juice daily.',
          info: 'Cherries help reduce inflammation and uric acid levels.',
        },
      ],
    },
  ];

  // Filter remedies based on search query
  const filteredRemedies = remediesByCondition.map((condition) => ({
    ...condition,
    remedies: condition.remedies.filter((remedy) =>
      remedy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.usage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.info.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((condition) => condition.remedies.length > 0);

  return (
    <div className="remedies-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>

      {/* Page Heading */}
      <h1 className="page-heading">Ayurvedic Plant Remedies</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for remedies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* List of Remedies */}
      <div className="remedies-list">
        {filteredRemedies.map((condition, index) => (
          <div key={index} className="condition-section">
            <h2 className="condition-title">{condition.condition}</h2>
            {condition.remedies.map((remedy, remedyIndex) => (
              <div key={remedyIndex} className="remedy-card">
                <h3 className="remedy-name">{remedy.name}</h3>
                <p className="remedy-usage">
                  <strong>How to Use:</strong> {remedy.usage}
                </p>
                <p className="remedy-info">
                  <strong>Additional Info:</strong> {remedy.info}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemediesPage;