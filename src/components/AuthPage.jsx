import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Zap, Leaf } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const { loginUser } = useStore();

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');

    const usersStr = localStorage.getItem('lgt_users');
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (isLogin) {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        loginUser({ name: user.name, email: user.email });
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirm) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      if (formData.password !== formData.confirm) {
        setError('Passwords do not match');
        return;
      }
      if (users.find(u => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      const newUser = { name: formData.name, email: formData.email, password: formData.password };
      users.push(newUser);
      localStorage.setItem('lgt_users', JSON.stringify(users));
      loginUser({ name: newUser.name, email: newUser.email });
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row'
    }}>
      {/* ═══ LEFT BRANDED PANEL ═══ */}
      <div style={{
        width: isMobile ? '100%' : '45%',
        background: 'var(--color-lavender)',
        borderRight: '4px solid var(--color-border)',
        padding: isMobile ? '40px 24px' : '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}>
        {/* Logo */}
        <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '48px' }}>
          <span style={{ color: 'var(--color-text-primary)' }}>Soul</span>
          <span style={{ color: 'var(--color-text-primary)', opacity: 0.5 }}>Fit</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: isMobile ? '28px' : '42px',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
          marginBottom: '24px',
          margin: '0 0 24px 0'
        }}>
          Your Body.<br />Your Data.<br />Your Protocol.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '15px',
          color: 'var(--color-text-primary)',
          fontWeight: 700,
          lineHeight: 1.7,
          marginBottom: '48px'
        }}>
          Precision bio-correction therapy engineered for your specific metabolic markers. Complete your assessment and unlock your personalized health protocol.
        </p>

        {/* Feature Rows */}
        {/* Row 1 - Shield */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <div style={{
              width: '16px', height: '18px',
              border: '2px solid var(--color-text-primary)',
              borderRadius: '4px 4px 8px 8px'
            }} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--color-text-primary)' }}>RFM Body Analysis</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 700 }}>Science-backed fat measurement beyond BMI.</div>
          </div>
        </div>

        {/* Row 2 - Zap */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <Zap size={16} color="var(--color-text-primary)" />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--color-text-primary)' }}>AI Exercise Protocol</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 700 }}>Personalized weekly plans for your fitness level.</div>
          </div>
        </div>

        {/* Row 3 - Leaf */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <Leaf size={16} color="var(--color-text-primary)" />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--color-text-primary)' }}>Molecular Nutrition</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 700 }}>Low-GI Indian meal plans with full macro tracking.</div>
          </div>
        </div>

        {/* Trust line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '32px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--color-success)', flexShrink: 0
          }} />
          <span style={{ fontSize: '12px', color: 'var(--color-text-primary)', fontWeight: 500, opacity: 0.9 }}>Trusted by 10,000+ users across India</span>
        </div>
      </div>

      {/* ═══ RIGHT FORM PANEL ═══ */}
      <div style={{
        width: isMobile ? '100%' : '55%',
        background: 'var(--color-bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '40px 24px' : '60px 48px',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          {/* Welcome heading */}
          <h2 style={{
            fontSize: '28px', fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '8px', marginTop: 0
          }}>Welcome back</h2>
          <p style={{
            fontSize: '14px', color: 'var(--color-text-primary)',
            fontWeight: 500,
            marginBottom: '32px', marginTop: 0
          }}>
            {isLogin ? 'Sign in to your health dashboard' : 'Create your free account'}
          </p>

          {/* Tab switcher */}
          <div style={{
            display: 'flex',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '32px'
          }}>
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: '9px',
                fontSize: '14px', fontWeight: 900, cursor: 'pointer',
                transition: 'all 0.2s',
                background: isLogin ? 'var(--color-lavender)' : 'transparent',
                color: 'var(--color-text-primary)',
                boxShadow: isLogin ? '2px 2px 0px #000000' : 'none',
                border: '2px solid var(--color-border)'
              }}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: '9px',
                fontSize: '14px', fontWeight: 900, cursor: 'pointer',
                transition: 'all 0.2s',
                background: !isLogin ? 'var(--color-lavender)' : 'transparent',
                color: 'var(--color-text-primary)',
                boxShadow: !isLogin ? '2px 2px 0px #000000' : 'none',
                border: '2px solid var(--color-border)'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth}>
            {!isLogin && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.8px', textTransform: 'uppercase',
                  color: 'var(--color-text-primary)', marginBottom: '8px'
                }}>Name</label>
                <div className="input-group">
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.8px', textTransform: 'uppercase',
                color: 'var(--color-text-primary)', marginBottom: '8px'
              }}>Email</label>
              <div className="input-group">
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.8px', textTransform: 'uppercase',
                color: 'var(--color-text-primary)', marginBottom: '8px'
              }}>Password</label>
              <div className="input-group">
                <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
              </div>
            </div>

            {!isLogin && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.8px', textTransform: 'uppercase',
                  color: 'var(--color-text-primary)', marginBottom: '8px'
                }}>Confirm Password</label>
                <div className="input-group">
                  <input type="password" value={formData.confirm} onChange={e => setFormData({ ...formData, confirm: e.target.value })} />
                </div>
              </div>
            )}

            {error && (
              <div style={{
                marginTop: '-12px', marginBottom: '8px',
                fontSize: '13px', color: 'var(--color-danger)',
                padding: '10px 14px',
                background: 'rgba(239,68,68,0.08)',
                borderRadius: '8px',
                borderLeft: '3px solid var(--color-danger)'
              }}>{error}</div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%', marginTop: '8px', height: '52px',
                fontSize: '15px', fontWeight: 700, borderRadius: '12px'
              }}
            >
              {isLogin ? 'Login to Dashboard' : 'Create Account'}
            </button>
          </form>

          {/* Switch link */}
          <div style={{
            fontSize: '13px', color: 'var(--color-text-tertiary)',
            textAlign: 'center', marginTop: '20px'
          }}>
            {isLogin ? (
              <>Don't have an account?{' '}
                <span
                  onClick={() => { setIsLogin(false); setError(''); }}
                  style={{ color: 'var(--color-accent-primary)', cursor: 'pointer', fontWeight: 600 }}
                >Sign up free</span>
              </>
            ) : (
              <>Already have an account?{' '}
                <span
                  onClick={() => { setIsLogin(true); setError(''); }}
                  style={{ color: 'var(--color-accent-primary)', cursor: 'pointer', fontWeight: 600 }}
                >Sign in</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
