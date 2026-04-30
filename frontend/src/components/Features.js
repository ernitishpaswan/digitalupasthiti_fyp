// Features section - exact same as original HTML
import React from 'react';

const Features = () => {
  const features = [
    {
      delay: 'fade-up-d1',
      icon: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
      title: 'Face Recognition',
      desc: 'Advanced biometric verification using deep learning models to instantly authenticate student identity with >99% accuracy.',
    },
    {
      delay: 'fade-up-d2',
      icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />,
      title: 'Geo-Fencing',
      desc: 'Restrict attendance marking to designated campus zones. Students must be physically present in the defined perimeter.',
    },
    {
      delay: 'fade-up-d3',
      icon: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4c1.4 0 2.8.5 3.9 1.5L6.4 15l-1.3-1.3C4.45 12.6 4 11.35 4 10c0-3.31 2.69-5 5-5z" />,
      title: 'Anti-Spoof Protection',
      desc: 'Liveness detection technology blocks photo and video spoofing attempts, ensuring only a real, present person can mark attendance.',
    },
    {
      delay: 'fade-up-d4',
      icon: <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />,
      title: 'Real-time Dashboard',
      desc: 'Live attendance data visualized for faculty and administrators — daily summaries, trends, and instant export to PDF/Excel.',
    },
    {
      delay: 'fade-up-d1',
      icon: <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />,
      title: 'Attendance History',
      desc: 'Complete attendance records for every student with date-wise breakdown, session-wise reports, and shortfall alerts.',
    },
    {
      delay: 'fade-up-d2',
      icon: <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />,
      title: 'Instant Notifications',
      desc: 'Automatic alerts for absentees, low attendance warnings, and daily summaries sent directly to students and faculty.',
    },
  ];

  return (
    <section id="features">
      <div className="section-center fade-up">
        <span className="section-tag">Features</span>
        <h2 className="section-h2">
          Everything you need for <span className="hl">smart attendance</span>
        </h2>
        <p className="section-sub">
          Powered by cutting-edge AI and built for reliability, DigitalUpasthiti ensures
          every attendance record is accurate and tamper-proof.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feat, i) => (
          <div key={i} className={`feat-card fade-up ${feat.delay}`}>
            <div className="feat-icon">
              <svg viewBox="0 0 24 24">{feat.icon}</svg>
            </div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
