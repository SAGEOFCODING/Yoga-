import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, PlayCircle } from 'lucide-react';

const MEAL_PLAN_DB = {
  0: [
    {
      name: 'Moong Dal Chilla with Green Chutney', type: 'Breakfast', time: '08:00 AM', calories: 320,
      ingredients: ['half cup moong dal soaked 4 hours', '1 green chilli', 'half tsp cumin seeds', 'quarter tsp turmeric', 'salt to taste', '1 tsp grated ginger', 'fresh coriander', '1 tsp oil for cooking'],
      macros: { totalFat:'8g', satFat:'1g', transFat:'0g', cholesterol:'0mg', sodium:'450mg', carbs:'45g', fiber:'12g', sugars:'4g', addedSugars:'0g', protein:'15g', vitaminD:'0mcg', calcium:'80mg', iron:'4mg', potassium:'420mg' }
    },
    {
      name: 'Dal Tadka & Brown Rice (1 bowl)', type: 'Lunch', time: '01:00 PM', calories: 450,
      ingredients: ['half cup toor dal', '1 cup brown rice', '1 tomato chopped', '1 onion chopped', '2 garlic cloves', 'half tsp cumin', 'half tsp mustard seeds', 'quarter tsp turmeric', '1 dry red chilli', '1 tsp ghee', 'fresh coriander'],
      macros: { totalFat:'12g', satFat:'2g', transFat:'0g', cholesterol:'0mg', sodium:'600mg', carbs:'65g', fiber:'14g', sugars:'5g', addedSugars:'0g', protein:'18g', vitaminD:'0mcg', calcium:'60mg', iron:'5mg', potassium:'550mg' }
    },
    {
      name: 'Roasted Makhana (1 bowl) & Green Tea', type: 'Snack', time: '04:30 PM', calories: 120,
      ingredients: ['1 cup fox nuts makhana', 'half tsp ghee', 'quarter tsp black pepper', 'quarter tsp rock salt', 'quarter tsp chaat masala optional', '1 cup green tea no sugar'],
      macros: { totalFat:'4g', satFat:'0.5g', transFat:'0g', cholesterol:'0mg', sodium:'150mg', carbs:'20g', fiber:'4g', sugars:'1g', addedSugars:'0g', protein:'3g', vitaminD:'0mcg', calcium:'40mg', iron:'1mg', potassium:'100mg' }
    },
    {
      name: 'Palak Paneer (Low Oil) & 2 Bajra Rotis', type: 'Dinner', time: '07:30 PM', calories: 500,
      ingredients: ['200g fresh spinach palak', '150g paneer cubed', '1 onion finely chopped', '2 tomatoes pureed', '1 tsp ginger garlic paste', 'half tsp cumin', 'quarter tsp garam masala', '1 tsp oil', 'salt to taste', '2 bajra rotis'],
      macros: { totalFat:'22g', satFat:'8g', transFat:'0g', cholesterol:'25mg', sodium:'550mg', carbs:'45g', fiber:'10g', sugars:'6g', addedSugars:'0g', protein:'24g', vitaminD:'1mcg', calcium:'450mg', iron:'6mg', potassium:'700mg' }
    }
  ],
  1: [
    {
      name: 'Vegetable Poha with Peanuts', type: 'Breakfast', time: '08:00 AM', calories: 340,
      ingredients: ['1 cup thick poha flattened rice', '2 tbsp roasted peanuts', '1 small onion chopped', '1 green chilli', 'half tsp mustard seeds', '8 curry leaves', 'quarter tsp turmeric', '1 tsp oil', 'lemon juice', 'fresh coriander', 'salt to taste'],
      macros: { totalFat:'10g', satFat:'1.5g', transFat:'0g', cholesterol:'0mg', sodium:'400mg', carbs:'55g', fiber:'6g', sugars:'3g', addedSugars:'0g', protein:'8g', vitaminD:'0mcg', calcium:'40mg', iron:'3mg', potassium:'250mg' }
    },
    {
      name: 'Mixed Veg Curry & Quinoa', type: 'Lunch', time: '01:00 PM', calories: 420,
      ingredients: ['half cup quinoa', '1 carrot diced', 'half cup green peas', '1 bell pepper', '1 zucchini', '1 onion', '2 tomatoes', '1 tsp ginger garlic paste', 'half tsp cumin', 'half tsp coriander powder', 'quarter tsp turmeric', '1 tsp oil'],
      macros: { totalFat:'14g', satFat:'2g', transFat:'0g', cholesterol:'0mg', sodium:'500mg', carbs:'60g', fiber:'12g', sugars:'8g', addedSugars:'0g', protein:'14g', vitaminD:'0mcg', calcium:'80mg', iron:'4mg', potassium:'600mg' }
    },
    {
      name: 'Sprouts Salad (Moong/Chana)', type: 'Snack', time: '04:30 PM', calories: 180,
      ingredients: ['half cup moong sprouts', 'half cup chana sprouts', '1 small cucumber diced', '1 tomato diced', 'half red onion chopped', 'lemon juice', 'chaat masala', 'fresh coriander', 'salt and pepper'],
      macros: { totalFat:'2g', satFat:'0g', transFat:'0g', cholesterol:'0mg', sodium:'200mg', carbs:'30g', fiber:'8g', sugars:'4g', addedSugars:'0g', protein:'12g', vitaminD:'0mcg', calcium:'50mg', iron:'3mg', potassium:'400mg' }
    },
    {
      name: 'Lauki Sabzi & 2 Multigrain Rotis', type: 'Dinner', time: '07:30 PM', calories: 380,
      ingredients: ['300g bottle gourd lauki diced', '1 onion chopped', '1 tomato chopped', 'half tsp cumin seeds', 'quarter tsp turmeric', 'half tsp coriander powder', '1 tsp oil', 'salt to taste', 'fresh coriander', '2 multigrain rotis'],
      macros: { totalFat:'12g', satFat:'1.5g', transFat:'0g', cholesterol:'0mg', sodium:'450mg', carbs:'55g', fiber:'10g', sugars:'5g', addedSugars:'0g', protein:'10g', vitaminD:'0mcg', calcium:'90mg', iron:'4mg', potassium:'500mg' }
    }
  ],
  2: [
    {
      name: 'Besan Chilla with Tofu Stuffing', type: 'Breakfast', time: '08:00 AM', calories: 360,
      ingredients: ['three quarter cup besan gram flour', '100g firm tofu crumbled', '1 green chilli', 'half tsp ajwain', 'quarter tsp turmeric', '1 small onion grated', '1 tsp grated ginger', 'fresh coriander', '1 tsp oil', 'water to make batter', 'salt to taste'],
      macros: { totalFat:'14g', satFat:'2g', transFat:'0g', cholesterol:'0mg', sodium:'480mg', carbs:'40g', fiber:'8g', sugars:'4g', addedSugars:'0g', protein:'20g', vitaminD:'0mcg', calcium:'200mg', iron:'5mg', potassium:'450mg' }
    },
    {
      name: 'Rajma (Kidney Beans) & 1 Roti', type: 'Lunch', time: '01:00 PM', calories: 460,
      ingredients: ['1 cup kidney beans soaked overnight', '2 tomatoes pureed', '1 large onion chopped', '1 tsp ginger garlic paste', 'half tsp cumin', '1 tsp coriander powder', 'half tsp garam masala', 'quarter tsp red chilli powder', '1 tsp oil', '1 whole wheat roti', 'salt to taste'],
      macros: { totalFat:'10g', satFat:'1.5g', transFat:'0g', cholesterol:'0mg', sodium:'550mg', carbs:'70g', fiber:'16g', sugars:'6g', addedSugars:'0g', protein:'22g', vitaminD:'0mcg', calcium:'120mg', iron:'6mg', potassium:'800mg' }
    },
    {
      name: 'Roasted Chana & Buttermilk', type: 'Snack', time: '04:30 PM', calories: 150,
      ingredients: ['half cup roasted chana bengal gram', '1 glass low fat buttermilk', 'half tsp roasted cumin powder', 'pinch of black salt', 'fresh mint leaves'],
      macros: { totalFat:'4g', satFat:'1g', transFat:'0g', cholesterol:'5mg', sodium:'300mg', carbs:'20g', fiber:'5g', sugars:'5g', addedSugars:'0g', protein:'8g', vitaminD:'0mcg', calcium:'150mg', iron:'2mg', potassium:'300mg' }
    },
    {
      name: 'Bhindi Fry (Low Oil) & 2 Rotis', type: 'Dinner', time: '07:30 PM', calories: 400,
      ingredients: ['300g okra bhindi sliced', '1 onion thinly sliced', '1 tsp coriander powder', 'half tsp cumin powder', 'quarter tsp amchur dry mango powder', 'quarter tsp turmeric', '1 tsp oil', 'salt to taste', '2 whole wheat rotis'],
      macros: { totalFat:'16g', satFat:'2g', transFat:'0g', cholesterol:'0mg', sodium:'400mg', carbs:'50g', fiber:'10g', sugars:'4g', addedSugars:'0g', protein:'12g', vitaminD:'0mcg', calcium:'100mg', iron:'3mg', potassium:'450mg' }
    }
  ]
};

const NutrientRow = ({ label, value, bold, indent, thick }) => (
  <div style={{ display:'flex', justifyContent:'space-between', borderBottom: thick ? '6px solid var(--color-accent-meals)' : '1px solid var(--color-separator)', padding:'5px 0', paddingLeft: indent ? `${indent}px` : '0' }}>
    <span style={{ color:'var(--color-text-primary)', fontSize:'14px', fontWeight: bold ? 700 : 400 }}>{label}</span>
    <span style={{ color:'var(--color-text-secondary)', fontSize:'14px' }}>{value || ''}</span>
  </div>
);

const FDANutrientLabel = ({ meal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const m = meal.macros;
  return (
    <div style={{ marginTop:'16px', border:'1px solid var(--color-border)', borderRadius:'12px', overflow:'hidden' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ width:'100%', padding:'12px 16px', background:'var(--color-bg-elevated)', border:'none', color:'var(--color-text-secondary)', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', fontSize:'13px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px' }}>
        <span>Nutrition Facts</span>
        <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition:'0.2s ease' }} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:'hidden' }}>
            <div style={{ background:'var(--color-bg-elevated)', border:'1px solid var(--color-border)', borderRadius:'14px', padding:'16px 20px', margin:'8px' }}>
              <div style={{ fontSize:'28px', fontWeight:900, color:'var(--color-text-primary)', borderBottom:'6px solid var(--color-accent-meals)', paddingBottom:'8px', marginBottom:'8px' }}>Nutrition Facts</div>
              <div style={{ fontSize:'13px', color:'var(--color-text-secondary)' }}>1 serving per recipe</div>
              <div style={{ borderBottom:'6px solid var(--color-accent-meals)', paddingBottom:'8px', marginTop:'8px', marginBottom:'8px' }}>
                <div style={{ fontSize:'13px', color:'var(--color-text-secondary)' }}>Amount per serving</div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'4px' }}>
                  <span style={{ fontSize:'18px', fontWeight:700, color:'var(--color-text-primary)' }}>Calories</span>
                  <span style={{ fontSize:'42px', fontWeight:900, color:'var(--color-text-primary)', lineHeight:1 }}>{meal.calories}</span>
                </div>
              </div>
              <div style={{ textAlign:'right', fontSize:'12px', color:'var(--color-text-tertiary)', borderBottom:'1px solid var(--color-separator)', padding:'4px 0' }}>% Daily Value*</div>
              <NutrientRow label={`Total Fat ${m.totalFat}`} value="—" bold />
              <NutrientRow label={`Saturated Fat ${m.satFat}`} value="—" indent={16} />
              <NutrientRow label={`Trans Fat ${m.transFat}`} indent={16} />
              <NutrientRow label={`Cholesterol ${m.cholesterol}`} value="—" bold />
              <NutrientRow label={`Sodium ${m.sodium}`} value="—" bold />
              <NutrientRow label={`Total Carbohydrate ${m.carbs}`} value="—" bold />
              <NutrientRow label={`Dietary Fiber ${m.fiber}`} value="—" indent={16} />
              <NutrientRow label={`Total Sugars ${m.sugars}`} indent={16} />
              <NutrientRow label={`Incl. ${m.addedSugars} Added Sugars`} value="—" indent={32} />
              <NutrientRow label={`Protein ${m.protein}`} bold thick />
              <NutrientRow label={`Vitamin D ${m.vitaminD}`} value="—" />
              <NutrientRow label={`Calcium ${m.calcium}`} value="—" />
              <NutrientRow label={`Iron ${m.iron}`} value="—" />
              <NutrientRow label={`Potassium ${m.potassium}`} value="—" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RecipeCard = ({ meal }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  
  return (
    <div style={{ background:'var(--color-bg-secondary)', border:'1px solid var(--color-border)', borderRadius:'20px', padding:'24px', boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ fontSize:'13px', color:'var(--color-accent-purple)', fontWeight:700 }}>{meal.time}</span>
          <span style={{ fontSize:'11px', padding:'2px 8px', borderRadius:'4px', background:'var(--color-accent-pink)', color:'var(--color-text-primary)', textTransform:'uppercase', fontWeight:700 }}>{meal.type}</span>
        </div>
        <span style={{ fontSize:'13px', color:'var(--color-text-secondary)', fontWeight:500 }}>{meal.calories} KCAL</span>
      </div>
      <h4 style={{ fontSize:'17px', marginBottom:'16px', color:'var(--color-text-primary)' }}>{meal.name}</h4>
      <FDANutrientLabel meal={meal} />
      
      <div style={{ marginTop:'16px', paddingTop:'16px', borderTop:'1px solid var(--color-separator)' }}>
        <button onClick={() => setShowIngredients(!showIngredients)} style={{ width: '100%', background:'var(--color-accent-quaternary)', border:'none', color:'#FFFFFF', fontSize:'14px', fontWeight:600, padding:'12px', borderRadius:'12px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(208, 140, 96, 0.2)' }}>
          🍲 {showIngredients ? 'Hide Ingredients' : 'View Ingredients'}
        </button>
      </div>

      <AnimatePresence>
        {showIngredients && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} style={{ overflow:'hidden' }}>
            <div style={{ marginTop:'16px', background:'var(--color-bg-elevated)', borderRadius:'16px', padding:'16px', border:'1px solid var(--color-border)' }}>
              <p style={{ fontSize:'12px', color:'var(--color-text-tertiary)', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:600, marginBottom:'12px' }}>Ingredients (1 serving)</p>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'8px' }}>
                {meal.ingredients?.map((ing, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'8px', fontSize:'14px', color:'var(--color-text-secondary)' }}>
                    <span style={{ color:'var(--color-emerald)', marginTop:'4px' }}>•</span>
                    {ing}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-emerald)', fontWeight: 600 }}>
                <Fingerprint size={16} />
                Precision Bio-Correction Protocol v3.0
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FoodProtocol = () => {
  const [activeDay, setActiveDay] = useState(0);
  return (
    <section id="nutrition-section">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <h3 className="page-heading" style={{ marginBottom:'8px' }}>Molecular Nutrition</h3>
          <p style={{ color:'var(--color-text-secondary)', fontSize:'15px' }}>4-Meal Daily Protocol (Pure Vegetarian Options)</p>
        </div>
        <div style={{ background:'var(--color-bg-secondary)', borderRadius:'12px', padding:'4px', display:'flex', border:'2px solid var(--color-accent-brown)', width:'280px' }}>
          {[0,1,2].map(idx => (
            <button key={idx} onClick={() => setActiveDay(idx)} style={{ flex:1, padding:'10px 16px', textAlign:'center', fontSize:'14px', border:'none', fontWeight: activeDay===idx ? 600 : 500, color: activeDay===idx ? '#FFFFFF' : 'var(--color-text-tertiary)', background: activeDay===idx ? 'var(--color-accent-quaternary)' : 'transparent', borderRadius:'9px', transition:'all 0.2s ease', cursor:'pointer', boxShadow: activeDay===idx ? '0 2px 8px rgba(208, 140, 96, 0.25)' : 'none' }}>
              DAY {idx+1}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'24px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeDay} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.2 }} style={{ display:'contents' }}>
            {MEAL_PLAN_DB[activeDay].map((meal, idx) => (
              <RecipeCard key={`${activeDay}-${idx}`} meal={meal} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FoodProtocol;
