import React, { useState } from 'react';
import { WorldMapSvg } from './WorldMapSvg';
import { FlagIcon } from './FlagIcon';
import { EXPORT_DESTINATIONS_15 } from './export.data';
import './CountriesExport.css';

/**
 * CountriesExport Component - Home Page Section 7
 * Pure World Map Infographic Showcase:
 * - Real, Geographically Accurate World Map (Natural Earth)
 * - Exactly 15 Major Steel & Metal Export Destination Countries
 * - Floating white pill cards with circular flags, country names, concise sector text
 * - Thin dotted leader lines connecting to small red location markers
 * - Deep Brand Red canvas (#8C0600) + Pure White Card (#FFFFFF)
 */
export const CountriesExport = () => {
  const [activeMarkerId, setActiveMarkerId] = useState(null);

  return (
    <section
      id="export-network"
      className="countries-export"
      aria-labelledby="countries-export-heading"
    >
      <div className="countries-export__container">
        {/* =================================================================
            MAIN INFOGRAPHIC WHITE CARD
            ================================================================= */}
        <div className="countries-export__card">
          {/* -------------------------------------------------------------
              1. HEADER: Horizontal Split (Heading + Divider + Description)
              ------------------------------------------------------------- */}
          <header className="countries-export__header">
            {/* Left: Bold Heading */}
            <div className="countries-export__header-left">
              <div className="countries-export__eyebrow-wrap">
                <span className="countries-export__eyebrow-dot" aria-hidden="true" />
                <span className="countries-export__eyebrow">GLOBAL EXPORT NETWORK</span>
              </div>
              <h2 id="countries-export-heading" className="countries-export__title">
                Countries We Export To
              </h2>
            </div>

            {/* Vertical Divider Line */}
            <div className="countries-export__divider" aria-hidden="true" />

            {/* Right: Concise Corporate Export Description */}
            <div className="countries-export__header-right">
              <p className="countries-export__desc">
                Supplying certified high-pressure forged fittings, flanges, industrial fasteners, and seamless piping components to mission-critical infrastructure, petrochemical refineries, power plants, and offshore platforms across 15+ major international markets.
              </p>
            </div>
          </header>

          {/* -------------------------------------------------------------
              2. REAL WORLD MAP INFOGRAPHIC CANVAS
              ------------------------------------------------------------- */}
          <div className="countries-export__map-stage" aria-label="Geographically accurate world export map">
            <div className="countries-export__map-canvas">
              {/* Geographically Authentic Natural Earth SVG Map */}
              <WorldMapSvg className="countries-export__map-base" />

              {/* Vector Dotted Leader Lines & Geographic Anchor Markers */}
              <svg
                className="countries-export__lines-svg"
                viewBox="0 0 1000 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {EXPORT_DESTINATIONS_15.map((dest) => {
                  const isActive = activeMarkerId === dest.id;

                  return (
                    <g
                      key={`leader-${dest.id}`}
                      className={`map-leader-group ${isActive ? 'is-active' : ''}`}
                    >
                      {/* Geographic Anchor Dot at exact country location */}
                      <circle
                        cx={dest.pinX}
                        cy={dest.pinY}
                        r={3.8}
                        fill="#E10600"
                        stroke="#FFFFFF"
                        strokeWidth="1.4"
                      />

                      {/* Subtle Geographic Pulse Ring */}
                      <circle
                        cx={dest.pinX}
                        cy={dest.pinY}
                        r={8}
                        fill="none"
                        stroke="#E10600"
                        strokeWidth="1.2"
                        className="map-pulse-ring"
                      />

                      {/* Thin Dotted Connector Line to Floating Label */}
                      <line
                        x1={dest.pinX}
                        y1={dest.pinY}
                        x2={dest.labelX}
                        y2={dest.labelY}
                        stroke={isActive ? '#E10600' : '#94A3B8'}
                        strokeWidth={isActive ? 1.6 : 1.1}
                        strokeDasharray="2.5 3"
                      />

                      {/* Label Connection Node Dot */}
                      <circle
                        cx={dest.labelX}
                        cy={dest.labelY}
                        r="2.2"
                        fill={isActive ? '#E10600' : '#64748B'}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Floating Country Label Cards (Positioned via % matching 1000x500 coordinates) */}
              <div className="countries-export__labels-layer">
                {EXPORT_DESTINATIONS_15.map((dest) => {
                  const isActive = activeMarkerId === dest.id;

                  return (
                    <div
                      key={`card-${dest.id}`}
                      className={`map-dest-card ${isActive ? 'is-active' : ''}`}
                      style={{
                        left: `${dest.labelX / 10}%`,
                        top: `${dest.labelY / 5}%`,
                      }}
                      onMouseEnter={() => setActiveMarkerId(dest.id)}
                      onMouseLeave={() => setActiveMarkerId(null)}
                      tabIndex="0"
                      role="button"
                      aria-label={`${dest.country}: ${dest.sector}`}
                    >
                      <div className="map-dest-card__flag">
                        <FlagIcon code={dest.code} size={38} />
                      </div>
                      <div className="map-dest-card__body">
                        <span className="map-dest-card__country">{dest.country}</span>
                        <span className="map-dest-card__sector">{dest.sector}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountriesExport;
