import React, { useId } from 'react';

/**
 * FlagIcon Component - Vector SVG Circular Country Flags
 * Crisp, high-definition, authentic national flags
 * 
 * @param {Object} props
 * @param {string} props.code - 2-letter ISO country code (e.g. 'US', 'DE', 'SA')
 * @param {number} [props.size=32] - Diameter in pixels
 * @param {string} [props.className] - Extra CSS classes
 */
export const FlagIcon = ({ code, size = 32, className = '' }) => {
  const c = code?.toUpperCase();

  const renderFlagContent = () => {
    switch (c) {
      case 'US': // United States
        return (
          <>
            <rect width="32" height="32" fill="#B22234" />
            <path d="M0,4.92h32M0,9.85h32M0,14.77h32M0,19.69h32M0,24.62h32M0,29.54h32" stroke="#FFFFFF" strokeWidth="2.46" />
            <rect width="13" height="17.2" fill="#3C3B6E" />
            <circle cx="3.5" cy="4" r="0.9" fill="#FFFFFF" />
            <circle cx="9.5" cy="4" r="0.9" fill="#FFFFFF" />
            <circle cx="6.5" cy="7" r="0.9" fill="#FFFFFF" />
            <circle cx="3.5" cy="10" r="0.9" fill="#FFFFFF" />
            <circle cx="9.5" cy="10" r="0.9" fill="#FFFFFF" />
            <circle cx="6.5" cy="13" r="0.9" fill="#FFFFFF" />
          </>
        );

      case 'CA': // Canada
        return (
          <>
            <rect width="8" height="32" fill="#D80027" />
            <rect x="8" width="16" height="32" fill="#FFFFFF" />
            <rect x="24" width="8" height="32" fill="#D80027" />
            {/* Stylized Maple Leaf */}
            <path
              d="M16 8.5L17.5 13L20 12L18.5 15.5L21.5 17L18.5 18L19.5 21L16.5 19.5L16.8 23.5H15.2L15.5 19.5L12.5 21L13.5 18L10.5 17L13.5 15.5L12 12L14.5 13Z"
              fill="#D80027"
            />
          </>
        );

      case 'GB': // United Kingdom
        return (
          <>
            <rect width="32" height="32" fill="#012169" />
            {/* White Diagonals */}
            <path d="M0 0L32 32M32 0L0 32" stroke="#FFFFFF" strokeWidth="5" />
            {/* Red Diagonals */}
            <path d="M0 0L32 32M32 0L0 32" stroke="#C8102E" strokeWidth="2.6" />
            {/* White Cross */}
            <path d="M16 0V32M0 16H32" stroke="#FFFFFF" strokeWidth="8" />
            {/* Red Cross */}
            <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="4.8" />
          </>
        );

      case 'DE': // Germany
        return (
          <>
            <rect width="32" height="10.66" fill="#000000" />
            <rect y="10.66" width="32" height="10.66" fill="#DD0000" />
            <rect y="21.33" width="32" height="10.67" fill="#FFCE00" />
          </>
        );

      case 'IT': // Italy
        return (
          <>
            <rect width="10.66" height="32" fill="#009246" />
            <rect x="10.66" width="10.66" height="32" fill="#FFFFFF" />
            <rect x="21.33" width="10.67" height="32" fill="#CE2B37" />
          </>
        );

      case 'NL': // Netherlands
        return (
          <>
            <rect width="32" height="10.66" fill="#AE1C28" />
            <rect y="10.66" width="32" height="10.66" fill="#FFFFFF" />
            <rect y="21.33" width="32" height="10.67" fill="#21468B" />
          </>
        );

      case 'SA': // Saudi Arabia
        return (
          <>
            <rect width="32" height="32" fill="#006C35" />
            {/* Stylized White Inscription & Sword */}
            <path d="M7 14h18M8 12h16M9 16h14" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
            <path d="M7 20h18l-3-2M8 20v2" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </>
        );

      case 'AE': // United Arab Emirates
        return (
          <>
            <rect width="8" height="32" fill="#FF0000" />
            <rect x="8" width="24" height="10.66" fill="#00732F" />
            <rect x="8" y="10.66" width="24" height="10.66" fill="#FFFFFF" />
            <rect x="8" y="21.33" width="24" height="10.67" fill="#000000" />
          </>
        );

      case 'SG': // Singapore
        return (
          <>
            <rect width="32" height="16" fill="#ED2939" />
            <rect y="16" width="32" height="16" fill="#FFFFFF" />
            {/* Crescent and Stars */}
            <path d="M7 6a5 5 0 0 0 0 8 4 4 0 0 1 0-8z" fill="#FFFFFF" />
            <circle cx="11" cy="7.5" r="0.75" fill="#FFFFFF" />
            <circle cx="13" cy="9" r="0.75" fill="#FFFFFF" />
            <circle cx="13" cy="11.5" r="0.75" fill="#FFFFFF" />
            <circle cx="11" cy="13" r="0.75" fill="#FFFFFF" />
            <circle cx="9.5" cy="10.25" r="0.75" fill="#FFFFFF" />
          </>
        );

      case 'AU': // Australia
        return (
          <>
            <rect width="32" height="32" fill="#00008B" />
            {/* Mini Union Jack */}
            <g transform="scale(0.5)">
              <rect width="32" height="32" fill="#012169" />
              <path d="M0 0L32 32M32 0L0 32" stroke="#FFFFFF" strokeWidth="5" />
              <path d="M0 0L32 32M32 0L0 32" stroke="#C8102E" strokeWidth="2.6" />
              <path d="M16 0V32M0 16H32" stroke="#FFFFFF" strokeWidth="8" />
              <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="4.8" />
            </g>
            {/* Commonwealth Star & Southern Cross */}
            <circle cx="8" cy="24" r="2.2" fill="#FFFFFF" />
            <circle cx="24" cy="8" r="1.1" fill="#FFFFFF" />
            <circle cx="21" cy="15" r="1.1" fill="#FFFFFF" />
            <circle cx="27" cy="17" r="1.1" fill="#FFFFFF" />
            <circle cx="24" cy="24" r="1.4" fill="#FFFFFF" />
          </>
        );

      case 'BR': // Brazil
        return (
          <>
            <rect width="32" height="32" fill="#009C3B" />
            {/* Yellow Rhombus */}
            <polygon points="16,3 29,16 16,29 3,16" fill="#FFDF00" />
            {/* Blue Circle */}
            <circle cx="16" cy="16" r="6" fill="#002776" />
            {/* White Band */}
            <path d="M10.8 17.5a6 6 0 0 1 10.4-3" stroke="#FFFFFF" strokeWidth="1" fill="none" />
          </>
        );

      case 'FR': // France
        return (
          <>
            <rect width="10.66" height="32" fill="#002395" />
            <rect x="10.66" width="10.66" height="32" fill="#FFFFFF" />
            <rect x="21.33" width="10.67" height="32" fill="#ED2939" />
          </>
        );

      case 'KR': // South Korea
        return (
          <>
            <rect width="32" height="32" fill="#FFFFFF" />
            <circle cx="16" cy="16" r="6.5" fill="#CD2E3A" />
            <path d="M9.5 16a6.5 6.5 0 0 0 13 0c0-3.6-2.9-3.2-6.5-3.2s-6.5 3.2-6.5 3.2z" fill="#0047A0" />
            {/* Trigrams */}
            <rect x="4" y="6" width="4" height="1" fill="#000000" />
            <rect x="4" y="8" width="4" height="1" fill="#000000" />
            <rect x="24" y="23" width="4" height="1" fill="#000000" />
            <rect x="24" y="25" width="4" height="1" fill="#000000" />
          </>
        );

      case 'JP': // Japan
        return (
          <>
            <rect width="32" height="32" fill="#FFFFFF" />
            <circle cx="16" cy="16" r="7.5" fill="#BC002D" />
          </>
        );

      case 'OM': // Oman
        return (
          <>
            <rect width="8" height="32" fill="#DB161B" />
            <rect x="8" width="24" height="10.66" fill="#FFFFFF" />
            <rect x="8" y="10.66" width="24" height="10.66" fill="#DB161B" />
            <rect x="8" y="21.33" width="24" height="10.67" fill="#008000" />
          </>
        );

      case 'QA': // Qatar
        return (
          <>
            <rect width="11" height="32" fill="#FFFFFF" />
            <rect x="11" width="21" height="32" fill="#8D1B3D" />
            <polygon points="11,0 13,3 11,6 13,9 11,12 13,15 11,18 13,21 11,24 13,27 11,30 13,32 11,32" fill="#FFFFFF" />
          </>
        );

      case 'ES': // Spain
        return (
          <>
            <rect width="32" height="8" fill="#AA151B" />
            <rect y="8" width="32" height="16" fill="#F1BF00" />
            <rect y="24" width="32" height="8" fill="#AA151B" />
            <circle cx="10" cy="16" r="2.5" fill="#AA151B" />
          </>
        );

      case 'ZA': // South Africa
        return (
          <>
            <rect width="32" height="16" fill="#E03C31" />
            <rect y="16" width="32" height="16" fill="#001489" />
            {/* Green Y and Black Chevron */}
            <polygon points="0,0 14,16 0,32" fill="#000000" />
            <polygon points="0,0 2,0 16,16 2,32 0,32 13,16" fill="#FFB81C" />
            <path d="M0 0l16 16L0 32" stroke="#007749" strokeWidth="4.5" fill="none" />
            <path d="M14 16H32" stroke="#007749" strokeWidth="6.5" />
            <path d="M14 16H32" stroke="#FFFFFF" strokeWidth="9" strokeDasharray="0,6.5" fill="none" />
          </>
        );

      case 'IN': // India (Origin Hub)
        return (
          <>
            <rect width="32" height="10.66" fill="#FF9933" />
            <rect y="10.66" width="32" height="10.66" fill="#FFFFFF" />
            <rect y="21.33" width="32" height="10.67" fill="#138808" />
            <circle cx="16" cy="16" r="3.2" stroke="#000080" strokeWidth="0.8" fill="none" />
            <circle cx="16" cy="16" r="0.8" fill="#000080" />
            {/* Ashoka Chakra 24 spokes (represented cleanly in SVG) */}
            <path d="M16 12.8v6.4M12.8 16h6.4M13.7 13.7l4.6 4.6M18.3 13.7l-4.6 4.6" stroke="#000080" strokeWidth="0.5" />
          </>
        );

      case 'MX': // Mexico
        return (
          <>
            <rect width="10.66" height="32" fill="#006847" />
            <rect x="10.66" width="10.66" height="32" fill="#FFFFFF" />
            <rect x="21.33" width="10.67" height="32" fill="#CE1126" />
            <circle cx="16" cy="16" r="2.8" fill="#8B5A2B" />
            <circle cx="16" cy="16" r="1.6" fill="#006847" />
          </>
        );

      case 'BE': // Belgium
        return (
          <>
            <rect width="10.66" height="32" fill="#000000" />
            <rect x="10.66" width="10.66" height="32" fill="#FDDA24" />
            <rect x="21.33" width="10.67" height="32" fill="#EF3340" />
          </>
        );

      case 'EG': // Egypt
        return (
          <>
            <rect width="32" height="10.66" fill="#C8102E" />
            <rect y="10.66" width="32" height="10.66" fill="#FFFFFF" />
            <rect y="21.33" width="32" height="10.67" fill="#000000" />
            {/* Eagle of Saladin in gold */}
            <path d="M14.5 14h3l-.5 4h-2z" fill="#C09A35" />
          </>
        );

      case 'MY': // Malaysia
        return (
          <>
            <rect width="32" height="32" fill="#CC0000" />
            <path d="M0,4.5h32M0,9h32M0,13.5h32M0,18h32M0,22.5h32M0,27h32" stroke="#FFFFFF" strokeWidth="2.2" />
            <rect width="16" height="16" fill="#000066" />
            <path d="M6 5a4 4 0 0 0 0 6 3 3 0 0 1 0-6z" fill="#FFCC00" />
            <polygon points="10,6.5 11,8 12.5,7.5 11.5,9 13,10 11.5,10.5 12,12 10.5,11.5 9.5,13 9,11.5 7.5,12 8.5,10.5 7,10 8.5,9 7.5,7.5 9,8" fill="#FFCC00" />
          </>
        );

      case 'ID': // Indonesia
        return (
          <>
            <rect width="32" height="16" fill="#FF0000" />
            <rect y="16" width="32" height="16" fill="#FFFFFF" />
          </>
        );

      case 'NP': // Nepal
        return (
          <>
            <rect width="32" height="32" fill="#003893" />
            <polygon points="4,2 26,14 12,14 26,28 4,28" fill="#DC143C" />
            <circle cx="10" cy="10" r="2.5" fill="#FFFFFF" />
            <circle cx="10" cy="22" r="3" fill="#FFFFFF" />
          </>
        );

      default:
        return (
          <>
            <rect width="32" height="32" fill="#E5E7EB" />
            <circle cx="16" cy="16" r="6" fill="#9CA3AF" />
          </>
        );
    }
  };

  const clipId = useId();

  return (
    <svg
      className={`flag-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'inline-block',
        flexShrink: 0,
      }}
    >
      <clipPath id={clipId}>
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {renderFlagContent()}
      </g>
    </svg>
  );
};

export default FlagIcon;

