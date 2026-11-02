import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MANUFACTURE_DIVISION, SUPPLIER_DIVISION } from '@/config/productsMegaMenu.data';
import './ProductsMegaMenu.css';

/**
 * ProductsMegaMenu Component
 * 
 * Recreates the exact layout, dimensions, proportions, and visual style from the reference:
 * - 9 products on Left (MANUFACTURE DIVISION)
 * - 9 products on Right (SUPPLIER DIVISION)
 * - Total 18 categories
 * - Compact width (~580px), centered directly beneath the Products navbar item
 * - Upward pointer notch pointing directly to the active navbar item
 * - Darker translucent top bar: PRODUCT CATALOG (18 CATEGORIES)
 * - Two equal columns with thin vertical divider
 * - Clean text links with subtle right chevrons (›)
 * - Darker translucent bottom bar: EN 10204 3.1 Certified Stock | VIEW ALL 18 CATEGORIES DIRECTORY →
 */
export const ProductsMegaMenu = ({ isOpen, onClose, onItemClick }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const totalCategories = MANUFACTURE_DIVISION.length + SUPPLIER_DIVISION.length;

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    if (item.href) {
      if (item.href.startsWith('/')) {
        navigate(item.href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (item.href.startsWith('#')) {
        const targetEl = document.querySelector(item.href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    if (onItemClick) {
      onItemClick(item);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const productSec = document.querySelector('#product');
      if (productSec) {
        productSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    if (onItemClick) {
      onItemClick({ id: 'all-products', name: 'All Products', href: '#product' });
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="nirmex-mega-menu"
      role="region"
      aria-label="Products Catalog Mega Menu"
    >
      {/* Invisible hover bridge to eliminate pointer dropouts across navbar gap */}
      <div className="nirmex-mega-menu__hover-bridge" aria-hidden="true" />

      {/* Upward pointing notch centered directly under navbar item */}
      <div className="nirmex-mega-menu__notch" aria-hidden="true">
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
          <polygon points="0,8 8,0 16,8" fill="#160201" />
        </svg>
      </div>

      {/* TOP HEADER STRIP */}
      <div className="nirmex-mega-menu__topbar">
        <div className="nirmex-mega-menu__topbar-left">
          <span className="nirmex-mega-menu__topbar-dot" aria-hidden="true" />
          <span className="nirmex-mega-menu__topbar-title">
            PRODUCT CATALOG ({totalCategories} CATEGORIES)
          </span>
        </div>
        <div className="nirmex-mega-menu__topbar-right">
          <span>Priority &amp; Extended Catalog</span>
        </div>
      </div>

      {/* MAIN TWO-COLUMN BODY */}
      <div className="nirmex-mega-menu__body">
        {/* LEFT COLUMN: MANUFACTURE DIVISION (9 Products) */}
        <div className="nirmex-mega-menu__column">
          <div className="nirmex-mega-menu__col-header">
            <svg
              className="nirmex-mega-menu__col-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M17 18h1" />
              <path d="M12 18h1" />
              <path d="M7 18h1" />
            </svg>
            <h4 className="nirmex-mega-menu__col-title">
              MANUFACTURE DIVISION ({MANUFACTURE_DIVISION.length})
            </h4>
          </div>

          <div className="nirmex-mega-menu__list" role="list">
            {MANUFACTURE_DIVISION.map((cat) => (
              <a
                key={cat.id}
                href={cat.href}
                className="nirmex-mega-link"
                onClick={(e) => handleLinkClick(e, cat)}
                role="listitem"
              >
                <span className="nirmex-mega-link__name">{cat.name}</span>
                <span className="nirmex-mega-link__chevron" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* THIN VERTICAL DIVIDER */}
        <div className="nirmex-mega-menu__divider" aria-hidden="true" />

        {/* RIGHT COLUMN: SUPPLIER DIVISION (9 Products) */}
        <div className="nirmex-mega-menu__column">
          <div className="nirmex-mega-menu__col-header">
            <svg
              className="nirmex-mega-menu__col-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <h4 className="nirmex-mega-menu__col-title">
              SUPPLIER DIVISION ({SUPPLIER_DIVISION.length})
            </h4>
          </div>

          <div className="nirmex-mega-menu__list" role="list">
            {SUPPLIER_DIVISION.map((cat) => (
              <a
                key={cat.id}
                href={cat.href}
                className="nirmex-mega-link"
                onClick={(e) => handleLinkClick(e, cat)}
                role="listitem"
              >
                <span className="nirmex-mega-link__name">{cat.name}</span>
                <span className="nirmex-mega-link__chevron" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER STRIP */}
      <div className="nirmex-mega-menu__bottombar">
        <span className="nirmex-mega-menu__bottombar-spec">
          EN 10204 3.1 Certified Stock
        </span>
        <a
          href="#product"
          className="nirmex-mega-menu__bottombar-link"
          onClick={handleViewAllClick}
        >
          <span>VIEW ALL {totalCategories} CATEGORIES DIRECTORY</span>
          <span className="nirmex-mega-menu__bottombar-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
};

export default ProductsMegaMenu;
