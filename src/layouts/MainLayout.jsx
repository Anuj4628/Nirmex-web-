import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './MainLayout.css';

/**
 * Main Application Layout
 * Provides persistent header, main content canvas, and corporate footer.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const MainLayout = ({ children }) => {
  return (
    <div className="nirmex-app-layout">
      {/* Premium Sticky Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="nirmex-main-content" id="main-content">
        {children}
      </main>

      {/* Complete Professional Corporate Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;

