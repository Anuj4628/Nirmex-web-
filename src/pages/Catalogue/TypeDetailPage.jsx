import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getCompositeProduct,
  getFlangeTypeBySlug,
  getFastenerTypeBySlug,
  getForgedFittingTypeBySlug,
  getTypesForProduct,
} from '@/config/catalogue.data';
import { getFlangeMaterialData } from '@/config/flangeMaterials.data';
import ProductMaterialSidebar from '@/components/catalogue/FlangeMaterialSidebar/FlangeMaterialSidebar';
import MaterialEnquiryModal from '@/components/products/MaterialEnquiryModal/MaterialEnquiryModal';
import CTASection from '@/components/home/CTA';
import './CatalogueCommon.css';
import './TypeDetailPage.css';

/**
 * TypeDetailPage Component
 * 
 * Individual Product Configuration / Type Detail Page:
 * - Dedicated Flange Material Navigation Sidebar for Flanges
 * - Authentic material-specific component photos and engineering specs
 * - Design & connection characteristics
 * - Dimensional standards, pressure ratings & facings
 * - "Related Types" section at the bottom with image cards
 * - Direct enquiry action
 */
export const TypeDetailPage = () => {
  const { material: matParam, product: prodParam, typeSlug } = useParams();
  const navigate = useNavigate();

  const materialSlug = matParam || 'stainless-steel';
  const productSlug = prodParam || 'flanges';

  const isFlange = productSlug === 'flanges';
  const flangeData = isFlange ? getFlangeMaterialData(materialSlug) : null;

  const composite = getCompositeProduct(materialSlug, productSlug);
  const { material, taxonomy, grades } = composite;

  // Retrieve type object
  let currentType = null;
  let relatedTypes = [];

  if (isFlange && flangeData) {
    currentType = flangeData.types.find((t) => t.slug === typeSlug) || flangeData.types[0];
    relatedTypes = flangeData.types.filter((t) => t.slug !== currentType.slug).slice(0, 4);
  } else {
    let typeObj = null;
    if (taxonomy.slug === 'fasteners') {
      typeObj = getFastenerTypeBySlug(typeSlug, materialSlug);
    } else if (taxonomy.slug === 'forged-fittings' || taxonomy.slug === 'forging') {
      typeObj = getForgedFittingTypeBySlug(typeSlug, materialSlug);
    }
    const allTypes = getTypesForProduct(taxonomy.slug, materialSlug);
    currentType = typeObj || allTypes[0] || {};
    relatedTypes = allTypes.filter((t) => t.slug !== currentType.slug).slice(0, 4);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [materialSlug, productSlug, typeSlug]);

  const handleOpenQuote = () => {
    setIsModalOpen(true);
  };

  const currentMaterialName = isFlange ? flangeData.materialName : material.name;
  const currentStandards = currentType.standards || (isFlange ? flangeData.standards : composite.standards);
  const parentUrl = isFlange ? `/products/${flangeData.slug}/flanges` : `/products/${material.slug}/${taxonomy.slug}`;

  return (
    <div className="nirmex-catalogue-page">
      <div className="nirmex-catalogue-container">
        {/* Topbar with Full Breadcrumbs & Back Navigation */}
        <div className="nirmex-catalogue-topbar">
          <nav className="nirmex-detail-crumbs" aria-label="Breadcrumb">
            <Link to="/" className="nirmex-detail-crumb-link">Home</Link>
            <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
            <Link to={isFlange ? '/products/flanges' : `/products/${taxonomy.slug}`} className="nirmex-detail-crumb-link">Products</Link>
            <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
            <Link to={parentUrl} className="nirmex-detail-crumb-link">
              {currentMaterialName} {isFlange ? 'Flanges' : (taxonomy.displayName || taxonomy.name)}
            </Link>
            <span className="nirmex-detail-crumb-sep" aria-hidden="true">/</span>
            <span className="nirmex-detail-crumb-active">{currentType.name}</span>
          </nav>

          <div className="nirmex-back-bar">
            <Link to={parentUrl} className="nirmex-back-link">
              ← Back to All {currentMaterialName} {isFlange ? 'Flange' : (taxonomy.displayName || taxonomy.name)} Types
            </Link>
          </div>
        </div>

        <div className="nirmex-catalogue-layout">
          {/* Fixed Red Material Navigation Sidebar (All Products) */}
          <ProductMaterialSidebar
            activeMaterialSlug={isFlange ? flangeData.slug : material.slug}
            activeProductSlug={isFlange ? 'flanges' : taxonomy.slug}
            productName={isFlange ? 'Flanges' : (taxonomy.displayName || taxonomy.name)}
          />

          {/* Right Main Type Content */}
          <main className="nirmex-catalogue-content" id="type-content">
            {/* Type Hero Overview Card */}
            <section className="nirmex-type-hero-card" aria-labelledby="type-hero-title">
              <div className="nirmex-type-hero-card__grid">
                <div className="nirmex-type-hero-card__info">
                  <div className="nirmex-type-hero-card__eyebrow-wrap">
                    <span className="nirmex-type-hero-pill">{currentMaterialName}</span>
                    {currentType.shortCode && (
                      <span className="nirmex-type-hero-code">{currentType.shortCode}</span>
                    )}
                  </div>

                  <h1 id="type-hero-title" className="nirmex-type-hero-card__title">
                    {currentMaterialName} {currentType.name}
                  </h1>

                  <p className="nirmex-type-hero-card__desc">
                    {currentType.purpose || currentType.shortDesc || `High-integrity ${currentMaterialName} ${currentType.name.toLowerCase()} precision CNC machined from mill-certified forged billets for critical pressure piping.`}
                  </p>

                  <div className="nirmex-type-hero-card__actions">
                    <button
                      type="button"
                      onClick={handleOpenQuote}
                      className="nirmex-btn nirmex-btn--primary"
                    >
                      <span>Request Quote for {currentType.name}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>

                    <a
                      href={`https://wa.me/919619806901?text=${encodeURIComponent(`Hello Nirmex Metal, I am inquiring about: ${currentMaterialName} ${currentType.name}. Please share technical dimensions and quote.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nirmex-btn nirmex-btn--wa"
                    >
                      <span>Instant WhatsApp Inquiry</span>
                    </a>
                  </div>
                </div>

                <div className="nirmex-type-hero-card__media">
                  <div className="nirmex-type-hero-card__img-wrap">
                    <img
                      src={currentType.image}
                      alt={`${currentMaterialName} ${currentType.name}`}
                      className="nirmex-type-hero-card__img"
                      loading="eager"
                    />
                    <span className="nirmex-type-hero-card__tag">
                      {currentMaterialName} Monolithic Forging
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Design & Connection Characteristics Table */}
            <section className="nirmex-tech-details-sec" aria-labelledby="design-heading">
              <div className="nirmex-tech-details-sec__header">
                <span className="nirmex-tech-dot" aria-hidden="true" />
                <h3 id="design-heading" className="nirmex-tech-title">
                  Design, Dimensions &amp; Pressure Standards
                </h3>
              </div>

              <div className="nirmex-tech-table-wrap">
                <table className="nirmex-tech-table">
                  <tbody>
                    <tr>
                      <th scope="row">Component Type</th>
                      <td><strong>{currentType.name}</strong> ({currentType.shortCode || 'Standard Form'})</td>
                    </tr>
                    <tr>
                      <th scope="row">Manufacturing Standards</th>
                      <td>{currentStandards}</td>
                    </tr>
                    <tr>
                      <th scope="row">Pressure Classes / Ratings</th>
                      <td>{isFlange ? flangeData.pressureClasses : (currentType.pressureClasses || 'Class 150 to 2500')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Flange Facing Types</th>
                      <td>{isFlange ? flangeData.facings : (currentType.facings || 'Raised Face (RF), Flat Face (FF), RTJ')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Inspection &amp; Quality Approvals</th>
                      <td>100% Dimensional Inspection, Positive Material Identification (PMI), EN 10204 3.1 Certified</td>
                    </tr>
                    <tr>
                      <th scope="row">Available Material Grades</th>
                      <td>
                        {isFlange
                          ? flangeData.availableGrades.map((g) => g.code).join(' • ')
                          : grades.map((g) => g.slug.toUpperCase()).join(' • ')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Engineering Highlights & Performance Features */}
            {currentType.features && currentType.features.length > 0 && (
              <section className="nirmex-tech-details-sec" aria-labelledby="features-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="features-heading" className="nirmex-tech-title">
                    Engineering Characteristics &amp; Benefits
                  </h3>
                </div>

                <div className="nirmex-features-grid">
                  {currentType.features.map((feat, idx) => (
                    <div key={idx} className="nirmex-feature-card">
                      <span className="nirmex-feature-num">0{idx + 1}</span>
                      <p className="nirmex-feature-text">{feat}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Applications */}
            {currentType.applications && currentType.applications.length > 0 && (
              <section className="nirmex-apps-sec" aria-labelledby="type-apps-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="type-apps-heading" className="nirmex-tech-title">
                    Recommended Industrial Applications
                  </h3>
                </div>

                <div className="nirmex-type-apps-pills">
                  {currentType.applications.map((app, idx) => (
                    <div key={idx} className="nirmex-type-app-pill">
                      <span className="nirmex-app-check">✓</span>
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* RELATED TYPES SECTION AT THE BOTTOM */}
            {relatedTypes.length > 0 && (
              <section className="nirmex-related-types-sec" aria-labelledby="related-types-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="related-types-heading" className="nirmex-tech-title">
                    Related {currentMaterialName} {isFlange ? 'Flange' : (taxonomy.displayName || taxonomy.name)} Types
                  </h3>
                </div>

                <div className="nirmex-related-types-grid" role="list">
                  {relatedTypes.map((relType) => (
                    <Link
                      key={relType.slug}
                      to={`/products/${isFlange ? flangeData.slug : material.slug}/${isFlange ? 'flanges' : taxonomy.slug}/types/${relType.slug}`}
                      className="nirmex-related-type-card"
                      role="listitem"
                    >
                      <div className="nirmex-related-type-card__media">
                        <img
                          src={relType.image}
                          alt={`${currentMaterialName} ${relType.name}`}
                          className="nirmex-related-type-card__img"
                          loading="lazy"
                        />
                        {relType.shortCode && (
                          <span className="nirmex-related-type-card__badge">
                            {relType.shortCode}
                          </span>
                        )}
                      </div>
                      <div className="nirmex-related-type-card__info">
                        <h4 className="nirmex-related-type-card__name">
                          {relType.name}
                        </h4>
                        <p className="nirmex-related-type-card__desc">
                          {relType.shortDesc}
                        </p>
                        <span className="nirmex-related-type-card__link">
                          Explore Type →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      <CTASection />

      <MaterialEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        material={{
          name: `${currentMaterialName} ${currentType.name}`,
          image: currentType.image,
          grades: isFlange
            ? flangeData.availableGrades.map((g) => g.slug.toUpperCase()).join(', ')
            : grades.map((g) => g.slug.toUpperCase()).join(', '),
          standards: currentStandards,
        }}
        category={{
          division: isFlange ? 'Manufacture Division' : taxonomy.categoryDivision,
          name: `${currentMaterialName} ${isFlange ? 'Flanges' : taxonomy.name}`,
        }}
      />
    </div>
  );
};

export default TypeDetailPage;
