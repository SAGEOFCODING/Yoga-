import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Activity, Brain, Fingerprint } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  const scrollToSpecs = () => {
    const specs = document.getElementById('specs-container');
    if (specs) specs.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className="container" style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', maxWidth: '1100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center', textAlign: 'left' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
                background: 'rgba(122, 143, 92, 0.1)', border: '1px solid rgba(122, 143, 92, 0.3)',
                color: 'var(--color-accent-bright)', padding: '0.6rem 1.2rem', borderRadius: '100px', 
                fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '32px'
              }}
            >
              <Fingerprint size={16} />
              Precision Bio-Correction Protocol v2.0
            </motion.div>

            <h1 style={{ fontSize: '80px', lineHeight: 0.95, marginBottom: '32px', letterSpacing: '-0.4px', color: 'var(--color-text-primary)' }}>
              STOP <span style={{ color: 'var(--color-accent-light)' }}>GUESSING.</span><br />
              START <span style={{ opacity: 0.5 }}>CORRECTING.</span>
            </h1>

            <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', maxWidth: '580px', marginBottom: '48px', lineHeight: 1.6 }}>
              Identify hidden physiological risks and unlock a <strong style={{ color: 'var(--color-text-primary)' }}>"Locked-Gate"</strong> therapy plan 
              engineered for your specific metabolic markers.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn-primary" onClick={onStart} style={{ padding: '16px 32px', height: 'auto', borderRadius: '12px', fontSize: '16px' }}>
                Initialize Analysis <ArrowRight size={20} />
              </button>
              <button className="btn-outline" onClick={scrollToSpecs} style={{ padding: '16px 32px', height: 'auto', borderRadius: '12px', fontSize: '16px' }}>Protocol Specs</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ position: 'relative' }}
          >
            <div className="glass-card-full" style={{ padding: '48px', borderStyle: 'dashed', borderColor: 'var(--color-border-active)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {[
                  { icon: <Shield />, title: "Predictive Logic", desc: "Real-time biomarker probability modeling." },
                  { icon: <Activity />, title: "Locked-Gate Protocol", desc: "Scientific intensity restriction systems." },
                  { icon: <Brain />, title: "Neural Nutrition", desc: "Low-glycemic cognitive metabolic fueling." }
                ].map((feat) => (
                  <div key={feat.title} style={{ display: 'flex', gap: '24px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--color-accent-light)', padding: '16px', background: 'var(--color-accent-primary)', borderRadius: '16px' }}>
                      {React.cloneElement(feat.icon, { size: 24 })}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--color-text-primary)' }}>{feat.title}</h3>
                      <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <section id="specs-container" style={{ padding: '100px 0', background: 'rgba(122, 143, 92, 0.04)', borderTop: '1px solid var(--color-separator)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '1100px' }}>
          <h2 className="page-heading" style={{ marginBottom: '64px' }}>Technical Infrastructure</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { title: "Risk Modeling", value: "Stochastic", desc: "Proprietary algorithms for systemic vulnerability detection." },
              { title: "Therapy Logic", value: "Corrective", desc: "Intensity-restricted sequences for endocrine safety." },
              { title: "Nutrition Engine", value: "Low GI", desc: "Molecularly targeted meal plans for insulin stabilization." }
            ].map(spec => (
              <div key={spec.title} className="glass-card-full" style={{ padding: '40px' }}>
                <div style={{ color: 'var(--color-accent-bright)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.8px' }}>{spec.value}</div>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--color-text-primary)' }}>{spec.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
