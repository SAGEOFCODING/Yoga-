import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import FoodProtocol from '../components/FoodProtocol';
import { Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

const CARD = { background: 'var(--color-bg-secondary)', border: '2px solid var(--color-accent-brown)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(208, 140, 96, 0.1)' };
const PILL = (active) => ({ border: 'none', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: active ? 'var(--color-accent-purple)' : 'var(--color-bg-elevated)', color: active ? '#FFFFFF' : 'var(--color-text-primary)', transition: 'all 0.15s ease' });

const ProteinCard = ({ bodyComp }) => {
  const [consumed, setConsumed] = useState(0);
  const weight = parseFloat(bodyComp?.weight) || 70;
  const goal = Math.round((weight * 1.6) / 5) * 5;
  const pct = Math.min((consumed / goal) * 100, 100);
  const barColor = pct >= 100 ? 'var(--color-accent-lime)' : pct >= 50 ? 'var(--color-accent-pink)' : 'var(--color-accent-brown)';
  return (
    <div style={CARD}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ color: 'var(--color-text-primary)', fontSize: '16px' }}>🥩 Protein Intake</h4>
        <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{consumed} / {goal}g</span>
      </div>
      <div style={{ background: 'var(--color-bg-elevated)', borderRadius: '8px', height: '12px', overflow: 'hidden', marginBottom: '8px' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: '8px', transition: 'width 0.3s ease' }} />
      </div>
      <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>{consumed}g consumed today</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[10,20,30,50].map(g => <button key={g} onClick={() => setConsumed(p => p + g)} style={PILL(false)}>+{g}g</button>)}
        <button onClick={() => setConsumed(0)} style={{ ...PILL(false), color: 'var(--color-text-tertiary)', fontSize: '11px' }}>Reset</button>
      </div>
    </div>
  );
};

const FastingCard = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [logged, setLogged] = useState(false);
  const [history, setHistory] = useState([]);

  const calcWindow = (f, l) => {
    if (!f || !l) return null;
    const [fh, fm] = f.split(':').map(Number);
    const [lh, lm] = l.split(':').map(Number);
    let diff = (lh * 60 + lm) - (fh * 60 + fm);
    if (diff < 0) diff += 1440;
    return diff;
  };

  const eatMins = calcWindow(first, last);
  const fastMins = eatMins != null ? 1440 - eatMins : null;
  const fmtTime = (m) => `${Math.floor(m/60)}h ${m%60}m`;

  let rating = '', ratingColor = '';
  if (eatMins != null) {
    const hrs = eatMins / 60;
    if (hrs < 8) { rating = 'Excellent'; ratingColor = 'var(--color-success)'; }
    else if (hrs <= 10) { rating = 'Good'; ratingColor = 'var(--color-accent-bright)'; }
    else if (hrs <= 12) { rating = 'Moderate'; ratingColor = 'var(--color-warning)'; }
    else { rating = 'Reduce eating window'; ratingColor = 'var(--color-danger)'; }
  }

  const handleLog = () => {
    if (eatMins != null) {
      setLogged(true);
      setHistory(prev => [{ eat: eatMins, fast: fastMins }, ...prev].slice(0, 3));
    }
  };

  return (
    <div style={CARD}>
      <h4 style={{ color: 'var(--color-text-primary)', fontSize: '16px', marginBottom: '4px' }}>⏱ Eating Window</h4>
      <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>Track your daily eating window</p>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: '4px' }}>First Meal</label>
          <input type="time" value={first} onChange={e => { setFirst(e.target.value); setLogged(false); }} style={{ width: '100%', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px', color: 'var(--color-text-primary)', outline: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: '4px' }}>Last Meal</label>
          <input type="time" value={last} onChange={e => { setLast(e.target.value); setLogged(false); }} style={{ width: '100%', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px', color: 'var(--color-text-primary)', outline: 'none' }} />
        </div>
      </div>
      {eatMins != null && (
        <div style={{ background: 'var(--color-bg-elevated)', borderRadius: '12px', padding: '12px 16px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Eating: <strong style={{ color: 'var(--color-text-primary)' }}>{fmtTime(eatMins)}</strong></span>
            <span style={{ color: 'var(--color-text-secondary)' }}>Fasting: <strong style={{ color: 'var(--color-text-primary)' }}>{fmtTime(fastMins)}</strong></span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: ratingColor, marginTop: '4px' }}>{rating}</div>
        </div>
      )}
      <button onClick={handleLog} disabled={eatMins == null} style={{ ...PILL(true), width: '100%', padding: '10px', opacity: eatMins == null ? 0.5 : 1 }}>Log Today</button>
      {history.length > 0 && (
        <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
          {history.map((h, i) => <div key={i} style={{ marginBottom: '2px' }}>Day {i+1} ago: {fmtTime(h.eat)} eating | {fmtTime(h.fast)} fasting</div>)}
        </div>
      )}
    </div>
  );
};

const FiberCard = () => {
  const [consumed, setConsumed] = useState(0);
  const goal = 30;
  const pct = Math.min((consumed / goal) * 100, 100);
  const barColor = pct >= 100 ? 'var(--color-success)' : pct >= 50 ? 'var(--color-accent-meals)' : 'var(--color-warning)';
  let tip = 'Eat more vegetables, legumes and whole grains';
  if (consumed >= 30) tip = 'Daily fiber goal achieved! ✓';
  else if (consumed >= 20) tip = 'Almost there! Keep it up';
  else if (consumed >= 10) tip = 'Good progress! Add more greens';

  return (
    <div style={CARD}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ color: 'var(--color-text-primary)', fontSize: '16px' }}>🌾 Fiber Intake</h4>
        <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{consumed} / {goal}g</span>
      </div>
      <div style={{ background: 'var(--color-bg-elevated)', borderRadius: '8px', height: '12px', overflow: 'hidden', marginBottom: '8px' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: '8px', transition: 'width 0.3s ease' }} />
      </div>
      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>{tip}</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[3,5,8,12].map(g => <button key={g} onClick={() => setConsumed(p => p + g)} style={PILL(false)}>+{g}g</button>)}
        <button onClick={() => setConsumed(0)} style={{ ...PILL(false), color: 'var(--color-text-tertiary)', fontSize: '11px' }}>Reset</button>
      </div>
    </div>
  );
};

const NutritionPage = () => {
  const { bodyComp } = useStore();
  const [water, setWater] = useState(0);

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <FoodProtocol />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '48px' }}>
        {/* Water Tracker */}
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ color: 'var(--color-text-primary)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Droplet size={18} color="#3b82f6" /> Hydration</h4>
            <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{water} / 8 Glasses</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', marginTop: '24px' }}>
            {[...Array(8)].map((_, i) => (
              <motion.div 
                whileTap={{ scale: 0.9 }}
                key={i} onClick={() => setWater(i + 1)} 
                style={{ 
                  cursor: 'pointer', flex: 1, aspectRatio: '1', borderRadius: '8px',
                  background: i < water ? '#3b82f6' : 'var(--color-bg-elevated)',
                  border: `1px solid ${i < water ? '#3b82f6' : 'var(--color-border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {i < water && <Droplet size={14} color="#fff" fill="#fff" />}
              </motion.div>
            ))}
          </div>
        </div>

        <ProteinCard bodyComp={bodyComp} />
        <FiberCard />
        <FastingCard />
      </div>
    </div>
  );
};

export default NutritionPage;
