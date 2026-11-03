import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CTASection.css';

/**
 * CTASection Component - Home Page Final CTA
 * Positioned immediately before the Footer.
 * Industrial Authority, High Contrast, Direct Business Enquiry Actions.
 */
export const CTASection = () => {
  const navigate = useNavigate();

  const handleRequestQuote = (e) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl && window.location.pathname === '/') {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreProducts = (e) => {
    e.preventDefault();
    navigate('/products/flanges');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="nirmex-cta" aria-labelledby="cta-heading">
      {/* Subtle Technical Industrial Background Details */}
      <div className="nirmex-cta__grid-pattern" aria-hidden="true" />
      <div className="nirmex-cta__glow-accent" aria-hidden="true" />

      <div className="nirmex-cta__container">
        <div className="nirmex-cta__card">
          {/* Eyebrow Pill */}
          <div className="nirmex-cta__eyebrow-wrap">
            <span className="nirmex-cta__eyebrow-dot" aria-hidden="true" />
            <span className="nirmex-cta__eyebrow">READY TO PARTNER WITH NIRMEX</span>
          </div>

          {/* Primary Headline */}
          <h2 id="cta-heading" className="nirmex-cta__heading">
            Looking for Reliable Metal Products &amp; Industrial Supply Solutions?
          </h2>

          {/* Supporting Copy */}
          <p className="nirmex-cta__description">
            Connect with Nirmex Metal Industries for precision forged fittings, ASME/DIN compliant flanges, high-tensile fasteners, and certified industrial piping materials engineered for critical industrial applications.
          </p>

          {/* Action Buttons */}
          <div className="nirmex-cta__actions">
            <a
              href="/contact"
              onClick={handleRequestQuote}
              className="nirmex-cta__btn nirmex-cta__btn--primary"
              aria-label="Request a quotation from Nirmex Metal Industries"
            >
              <span className="nirmex-cta__btn-text">Request a Quotation</span>
              <span className="nirmex-cta__btn-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>

            <a
              href="/products/flanges"
              onClick={handleExploreProducts}
              className="nirmex-cta__btn nirmex-cta__btn--secondary"
              aria-label="Explore Nirmex full product range"
            >
              <span className="nirmex-cta__btn-text">Explore Products</span>
            </a>
          </div>

          {/* Key Industrial Trust Pillars */}
          <div className="nirmex-cta__trust-row" role="list">
            <div className="nirmex-cta__trust-item" role="listitem">
              <span className="nirmex-cta__trust-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <span className="nirmex-cta__trust-text">ISO 9001:2015 Approved Mills</span>
            </div>

            <div className="nirmex-cta__trust-item" role="listitem">
              <span className="nirmex-cta__trust-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <span className="nirmex-cta__trust-text">Global Export Compliance (ASME/DIN)</span>
            </div>

            <div className="nirmex-cta__trust-item" role="listitem">
              <span className="nirmex-cta__trust-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </span>
              <span className="nirmex-cta__trust-text">Fast Dispatch &amp; Custom Sizing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

