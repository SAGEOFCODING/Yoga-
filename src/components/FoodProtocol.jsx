import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, PlayCircle } from 'lucide-react';

const RECIPE_YT_IDS = {
  'Moong Dal Chilla': 'f8PBaFTsRHQ',
  'Palak Paneer': 'aEBEdSAeWzY',
  'Dal Tadka': 'NVu2JOBApbk',
  'Oats': 'jFMsKpMbWtE',
  'Quinoa': 'sFmVqwTHpFU',
  'Bajra': 'pXMZPPHMpGM',
  'Sprouts': '7QjVcPkGniQ',
  'Besan': 'JB8TBqVaRxc',
  'Rajma': 'CnSDr88GKHE',
  'Poha': 'L7qILm3EF9c',
  'Paneer Bhurji': 'sOjDHRhAorE',
  'Bhindi': 'UczRMrkFHdA',
  'Lauki': 'qO1IKCzqpqY',
};

const getRecipeYtId = (name) => {
  for (const key of Object.keys(RECIPE_YT_IDS)) {
    if (name.includes(key)) return RECIPE_YT_IDS[key];
  }
  return null;
};

const MEAL_PLAN_DB = {
  0: [
    { name: 'Moong Dal Chilla with Green Chutney', type: 'Breakfast', time: '08:00 AM', calories: 320, macros: { totalFat:'8g', satFat:'1g', transFat:'0g', cholesterol:'0mg', sodium:'450mg', carbs:'45g', fiber:'12g', sugars:'4g', addedSugars:'0g', protein:'15g', vitaminD:'0mcg', calcium:'80mg', iron:'4mg', potassium:'420mg' }},
    { name: 'Dal Tadka & Brown Rice (1 bowl)', type: 'Lunch', time: '01:00 PM', calories: 450, macros: { totalFat:'12g', satFat:'2g', transFat:'0g', cholesterol:'0mg', sodium:'600mg', carbs:'65g', fiber:'14g', sugars:'5g', addedSugars:'0g', protein:'18g', vitaminD:'0mcg', calcium:'60mg', iron:'5mg', potassium:'550mg' }},
    { name: 'Roasted Makhana (1 bowl) & Green Tea', type: 'Snack', time: '04:30 PM', calories: 120, macros: { totalFat:'4g', satFat:'0.5g', transFat:'0g', cholesterol:'0mg', sodium:'150mg', carbs:'20g', fiber:'4g', sugars:'1g', addedSugars:'0g', protein:'3g', vitaminD:'0mcg', calcium:'40mg', iron:'1mg', potassium:'100mg' }},
    { name: 'Palak Paneer (Low Oil) & 2 Bajra Rotis', type: 'Dinner', time: '07:30 PM', calories: 500, macros: { totalFat:'22g', satFat:'8g', transFat:'0g', cholesterol:'25mg', sodium:'550mg', carbs:'45g', fiber:'10g', sugars:'6g', addedSugars:'0g', protein:'24g', vitaminD:'1mcg', calcium:'450mg', iron:'6mg', potassium:'700mg' }},
  ],
  1: [
    { name: 'Vegetable Poha with Peanuts', type: 'Breakfast', time: '08:00 AM', calories: 340, macros: { totalFat:'10g', satFat:'1.5g', transFat:'0g', cholesterol:'0mg', sodium:'400mg', carbs:'55g', fiber:'6g', sugars:'3g', addedSugars:'0g', protein:'8g', vitaminD:'0mcg', calcium:'40mg', iron:'3mg', potassium:'250mg' }},
    { name: 'Mixed Veg Curry & Quinoa', type: 'Lunch', time: '01:00 PM', calories: 420, macros: { totalFat:'14g', satFat:'2g', transFat:'0g', cholesterol:'0mg', sodium:'500mg', carbs:'60g', fiber:'12g', sugars:'8g', addedSugars:'0g', protein:'14g', vitaminD:'0mcg', calcium:'80mg', iron:'4mg', potassium:'600mg' }},
    { name: 'Sprouts Salad (Moong/Chana)', type: 'Snack', time: '04:30 PM', calories: 180, macros: { totalFat:'2g', satFat:'0g', transFat:'0g', cholesterol:'0mg', sodium:'200mg', carbs:'30g', fiber:'8g', sugars:'4g', addedSugars:'0g', protein:'12g', vitaminD:'0mcg', calcium:'50mg', iron:'3mg', potassium:'400mg' }},
    { name: 'Lauki Sabzi & 2 Multigrain Rotis', type: 'Dinner', time: '07:30 PM', calories: 380, macros: { totalFat:'12g', satFat:'1.5g', transFat:'0g', cholesterol:'0mg', sodium:'450mg', carbs:'55g', fiber:'10g', sugars:'5g', addedSugars:'0g', protein:'10g', vitaminD:'0mcg', calcium:'90mg', iron:'4mg', potassium:'500mg' }},
  ],
  2: [
    { name: 'Besan Chilla with Tofu Stuffing', type: 'Breakfast', time: '08:00 AM', calories: 360, macros: { totalFat:'14g', satFat:'2g', transFat:'0g', cholesterol:'0mg', sodium:'480mg', carbs:'40g', fiber:'8g', sugars:'4g', addedSugars:'0g', protein:'20g', vitaminD:'0mcg', calcium:'200mg', iron:'5mg', potassium:'450mg' }},
    { name: 'Rajma (Kidney Beans) & 1 Roti', type: 'Lunch', time: '01:00 PM', calories: 460, macros: { totalFat:'10g', satFat:'1.5g', transFat:'0g', cholesterol:'0mg', sodium:'550mg', carbs:'70g', fiber:'16g', sugars:'6g', addedSugars:'0g', protein:'22g', vitaminD:'0mcg', calcium:'120mg', iron:'6mg', potassium:'800mg' }},
    { name: 'Roasted Chana & Buttermilk', type: 'Snack', time: '04:30 PM', calories: 150, macros: { totalFat:'4g', satFat:'1g', transFat:'0g', cholesterol:'5mg', sodium:'300mg', carbs:'20g', fiber:'5g', sugars:'5g', addedSugars:'0g', protein:'8g', vitaminD:'0mcg', calcium:'150mg', iron:'2mg', potassium:'300mg' }},
    { name: 'Bhindi Fry (Low Oil) & 2 Rotis', type: 'Dinner', time: '07:30 PM', calories: 400, macros: { totalFat:'16g', satFat:'2g', transFat:'0g', cholesterol:'0mg', sodium:'400mg', carbs:'50g', fiber:'10g', sugars:'4g', addedSugars:'0g', protein:'12g', vitaminD:'0mcg', calcium:'100mg', iron:'3mg', potassium:'450mg' }},
  ]
};

const NutrientRow = ({ label, value, bold, indent, thick }) => (
  <div style={{ display:'flex', justifyContent:'space-between', borderBottom: thick ? '6px solid var(--color-border-active)' : '1px solid var(--color-separator)', padding:'5px 0', paddingLeft: indent ? `${indent}px` : '0' }}>
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
              <div style={{ fontSize:'28px', fontWeight:900, color:'var(--color-text-primary)', borderBottom:'6px solid var(--color-border-active)', paddingBottom:'8px', marginBottom:'8px' }}>Nutrition Facts</div>
              <div style={{ fontSize:'13px', color:'var(--color-text-secondary)' }}>1 serving per recipe</div>
              <div style={{ borderBottom:'6px solid var(--color-border-active)', paddingBottom:'8px', marginTop:'8px', marginBottom:'8px' }}>
                <div style={{ fontSize:'13px', color:'var(--color-text-secondary)' }}>Amount per serving</div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'4px' }}>
                  <span style={{ fontSize:'18px', fontWeight:700, color:'var(--color-text-primary)' }}>Calories</span>
                  <span style={{ fontSize:'42px', fontWeight:900, color:'var(--color-accent-light)', lineHeight:1 }}>{meal.calories}</span>
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
  const [showVideo, setShowVideo] = useState(false);
  const videoId = getRecipeYtId(meal.name) || 'dQw4w9WgXcQ'; // Fallback if missing
  
  return (
    <div style={{ background:'var(--color-bg-secondary)', border:'1px solid var(--color-border)', borderRadius:'20px', padding:'24px', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ fontSize:'13px', color:'var(--color-accent-bright)', fontWeight:600 }}>{meal.time}</span>
          <span style={{ fontSize:'11px', padding:'2px 6px', borderRadius:'4px', background:'rgba(16,185,129,0.15)', color:'var(--color-success)', textTransform:'uppercase', fontWeight:600 }}>{meal.type}</span>
        </div>
        <span style={{ fontSize:'13px', color:'var(--color-text-secondary)', fontWeight:500 }}>{meal.calories} KCAL</span>
      </div>
      <h4 style={{ fontSize:'17px', marginBottom:'16px', color:'var(--color-text-primary)' }}>{meal.name}</h4>
      <FDANutrientLabel meal={meal} />
      <div style={{ marginTop:'24px', paddingTop:'16px', borderTop:'1px solid var(--color-separator)' }}>
        <button onClick={() => setShowVideo(!showVideo)} style={{ width: '100%', background:'var(--color-accent-primary)', border:'none', display:'flex', alignItems:'center', gap:'8px', justifyContent:'center', color:'#0A0F1E', fontSize:'14px', fontWeight:600, padding:'12px', borderRadius:'12px', cursor: 'pointer', transition:'all 0.2s ease' }}>
          <PlayCircle size={18} /> {showVideo ? 'Hide Recipe Tutorial' : 'Watch Recipe Tutorial'}
        </button>
      </div>

      {showVideo && (
        <div style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden', background: '#000', aspectRatio: '16/9' }}>
          <iframe 
            width="100%" height="100%" 
            src={`https://www.youtube.com/embed/${videoId}`} 
            title={meal.name} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        </div>
      )}
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
        <div style={{ background:'var(--color-bg-elevated)', borderRadius:'12px', padding:'4px', display:'flex', border:'1px solid var(--color-border)', width:'280px' }}>
          {[0,1,2].map(idx => (
            <button key={idx} onClick={() => setActiveDay(idx)} style={{ flex:1, padding:'10px 16px', textAlign:'center', fontSize:'14px', border:'none', fontWeight: activeDay===idx ? 600 : 500, color: activeDay===idx ? 'var(--color-bg-primary)' : 'var(--color-text-tertiary)', background: activeDay===idx ? 'var(--color-accent-primary)' : 'transparent', borderRadius:'9px', transition:'all 0.2s ease', cursor:'pointer', boxShadow: activeDay===idx ? '0 2px 8px rgba(0,0,0,0.25)' : 'none' }}>
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
