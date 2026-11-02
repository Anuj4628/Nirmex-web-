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
import {
  findMasterMaterial,
  getRelatedProductsInMaterial,
  getOtherMaterialsForProduct,
  getMaterialPageUrl,
  getProductPageUrl,
  getMaterialProductUrl,
} from '@/config/navigationMatrix.data';
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
 * Comprehensive Two-Column Industrial Product Catalogue Page with Full Bidirectional Navigation:
 * - Material -> Product -> Product Detail -> Material
 * - Product -> Material -> Other Products -> Product Detail
 * - Section 9: Other Products in this Material
 * - Section 10: Other Materials for this Product
 * - Clickable breadcrumbs & direct back-links to Material and Product Category
 */
export const ProductDetailPage = () => {
  const { material: matParam, product: prodParam, slug, seoSlug } = useParams();
  const navigate = useNavigate();

  // Resolve slugs from route params
  let materialSlug = matParam || 'stainless-steel';
  let productSlug = prodParam || slug || 'flanges';

  // Handle SEO slug resolution fallback if routed via SEORouteResolver
  if (seoSlug) {
    const raw = seoSlug.toLowerCase();
    const clean = raw.replace(/-manufactured-in-mumbai$/, '');
    for (const prod of PRODUCT_TAXONOMY) {
      if (clean.startsWith(prod.slug + '-')) {
        productSlug = prod.slug;
        const remainder = clean.slice((prod.slug + '-').length);
        const mat = findMasterMaterial(remainder);
        if (mat) materialSlug = mat.slug;
        break;
      }
    }
  }

  // Handle single slug fallback
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

  const currentMatSlug = isFlange ? flangeData.slug : material.slug;
  const currentMaterialName = isFlange ? flangeData.materialName : material.name;
  const currentProdSlug = isFlange ? 'flanges' : taxonomy.slug;
  const currentProdDisplayName = isFlange ? 'Flanges' : (taxonomy.displayName || taxonomy.name);

  // Section 9: Other products available in the same material
  const otherProductsInMaterial = getRelatedProductsInMaterial(currentMatSlug, currentProdSlug).slice(0, 6);

  // Section 10: Other materials available for this product
  const otherMaterialsForProduct = getOtherMaterialsForProduct(currentMatSlug, currentProdSlug).slice(0, 6);

  return (
    <div className="nirmex-catalogue-page">
      <div className="nirmex-catalogue-container">
        {/* Topbar with Full Clickable Breadcrumb Trail (Section 11) */}
        <div className="nirmex-catalogue-topbar">
          <nav className="nirmex-detail-crumbs" aria-label="Breadcrumb">
            <Link to="/" className="nirmex-detail-crumb-link">Home</Link>
            <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
            <Link to={getMaterialPageUrl(currentMatSlug)} className="nirmex-detail-crumb-link">Materials</Link>
            <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
            <Link to={getMaterialPageUrl(currentMatSlug)} className="nirmex-detail-crumb-link">{currentMaterialName}</Link>
            <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
            <span className="nirmex-detail-crumb-active">{currentProdDisplayName}</span>
          </nav>
        </div>

        {/* Main 2-Column Layout */}
        <div className="nirmex-catalogue-layout">
          {/* LEFT COLUMN: Fixed Red Material Navigation Sidebar (All Products) */}
          <ProductMaterialSidebar
            activeMaterialSlug={currentMatSlug}
            activeProductSlug={currentProdSlug}
            productName={currentProdDisplayName}
          />

          {/* RIGHT COLUMN: Independent Scrolling Product Content */}
          <main className="nirmex-catalogue-content" id="catalogue-content">
            {/* Product Hero Header Card */}
            <section className="nirmex-prod-hero-card" aria-labelledby="prod-hero-title">
              <div className="nirmex-prod-hero-card__grid">
                <div className="nirmex-prod-hero-card__info">
                  {/* Two-Way Context Links: Direct to Material & Direct to Product */}
                  <div className="nirmex-prod-hero-card__eyebrow-wrap">
                    <Link
                      to={getMaterialPageUrl(currentMatSlug)}
                      className="nirmex-prod-hero-card__pill nirmex-prod-hero-card__pill--link"
                      title={`View all products available in ${currentMaterialName}`}
                    >
                      <span>Material: {currentMaterialName}</span>
                      <span aria-hidden="true" style={{ marginLeft: '4px' }}>↗</span>
                    </Link>
                    <span className="nirmex-prod-hero-card__pill-sep">•</span>
                    <Link
                      to={getProductPageUrl(currentProdSlug)}
                      className="nirmex-prod-hero-card__category nirmex-prod-hero-card__category--link"
                      title={`View all available materials for ${currentProdDisplayName}`}
                    >
                      <span>Product: {currentProdDisplayName}</span>
                      <span aria-hidden="true" style={{ marginLeft: '4px' }}>↗</span>
                    </Link>
                  </div>

                  <h1 id="prod-hero-title" className="nirmex-prod-hero-card__title">
                    {isFlange ? flangeData.pageHeading : `${material.name} ${taxonomy.displayName || taxonomy.name}`}
                  </h1>

                  <p className="nirmex-prod-hero-card__desc">
                    {isFlange ? flangeData.description : `${taxonomy.shortDesc} Precision manufactured and tested to stringent ASME, ASTM, and DIN standards for critical pressure vessel, pipeline, and structural applications.`}
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
                      href={`https://wa.me/919619806901?text=${encodeURIComponent(`Hello Nirmex Metal, I am inquiring about: ${isFlange ? flangeData.pageHeading : `${material.name} ${taxonomy.displayName || taxonomy.name}`}. Please share technical catalog and stock availability.`)}`}
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
                      src={isFlange ? flangeData.heroImage : heroImage}
                      alt={isFlange ? flangeData.pageHeading : `${material.name} ${taxonomy.name}`}
                      className="nirmex-prod-hero-card__img"
                      loading="eager"
                    />
                    <span className="nirmex-prod-hero-card__tag">
                      {isFlange ? flangeData.heroTag : 'In-House Testing'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Available Grades List (Section 14) */}
            {isFlange ? (
              <GradeBadgeList
                grades={flangeData.availableGrades.map((g) => ({
                  slug: g.slug,
                  designation: g.code,
                  standard: g.code.split(' ')[0] + ' ' + (g.code.split(' ')[1] || ''),
                }))}
                activeMaterialSlug={flangeData.slug}
                activeProductSlug="flanges"
              />
            ) : grades.length > 0 ? (
              <GradeBadgeList
                grades={grades}
                activeMaterialSlug={material.slug}
                activeProductSlug={taxonomy.slug}
              />
            ) : null}

            {/* Product Types Section */}
            {isFlange && flangeData.types && flangeData.types.length > 0 ? (
              <TypeCardGrid
                types={flangeData.types}
                activeMaterialSlug={flangeData.slug}
                activeProductSlug="flanges"
                productName="Flanges"
              />
            ) : taxonomy.showTypes && types.length > 0 ? (
              <TypeCardGrid
                types={types}
                activeMaterialSlug={material.slug}
                activeProductSlug={taxonomy.slug}
                productName={taxonomy.displayName || taxonomy.name}
              />
            ) : null}

            {/* Manufacturing Specifications Table */}
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
                        <td>{flangeData.materialName} ({flangeData.badge})</td>
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

            {/* ===============================================================
                SECTION 9: OTHER PRODUCTS IN THIS MATERIAL
                =============================================================== */}
            {otherProductsInMaterial.length > 0 && (
              <section className="nirmex-cross-nav-sec" aria-labelledby="other-prods-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="other-prods-heading" className="nirmex-tech-title">
                    Other {currentMaterialName} Products
                  </h3>
                </div>
                <p className="nirmex-cross-nav-subtitle">
                  Browse other industrial components available in certified {currentMaterialName}:
                </p>

                <div className="nirmex-cross-cards-grid" role="list">
                  {otherProductsInMaterial.map((relProd) => (
                    <article key={relProd.slug} className="nirmex-cross-card" role="listitem">
                      <div className="nirmex-cross-card__media">
                        <img
                          src={relProd.image}
                          alt={relProd.name}
                          className="nirmex-cross-card__img"
                          loading="lazy"
                        />
                        <span className="nirmex-cross-card__badge">{currentMaterialName}</span>
                      </div>
                      <div className="nirmex-cross-card__content">
                        <h4 className="nirmex-cross-card__title">{relProd.name}</h4>
                        <p className="nirmex-cross-card__desc">{relProd.shortDesc}</p>
                        <div className="nirmex-cross-card__actions">
                          <Link
                            to={relProd.destinationUrl}
                            className="nirmex-cross-card__link"
                            aria-label={`View technical specifications for ${relProd.name}`}
                          >
                            <span>Explore Product</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                          <button
                            type="button"
                            className="nirmex-cross-card__quote-btn"
                            onClick={handleOpenQuote}
                          >
                            Quote
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* ===============================================================
                SECTION 10: OTHER MATERIALS FOR THIS PRODUCT
                =============================================================== */}
            {otherMaterialsForProduct.length > 0 && (
              <section className="nirmex-cross-nav-sec" aria-labelledby="other-mats-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="other-mats-heading" className="nirmex-tech-title">
                    Other Materials Available for {currentProdDisplayName}
                  </h3>
                </div>
                <p className="nirmex-cross-nav-subtitle">
                  Need {currentProdDisplayName} in an alternative alloy? Switch to any of these certified materials:
                </p>

                <div className="nirmex-cross-mats-grid" role="list">
                  {otherMaterialsForProduct.map((otherMat) => (
                    <Link
                      key={otherMat.materialSlug}
                      to={otherMat.destinationUrl}
                      className="nirmex-cross-mat-card"
                      role="listitem"
                      title={`View ${otherMat.materialName} ${currentProdDisplayName}`}
                    >
                      <div className="nirmex-cross-mat-card__header">
                        <span className="nirmex-cross-mat-card__badge">{otherMat.shortName}</span>
                        <h4 className="nirmex-cross-mat-card__title">
                          {otherMat.materialName} {currentProdDisplayName}
                        </h4>
                      </div>
                      <p className="nirmex-cross-mat-card__desc">{otherMat.badge}</p>
                      <span className="nirmex-cross-mat-card__link">
                        <span>View {otherMat.shortName} {currentProdDisplayName}</span>
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
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
