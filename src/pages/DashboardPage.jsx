import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import WeeklySchedule from '../components/WeeklySchedule';
import { ShieldCheck, Info } from 'lucide-react';

const DashboardPage = () => {
  const { bodyComp, assessment, reset } = useStore();
  const [totalCompleted, setTotalCompleted] = useState(0);

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
    ringColor = 'var(--color-accent-bright)';
    statusText = `${deficit.toFixed(1)}% below healthy minimum`;
    statusColor = 'var(--color-accent-bright)';
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

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      {/* ═══ HEADER: Quote of the Day ═══ */}
      <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '28px 32px', textAlign: 'center', marginBottom: '48px' }}>
        <h4 style={{ color: 'var(--color-accent-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', fontWeight: 600 }}>Quote of the Day</h4>
        <p style={{ fontSize: '22px', color: 'var(--color-text-primary)', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.5 }}>"{quoteOfDay}"</p>
      </div>

      {/* ═══ TOP SECTION: RFM Sidebar + Exercise Protocol ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', marginBottom: '48px', alignItems: 'start' }}>
        {/* LEFT: Profile Sidebar (sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '120px' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 24px' }}>
              <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="100" cy="100" r={radius} fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <motion.circle cx="100" cy="100" r={radius} fill="transparent" stroke={ringColor} strokeWidth="10" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 2, ease: "easeOut" }} strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: ringColor, lineHeight: 1 }}>{bodyComp.rfm}%</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '4px', fontWeight: 500 }}>RFM Index</div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Desirable: {healthyMin}–{healthyMax}%</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: statusColor, marginBottom: '16px' }}>{statusText}</div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: ringColor }}>{bodyComp.fitnessClass || 'Assessment Complete'}</h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px', padding: '0 10px', lineHeight: 1.5 }}>{bodyComp.summary}</p>

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

            <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '16px', marginTop: '16px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-accent-bright)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={14} /> BMI vs RFM</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                <strong>BMI</strong> only compares weight to height — it can't distinguish muscle from fat. <strong>RFM</strong> uses waist circumference to estimate actual body fat %, giving a far more accurate picture of metabolic health.
              </p>
            </div>

            <button className="btn-outline" onClick={reset} style={{ width: '100%', marginTop: '20px' }}>Re-scan Bio-markers</button>
          </motion.div>

          <motion.div style={{ padding: '24px', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-accent-primary)', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '17px', marginBottom: '12px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
              <ShieldCheck size={20} color="var(--color-accent-primary)" /> Recommendations
            </h4>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{bodyComp.suggestion}</p>
          </motion.div>
          <p className="caption-text" style={{ textAlign: 'center', marginTop: '-8px' }}>Disclaimer: These results are informational only and not a substitute for professional medical advice.</p>
        </div>

        {/* RIGHT: Exercise Protocol */}
        <WeeklySchedule onCompletionChange={setTotalCompleted} />
      </div>
    </div>
  );
};

export default DashboardPage;
