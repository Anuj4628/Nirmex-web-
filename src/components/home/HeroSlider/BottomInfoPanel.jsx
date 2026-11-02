import React from 'react';

/**
 * Bottom Category Information Panel
 * Clean, restrained industrial component with a flat solid red category block
 * and simple, compact product cards.
 * 
 * @param {Object} props
 * @param {Object} props.panelData - Data from active slide's bottomPanel
 * @param {string} props.slideNumber - Active slide number (01, 02, etc.)
 */
export const BottomInfoPanel = ({ panelData, slideNumber }) => {
  if (!panelData) return null;

  const { brandBlockTitle, brandBlockSubtitle, cards } = panelData;

  const handleCardClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-bottom-panel" role="region" aria-label="Product Category Highlights">
      <div className="hero-bottom-panel__inner">
        {/* Left: Solid Flat Industrial Red Category Block */}
        <div className="hero-bottom-panel__brand-block">
          <span className="hero-bottom-panel__cat-label">CATEGORY {slideNumber}</span>
          <h3 className="hero-bottom-panel__brand-title">{brandBlockTitle}</h3>
          <p className="hero-bottom-panel__brand-subtitle">{brandBlockSubtitle}</p>
        </div>

        {/* Right: Three Simple, Professional Product Cards */}
        <div className="hero-bottom-panel__cards-container">
          <div className="hero-bottom-panel__cards-grid">
            {cards.map((card) => (
              <a
                key={card.id}
                href={card.href}
                className="hero-bottom-card"
                onClick={(e) => handleCardClick(e, card.href)}
              >
                <div className="hero-bottom-card__content">
                  <h4 className="hero-bottom-card__title">{card.title}</h4>
                  <p className="hero-bottom-card__subtitle">{card.subtitle}</p>
                </div>
                <div className="hero-bottom-card__arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomInfoPanel;
