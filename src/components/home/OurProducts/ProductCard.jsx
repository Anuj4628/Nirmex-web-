import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * ProductCard Component - White Industrial Catalogue Card
 * Matches exact reference design: White card, rounded corners (18px),
 * clean product image container, dark typography, and solid red CTA button.
 * 
 * @param {Object} props
 * @param {Object} props.product - Product data object
 * @param {boolean} props.isFeatured - Whether this card is the primary featured card (Row 1)
 * @param {string} props.rowType - 'featured' | 'two-col' | 'three-col'
 */
export const ProductCard = ({ product, isFeatured = false, rowType = 'two-col' }) => {
  const navigate = useNavigate();
  const {
    badge,
    category,
    title,
    subtitle,
    description,
    image,
    imageAlt,
    highlights,
    href,
  } = product;

  const handleCardClick = (e) => {
    e.preventDefault();
    if (!href) return;
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isFeatured) {
    return (
      <article className="our-product-card our-product-card--featured" tabIndex="0">
        <div className="our-product-card__inner our-product-card__inner--featured">
          {/* Left: Prominent Product Image in Clean Rounded Well */}
          <div className="our-product-card__image-container our-product-card__image-container--featured">
            <img
              src={image}
              alt={imageAlt}
              className="our-product-card__image"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right: Featured Product Information */}
          <div className="our-product-card__body our-product-card__body--featured">
            {badge && (
              <div className="our-product-card__badge-wrap">
                <span className="our-product-card__badge">{badge}</span>
              </div>
            )}

            <div className="our-product-card__category-wrap">
              <span className="our-product-card__category">{category}</span>
              <span className="our-product-card__category-line" aria-hidden="true" />
            </div>

            <h3 className="our-product-card__title our-product-card__title--featured">
              {title}
            </h3>

            {subtitle && (
              <p className="our-product-card__subtitle">{subtitle}</p>
            )}

            <p className="our-product-card__description our-product-card__description--featured">
              {description}
            </p>

            {/* Checkmark Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="our-product-card__highlights" aria-label="Key highlights">
                {highlights.map((item, idx) => (
                  <span key={idx} className="our-product-card__highlight-item">
                    <svg
                      className="our-product-card__check-icon"
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="8" r="8" fill="var(--color-brand-red, #E10600)" />
                      <path
                        d="M5 8.2L7 10.2L11.5 5.8"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="our-product-card__action">
              <a
                href={href}
                className="our-product-card__btn our-product-card__btn--featured"
                onClick={handleCardClick}
                aria-label={`View details for ${title}`}
              >
                <span>View Product</span>
                <svg
                  className="our-product-card__btn-arrow"
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
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Balanced Cards (Row 2 and Row 3)
  return (
    <article
      className={`our-product-card our-product-card--${rowType}`}
      tabIndex="0"
    >
      <div className={`our-product-card__inner our-product-card__inner--${rowType}`}>
        {/* Left: Product Image */}
        <div className={`our-product-card__image-container our-product-card__image-container--${rowType}`}>
          <img
            src={image}
            alt={imageAlt}
            className="our-product-card__image"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Right: Product Information */}
        <div className={`our-product-card__body our-product-card__body--${rowType}`}>
          <div className="our-product-card__category-wrap">
            <span className="our-product-card__category">{category}</span>
            <span className="our-product-card__category-line" aria-hidden="true" />
          </div>

          <h3 className="our-product-card__title">{title}</h3>

          {subtitle && (
            <p className="our-product-card__subtitle">{subtitle}</p>
          )}

          <p className="our-product-card__description">{description}</p>

          <div className="our-product-card__action">
            <a
              href={href}
              className="our-product-card__btn"
              onClick={handleCardClick}
              aria-label={`View details for ${title}`}
            >
              <span>View Product</span>
              <svg
                className="our-product-card__btn-arrow"
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
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
