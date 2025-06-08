import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CaregiverList from './components/CaregiverList';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import BecomeCaregiverSection from './components/BecomeCaregiverSection';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <CaregiverList />
        <HowItWorks />
        <Testimonials />
        <BecomeCaregiverSection />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;