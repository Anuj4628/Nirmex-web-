import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCategoryBySlug, PRODUCT_CATEGORIES } from '@/config/productMaterials.data';
import { MASTER_MATERIALS, normalizeProductSlug } from '@/config/navigationMatrix.data';
import { PRODUCT_TAXONOMY } from '@/config/catalogue.data';
import MaterialEnquiryModal from '@/components/products/MaterialEnquiryModal/MaterialEnquiryModal';
import CTASection from '@/components/home/CTA';
import './ProductMaterialPage.css';

/**
 * ProductMaterialPage Component
 * 
 * Reusable Product Material Landing Page for all 18 categories:
 * - Two-column hero section with category-specific photo & trust badges
 * - Clean Breadcrumbs: Home / Products / [Category Name]
 * - Section 12: Premium Material Selector Bar with immediate navigation to material-specific pages
 * - Full-width brand RED material catalog section
 * - Responsive grid of WHITE material cards linking directly to /products/:material/:product
 * - Other Product Lines cross-navigation
 * - Real, interactive material enquiry & specification dialog
 */
const getMaterialCatalogueSlug = (mat) => {
  const n = (mat?.name || '').toLowerCase();
  if (n.includes('monel')) return 'monel';
  if (n.includes('inconel')) return 'inconel';
  if (n.includes('hastelloy')) return 'hastelloy';
  if (n.includes('stainless')) return 'stainless-steel';
  if (n.includes('carbon')) return 'carbon-steel';
  if (n.includes('duplex') || n.includes('super duplex')) return 'duplex-super-duplex';
  if (n.includes('alloy') && !n.includes('nickel') && !n.includes('copper')) return 'alloy-steel';
  if (n.includes('nickel')) return 'nickel-alloy';
  if (n.includes('titanium')) return 'titanium';
  if (n.includes('copper') || n.includes('cupro') || n.includes('brass') || n.includes('bronze')) return 'copper';
  return 'stainless-steel';
};

export const ProductMaterialPage = () => {
  const { slug, seoSlug } = useParams();
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Resolve slug from params (supports /products/:slug and SEO routes like /flanges-manufactured-in-mumbai)
  let activeSlug = slug || 'flanges';
  if (seoSlug) {
    const raw = seoSlug.toLowerCase().replace(/-manufactured-in-mumbai$/, '');
    const found = PRODUCT_TAXONOMY.find((p) => p.slug === raw || (p.aliases && p.aliases.includes(raw)));
    if (found) activeSlug = found.slug;
  }
  activeSlug = normalizeProductSlug(activeSlug);

  // Retrieve category data based on current route slug
  const category = getCategoryBySlug(activeSlug) || PRODUCT_CATEGORIES['flanges'];

  // Other complementary product categories
  const otherProducts = PRODUCT_TAXONOMY.filter((p) => p.slug !== category.slug).slice(0, 6);

  // Scroll to top immediately when route/slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSlug]);

  const handleExploreMaterial = (material) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const handleScrollToMaterials = (e) => {
    e.preventDefault();
    const catalogEl = document.querySelector('#materials-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="nirmex-product-page">
      {/* =====================================================================
          1. CATEGORY HERO SECTION (Two-Column Layout)
          ===================================================================== */}
      <section className="nirmex-cat-hero" aria-labelledby="cat-hero-heading">
        <div className="nirmex-cat-hero__container">
          {/* Breadcrumb Navigation (Section 11) */}
          <nav className="nirmex-cat-hero__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" className="nirmex-cat-hero__crumb-link">Home</Link>
            <span className="nirmex-cat-hero__crumb-sep" aria-hidden="true">/</span>
            <Link to="/products/flanges" className="nirmex-cat-hero__crumb-link">Products</Link>
            <span className="nirmex-cat-hero__crumb-sep" aria-hidden="true">/</span>
            <span className="nirmex-cat-hero__crumb-current">{category.displayName || category.name}</span>
          </nav>

          <div className="nirmex-cat-hero__grid">
            {/* Left Column: Heading & Description */}
            <div className="nirmex-cat-hero__info">
              <div className="nirmex-cat-hero__eyebrow-wrap">
                <span className="nirmex-cat-hero__eyebrow-dot" aria-hidden="true" />
                <span className="nirmex-cat-hero__eyebrow">
                  {category.division} • Certified Industrial Range
                </span>
              </div>

              <h1 id="cat-hero-heading" className="nirmex-cat-hero__title">
                {category.heroTitle || category.displayName || category.name}
              </h1>

              <p className="nirmex-cat-hero__desc">
                {category.heroDescription}
              </p>

              {/* Technical Trust Badges */}
              <div className="nirmex-cat-hero__badges" role="list">
                <div className="nirmex-cat-hero__badge-item" role="listitem">
                  <span className="nirmex-cat-hero__badge-icon" aria-hidden="true">✓</span>
                  <span>EN 10204 3.1 MTC Certified</span>
                </div>
                <div className="nirmex-cat-hero__badge-item" role="listitem">
                  <span className="nirmex-cat-hero__badge-icon" aria-hidden="true">✓</span>
                  <span>100% PMI &amp; Ultrasonic Tested</span>
                </div>
                <div className="nirmex-cat-hero__badge-item" role="listitem">
                  <span className="nirmex-cat-hero__badge-icon" aria-hidden="true">✓</span>
                  <span>Ready Stock &amp; Custom Sizing</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="nirmex-cat-hero__actions">
                <a
                  href="#materials-catalog"
                  onClick={handleScrollToMaterials}
                  className="nirmex-cat-hero__btn nirmex-cat-hero__btn--primary"
                >
                  <span>Explore Available Materials</span>
                  <span className="nirmex-cat-hero__btn-arrow" aria-hidden="true">↓</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleExploreMaterial(category.materials[0])}
                  className="nirmex-cat-hero__btn nirmex-cat-hero__btn--secondary"
                >
                  <span>Request Instant Quotation</span>
                </button>
              </div>
            </div>

            {/* Right Column: Category Featured Image */}
            <div className="nirmex-cat-hero__media">
              <div className="nirmex-cat-hero__image-card">
                <img
                  src={category.heroImage}
                  alt={`${category.name} Industrial Components`}
                  className="nirmex-cat-hero__img"
                  loading="eager"
                />
                <div className="nirmex-cat-hero__img-tag">
                  <span className="nirmex-cat-hero__img-tag-dot" aria-hidden="true" />
                  <span>{category.heroBadge || 'Precision Engineered'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. MATERIAL CATALOG SECTION (Full RED Background with WHITE Cards)
          ===================================================================== */}
      <section
        id="materials-catalog"
        className="nirmex-mat-catalog"
        aria-labelledby="mat-catalog-heading"
      >
        <div className="nirmex-mat-catalog__container">
          {/* Section Header */}
          <div className="nirmex-mat-catalog__header">
            <span className="nirmex-mat-catalog__eyebrow">
              Certified Material Grades &amp; Specifications
            </span>
            <h2 id="mat-catalog-heading" className="nirmex-mat-catalog__title">
              Available Materials for {category.displayName || category.name}
            </h2>
            <p className="nirmex-mat-catalog__subtitle">
              Choose an alloy family below to view specific {category.displayName || category.name} product details, dimensional tables, pressure classes, and certified mill test reports.
            </p>
          </div>

          {/* Section 12: Premium Material Selector Bar */}
          <div className="nirmex-mat-selector-wrap" aria-label="Select Material">
            <span className="nirmex-mat-selector-label">Select Material:</span>
            <div className="nirmex-mat-selector-pills">
              {category.materials.map((mat) => {
                const matSlug = getMaterialCatalogueSlug(mat);
                return (
                  <Link
                    key={mat.id}
                    to={`/products/${matSlug}/${category.slug}`}
                    className="nirmex-mat-selector-pill"
                    title={`View ${mat.name} ${category.displayName || category.name}`}
                  >
                    <span>{mat.name.replace(' Forgings', '').replace(' Flanges', '').replace(' Fasteners', '')}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Responsive Grid of WHITE Material Cards (Section 4 & 18) */}
          <div className="nirmex-mat-grid" role="list">
            {category.materials.map((mat) => {
              const matSlug = getMaterialCatalogueSlug(mat);
              const targetUrl = `/products/${matSlug}/${category.slug}`;
              return (
                <article key={mat.id} className="nirmex-mat-card" role="listitem">
                  {/* Material Card Image */}
                  <Link to={targetUrl} className="nirmex-mat-card__media-link">
                    <div className="nirmex-mat-card__media">
                      <img
                        src={mat.image}
                        alt={mat.name}
                        className="nirmex-mat-card__img"
                        loading="lazy"
                      />
                      {mat.standards && (
                        <span className="nirmex-mat-card__badge">
                          {mat.standards.split(',')[0]}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Material Card Content */}
                  <div className="nirmex-mat-card__content">
                    <h3 className="nirmex-mat-card__name">
                      <Link to={targetUrl} className="nirmex-mat-card__title-link">
                        {mat.name}
                      </Link>
                    </h3>

                    <p className="nirmex-mat-card__desc">
                      {mat.shortDesc}
                    </p>

                    {mat.grades && (
                      <div className="nirmex-mat-card__grades">
                        <span className="nirmex-mat-card__grades-label">Grades:</span>
                        <span className="nirmex-mat-card__grades-text">{mat.grades}</span>
                      </div>
                    )}

                    {/* Card Actions: Deep Catalogue Navigation & Instant Quote */}
                    <div className="nirmex-mat-card__action-wrap">
                      <Link
                        to={targetUrl}
                        className="nirmex-mat-card__btn nirmex-mat-card__btn--explore"
                        aria-label={`View technical grades and types for ${mat.name}`}
                      >
                        <span>View {category.displayName || category.name}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>

                      <button
                        type="button"
                        className="nirmex-mat-card__btn-quote"
                        onClick={() => handleExploreMaterial(mat)}
                        aria-label={`Request instant quote for ${mat.name}`}
                      >
                        <span>Quick Quote</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. EXPLORE OTHER COMPLEMENTARY PRODUCT LINES
          ===================================================================== */}
      <section className="nirmex-cat-other-section" aria-labelledby="other-cats-heading">
        <div className="nirmex-cat-hero__container">
          <div className="nirmex-cat-other-header">
            <span className="nirmex-cat-hero__eyebrow">COMPREHENSIVE INDUSTRIAL INVENTORY</span>
            <h2 id="other-cats-heading" className="nirmex-cat-other-title">
              Explore Other Product Categories
            </h2>
            <p className="nirmex-cat-other-desc">
              Looking for related piping, fastening, or structural components? Browse our other high-integrity manufacturing lines:
            </p>
          </div>

          <div className="nirmex-cat-other-grid">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="nirmex-cat-other-card"
                title={`Explore ${p.displayName || p.name}`}
              >
                <span className="nirmex-cat-other-card__division">{p.categoryDivision}</span>
                <h3 className="nirmex-cat-other-card__title">{p.displayName || p.name}</h3>
                <p className="nirmex-cat-other-card__desc">{p.shortDesc}</p>
                <span className="nirmex-cat-other-card__link">
                  <span>Explore Category</span>
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
          5. INTERACTIVE MATERIAL SPECIFICATION & QUOTE MODAL
          ===================================================================== */}
      <MaterialEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        material={selectedMaterial}
        category={category}
      />
    </div>
  );
};

export default ProductMaterialPage;
