import React, { useState } from 'react';
import { Moon, Activity, CheckCircle2, TrendingUp } from 'lucide-react';

const CARD = { background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' };
const PILL = (active) => ({ border: 'none', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: active ? 'var(--color-accent-primary)' : 'var(--color-bg-elevated)', color: active ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)', transition: 'all 0.15s ease' });

const WeightLogCard = () => {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState([]);
  const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const handleLog = (e) => {
    e.preventDefault();
    if (!input) return;
    const val = parseFloat(input);
    setEntries(prev => [...prev.slice(-6), { val, day: DAYS[new Date().getDay()] }]);
    setInput('');
  };

  const last7 = entries.slice(-7);
  const vals = last7.map(e => e.val);
  const minV = vals.length ? Math.min(...vals) - 1 : 0;
  const maxV = vals.length ? Math.max(...vals) + 1 : 1;
  const range = maxV - minV || 1;
  const W = 240, H = 80, PAD = 10;

  const points = last7.map((e, i) => {
    const x = PAD + (i / Math.max(last7.length - 1, 1)) * (W - 2 * PAD);
    const y = H - PAD - ((e.val - minV) / range) * (H - 2 * PAD);
    return { x, y, val: e.val, day: e.day };
  });
  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');

  let trend = '→ Stable', trendColor = 'var(--color-text-secondary)';
  if (vals.length >= 2) {
    const diff = vals[vals.length - 1] - vals[0];
    if (diff < -0.2) { trend = `↓ ${Math.abs(diff).toFixed(1)}kg this week`; trendColor = 'var(--color-success)'; }
    else if (diff > 0.2) { trend = `↑ ${diff.toFixed(1)}kg this week`; trendColor = 'var(--color-warning)'; }
  }

  return (
    <div style={CARD}>
      <h4 style={{ color: 'var(--color-text-primary)', fontSize: '16px', marginBottom: '4px' }}>⚖️ Weight Log</h4>
      <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>Track weekly weight trend</p>
      <form onSubmit={handleLog} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <input type="number" step="0.1" min="20" max="300" value={input} onChange={e => setInput(e.target.value)} placeholder="Today's weight (kg)" style={{ flex: 1, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--color-text-primary)', outline: 'none' }} />
        <button type="submit" style={{ ...PILL(true), padding: '10px 16px' }}>Log</button>
      </form>
      {last7.length >= 2 && (
        <>
          <svg width={W} height={H} style={{ display: 'block', margin: '0 auto 8px' }}>
            <polyline points={polyline} fill="none" stroke="var(--color-accent-bright)" strokeWidth="2" strokeLinejoin="round" />
            {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--color-accent-bright)" />)}
            {points.map((p, i) => <text key={`l${i}`} x={p.x} y={H - 1} textAnchor="middle" fontSize="9" fill="var(--color-text-tertiary)">{p.day}</text>)}
          </svg>
          <div style={{ fontSize: '13px', fontWeight: 600, color: trendColor, textAlign: 'center' }}>{trend}</div>
        </>
      )}
      {last7.length < 2 && <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>Log at least 2 entries to see trend</div>}
    </div>
  );
};

const RecoveryPage = () => {
  const [sleep, setSleep] = useState('');
  const [isSleepLogged, setIsSleepLogged] = useState(false);

  const handleSleepLog = (e) => {
    e.preventDefault();
    if(sleep) setIsSleepLogged(true);
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '48px' }}>
        
        {/* Sleep Tracker */}
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ color: 'var(--color-text-primary)', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}><Moon size={24} color="#8b5cf6" /> Sleep Recovery</h4>
          </div>
          {!isSleepLogged ? (
            <form onSubmit={handleSleepLog} style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <input 
                type="number" min="0" max="24" step="0.5" required
                value={sleep} onChange={(e) => setSleep(e.target.value)}
                placeholder="Hours slept last night" 
                style={{ width: '100%', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', color: 'var(--color-text-primary)', outline: 'none', fontSize: '16px' }} 
              />
              <button type="submit" style={{ background: 'var(--color-accent-primary)', color: 'var(--color-bg-primary)', border: 'none', borderRadius: '12px', padding: '16px', fontWeight: 600, cursor: 'pointer', fontSize: '16px' }}>Log Sleep</button>
            </form>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--color-bg-elevated)', padding: '24px', borderRadius: '16px' }}>
              {parseFloat(sleep) >= 7 ? (
                <CheckCircle2 size={32} color="var(--color-success)" />
              ) : (
                <Activity size={32} color="var(--color-warning)" />
              )}
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{sleep} hrs logged</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                  {parseFloat(sleep) >= 7 ? 'Optimal recovery achieved.' : 'Aim for 7-8 hours for better recovery.'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Weight Log */}
        <WeightLogCard />

      </div>

      {/* Weekly Progress Summary */}
      <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <h4 style={{ color: 'var(--color-text-primary)', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}><TrendingUp size={24} color="var(--color-accent-secondary)" /> Weekly Progress Summary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'var(--color-bg-elevated)', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-accent-primary)' }}>1,450</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 600, marginTop: '8px' }}>Calories Burned</div>
          </div>
          <div style={{ background: 'var(--color-bg-elevated)', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-success)' }}>0</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 600, marginTop: '8px' }}>Exercises Completed</div>
          </div>
          <div style={{ background: 'var(--color-bg-elevated)', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#8b5cf6' }}>{sleep || '0'} hrs</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 600, marginTop: '8px' }}>Average Sleep</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RecoveryPage;
