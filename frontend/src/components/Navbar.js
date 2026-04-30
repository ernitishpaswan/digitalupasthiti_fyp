// Navbar component - custom logo PNG support added
import React, { useState, useEffect } from 'react';

// ─── APNA LOGO YAHAN DAALO ───
// Step 1: Apni logo.png file frontend/src/ folder mein rakho
// Step 2: Neeche ka comment hata do (line 10 ka "//" remove karo)
// import logoImg from '../logo.png';

// Agar logo.png nahi hai toh SVG icon use hoga (default)
let logoImg = null;
try {
  // Dynamic import attempt - agar file hai toh use karega
  logoImg = require('../logo.png');
} catch (e) {
  logoImg = null; // File nahi mili, SVG fallback use karega
}

const Navbar = ({ downloadUrl, onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = (e) => {
    if (downloadUrl && downloadUrl !== '#') {
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a className="nav-logo" href="#hero" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">
            {logoImg ? (
              // Custom PNG logo - automatically use hoga agar logo.png hai src/ mein
              <img
                src={logoImg}
                alt="DigitalUpasthiti Logo"
                style={{ width: 28, height: 28, objectFit: 'contain', borderRadius: 4 }}
              />
            ) : (
              // Default SVG fallback - logo.png nahi hai toh ye dikhega
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            )}
          </div>
          Digital<em>Upasthiti</em>
        </a>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#trust">Security</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('privacy'); }}>Privacy</a>
          <a href="mailto:support@digitalupasthiti.in">Help Center</a>
          <a href="#" className="nav-cta" onClick={handleDownload}>Download APK</a>
        </div>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
        <a href="#trust" onClick={() => setMenuOpen(false)}>Security</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('privacy'); setMenuOpen(false); }}>Privacy</a>
        <a href="mailto:support@digitalupasthiti.app" onClick={() => setMenuOpen(false)}>Help Center</a>
        <a href="#" onClick={handleDownload} style={{ color: 'var(--green)', fontWeight: 700 }}>
          ⬇ Download APK
        </a>
      </div>
    </>
  );
};

export default Navbar;
