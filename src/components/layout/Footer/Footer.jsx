import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nirmexLogo from '@/assets/logos/nirmex-logo.png';
import { SITE_CONFIG } from '@/config/site.config';
import { buildProductUrl } from '@/utils/seoRouting';
import './Footer.css';

/**
 * CopyButton Component
 * Reliable one-click copy control with visual checkmark & tooltip feedback.
 * Prevents triggering parent telephone or mailto links.
 */
const CopyButton = ({ textToCopy, ariaLabel }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers or non-HTTPS dev environments
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      type="button"
      className={`footer-copy-btn ${copied ? 'is-copied' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : ariaLabel}
      title={copied ? 'Copied!' : `Copy ${textToCopy}`}
    >
      {copied ? (
        <>
          <svg className="footer-copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="footer-copy-tooltip" role="status">Copied!</span>
        </>
      ) : (
        <svg className="footer-copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
};

/**
 * Footer Component - NIRMEX METAL INDUSTRIES
 * Professional Multi-Column Industrial Corporate Footer
 */
export const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const hash = href.replace('/#', '#');
      if (window.location.pathname === '/') {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="nirmex-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Nirmex Metal Industries Corporate Footer</h2>

      {/* Top Border Accent Line */}
      <div className="nirmex-footer__top-accent" aria-hidden="true" />

      <div className="nirmex-footer__container">
        {/* =================================================================
            MAIN 4-COLUMN FOOTER GRID
            ================================================================= */}
        <div className="nirmex-footer__grid">

          {/* -------------------------------------------------------------
              COLUMN 1: COMPANY BRANDING & PROFILE
              ------------------------------------------------------------- */}
          <div className="nirmex-footer__col nirmex-footer__col--brand">
            {/* Prominent Large Logo in White Card */}
            <div className="nirmex-footer__logo-card">
              <a href="/" className="nirmex-footer__logo-link" aria-label="Nirmex Metal Industries Home">
                <img
                  src={nirmexLogo}
                  alt="Nirmex Metal Industries Logo"
                  className="nirmex-footer__logo"
                  width="270"
                  height="56"
                />
              </a>
            </div>

            <p className="nirmex-footer__about">
              Leading ISO 9001:2015 certified manufacturer and global exporter of high-integrity stainless steel, carbon steel, and alloy pipe fittings, forged flanges, fasteners, and industrial piping solutions.
            </p>

            {/* Industrial Quality Accreditations */}
            <div className="nirmex-footer__certifications">
              <span className="nirmex-footer__cert-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ISO 9001:2015 Certified
              </span>
              <span className="nirmex-footer__cert-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                ASME &amp; DIN Compliance
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------
              COLUMN 2: QUICK LINKS & CORE CAPABILITIES
              ------------------------------------------------------------- */}
          <div className="nirmex-footer__col nirmex-footer__col--links">
            <h3 className="nirmex-footer__col-title">
              <span className="footer-title-dot" aria-hidden="true" />
              Quick Navigation
            </h3>
            <ul className="nirmex-footer__nav-list">
              {SITE_CONFIG.quickLinks.map((link) => (
                <li key={link.label} className="nirmex-footer__nav-item">
                  <Link
                    to={link.href}
                    className="nirmex-footer__nav-link"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    <svg className="nirmex-footer__link-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------------------
              COLUMN 3: HEAD OFFICE & MANUFACTURING UNIT
              ------------------------------------------------------------- */}
          <div className="nirmex-footer__col nirmex-footer__col--facilities">
            {/* 3A: Head Office */}
            <div className="footer-location-block">
              <h3 className="nirmex-footer__col-title">
                <span className="footer-title-dot" aria-hidden="true" />
                Head Office
              </h3>
              <p className="footer-company-name">{SITE_CONFIG.headOffice.company}</p>
              <address className="footer-address">
                <span>{SITE_CONFIG.headOffice.addressLine1}</span>
                <span>{SITE_CONFIG.headOffice.addressLine2}</span>
                <span className="footer-address__highlight">{SITE_CONFIG.headOffice.addressLine3}</span>
              </address>

              {/* Contact Person */}
              <div className="footer-contact-item">
                <span className="footer-contact-label">Contact Person:</span>
                <div className="footer-contact-row">
                  <span className="footer-person-name">{SITE_CONFIG.contactPerson.name}</span>
                </div>
                <div className="footer-contact-row footer-contact-row--actionable">
                  <a
                    href={SITE_CONFIG.contactPerson.telUrl}
                    className="footer-contact-link"
                    title="Call Contact Person"
                  >
                    <svg className="footer-item-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{SITE_CONFIG.contactPerson.mobile}</span>
                  </a>
                  <CopyButton textToCopy={SITE_CONFIG.contactPerson.mobile} ariaLabel="Copy contact person mobile number" />
                </div>
              </div>

              {/* Telephone */}
              <div className="footer-contact-item">
                <span className="footer-contact-label">Telephone:</span>
                <div className="footer-contact-row footer-contact-row--actionable">
                  <a
                    href={SITE_CONFIG.telephone.telUrl}
                    className="footer-contact-link"
                    title="Call Telephone"
                  >
                    <svg className="footer-item-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{SITE_CONFIG.telephone.display}</span>
                  </a>
                  <CopyButton textToCopy={SITE_CONFIG.telephone.value} ariaLabel="Copy telephone number" />
                </div>
              </div>
            </div>

            {/* 3B: Manufacturing Unit */}
            <div className="footer-location-block footer-location-block--mfg">
              <h4 className="footer-subheading">
                <span className="footer-subheading-badge">Plant</span>
                {SITE_CONFIG.manufacturingUnit.title}
              </h4>
              <address className="footer-address">
                <span>{SITE_CONFIG.manufacturingUnit.locationLine1}</span>
                <span className="footer-address__highlight">{SITE_CONFIG.manufacturingUnit.locationLine2}</span>
              </address>
              <div className="footer-contact-row footer-contact-row--actionable">
                <a
                  href={SITE_CONFIG.manufacturingUnit.telUrl}
                  className="footer-contact-link"
                  title="Call Manufacturing Unit"
                >
                  <svg className="footer-item-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{SITE_CONFIG.manufacturingUnit.mobile}</span>
                </a>
                <CopyButton textToCopy={SITE_CONFIG.manufacturingUnit.mobile} ariaLabel="Copy manufacturing unit mobile number" />
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              COLUMN 4: CONTACT & SALES (EMAILS & ENQUIRIES)
              ------------------------------------------------------------- */}
          <div className="nirmex-footer__col nirmex-footer__col--sales">
            <h3 className="nirmex-footer__col-title">
              <span className="footer-title-dot" aria-hidden="true" />
              Sales &amp; Enquiries
            </h3>
            <p className="footer-sales-intro">
              Direct channels for commercial quotations, domestic supply, and worldwide export contracts.
            </p>

            <div className="footer-email-list">
              {/* Domestic Sales */}
              <div className="footer-email-card">
                <div className="footer-email-card__header">
                  <span className="footer-email-badge footer-email-badge--domestic">Domestic</span>
                  <span className="footer-email-title">{SITE_CONFIG.emails.domesticSales.label}</span>
                </div>
                <div className="footer-contact-row footer-contact-row--actionable">
                  <a
                    href={SITE_CONFIG.emails.domesticSales.mailtoUrl}
                    className="footer-email-link"
                    title="Send Domestic Sales Email"
                  >
                    <svg className="footer-item-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>{SITE_CONFIG.emails.domesticSales.email}</span>
                  </a>
                  <CopyButton textToCopy={SITE_CONFIG.emails.domesticSales.email} ariaLabel="Copy domestic sales email" />
                </div>
              </div>

              {/* Exports */}
              <div className="footer-email-card">
                <div className="footer-email-card__header">
                  <span className="footer-email-badge footer-email-badge--export">Global</span>
                  <span className="footer-email-title">{SITE_CONFIG.emails.exports.label}</span>
                </div>
                <div className="footer-contact-row footer-contact-row--actionable">
                  <a
                    href={SITE_CONFIG.emails.exports.mailtoUrl}
                    className="footer-email-link"
                    title="Send Export Sales Email"
                  >
                    <svg className="footer-item-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>{SITE_CONFIG.emails.exports.email}</span>
                  </a>
                  <CopyButton textToCopy={SITE_CONFIG.emails.exports.email} ariaLabel="Copy export sales email" />
                </div>
              </div>

              {/* General Enquiry */}
              <div className="footer-email-card">
                <div className="footer-email-card__header">
                  <span className="footer-email-badge footer-email-badge--general">Support</span>
                  <span className="footer-email-title">{SITE_CONFIG.emails.enquiry.label}</span>
                </div>
                <div className="footer-contact-row footer-contact-row--actionable">
                  <a
                    href={SITE_CONFIG.emails.enquiry.mailtoUrl}
                    className="footer-email-link"
                    title="Send General Enquiry Email"
                  >
                    <svg className="footer-item-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>{SITE_CONFIG.emails.enquiry.email}</span>
                  </a>
                  <CopyButton textToCopy={SITE_CONFIG.emails.enquiry.email} ariaLabel="Copy general enquiry email" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =================================================================
            PRODUCTS & MATERIALS DIRECTORY STRIP (Section 23)
            ================================================================= */}
        <div className="nirmex-footer__directory">
          <div className="nirmex-footer__directory-col">
            <h4 className="nirmex-footer__directory-title">
              <span className="footer-title-dot" aria-hidden="true" />
              Industrial Products
            </h4>
            <div className="nirmex-footer__directory-links">
              <Link to={buildProductUrl({ product: 'flanges' })} className="nirmex-footer__dir-link">Flanges</Link>
              <Link to={buildProductUrl({ product: 'forged-fittings' })} className="nirmex-footer__dir-link">Forged Fittings</Link>
              <Link to={buildProductUrl({ product: 'butt-weld-fittings' })} className="nirmex-footer__dir-link">Butt Weld Fittings</Link>
              <Link to={buildProductUrl({ product: 'fasteners' })} className="nirmex-footer__dir-link">Fasteners</Link>
              <Link to={buildProductUrl({ product: 'pipes-tubes' })} className="nirmex-footer__dir-link">Pipes &amp; Tubes</Link>
              <Link to={buildProductUrl({ product: 'sheets-plates' })} className="nirmex-footer__dir-link">Sheets &amp; Plates</Link>
              <Link to={buildProductUrl({ product: 'rods-bars' })} className="nirmex-footer__dir-link">Rods &amp; Bars</Link>
              <Link to={buildProductUrl({ product: 'dairy-pharma-fittings' })} className="nirmex-footer__dir-link">Dairy &amp; Pharma Fittings</Link>
              <Link to={buildProductUrl({ product: 'flat-bars' })} className="nirmex-footer__dir-link">Flat Bars</Link>
              <Link to={buildProductUrl({ product: 'circle' })} className="nirmex-footer__dir-link">Circles</Link>
            </div>
          </div>

          <div className="nirmex-footer__directory-col">
            <h4 className="nirmex-footer__directory-title">
              <span className="footer-title-dot" aria-hidden="true" />
              Certified Materials
            </h4>
            <div className="nirmex-footer__directory-links">
              <Link to="/stainless-steel" className="nirmex-footer__dir-link">Stainless Steel</Link>
              <Link to="/carbon-steel" className="nirmex-footer__dir-link">Carbon Steel</Link>
              <Link to="/alloy-steel" className="nirmex-footer__dir-link">Alloy Steel</Link>
              <Link to="/duplex-super-duplex" className="nirmex-footer__dir-link">Duplex + Super Duplex</Link>
              <Link to="/nickel-alloy" className="nirmex-footer__dir-link">Nickel Alloy</Link>
              <Link to="/inconel" className="nirmex-footer__dir-link">Inconel</Link>
              <Link to="/monel" className="nirmex-footer__dir-link">Monel</Link>
              <Link to="/hastelloy" className="nirmex-footer__dir-link">Hastelloy</Link>
              <Link to="/titanium" className="nirmex-footer__dir-link">Titanium</Link>
              <Link to="/copper" className="nirmex-footer__dir-link">Copper</Link>
              <Link to="/aluminium" className="nirmex-footer__dir-link">Aluminium</Link>
              <Link to="/high-alloy" className="nirmex-footer__dir-link">High Alloy</Link>
            </div>
          </div>
        </div>

        {/* =================================================================
            BOTTOM LEGAL BAR
            ================================================================= */}
        <div className="nirmex-footer__bottom">
          <p className="nirmex-footer__copyright">
            &copy; {currentYear} <span className="nirmex-footer__copyright-brand">Nirmex Metal Industries</span>. All rights reserved.
          </p>

          <p className="nirmex-footer__credit">
            Design &amp; SEO by{' '}
            <a
              href="https://sunmargindia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="nirmex-footer__credit-link"
            >
              SUNMAR INDIA
            </a>
          </p>

          <div className="nirmex-footer__legal-links">
            <a href="#privacy" className="nirmex-footer__legal-link">Privacy Policy</a>
            <span className="nirmex-footer__legal-dot" aria-hidden="true">&bull;</span>
            <a href="#terms" className="nirmex-footer__legal-link">Terms &amp; Conditions</a>
            <span className="nirmex-footer__legal-dot" aria-hidden="true">&bull;</span>
            <a href="#quality" className="nirmex-footer__legal-link">Quality Policy</a>
          </div>

          {/* Back to top scroll button */}
          <button
            type="button"
            className="nirmex-footer__back-top"
            onClick={handleScrollToTop}
            aria-label="Back to top of page"
            title="Scroll to top"
          >
            <span className="nirmex-footer__back-top-text">Back to Top</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

