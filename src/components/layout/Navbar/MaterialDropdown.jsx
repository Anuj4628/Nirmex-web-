import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_MATERIALS } from '@/config/materialsMenu.data';
import './MaterialDropdown.css';

/**
 * MaterialDropdown Component
 * 
 * Recreates the exact layout, dimensions, proportions, and visual style from ProductsMegaMenu:
 * - Simple, clean, modern sans-serif typography throughout
 * - Background matched precisely to the website's authentic brand red gradient
 * - Upward pointer notch pointing directly to the active navbar item
 * - Clean subtle right-facing chevrons (›)
 * - Names only — simple, clean, and consistent
 * - Seamless direct navigation to dedicated material pages (/stainless-steel, etc.)
 */
export const MaterialDropdown = ({ isOpen, onClose, onItemClick }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    const destination = `/${item.slug || item.id}`;
    navigate(destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onItemClick) {
      onItemClick(item);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="nirmex-material-menu"
      role="menu"
      aria-label="Materials Dropdown Menu"
    >
      {/* Invisible hover bridge to eliminate pointer dropouts across navbar gap */}
      <div className="nirmex-material-menu__hover-bridge" aria-hidden="true" />

      {/* Upward pointing notch centered directly under navbar item */}
      <div className="nirmex-material-menu__notch" aria-hidden="true">
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
          <polygon points="0,8 8,0 16,8" fill="#BA0500" />
        </svg>
      </div>

      {/* Material Names List — Names Only */}
      <ul className="nirmex-material-menu__list" role="none">
        {AVAILABLE_MATERIALS.map((mat) => (
          <li key={mat.id} role="none" className="nirmex-material-menu__item">
            <a
              href={`/${mat.slug || mat.id}`}
              className="nirmex-material-link"
              role="menuitem"
              onClick={(e) => handleLinkClick(e, mat)}
            >
              <span className="nirmex-material-link__name">{mat.name}</span>
              <span className="nirmex-material-link__chevron" aria-hidden="true">›</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialDropdown;

