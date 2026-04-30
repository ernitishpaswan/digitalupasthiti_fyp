// Main website page - saare sections ek jagah
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { HowItWorks, Trust, AppPreview } from '../components/Sections';
import DownloadSection from '../components/DownloadSection';
import Footer, { Modals } from '../components/Footer';
import useSiteData from '../hooks/useSiteData';

const HomePage = () => {
  const { release, content, loading } = useSiteData();
  const [openModal, setOpenModal] = useState(null); // 'privacy' | 'terms' | null

  // Scroll pe body overflow lock karo jab modal open ho
  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openModal]);

  // Scroll animations setup - original ka IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    // Thoda wait karo taki saare components render ho jayein
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, [loading]); // loading change hone pe re-run karo

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--dark)',
        color: 'var(--green)', fontFamily: 'var(--font-head)',
        fontSize: '1.2rem', gap: '12px'
      }}>
        <span style={{ animation: 'pulse 1s infinite' }}>●</span>
        Loading DigitalUpasthiti...
      </div>
    );
  }

  return (
    <>
      <Navbar
        downloadUrl={release?.downloadUrl}
        onOpenModal={(type) => setOpenModal(type)}
      />

      <Hero
        release={release}
        content={content}
        onDownload={() => {}}
      />

      <Features />

      <HowItWorks />

      <Trust />

      <AppPreview />

      <DownloadSection release={release} />

      <Footer
        content={content}
        onOpenModal={(type) => setOpenModal(type)}
      />

      <Modals
        openModal={openModal}
        onClose={() => setOpenModal(null)}
      />
    </>
  );
};

export default HomePage;
