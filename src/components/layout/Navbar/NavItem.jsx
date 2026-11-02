import React from 'react';
import { classNames } from '@/utilities/helpers';

/**
 * Reusable Navigation Item with 3D elevation and soft halo hover effects
 * 
 * @param {Object} props
 * @param {Object} props.item - Nav item configuration { id, label, href, isHome }
 * @param {boolean} props.isActive - Whether this item is currently active
 * @param {Function} props.onSelect - Click handler for item selection
 * @param {React.Ref} props.itemRef - Ref attached to anchor for indicator tracking
 */
export const NavItem = ({
  item,
  isActive,
  onSelect,
  itemRef,
  hasDropdown = false,
  isDropdownOpen = false,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  const handleClick = (e) => {
    // Only Home navigates functionally per strict scope
    if (!item.isHome) {
      e.preventDefault();
    }
    if (onSelect) {
      onSelect(item.id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  };

  return (
    <li
      className={classNames(
        'nirmex-nav__item-wrapper',
        hasDropdown && 'nirmex-nav__item-wrapper--has-dropdown',
        isDropdownOpen && 'nirmex-nav__item-wrapper--open'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <a
        ref={itemRef}
        href={item.href}
        className={classNames(
          'nirmex-nav__item',
          isActive && 'nirmex-nav__item--active',
          isDropdownOpen && 'nirmex-nav__item--dropdown-active'
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-current={isActive ? 'page' : undefined}
        aria-haspopup={hasDropdown ? 'true' : undefined}
        aria-expanded={hasDropdown ? isDropdownOpen : undefined}
        role="menuitem"
        tabIndex={0}
      >
        {/* Animated thin red top indicator on hover */}
        <span className="nirmex-nav__hover-bar" aria-hidden="true" />
        
        {/* Soft blurred halo layer */}
        <span className="nirmex-nav__halo" aria-hidden="true" />
        
        {/* Nav Item Label */}
        <span className="nirmex-nav__text">{item.label}</span>

        {/* Dropdown Chevron Indicator */}
        {hasDropdown && (
          <span
            className={classNames(
              'nirmex-nav__chevron',
              isDropdownOpen && 'nirmex-nav__chevron--rotated'
            )}
            aria-hidden="true"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        )}
      </a>
      {children}
    </li>
  );
};

export default NavItem;
