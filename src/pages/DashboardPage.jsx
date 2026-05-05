import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import SleepTracker from '../components/SleepTracker';
import WeightLog from '../components/WeightLog';
import { ShieldCheck, Info, Brain, Wind, Zap } from 'lucide-react';

const DashboardPage = () => {
  const { bodyComp, assessment, reset } = useStore();

  const gender = assessment.gender;
  const rfmVal = parseFloat(bodyComp.rfm) || 0;

  const healthyMin = gender === 'male' ? 10 : 18;
  const healthyMax = gender === 'male' ? 20 : 28;

  let ringFill = 0, ringColor = 'var(--color-success)', statusText = 'Within healthy range ✓', statusColor = 'var(--color-success)';

  if (rfmVal >= healthyMin && rfmVal <= healthyMax) {
    ringFill = 100;
  } else if (rfmVal > healthyMax) {
    const excess = rfmVal - healthyMax;
    ringFill = Math.min(100, (excess / 20) * 100);
    ringColor = excess > 10 ? 'var(--color-danger)' : 'var(--color-warning)';
    statusText = `${excess.toFixed(1)}% above target`;
    statusColor = ringColor;
  } else {
    const deficit = healthyMin - rfmVal;
    ringFill = Math.min(100, (deficit / 10) * 100);
    ringColor = 'var(--color-accent-lavender)';
    statusText = `${deficit.toFixed(1)}% below healthy minimum`;
    statusColor = 'var(--color-accent-lavender)';
  }

  const radius = 70;
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
    { icon: 'Wind', title: 'Box Breathing', body: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s. Repeat 4x to instantly calm your nervous system.' },
    { icon: 'Zap', title: 'Cold Water Reset', body: 'Splash cold water on your face and wrists to trigger the dive reflex and lower heart rate in 30 seconds.' },
    { icon: 'Brain', title: '5-4-3-2-1 Grounding', body: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Stops anxiety spirals instantly.' },
    { icon: 'Wind', title: 'Progressive Relaxation', body: 'Tense each muscle group for 5s then release, starting from toes to head. Melts physical tension.' },
    { icon: 'Zap', title: 'Anger Exit Rule', body: 'Remove yourself from the trigger for 90 seconds — that is how long a cortisol spike lasts in your bloodstream.' },
    { icon: 'Brain', title: 'Hum to Calm Down', body: 'Hum any tune for 2 minutes to activate the vagus nerve and reduce stress hormones naturally.' },
    { icon: 'Wind', title: '2-Minute Overwhelm Rule', body: 'If a task takes less than 2 minutes, do it now. Clears mental load and reduces background anxiety.' },
  ];

  const todayIndex = new Date().getDay();
  const dailyTips = [
    WELLNESS_TIPS[todayIndex % WELLNESS_TIPS.length],
    WELLNESS_TIPS[(todayIndex + 1) % WELLNESS_TIPS.length],
    WELLNESS_TIPS[(todayIndex + 2) % WELLNESS_TIPS.length],
  ];

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      {/* ═══ HEADER: Quote of the Day ═══ */}
      <div style={{ background: 'var(--color-bg-secondary)', border: '2px solid var(--color-emerald)', borderRadius: 'var(--radius-md)', padding: '28px 32px', textAlign: 'center', marginBottom: '48px', boxShadow: 'var(--shadow-md)' }}>
        <h4 style={{ color: 'var(--color-emerald)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', fontWeight: 600 }}>Daily Bio-Correction Wisdom</h4>
        <p style={{ fontSize: '22px', color: 'var(--color-text-primary)', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.5 }}>"{quoteOfDay}"</p>
      </div>

      {/* ═══ WELLNESS TIPS ═══ */}
      <div style={{ marginBottom: '48px' }}>
        <h4 style={{ color: 'var(--color-text-primary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', fontWeight: 700 }}>Quick Wellness Tips</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {dailyTips.map((tip, i) => {
            let IconComponent = Brain;
            if (tip.icon === 'Wind') IconComponent = Wind;
            if (tip.icon === 'Zap') IconComponent = Zap;

            const accentColors = ['var(--color-emerald)', 'var(--color-teal)', 'var(--color-emerald)'];
            const textAccents = ['var(--color-teal)', 'var(--color-teal)', 'var(--color-teal)'];
            const currentAccent = accentColors[i % 3];

            return (
              <div key={i} className="glass-card-full" style={{ padding: '24px', borderLeft: `6px solid ${currentAccent}`, borderRadius: '16px' }}>
                <IconComponent size={20} color={currentAccent} />
                <h5 style={{ color: textAccents[i % 3], fontSize: '15px', marginBottom: '8px', marginTop: '10px', fontWeight: 700 }}>{tip.title}</h5>
                <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '13px', lineHeight: 1.6 }}>{tip.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ RFM BODY COMPOSITION CARD ═══ */}
      <div style={{ maxWidth: '480px', margin: '0 auto 32px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 24px' }}>
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r={radius} fill="transparent" stroke="rgba(0,0,0,0.06)" strokeWidth="10" />
              <motion.circle cx="100" cy="100" r={radius} fill="transparent" stroke="var(--color-accent-dashboard)" strokeWidth="10" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 2, ease: "easeOut" }} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: ringColor, lineHeight: 1 }}>{bodyComp.rfm}%</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '4px', fontWeight: 500 }}>RFM Index</div>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Desirable: {healthyMin}–{healthyMax}%</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: statusColor, marginBottom: '16px' }}>{statusText}</div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: ringColor }}>{bodyComp.fitnessClass || 'Assessment Complete'}</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontWeight: 500, marginBottom: '24px', padding: '0 10px', lineHeight: 1.5 }}>{bodyComp.summary}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
            <div style={{ padding: '14px 16px', background: 'var(--color-bg-elevated)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 500 }}>Waist-to-Height Ratio</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{bodyComp.whtr}</div>
            </div>
            <div style={{ padding: '14px 16px', background: 'var(--color-bg-elevated)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 500 }}>Waist-to-Hip Ratio</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{bodyComp.whr}</div>
            </div>
            <div style={{ padding: '14px 16px', background: 'var(--color-bg-elevated)', borderRadius: '14px', border: '1px solid var(--color-border)', gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 500 }}>Optional BMI</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{bodyComp.bmi}</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-emerald)', borderRadius: '14px', padding: '16px', marginTop: '16px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-teal)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={14} /> BMI vs RFM</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--color-emerald)' }}>BMI</strong> only compares weight to height. <strong style={{ color: 'var(--color-teal)' }}>RFM</strong> uses waist circumference to estimate actual body fat %, giving a far more accurate picture of metabolic health.
            </p>
          </div>

          <button className="btn-primary" onClick={reset} style={{ width: '100%', marginTop: '20px' }}>Re-scan Bio-markers</button>
        </motion.div>
      </div>

      {/* ═══ RECOMMENDATIONS CARD ═══ */}
      <div style={{ maxWidth: '480px', margin: '0 auto 16px' }}>
        <motion.div style={{ padding: '24px', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-accent-primary)', borderRadius: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '17px', marginBottom: '12px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
            <ShieldCheck size={20} color="var(--color-accent-primary)" /> Recommendations
          </h4>
          <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{bodyComp.suggestion}</p>
        </motion.div>
      </div>

      {/* ═══ DISCLAIMER ═══ */}
      <p className="caption-text" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 48px' }}>Disclaimer: These results are informational only and not a substitute for professional medical advice.</p>

      {/* ═══ SLEEP & WEIGHT LOG ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <SleepTracker />
        <WeightLog />
      </div>
    </div>
  );
};

export default DashboardPage;
