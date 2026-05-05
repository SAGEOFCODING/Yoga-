import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Brain, Fingerprint, UserCircle } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'relative' }}>

      {/* ═══ FULLSCREEN HERO VIDEO — edge-to-edge ═══ */}
      <section
        id="hero-video-section"
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            zIndex: 1,
          }}
        />

        {/* Centered tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: isMobile ? '0 24px' : '0 64px',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              color: '#FFFFFF',
              fontWeight: 800,
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              marginBottom: '20px',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            We are fit from soul
          </h1>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Your personalized fitness journey starts here
          </p>
        </motion.div>
      </section>

      {/* ═══ MAIN CONTENT SECTION ═══ */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '80px 24px 100px' : '100px 64px 100px' }}>
        {/* Top text — centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
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
            <Fingerprint size={16} color="var(--color-emerald)" />
            Precision Bio-Correction Protocol v3.0
          </motion.div>

          <h1 style={{ fontSize: isMobile ? '48px' : '80px', lineHeight: 0.95, marginBottom: '32px', letterSpacing: '-2px', color: 'var(--color-text-primary)', fontWeight: 800 }}>
            STOP <span style={{ color: 'var(--color-accent-primary)' }}>GUESSING.</span><br />
            START <span style={{ opacity: 0.2 }}>CORRECTING.</span>
          </h1>

          <p style={{ fontSize: '18px', color: 'var(--color-text-primary)', fontWeight: 500, maxWidth: '580px', margin: '0 auto 48px', lineHeight: 1.6 }}>
            Identify hidden physiological risks and unlock a <strong style={{ color: 'var(--color-accent-primary)' }}>"SoulFit"</strong> therapy plan 
            engineered for your specific metabolic markers.
          </p>

          {/* ═══ CTA with UserCircle icon ═══ */}
          <button
            id="cta-step-forward"
            onClick={onStart}
            style={{
              background: 'rgba(139, 92, 246, 0.07)',
              border: '1.5px solid rgba(139, 92, 246, 0.35)',
              borderRadius: '20px',
              padding: '28px 48px',
              fontSize: '1.15rem',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              lineHeight: 1.4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.14)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.07)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.35)';
            }}
          >
            <UserCircle width={20} height={20} stroke="#7C3AED" />
            Let's take a step forward toward fitness
          </button>
        </motion.div>

        {/* ═══ FEATURES — centered, no box ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}
        >
          {[
            { icon: <Shield />, title: "Predictive Logic", desc: "Real-time biomarker probability modeling." },
            { icon: <Activity />, title: "Locked-Gate Protocol", desc: "Scientific intensity restriction systems." },
            { icon: <Brain />, title: "Neural Nutrition", desc: "Low-glycemic cognitive metabolic fueling." }
          ].map((feat) => (
            <div key={feat.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '400px' }}>
              <div style={{ color: '#FFFFFF', padding: '16px', background: 'var(--color-accent-primary)', borderRadius: '16px', marginBottom: '12px' }}>
                {React.cloneElement(feat.icon, { size: 24 })}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)' }}>{feat.title}</h3>
              <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{feat.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <section id="specs-container" style={{ padding: '100px 0', background: 'rgba(122, 143, 92, 0.04)', borderTop: '1px solid var(--color-separator)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '1100px' }}>
          <h2 className="page-heading" style={{ marginBottom: '64px' }}>Technical Infrastructure</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
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
