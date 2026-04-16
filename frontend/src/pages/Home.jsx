import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnalyticsShowcase from '../components/AnalyticsShowcase';
import SimpleImpactSection from '../components/ImpactSection';
import FAQ from '../components/FAQ';


const Home = () => {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <FeaturesSection />
      <AnalyticsShowcase />
      <FAQ />
      <SimpleImpactSection />
      <Footer />
    </>
  );
};

export default Home;
