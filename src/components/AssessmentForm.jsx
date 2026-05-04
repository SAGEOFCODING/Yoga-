import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { User, Dna, FlaskConical, Check, Dumbbell, Leaf, Zap } from 'lucide-react';

const STEPS = [
  { id: 'profile', title: 'Bio Profile', icon: <User size={18} /> },
  { id: 'biometrics', title: 'Markers', icon: <Dna size={18} /> },
  { id: 'conditions', title: 'Clinical', icon: <FlaskConical size={18} /> }
];

const SegmentedControl = ({ options, value, onChange }) => (
  <div style={{ background: 'var(--color-bg-elevated)', borderRadius: '12px', padding: '4px', display: 'flex', border: '1px solid var(--color-border)' }}>
    {options.map(opt => {
      const isActive = value === opt.value;
      return (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1, padding: '10px 0', textAlign: 'center', fontSize: '14px', border: 'none',
            fontWeight: isActive ? 600 : 500,
            color: isActive ? 'var(--color-accent-light)' : 'var(--color-text-tertiary)',
            background: isActive ? 'var(--color-accent-primary)' : 'transparent',
            borderRadius: '9px', transition: 'all 0.2s ease', cursor: 'pointer',
            boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.25)' : 'none'
          }}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

const TrainingPreferenceSelector = ({ value, onChange }) => {
  const options = [
    { label: 'Strength Training', value: 'Strength Training', icon: <Dumbbell size={18} /> },
    { label: 'Yoga', value: 'Yoga', icon: <Leaf size={18} /> },
    { label: 'Mixed', value: 'Mixed', icon: <Zap size={18} /> }
  ];
  return (
    <div style={{ borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
      {options.map((opt, idx) => {
        const isActive = value === opt.value;
        return (
          <div 
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
              borderBottom: idx < options.length - 1 ? '1px solid var(--color-separator)' : 'none',
              cursor: 'pointer', transition: 'background 0.15s ease',
              background: isActive ? 'rgba(116, 179, 206, 0.06)' : 'var(--color-bg-elevated)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-primary)', fontSize: '16px' }}>
              <span style={{ color: 'var(--color-accent-bright)' }}>{opt.icon}</span>
              {opt.label}
            </div>
            <div style={{ color: 'var(--color-accent-bright)', opacity: isActive ? 1 : 0, transition: 'opacity 0.15s ease' }}>
              <Check size={20} strokeWidth={3} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AssessmentForm = () => {
  const { assessment, setAssessment, calculateRisk, step, setStep } = useStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNext = () => {
    if (step < STEPS.length) {
      setStep(step + 1);
    } 
    if (step === STEPS.length) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleSymptom = (symptom) => {
    const newSymptoms = assessment.symptoms.includes(symptom)
      ? assessment.symptoms.filter(s => s !== symptom)
      : [...assessment.symptoms, symptom];
    setAssessment({ symptoms: newSymptoms });
  };

  const handleSubmit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      calculateRisk();
      setIsAnalyzing(false);
    }, 2000);
  };

  if (isAnalyzing) {
    return (
      <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
          <h2 className="page-heading" style={{ marginBottom: '16px' }}>ANALYZING BIOMARKERS</h2>
          <p className="caption-text" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>MAPPING PHYSIOLOGICAL RISK VECTORS...</p>
          <div style={{ width: '300px', height: '4px', background: 'var(--color-border)', borderRadius: '2px', margin: '32px auto', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2 }} style={{ height: '100%', background: 'var(--color-accent-primary)' }} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container">
      
      {/* Progress Step Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative', maxWidth: '600px', margin: '0 auto 40px' }}>
        <div style={{ position: 'absolute', top: '18px', left: '0', width: '100%', height: '2px', background: 'var(--color-border)', zIndex: 0 }}>
           <div style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%`, height: '100%', background: 'var(--color-accent-primary)', transition: 'width 0.4s ease' }} />
        </div>
        {STEPS.map((s, idx) => {
          const isCompleted = idx < step - 1;
          const isActive = idx === step - 1;
          const isInactive = idx > step - 1;

          return (
            <div key={s.id} style={{ zIndex: 1, textAlign: 'center', flex: 1 }}>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '50%', margin: '0 auto 8px',
                background: isCompleted ? 'var(--color-accent-primary)' : isActive ? 'var(--color-accent-bright)' : 'var(--color-bg-elevated)',
                border: isInactive ? '1px solid var(--color-border)' : 'none',
                color: isCompleted ? '#fff' : isActive ? 'var(--color-bg-primary)' : 'var(--color-text-tertiary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 0 5px rgba(116,179,206,0.18)' : 'none'
              }}>
                {isCompleted ? <Check size={20} strokeWidth={3} /> : s.icon}
              </div>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: isActive || isCompleted ? 600 : 400, 
                color: isActive || isCompleted ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' 
              }}>
                {s.title}
              </span>
            </div>
          )
        })}
      </div>

      {/* Card Content */}
      <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="glass-card">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 className="page-heading">Bio Profile</h2>
              
              <div className="form-grid">
                <div className="input-group">
                  <label>Age</label>
                  <input type="number" min="0" value={assessment.age} onChange={(e) => setAssessment({ age: e.target.value })} placeholder="25" />
                </div>
                <div className="input-group">
                  <label>Biological Gender</label>
                  <SegmentedControl 
                    options={[{ label: 'Female', value: 'female' }, { label: 'Male', value: 'male' }]} 
                    value={assessment.gender} 
                    onChange={(val) => setAssessment({ gender: val })} 
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Dietary Preference</label>
                <SegmentedControl 
                  options={[{ label: 'Vegetarian', value: 'veg' }, { label: 'Non-Vegetarian', value: 'non-veg' }]} 
                  value={assessment.dietaryPreference} 
                  onChange={(val) => setAssessment({ dietaryPreference: val })} 
                />
              </div>

              <div className="input-group">
                <label>Training Preference</label>
                <TrainingPreferenceSelector 
                  value={assessment.trainingPreference} 
                  onChange={(val) => setAssessment({ trainingPreference: val })} 
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 className="page-heading">Biometric Markers</h2>
              
              <div className="form-grid">
                <div className="input-group">
                  <label>Weight (kg)</label>
                  <input type="number" min="0" value={assessment.weight} onChange={(e) => setAssessment({ weight: e.target.value })} placeholder="70" />
                </div>
                <div className="input-group">
                  <label>Height (cm)</label>
                  <input type="number" min="0" value={assessment.height} onChange={(e) => setAssessment({ height: e.target.value })} placeholder="175" />
                </div>
                <div className="input-group">
                  <label>Waist (in)</label>
                  <input type="number" min="0" value={assessment.waist} onChange={(e) => setAssessment({ waist: e.target.value })} placeholder="32" />
                </div>
                <div className="input-group">
                  <label>Hip (in)</label>
                  <input type="number" min="0" value={assessment.hip} onChange={(e) => setAssessment({ hip: e.target.value })} placeholder="40" />
                </div>
              </div>

              <div className="input-group">
                <label>Lifestyle Stress</label>
                <SegmentedControl 
                  options={[{ label: 'Sedentary', value: 'sedentary' }, { label: 'Moderate', value: 'moderate' }, { label: 'Active', value: 'active' }]} 
                  value={assessment.lifestyle} 
                  onChange={(val) => setAssessment({ lifestyle: val })} 
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 className="page-heading">Clinical Indicators</h2>
              
              <div className="form-grid">
                {[
                  { label: 'Irregular Periods', gender: 'female' },
                  { label: 'Excessive Thirst', gender: 'both' },
                  { label: 'Chronic Fatigue', gender: 'both' },
                  { label: 'Metabolic Lag', gender: 'both' },
                  { label: 'High Cortisol', gender: 'both' },
                  { label: 'Bloating', gender: 'both' },
                  { label: 'Brain Fog', gender: 'both' },
                  { label: 'Low Energy / Fatigue after meals', gender: 'both' },
                  { label: 'Sugar Cravings', gender: 'both' },
                  { label: 'Poor Sleep Quality', gender: 'both' },
                  { label: 'Frequent Headaches', gender: 'both' },
                  { label: 'Joint Pain', gender: 'both' },
                  { label: 'Hair Thinning', gender: 'both' },
                  { label: 'Slow Wound Healing', gender: 'both' },
                  { label: 'Frequent Infections', gender: 'both' },
                  { label: 'Acne / Hormonal Breakouts', gender: 'both' },
                  { label: 'Water Retention / Puffiness', gender: 'both' },
                  { label: 'Cold Hands & Feet', gender: 'both' },
                  { label: 'Low Libido', gender: 'both' },
                  { label: 'Constipation / Irregular Bowel', gender: 'both' },
                  { label: 'Acid Reflux / GERD', gender: 'both' },
                  { label: 'Shortness of Breath on exertion', gender: 'both' },
                  { label: 'Heart Palpitations', gender: 'both' },
                  { label: 'Numbness or Tingling in limbs', gender: 'both' },
                  { label: 'Poor Concentration', gender: 'both' },
                  { label: 'Excessive Sweating', gender: 'both' }
                ]
                .filter(s => s.gender === 'both' || s.gender === assessment.gender)
                .map(item => {
                  const isSelected = assessment.symptoms.includes(item.label);
                  return (
                    <div
                      key={item.label}
                      onClick={() => toggleSymptom(item.label)}
                      style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
                        border: '1px solid', borderColor: isSelected ? 'var(--color-accent-primary)' : 'var(--color-border)',
                        cursor: 'pointer', transition: 'all 0.15s ease', borderRadius: '12px',
                        background: isSelected ? 'rgba(0, 201, 167, 0.08)' : 'var(--color-bg-elevated)'
                      }}
                    >
                      <div style={{ color: 'var(--color-text-primary)', fontSize: '15px' }}>
                        {item.label}
                      </div>
                      <div style={{ color: 'var(--color-accent-bright)', opacity: isSelected ? 1 : 0, transition: 'opacity 0.15s ease' }}>
                        <Check size={20} strokeWidth={3} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', gap: '16px' }}>
          <button className="btn-outline" onClick={handleBack} style={{ visibility: step === 1 ? 'hidden' : 'visible', flex: 'none' }}>
            Back
          </button>
          <button className="btn-primary" onClick={handleNext} style={{ flex: 'none', width: '140px' }}>
            {step === STEPS.length ? 'Execute' : 'Next'} 
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentForm;
