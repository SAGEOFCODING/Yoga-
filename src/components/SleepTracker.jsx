import React, { useState } from 'react';
import { Moon, Activity, CheckCircle2 } from 'lucide-react';

const SleepTracker = () => {
  const [sleep, setSleep] = useState('');
  const [isSleepLogged, setIsSleepLogged] = useState(false);

  const handleSleepLog = (e) => {
    e.preventDefault();
    if(sleep) setIsSleepLogged(true);
  };

  return (
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
  );
};

export default SleepTracker;
