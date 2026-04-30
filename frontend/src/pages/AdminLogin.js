// Admin login page - custom logo support added
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminLogin } from '../api';
import { useAuth } from '../context/AuthContext';

// Custom logo support - same as Navbar
let logoImg = null;
try {
  logoImg = require('../logo.png');
} catch (e) {
  logoImg = null;
}

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await adminLogin({ email, password });
      login(data.token, { _id: data._id, email: data.email });
      toast.success('Welcome back! 🎉');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed! Backend chal raha hai?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            {logoImg ? (
              <img
                src={logoImg}
                alt="Logo"
                style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }}
              />
            ) : (
              <svg viewBox="0 0 24 24" style={{ width: 28, height: 28, fill: 'white' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            )}
          </div>
          <h1 style={styles.logoText}>DigitalUpasthiti</h1>
          <p style={styles.subtitle}>Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p style={styles.hint}>
          Contact your system administrator for login credentials.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#111827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Open Sans', sans-serif",
  },
  card: {
    background: '#1f2937',
    borderRadius: 20,
    padding: '48px 40px',
    width: '100%',
    maxWidth: 420,
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
  },
  logoWrap: { textAlign: 'center', marginBottom: 36 },
  logoIcon: {
    width: 60, height: 60, borderRadius: 16,
    background: '#25D366',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 14px',
    boxShadow: '0 0 30px rgba(37,211,102,0.3)',
  },
  logoText: {
    color: 'white', fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.4rem', fontWeight: 800, margin: '0 0 4px',
  },
  subtitle: { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600 },
  input: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, padding: '13px 16px',
    color: 'white', fontSize: '0.95rem',
    outline: 'none', width: '100%', boxSizing: 'border-box',
  },
  btn: {
    background: '#25D366', color: 'white', border: 'none',
    borderRadius: 10, padding: '14px', fontSize: '1rem',
    fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
    marginTop: 8, fontFamily: "'Montserrat', sans-serif",
  },
  hint: {
    color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem',
    textAlign: 'center', marginTop: 20, marginBottom: 0,
  },
};

export default AdminLogin;
