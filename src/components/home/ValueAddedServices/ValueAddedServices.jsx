import React from 'react';
import cuttingImg from '@/assets/services/service-01-cutting.jpg';
import sizingImg from '@/assets/services/service-02-custom-sizing.jpg';
import inspectionImg from '@/assets/services/service-03-material-inspection.jpg';
import finishingImg from '@/assets/services/service-04-surface-finishing.jpg';
import packagingImg from '@/assets/services/service-05-packaging.jpg';
import './ValueAddedServices.css';

/**
 * ValueAddedServices Component - Home Page Section 4
 * Asymmetric Modular Card Grid:
 * Row 1: Large Featured Card (Precision Cut-to-Length) + Dark High-Contrast Card (Testing & Inspection)
 * Row 2: White Card (CNC Machining) + White Card (Surface Finishing) + Solid Brand Red Feature Card (Export Packaging)
 */
export const ValueAddedServices = () => {
  return (
    <section
      id="services"
      className="value-added-services"
      aria-labelledby="value-added-services-heading"
    >
      <div className="value-added-services__container">
        {/* =================================================================
            1. SECTION HEADER
            ================================================================= */}
        <header className="value-added-services__header">
          <div className="value-added-services__label">
            <span className="value-added-services__label-indicator" aria-hidden="true" />
            <span className="value-added-services__label-text">VALUE ADDED SERVICES</span>
          </div>

          <h2 id="value-added-services-heading" className="value-added-services__heading">
            More Than Supply.{' '}
            <span className="value-added-services__highlight">We Add Value.</span>
          </h2>

          <p className="value-added-services__subtitle">
            Beyond standard mill supply, we provide specialized in-house material processing, precision machining, rigorous testing, and protective preparation—delivering engineered components ready for immediate deployment in mission-critical applications.
          </p>
        </header>

        {/* =================================================================
            2. MODULAR ASYMMETRICAL GRID
            ================================================================= */}
        <div className="value-added-services__grid">
          {/* -------------------------------------------------------------
              ROW 1: Large Card (58%) + Dark Medium Card (42%)
              ------------------------------------------------------------- */}
          <div className="value-added-services__row value-added-services__row--top">
            {/* Card 1: Precision Cut-to-Length (Large Card with Horizontal Split) */}
            <article className="value-service-card value-service-card--large" tabIndex="0">
              <div className="value-service-card__inner--large">
                <div className="value-service-card__content">
                  <div className="value-service-card__top">
                    <span className="value-service-card__tag">PROCESSING</span>
                    <span className="value-service-card__spec">TOLERANCE ±1MM</span>
                  </div>

                  <h3 className="value-service-card__title">Precision Cut-to-Length</h3>
                  <p className="value-service-card__tagline">Cold Sawing & High-Capacity Band Sawing</p>

                  <p className="value-service-card__desc">
                    High-accuracy dimensional cutting for pipes, tubes, round bars, and heavy plates with minimal kerf loss and perfectly square cut ends ready for fabrication.
                  </p>

                  <div className="value-service-card__features">
                    <span className="value-service-card__feature-chip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Square Cut Faces
                    </span>
                    <span className="value-service-card__feature-chip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Zero Edge Distortion
                    </span>
                  </div>
                </div>

                <div className="value-service-card__media value-service-card__media--large">
                  <img
                    src={cuttingImg}
                    alt="Precision industrial band sawing and cold cut processing"
                    className="value-service-card__img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </article>

            {/* Card 2: Testing & Inspection (Dark Industrial Accent Card) */}
            <article className="value-service-card value-service-card--dark" tabIndex="0">
              <div className="value-service-card__top">
                <span className="value-service-card__tag value-service-card__tag--red">QUALITY ASSURANCE</span>
                <span className="value-service-card__spec value-service-card__spec--dark">EN 10204 3.1 & 3.2</span>
              </div>

              <div className="value-service-card__media value-service-card__media--compact">
                <img
                  src={inspectionImg}
                  alt="Industrial positive material identification PMI and ultrasonic testing"
                  className="value-service-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="value-service-card__body">
                <h3 className="value-service-card__title value-service-card__title--white">
                  Testing & Material Inspection
                </h3>
                <p className="value-service-card__tagline value-service-card__tagline--muted">
                  100% Heat Traceability & TPI Verification
                </p>
                <p className="value-service-card__desc value-service-card__desc--light">
                  Complete positive material identification (PMI), ultrasonic testing, hydrostatic verification, and independent third-party witnessing (TUV, DNV, Lloyd’s).
                </p>
              </div>
            </article>
          </div>

          {/* -------------------------------------------------------------
              ROW 2: 3 Cards (White Medium + White Medium + Solid Red Feature)
              ------------------------------------------------------------- */}
          <div className="value-added-services__row value-added-services__row--bottom">
            {/* Card 3: CNC Machining & Threading */}
            <article className="value-service-card value-service-card--medium" tabIndex="0">
              <div className="value-service-card__top">
                <span className="value-service-card__tag">MACHINING</span>
                <span className="value-service-card__spec">CLIENT DRAWINGS</span>
              </div>

              <div className="value-service-card__media value-service-card__media--standard">
                <img
                  src={sizingImg}
                  alt="CNC machining, facing and precision threading of metal components"
                  className="value-service-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="value-service-card__body">
                <h3 className="value-service-card__title">CNC Machining & Sizing</h3>
                <p className="value-service-card__tagline">Precision Facing, Boring & Profiling</p>
                <p className="value-service-card__desc">
                  Tailored CNC lathe turning, weld beveling, wall thickness calibration, and customized threading to exact client CAD engineering drawings.
                </p>
              </div>
            </article>

            {/* Card 4: Surface Finishing & Passivation */}
            <article className="value-service-card value-service-card--medium" tabIndex="0">
              <div className="value-service-card__top">
                <span className="value-service-card__tag">FINISHING</span>
                <span className="value-service-card__spec">CORROSION PROOF</span>
              </div>

              <div className="value-service-card__media value-service-card__media--standard">
                <img
                  src={finishingImg}
                  alt="Surface passivation, mirror polishing, and chemical pickling treatment"
                  className="value-service-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="value-service-card__body">
                <h3 className="value-service-card__title">Surface Finishing & Treatment</h3>
                <p className="value-service-card__tagline">Pickling, Passivation & Electro-Polishing</p>
                <p className="value-service-card__desc">
                  Certified chemical pickling, ultrasonic degreasing, electro-polishing, and shot blasting ensuring superior surface integrity and corrosion barrier.
                </p>
              </div>
            </article>

            {/* Card 5: SOLID BRAND RED FEATURE CARD (Export Packaging & Logistics) */}
            <article className="value-service-card value-service-card--red-feature" tabIndex="0">
              <div className="value-service-card__top">
                <span className="value-service-card__tag value-service-card__tag--white">SUPPLY & LOGISTICS</span>
                <span className="value-service-card__spec value-service-card__spec--white">ISPM-15 COMPLIANT</span>
              </div>

              <div className="value-service-card__media value-service-card__media--standard value-service-card__media--red-frame">
                <img
                  src={packagingImg}
                  alt="ISPM-15 certified export wooden box packaging and anti-corrosion VCI wrapping"
                  className="value-service-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="value-service-card__body">
                <h3 className="value-service-card__title value-service-card__title--white">
                  Export Packaging & Protection
                </h3>
                <p className="value-service-card__tagline value-service-card__tagline--white-sub">
                  Seaworthy VCI Wrapping & Wooden Crating
                </p>
                <p className="value-service-card__desc value-service-card__desc--white">
                  Fumigated wooden box packaging, plastic end-capping, anti-corrosive VCI wrapping, and container lashing for safe global shipping.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueAddedServices;

