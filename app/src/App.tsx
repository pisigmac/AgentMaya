import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Curriculum from './sections/Curriculum';
import CinematicVision from './sections/CinematicVision';
import AlumniArchives from './sections/AlumniArchives';
import Tools from './sections/Tools';
import FAQ from './sections/FAQ';
import CTABanner from './sections/CTABanner';
import ContactForm from './sections/ContactForm';
import Footer from './sections/Footer';
import CapabilityDetail from './sections/CapabilityDetail';

function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div
      style={{
        background: '#050505',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Navigation />

      <main>
        <Hero />
        <Curriculum />
        <CinematicVision />
        <AlumniArchives />
        <Tools />
        <FAQ />
        <CTABanner onOpenContact={() => setContactOpen(true)} />
        <Footer />
      </main>

      {/* Contact Form Modal */}
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/capability/:slug" element={<CapabilityDetail />} />
    </Routes>
  );
}
