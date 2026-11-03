import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import MobileMenu from './MobileMenu';
import ProductsMegaMenu from './ProductsMegaMenu';
import MaterialDropdown from './MaterialDropdown';
import Button from '@/components/common/Button/Button';
import { NAV_ITEMS, CTA_CONFIG } from '@/config/navigation.config';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { classNames } from '@/utilities/helpers';
import nirmexLogo from '@/assets/logos/nirmex-logo.png';
import './Navbar.css';

/**
 * Premium Industrial Navbar for NIRMEX METAL INDUSTRIES
 * 
 * Features:
 * - Direct authentic logo integration with large rendered scale
 * - Creative active indicator: thin red top line that smoothly animates and slides between items
 * - Premium Red Mega Menu Dropdown for Products:
 *     Left:  MANUFACTURE DIVISION (Mandatory 1-7 order + verified mfg lines)
 *     Right: SUPPLIER DIVISION (Verified supply lines)
 * - Industrial CTA "Get Quote" button in brand red
 * - Fixed scroll behavior with compact height and refined elevation shadow
 * - Accessible mobile hamburger drawer with nested product divisions
 */
export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItemId, setActiveItemId] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [materialMenuOpen, setMaterialMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition(20);

  const headerRef = useRef(null);
  const megaMenuTimerRef = useRef(null);
  const materialMenuTimerRef = useRef(null);

  // Sync active nav item with route changes
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const isMaterialPath = [
      '/stainless-steel',
      '/carbon-steel',
      '/alloy-steel',
      '/duplex-super-duplex',
      '/duplex-stainless-steel',
      '/super-duplex-stainless-steel',
      '/nickel-alloy',
      '/inconel',
      '/monel',
      '/hastelloy',
      '/titanium',
      '/copper',
      '/aluminium',
      '/high-alloy',
    ].some((m) => path === m || path.startsWith(m + '/')) || path.startsWith('/materials') || path.startsWith('/material');

    if (isMaterialPath) {
      setActiveItemId('material');
    } else if (path.startsWith('/products/') || path.includes('-manufactured-in-mumbai')) {
      setActiveItemId('product');
    } else if (path === '/about' || path === '/about-us') {
      setActiveItemId('about');
    } else if (path === '/contact' || path === '/contact-us') {
      setActiveItemId('contact');
    } else if (path === '/' && !location.hash) {
      setActiveItemId('home');
    }
  }, [location.pathname, location.hash]);

  // References for sliding active top-border indicator
  const navListRef = useRef(null);
  const itemRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    opacity: 0,
  });

  // Calculate sliding indicator coordinates based on active item
  const updateIndicator = useCallback(() => {
    const navListEl = navListRef.current;
    const activeEl = itemRefs.current[activeItemId];

    if (navListEl && activeEl) {
      const navListRect = navListEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      const left = activeRect.left - navListRect.left;
      const top = activeRect.top - navListRect.top;
      const width = activeRect.width;

      setIndicatorStyle({
        left,
        top,
        width,
        opacity: 1,
      });
    }
  }, [activeItemId]);

  // Update on selection, window resize, and font rendering
  useEffect(() => {
    updateIndicator();

    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener('resize', handleResize);

    if (document.fonts) {
      document.fonts.ready.then(updateIndicator);
    }

    const timer = setTimeout(updateIndicator, 60);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [updateIndicator]);

  // Handle global Escape key and click-outside for Mega Menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMegaMenuOpen(false);
        setMaterialMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMegaMenuOpen(false);
        setMaterialMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectItem = (id) => {
    setActiveItemId(id);
    if (id === 'product') {
      setMaterialMenuOpen(false);
      setMegaMenuOpen((prev) => !prev);
    } else if (id === 'material') {
      setMegaMenuOpen(false);
      setMaterialMenuOpen((prev) => !prev);
    } else {
      setMegaMenuOpen(false);
      setMaterialMenuOpen(false);
      if (id === 'home') {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (id === 'about') {
        navigate('/about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (id === 'contact') {
        navigate('/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        if (location.pathname !== '/') {
          navigate(`/#${id}`);
          setTimeout(() => {
            const el = document.querySelector(`#${id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 120);
        } else {
          const el = document.querySelector(`#${id}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleMouseEnterItem = (id) => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
    }
    if (materialMenuTimerRef.current) {
      clearTimeout(materialMenuTimerRef.current);
    }
    if (id === 'product') {
      setMaterialMenuOpen(false);
      setMegaMenuOpen(true);
    } else if (id === 'material') {
      setMegaMenuOpen(false);
      setMaterialMenuOpen(true);
    } else {
      // Smooth delay before closing when hovering other items
      megaMenuTimerRef.current = setTimeout(() => {
        setMegaMenuOpen(false);
      }, 100);
      materialMenuTimerRef.current = setTimeout(() => {
        setMaterialMenuOpen(false);
      }, 100);
    }
  };

  const handleMouseLeaveItem = (id) => {
    if (id === 'product') {
      megaMenuTimerRef.current = setTimeout(() => {
        setMegaMenuOpen(false);
      }, 180);
    } else if (id === 'material') {
      materialMenuTimerRef.current = setTimeout(() => {
        setMaterialMenuOpen(false);
      }, 180);
    }
  };

  const handleQuoteClick = (e) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl && location.pathname === '/') {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className={classNames(
        'nirmex-header',
        isScrolled && 'nirmex-header--scrolled'
      )}
    >
      <div className="nirmex-header__inner">
        {/* Left: Brand Logo (prominent & clickable) */}
        <div className="nirmex-header__brand">
          <a
            href="/"
            className="nirmex-header__logo-link"
            aria-label="Nirmex Metal Industries Homepage"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveItemId('home');
              setMegaMenuOpen(false);
              setMaterialMenuOpen(false);
            }}
          >
            <img
              src={nirmexLogo}
              alt="Nirmex Metal Industries"
              className="nirmex-header__logo-img"
              width="240"
              height="80"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="nirmex-header__nav"
          aria-label="Main Navigation"
        >
          <ul
            ref={navListRef}
            className="nirmex-nav__list"
            role="menubar"
          >
            {/* Smooth Horizontal Sliding Active Red Top Indicator */}
            <div
              className="nirmex-nav__active-slider"
              style={{
                transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />

            {NAV_ITEMS.map((item) => {
              const isProduct = item.id === 'product';
              const isMaterial = item.id === 'material';
              const hasDropdown = isProduct || isMaterial;
              const isDropdownOpen = (isProduct && megaMenuOpen) || (isMaterial && materialMenuOpen);
              return (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeItemId === item.id}
                  onSelect={handleSelectItem}
                  itemRef={(el) => (itemRefs.current[item.id] = el)}
                  hasDropdown={hasDropdown}
                  isDropdownOpen={isDropdownOpen}
                  onMouseEnter={() => handleMouseEnterItem(item.id)}
                  onMouseLeave={() => handleMouseLeaveItem(item.id)}
                >
                  {isProduct && (
                    <ProductsMegaMenu
                      isOpen={megaMenuOpen}
                      onClose={() => setMegaMenuOpen(false)}
                      onItemClick={() => {
                        setActiveItemId('product');
                        setMegaMenuOpen(false);
                      }}
                    />
                  )}
                  {isMaterial && (
                    <MaterialDropdown
                      isOpen={materialMenuOpen}
                      onClose={() => setMaterialMenuOpen(false)}
                      onItemClick={() => {
                        setActiveItemId('material');
                        setMaterialMenuOpen(false);
                      }}
                    />
                  )}
                </NavItem>
              );
            })}
          </ul>
        </nav>

        {/* Right: Primary Call to Action Button */}
        <div className="nirmex-header__actions">
          <Button
            variant="primary"
            size="md"
            className="nirmex-header__cta-btn"
            onClick={handleQuoteClick}
            ariaLabel={CTA_CONFIG.ariaLabel}
          >
            {CTA_CONFIG.label}
          </Button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            className={classNames(
              'nirmex-header__hamburger',
              mobileMenuOpen && 'nirmex-header__hamburger--open'
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="nirmex-header__hamburger-bar" />
            <span className="nirmex-header__hamburger-bar" />
            <span className="nirmex-header__hamburger-bar" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        activeId={activeItemId}
        onSelectItem={handleSelectItem}
        logoSrc={nirmexLogo}
      />
    </header>
  );
};

export default Navbar;
