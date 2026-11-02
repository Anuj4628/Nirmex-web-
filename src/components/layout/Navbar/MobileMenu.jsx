import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import { MANUFACTURE_DIVISION, SUPPLIER_DIVISION } from '@/config/productsMegaMenu.data';
import { AVAILABLE_MATERIALS } from '@/config/materialsMenu.data';
import { classNames } from '@/utilities/helpers';

/**
 * Mobile Navigation Drawer Component
 * Supports nested Red Products Mega Menu divisions and Materials on mobile devices
 */
export const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  activeId,
  onSelectItem,
  logoSrc,
}) => {
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [materialsExpanded, setMaterialsExpanded] = useState(false);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (!isOpen) {
      setProductsExpanded(false);
      setMaterialsExpanded(false);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (e, item) => {
    if (item.id === 'product') {
      e.preventDefault();
      setProductsExpanded((prev) => !prev);
      return;
    }
    if (item.id === 'material') {
      e.preventDefault();
      setMaterialsExpanded((prev) => !prev);
      return;
    }
    if (!item.isHome) {
      e.preventDefault();
    }
    onSelectItem(item.id);
    onClose();
  };

  const handleCategoryClick = (e, cat) => {
    e.preventDefault();
    if (cat.href.startsWith('/')) {
      navigate(cat.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (cat.href.startsWith('#')) {
      const targetEl = document.querySelector(cat.href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    onSelectItem('product');
    onClose();
  };

  const handleMaterialClick = (e, mat) => {
    e.preventDefault();
    const destination = `/${mat.slug || mat.id}`;
    navigate(destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSelectItem('material');
    onClose();
  };

  const handleQuoteClick = (e) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onClose();
  };

  return (
    <div
      className={classNames(
        'nirmex-mobile-drawer',
        isOpen && 'nirmex-mobile-drawer--open'
      )}
      aria-hidden={!isOpen}
    >
      {/* Backdrop overlay */}
      <div
        className="nirmex-mobile-drawer__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer panel */}
      <div
        ref={drawerRef}
        className="nirmex-mobile-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="nirmex-mobile-drawer__header">
          <a href="/" className="nirmex-mobile-drawer__logo-link" onClick={() => onClose()}>
            <img
              src={logoSrc}
              alt="Nirmex Metal Industries Logo"
              className="nirmex-mobile-drawer__logo-img"
            />
          </a>
          <button
            type="button"
            className="nirmex-mobile-drawer__close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="nirmex-mobile-drawer__nav" aria-label="Mobile Menu">
          <ul className="nirmex-mobile-drawer__list">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              const isProduct = item.id === 'product';
              const isMaterial = item.id === 'material';

              return (
                <li key={item.id} className="nirmex-mobile-drawer__item">
                  <div className="nirmex-mobile-drawer__link-row">
                    <a
                      href={item.href}
                      className={classNames(
                        'nirmex-mobile-drawer__link',
                        isActive && 'nirmex-mobile-drawer__link--active'
                      )}
                      onClick={(e) => handleItemClick(e, item)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="nirmex-mobile-drawer__link-accent" />
                      <span className="nirmex-mobile-drawer__link-label">{item.label}</span>
                    </a>

                    {isProduct && (
                      <button
                        type="button"
                        className={classNames(
                          'nirmex-mobile-drawer__expand-btn',
                          productsExpanded && 'nirmex-mobile-drawer__expand-btn--open'
                        )}
                        onClick={() => setProductsExpanded((prev) => !prev)}
                        aria-expanded={productsExpanded}
                        aria-label="Toggle products categories"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    )}

                    {isMaterial && (
                      <button
                        type="button"
                        className={classNames(
                          'nirmex-mobile-drawer__expand-btn',
                          materialsExpanded && 'nirmex-mobile-drawer__expand-btn--open'
                        )}
                        onClick={() => setMaterialsExpanded((prev) => !prev)}
                        aria-expanded={materialsExpanded}
                        aria-label="Toggle materials categories"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Expandable Mobile Material Menu */}
                  {isMaterial && materialsExpanded && (
                    <div className="nirmex-mobile-mega">
                      <div className="nirmex-mobile-mega__sec">
                        <div className="nirmex-mobile-mega__header">
                          <span className="nirmex-mobile-mega__tag">CERTIFIED MATERIALS</span>
                        </div>
                        <ul className="nirmex-mobile-mega__list">
                          {AVAILABLE_MATERIALS.map((mat) => (
                            <li key={mat.id}>
                              <a
                                href={`/${mat.slug || mat.id}`}
                                className="nirmex-mobile-mega__link"
                                onClick={(e) => handleMaterialClick(e, mat)}
                              >
                                <span className="nirmex-mobile-mega__link-name">{mat.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Expandable Mobile Red Mega Menu Accordion */}
                  {isProduct && productsExpanded && (
                    <div className="nirmex-mobile-mega">
                      {/* Left / First: Manufacture Division */}
                      <div className="nirmex-mobile-mega__sec">
                        <div className="nirmex-mobile-mega__header">
                          <span className="nirmex-mobile-mega__tag">MANUFACTURE DIVISION</span>
                        </div>
                        <ul className="nirmex-mobile-mega__list">
                          {MANUFACTURE_DIVISION.map((cat) => (
                            <li key={cat.id}>
                              <a
                                href={cat.href}
                                className="nirmex-mobile-mega__link"
                                onClick={(e) => handleCategoryClick(e, cat)}
                              >
                                <span className="nirmex-mobile-mega__link-name">
                                  {cat.order && `${cat.order}. `}{cat.name}
                                </span>
                                {cat.subtitle && <span className="nirmex-mobile-mega__link-sub">{cat.subtitle}</span>}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right / Second: Supplier Division */}
                      <div className="nirmex-mobile-mega__sec">
                        <div className="nirmex-mobile-mega__header">
                          <span className="nirmex-mobile-mega__tag">SUPPLIER DIVISION</span>
                        </div>
                        <ul className="nirmex-mobile-mega__list">
                          {SUPPLIER_DIVISION.map((cat, idx) => (
                            <li key={cat.id}>
                              <a
                                href={cat.href}
                                className="nirmex-mobile-mega__link"
                                onClick={(e) => handleCategoryClick(e, cat)}
                              >
                                <span className="nirmex-mobile-mega__link-name">
                                  {idx + 1}. {cat.name}
                                </span>
                                {cat.subtitle && <span className="nirmex-mobile-mega__link-sub">{cat.subtitle}</span>}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer Footer CTA */}
        <div className="nirmex-mobile-drawer__footer">
          <Button
            variant="primary"
            size="lg"
            className="nirmex-mobile-drawer__cta"
            onClick={handleQuoteClick}
            ariaLabel="Request a quote"
          >
            Get Quote
          </Button>
          <p className="nirmex-mobile-drawer__footer-note">
            ISO 9001:2015 Approved Manufacturer
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

