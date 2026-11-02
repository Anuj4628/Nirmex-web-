import React from 'react';
import { IndustryCard } from './IndustryCard';
import { INDUSTRIES_SERVED } from './industries.data';
import './IndustriesWeServe.css';

/**
 * IndustriesWeServe Component - Home Page Section 6
 * Clean White Surface + 6 Interactive 3D Flip Cards (3x2 Desktop Grid)
 */
export const IndustriesWeServe = () => {
  return (
    <section
      id="industries"
      className="industries-serve"
      aria-labelledby="industries-serve-heading"
    >
      <div className="industries-serve__container">
        {/* =================================================================
            1. SECTION HEADER
            ================================================================= */}
        <header className="industries-serve__header">
          <div className="industries-serve__eyebrow-wrap">
            <span className="industries-serve__eyebrow-indicator" aria-hidden="true" />
            <span className="industries-serve__eyebrow">INDUSTRIES WE SERVE</span>
          </div>

          <h2 id="industries-serve-heading" className="industries-serve__heading">
            Industries We Serve
          </h2>

          <p className="industries-serve__subtitle">
            Delivering reliable metal products and precision-engineered solutions for demanding industrial applications worldwide.
          </p>
        </header>

        {/* =================================================================
            2. SIX INTERACTIVE 3D FLIP CARDS GRID (3x2 Desktop)
            ================================================================= */}
        <div className="industries-serve__grid" role="list">
          {INDUSTRIES_SERVED.map((industry) => (
            <div key={industry.id} role="listitem">
              <IndustryCard industry={industry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;

