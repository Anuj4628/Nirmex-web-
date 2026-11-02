import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CTASection from '@/components/home/CTA';

// Import authentic project assets
import aboutHeroImg from '@/assets/images/about-hero-factory.jpg';
import introFacilityImg from '@/assets/images/about-intro-facility.jpg';
import forgedFittingsImg from '@/assets/our product images/forged fittings.png';
import flangesImg from '@/assets/our product images/flanges.png';
import fastenersImg from '@/assets/our product images/fasteners.png';
import buttweldImg from '@/assets/our product images/butt weld fittings.png';
import qualityInspectionImg from '@/assets/services/service-03-material-inspection.jpg';

import './AboutPage.css';

/**
 * Material cards data for Section 8
 */
const MATERIAL_OPTIONS = [
  {
    id: 'mat-ss',
    name: 'Stainless Steel',
    code: 'SS 300 / 400 Series',
    spec: 'ASTM A182 / A312 / A240',
    grades: '304, 304L, 316, 316L, 321, 310, 347, 904L',
    link: '/products/stainless-steel/flanges',
  },
  {
    id: 'mat-cs',
    name: 'Carbon Steel',
    code: 'High Tensile / LTCS',
    spec: 'ASTM A105 / A350 / A106',
    grades: 'A105, A350 LF2, A106 Gr. B, A234 WPB',
    link: '/products/carbon-steel/flanges',
  },
  {
    id: 'mat-as',
    name: 'Alloy Steel',
    code: 'Chrome-Moly Alloy',
    spec: 'ASTM A182 / A335 / A234',
    grades: 'F5, F9, F11, F22, F91, P11, P22, P91',
    link: '/products/alloy-steel/flanges',
  },
  {
    id: 'mat-duplex',
    name: 'Duplex Steel',
    code: 'UNS S31803 / S32205',
    spec: 'ASTM A182 F51 / F60',
    grades: '2205 Microstructure, NACE MR0175',
    link: '/products/duplex-super-duplex/flanges',
  },
  {
    id: 'mat-super-duplex',
    name: 'Super Duplex Steel',
    code: 'UNS S32750 / S32760',
    spec: 'ASTM A182 F53 / F55',
    grades: '2507 Super Duplex, PREN ≥ 42',
    link: '/products/duplex-super-duplex/flanges',
  },
  {
    id: 'mat-nickel',
    name: 'Nickel Alloys',
    code: 'High Performance Alloys',
    spec: 'ASTM B564 / ASME SB564',
    grades: 'Alloy 200, 400, 600, 625, 800H, 825',
    link: '/products/nickel-alloy/flanges',
  },
  {
    id: 'mat-monel',
    name: 'Monel Alloys',
    code: 'Nickel-Copper Binary',
    spec: 'ASTM B564 / B164 / B127',
    grades: 'Monel 400 (N04400), Monel K-500 (N05500)',
    link: '/products/monel/flanges',
  },
  {
    id: 'mat-inconel',
    name: 'Inconel Alloys',
    code: 'High-Temperature Superalloys',
    spec: 'ASTM B564 / B166 / B637',
    grades: 'Inconel 600, Inconel 625, Inconel 718',
    link: '/products/inconel/flanges',
  },
  {
    id: 'mat-hastelloy',
    name: 'Hastelloy Alloys',
    code: 'Ni-Mo-Cr Corrosion Superalloy',
    spec: 'ASTM B564 / B574 / B575',
    grades: 'Hastelloy C-276, C-22, B-2',
    link: '/products/hastelloy/flanges',
  },
  {
    id: 'mat-titanium',
    name: 'Titanium',
    code: 'CP & Alpha-Beta Alloys',
    spec: 'ASTM B381 / B348 / B265',
    grades: 'Grade 1, Grade 2 (CP), Grade 5 (Ti-6Al-4V)',
    link: '/products/titanium/flanges',
  },
  {
    id: 'mat-copper',
    name: 'Copper & Cupro Nickel',
    code: 'Marine Antifouling Alloys',
    spec: 'ASTM B151 / B124 / DIN 86037',
    grades: 'Cu-Ni 90/10 (C70600), Cu-Ni 70/30, Naval Brass',
    link: '/products/copper/flanges',
  },
];

/**
 * Why Choose Us 4 Cards Data for Section 9
 */
const WHY_CHOOSE_CARDS = [
  {
    id: 'diverse-portfolio',
    title: 'Diverse Product Portfolio',
    description:
      'A range of industrial metal products covering forged fittings, flanges, fasteners, buttweld fittings, and other available categories.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="8" height="8" x="2" y="2" rx="1" />
        <rect width="8" height="8" x="14" y="2" rx="1" />
        <rect width="8" height="8" x="2" y="14" rx="1" />
        <rect width="8" height="8" x="14" y="14" rx="1" />
      </svg>
    ),
  },
  {
    id: 'specification-focused',
    title: 'Specification-Focused Approach',
    description:
      'Attention to product grades, dimensions, and technical requirements specified by customers.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'quality-conscious',
    title: 'Quality-Conscious Sourcing',
    description:
      'A focus on material suitability, product condition, and applicable documentation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'customer-focused',
    title: 'Customer-Focused Support',
    description:
      'Clear communication and assistance in identifying products suitable for customer requirements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

/**
 * AboutPage Component
 * Comprehensive, Industrial & Premium About Us page for Nirmex Metal Industries
 */
export const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToSpecialities = (e) => {
    e.preventDefault();
    const targetEl = document.querySelector('#specialities');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/products/forging');
    }
  };

  return (
    <div className="nirmex-about-page">
      {/* =====================================================================
          SECTION 1: PREMIUM INDUSTRIAL HERO SECTION
          ===================================================================== */}
      <section className="nirmex-about-hero" aria-labelledby="about-hero-title">
        {/* Photorealistic Factory Background with Controlled Contrast Overlay */}
        <div className="nirmex-about-hero__bg-wrap" aria-hidden="true">
          <img
            src={aboutHeroImg}
            alt="Nirmex Metal Industries modern metal manufacturing and supply facility"
            className="nirmex-about-hero__bg-img"
            loading="eager"
          />
          <div className="nirmex-about-hero__overlay" />
        </div>

        <div className="nirmex-about-hero__container">
          <div className="nirmex-about-hero__content">
            {/* Eyebrow */}
            <div className="nirmex-about-hero__eyebrow-wrap">
              <span className="nirmex-about-hero__eyebrow-line" aria-hidden="true" />
              <span className="nirmex-about-hero__eyebrow">ABOUT NIRMEX METAL INDUSTRIES</span>
            </div>

            {/* Main Heading */}
            <h1 id="about-hero-title" className="nirmex-about-hero__title">
              Engineering Quality. <br className="nirmex-hero-br" />
              <span className="nirmex-about-hero__title-accent">Delivering Industrial Excellence.</span>
            </h1>

            {/* Description */}
            <p className="nirmex-about-hero__desc">
              Nirmex Metal Industries is committed to supplying quality-driven industrial metal products for demanding applications. With a comprehensive range of forged fittings, flanges, fasteners, and buttweld fittings, we focus on dependable product quality, material reliability, and long-term customer relationships.
            </p>

            {/* Working Action Buttons */}
            <div className="nirmex-about-hero__actions">
              <a
                href="#specialities"
                onClick={handleScrollToSpecialities}
                className="nirmex-btn nirmex-btn--primary"
                aria-label="Explore Nirmex industrial product range"
              >
                <span>Explore Our Products</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="nirmex-btn nirmex-btn--secondary"
                aria-label="Get in touch with Nirmex sales team"
              >
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Subtle Industrial Metric Strip */}
            <div className="nirmex-about-hero__trust-strip" role="list">
              <div className="nirmex-about-hero__trust-item" role="listitem">
                <span className="nirmex-about-hero__trust-dot" aria-hidden="true" />
                <span>ASME • ASTM • DIN Compliant Sourcing</span>
              </div>
              <div className="nirmex-about-hero__trust-item" role="listitem">
                <span className="nirmex-about-hero__trust-dot" aria-hidden="true" />
                <span>Certified Mill Documentation &amp; 3.1 MTC</span>
              </div>
              <div className="nirmex-about-hero__trust-item" role="listitem">
                <span className="nirmex-about-hero__trust-dot" aria-hidden="true" />
                <span>Global Export &amp; Domestic Supply Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: COMPANY INTRODUCTION — OUR INDUSTRIAL EXPERTISE
          ===================================================================== */}
      <section className="nirmex-about-section nirmex-about-intro" aria-labelledby="intro-heading">
        <div className="nirmex-about-container">
          <div className="nirmex-about-grid nirmex-about-grid--2col">
            {/* Left Column: Descriptive Content */}
            <div className="nirmex-about-intro__content">
              <div className="nirmex-section-eyebrow">
                <span className="nirmex-section-eyebrow__bar" aria-hidden="true" />
                <span>OUR INDUSTRIAL EXPERTISE</span>
              </div>

              <h2 id="intro-heading" className="nirmex-section-heading">
                Built Around Quality, Reliability and Industrial Expertise
              </h2>

              <div className="nirmex-prose">
                <p>
                  Nirmex Metal Industries is engaged in supplying a wide range of industrial metal products for customers across various sectors. Our product portfolio includes forged steel fittings, industrial flanges, fasteners, buttweld fittings, sheets and plates, round bars, and pipes and tubes.
                </p>
                <p>
                  We work with a variety of material grades and specifications to support different industrial requirements. Our focus is on product quality, dependable sourcing, careful inspection, and responsive customer service.
                </p>
                <p>
                  By understanding customer specifications and application requirements, we aim to make industrial product sourcing more reliable and efficient.
                </p>
              </div>

              {/* Three Small Information Highlights */}
              <div className="nirmex-intro-highlights" role="list">
                <div className="nirmex-intro-highlight" role="listitem">
                  <div className="nirmex-intro-highlight__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <div className="nirmex-intro-highlight__text">
                    <strong>Diverse Industrial Product Range</strong>
                    <span>Complete coverage of forged fittings, flanges, and piping items.</span>
                  </div>
                </div>

                <div className="nirmex-intro-highlight" role="listitem">
                  <div className="nirmex-intro-highlight__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="nirmex-intro-highlight__text">
                    <strong>Quality-Focused Supply</strong>
                    <span>Material integrity verified per applicable international standards.</span>
                  </div>
                </div>

                <div className="nirmex-intro-highlight" role="listitem">
                  <div className="nirmex-intro-highlight__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div className="nirmex-intro-highlight__text">
                    <strong>Customer-Centric Service</strong>
                    <span>Responsive technical communication and specification alignment.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Facility Photography */}
            <div className="nirmex-about-intro__media">
              <div className="nirmex-media-card">
                <img
                  src={introFacilityImg}
                  alt="Nirmex Metal Industries industrial manufacturing operations and facility"
                  className="nirmex-media-card__img"
                  loading="lazy"
                />
                <div className="nirmex-media-card__badge">
                  <span className="nirmex-media-card__badge-dot" aria-hidden="true" />
                  <span>Industrial Operations &amp; Supply Facility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor for Smooth Scrolling */}
      <div id="specialities" className="nirmex-anchor-target" />

      {/* =====================================================================
          SECTION 3: FORGED FITTINGS — OUR SPECIALITY (Left: Image, Right: Text)
          ===================================================================== */}
      <section className="nirmex-about-section nirmex-product-sec" aria-labelledby="forged-heading">
        <div className="nirmex-about-container">
          <div className="nirmex-about-grid nirmex-about-grid--2col">
            {/* Left: Large Product Image */}
            <div className="nirmex-product-sec__media">
              <div className="nirmex-product-showcase-box">
                <img
                  src={forgedFittingsImg}
                  alt="Precision Stainless Steel and Alloy Forged Fittings manufactured by Nirmex Metal Industries"
                  className="nirmex-product-showcase-box__img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="nirmex-product-sec__content">
              <div className="nirmex-section-eyebrow">
                <span className="nirmex-section-eyebrow__bar" aria-hidden="true" />
                <span>OUR PRODUCT SPECIALITIES</span>
              </div>

              <h2 id="forged-heading" className="nirmex-section-heading">
                Precision Forged Fittings for Industrial Applications
              </h2>

              <div className="nirmex-prose">
                <p>
                  Forged fittings are an important part of our industrial product range. Designed for applications requiring reliable connections and suitable pressure-handling performance, these fittings are selected according to the required material grade, dimensions, and applicable specifications.
                </p>
                <p>
                  We focus on supplying forged fitting products that meet the specified requirements of our customers across industrial applications.
                </p>
              </div>

              {/* Feature Points */}
              <ul className="nirmex-feature-list" role="list">
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Multiple Material Options:</strong> Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Inconel, and Monel.</span>
                </li>
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Application-Specific Specifications:</strong> Socket weld and threaded NPT/BSPT fittings conforming to ASME B16.11 and BS 3799.</span>
                </li>
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Quality-Focused Product Selection:</strong> Monolithic grain flow structure resistant to high pressure, vibration, and hydraulic shock.</span>
                </li>
              </ul>

              <div className="nirmex-product-sec__action">
                <Link to="/products/forging" className="nirmex-btn nirmex-btn--primary">
                  <span>Explore Forged Fittings</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: FLANGES — STRENGTH AND CONNECTION RELIABILITY (Left: Text, Right: Image)
          ===================================================================== */}
      <section className="nirmex-about-section nirmex-product-sec nirmex-product-sec--alt" aria-labelledby="flanges-heading">
        <div className="nirmex-about-container">
          <div className="nirmex-about-grid nirmex-about-grid--2col nirmex-about-grid--reverse-mobile">
            {/* Left: Text */}
            <div className="nirmex-product-sec__content">
              <div className="nirmex-section-eyebrow">
                <span className="nirmex-section-eyebrow__bar" aria-hidden="true" />
                <span>CRITICAL PIPING CONNECTIONS</span>
              </div>

              <h2 id="flanges-heading" className="nirmex-section-heading">
                Industrial Flanges for Dependable Connections
              </h2>

              <div className="nirmex-prose">
                <p>
                  Nirmex Metal Industries offers a range of industrial flanges for piping systems and related applications. Product selection depends on the required dimensions, pressure class, material grade, facing type, and applicable specifications.
                </p>
                <p>
                  Our objective is to help customers source suitable flange products with attention to specification accuracy, product quality, and dependable service.
                </p>
              </div>

              {/* Feature Points */}
              <ul className="nirmex-feature-list" role="list">
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Different Flange Types and Specifications:</strong> Weld Neck, Slip-On, Blind, Socket Weld, Threaded, and Lap Joint formats.</span>
                </li>
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Material and Grade Options:</strong> Available across austenitic stainless, low-temp carbon steel, chrome-moly, and nickel alloys.</span>
                </li>
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Industrial Piping Applications:</strong> Precision machined faces (RF, RTJ, FF) manufactured to ASME B16.5 and EN 1092-1 standards.</span>
                </li>
              </ul>

              <div className="nirmex-product-sec__action">
                <Link to="/products/flanges" className="nirmex-btn nirmex-btn--primary">
                  <span>Explore Flanges</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Large Flange Image */}
            <div className="nirmex-product-sec__media">
              <div className="nirmex-product-showcase-box">
                <img
                  src={flangesImg}
                  alt="Precision Machined Industrial Flanges by Nirmex Metal Industries"
                  className="nirmex-product-showcase-box__img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: FASTENERS — PRECISION IN EVERY COMPONENT (Left: Image, Right: Text)
          ===================================================================== */}
      <section className="nirmex-about-section nirmex-product-sec" aria-labelledby="fasteners-heading">
        <div className="nirmex-about-container">
          <div className="nirmex-about-grid nirmex-about-grid--2col">
            {/* Left: Large Product Image */}
            <div className="nirmex-product-sec__media">
              <div className="nirmex-product-showcase-box">
                <img
                  src={fastenersImg}
                  alt="High-tensile industrial fasteners, stud bolts, and heavy hex nuts by Nirmex Metal Industries"
                  className="nirmex-product-showcase-box__img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="nirmex-product-sec__content">
              <div className="nirmex-section-eyebrow">
                <span className="nirmex-section-eyebrow__bar" aria-hidden="true" />
                <span>HIGH-TENSILE FASTENING SOLUTIONS</span>
              </div>

              <h2 id="fasteners-heading" className="nirmex-section-heading">
                Industrial Fasteners Built Around Specification and Reliability
              </h2>

              <div className="nirmex-prose">
                <p>
                  Fasteners play an essential role in assembling and securing industrial equipment, structural components, and mechanical systems. Our fastener range includes products such as bolts, nuts, and screws, subject to availability and the specifications required.
                </p>
                <p>
                  We understand the importance of dimensional accuracy, suitable material selection, and consistent product quality when sourcing industrial fastening solutions.
                </p>
              </div>

              {/* Feature Points */}
              <ul className="nirmex-feature-list" role="list">
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Different Fastener Types:</strong> Continuously threaded stud bolts, heavy hex nuts, socket head cap screws, and plain/spring washers.</span>
                </li>
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Material and Dimensional Options:</strong> Metric and imperial diameter threads in high-tensile B7/2H, B8/8, and corrosion-resistant stainless alloys.</span>
                </li>
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Specification-Based Product Selection:</strong> Engineered for pressure vessels, valve bonnet clamping, and critical structural connections.</span>
                </li>
              </ul>

              <div className="nirmex-product-sec__action">
                <Link to="/products/fasteners" className="nirmex-btn nirmex-btn--primary">
                  <span>Explore Fasteners</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: BUTTWELD FITTINGS — ENGINEERED FOR PIPING SYSTEMS (Left: Text, Right: Image)
          ===================================================================== */}
      <section className="nirmex-about-section nirmex-product-sec nirmex-product-sec--alt" aria-labelledby="buttweld-heading">
        <div className="nirmex-about-container">
          <div className="nirmex-about-grid nirmex-about-grid--2col nirmex-about-grid--reverse-mobile">
            {/* Left: Text */}
            <div className="nirmex-product-sec__content">
              <div className="nirmex-section-eyebrow">
                <span className="nirmex-section-eyebrow__bar" aria-hidden="true" />
                <span>ENGINEERED PIPING COMPONENTS</span>
              </div>

              <h2 id="buttweld-heading" className="nirmex-section-heading">
                Buttweld Fittings for Industrial Piping Solutions
              </h2>

              <div className="nirmex-prose">
                <p>
                  Buttweld fittings are used to connect, redirect, branch, or modify piping systems according to the requirements of an installation. Our product range supports different fitting types, material options, sizes, and specifications, depending on product availability.
                </p>
                <p>
                  We focus on helping customers identify appropriate fittings for their piping requirements while maintaining attention to quality and specification accuracy.
                </p>
              </div>

              {/* Feature Points */}
              <ul className="nirmex-feature-list" role="list">
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Elbows, Tees and Reducers:</strong> Long/short radius 90° &amp; 45° elbows, concentric and eccentric reducers, and equal/reducing tees.</span>
                </li>
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Multiple Material and Size Options:</strong> Seamless and welded formats conforming strictly to ASME B16.9 and MSS SP-43.</span>
                </li>
                <li className="nirmex-feature-item" role="listitem">
                  <span className="nirmex-feature-item__check" aria-hidden="true">✓</span>
                  <span><strong>Specification-Oriented Product Selection:</strong> Smooth internal bore and accurate weld bevels for leak-free, long-life process piping.</span>
                </li>
              </ul>

              <div className="nirmex-product-sec__action">
                <Link to="/products/butt-weld-fittings" className="nirmex-btn nirmex-btn--primary">
                  <span>Explore Buttweld Fittings</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Large Buttweld Image */}
            <div className="nirmex-product-sec__media">
              <div className="nirmex-product-showcase-box">
                <img
                  src={buttweldImg}
                  alt="Precision Stainless Steel Buttweld pipe fittings by Nirmex Metal Industries"
                  className="nirmex-product-showcase-box__img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: OUR EXCELLENCE — QUALITY AND INSPECTION
          ===================================================================== */}
      <section className="nirmex-about-section nirmex-about-excellence" aria-labelledby="excellence-heading">
        <div className="nirmex-about-container">
          <div className="nirmex-about-grid nirmex-about-grid--2col">
            {/* Left: Quality Content */}
            <div className="nirmex-about-excellence__content">
              <div className="nirmex-section-eyebrow">
                <span className="nirmex-section-eyebrow__bar" aria-hidden="true" />
                <span>QUALITY ASSURANCE &amp; INSPECTION</span>
              </div>

              <h2 id="excellence-heading" className="nirmex-section-heading">
                Our Excellence
              </h2>

              <h3 className="nirmex-about-excellence__subheading">
                Quality Is an Essential Part of Every Product We Supply
              </h3>

              <div className="nirmex-prose">
                <p>
                  At Nirmex Metal Industries, we understand the importance of quality in industrial applications. We pay attention to material specifications, product dimensions, surface condition, and customer requirements when sourcing and supplying products.
                </p>
                <p>
                  Where applicable and available, material test certificates and supporting documentation can be provided in accordance with the product specifications and order requirements.
                </p>
                <p>
                  Our aim is to support customers with reliable products, clear communication, and a consistent focus on quality throughout the supply process.
                </p>
              </div>

              {/* 4 Clean Feature Blocks */}
              <div className="nirmex-excellence-grid" role="list">
                <div className="nirmex-excellence-card" role="listitem">
                  <div className="nirmex-excellence-card__num" aria-hidden="true">01</div>
                  <h4 className="nirmex-excellence-card__title">Material Specification Review</h4>
                  <p className="nirmex-excellence-card__desc">
                    Verification of chemical composition, mechanical limits, and applicable international ASTM, ASME, and DIN standards.
                  </p>
                </div>

                <div className="nirmex-excellence-card" role="listitem">
                  <div className="nirmex-excellence-card__num" aria-hidden="true">02</div>
                  <h4 className="nirmex-excellence-card__title">Dimensional and Visual Inspection</h4>
                  <p className="nirmex-excellence-card__desc">
                    Inspection of face finishing, wall thickness, threading tolerances, and surface condition prior to dispatch.
                  </p>
                </div>

                <div className="nirmex-excellence-card" role="listitem">
                  <div className="nirmex-excellence-card__num" aria-hidden="true">03</div>
                  <h4 className="nirmex-excellence-card__title">Documentation as Applicable</h4>
                  <p className="nirmex-excellence-card__desc">
                    Mill test certificates according to EN 10204 3.1, PMI test reports, and traceability documentation where required.
                  </p>
                </div>

                <div className="nirmex-excellence-card" role="listitem">
                  <div className="nirmex-excellence-card__num" aria-hidden="true">04</div>
                  <h4 className="nirmex-excellence-card__title">Customer Requirement Alignment</h4>
                  <p className="nirmex-excellence-card__desc">
                    Attentive support to ensure product sizes, schedules, and pressure classes match customer engineering requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Realistic Inspection Photography */}
            <div className="nirmex-about-excellence__media">
              <div className="nirmex-media-card nirmex-media-card--excellence">
                <img
                  src={qualityInspectionImg}
                  alt="Industrial quality control and dimensional inspection of steel components"
                  className="nirmex-media-card__img"
                  loading="lazy"
                />
                <div className="nirmex-media-card__badge">
                  <span className="nirmex-media-card__badge-dot" aria-hidden="true" />
                  <span>Verified Inspection &amp; Testing Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: MATERIAL RANGE AND INDUSTRIAL APPLICATIONS
          ===================================================================== */}
      <section className="nirmex-about-section nirmex-about-materials" aria-labelledby="materials-heading">
        <div className="nirmex-about-container">
          <div className="nirmex-about-section-header">
            <div className="nirmex-section-eyebrow nirmex-section-eyebrow--center">
              <span className="nirmex-section-eyebrow__bar" aria-hidden="true" />
              <span>METALLURGICAL CAPABILITIES</span>
            </div>
            <h2 id="materials-heading" className="nirmex-section-heading nirmex-section-heading--center">
              Material Options for Diverse Industrial Requirements
            </h2>
            <p className="nirmex-section-subtitle">
              Material selection depends on the intended application, operating conditions, required specifications, and product availability. Explore the materials supported across our product range.
            </p>
          </div>

          {/* Clean Grid of Compact Material Cards */}
          <div className="nirmex-materials-grid" role="list">
            {MATERIAL_OPTIONS.map((mat) => (
              <Link
                key={mat.id}
                to={mat.link}
                className="nirmex-mat-item"
                role="listitem"
                title={`Explore ${mat.name} products`}
              >
                <div className="nirmex-mat-item__header">
                  <span className="nirmex-mat-item__name">{mat.name}</span>
                  <span className="nirmex-mat-item__arrow" aria-hidden="true">→</span>
                </div>
                <div className="nirmex-mat-item__code">{mat.code}</div>
                <div className="nirmex-mat-item__spec">{mat.spec}</div>
                <div className="nirmex-mat-item__grades">{mat.grades}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: WHY CHOOSE NIRMEX METAL INDUSTRIES?
          ===================================================================== */}
      <section className="nirmex-about-section nirmex-about-why" aria-labelledby="why-heading">
        <div className="nirmex-about-container">
          <div className="nirmex-about-section-header">
            <div className="nirmex-section-eyebrow nirmex-section-eyebrow--center">
              <span className="nirmex-section-eyebrow__bar" aria-hidden="true" />
              <span>VALUE PROPOSITION</span>
            </div>
            <h2 id="why-heading" className="nirmex-section-heading nirmex-section-heading--center">
              Why Choose Nirmex Metal Industries?
            </h2>
            <p className="nirmex-section-subtitle">
              A dependable sourcing and manufacturing partner focused on industrial integrity and customer alignment.
            </p>
          </div>

          {/* Balanced 4-Card Grid */}
          <div className="nirmex-why-grid" role="list">
            {WHY_CHOOSE_CARDS.map((card) => (
              <div key={card.id} className="nirmex-why-card" role="listitem">
                <div className="nirmex-why-card__icon-box" aria-hidden="true">
                  {card.icon}
                </div>
                <h3 className="nirmex-why-card__title">{card.title}</h3>
                <p className="nirmex-why-card__desc">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: FINAL CTA SECTION (Reuses Home CTA)
          ===================================================================== */}
      <CTASection />
    </div>
  );
};

export default AboutPage;

