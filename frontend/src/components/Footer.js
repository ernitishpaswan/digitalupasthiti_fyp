// Footer aur Privacy/Terms modals
import React, { useState } from 'react';

const Footer = ({ content, onOpenModal }) => {
  const twitterUrl = content?.social_twitter || '#';
  const linkedinUrl = content?.social_linkedin || '#';
  const githubUrl = content?.social_github || '#';
  const contactEmail = content?.contact_email || 'support@digitalupasthiti.app';
  const footerTagline = content?.footer_tagline || '© 2026 DigitalUpasthiti. All rights reserved. Made with ❤️ in India.';

  return (
    <footer>
      <div className="footer-top">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <h3>DigitalUpasthiti</h3>
          <p>The official secure digital attendance platform for educational institutions. Built in India 🇮🇳</p>
          <div className="social-links">
            <a className="social-link" href={twitterUrl} aria-label="Twitter" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>
            </a>
            <a className="social-link" href={linkedinUrl} aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a className="social-link" href={githubUrl} aria-label="GitHub" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#preview">App Preview</a></li>
            <li><a href="#download">Download</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('privacy'); }}>Privacy Policy</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('terms'); }}>Terms of Use</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href={`mailto:${contactEmail}`}>Help Center</a></li>
            <li><a href={`mailto:${contactEmail}`}>Contact Us</a></li>
            <li><a href="#">Report Issue</a></li>
            <li><a href="#">Changelog</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{footerTagline}</p>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('privacy'); }}>Privacy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('terms'); }}>Terms</a>
          <a href={`mailto:${contactEmail}`}>Contact</a>
        </div>
      </div>
    </footer>
  );
};

// Privacy & Terms modals
export const Modals = ({ openModal, onClose }) => {
  return (
    <>
      {/* Privacy Modal */}
      <div
        className={`modal-overlay ${openModal === 'privacy' ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>✕</button>
          <h2>Privacy Policy</h2>
          <p><strong>Last Updated:</strong> June 2025</p>
          <p>DigitalUpasthiti ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.</p>
          <p><strong>Data We Collect:</strong> We collect biometric facial data processed entirely on-device for authentication purposes. Location data is used only at attendance-marking time to verify campus presence. No biometric data is transmitted to or stored on external servers.</p>
          <p><strong>Data Storage:</strong> Attendance records, timestamps, and location metadata are stored securely on institution-controlled servers. All data in transit is encrypted using TLS 1.3.</p>
          <p><strong>Third-Party Sharing:</strong> We do not sell, trade, or share your personal data with any third parties. Data is shared with your institution administrators solely for official attendance purposes.</p>
          <p><strong>Your Rights:</strong> You have the right to access, correct, or request deletion of your personal data at any time by contacting your institution administrator or emailing privacy@digitalupasthiti.app.</p>
          <p><strong>Contact:</strong> For any privacy-related concerns, email us at privacy@digitalupasthiti.app.</p>
        </div>
      </div>

      {/* Terms Modal */}
      <div
        className={`modal-overlay ${openModal === 'terms' ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>✕</button>
          <h2>Terms of Use</h2>
          <p><strong>Last Updated:</strong> June 2025</p>
          <p>By downloading and using DigitalUpasthiti, you agree to these Terms of Use. Please read them carefully.</p>
          <p><strong>Acceptable Use:</strong> DigitalUpasthiti is intended solely for legitimate attendance tracking in authorized educational or organizational settings. Any attempt to spoof, manipulate, or fraudulently mark attendance is a violation of these terms and may result in disciplinary action.</p>
          <p><strong>Account Responsibility:</strong> You are responsible for maintaining the security of your login credentials. Never share your account with others.</p>
          <p><strong>Intellectual Property:</strong> All software, design, and content within DigitalUpasthiti is the exclusive property of DigitalUpasthiti and is protected by applicable intellectual property laws.</p>
          <p><strong>Limitation of Liability:</strong> DigitalUpasthiti shall not be liable for any indirect, incidental, or consequential damages arising from use of the app.</p>
          <p><strong>Changes to Terms:</strong> We reserve the right to update these terms at any time. Continued use constitutes acceptance of updated terms.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
