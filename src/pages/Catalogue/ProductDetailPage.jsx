import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MATERIALS,
  PRODUCT_TAXONOMY,
  getCompositeProduct,
  getMaterialBySlug,
  getProductTaxonomyBySlug,
} from '@/config/catalogue.data';
import { getFlangeMaterialData } from '@/config/flangeMaterials.data';
import ProductMaterialSidebar from '@/components/catalogue/FlangeMaterialSidebar/FlangeMaterialSidebar';
import GradeBadgeList from '@/components/catalogue/GradeBadgeList/GradeBadgeList';
import TypeCardGrid from '@/components/catalogue/TypeCardGrid/TypeCardGrid';
import MaterialEnquiryModal from '@/components/products/MaterialEnquiryModal/MaterialEnquiryModal';
import CTASection from '@/components/home/CTA';
import './CatalogueCommon.css';
import './ProductDetailPage.css';

/**
 * ProductDetailPage Component
 * 
 * Comprehensive Two-Column Industrial Product Catalogue Page:
 * - DEDICATED Flange Material Navigation Sidebar for Flanges (#C90000 / #BA0500)
 * - Dynamic, authentic material-specific content, hero images, and types
 * - Interactive compact grade boxes
 * - Configurable types section for Flanges, Fasteners & Forged Fittings
 * - Technical specifications & chemical/mechanical compliance tables
 * - Applications & related product links
 * - Enquiry modal prefilled with exact product context
 */
export const ProductDetailPage = () => {
  const { material: matParam, product: prodParam, slug } = useParams();
  const navigate = useNavigate();

  // Handle both /products/:material/:product and backwards-compatible /products/:slug
  let materialSlug = matParam || 'stainless-steel';
  let productSlug = prodParam || slug || 'flanges';

  // If only slug is provided, check if it's a material or a product
  if (!matParam && slug) {
    const isMaterial = MATERIALS.some((m) => m.slug === slug);
    if (isMaterial) {
      materialSlug = slug;
      productSlug = 'flanges';
    } else {
      materialSlug = 'stainless-steel';
      productSlug = slug;
    }
  }

  const isFlange = productSlug === 'flanges';
  const flangeData = isFlange ? getFlangeMaterialData(materialSlug) : null;

  const composite = getCompositeProduct(materialSlug, productSlug);
  const { material, taxonomy, grades, types, heroImage } = composite;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [materialSlug, productSlug]);

  const handleOpenQuote = () => {
    setIsModalOpen(true);
  };

  // Find related products in the same material
  const relatedProducts = PRODUCT_TAXONOMY.filter((p) => p.slug !== taxonomy.slug).slice(0, 4);

  return (
    <div className="nirmex-catalogue-page">
      <div className="nirmex-catalogue-container">
        {/* Topbar with Full Breadcrumb Trail */}
        <div className="nirmex-catalogue-topbar">
          {isFlange ? (
            <nav className="nirmex-detail-crumbs" aria-label="Breadcrumb">
              <Link to="/" className="nirmex-detail-crumb-link">Home</Link>
              <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
              <Link to="/products/flanges" className="nirmex-detail-crumb-link">Products</Link>
              <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
              <Link to="/products/flanges" className="nirmex-detail-crumb-link">Flanges</Link>
              <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
              <span className="nirmex-detail-crumb-active">{flangeData.navLabel}</span>
            </nav>
          ) : (
            <nav className="nirmex-detail-crumbs" aria-label="Breadcrumb">
              <Link to="/" className="nirmex-detail-crumb-link">Home</Link>
              <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
              <Link to={`/products/${taxonomy.slug}`} className="nirmex-detail-crumb-link">Products</Link>
              <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
              <Link to={`/products/${taxonomy.slug}`} className="nirmex-detail-crumb-link">{taxonomy.displayName || taxonomy.name}</Link>
              <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
              <span className="nirmex-detail-crumb-active">{material.name} {taxonomy.name}</span>
            </nav>
          )}
        </div>

        {/* Main 2-Column Layout */}
        <div className="nirmex-catalogue-layout">
          {/* LEFT COLUMN: Fixed Red Material Navigation Sidebar (All Products) */}
          <ProductMaterialSidebar
            activeMaterialSlug={isFlange ? flangeData.slug : material.slug}
            activeProductSlug={isFlange ? 'flanges' : taxonomy.slug}
            productName={isFlange ? 'Flanges' : (taxonomy.displayName || taxonomy.name)}
          />

          {/* RIGHT COLUMN: Independent Scrolling Product Content */}
          <main className="nirmex-catalogue-content" id="catalogue-content">
            {/* Product Hero Header Card */}
            {isFlange ? (
              <section className="nirmex-prod-hero-card" aria-labelledby="prod-hero-title">
                <div className="nirmex-prod-hero-card__grid">
                  <div className="nirmex-prod-hero-card__info">
                    <div className="nirmex-prod-hero-card__eyebrow-wrap">
                      <span className="nirmex-prod-hero-card__pill">{flangeData.materialName}</span>
                      <span className="nirmex-prod-hero-card__pill-sep">•</span>
                      <span className="nirmex-prod-hero-card__category">{flangeData.badge}</span>
                    </div>

                    <h1 id="prod-hero-title" className="nirmex-prod-hero-card__title">
                      {flangeData.pageHeading}
                    </h1>

                    <p className="nirmex-prod-hero-card__desc">
                      {flangeData.description}
                    </p>

                    <div className="nirmex-prod-hero-card__badges" role="list">
                      <span className="nirmex-prod-hero-card__badge" role="listitem">✓ 100% PMI Inspected</span>
                      <span className="nirmex-prod-hero-card__badge" role="listitem">✓ EN 10204 3.1 MTC Certified</span>
                      <span className="nirmex-prod-hero-card__badge" role="listitem">✓ Ready Stock &amp; Custom Sizing</span>
                    </div>

                    <div className="nirmex-prod-hero-card__actions">
                      <button
                        type="button"
                        onClick={handleOpenQuote}
                        className="nirmex-btn nirmex-btn--primary"
                      >
                        <span>Request Quotation</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>

                      <a
                        href={`https://wa.me/919619806901?text=${encodeURIComponent(`Hello Nirmex Metal, I am inquiring about: ${flangeData.pageHeading}. Please share technical catalog and stock availability.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nirmex-btn nirmex-btn--wa"
                      >
                        <span>WhatsApp Inquiry</span>
                      </a>
                    </div>
                  </div>

                  <div className="nirmex-prod-hero-card__media">
                    <div className="nirmex-prod-hero-card__img-wrap">
                      <img
                        src={flangeData.heroImage}
                        alt={flangeData.pageHeading}
                        className="nirmex-prod-hero-card__img"
                        loading="eager"
                      />
                      <span className="nirmex-prod-hero-card__tag">
                        {flangeData.heroTag}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <section className="nirmex-prod-hero-card" aria-labelledby="prod-hero-title">
                <div className="nirmex-prod-hero-card__grid">
                  <div className="nirmex-prod-hero-card__info">
                    <div className="nirmex-prod-hero-card__eyebrow-wrap">
                      <span className="nirmex-prod-hero-card__pill">{material.name}</span>
                      <span className="nirmex-prod-hero-card__pill-sep">•</span>
                      <span className="nirmex-prod-hero-card__category">{taxonomy.categoryDivision}</span>
                    </div>

                    <h1 id="prod-hero-title" className="nirmex-prod-hero-card__title">
                      {material.name} {taxonomy.displayName || taxonomy.name}
                    </h1>

                    <p className="nirmex-prod-hero-card__desc">
                      {taxonomy.shortDesc} Precision manufactured and tested to stringent ASME, ASTM, and DIN standards for critical pressure vessel, pipeline, and structural applications.
                    </p>

                    <div className="nirmex-prod-hero-card__badges" role="list">
                      <span className="nirmex-prod-hero-card__badge" role="listitem">✓ 100% PMI Inspected</span>
                      <span className="nirmex-prod-hero-card__badge" role="listitem">✓ EN 10204 3.1 MTC Certified</span>
                      <span className="nirmex-prod-hero-card__badge" role="listitem">✓ Ready Stock &amp; Custom Sizing</span>
                    </div>

                    <div className="nirmex-prod-hero-card__actions">
                      <button
                        type="button"
                        onClick={handleOpenQuote}
                        className="nirmex-btn nirmex-btn--primary"
                      >
                        <span>Request Quotation</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>

                      <a
                        href={`https://wa.me/919619806901?text=${encodeURIComponent(`Hello Nirmex Metal, I am inquiring about: ${material.name} ${taxonomy.displayName || taxonomy.name}. Please share technical catalog and stock availability.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nirmex-btn nirmex-btn--wa"
                      >
                        <span>WhatsApp Inquiry</span>
                      </a>
                    </div>
                  </div>

                  <div className="nirmex-prod-hero-card__media">
                    <div className="nirmex-prod-hero-card__img-wrap">
                      <img
                        src={heroImage}
                        alt={`${material.name} ${taxonomy.name}`}
                        className="nirmex-prod-hero-card__img"
                        loading="eager"
                      />
                      <span className="nirmex-prod-hero-card__tag">
                        {material.shortName} Mill Certified
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Available Grades Section (Compact Clickable Grade Boxes) */}
            {isFlange ? (
              <GradeBadgeList
                grades={flangeData.availableGrades}
                materialSlug={flangeData.slug}
                productSlug="flanges"
                title={`Available ${flangeData.materialName} Grades`}
                subtitle={`Select any certified grade to inspect mechanical properties, chemical composition, and ASTM/ASME standards for ${flangeData.materialName.toLowerCase()} flanges.`}
              />
            ) : (
              taxonomy.showGrades && (
                <GradeBadgeList
                  grades={grades}
                  materialSlug={material.slug}
                  productSlug={taxonomy.slug}
                  title={`Available ${material.name} Grades`}
                  subtitle={`Select any certified grade to inspect mechanical properties, chemical composition, and ASTM/ASME standards for ${taxonomy.name.toLowerCase()}.`}
                />
              )
            )}

            {/* Product Types Section */}
            {isFlange ? (
              <TypeCardGrid
                types={flangeData.types}
                materialSlug={flangeData.slug}
                productSlug="flanges"
                title={flangeData.typesHeading}
                subtitle={`Browse verified configurations, dimensions, and ASME/DIN manufacturing standards for ${flangeData.materialName.toLowerCase()} flanges.`}
              />
            ) : (
              taxonomy.showTypes && types.length > 0 && (
                <TypeCardGrid
                  types={types}
                  materialSlug={material.slug}
                  productSlug={taxonomy.slug}
                  title={`Types of ${taxonomy.displayName || taxonomy.name}`}
                  subtitle={`Browse verified configurations, dimensions, and ASME/DIN manufacturing standards for ${material.name} ${taxonomy.name.toLowerCase()}.`}
                />
              )
            )}

            {/* Detailed Technical Description & Engineering Analysis */}
            {isFlange ? (
              <section className="nirmex-tech-details-sec" aria-labelledby="tech-details-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="tech-details-heading" className="nirmex-tech-title">
                    Manufacturing Specifications &amp; Quality Standards
                  </h3>
                </div>

                <div className="nirmex-tech-table-wrap">
                  <table className="nirmex-tech-table">
                    <tbody>
                      <tr>
                        <th scope="row">Material Family</th>
                        <td><strong>{flangeData.materialName}</strong> ({flangeData.badge})</td>
                      </tr>
                      <tr>
                        <th scope="row">Applicable Standards</th>
                        <td>{flangeData.standards}</td>
                      </tr>
                      <tr>
                        <th scope="row">Pressure Classes / Ratings</th>
                        <td>{flangeData.pressureClasses}</td>
                      </tr>
                      <tr>
                        <th scope="row">Inspection &amp; Test Certificates</th>
                        <td>{flangeData.testCertificates}</td>
                      </tr>
                      <tr>
                        <th scope="row">Flange Facing Types</th>
                        <td>{flangeData.facings}</td>
                      </tr>
                      <tr>
                        <th scope="row">Size &amp; Dimensional Range</th>
                        <td>{flangeData.sizeRange}</td>
                      </tr>
                      <tr>
                        <th scope="row">Available Material Grades</th>
                        <td>{flangeData.availableGrades.map((g) => g.code).join(' • ')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            ) : (
              <section className="nirmex-tech-details-sec" aria-labelledby="tech-details-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="tech-details-heading" className="nirmex-tech-title">
                    Manufacturing Specifications &amp; Quality Standards
                  </h3>
                </div>

                <div className="nirmex-tech-table-wrap">
                  <table className="nirmex-tech-table">
                    <tbody>
                      <tr>
                        <th scope="row">Material Family</th>
                        <td>{material.name} ({material.badge})</td>
                      </tr>
                      <tr>
                        <th scope="row">Applicable Standards</th>
                        <td>{composite.standards}</td>
                      </tr>
                      <tr>
                        <th scope="row">Pressure Classes / Ratings</th>
                        <td>
                          {taxonomy.slug === 'forging' || taxonomy.slug === 'forged-fittings' ? '2000#, 3000#, 6000#, 9000# PSI (Socket Weld & Screwed)' :
                           taxonomy.slug === 'pipes-tubes' ? 'Sch 10, Sch 40, Sch 80, Sch 160, XXS' :
                           'Standard & High Pressure Formats per ASTM/ASME'}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Inspection &amp; Test Certificates</th>
                        <td>100% PMI Tested, Ultrasonic Tested (UT), Hydrostatically Tested, EN 10204 3.1 / 3.2 Mill Test Certificates</td>
                      </tr>
                      <tr>
                        <th scope="row">Surface Finishes</th>
                        <td>Pickled &amp; Passivated, Shot Blasted, Cold Drawn Bright, Electro-polished (Ra &lt; 0.4 µm for sanitary lines)</td>
                      </tr>
                      <tr>
                        <th scope="row">Size &amp; Dimensional Range</th>
                        <td>1/2" NB to 48" NB (Custom dimensions and tailored wall thickness machined to customer drawings)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Typical Industrial Applications */}
            <section className="nirmex-apps-sec" aria-labelledby="apps-heading">
              <div className="nirmex-tech-details-sec__header">
                <span className="nirmex-tech-dot" aria-hidden="true" />
                <h3 id="apps-heading" className="nirmex-tech-title">
                  Typical Mission-Critical Applications
                </h3>
              </div>
              <div className="nirmex-apps-grid" role="list">
                <div className="nirmex-app-card" role="listitem">
                  <h4 className="nirmex-app-card__title">Oil &amp; Gas Refining</h4>
                  <p className="nirmex-app-card__text">
                    High pressure catalytic crackers, hydrodesulfurization columns, and subsea hydrocarbon flowlines requiring strict NACE MR0175 sour service compliance.
                  </p>
                </div>
                <div className="nirmex-app-card" role="listitem">
                  <h4 className="nirmex-app-card__title">Chemical &amp; Petrochemical</h4>
                  <p className="nirmex-app-card__text">
                    Organic and inorganic acid transport, distillation columns, and aggressive chemical chlorination lines requiring superior pitting resistance.
                  </p>
                </div>
                <div className="nirmex-app-card" role="listitem">
                  <h4 className="nirmex-app-card__title">Marine &amp; Desalination</h4>
                  <p className="nirmex-app-card__text">
                    High-salinity reverse osmosis high-pressure headers, seawater ballast intake systems, and offshore rig firewater piping.
                  </p>
                </div>
                <div className="nirmex-app-card" role="listitem">
                  <h4 className="nirmex-app-card__title">Power &amp; Energy</h4>
                  <p className="nirmex-app-card__text">
                    Superheated main steam pipelines, nuclear reactor coolant loops, and supercritical boiler feed headers engineered for thermal fatigue resistance.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Products Grid */}
            <section className="nirmex-related-prods-sec" aria-labelledby="related-heading">
              <div className="nirmex-tech-details-sec__header">
                <span className="nirmex-tech-dot" aria-hidden="true" />
                <h3 id="related-heading" className="nirmex-tech-title">
                  Explore Complementary Industrial Lines
                </h3>
              </div>
              <div className="nirmex-related-grid" role="list">
                {relatedProducts.map((relProd) => (
                  <Link
                    key={relProd.slug}
                    to={`/products/${isFlange ? flangeData.slug : material.slug}/${relProd.slug}`}
                    className="nirmex-related-card"
                    role="listitem"
                  >
                    <div className="nirmex-related-card__info">
                      <span className="nirmex-related-card__division">
                        {relProd.categoryDivision}
                      </span>
                      <h4 className="nirmex-related-card__title">
                        {isFlange ? flangeData.materialName : material.name} {relProd.displayName || relProd.name}
                      </h4>
                      <p className="nirmex-related-card__desc">
                        {relProd.shortDesc}
                      </p>
                    </div>
                    <span className="nirmex-related-card__arrow" aria-hidden="true">
                      Explore Product →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* CTA Section Reused from Homepage */}
      <CTASection />

      {/* Interactive Material & Product Enquiry Dialog */}
      <MaterialEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        material={{
          name: isFlange ? `${flangeData.materialName} Flanges` : `${material.name} ${taxonomy.displayName || taxonomy.name}`,
          image: isFlange ? flangeData.heroImage : heroImage,
          grades: isFlange ? flangeData.availableGrades.map((g) => g.slug.toUpperCase()).join(', ') : grades.map((g) => g.slug.toUpperCase()).join(', '),
          standards: isFlange ? flangeData.standards : composite.standards,
        }}
        category={{
          division: isFlange ? 'Manufacture Division' : taxonomy.categoryDivision,
          name: isFlange ? `${flangeData.materialName} Flanges` : `${material.name} ${taxonomy.name}`,
        }}
      />
    </div>
  );
};

export default ProductDetailPage;
