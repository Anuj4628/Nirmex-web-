import React from 'react';
import './Button.css';

/**
 * Reusable Industrial Button Component
 * Designed specifically for NIRMEX METAL INDUSTRIES design system
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 * @param {Function} [props.onClick]
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 * @param {string} [props.ariaLabel]
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
  type = 'button',
  ariaLabel,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`nirmex-btn nirmex-btn--${variant} nirmex-btn--${size} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      <span className="nirmex-btn__content">{children}</span>
    </button>
  );
};

export default Button;

