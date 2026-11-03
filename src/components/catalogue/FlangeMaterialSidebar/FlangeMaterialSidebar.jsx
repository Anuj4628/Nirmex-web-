import React from 'react';
import { NavLink } from 'react-router-dom';
import { buildProductUrl } from '@/utils/seoRouting';
import './FlangeMaterialSidebar.css';

/**
 * MASTER CATALOGUE MATERIALS SPECIFICATION
 * 10 authentic alloy families in strict user sequence:
 * 1. Stainless Steel
 * 2. Carbon Steel
 * 3. Copper
 * 4. Duplex & Super Duplex
 * 5. Alloy Steel
 * 6. Nickel Alloy
 * 7. Monel
 * 8. Inconel
 * 9. Hastelloy
 * 10. Titanium
 */
export const MASTER_MATERIALS = [
  { slug: 'stainless-steel', name: 'Stainless Steel', shortName: 'Stainless Steel' },
  { slug: 'carbon-steel', name: 'Carbon Steel', shortName: 'Carbon Steel' },
  { slug: 'copper', aliases: ['copper-alloys'], name: 'Copper', shortName: 'Copper' },
  { slug: 'duplex-super-duplex', name: 'Duplex & Super Duplex', shortName: 'Duplex & Super' },
  { slug: 'alloy-steel', name: 'Alloy Steel', shortName: 'Alloy Steel' },
  { slug: 'nickel-alloy', aliases: ['nickel-alloys'], name: 'Nickel Alloy', shortName: 'Nickel Alloy' },
  { slug: 'monel', name: 'Monel', shortName: 'Monel' },
  { slug: 'inconel', aliases: ['inconel-alloys'], name: 'Inconel', shortName: 'Inconel' },
  { slug: 'hastelloy', aliases: ['hastelloy-alloys'], name: 'Hastelloy', shortName: 'Hastelloy' },
  { slug: 'titanium', name: 'Titanium', shortName: 'Titanium' },
];

/**
 * Returns formatted product display name for clean item titles
 */
const getProductDisplayName = (slug, passedName) => {
  if (!slug) return 'Flanges';
  const s = slug.toLowerCase();
  if (s === 'forging' || s === 'forged-fittings') return 'Forging';
  if (passedName) return passedName;
  switch (s) {
    case 'flanges': return 'Flanges';
    case 'fasteners': return 'Fasteners';
    case 'butt-weld-fittings': return 'Butt Weld Fittings';
    case 'pipes-tubes': return 'Pipes & Tubes';
    case 'sheets-plates': return 'Sheets & Plates';
    case 'rods-bars': return 'Rods & Bars';
    case 'ferrule-fittings': return 'Ferrule Fittings';
    case 'dairy-pharma-fittings': return 'Dairy & Pharma Fittings';
    case 'hose-pipes': return 'Hose Pipes';
    case 'perforated-sheets': return 'Perforated Sheets';
    case 'wire-mesh': return 'Wire Mesh';
    case 'circle': return 'Circles';
    case 'flat-bars': return 'Flat Bars';
    case 'patapatti-strips': return 'Patapatti / Strips';
    case 'ring': return 'Rings';
    case 'coil': return 'Coils';
    case 'wires': return 'Wires';
    default:
      return s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
};

/**
 * Active matching accounting for slug aliases
 */
const isMaterialActive = (mat, activeSlug) => {
  if (!activeSlug) return false;
  const target = activeSlug.toLowerCase();
  if (mat.slug === target) return true;
  if (mat.aliases && mat.aliases.includes(target)) return true;
  return false;
};

/**
 * Universal Product Material Navigation Sidebar
 * 
 * Strict Features:
 * - Premium Red Gradient Card (#BA0500 / #940100)
 * - Displays ONLY material names relevant to the current product category
 * - Navigation links stay strictly within the SAME product category
 * - Compact sticky positioning with zero excessive spacing
 * - Natural page scrolling with visible footer once content ends
 * - High-contrast active state: white card with dark red text & left red accent
 * - Mobile responsive horizontal swipeable pill bar
 */
export const ProductMaterialSidebar = ({
  activeMaterialSlug = 'stainless-steel',
  activeProductSlug = 'flanges',
  productName = '',
  className = '',
}) => {
  const productDisplayName = getProductDisplayName(activeProductSlug, productName);

  return (
    <aside
      className={`nirmex-flange-sidebar-wrap ${className}`}
      aria-label={`${productDisplayName} Material Navigation`}
    >
      {/* Mobile Horizontal Scrollable Material Selector */}
      <div className="nirmex-flange-mobile-nav" role="navigation" aria-label={`Mobile ${productDisplayName} Material Selector`}>
        <div className="nirmex-flange-mobile-nav__label">
          <span>SELECT {productDisplayName.toUpperCase()} MATERIAL:</span>
        </div>
        <div className="nirmex-flange-mobile-nav__track">
          {MASTER_MATERIALS.map((mat) => {
            const isActive = isMaterialActive(mat, activeMaterialSlug);
            return (
              <NavLink
                key={mat.slug}
                to={buildProductUrl({ product: activeProductSlug, material: mat.slug })}
                className={`nirmex-flange-mobile-pill ${isActive ? 'nirmex-flange-mobile-pill--active' : ''}`}
              >
                <span>{mat.shortName}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Desktop Dedicated Red Material Sidebar */}
      <div className="nirmex-flange-sidebar">
        <div className="nirmex-flange-sidebar__header">
          <div className="nirmex-flange-sidebar__badge">
            <span className="nirmex-flange-sidebar__dot" aria-hidden="true" />
            <span>METALLURGY</span>
          </div>
          <h2 className="nirmex-flange-sidebar__title">
            {productDisplayName.toUpperCase()}
          </h2>
          <p className="nirmex-flange-sidebar__desc">
            Directly select alloy family to view material-specific specifications &amp; verified grades.
          </p>
        </div>

        <nav className="nirmex-flange-sidebar__nav">
          <ul className="nirmex-flange-sidebar__list" role="list">
            {MASTER_MATERIALS.map((mat, index) => {
              const isActive = isMaterialActive(mat, activeMaterialSlug);
              const label = `${mat.name} ${productDisplayName}`;

              return (
                <li key={mat.slug} className="nirmex-flange-sidebar__item">
                  <NavLink
                    to={buildProductUrl({ product: activeProductSlug, material: mat.slug })}
                    className={`nirmex-flange-sidebar__link ${isActive ? 'nirmex-flange-sidebar__link--active' : ''}`}
                    title={label}
                  >
                    <span className="nirmex-flange-sidebar__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="nirmex-flange-sidebar__label">
                      {label}
                    </span>
                    <svg
                      className="nirmex-flange-sidebar__arrow"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nirmex-flange-sidebar__footer">
          <div className="nirmex-flange-sidebar__cert">
            <span className="nirmex-flange-sidebar__cert-check">✓</span>
            <span>100% Verified Mill Assets</span>
          </div>
          <div className="nirmex-flange-sidebar__cert">
            <span className="nirmex-flange-sidebar__cert-check">✓</span>
            <span>ASME &amp; DIN Compliance</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

// Aliased export for 100% backward compatibility
export const FlangeMaterialSidebar = ProductMaterialSidebar;

export default ProductMaterialSidebar;
