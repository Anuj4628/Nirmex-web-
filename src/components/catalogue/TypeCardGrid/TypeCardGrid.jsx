import React from 'react';
import { Link } from 'react-router-dom';
import { buildProductUrl } from '@/utils/seoRouting';
import './TypeCardGrid.css';

/**
 * TypeCardGrid Component
 * 
 * Grid of Product Type Cards with Industrial Imagery:
 * - Rendered for Flanges, Fasteners & Forged Fittings
 * - Each card navigates to its individual Type Detail Page
 * - Consistent framing, hover zoom, and crisp typography
 */
export const TypeCardGrid = ({
  types = [],
  activeMaterialSlug,
  activeProductSlug,
  materialSlug,
  productSlug,
  productName,
  title,
  subtitle,
}) => {
  const actualMaterialSlug = activeMaterialSlug || materialSlug;
  const actualProductSlug = activeProductSlug || productSlug;

  if (!types || types.length === 0) return null;

  const displayTitle = title || (productName ? `Types of ${productName}` : 'Types of Product & Configurations');
  const displaySubtitle = subtitle || 'Explore available design configurations, joint geometries, and ASME/DIN manufacturing forms.';

  return (
    <section className="nirmex-types-sec" aria-labelledby="types-heading">
      <div className="nirmex-types-sec__header">
        <div className="nirmex-types-sec__title-wrap">
          <span className="nirmex-types-sec__dot" aria-hidden="true" />
          <h3 id="types-heading" className="nirmex-types-sec__title">
            {displayTitle} ({types.length})
          </h3>
        </div>
        {displaySubtitle && <p className="nirmex-types-sec__sub">{displaySubtitle}</p>}
      </div>

      <div className="nirmex-types-grid" role="list">
        {types.map((type) => {
          const targetUrl = buildProductUrl({
            product: actualProductSlug,
            material: actualMaterialSlug,
            type: type.slug,
          });

          return (
            <article key={type.slug} className="nirmex-type-card" role="listitem">
              {/* Type Card Media */}
              <div className="nirmex-type-card__media">
                <img
                  src={type.image}
                  alt={`${type.name} Manufacturer in Mumbai`}
                  className="nirmex-type-card__img"
                  loading="lazy"
                />
                {type.shortCode && (
                  <span className="nirmex-type-card__code-badge">
                    {type.shortCode}
                  </span>
                )}
              </div>

              {/* Type Card Info */}
              <div className="nirmex-type-card__content">
                <h4 className="nirmex-type-card__name">
                  {type.name}
                </h4>

                <p className="nirmex-type-card__desc">
                  {type.shortDesc}
                </p>

                {type.standards && (
                  <div className="nirmex-type-card__spec">
                    <span className="nirmex-type-card__spec-label">STD:</span>
                    <span className="nirmex-type-card__spec-val">{type.standards.split(',')[0]}</span>
                  </div>
                )}

                {/* Explore Action */}
                <div className="nirmex-type-card__action">
                  <Link
                    to={targetUrl}
                    className="nirmex-type-card__link"
                    aria-label={`Explore specifications and configurations for ${type.name}`}
                  >
                    <span>Explore Specifications</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TypeCardGrid;

