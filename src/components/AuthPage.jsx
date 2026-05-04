import React, { useState } from 'react';
import { useStore } from '../store/useStore';

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

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <button 
            onClick={() => { setIsLogin(true); setError(''); }}
            style={{ flex: 1, padding: '12px', background: isLogin ? 'var(--color-accent-primary)' : 'transparent', color: isLogin ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(''); }}
            style={{ flex: 1, padding: '12px', background: !isLogin ? 'var(--color-accent-primary)' : 'transparent', color: !isLogin ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div className="input-group">
              <label>Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
          </div>
          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" value={formData.confirm} onChange={e => setFormData({ ...formData, confirm: e.target.value })} />
            </div>
          )}

          {error && <div style={{ color: 'var(--color-danger)', fontSize: '13px', marginTop: '-8px' }}>{error}</div>}

          <button type="submit" className="btn-primary" style={{ marginTop: '16px', padding: '14px', borderRadius: '8px', fontWeight: 600 }}>
            {isLogin ? 'Login to Dashboard' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
