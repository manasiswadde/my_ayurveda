export const plants = [
  {
    id: 1,
    name: 'Abutilon Indicum',
    scientificName: 'Abutilon indicum',
    commonNames: ['Indian Mallow', 'Country Mallow', 'Atibala'],
    sanskritName: 'अतिबला (Atibala)',
    image: '/images/abutilonindicum.jpeg',
    description: 'Abutilon Indicum is a medicinal plant known for its therapeutic properties in Ayurveda.',
    medicinialUses: [
      'Treatment of ulcers and wounds',
      'Management of respiratory disorders',
      'Relief from joint pain and inflammation',
      'Treatment of urinary disorders',
      'Management of diabetes'
    ],
    partsUsed: {
      leaves: 'Used in poultices and decoctions',
      roots: 'Used in various medicinal preparations',
      bark: 'Used in decoctions and powders',
      seeds: 'Used in medicinal preparations',
      flowers: 'Used in treatments for bronchitis'
    },
    preparationMethods: {
      decoction: 'Boil parts in water to extract medicinal properties',
      powder: 'Dried and ground into fine powder',
      poultice: 'Fresh leaves crushed and applied externally',
      infusion: 'Soaked in water to extract properties'
    },
    dosageAndPrecautions: {
      standardDosage: {
        decoction: '20-40ml twice daily',
        powder: '3-6g twice daily with honey',
        infusion: '50-100ml twice daily'
      },
      precautions: [
        'Not recommended during pregnancy',
        'Monitor blood sugar if diabetic',
        'Consult healthcare provider before use',
        'May interact with certain medications'
      ]
    },
    activeCompounds: [
      {
        name: 'β-sitosterol',
        properties: 'Anti-inflammatory and immunomodulatory'
      },
      {
        name: 'Flavonoids',
        properties: 'Antioxidant and anti-inflammatory'
      },
      {
        name: 'Alkaloids',
        properties: 'Various therapeutic properties'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Madhura (Sweet)', 'Kashaya (Astringent)'],
      guna: ['Laghu (Light)', 'Snigdha (Unctuous)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Madhura (Sweet)',
      doshaEffect: 'Balances Vata and Pitta, can increase Kapha in excess'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Found throughout tropical and subtropical regions',
      cultivation: 'Grows well in warm climates with well-draining soil',
      growingConditions: 'Requires full sun to partial shade, moderate water'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned for its use in various therapeutic applications'
      },
      {
        text: 'Sushruta Samhita',
        description: 'Described for its wound healing properties'
      }
    ]
  },
  {
    id: 2,
    name: 'Aloe Vera',
    scientificName: 'Aloe vera',
    commonNames: ['Aloe vera', 'Aloe', 'Ghritkumari', 'Indian Aloe', 'True Aloe', 'Barbados Aloe'],
    sanskritName: 'घृतकुमारी (Ghritkumari)',
    image: '/images/aloevera.jpg',
    description: 'Aloe Vera is a succulent plant species widely used for its medicinal properties.',
    medicinialUses: [
      'Treats skin conditions and burns',
      'Promotes digestive health',
      'Supports immune system function',
      'Reduces inflammation',
      'Moisturizes and heals skin'
    ],
    partsUsed: {
      leaf_gel: 'Clear gel from inside leaves, used for skin and internal consumption',
      leaf_latex: 'Yellow sap between rind and gel, used as laxative',
      whole_leaf: 'Used in various preparations'
    },
    preparationMethods: {
      gel: 'Direct application on skin or consumed as juice',
      powder: 'Dried and powdered for internal use',
      juice: 'Fresh gel blended with water',
      paste: 'Fresh gel mashed for external application'
    },
    dosageAndPrecautions: {
      standardDosage: {
        gel: '30-50ml juice twice daily',
        powder: '250-500mg twice daily',
        topical: 'Apply as needed on affected area'
      },
      precautions: [
        'Avoid during pregnancy and breastfeeding',
        'May lower blood sugar levels',
        'Can cause allergic reactions in sensitive individuals',
        'Do not apply on deep wounds',
        'Consult healthcare provider before internal use'
      ]
    },
    activeCompounds: [
      {
        name: 'Aloin',
        properties: 'Anti-inflammatory and laxative properties'
      },
      {
        name: 'Acemannan',
        properties: 'Immunostimulant and wound healing'
      },
      {
        name: 'Anthraquinones',
        properties: 'Natural antibiotics and pain relievers'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Tikta (Bitter)', 'Madhura (Sweet)'],
      guna: ['Guru (Heavy)', 'Snigdha (Unctuous)', 'Picchila (Slimy)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Balances Pitta and Kapha, can increase Vata in excess'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Native to tropical and arid regions',
      cultivation: 'Easy to grow in well-draining soil',
      growingConditions: 'Requires full sun to partial shade, minimal water'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned for its use in skin disorders and healing properties'
      },
      {
        text: 'Sushruta Samhita',
        description: 'Described for wound healing and anti-inflammatory properties'
      }
    ]
  },
  {
    id: 3,
    name: 'Amla',
    scientificName: 'Emblica officinalis',
    commonNames: ['Indian Gooseberry', 'Amalaki', 'Amla', 'Dhatri'],
    sanskritName: 'आमलकी (Amalaki)',
    image: '/images/amla.jpg',
    description: 'Amla is one of the most important medicinal plants in Ayurveda, known for its exceptional nutritional and therapeutic properties.',
    medicinialUses: [
      'Boosts immunity and overall health',
      'Improves digestion and metabolism',
      'Promotes healthy hair growth',
      'Enhances eye health',
      'Supports liver function',
      'Helps in diabetes management',
      'Natural antioxidant'
    ],
    partsUsed: {
      fruit: 'Most commonly used part, rich in Vitamin C',
      seeds: 'Used in some medicinal preparations',
      leaves: 'Used in decoctions',
      flowers: 'Used in certain formulations',
      bark: 'Used in traditional medicines'
    },
    preparationMethods: {
      fresh_fruit: 'Eaten raw or as juice',
      powder: 'Dried and powdered form',
      decoction: 'Boiled in water',
      pickle: 'Preserved in salt and oil',
      churna: 'Fine powder mixed with other herbs'
    },
    dosageAndPrecautions: {
      standardDosage: {
        fresh_fruit: '1-2 fruits daily',
        powder: '3-6g twice daily',
        juice: '20-30ml twice daily',
        decoction: '50-100ml daily'
      },
      precautions: [
        'May interact with diabetes medications',
        'Consult physician if on blood-thinning medications',
        'May increase pitta in sensitive individuals',
        'Monitor iron absorption if taken with iron supplements'
      ]
    },
    activeCompounds: [
      {
        name: 'Vitamin C',
        properties: 'Powerful antioxidant and immune booster'
      },
      {
        name: 'Gallic acid',
        properties: 'Anti-inflammatory and antioxidant'
      },
      {
        name: 'Ellagic acid',
        properties: 'Anti-cancer and antioxidant properties'
      },
      {
        name: 'Tannins',
        properties: 'Astringent and tissue healing properties'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Amla (Sour)', 'Madhura (Sweet)', 'Kashaya (Astringent)', 'Tikta (Bitter)', 'Katu (Pungent)'],
      guna: ['Laghu (Light)', 'Ruksha (Dry)', 'Sheeta (Cold)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Madhura (Sweet)',
      doshaEffect: 'Balances all three doshas (Tridoshahara), especially Pitta'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Native to tropical Southeast Asia, especially India',
      cultivation: 'Grows in tropical and subtropical regions',
      growingConditions: 'Requires well-draining soil, full sun to partial shade',
      harvestingPeriod: 'Fruits mature during winter months'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned as one of the best rejuvenating herbs'
      },
      {
        text: 'Sushruta Samhita',
        description: 'Described for its therapeutic properties in various conditions'
      },
      {
        text: 'Ashtanga Hridaya',
        description: 'Praised for its role in maintaining health and longevity'
      }
    ]
  },
  {
    id: 4,
    name: 'Arjuna',
    scientificName: 'Terminalia arjuna',
    commonNames: ['Arjun', 'White Marudah', 'Koha'],
    sanskritName: 'अर्जुन (Arjuna)',
    image: '/images/arjuna.jpg',
    description: 'Arjuna is a large deciduous tree valued in Ayurveda for its cardiac tonic properties.',
    medicinialUses: [
      'Strengthens heart function',
      'Regulates blood pressure',
      'Reduces cholesterol levels',
      'Supports cardiovascular health',
      'Helps in angina and other heart conditions',
      'Promotes wound healing',
      'Manages diabetes complications'
    ],
    partsUsed: {
      bark: 'Primary medicinal part, used in heart conditions',
      leaves: 'Used in various preparations',
      fruits: 'Used in traditional medicines',
      roots: 'Used in some formulations'
    },
    preparationMethods: {
      decoction: 'Bark boiled in water',
      powder: 'Dried bark powder',
      extract: 'Concentrated liquid extract',
      paste: 'Fresh bark paste for external use'
    },
    dosageAndPrecautions: {
      standardDosage: {
        powder: '3-6g twice daily with milk',
        decoction: '50-100ml twice daily',
        extract: '15-30 drops twice daily'
      },
      precautions: [
        'Consult physician if on heart medications',
        'Not recommended during pregnancy',
        'May affect blood pressure medications',
        'Monitor if taking blood thinners'
      ]
    },
    activeCompounds: [
      {
        name: 'Arjunolic acid',
        properties: 'Cardioprotective and antioxidant'
      },
      {
        name: 'Tannins',
        properties: 'Astringent and healing properties'
      },
      {
        name: 'Flavonoids',
        properties: 'Anti-inflammatory and antioxidant'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Kashaya (Astringent)', 'Tikta (Bitter)'],
      guna: ['Ruksha (Dry)', 'Laghu (Light)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Balances Kapha and Pitta, may increase Vata if used in excess'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Native to India, grows along rivers and streams',
      cultivation: 'Grows in various soil types, prefers moist conditions',
      growingConditions: 'Requires well-draining soil, full sun to partial shade'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned for heart diseases and wound healing'
      },
      {
        text: 'Astanga Hridaya',
        description: 'Recommended for cardiac disorders'
      }
    ]
  },
  {
    id: 5,
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    commonNames: ['Indian Ginseng', 'Winter Cherry', 'Poison Gooseberry'],
    sanskritName: 'अश्वगंधा (Ashwagandha)',
    image: '/images/ashwagandha.jpeg',
    description: 'Ashwagandha is one of the most important herbs in Ayurveda, known for its adaptogenic properties.',
    medicinialUses: [
      'Reduces stress and anxiety',
      'Improves physical and mental stamina',
      'Enhances memory and concentration',
      'Boosts immune system',
      'Supports healthy sleep patterns',
      'Improves muscle strength',
      'Helps in arthritis'
    ],
    partsUsed: {
      roots: 'Primary medicinal part, used in most preparations',
      leaves: 'Used in certain formulations',
      berries: 'Used in traditional medicines',
      seeds: 'Used in some preparations'
    },
    preparationMethods: {
      powder: 'Dried root powder',
      decoction: 'Root decoction',
      milk_decoction: 'Root boiled with milk',
      ghee: 'Medicated ghee preparation'
    },
    dosageAndPrecautions: {
      standardDosage: {
        powder: '3-6g daily with warm milk',
        decoction: '50-100ml twice daily',
        extract: '300-500mg twice daily'
      },
      precautions: [
        'Avoid during pregnancy',
        'May interact with sedative medications',
        'Not recommended with autoimmune conditions',
        'Consult physician if on thyroid medications'
      ]
    },
    activeCompounds: [
      {
        name: 'Withanolides',
        properties: 'Adaptogenic and anti-inflammatory'
      },
      {
        name: 'Alkaloids',
        properties: 'Nervous system support'
      },
      {
        name: 'Steroidal lactones',
        properties: 'Immune-modulating properties'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
      guna: ['Laghu (Light)', 'Snigdha (Unctuous)'],
      virya: 'Ushna (Hot)',
      vipaka: 'Madhura (Sweet)',
      doshaEffect: 'Balances Vata and Kapha, may increase Pitta in excess'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Native to India, particularly in drier regions',
      cultivation: 'Grows well in dry, stony soil and sunny conditions',
      growingConditions: 'Requires well-draining soil, full sun exposure'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned as a rejuvenative tonic'
      },
      {
        text: 'Sushruta Samhita',
        description: 'Recommended for strength and vitality'
      }
    ]
  },
  {
    id: 6,
    name: 'Bitter Melon',
    scientificName: 'Momordica charantia',
    commonNames: ['Karela', 'Bitter Gourd', 'Ampalaya'],
    sanskritName: 'करवेल्लक (Karavellaka)',
    image: '/images/bittermelon.jpeg',
    description: 'Bitter Melon is a tropical vine known for its distinctively bitter fruit and medicinal properties.',
    medicinialUses: [
      'Helps manage diabetes',
      'Supports digestive health',
      'Aids in weight management',
      'Boosts immune system',
      'Purifies blood',
      'Helps in skin conditions',
      'Supports liver function'
    ],
    partsUsed: {
      fruit: 'Primary medicinal part, used fresh or dried',
      leaves: 'Used in decoctions and preparations',
      seeds: 'Used in some traditional medicines',
      vine: 'Used occasionally in preparations'
    },
    preparationMethods: {
      juice: 'Fresh fruit juice',
      powder: 'Dried fruit powder',
      decoction: 'Made from leaves or fruit',
      curry: 'Cooked as vegetable',
      extract: 'Concentrated liquid form'
    },
    dosageAndPrecautions: {
      standardDosage: {
        juice: '10-20ml twice daily',
        powder: '2-4g twice daily',
        decoction: '50-100ml daily'
      },
      precautions: [
        'Monitor blood sugar if diabetic',
        'Avoid during pregnancy',
        'May interact with diabetes medications',
        'Not recommended for people with liver problems'
      ]
    },
    activeCompounds: [
      {
        name: 'Charantin',
        properties: 'Blood sugar lowering effect'
      },
      {
        name: 'Momordicin',
        properties: 'Bitter principle, aids digestion'
      },
      {
        name: 'Polypeptide-p',
        properties: 'Insulin-like activity'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Tikta (Bitter)', 'Katu (Pungent)'],
      guna: ['Laghu (Light)', 'Ruksha (Dry)'],
      virya: 'Ushna (Hot)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Balances Kapha and Pitta, may increase Vata'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Tropical and subtropical regions',
      cultivation: 'Grows well in warm climate',
      growingConditions: 'Requires support for climbing, well-draining soil'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned for its use in diabetes and skin disorders'
      },
      {
        text: 'Bhavaprakasha',
        description: 'Detailed description of its medicinal properties'
      }
    ]
  },
  {
    id: 7,
    name: 'Boswellia',
    scientificName: 'Boswellia serrata',
    commonNames: ['Indian Frankincense', 'Salai Guggul', 'Shallaki'],
    sanskritName: 'शल्लकी (Shallaki)',
    image: '/images/boswellia.jpg',
    description: 'Boswellia is a tree resin with powerful anti-inflammatory properties, highly valued in Ayurvedic medicine.',
    medicinialUses: [
      'Reduces joint inflammation',
      'Manages arthritis pain',
      'Supports respiratory health',
      'Improves digestive function',
      'Helps in inflammatory conditions',
      'Supports brain function',
      'Aids in wound healing'
    ],
    partsUsed: {
      resin: 'Primary medicinal part, obtained from tree bark',
      bark: 'Used in some preparations',
      extract: 'Concentrated form of resin',
      oil: 'Essential oil from resin'
    },
    preparationMethods: {
      powder: 'Resin powder form',
      capsules: 'Standardized extract',
      paste: 'External application',
      decoction: 'Bark decoction'
    },
    dosageAndPrecautions: {
      standardDosage: {
        powder: '300-500mg thrice daily',
        extract: '150-400mg standardized extract',
        decoction: '40-50ml twice daily'
      },
      precautions: [
        'May interact with blood thinners',
        'Avoid during pregnancy and nursing',
        'May affect absorption of other medications',
        'Discontinue before surgery'
      ]
    },
    activeCompounds: [
      {
        name: 'Boswellic acids',
        properties: 'Anti-inflammatory and analgesic'
      },
      {
        name: 'Terpenes',
        properties: 'Anti-inflammatory and antioxidant'
      },
      {
        name: 'Essential oils',
        properties: 'Antimicrobial and anti-inflammatory'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
      guna: ['Laghu (Light)', 'Ruksha (Dry)'],
      virya: 'Ushna (Hot)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Balances Vata and Kapha, may increase Pitta'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Dry and arid regions of India',
      cultivation: 'Grows in rocky, dry terrain',
      growingConditions: 'Requires well-draining soil, minimal water'
    },
    classicalReferences: [
      {
        text: 'Sushruta Samhita',
        description: 'Mentioned for joint disorders and inflammation'
      },
      {
        text: 'Ashtanga Hridaya',
        description: 'Recommended for various inflammatory conditions'
      }
    ]
  },
  {
    id: 8,
    name: 'Brahmi',
    scientificName: 'Bacopa monnieri',
    commonNames: ['Water Hyssop', 'Herb of Grace', 'Indian Pennywort'],
    sanskritName: 'ब्राह्मी (Brahmi)',
    image: '/images/brahmi.jpg',
    description: 'Brahmi is a renowned nootropic herb in Ayurveda, known for enhancing memory, intelligence, and longevity.',
    medicinialUses: [
      'Enhances memory and cognitive function',
      'Reduces anxiety and stress',
      'Improves concentration and focus',
      'Supports nervous system health',
      'Promotes mental clarity',
      'Helps in attention deficit disorders',
      'Supports hair and skin health'
    ],
    partsUsed: {
      whole_plant: 'Entire plant is used medicinally',
      leaves: 'Primary part used in preparations',
      stems: 'Used in some formulations',
      roots: 'Used in traditional preparations'
    },
    preparationMethods: {
      juice: 'Fresh plant juice',
      powder: 'Dried plant powder',
      ghrita: 'Medicated ghee preparation',
      oil: 'Medicated oil for external use',
      decoction: 'Water decoction'
    },
    dosageAndPrecautions: {
      standardDosage: {
        powder: '250-500mg twice daily',
        juice: '10-20ml twice daily',
        ghrita: '5-10g daily',
        decoction: '50-100ml daily'
      },
      precautions: [
        'May cause digestive upset in sensitive individuals',
        'Start with lower doses and increase gradually',
        'Consult healthcare provider during pregnancy',
        'May interact with certain medications',
        'Avoid in hyperthyroidism'
      ]
    },
    activeCompounds: [
      {
        name: 'Bacosides',
        properties: 'Memory enhancement and cognitive function'
      },
      {
        name: 'Alkaloids',
        properties: 'Nervous system support'
      },
      {
        name: 'Saponins',
        properties: 'Adaptogenic properties'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
      guna: ['Laghu (Light)', 'Sara (Mobile)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Madhura (Sweet)',
      doshaEffect: 'Balances all three doshas, especially Pitta and Vata'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Wetlands and marshy areas throughout India',
      cultivation: 'Grows well in moist, sandy soil',
      growingConditions: 'Requires regular water, partial to full sun'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned as medhya rasayana (brain tonic)'
      },
      {
        text: 'Sushruta Samhita',
        description: 'Recommended for mental disorders and memory enhancement'
      }
    ]
  },
  {
    id: 9,
    name: 'Cardamom',
    scientificName: 'Elettaria cardamomum',
    commonNames: ['Green Cardamom', 'True Cardamom', 'Ela'],
    sanskritName: 'एला (Ela)',
    image: '/images/cardamom.jpg',
    description: 'Cardamom is a highly valued spice in Ayurveda, known for its aromatic and therapeutic properties.',
    medicinialUses: [
      'Improves digestion and metabolism',
      'Freshens breath naturally',
      'Supports respiratory health',
      'Helps in nausea and vomiting',
      'Enhances taste and appetite',
      'Reduces mucus accumulation',
      'Supports heart health'
    ],
    partsUsed: {
      seeds: 'Primary medicinal part, most aromatic',
      pods: 'Whole pods used in cooking and medicine',
      essential_oil: 'Extracted from seeds',
      powder: 'Ground seeds used in preparations'
    },
    preparationMethods: {
      powder: 'Ground seeds',
      decoction: 'Pods boiled in water',
      infusion: 'Seeds steeped in hot water',
      essential_oil: 'Steam distilled oil'
    },
    dosageAndPrecautions: {
      standardDosage: {
        powder: '250-500mg daily',
        infusion: '1-2 pods in tea',
        decoction: '50ml twice daily'
      },
      precautions: [
        'May interact with blood pressure medications',
        'Excessive use may cause heartburn',
        'Monitor blood sugar if diabetic',
        'Use in moderation during pregnancy'
      ]
    },
    activeCompounds: [
      {
        name: '1,8-cineole',
        properties: 'Respiratory support and antimicrobial'
      },
      {
        name: 'α-terpinyl acetate',
        properties: 'Aromatic and digestive properties'
      },
      {
        name: 'Linalool',
        properties: 'Calming and anti-inflammatory'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Katu (Pungent)', 'Madhura (Sweet)'],
      guna: ['Laghu (Light)', 'Ruksha (Dry)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Madhura (Sweet)',
      doshaEffect: 'Balances Kapha and Vata, neutral for Pitta'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Native to Southern India, especially Western Ghats',
      cultivation: 'Requires humid, shaded conditions',
      growingConditions: 'Well-draining, rich soil, partial shade'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned for digestive and respiratory disorders'
      },
      {
        text: 'Ashtanga Hridaya',
        description: 'Recommended for breath freshening and digestion'
      }
    ]
  },
  {
    id: 10,
    name: 'Costus Igneus',
    scientificName: 'Costus igneus',
    commonNames: ['Insulin Plant', 'Spiral Flag', 'Fiery Costus'],
    sanskritName: 'इन्सुलिन पौधा (Insulin Paudha)',
    image: '/images/costusigneus.jpg',
    description: 'Costus Igneus is a medicinal plant known for its anti-diabetic properties and is commonly called Insulin Plant.',
    medicinialUses: [
      'Helps manage diabetes naturally',
      'Improves insulin sensitivity',
      'Supports kidney function',
      'Reduces blood sugar levels',
      'Anti-inflammatory properties',
      'Aids in urinary tract infections',
      'Supports metabolic health'
    ],
    partsUsed: {
      leaves: 'Primary medicinal part, most effective',
      stem: 'Used in some preparations',
      rhizome: 'Used in traditional medicine',
      roots: 'Used in certain formulations'
    },
    preparationMethods: {
      fresh_leaves: 'Consumed directly or as juice',
      powder: 'Dried and powdered leaves',
      decoction: 'Boiled extract of leaves',
      infusion: 'Leaves steeped in water'
    },
    dosageAndPrecautions: {
      standardDosage: {
        fresh_leaves: '1-2 leaves daily',
        powder: '500mg-1g twice daily',
        decoction: '30-50ml twice daily'
      },
      precautions: [
        'Monitor blood sugar levels regularly',
        'May interact with diabetes medications',
        'Start with small doses and increase gradually',
        'Consult healthcare provider if pregnant or nursing'
      ]
    },
    activeCompounds: [
      {
        name: 'Quercetin',
        properties: 'Antioxidant and anti-inflammatory'
      },
      {
        name: 'Diosgenin',
        properties: 'Helps in glucose metabolism'
      },
      {
        name: 'Beta-carotene',
        properties: 'Antioxidant properties'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)'],
      guna: ['Laghu (Light)', 'Ruksha (Dry)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Balances Kapha and Pitta, may increase Vata'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Native to South and Southeast Asia',
      cultivation: 'Grows well in tropical and subtropical regions',
      growingConditions: 'Requires partial shade, moist soil, regular watering'
    },
    classicalReferences: [
      {
        text: 'Modern Research',
        description: 'Extensively studied for anti-diabetic properties'
      },
      {
        text: 'Traditional Medicine',
        description: 'Used in folk medicine for diabetes management'
      }
    ]
  },
  {
    id: 11,
    name: 'Cumin',
    scientificName: 'Cuminum cyminum',
    commonNames: ['Jeera', 'Common Cumin', 'White Cumin'],
    sanskritName: 'जीरक (Jeeraka)',
    image: '/images/cumin.jpeg',
    description: 'Cumin is a powerful digestive spice with multiple therapeutic properties in Ayurvedic medicine.',
    medicinialUses: [
      'Enhances digestion and metabolism',
      'Reduces bloating and gas',
      'Improves nutrient absorption',
      'Boosts immunity',
      'Helps in respiratory conditions',
      'Supports female health',
      'Aids in weight management'
    ],
    partsUsed: {
      seeds: 'Primary medicinal part, used whole or ground',
      essential_oil: 'Extracted from seeds',
      powder: 'Ground seeds used in preparations',
      roasted_seeds: 'Used in specific preparations'
    },
    preparationMethods: {
      powder: 'Ground seeds used directly',
      decoction: 'Seeds boiled in water',
      infusion: 'Seeds steeped in hot water',
      roasted: 'Dry roasted for enhanced properties',
      oil: 'Essential oil extraction'
    },
    dosageAndPrecautions: {
      standardDosage: {
        powder: '1-3g twice daily',
        decoction: '40-50ml twice daily',
        seeds: '1-2g daily'
      },
      precautions: [
        'May interact with blood sugar medications',
        'Use carefully during pregnancy',
        'Excessive use may cause heartburn',
        'May affect iron absorption'
      ]
    },
    activeCompounds: [
      {
        name: 'Cuminaldehyde',
        properties: 'Main flavor compound, digestive properties'
      },
      {
        name: 'Thymol',
        properties: 'Antimicrobial and antioxidant'
      },
      {
        name: 'p-Cymene',
        properties: 'Anti-inflammatory and antimicrobial'
      }
    ],
    traditionalKnowledge: {
      rasa: ['Katu (Pungent)', 'Tikta (Bitter)'],
      guna: ['Laghu (Light)', 'Ruksha (Dry)'],
      virya: 'Ushna (Hot)',
      vipaka: 'Katu (Pungent)',
      doshaEffect: 'Balances Kapha and Vata, may increase Pitta in excess'
    },
    habitatAndCultivation: {
      naturalHabitat: 'Native to Mediterranean region and South Asia',
      cultivation: 'Grows in warm, dry climate',
      growingConditions: 'Requires well-draining soil, full sun exposure'
    },
    classicalReferences: [
      {
        text: 'Charaka Samhita',
        description: 'Mentioned as important digestive and carminative'
      },
      {
        text: 'Sushruta Samhita',
        description: 'Recommended for digestive disorders and metabolism'
      },
      {
        text: 'Ashtanga Hridaya',
        description: 'Praised for its effects on digestion and metabolism'
      }
    ]
  },
  {
    id: 12,
    name: 'Gotu Kola',
    image: '/images/gotukola.jpeg',
    description: 'Gotu Kola is a herb known for its cognitive and skin health benefits.',
    uses: ['Improves memory', 'reduces anxiety', 'promotes wound healing'],
    medicinalProperties: ['Nootropic', 'Wound healing', 'Anti-anxiety']
  },
  {
    id: 13,
    name: 'Guduchi',
    image: '/images/guduchi.jpg',
    description: 'Guduchi, also known as Giloy, is known for its immune-boosting properties.',
    uses: ['Boosts immunity', 'reduces fever', 'improves digestion'],
    medicinalProperties: ['Immunomodulator', 'Antipyretic', 'Digestive']
  },
  {
    id: 14,
    name: 'Guggulu',
    image: '/images/guggulu.jpg',
    description: 'Guggulu is a resin known for its anti-inflammatory and lipid-lowering properties.',
    uses: ['Reduces cholesterol', 'treats arthritis', 'promotes weight loss'],
    medicinalProperties: ['Hypolipidemic', 'Anti-inflammatory', 'Weight management']
  },
  {
    id: 15,
    name: 'Henna',
    image: '/images/henna.jpeg',
    description: 'Henna is a plant used for its natural dye and cooling properties.',
    uses: ['Conditions hair', 'cools the body', 'treats skin conditions'],
    medicinalProperties: ['Cooling', 'Hair conditioning', 'Antimicrobial']
  },
  {
    id: 16,
    name: 'Licorice Root',
    image: '/images/licoriceroot.jpeg',
    description: 'Licorice Root is known for its soothing and anti-inflammatory properties.',
    uses: ['Treats sore throat', 'improves digestion', 'reduces inflammation'],
    medicinalProperties: ['Anti-inflammatory', 'Demulcent', 'Digestive']
  },
  {
    id: 17,
    name: 'Manjistha',
    image: '/images/manjistha.jpg',
    description: 'Manjistha is a herb known for its blood-purifying properties.',
    uses: ['Detoxifies the blood', 'improves skin health', 'reduces inflammation'],
    medicinalProperties: ['Blood purifier', 'Anti-inflammatory', 'Skin health']
  },
  {
    id: 18,
    name: 'Melia Dubia',
    image: '/images/meliadubia.jpg',
    description: 'Melia Dubia is a fast-growing tree used for its medicinal properties.',
    uses: ['Treats skin disorders', 'improves digestion', 'boosts immunity'],
    medicinalProperties: ['Antimicrobial', 'Digestive', 'Immunomodulator']
  },
  {
    id: 19,
    name: 'Moringa',
    image: '/images/moringa.jpeg',
    description: 'Moringa is a nutrient-rich plant known for its antioxidant properties.',
    uses: ['Boosts immunity', 'improves skin health', 'regulates blood sugar'],
    medicinalProperties: ['Antioxidant', 'Nutritive', 'Hypoglycemic']
  },
  {
    id: 20,
    name: 'Neem',
    image: '/images/neem.jpg',
    description: 'Neem is a versatile plant with antibacterial and antifungal properties.',
    uses: ['Treats skin disorders', 'boosts immunity', 'purifies blood'],
    medicinalProperties: ['Antimicrobial', 'Blood purifier', 'Immunomodulator']
  },
  {
    id: 21,
    name: 'Punarnava',
    image: '/images/punarnava.jpg',
    description: 'Punarnava is a herb known for its diuretic and anti-inflammatory properties.',
    uses: ['Reduces swelling', 'improves kidney function', 'detoxifies the body'],
    medicinalProperties: ['Diuretic', 'Anti-inflammatory', 'Renal health']
  },
  {
    id: 22,
    name: 'Shatavari',
    image: '/images/shatavari.jpg',
    description: 'Shatavari is a herb known for its rejuvenating and hormone-balancing properties.',
    uses: ['Supports female reproductive health', 'improves digestion', 'boosts immunity'],
    medicinalProperties: ['Hormone balancer', 'Rejuvenative', 'Immunomodulator']
  },
  {
    id: 23,
    name: 'Triphala',
    image: '/images/triphala.jpg',
    description: 'Triphala is a traditional Ayurvedic formulation made from three fruits.',
    uses: ['Improves digestion', 'detoxifies the body', 'promotes overall health'],
    medicinalProperties: ['Digestive', 'Detoxifying', 'Rejuvenative']
  },
  {
    id: 24,
    name: 'Tulsi',
    image: '/images/tulsi.jpeg',
    description: 'Tulsi, also known as Holy Basil, is revered for its medicinal and spiritual properties.',
    uses: ['Boosts immunity', 'reduces stress', 'improves respiratory health'],
    medicinalProperties: ['Immunomodulator', 'Adaptogen', 'Respiratory health']
  },
  {
    name: "Turmeric",
    scientificName: "Curcuma longa",
    commonNames: ["Haldi", "Indian Saffron", "Yellow Root"],
    sanskritName: "हरिद्रा (Haridra)",
    image: "/images/turmeric.jpg",
    medicinialUses: [
      "Anti-inflammatory - helps in arthritis and joint pain",
      "Digestive disorders - improves digestion and reduces bloating",
      "Skin conditions - treats acne, eczema, and wounds",
      "Respiratory issues - helps with asthma and bronchitis",
      "Liver disorders - supports liver function and detoxification",
      "Blood purifier - helps in skin diseases and metabolic disorders",
      "Immune system booster - enhances body's natural defense"
    ],
    partsUsed: {
      rhizome: "Main medicinal part, contains highest concentration of active compounds",
      root: "Used fresh or dried, contains essential oils and curcumin",
      leaves: "Used in some traditional preparations and as food wrapper",
      flowers: "Rarely used, but have some medicinal properties"
    },
    preparationMethods: {
      powder: "Dried rhizomes ground into fine powder, most common form",
      paste: "Fresh rhizome ground with water for external application",
      decoction: "Boiled in water for internal consumption",
      oil: "Infused in oil for external application",
      milk: "Golden milk preparation with black pepper and other spices"
    },
    dosageAndPrecautions: {
      standardDosage: {
        powder: "1/4 to 1/2 teaspoon twice daily with warm water or milk",
        paste: "Apply thin layer on affected area",
        decoction: "10-30 ml twice daily"
      },
      precautions: [
        "Avoid during pregnancy in medicinal doses",
        "May interact with blood-thinning medications",
        "Can increase bile production - caution in gallbladder issues",
        "May lower blood sugar - monitor if diabetic",
        "Stop use 2 weeks before surgery"
      ]
    },
    activeCompounds: [
      {
        name: "Curcumin",
        properties: "Primary active compound, anti-inflammatory and antioxidant"
      },
      {
        name: "Turmerone",
        properties: "Anti-inflammatory and antiparasitic"
      },
      {
        name: "Zingiberene",
        properties: "Anti-inflammatory and pain-relieving"
      },
      {
        name: "Demethoxycurcumin",
        properties: "Antioxidant and anti-inflammatory"
      }
    ],
    traditionalKnowledge: {
      rasa: ["Tikta (Bitter)", "Katu (Pungent)"],
      guna: ["Ruksha (Dry)", "Laghu (Light)"],
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      doshaEffect: "Balances Kapha and Vata, can increase Pitta in excess"
    },
    habitatAndCultivation: {
      naturalHabitat: "Native to South Asia, particularly India and Indonesia",
      cultivation: "Requires warm, humid climate and well-draining soil",
      growingConditions: "Temperature 20-30°C, annual rainfall 1500-2000mm, rich loamy soil",
      harvestingPeriod: "8-10 months after planting, when leaves start yellowing",
      propagation: "Through rhizome pieces with 2-3 buds"
    },
    classicalReferences: [
      {
        text: "Charaka Samhita",
        description: "Mentioned as an important medicine for skin diseases and blood disorders"
      },
      {
        text: "Sushruta Samhita",
        description: "Described for its wound healing and anti-inflammatory properties"
      },
      {
        text: "Ashtanga Hridaya",
        description: "Recommended for various skin conditions and as a blood purifier"
      },
      {
        text: "Bhavaprakasha",
        description: "Detailed description of properties and uses in various conditions"
      }
    ]
  },
  {
    name: "Tulsi",
    scientificName: "Ocimum sanctum",
    commonNames: ["Holy Basil", "Sacred Basil", "Tulasi"],
    sanskritName: "तुलसी",
    image: "/images/tulsi.jpeg",
    medicinialUses: [
      "Respiratory disorders - bronchitis, asthma, cold, cough",
      "Stress and anxiety disorders",
      "Fever and infections",
      "Digestive issues",
      "Skin disorders"
    ],
    partsUsed: {
      leaves: "Most commonly used part, contains essential oils",
      seeds: "Used in traditional remedies",
      root: "Used in certain preparations",
      whole_plant: "Used in sacred and medicinal purposes"
    },
    preparationMethods: {
      tea: "Boil 5-6 fresh leaves in water for 5-10 minutes",
      powder: "Dried leaves can be powdered and consumed with honey",
      juice: "Fresh leaves can be crushed to extract juice",
      decoction: "Boil leaves with other herbs for specific conditions"
    },
    dosageAndPrecautions: {
      standardDosage: "2-3 fresh leaves twice daily or 1-2 tsp dried powder",
      precautions: [
        "Avoid during pregnancy",
        "May interact with blood-thinning medications",
        "Consult healthcare provider if on diabetes medication"
      ]
    },
    activeCompounds: [
      {
        name: "Eugenol",
        properties: "Anti-inflammatory and antimicrobial"
      },
      {
        name: "Ursolic acid",
        properties: "Anti-inflammatory and adaptogenic"
      },
      {
        name: "Rosmarinic acid",
        properties: "Antioxidant"
      }
    ],
    traditionalKnowledge: {
      rasa: ["Katu (Pungent)", "Tikta (Bitter)"],
      guna: ["Laghu (Light)", "Ruksha (Dry)"],
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      doshaEffect: "Balances Kapha and Vata, may increase Pitta"
    },
    habitatAndCultivation: {
      naturalHabitat: "Native to Indian subcontinent, grows throughout Southeast Asia",
      cultivation: "Easily grown in pots or gardens, requires full sunlight and well-drained soil",
      growingConditions: "Thrives in warm climate, regular watering, can be grown from seeds or cuttings"
    },
    classicalReferences: [
      {
        text: "Charaka Samhita",
        description: "Mentioned as a sacred plant with healing properties"
      },
      {
        text: "Sushruta Samhita",
        description: "Described for its use in respiratory disorders"
      },
      {
        text: "Bhavaprakasha",
        description: "Detailed description of medicinal properties and uses"
      }
    ]
  },
  {
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    commonNames: ["Indian Ginseng", "Winter Cherry"],
    sanskritName: "अश्वगंधा",
    image: "/images/ashwagandha.jpeg",
    uses: [
      "Reduces stress and anxiety",
      "Improves strength and stamina",
      "Enhances memory and concentration",
      "Supports immune system"
    ],
    preparation: "Root powder can be mixed with warm milk or water, typically taken before bedtime.",
    precautions: "Should be avoided during pregnancy. May interact with certain medications."
  },
  {
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    commonNames: ["Aloe", "Burn Plant", "Medicine Plant"],
    sanskritName: "घृतकुमारी",
    image: "/images/aloevera.jpg",
    uses: [
      "Heals burns and wounds",
      "Improves digestion",
      "Enhances skin health",
      "Reduces inflammation"
    ],
    preparation: "Gel can be applied directly to skin, or juice can be consumed mixed with water.",
    precautions: "Avoid internal consumption during pregnancy. May cause allergic reactions in some people."
  },
  {
    name: "Neem",
    scientificName: "Azadirachta indica",
    commonNames: ["Indian Lilac", "Margosa"],
    sanskritName: "नीम",
    image: "/images/neem.jpg",
    uses: [
      "Natural antibacterial",
      "Blood purifier",
      "Treats skin conditions",
      "Dental care"
    ],
    preparation: "Leaves can be used as paste, oil can be applied topically, or tablets can be taken orally.",
    precautions: "Not recommended during pregnancy. May affect fertility if taken in large doses."
  }
]; 