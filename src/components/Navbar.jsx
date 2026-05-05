import React from 'react';
import { useStore } from '../store/useStore';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const { isAssessed, reset, activePage, setActivePage, softReset, currentUser, logoutUser } = useStore();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      softReset();
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const NavLink = ({ page, label }) => (
    <button 
      onClick={() => setActivePage(page)}
      style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: activePage === page ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        fontWeight: activePage === page ? 700 : 500,
        borderBottom: activePage === page ? '2px solid var(--color-accent-primary)' : '2px solid transparent',
        padding: '22px 4px 18px', fontSize: '14px', transition: 'all 0.2s ease',
        textTransform: 'uppercase', letterSpacing: '0.5px'
      }}
    >
      {label}
    </button>
  );

  return (
    <nav 
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '64px', padding: '0 32px',
        background: 'var(--color-bg-glass)',
        backdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={reset}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>
          <span style={{ color: 'var(--color-text-primary)' }}>LOCKED</span>
          <span style={{ color: 'var(--color-emerald)' }}>GATE</span>
        </span>
      </div>

      {isAssessed && (
        <div style={{ display: 'flex', gap: '32px', height: '64px' }}>
          <NavLink page="dashboard" label="Dashboard" />
          <NavLink page="meditation" label="Meditation" />
          <NavLink page="nutrition" label="Nutrition" />
          <NavLink page="exercise" label="Exercise" />
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '100px', padding: '6px 14px 6px 6px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'var(--color-bg-primary)' }}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {currentUser?.name}
          </span>
        </div>
        <button className="btn-primary" onClick={isAssessed ? reset : () => setStep(1)}
          style={{ padding: '8px 16px', height: 'auto', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
          {isAssessed ? 'New Analysis' : 'Initialize'}
        </button>
        <button onClick={logoutUser}
          style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
