import React, { useState } from 'react';

/**
 * IndustryCard Component - 3D Interactive Flip Card
 * Front: High-res Industry photography, sector number badge, title & cue
 * Back: Solid Brand Red (#E10600) canvas, minimal clean white typography,
 *       short description, 2-3 key applications, white pill CTA, and flip-back control.
 * 
 * @param {Object} props
 * @param {Object} props.industry - Industry data object
 */
export const IndustryCard = ({ industry }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const {
    number,
    sectorLabel,
    title,
    image,
    altText,
    description,
    applications,
    ctaText,
    href,
  } = industry;

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.tagName.toLowerCase() === 'a') return;
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`industry-card ${isFlipped ? 'is-flipped' : ''}`}
      tabIndex="0"
      role="region"
      aria-label={`${title} Industry Card. Press Enter or Space to toggle details.`}
      aria-expanded={isFlipped}
      onClick={handleToggleFlip}
      onKeyDown={handleKeyDown}
    >
      <div className="industry-card__inner">
        {/* =================================================================
            1. FRONT FACE: Untouched photography, sector badge & title
            ================================================================= */}
        <div className="industry-card__face industry-card__face--front">
          <div className="industry-card__img-wrap">
            <img
              src={image}
              alt={altText}
              className="industry-card__img"
              loading="lazy"
              decoding="async"
            />
            <div className="industry-card__overlay" aria-hidden="true" />
          </div>

          {/* Top Bar: Sector Number Badge */}
          <div className="industry-card__front-top">
            <div className="industry-card__number-badge">
              <span className="industry-card__number-dot" aria-hidden="true" />
              <span className="industry-card__number-text">{number}</span>
            </div>
          </div>

          {/* Bottom Bar: Title & Flip Cue */}
          <div className="industry-card__front-bottom">
            <div className="industry-card__front-meta">
              <span className="industry-card__sector-tag">SECTOR {number}</span>
              <h3 className="industry-card__front-title">{title}</h3>
            </div>

            <div className="industry-card__cue" title="Hover or click to flip card" aria-hidden="true">
              <span className="industry-card__cue-text">Explore</span>
              <div className="industry-card__cue-icon-box">
                <svg
                  className="industry-card__cue-arrow"
                  width="13"
                  height="13"
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
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. BACK FACE: 100% Solid Brand Red + Minimal White Content
            ================================================================= */}
        <div className="industry-card__face industry-card__face--back">
          <div className="industry-card__back-content">
            {/* Top: Sector Number Label */}
            <div className="industry-card__back-sector-label">
              {sectorLabel || `SECTOR ${number}`}
            </div>

            {/* Clear Bold Industry Title */}
            <h3 className="industry-card__back-title">{title}</h3>

            {/* Concise 1-2 line description */}
            <p className="industry-card__back-desc">{description}</p>

            {/* 2-3 Short Key Applications */}
            {applications && applications.length > 0 && (
              <div className="industry-card__back-applications">
                <span className="industry-card__back-app-label">KEY APPLICATIONS</span>
                <ul className="industry-card__back-app-list">
                  {applications.map((app, idx) => (
                    <li key={idx} className="industry-card__back-app-item">
                      <span className="industry-card__back-bullet" aria-hidden="true" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Action Area: White Pill CTA + Flip Back Control */}
          <div className="industry-card__back-actions">
            <a
              href={href}
              className="industry-card__back-cta"
              onClick={handleActionClick}
              aria-label={`Inquire about ${title} components and supply`}
            >
              <span>{ctaText || 'Explore Industry'}</span>
              <svg
                className="industry-card__back-cta-arrow"
                width="14"
                height="14"
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
            </a>

            <button
              type="button"
              className="industry-card__back-flip-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFlip();
              }}
              aria-label="Flip back to front view"
            >
              <span>Flip Back</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;
