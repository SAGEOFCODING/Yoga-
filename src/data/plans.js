export const RISK_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export const THERAPY_PLANS = {
  [RISK_LEVELS.LOW]: {
    label: 'Wellness & Vitality',
    avoid_list: ['Maida (Refined Flour)', 'Vanaspati (Trans Fats)', 'Excessive Chai/Coffee', 'Bhujia & Deep Fried Snacks'],
    exercises: [
      { name: 'Surya Namaskar', benefit: 'Enhances systemic circulation and metabolic rate.', ytLink: 'https://www.youtube.com/watch?v=QclFBkwNG_k' },
      { name: 'Tadasana (Mountain Pose)', benefit: 'Improves posture and vertical alignment.', ytLink: 'https://www.youtube.com/watch?v=GGFYvj68lT4' },
      { name: 'Vrikshasana (Tree Pose)', benefit: 'Neuromuscular coordination and focus.', ytLink: 'https://www.youtube.com/watch?v=Dic293nVVas' },
      { name: 'Phalakasana (Plank)', benefit: 'Core stabilization.', ytLink: 'https://www.youtube.com/watch?v=T_6A_iInG3o' },
      { name: 'Savasana', benefit: 'Nervous system recovery.', ytLink: 'https://www.youtube.com/watch?v=1X5S8G2Z_Lw' }
    ],
    strategy_details: [
      "Walk for 15 minutes immediately after dinner to regulate glucose.",
      "Incorporate 2 liters of water with a pinch of pink salt daily.",
      "Switch from refined oil to Mustard oil or Ghee for cooking."
    ],
    exercise_summary: 'Focus on consistent movement and dynamic stretching to maintain high metabolic flexibility.',
    meal_plan: [
      {
        day: 1,
        meals: [
          { 
            name: 'Moong Dal Chilla with Green Chutney', time: '08:00', calories: 350, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/moong-dal-chilla-recipe/',
            macros: { protein: '15g', carbs: '45g', fats: '10g' }, 
            micros: { iron: '4mg', folate: '100mcg' }
          },
          { 
            name: 'Egg Bhurji (3 eggs) with 1 Whole Wheat Roti', time: '08:00', calories: 400, type: 'non-veg', recipe_link: 'https://hebbarskitchen.com/egg-bhurji-recipe-anda-bhurji/',
            macros: { protein: '24g', carbs: '25g', fats: '20g' }, 
            micros: { b12: '1.5mcg', choline: '300mg' }
          },
          { 
            name: 'Dal Tadka & Brown Rice (1 bowl)', time: '13:00', calories: 500, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/dal-tadka-punjabi-style/',
            macros: { protein: '18g', carbs: '65g', fats: '15g' }, 
            micros: { fiber: '12g', zinc: '3mg' }
          },
          { 
            name: 'Roasted Makhana (1 bowl)', time: '16:30', calories: 150, type: 'veg', recipe_link: 'https://hebbarskitchen.com/makhana-recipe-roasted-makhana-snacks/',
            macros: { protein: '4g', carbs: '25g', fats: '4g' }, 
            micros: { magnesium: '80mg', calcium: '60mg' }
          },
          { 
            name: 'Palak Paneer (150g) & 2 Bajra Rotis', time: '19:30', calories: 550, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/palak-paneer/',
            macros: { protein: '22g', carbs: '40g', fats: '25g' }, 
            micros: { vitaminA: '4000IU', iron: '5mg' }
          }
        ]
      },
      {
        day: 2,
        meals: [
          { 
            name: 'Vegetable Poha with Peanuts', time: '08:00', calories: 350, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/poha-recipe-kanda-poha/',
            macros: { protein: '10g', carbs: '55g', fats: '12g' }, 
            micros: { iron: '3mg', vitaminC: '10mg' }
          },
          { 
            name: 'Mixed Veg Paratha with Curd', time: '13:00', calories: 450, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/mix-vegetable-paratha-recipe/',
            macros: { protein: '15g', carbs: '60g', fats: '15g' }, 
            micros: { probiotics: 'high', calcium: '200mg' }
          },
          { 
            name: 'Grilled Chicken Tikka (6 pcs) with Mint Chutney', time: '13:00', calories: 400, type: 'non-veg', recipe_link: 'https://hebbarskitchen.com/chicken-tikka-recipe-chicken-tikka-on-tawa/',
            macros: { protein: '45g', carbs: '5g', fats: '18g' }, 
            micros: { b6: '0.8mg', niacin: '12mg' }
          },
          { 
            name: 'Buttermilk (Chaas) with Jeera', time: '16:30', calories: 100, type: 'veg', recipe_link: 'https://hebbarskitchen.com/masala-chaas-recipe-spiced-buttermilk/',
            macros: { protein: '5g', carbs: '10g', fats: '2g' }, 
            micros: { riboflavin: '0.5mg' }
          },
          { 
            name: 'Khichdi (Moong Dal) & Curd', time: '19:30', calories: 450, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/moong-dal-khichdi-recipe/',
            macros: { protein: '18g', carbs: '70g', fats: '10g' }, 
            micros: { easy_digestion: 'high' }
          }
        ]
      },
      {
        day: 3,
        meals: [
          { 
            name: 'Besan Chilla with Tofu/Paneer stuffing', time: '08:00', calories: 380, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/besan-chilla-recipe/',
            macros: { protein: '18g', carbs: '40g', fats: '15g' }, 
            micros: { folate: '120mcg' }
          },
          { 
            name: 'Soya Chunk Curry & 2 Roti', time: '13:00', calories: 450, type: 'veg', recipe_link: 'https://hebbarskitchen.com/soya-chunks-curry-recipe-meal-maker/',
            macros: { protein: '25g', carbs: '50g', fats: '12g' }, 
            micros: { iron: '6mg' }
          },
          { 
            name: 'Sprouts Salad (Moong/Kala Chana)', time: '16:30', calories: 200, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/sprouts-salad-recipe/',
            macros: { protein: '12g', carbs: '30g', fats: '2g' }, 
            micros: { vitaminC: '25mg', fiber: '8g' }
          },
          { 
            name: 'Bhindi Fry & 2 Roti', time: '19:30', calories: 400, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/bhindi-fry-recipe/',
            macros: { protein: '10g', carbs: '45g', fats: '18g' }, 
            micros: { vitaminK: '80mcg' }
          }
        ]
      }
    ],
    tips: [{ text: 'Ancient Grains', rationale: 'Incorporate Millets (Jowar, Bajra) instead of just Wheat to improve metabolic flexibility.' }]
  },
  [RISK_LEVELS.MEDIUM]: {
    label: 'Metabolic Balance',
    avoid_list: ['White Bread/Rusk', 'Sugar in Tea/Coffee', 'Samosa & Pakora', 'Processed Fruit Juices'],
    exercises: [
      { name: 'Adho Mukha Svanasana', benefit: 'Improves blood flow to the brain and stabilizes heart rate.', ytLink: 'https://www.youtube.com/watch?v=kqnua4rHVvA' },
      { name: 'Setu Bandhasana (Bridge)', benefit: 'Thyroid regulation and core engagement.', ytLink: 'https://www.youtube.com/watch?v=vO-XJc2A9jI' },
      { name: 'Bhujangasana (Cobra)', benefit: 'Endocrine stimulation.', ytLink: 'https://www.youtube.com/watch?v=fODR1i0Zgo4' },
      { name: 'Balasana (Child\'s Pose)', benefit: 'Cortisol reduction.', ytLink: 'https://www.youtube.com/watch?v=2MJGgGjkheA' },
      { name: 'Marjaryasana (Cat-Cow)', benefit: 'Spinal mobility.', ytLink: 'https://www.youtube.com/watch?v=kqnua4rHVvA' }
    ],
    strategy_details: [
      "Replace morning Chai biscuits with 5 soaked Almonds and 1 Walnut.",
      "Practice 5 minutes of Anulom Vilom Pranayama before breakfast.",
      "Ensure dinner is completed at least 3 hours before sleep."
    ],
    exercise_summary: 'Focus on stress-reduction through controlled breathing and moderate-intensity asanas.',
    meal_plan: [
      {
        day: 1,
        meals: [
          { 
            name: 'Oats Upma with lots of Veggies', time: '08:00', calories: 300, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/oats-upma-recipe/',
            macros: { protein: '10g', carbs: '40g', fats: '8g' }, 
            micros: { fiber: '10g', zinc: '2mg' }
          },
          { 
            name: 'Baingan Bharta & 2 Missi Roti', time: '13:00', calories: 450, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/baingan-bharta-recipe-punjabi-baingan-bharta/',
            macros: { protein: '15g', carbs: '55g', fats: '15g' }, 
            micros: { potassium: '500mg' }
          },
          { 
            name: 'Sprouted Moong Salad', time: '16:30', calories: 150, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/sprouts-salad-recipe/',
            macros: { protein: '10g', carbs: '25g', fats: '2g' }, 
            micros: { vitaminC: '20mg' }
          },
          { 
            name: 'Paneer Bhurji & 1 Roti', time: '19:30', calories: 450, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/paneer-bhurji-recipe-dry/',
            macros: { protein: '25g', carbs: '20g', fats: '25g' }, 
            micros: { calcium: '400mg' }
          },
          { 
            name: 'Fish Curry (100g) & small bowl Rice', time: '19:30', calories: 500, type: 'non-veg', recipe_link: 'https://hebbarskitchen.com/fish-curry-recipe-indian-style-fish-curry/',
            macros: { protein: '30g', carbs: '45g', fats: '15g' }, 
            micros: { omega3: '2g', iodine: '100mcg' }
          }
        ]
      },
      {
        day: 2,
        meals: [
          { 
            name: 'Dalia (Vegetable)', time: '08:00', calories: 350, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/vegetable-dalia-recipe-dalia-khichdi/',
            macros: { protein: '12g', carbs: '60g', fats: '8g' }, 
            micros: { magnesium: '100mg' }
          },
          { 
            name: 'Chole (Chickpeas) & Brown Rice', time: '13:00', calories: 500, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/chana-masala-recipe-chole-masala-recipe/',
            macros: { protein: '18g', carbs: '70g', fats: '15g' }, 
            micros: { iron: '5mg' }
          },
          { 
            name: 'Roasted Chana (Handful)', time: '16:30', calories: 150, type: 'veg', recipe_link: 'https://hebbarskitchen.com/roasted-chana-recipe-bhuna-chana/',
            macros: { protein: '8g', carbs: '20g', fats: '3g' }, 
            micros: { zinc: '2mg' }
          },
          { 
            name: 'Lauki (Bottle Gourd) Sabzi & 2 Roti', time: '19:30', calories: 350, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/lauki-sabzi-recipe-bottlegourd-curry/',
            macros: { protein: '8g', carbs: '40g', fats: '12g' }, 
            micros: { hydration: 'high' }
          }
        ]
      },
      {
        day: 3,
        meals: [
          { 
            name: 'Masala Oats with Egg (optional)', time: '08:00', calories: 350, type: 'veg', recipe_link: 'https://hebbarskitchen.com/masala-oats-recipe-healthy-rolled-oats/',
            macros: { protein: '12g', carbs: '45g', fats: '10g' }, 
            micros: { fiber: '8g' }
          },
          { 
            name: 'Rajma (Kidney Beans) & 1 Roti', time: '13:00', calories: 450, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/rajma-masala-recipe-punjabi-rajma-masala/',
            macros: { protein: '20g', carbs: '55g', fats: '15g' }, 
            micros: { folate: '150mcg' }
          },
          { 
            name: 'Sprouts Bhel', time: '16:30', calories: 180, type: 'veg', recipe_link: 'https://hebbarskitchen.com/sprouts-chaat-recipe-sprouts-bhel/',
            macros: { protein: '10g', carbs: '25g', fats: '2g' }, 
            micros: { vitaminC: '20mg' }
          },
          { 
            name: 'Stir Fried Tofu/Paneer with Broccoli', time: '19:30', calories: 400, type: 'veg', recipe_link: 'https://hebbarskitchen.com/tofu-stir-fry-recipe-chinese-tofu-stir-fry/',
            macros: { protein: '25g', carbs: '15g', fats: '25g' }, 
            micros: { calcium: '500mg' }
          }
        ]
      }
    ],
    tips: [{ text: 'Deep Breathing', rationale: 'Pranayama helps in balancing the HPA axis, reducing insulin resistance over time.' }]
  },
  [RISK_LEVELS.HIGH]: {
    label: 'Corrective Therapy (Locked-Gate)',
    avoid_list: ['Sugar in any form', 'Maida (Refined Flour)', 'Starchy Potatoes', 'Store-bought Pickles (high salt)'],
    exercises: [
      { name: 'Viparita Karani', benefit: 'Critical for lymphatic drainage and reducing pelvic congestion.', ytLink: 'https://www.youtube.com/watch?v=WpWv9_o70XU' },
      { name: 'Supta Baddha Konasana', benefit: 'Endocrine regulation and hip opening.', ytLink: 'https://www.youtube.com/watch?v=G2_hUoI9C60' },
      { name: 'Apanasana (Knee-to-Chest)', benefit: 'Relieves bloating and gas.', ytLink: 'https://www.youtube.com/watch?v=p4vL7O3q69E' },
      { name: 'Setu Bandha (Supported)', benefit: 'Thyroid stabilization.', ytLink: 'https://www.youtube.com/watch?v=vO-XJc2A9jI' },
      { name: 'Savasana with Support', benefit: 'Systemic metabolic rest.', ytLink: 'https://www.youtube.com/watch?v=1X5S8G2Z_Lw' }
    ],
    strategy_details: [
      "Strictly eliminate all white rice and wheat; replace with Ragi, Bajra, or Jowar.",
      "Consume 1 teaspoon of Methi (Fenugreek) seeds soaked overnight every morning.",
      "Perform 10 minutes of slow rhythmic walking inside the house after every meal."
    ],
    exercise_summary: 'Zero high-impact activities. Focus entirely on restorative asanas to prevent metabolic shock.',
    meal_plan: [
      {
        day: 1,
        meals: [
          { 
            name: 'Ragi Malt (Sugar-free) with Almonds', time: '08:00', calories: 250, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/ragi-malt-recipe/',
            macros: { protein: '6g', carbs: '40g', fats: '6g' }, 
            micros: { calcium: '300mg', iron: '4mg' }
          },
          { 
            name: 'Steamed Lauki (Bottle Gourd) with Moong Dal', time: '13:00', calories: 350, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/lauki-dal-recipe/',
            macros: { protein: '15g', carbs: '45g', fats: '10g' }, 
            micros: { hydration: 'very-high' }
          },
          { 
            name: 'Cucumber & Tomato slices with Lemon', time: '16:30', calories: 80, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/cucumber-salad-recipe/',
            macros: { protein: '2g', carbs: '15g', fats: '0g' }, 
            micros: { vitaminC: '15mg' }
          },
          { 
            name: 'Mung Bean Soup (Clear)', time: '19:30', calories: 300, type: 'veg', recipe_link: 'https://hebbarskitchen.com/moong-dal-soup-recipe-mung-dal-soup/',
            macros: { protein: '12g', carbs: '40g', fats: '5g' }, 
            micros: { easy_digestion: 'high' }
          },
          { 
            name: 'Boiled Egg Whites (4) & Cucumber', time: '16:30', calories: 150, type: 'non-veg', recipe_link: 'https://hebbarskitchen.com/boiled-eggs-recipe-anda-boiled/',
            macros: { protein: '24g', carbs: '5g', fats: '1g' }, 
            micros: { selenium: '30mcg' }
          }
        ]
      },
      {
        day: 2,
        meals: [
          { 
            name: 'Bajra Khichdi (Vegetable)', time: '08:00', calories: 320, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/bajra-khichdi-recipe-bajra-recipes/',
            macros: { protein: '10g', carbs: '55g', fats: '8g' }, 
            micros: { zinc: '3mg' }
          },
          { 
            name: 'Tofu/Paneer & Capsicum Stir-fry', time: '13:00', calories: 380, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/paneer-capsicum-recipe-capsicum-recipes/',
            macros: { protein: '22g', carbs: '15g', fats: '22g' }, 
            micros: { calcium: '400mg' }
          },
          { 
            name: 'Walnuts (4 halves)', time: '16:30', calories: 150, type: 'veg', recipe_link: 'https://hebbarskitchen.com/dry-fruits-benefits-soaked-dry-fruits/',
            macros: { protein: '4g', carbs: '4g', fats: '14g' }, 
            micros: { omega3: '2g' }
          },
          { 
            name: 'Stir Fried Spinach & Moong Dal', time: '19:30', calories: 300, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/palak-dal-recipe/',
            macros: { protein: '15g', carbs: '35g', fats: '10g' }, 
            micros: { iron: '6mg' }
          }
        ]
      },
      {
        day: 3,
        meals: [
          { 
            name: 'Jowar Upma', time: '08:00', calories: 300, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/jowar-upma-recipe/',
            macros: { protein: '8g', carbs: '50g', fats: '8g' }, 
            micros: { gluten_free: 'yes' }
          },
          { 
            name: 'Stuffed Karela (Bitter Gourd)', time: '13:00', calories: 350, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/stuffed-karela-punjabi-stuffed-karela/',
            macros: { protein: '6g', carbs: '40g', fats: '15g' }, 
            micros: { charantin: 'high' }
          },
          { 
            name: 'Sprouts Soup', time: '16:30', calories: 180, type: 'veg', recipe_link: 'https://hebbarskitchen.com/sprouts-soup-recipe-moong-sprouts-soup/',
            macros: { protein: '12g', carbs: '25g', fats: '4g' }, 
            micros: { fiber: '10g' }
          },
          { 
            name: 'Cauliflower & Green Peas Sabzi (low oil)', time: '19:30', calories: 320, type: 'veg', recipe_link: 'https://www.vegrecipesofindia.com/gobi-matar-recipe/',
            macros: { protein: '10g', carbs: '40g', fats: '10g' }, 
            micros: { vitaminK: '100mcg' }
          }
        ]
      }
    ],
    tips: [{ text: 'Post-meal activity', rationale: 'Walking for just 10 mins post-meal significantly lowers glucose spikes in high-risk individuals.' }]
  }
};
