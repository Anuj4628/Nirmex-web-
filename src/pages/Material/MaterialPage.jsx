import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  findMasterMaterial,
  getProductsForMaterial,
  MASTER_MATERIALS,
  getMaterialProductUrl,
  getGradeDetailUrl,
  getMaterialPageUrl,
} from '@/config/navigationMatrix.data';
import { getMaterialUrl } from '@/utils/seoRouting';
import SEO from '@/components/common/SEO';
import MaterialEnquiryModal from '@/components/products/MaterialEnquiryModal/MaterialEnquiryModal';
import CTASection from '@/components/home/CTA';
import './MaterialPage.css';

/**
 * MaterialPage Component
 * 
 * Comprehensive Material Landing Page:
 * - Material Hero with authentic metallurgical overview & trust badges
 * - Material Overview & Key Industrial Specifications
 * - Interactive Supported Grades Selector
 * - Clean Product Navigation Chips (Explore Products in this Material)
 * - Premium Grid of White Product Cards with direct links to material-specific product detail pages
 * - Other Materials Quick Navigation Bar
 * - Instant Material Specification & Quote Modal
 */
export const MaterialPage = ({ materialSlug: propMaterialSlug } = {}) => {
  const { materialSlug: paramMaterialSlug, slug, seoSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Multi-source material slug resolution:
  // 1. propMaterialSlug (explicit route prop)
  // 2. paramMaterialSlug (from /materials/:materialSlug)
  // 3. slug (from generic params)
  // 4. seoSlug (from SEO resolver)
  // 5. location.pathname (e.g. /duplex-stainless-steel)
  // 6. fallback 'stainless-steel'
  const pathSegment = location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/')[0];
  const isDirectPath = pathSegment && pathSegment !== 'materials' && pathSegment !== 'material';
  const pathSlug = isDirectPath ? pathSegment : '';
  const currentSlug = propMaterialSlug || paramMaterialSlug || slug || seoSlug || pathSlug || 'stainless-steel';
  const material = useMemo(() => findMasterMaterial(currentSlug), [currentSlug]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Products available in this specific material
  const products = useMemo(() => getProductsForMaterial(material.slug), [material.slug]);

  // Filter products by selected category pill
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter((p) => p.baseSlug === activeFilter);
  }, [products, activeFilter]);

  // Other materials (for cross-navigation)
  const otherMaterials = useMemo(
    () => MASTER_MATERIALS.filter((m) => m.slug !== material.slug),
    [material.slug]
  );

  // Scroll to top on material change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveFilter('all');
  }, [material.slug]);

  const handleOpenQuote = (prod = null) => {
    setSelectedProductForModal(prod || products[0]);
    setIsModalOpen(true);
  };

  const handleScrollToProducts = (e) => {
    e.preventDefault();
    const el = document.querySelector('#material-products-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="nirmex-mat-page">
      <SEO
        title={material.seoTitle || `${material.name} Products Manufacturer & Stockist in Mumbai`}
        description={material.overview}
        canonical={getMaterialUrl(material.slug)}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Materials', url: getMaterialUrl(material.slug) },
          { name: material.name, url: getMaterialUrl(material.slug) },
        ]}
        productSchema={{
          name: `${material.name} Industrial Products`,
          description: material.overview,
        }}
      />
      {/* =====================================================================
          1. MATERIAL HERO SECTION
          ===================================================================== */}
      <section className="nirmex-mat-hero" aria-labelledby="mat-hero-heading">
        <div className="nirmex-mat-hero__container">
          {/* Breadcrumbs Navigation */}
          <nav className="nirmex-mat-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" className="nirmex-mat-crumb-link">Home</Link>
            <span className="nirmex-mat-crumb-sep" aria-hidden="true">/</span>
            <span className="nirmex-mat-crumb-static">Materials</span>
            <span className="nirmex-mat-crumb-sep" aria-hidden="true">/</span>
            <span className="nirmex-mat-crumb-active">{material.name}</span>
          </nav>

          <div className="nirmex-mat-hero__grid">
            <div className="nirmex-mat-hero__info">
              <div className="nirmex-mat-hero__eyebrow-wrap">
                <span className="nirmex-mat-hero__eyebrow-line" aria-hidden="true" />
                <span className="nirmex-mat-hero__eyebrow">
                  {material.badge || 'Certified Industrial Metallurgy'}
                </span>
              </div>

              <h1 id="mat-hero-heading" className="nirmex-mat-hero__title">
                {material.heroTitle || `${material.name} Products`}
              </h1>

              <p className="nirmex-mat-hero__desc">
                {material.overview}
              </p>

              {/* Technical Certifications Bar */}
              <div className="nirmex-mat-hero__badges" role="list">
                <div className="nirmex-mat-hero__badge" role="listitem">
                  <span className="nirmex-mat-hero__badge-icon" aria-hidden="true">✓</span>
                  <span>EN 10204 3.1 MTC Certified</span>
                </div>
                <div className="nirmex-mat-hero__badge" role="listitem">
                  <span className="nirmex-mat-hero__badge-icon" aria-hidden="true">✓</span>
                  <span>100% PMI &amp; Ultrasonic Inspected</span>
                </div>
                <div className="nirmex-mat-hero__badge" role="listitem">
                  <span className="nirmex-mat-hero__badge-icon" aria-hidden="true">✓</span>
                  <span>Ready Stock &amp; Custom Machining</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="nirmex-mat-hero__actions">
                <a
                  href="#material-products-grid"
                  onClick={handleScrollToProducts}
                  className="nirmex-mat-hero__btn nirmex-mat-hero__btn--primary"
                  aria-label={`Explore all products available in ${material.name}`}
                >
                  <span>Explore Available Products</span>
                  <span className="nirmex-mat-hero__btn-arrow" aria-hidden="true">↓</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenQuote()}
                  className="nirmex-mat-hero__btn nirmex-mat-hero__btn--secondary"
                  aria-label={`Request quotation for ${material.name} materials`}
                >
                  <span>Request Material Quote</span>
                </button>
              </div>
            </div>

            {/* Right: Technical Metadata Card */}
            <div className="nirmex-mat-hero__meta-card">
              <div className="nirmex-mat-meta-card__header">
                <span className="nirmex-mat-meta-card__tag">Technical Standards</span>
                <h3 className="nirmex-mat-meta-card__title">{material.name} Specifications</h3>
              </div>

              <div className="nirmex-mat-meta-card__body">
                <div className="nirmex-mat-meta-row">
                  <span className="nirmex-mat-meta-label">Applicable Codes:</span>
                  <span className="nirmex-mat-meta-value">{material.specifications}</span>
                </div>

                <div className="nirmex-mat-meta-row">
                  <span className="nirmex-mat-meta-label">Manufacturing Scope:</span>
                  <span className="nirmex-mat-meta-value">Forgings, Flanges, Fittings, Fasteners, Pipes &amp; Plates</span>
                </div>

                <div className="nirmex-mat-meta-row">
                  <span className="nirmex-mat-meta-label">Testing Compliance:</span>
                  <span className="nirmex-mat-meta-value">PMI, Ultrasonic, Hydrostatic, Microstructure &amp; Hardness</span>
                </div>

                {/* Popular Grades Quick Links */}
                {material.popularGrades && material.popularGrades.length > 0 && (
                  <div className="nirmex-mat-meta-grades">
                    <span className="nirmex-mat-meta-label">Available Mill Grades:</span>
                    <div className="nirmex-mat-grade-chips">
                      {material.popularGrades.map((g) => (
                        <Link
                          key={g}
                          to={getGradeDetailUrl(material.slug, 'flanges', g)}
                          className="nirmex-mat-grade-chip"
                          title={`View technical specifications for ${material.name} Grade ${g}`}
                        >
                          {g}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. PRODUCTS AVAILABLE IN THIS MATERIAL (RED SECTION WITH WHITE CARDS)
          ===================================================================== */}
      <section
        id="material-products-grid"
        className="nirmex-mat-catalog-section"
        aria-labelledby="material-catalog-title"
      >
        <div className="nirmex-mat-catalog-container">
          <div className="nirmex-mat-catalog-header">
            <div className="nirmex-mat-catalog-eyebrow">
              <span className="nirmex-mat-catalog-eyebrow__bar" aria-hidden="true" />
              <span>PRODUCTS AVAILABLE IN {material.name.toUpperCase()}</span>
            </div>
            <h2 id="material-catalog-title" className="nirmex-mat-catalog-title">
              Complete {material.name} Product Range
            </h2>
            <p className="nirmex-mat-catalog-subtitle">
              Browse our comprehensive inventory of {material.name} industrial piping components, manufactured and tested to international ASME, ASTM, and DIN specifications.
            </p>
          </div>

          {/* Product Filter Chips (Section 13) */}
          <div className="nirmex-mat-filter-bar" role="tablist" aria-label="Product family filters">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              className={`nirmex-mat-filter-chip ${activeFilter === 'all' ? 'nirmex-mat-filter-chip--active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Products ({products.length})
            </button>
            {products.map((prod) => (
              <button
                key={prod.baseSlug}
                type="button"
                role="tab"
                aria-selected={activeFilter === prod.baseSlug}
                className={`nirmex-mat-filter-chip ${activeFilter === prod.baseSlug ? 'nirmex-mat-filter-chip--active' : ''}`}
                onClick={() => setActiveFilter(prod.baseSlug)}
              >
                {prod.productFamilyName}
              </button>
            ))}
          </div>

          {/* Product Cards Grid (Section 3 & 18) */}
          <div className="nirmex-mat-product-grid" role="list">
            {filteredProducts.map((prod) => (
              <article key={prod.baseSlug} className="nirmex-mat-prod-card" role="listitem">
                <div className="nirmex-mat-prod-card__media">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="nirmex-mat-prod-card__img"
                    loading="lazy"
                  />
                  <span className="nirmex-mat-prod-card__badge">
                    {material.shortName}
                  </span>
                </div>

                <div className="nirmex-mat-prod-card__content">
                  <h3 className="nirmex-mat-prod-card__title">
                    {prod.name}
                  </h3>

                  <p className="nirmex-mat-prod-card__desc">
                    {prod.shortDesc}
                  </p>

                  <div className="nirmex-mat-prod-card__standards">
                    <span className="nirmex-mat-prod-card__std-label">Standards:</span>
                    <span className="nirmex-mat-prod-card__std-text">{prod.standards}</span>
                  </div>

                  <div className="nirmex-mat-prod-card__actions">
                    <Link
                      to={prod.destinationUrl}
                      className="nirmex-mat-prod-card__btn nirmex-mat-prod-card__btn--explore"
                      aria-label={`View technical specifications and types for ${prod.name}`}
                    >
                      <span>View Product</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>

                    <button
                      type="button"
                      className="nirmex-mat-prod-card__btn-quote"
                      onClick={() => handleOpenQuote(prod)}
                      aria-label={`Request quote for ${prod.name}`}
                    >
                      <span>Get Quote</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. EXPLORE OTHER MATERIALS (CROSS-NAVIGATION)
          ===================================================================== */}
      <section className="nirmex-mat-other-section" aria-labelledby="other-materials-heading">
        <div className="nirmex-mat-catalog-container">
          <div className="nirmex-mat-catalog-header">
            <div className="nirmex-mat-catalog-eyebrow">
              <span className="nirmex-mat-catalog-eyebrow__bar" aria-hidden="true" />
              <span>EXPLORE ALTERNATIVE ALLOY FAMILIES</span>
            </div>
            <h2 id="other-materials-heading" className="nirmex-mat-catalog-title">
              Other Materials Available
            </h2>
            <p className="nirmex-mat-catalog-subtitle">
              Need components in a different material? Switch to any of our certified industrial alloy families below:
            </p>
          </div>

          <div className="nirmex-mat-other-grid">
            {otherMaterials.map((otherMat) => (
              <Link
                key={otherMat.slug}
                to={`/${otherMat.slug}`}
                className="nirmex-mat-other-card"
                title={`Explore ${otherMat.name} products and specifications`}
              >
                <div className="nirmex-mat-other-card__badge">{otherMat.shortName}</div>
                <h3 className="nirmex-mat-other-card__name">{otherMat.name}</h3>
                <p className="nirmex-mat-other-card__desc">{otherMat.badge}</p>
                <span className="nirmex-mat-other-card__link">
                  <span>Explore {otherMat.shortName} Products</span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. REUSED HOMEPAGE CTA SECTION
          ===================================================================== */}
      <CTASection />

      {/* =====================================================================
          5. INTERACTIVE QUOTE MODAL PREFILLED WITH MATERIAL
          ===================================================================== */}
      <MaterialEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        material={{
          id: material.id,
          name: `${material.name} ${selectedProductForModal ? selectedProductForModal.productFamilyName : 'Components'}`,
          grades: material.popularGrades ? material.popularGrades.join(', ') : '',
        }}
        category={{
          name: selectedProductForModal ? selectedProductForModal.productFamilyName : 'Industrial Metal Components',
          division: 'Materials Division',
        }}
      />
    </div>
  );
};

export default MaterialPage;

