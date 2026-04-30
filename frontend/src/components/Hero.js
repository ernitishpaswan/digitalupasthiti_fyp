// Hero section - bilkul original jaise
// Dynamic: download URL, announcement text, stats
import React from 'react';

const Hero = ({ release, content, onDownload }) => {
  const announcement = content?.hero_announcement || '';
  const badgeText = content?.hero_badge_text || 'Official Platform';

  // Stats - admin se ya default
  const statAccuracy = content?.stat_accuracy || '99.9%';
  const statSpeed = content?.stat_speed || '< 2s';
  const statProxy = content?.stat_proxy || '100%';

  return (
    <section id="hero">
      <div className="hero-bg-dots"></div>
      <div className="hero-bg-glow"></div>
      <div className="hero-bg-glow2"></div>

      <div className="hero-inner">
        <div>
          <div className="hero-badge">
            <span className="dot"></span>
            {badgeText}
          </div>

          <h1 className="hero-h1">
            Secure Digital<br />
            <span className="hl">Attendance</span><br />
            System
          </h1>

          <p className="hero-sub">
            Fast, reliable, and secure attendance tracking powered by face recognition,
            geo-fencing, and real-time analytics — built for the modern organization.
          </p>

          {/* Announcement text - sirf tab dikhao jab kuch ho */}
          {announcement && (
            <p className="hero-announcement" id="hero-announcement">
              {announcement}
            </p>
          )}

          <div className="hero-btns">
            <a
              href={release?.downloadUrl || '#'}
              className="btn-primary"
              onClick={onDownload}
              target={release?.downloadUrl ? '_blank' : '_self'}
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Download APK
            </a>
            <a href="#features" className="btn-secondary">
              <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'currentColor' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
              See Features
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="val">{statAccuracy}</div>
              <div className="lbl">Accuracy Rate</div>
            </div>
            <div className="hero-stat">
              <div className="val">{statSpeed}</div>
              <div className="lbl">Scan Speed</div>
            </div>
            <div className="hero-stat">
              <div className="val">{statProxy}</div>
              <div className="lbl">Proxy-Free</div>
            </div>
          </div>
        </div>

        {/* Phone mockup - bilkul original */}
        <div className="phone-wrap">
          <div className="phone-outer">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="phone-topbar">
                <span className="appname">DIGITAL UPASTHITI</span>
                <span className="time">9:41 AM</span>
              </div>
              <div className="phone-header-card">
                <div className="greeting">Good Morning 👋</div>
                <div className="name">Mr. Developer</div>
                <div className="dept">CSE (Cyber Security) Dept · Semester 8</div>
              </div>
              <div className="phone-face-ring">
                <div className="face-icon">🙂</div>
              </div>
              <div className="face-status">● FACE ID SCANNING…</div>
              <div className="phone-scan-btn">📍 Mark Attendance</div>
              <div className="phone-footer-cards">
                <div className="phone-mini-card">
                  <div className="mini-label">Today's Status</div>
                  <div className="mini-val"><span className="mini-dot"></span>Present</div>
                </div>
                <div className="phone-mini-card">
                  <div className="mini-label">Attendance</div>
                  <div className="mini-val">91.4%</div>
                </div>
                <div className="phone-mini-card">
                  <div className="mini-label">Classes Today</div>
                  <div className="mini-val">4 / 5</div>
                </div>
                <div className="phone-mini-card">
                  <div className="mini-label">Location</div>
                  <div className="mini-val">✓ Campus</div>
                </div>
              </div>
            </div>
          </div>
          <div className="phone-glow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
