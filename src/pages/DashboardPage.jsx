import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import SleepTracker from '../components/SleepTracker';
import WeightLog from '../components/WeightLog';
import { ShieldCheck, Info, Brain, Wind, Zap } from 'lucide-react';

const DashboardPage = () => {
  const { bodyComp, assessment, reset } = useStore();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gender = assessment.gender;
  const rfmVal = parseFloat(bodyComp.rfm) || 0;
  const healthyMin = gender === 'male' ? 10 : 18;
  const healthyMax = gender === 'male' ? 20 : 28;

  let ringFill = 0, ringColor = '#22C55E', statusText = 'Within healthy range ✓', statusColor = '#22C55E';

  if (rfmVal >= healthyMin && rfmVal <= healthyMax) {
    ringFill = 100;
  } else if (rfmVal > healthyMax) {
    const excess = rfmVal - healthyMax;
    ringFill = Math.min(100, (excess / 20) * 100);
    ringColor = excess > 10 ? '#DC2626' : '#F59E0B';
    statusText = `${excess.toFixed(1)}% above target`;
    statusColor = ringColor;
  } else {
    const deficit = healthyMin - rfmVal;
    ringFill = Math.min(100, (deficit / 10) * 100);
    ringColor = '#111827';
    statusText = `${deficit.toFixed(1)}% below healthy minimum`;
    statusColor = '#111827';
  }

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (ringFill / 100) * circumference;

  const QUOTES = [
    "What seems impossible today will one day become your warm-up.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "Health is not about the weight you lose, but about the life you gain.",
    "Small daily improvements are the key to staggering long-term results."
  ];
  const quoteOfDay = QUOTES[new Date().getDay() % QUOTES.length];

  const WELLNESS_TIPS = [
    { icon: 'Wind', title: 'Box Breathing', body: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s. Repeat 4x.' },
    { icon: 'Zap', title: 'Cold Water Reset', body: 'Splash cold water on face and wrists to lower heart rate.' },
    { icon: 'Brain', title: '5-4-3-2-1 Grounding', body: '5 see, 4 touch, 3 hear, 2 smell, 1 taste. Stops anxiety.' },
    { icon: 'Wind', title: 'Progressive Relaxation', body: 'Tense each muscle 5s then release, toes to head.' },
    { icon: 'Zap', title: 'Anger Exit Rule', body: 'Remove yourself for 90s — cortisol spike duration.' },
    { icon: 'Brain', title: 'Hum to Calm Down', body: 'Hum any tune 2 min to activate vagus nerve.' },
    { icon: 'Wind', title: '2-Minute Rule', body: 'If a task takes <2 min, do it now. Clears mental load.' },
  ];

  const todayIndex = new Date().getDay();
  const dailyTips = [
    WELLNESS_TIPS[todayIndex % WELLNESS_TIPS.length],
    WELLNESS_TIPS[(todayIndex + 1) % WELLNESS_TIPS.length],
    WELLNESS_TIPS[(todayIndex + 2) % WELLNESS_TIPS.length],
  ];

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '80px 16px 40px' }}>

      {/* ═══ Quote of the Day ═══ */}
      <div style={{ background: 'var(--color-yellow, #FEF3C7)', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '14px 16px', textAlign: 'center', marginBottom: '12px' }}>
        <h4 style={{ color: '#111827', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', fontWeight: 700 }}>Daily Bio-Correction Wisdom</h4>
        <p style={{ fontSize: '14px', color: '#374151', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.5 }}>"{quoteOfDay}"</p>
      </div>

      {/* ═══ Quick Wellness Tips ═══ */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ color: '#111827', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', fontWeight: 700 }}>Quick Wellness Tips</h4>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '10px' }}>
          {dailyTips.map((tip, i) => {
            let IconComponent = Brain;
            if (tip.icon === 'Wind') IconComponent = Wind;
            if (tip.icon === 'Zap') IconComponent = Zap;

            const bgColors = ['var(--color-pink, #FCE7F3)', 'var(--color-green, #D1FAE5)', 'var(--color-blue, #DBEAFE)'];

            return (
              <div key={i} style={{ padding: '14px', background: bgColors[i % 3], border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                <IconComponent size={18} color="#111827" />
                <h5 style={{ color: '#111827', fontSize: '13px', marginBottom: '4px', marginTop: '8px', fontWeight: 700 }}>{tip.title}</h5>
                <p style={{ color: '#374151', fontWeight: 500, fontSize: '12px', lineHeight: 1.5 }}>{tip.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ RFM Body Composition Card ═══ */}
      <div style={{ marginBottom: '16px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{
          textAlign: 'center', background: '#FFFFFF', border: '1px solid #E5E7EB',
          borderRadius: '16px', padding: '20px', overflow: 'hidden',
        }}>
          <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 16px', maxWidth: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
              <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#F3F4F6" strokeWidth="10" />
              <motion.circle cx="100" cy="100" r={radius} fill="transparent" stroke="#7C3AED" strokeWidth="12" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 2, ease: "easeOut" }} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: ringColor, lineHeight: 1 }}>{bodyComp.rfm}%</div>
              <div style={{ fontSize: '10px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px', fontWeight: 500 }}>RFM Index</div>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '2px' }}>Desirable: {healthyMin}–{healthyMax}%</div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: statusColor, marginBottom: '10px' }}>{statusText}</div>
          <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: ringColor }}>{bodyComp.fitnessClass || 'Assessment Complete'}</h2>
          <p style={{ fontSize: '12px', color: '#374151', fontWeight: 400, marginBottom: '16px', padding: '0 8px', lineHeight: 1.5 }}>{bodyComp.summary}</p>

          {/* Ratios */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'left' }}>
            <div style={{ padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 500 }}>Waist-to-Height</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>{bodyComp.whtr}</div>
            </div>
            <div style={{ padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 500 }}>Waist-to-Hip</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>{bodyComp.whr}</div>
            </div>
          </div>

          {/* BMI */}
          <div style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #E5E7EB', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 500 }}>Optional BMI</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>{bodyComp.bmi}</div>
            </div>
          </div>

          {/* Info box */}
          <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '12px', marginTop: '12px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Info size={12} /> BMI vs RFM</h4>
            <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.6 }}>
              <strong>BMI</strong> only compares weight to height. <strong>RFM</strong> uses waist circumference to estimate actual body fat %, giving a far more accurate picture of metabolic health.
            </p>
          </div>

          {/* Rescan button */}
          <button onClick={reset} style={{
            width: '100%', marginTop: '16px', padding: '12px', fontSize: '14px', fontWeight: 600,
            background: '#7C3AED', color: '#FFFFFF', border: 'none', borderRadius: '10px', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>Re-scan Bio-markers</button>
        </motion.div>
      </div>

      {/* ═══ Recommendations ═══ */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', marginBottom: '8px', color: '#111827', fontWeight: 600 }}>
            <ShieldCheck size={16} color="#7C3AED" /> Recommendations
          </h4>
          <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{bodyComp.suggestion}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <p style={{ textAlign: 'center', fontSize: '11px', color: '#9CA3AF', marginBottom: '20px', marginTop: '8px' }}>
        Disclaimer: These results are informational only and not a substitute for professional medical advice.
      </p>

      {/* ═══ Sleep & Weight Log ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
        <SleepTracker />
        <WeightLog />
      </div>
    </div>
  );
};

export default DashboardPage;
