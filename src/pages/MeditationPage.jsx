import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const SOUND_THEMES = [
  { id: 'rain', label: 'Rain', emoji: '🌧️' },
  { id: 'ocean', label: 'Ocean', emoji: '🌊' },
  { id: 'forest', label: 'Forest', emoji: '🌿' },
  { id: 'bowl', label: 'Bowl', emoji: '🔔' },
  { id: 'silent', label: 'Silent', emoji: '🤫' },
];

const createNoiseSource = (ctx) => {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  return src;
};

const MeditationPage = () => {
  const durations = [5, 10, 15, 20];
  const [selectedMin, setSelectedMin] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [soundTheme, setSoundTheme] = useState('rain');
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const droneRef = useRef(null);
  const totalSeconds = selectedMin * 60;

  const getAudioCtx = () => {
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  const playBowl = () => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 3);
    } catch(e) {}
  };

  const buildRain = (ctx, master) => {
    const noise = createNoiseSource(ctx);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.setValueAtTime(800, ctx.currentTime);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.setValueAtTime(200, ctx.currentTime);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.6, ctx.currentTime);
    noise.connect(hp).connect(lp).connect(g).connect(master);
    noise.start();
    const noise2 = createNoiseSource(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.setValueAtTime(3000, ctx.currentTime); bp.Q.setValueAtTime(0.5, ctx.currentTime);
    const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.08, ctx.currentTime);
    noise2.connect(bp).connect(g2).connect(master);
    noise2.start();
    return [noise, noise2];
  };

  const buildOcean = (ctx, master) => {
    const noise = createNoiseSource(ctx);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.setValueAtTime(500, ctx.currentTime);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.7, ctx.currentTime);
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
    const lfoG = ctx.createGain(); lfoG.gain.setValueAtTime(300, ctx.currentTime);
    lfo.connect(lfoG).connect(lp.frequency);
    lfo.start();
    noise.connect(lp).connect(g).connect(master);
    noise.start();
    const sub = ctx.createOscillator(); sub.type = 'sine'; sub.frequency.setValueAtTime(55, ctx.currentTime);
    const sg = ctx.createGain(); sg.gain.setValueAtTime(0.06, ctx.currentTime);
    sub.connect(sg).connect(master); sub.start();
    return [noise, lfo, sub];
  };

  const buildForest = (ctx, master) => {
    const wind = createNoiseSource(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.setValueAtTime(400, ctx.currentTime); bp.Q.setValueAtTime(0.3, ctx.currentTime);
    const wg = ctx.createGain(); wg.gain.setValueAtTime(0.25, ctx.currentTime);
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const lfoG = ctx.createGain(); lfoG.gain.setValueAtTime(150, ctx.currentTime);
    lfo.connect(lfoG).connect(bp.frequency); lfo.start();
    wind.connect(bp).connect(wg).connect(master); wind.start();
    const nodes = [wind, lfo];
    const chirpLoop = () => {
      if (!droneRef.current) return;
      try {
        const o = ctx.createOscillator(); o.type = 'sine';
        const freq = 2000 + Math.random() * 2000;
        o.frequency.setValueAtTime(freq, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + 0.08);
        o.frequency.exponentialRampToValueAtTime(freq * 0.9, ctx.currentTime + 0.15);
        const cg = ctx.createGain();
        cg.gain.setValueAtTime(0.06, ctx.currentTime);
        cg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        o.connect(cg).connect(master); o.start(); o.stop(ctx.currentTime + 0.3);
      } catch(e) {}
      setTimeout(chirpLoop, 2000 + Math.random() * 5000);
    };
    setTimeout(chirpLoop, 1000);
    return nodes;
  };

  const buildBowlDrone = (ctx, master) => {
    const osc1 = ctx.createOscillator(); osc1.type = 'sine'; osc1.frequency.setValueAtTime(174, ctx.currentTime);
    const g1 = ctx.createGain(); g1.gain.setValueAtTime(0.5, ctx.currentTime);
    osc1.connect(g1).connect(master); osc1.start();
    const osc2 = ctx.createOscillator(); osc2.type = 'sine'; osc2.frequency.setValueAtTime(180, ctx.currentTime);
    const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.4, ctx.currentTime);
    osc2.connect(g2).connect(master); osc2.start();
    const osc3 = ctx.createOscillator(); osc3.type = 'sine'; osc3.frequency.setValueAtTime(528, ctx.currentTime);
    const g3 = ctx.createGain(); g3.gain.setValueAtTime(0.08, ctx.currentTime);
    osc3.connect(g3).connect(master); osc3.start();
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
    const lg = ctx.createGain(); lg.gain.setValueAtTime(0.03, ctx.currentTime);
    lfo.connect(lg).connect(master.gain); lfo.start();
    return [osc1, osc2, osc3, lfo];
  };

  const startDrone = (theme) => {
    stopDrone();
    if (theme === 'silent') return;
    try {
      const ctx = getAudioCtx();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.15, ctx.currentTime);
      master.connect(ctx.destination);
      let nodes = [];
      if (theme === 'rain') nodes = buildRain(ctx, master);
      else if (theme === 'ocean') nodes = buildOcean(ctx, master);
      else if (theme === 'forest') nodes = buildForest(ctx, master);
      else if (theme === 'bowl') nodes = buildBowlDrone(ctx, master);
      droneRef.current = { nodes, master };
    } catch(e) {}
  };

  const stopDrone = () => {
    try {
      if (droneRef.current) {
        const ctx = getAudioCtx();
        droneRef.current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        droneRef.current.nodes.forEach(n => { try { n.stop(ctx.currentTime + 1.6); } catch(e) {} });
        droneRef.current = null;
      }
    } catch(e) {}
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsComplete(true);
            stopDrone();
            playBowl();
            setTimeout(() => {
              setIsComplete(false);
              setTimeLeft(selectedMin * 60);
            }, 3000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, selectedMin]);

  const handleDurationChange = (min) => {
    clearInterval(intervalRef.current);
    stopDrone();
    setSelectedMin(min);
    setTimeLeft(min * 60);
    setIsRunning(false);
    setIsComplete(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    stopDrone();
    setTimeLeft(selectedMin * 60);
    setIsRunning(false);
    setIsComplete(false);
  };

  const handleToggle = () => {
    if (isRunning) {
      stopDrone();
      setIsRunning(false);
    } else {
      startDrone(soundTheme);
      playBowl();
      setIsRunning(true);
    }
  };

  const handleSoundChange = (id) => {
    setSoundTheme(id);
    if (isRunning) {
      stopDrone();
      setTimeout(() => startDrone(id), 200);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - (timeLeft / totalSeconds);
  const ringRadius = 80;
  const ringCircum = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircum - (progress * ringCircum);

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '24px', padding: '48px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', gap: '48px', alignItems: 'center' }}>
        
        {/* Left column: controls */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ color: 'var(--color-text-primary)', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Timer size={28} color="var(--color-accent-primary)" /> Meditation Timer
          </h4>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontWeight: 600 }}>Ambient Sound</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {SOUND_THEMES.map(t => (
                <button key={t.id} onClick={() => handleSoundChange(t.id)} style={{
                  flex: 1, padding: '12px 4px', borderRadius: '12px', cursor: 'pointer',
                  fontSize: '12px', fontWeight: soundTheme === t.id ? 600 : 500, transition: 'all 0.2s ease',
                  background: soundTheme === t.id ? 'var(--color-accent-primary)' : 'var(--color-bg-elevated)',
                  color: soundTheme === t.id ? 'var(--color-bg-primary)' : 'var(--color-text-tertiary)',
                  border: soundTheme === t.id ? 'none' : '1px solid var(--color-border)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
                }}>
                  <span style={{ fontSize: '24px' }}>{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', background: 'var(--color-bg-elevated)', borderRadius: '16px', padding: '6px', border: '1px solid var(--color-border)' }}>
            {durations.map(d => (
              <button key={d} onClick={() => handleDurationChange(d)} style={{
                flex: 1, padding: '12px 0', border: 'none', borderRadius: '12px', cursor: 'pointer',
                fontSize: '14px', fontWeight: selectedMin === d ? 600 : 500, transition: 'all 0.2s ease',
                background: selectedMin === d ? 'var(--color-accent-primary)' : 'transparent',
                color: selectedMin === d ? 'var(--color-bg-primary)' : 'var(--color-text-tertiary)',
                boxShadow: selectedMin === d ? '0 2px 8px rgba(0,0,0,0.25)' : 'none'
              }}>
                {d} min
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={handleToggle} disabled={isComplete} style={{
              flex: 2,
              background: 'var(--color-accent-primary)', color: 'var(--color-bg-primary)', border: 'none',
              borderRadius: '12px', padding: '16px 24px', fontWeight: 700, fontSize: '16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease',
              opacity: isComplete ? 0.5 : 1
            }}>
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Start Session</>}
            </button>
            <button onClick={handleReset} style={{
              flex: 1,
              background: 'var(--color-bg-elevated)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)',
              borderRadius: '12px', padding: '16px 16px', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease'
            }}>
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>

        {/* Right column: countdown ring */}
        <div style={{ position: 'relative', width: '200px', height: '200px', flexShrink: 0 }}>
          <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="100" cy="100" r={ringRadius} fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
            <circle cx="100" cy="100" r={ringRadius} fill="transparent" stroke="var(--color-accent-primary)" strokeWidth="12" strokeDasharray={ringCircum} strokeDashoffset={ringOffset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            {isComplete ? (
              <div style={{ color: 'var(--color-success)', fontSize: '18px', fontWeight: 600 }}>Done ✓</div>
            ) : (
              <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--color-accent-light)', letterSpacing: '-2px', fontVariantNumeric: 'tabular-nums' }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationPage;
