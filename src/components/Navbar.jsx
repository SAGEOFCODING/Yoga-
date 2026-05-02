import React from 'react';
import { useStore } from '../store/useStore';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const { isAssessed, reset, activePage, setActivePage } = useStore();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      reset();
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
        background: 'rgba(13, 31, 34, 0.88)',
        backdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={reset}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>
          <span style={{ color: 'var(--color-text-primary)' }}>LOCKED</span>
          <span style={{ color: 'var(--color-accent-bright)' }}>GATE</span>
        </span>
      </div>

      {isAssessed ? (
        <div style={{ display: 'flex', gap: '32px', height: '64px' }}>
          <NavLink page="dashboard" label="Dashboard" />
          <NavLink page="meditation" label="Meditation" />
          <NavLink page="nutrition" label="Nutrition" />
          <NavLink page="recovery" label="Recovery" />
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontWeight: 500, fontSize: '14px' }}>
          <a 
            href="#" 
            style={{ cursor: 'pointer', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.15s ease' }} 
            onMouseOver={(e) => { e.target.style.color = 'var(--color-text-primary)'; }}
            onMouseOut={(e) => { e.target.style.color = 'var(--color-text-secondary)'; }}
            onClick={(e) => { e.preventDefault(); scrollToSection('specs-container'); }}
          >
            Science
          </a>
          <a 
            href="#" 
            style={{ cursor: 'pointer', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.15s ease' }} 
            onMouseOver={(e) => { e.target.style.color = 'var(--color-text-primary)'; }}
            onMouseOut={(e) => { e.target.style.color = 'var(--color-text-secondary)'; }}
            onClick={(e) => { e.preventDefault(); scrollToSection('therapy-section'); }}
          >
            Protocol
          </a>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          className="btn-primary" 
          onClick={reset} 
          style={{ padding: '8px 16px', height: 'auto', borderRadius: '8px', fontSize: '13px' }}
        >
          {isAssessed ? 'New Analysis' : 'Initialize'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
