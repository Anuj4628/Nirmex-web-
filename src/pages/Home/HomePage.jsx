import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import OurProducts from '@/components/home/OurProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ValueAddedServices from '@/components/home/ValueAddedServices';
import OurClients from '@/components/home/OurClients';
import IndustriesWeServe from '@/components/home/IndustriesWeServe';
import CountriesExport from '@/components/home/CountriesExport';
import CTASection from '@/components/home/CTA';
import './HomePage.css';

/**
 * HomePage Component
 * 1. Premium Industrial Hero Slider (Approved & Untouched)
 * 2. Our Products Showcase Section (Strict 1 + 2 + 3 Hierarchy, 6 Core Products)
 * 3. Why Choose Us Section (Industrial Authority, 4 Red Feature Cards)
 * 4. Value Added Services Section (Modular Asymmetric Bento Grid)
 * 5. Our Clients Section (Deep Industrial Red Canvas, Dual-Direction Logo Marquee)
 * 6. Industries We Serve Section (Clean White Surface, Interactive 3D Flip Cards)
 */
export const HomePage = () => {
  return (
    <div className="nirmex-home">
      {/* 1. Premium Industrial Hero Slider — DO NOT TOUCH */}
      <HeroSlider />

      {/* 2. Our Products Showcase Section */}
      <OurProducts />

      {/* 3. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 4. Value Added Services Section */}
      <ValueAddedServices />

      {/* 5. Our Clients Section */}
      <OurClients />

      {/* 6. Industries We Serve Section */}
      <IndustriesWeServe />

      {/* 7. Countries We Export To Section */}
      <CountriesExport />

      {/* 8. Premium Industrial CTA Section */}
      <CTASection />
    </div>
  );
};

export default HomePage;
