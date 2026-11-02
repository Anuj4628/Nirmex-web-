import React from 'react';
import Button from '@/components/common/Button/Button';

/**
 * Single Hero Slide Component
 * Features Full-Bleed Diagonal Product Imagery and Oversized Condensed Typography
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data object
 * @param {boolean} props.isActive - Whether this slide is current active slide
 * @param {Function} props.onCtaClick - Optional callback on button click
 */
export const HeroSlide = ({ slide, isActive, onCtaClick }) => {
  const {
    eyebrow,
    headlineLine1,
    headlineLine2,
    description,
    primaryCta,
    secondaryCta,
    image,
    imageAlt,
    imagePosition = 'center center',
  } = slide;

  const handleCta = (e, href) => {
    e.preventDefault();
    if (onCtaClick) onCtaClick(href);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`hero-slide ${isActive ? 'hero-slide--active' : 'hero-slide--hidden'}`}
      aria-hidden={!isActive}
    >
      {/* Left Column: Oversized Condensed Editorial Typography (~45% width) */}
      <div className="hero-slide__col-text">
        <div className="hero-slide__eyebrow-wrap">
          <span className="hero-slide__eyebrow-accent" aria-hidden="true" />
          <span className="hero-slide__eyebrow">{eyebrow}</span>
        </div>

        <h1 className="hero-slide__headline">
          <span className="hero-slide__headline-accent">{headlineLine1}</span>
          <span className="hero-slide__headline-main">{headlineLine2}</span>
        </h1>

        <p className="hero-slide__description">{description}</p>

        <div className="hero-slide__cta-group">
          <Button
            variant="primary"
            size="md"
            className="hero-slide__btn-primary"
            onClick={(e) => handleCta(e, primaryCta.href)}
            ariaLabel={primaryCta.ariaLabel}
          >
            {primaryCta.label}
          </Button>

          <button
            type="button"
            className="hero-slide__btn-secondary"
            onClick={(e) => handleCta(e, secondaryCta.href)}
            aria-label={secondaryCta.ariaLabel}
          >
            <span>{secondaryCta.label}</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Column: Full-Bleed Diagonal Product Image (~57% width) */}
      <div className="hero-slide__col-visual">
        <div className="hero-slide__diagonal-frame">
          <img
            src={image}
            alt={imageAlt}
            className="hero-slide__product-image"
            style={{ objectPosition: imagePosition }}
            loading={isActive ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        {/* Precision 2.5px Solid Red Diagonal Boundary Accent perfectly aligned to polygon cut */}
        <svg
          className="hero-slide__diagonal-seam"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="10"
            y1="0"
            x2="0"
            y2="100"
            stroke="var(--color-brand-red)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSlide;
