import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENTS_ROW_1, CLIENTS_ROW_2 } from './clients.data';
import './OurClients.css';

/**
 * OurClients Component - Home Page Section 5
 * Deep Industrial Red Canvas + Seamless Dual-Direction Marquee + Authentic Client Logos
 */
export const OurClients = () => {
  const navigate = useNavigate();
  // Triple arrays to ensure seamless infinite looping on all screens (including ultrawide)
  const marqueeRow1 = [...CLIENTS_ROW_1, ...CLIENTS_ROW_1, ...CLIENTS_ROW_1];
  const marqueeRow2 = [...CLIENTS_ROW_2, ...CLIENTS_ROW_2, ...CLIENTS_ROW_2];

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="clients"
      className="our-clients"
      aria-labelledby="our-clients-heading"
    >
      {/* Subtle Engineering Grid Background Detailing */}
      <div className="our-clients__grid-bg" aria-hidden="true" />

      <div className="our-clients__container">
        {/* =================================================================
            1. TOP SECTION / INTRO
            ================================================================= */}
        <header className="our-clients__header">
          {/* Eyebrow Label with Cream Background & Dark Red Typography */}
          <div className="our-clients__eyebrow-wrap">
            <span className="our-clients__eyebrow">OUR CLIENTS</span>
          </div>

          {/* Main Steel & Engineering Heading */}
          <h2 id="our-clients-heading" className="our-clients__heading">
            Trusted by Leading Industries Across the Steel &amp; Engineering Sector
          </h2>

          {/* Concise Supporting Line */}
          <p className="our-clients__subtitle">
            Building trusted partnerships across engineering, manufacturing, infrastructure and industrial applications.
          </p>
        </header>
      </div>

      {/* =================================================================
          2. DUAL-DIRECTION CLIENT LOGO MARQUEE DISPLAY
          ================================================================= */}
      <div className="our-clients__marquee-wrapper" aria-label="Client logos carousel">
        {/* Row 1: Moves Right to Left */}
        <div className="our-clients__marquee-track our-clients__marquee-track--left">
          <div className="our-clients__marquee-content">
            {marqueeRow1.map((client, idx) => (
              <div
                key={`row1-${client.id}-${idx}`}
                className="client-logo-card"
                role="group"
                aria-label={client.name}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} official logo`}
                  className="client-logo-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Left to Right */}
        <div className="our-clients__marquee-track our-clients__marquee-track--right">
          <div className="our-clients__marquee-content">
            {marqueeRow2.map((client, idx) => (
              <div
                key={`row2-${client.id}-${idx}`}
                className="client-logo-card"
                role="group"
                aria-label={client.name}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} official logo`}
                  className="client-logo-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================================
          3. COMPACT REFINED CLIENTS CTA
          ================================================================= */}
      <div className="our-clients__cta-wrap">
        <a href="/contact" onClick={handleCtaClick} className="our-clients__cta" aria-label="View our complete client network and partnerships">
          <span className="our-clients__cta-text">View Our Client Network</span>
          <span className="our-clients__cta-arrow-box" aria-hidden="true">
            <svg
              className="our-clients__cta-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
};

export default OurClients;

