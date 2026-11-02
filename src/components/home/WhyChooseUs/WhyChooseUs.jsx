import React from 'react';
import whyChooseUsImg from '@/assets/images/why-choose-us.jpg';
import './WhyChooseUs.css';

/**
 * Feature cards configuration for Why Choose Us
 * 4 cards arranged in a clean 2x2 grid
 */
const WHY_CHOOSE_US_FEATURES = [
  {
    id: 'precision-engineering',
    title: 'Precision Engineering',
    description: 'Accurately manufactured components designed for demanding industrial applications.',
    icon: (
      <svg
        className="why-choose-us__card-icon-svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    id: 'reliable-quality',
    title: 'Reliable Quality',
    description: 'Consistent material quality, dimensional accuracy and dependable performance.',
    icon: (
      <svg
        className="why-choose-us__card-icon-svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'industrial-strength',
    title: 'Industrial Strength',
    description: 'Forged components engineered to withstand pressure, load and demanding service conditions.',
    icon: (
      <svg
        className="why-choose-us__card-icon-svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 12l3.5-3.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M7 16a6 6 0 0 1 0-8" />
        <path d="M17 16a6 6 0 0 0 0-8" />
      </svg>
    ),
  },
  {
    id: 'trusted-supply',
    title: 'Trusted Supply',
    description: 'Reliable product availability with professional support for industrial requirements.',
    icon: (
      <svg
        className="why-choose-us__card-icon-svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

/**
 * WhyChooseUs Component - Home Page Section 3
 * Left: Photorealistic Portrait Industrial Photography + Geometric Red Accent
 * Right: Section Label + Headline + Paragraph + 2x2 Red Feature Cards Grid
 */
export const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="why-choose-us"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="why-choose-us__container">
        {/* =================================================================
            1. LEFT COLUMN: Large Premium Industrial Image
            ================================================================= */}
        <div className="why-choose-us__media-col">
          <div className="why-choose-us__image-frame">
            <img
              src={whyChooseUsImg}
              alt="Precision-engineered forged fittings, industrial flanges, and high-tensile fasteners"
              className="why-choose-us__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* =================================================================
            2. RIGHT COLUMN: Content, Headline, Description & 2x2 Feature Grid
            ================================================================= */}
        <div className="why-choose-us__content-col">
          {/* Section Eyebrow Label with Solid Red Indicator */}
          <div className="why-choose-us__label">
            <span className="why-choose-us__label-indicator" aria-hidden="true" />
            <span className="why-choose-us__label-text">WHY CHOOSE US?</span>
          </div>

          {/* Main Headline with Highlighted Focus Words */}
          <h2 id="why-choose-us-heading" className="why-choose-us__heading">
            Built for{' '}
            <span className="why-choose-us__highlight">Precision</span>.
            {' '}Trusted for{' '}
            <span className="why-choose-us__highlight">Performance</span>.
          </h2>

          {/* Supporting Professional Paragraph */}
          <p className="why-choose-us__description">
            We deliver precision-engineered forged fittings, flanges and fasteners built for demanding industrial applications. With dependable quality, accurate manufacturing and consistent performance, we help industries build safer and more reliable piping systems.
          </p>

          {/* 4 Feature Cards (Clean 2x2 Grid) */}
          <div className="why-choose-us__grid" role="list">
            {WHY_CHOOSE_US_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="why-choose-us__card"
                role="listitem"
                tabIndex="0"
              >
                <div className="why-choose-us__card-icon-wrap" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="why-choose-us__card-title">{feature.title}</h3>
                <p className="why-choose-us__card-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

