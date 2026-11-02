import React from 'react';
import {
  WORLD_VIEWBOX,
  WORLD_LAND_PATH,
  WORLD_BORDERS_PATH,
  WORLD_GRATICULE_PATH,
} from './worldMapPaths';

/**
 * WorldMapSvg Component - Real, Geographically Accurate World Map
 * Sourced directly from Natural Earth 110m vector data via Natural Earth 1 projection.
 * Rendered in subtle corporate silver-grey with recognized international boundaries.
 */
export const WorldMapSvg = ({ className = '' }) => {
  return (
    <svg
      className={`world-map-svg ${className}`}
      viewBox={WORLD_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Geographically accurate world map showing international export destinations"
    >
      {/* 1. Subtle Graticule Grid (30-degree meridians & parallels) */}
      <path
        d={WORLD_GRATICULE_PATH}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="0.65"
        strokeDasharray="2 3"
        opacity="0.8"
      />

      {/* 2. Geographically Accurate Continental Landmasses (Natural Earth 110m) */}
      <path
        d={WORLD_LAND_PATH}
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="0.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 3. Recognized Sovereign Country Borders */}
      <path
        d={WORLD_BORDERS_PATH}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WorldMapSvg;
