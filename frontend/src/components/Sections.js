// How It Works section
import React from 'react';

export const HowItWorks = () => (
  <section id="how">
    <div className="section-center fade-up">
      <span className="section-tag">Process</span>
      <h2 className="section-h2">Up and running in <span className="hl">4 simple steps</span></h2>
      <p className="section-sub">
        Getting started with DigitalUpasthiti takes less than 5 minutes.
        No complicated setup. No hardware needed.
      </p>
    </div>
    <div className="steps-wrap">
      {[
        { num: 1, title: 'Install the APK', desc: 'Download and install DigitalUpasthiti from our official website in seconds.', delay: 'fade-up-d1' },
        { num: 2, title: 'Register & Login', desc: 'Create your account using your institution credentials and verify your identity.', delay: 'fade-up-d2' },
        { num: 3, title: 'Mark Attendance', desc: 'Face the camera within the campus zone and let Face ID verify your presence.', delay: 'fade-up-d3' },
        { num: 4, title: 'Track Records', desc: 'View your real-time attendance summary and download reports anytime.', delay: 'fade-up-d4' },
      ].map((step) => (
        <div key={step.num} className={`step fade-up ${step.delay}`}>
          <div className="step-num">{step.num}</div>
          <h3>{step.title}</h3>
          <p>{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// Trust & Security section
export const Trust = () => (
  <section id="trust">
    <div className="section-center fade-up">
      <span className="section-tag">Trust & Security</span>
      <h2 className="section-h2">Built for institutions that demand the best</h2>
      <p className="section-sub">
        Every layer of DigitalUpasthiti is engineered with security and privacy as the
        foundation — not an afterthought.
      </p>
    </div>
    <div className="trust-grid">
      {[
        {
          delay: 'fade-up-d1',
          icon: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 11h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V12z" />,
          title: 'Verified & Secure System',
          desc: 'End-to-end encrypted communication. All biometric data is processed on-device and never stored on external servers.',
        },
        {
          delay: 'fade-up-d2',
          icon: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
          title: 'Zero Proxy Attendance',
          desc: 'Face recognition + geo-fencing + liveness check creates a triple-layered barrier against proxy or fake attendance marking.',
        },
        {
          delay: 'fade-up-d3',
          icon: <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />,
          title: 'Data Privacy Focused',
          desc: 'Full compliance with data protection standards. You control your data — institutions never share student records with third parties.',
        },
        {
          delay: 'fade-up-d4',
          icon: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />,
          title: 'Audit-Ready Records',
          desc: 'Immutable, timestamped attendance logs with location metadata. Every entry is tamper-evident and audit-ready for inspections.',
        },
      ].map((card, i) => (
        <div key={i} className={`trust-card fade-up ${card.delay}`}>
          <div className="trust-badge">
            <svg viewBox="0 0 24 24">{card.icon}</svg>
          </div>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// App Preview section
export const AppPreview = () => (
  <section id="preview">
    <div className="section-center fade-up">
      <span className="section-tag">App Preview</span>
      <h2 className="section-h2">
        A beautifully <span className="hl" style={{ color: 'var(--green)' }}>designed</span> experience
      </h2>
      <p className="section-sub">
        Designed for clarity. Built for speed. Every screen is purpose-built to make
        attendance simple and stress-free.
      </p>
    </div>
    <div className="preview-inner">
      <div className="screens-row">

        {/* Geo Fence screen */}
        <div className="screen-card side fade-up fade-up-d1">
          <div className="screen-inner">
            <div className="sc-topbar">
              <span className="sc-title">GEO FENCE</span>
              <span className="sc-time">9:41</span>
            </div>
            <div className="map-placeholder">
              <div className="map-icon">📍</div>
              <div className="map-lbl">Campus Perimeter</div>
            </div>
            <div className="geo-status">✓ YOU ARE INSIDE CAMPUS ZONE</div>
            <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 8 }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.52rem', marginBottom: 4 }}>YOUR LOCATION</div>
              <div style={{ color: 'white', fontSize: '0.65rem', fontWeight: 600 }}>22.5726° N, 88.3639° E</div>
            </div>
          </div>
        </div>

        {/* Dashboard screen */}
        <div className="screen-card main fade-up fade-up-d2">
          <div className="screen-inner">
            <div className="sc-topbar">
              <span className="sc-title">DASHBOARD</span>
              <span className="sc-time">9:41</span>
            </div>
            <div className="attendance-circle"><span className="pct">91%</span></div>
            <div className="attendance-label">OVERALL ATTENDANCE</div>
            <div className="mini-list">
              <div className="mini-row"><span className="lname">Data Structures</span><span className="status-p">● Present</span></div>
              <div className="mini-row"><span className="lname">OS Lab</span><span className="status-p">● Present</span></div>
              <div className="mini-row"><span className="lname">DBMS</span><span className="status-a">● Absent</span></div>
              <div className="mini-row"><span className="lname">Network Theory</span><span className="status-p">● Present</span></div>
            </div>
            <div className="chart-bars">
              <div className="chart-bar-wrap"><div className="chart-bar" style={{ height: 45 }}></div><div className="chart-day">M</div></div>
              <div className="chart-bar-wrap"><div className="chart-bar" style={{ height: 60 }}></div><div className="chart-day">T</div></div>
              <div className="chart-bar-wrap"><div className="chart-bar active" style={{ height: 55 }}></div><div className="chart-day">W</div></div>
              <div className="chart-bar-wrap"><div className="chart-bar" style={{ height: 40 }}></div><div className="chart-day">T</div></div>
              <div className="chart-bar-wrap"><div className="chart-bar" style={{ height: 50 }}></div><div className="chart-day">F</div></div>
            </div>
          </div>
        </div>

        {/* Faculty View screen */}
        <div className="screen-card side fade-up fade-up-d3">
          <div className="screen-inner dashboard-bg">
            <div className="sc-topbar">
              <span className="sc-title">FACULTY VIEW</span>
              <span className="sc-time">9:41</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 8, marginBottom: 8 }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.52rem' }}>CURRENT SESSION</div>
              <div style={{ color: 'white', fontSize: '0.7rem', fontWeight: 700, marginTop: 3 }}>CS-301 Data Structures</div>
            </div>
            <div className="mini-list">
              <div className="mini-row"><span className="lname">Priya Das</span><span className="status-p">✓</span></div>
              <div className="mini-row"><span className="lname">Rohan Ghosh</span><span className="status-p">✓</span></div>
              <div className="mini-row"><span className="lname">Anika Roy</span><span className="status-a">✗</span></div>
              <div className="mini-row"><span className="lname">Rahul Sen</span><span className="status-p">✓</span></div>
            </div>
            <div style={{ marginTop: 10, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: 8, padding: 8, textAlign: 'center' }}>
              <div style={{ color: 'var(--green)', fontSize: '0.6rem', fontWeight: 700 }}>38/42 PRESENT · 90.5%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);
