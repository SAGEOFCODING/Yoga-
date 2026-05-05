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
    <div style={{ maxWidth: isMobile ? '480px' : '900px', margin: '0 auto', padding: isMobile ? '80px 16px 40px' : '100px 32px 64px' }}>

      {/* ═══ Quote of the Day ═══ */}
      <div style={{ background: 'var(--color-yellow, #FEF3C7)', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '14px 16px', textAlign: 'center', marginBottom: '16px' }}>
        <h4 style={{ color: '#111827', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', fontWeight: 700 }}>Daily Bio-Correction Wisdom</h4>
        <p style={{ fontSize: '15px', color: '#374151', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.5 }}>"{quoteOfDay}"</p>
      </div>

      {/* ═══ Quick Wellness Tips ═══ */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ color: '#111827', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px', fontWeight: 700 }}>Quick Wellness Tips</h4>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
          {dailyTips.map((tip, i) => {
            let IconComponent = Brain;
            if (tip.icon === 'Wind') IconComponent = Wind;
            if (tip.icon === 'Zap') IconComponent = Zap;

            const bgColors = ['var(--color-pink, #FCE7F3)', 'var(--color-green, #D1FAE5)', 'var(--color-blue, #DBEAFE)'];

            return (
              <div key={i} style={{ padding: '16px', background: bgColors[i % 3], border: '1px solid #E5E7EB', borderRadius: '14px' }}>
                <IconComponent size={18} color="#111827" />
                <h5 style={{ color: '#111827', fontSize: '14px', marginBottom: '4px', marginTop: '10px', fontWeight: 700 }}>{tip.title}</h5>
                <p style={{ color: '#374151', fontWeight: 500, fontSize: '13px', lineHeight: 1.5 }}>{tip.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ RFM Body Composition Card (Expanded on Desktop) ═══ */}
      <div style={{ marginBottom: '24px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{
          background: '#FFFFFF', border: '1px solid #E5E7EB',
          borderRadius: '20px', padding: isMobile ? '24px' : '40px', overflow: 'hidden',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '24px' : '48px', alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          {/* Left Side: Ring */}
          <div style={{ flexShrink: 0, width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '16px' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
                <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#F3F4F6" strokeWidth="10" />
                <motion.circle cx="100" cy="100" r={radius} fill="transparent" stroke="#7C3AED" strokeWidth="12" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 2, ease: "easeOut" }} strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: ringColor, lineHeight: 1 }}>{bodyComp.rfm}%</div>
                <div style={{ fontSize: '10px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px', fontWeight: 600 }}>RFM Index</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px', fontWeight: 500 }}>Desirable: {healthyMin}–{healthyMax}%</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: statusColor }}>{statusText}</div>
          </div>

          {/* Right Side: Stats */}
          <div style={{ flex: 1, width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: ringColor }}>{bodyComp.fitnessClass || 'Assessment Complete'}</h2>
            <p style={{ fontSize: '15px', color: '#374151', fontWeight: 400, marginBottom: '24px', lineHeight: 1.6 }}>{bodyComp.summary}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'left', marginBottom: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '14px', border: '1px solid #E5E7EB', background: '#F9FAFB' }}>
                <div style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', fontWeight: 600 }}>Waist-to-Height</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827' }}>{bodyComp.whtr}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: '14px', border: '1px solid #E5E7EB', background: '#F9FAFB' }}>
                <div style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', fontWeight: 600 }}>Waist-to-Hip</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827' }}>{bodyComp.whr}</div>
              </div>
            </div>

            <div style={{ padding: '16px 20px', borderRadius: '14px', border: '1px solid #E5E7EB', background: '#F9FAFB', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 600 }}>Optional BMI</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827' }}>{bodyComp.bmi}</div>
              </div>
            </div>

            <div style={{ background: '#F3F4F6', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={14} /> BMI vs RFM</h4>
              <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6 }}>
                <strong>BMI</strong> only compares weight to height. <strong>RFM</strong> uses waist circumference to estimate actual body fat %, giving a far more accurate picture of metabolic health.
              </p>
            </div>

            <button onClick={reset} style={{
              width: '100%', padding: '16px', fontSize: '16px', fontWeight: 600,
              background: '#7C3AED', color: '#FFFFFF', border: 'none', borderRadius: '12px', cursor: 'pointer',
              transition: 'background 0.2s ease', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
            }}>Re-scan Bio-markers</button>
          </div>
        </motion.div>
      </div>

      {/* ═══ Recommendations ═══ */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ padding: '24px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', marginBottom: '12px', color: '#111827', fontWeight: 700 }}>
            <ShieldCheck size={20} color="#7C3AED" /> Recommendations
          </h4>
          <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.6 }}>{bodyComp.suggestion}</p>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#9CA3AF', marginBottom: '32px' }}>
        Disclaimer: These results are informational only and not a substitute for professional medical advice.
      </p>

      {/* ═══ Sleep & Weight Log ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
        <SleepTracker />
        <WeightLog />
      </div>
    </div>
  );
};

export default DashboardPage;
