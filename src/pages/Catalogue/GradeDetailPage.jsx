import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getCompositeProduct,
  getGradeBySlug,
  getGradesForMaterial,
  PRODUCT_TAXONOMY,
} from '@/config/catalogue.data';
import { getFlangeMaterialData } from '@/config/flangeMaterials.data';
import ProductMaterialSidebar from '@/components/catalogue/FlangeMaterialSidebar/FlangeMaterialSidebar';
import MaterialEnquiryModal from '@/components/products/MaterialEnquiryModal/MaterialEnquiryModal';
import CTASection from '@/components/home/CTA';
import './CatalogueCommon.css';
import './GradeDetailPage.css';

/**
 * GradeDetailPage Component
 * 
 * Comprehensive Technical Grade Specification Page:
 * - Dedicated Flange Material Navigation Sidebar for Flanges
 * - Complete chemical composition & mechanical properties tables
 * - International equivalents & standards
 * - Corrosion resistance & temperature thresholds
 * - Direct enquiry action prefilling grade data
 */
export const GradeDetailPage = () => {
  const { material: matParam, product: prodParam, gradeSlug } = useParams();
  const navigate = useNavigate();

  const materialSlug = matParam || 'stainless-steel';
  const productSlug = prodParam || 'flanges';

  const isFlange = productSlug === 'flanges';
  const flangeData = isFlange ? getFlangeMaterialData(materialSlug) : null;

  const composite = getCompositeProduct(materialSlug, productSlug);
  const { material, taxonomy, heroImage } = composite;

  // Retrieve grade details
  const fallbackGrade = isFlange && flangeData.availableGrades.length > 0
    ? {
        slug: flangeData.availableGrades[0].slug,
        designation: flangeData.availableGrades[0].code,
        family: `${flangeData.materialName} Alloy Grade`,
        standard: flangeData.standards,
        overview: flangeData.availableGrades[0].desc,
        chemicalComp: { Base: flangeData.materialName, Balance: 'ASTM Standard' },
        mechanicalProps: { tensile: '≥ 485 MPa', yield: '≥ 205 MPa', elongation: '≥ 25%' },
        thermalLimits: '-29°C to 450°C',
        corrosionNotes: `Engineered for high resistance in ${flangeData.materialName.toLowerCase()} environments.`,
        equivalents: { uns: flangeData.availableGrades[0].code, din: 'DIN / EN Verified' },
        applications: ['Process piping', 'High-pressure transmission', 'Offshore platforms'],
      }
    : composite.grades[0];

  const grade = getGradeBySlug(gradeSlug) || fallbackGrade;
  
  const allGrades = isFlange
    ? flangeData.availableGrades.map((g) => ({
        slug: g.slug,
        designation: g.code,
        standard: g.code.split(' ')[0] + ' ' + (g.code.split(' ')[1] || ''),
      }))
    : getGradesForMaterial(material.slug);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [materialSlug, productSlug, gradeSlug]);

  const handleOpenQuote = () => {
    setIsModalOpen(true);
  };

  const currentMaterialName = isFlange ? flangeData.materialName : material.name;
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
            <span className="nirmex-detail-crumb-active">{grade.slug.toUpperCase()}</span>
          </nav>

          <div className="nirmex-back-bar">
            <Link to={parentUrl} className="nirmex-back-link">
              ← Back to {currentMaterialName} {isFlange ? 'Flanges' : (taxonomy.displayName || taxonomy.name)} Overview
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

          {/* Right Main Grade Content */}
          <main className="nirmex-catalogue-content" id="grade-content">
            {/* Grade Header Card */}
            <section className="nirmex-grade-hero-card" aria-labelledby="grade-hero-title">
              <div className="nirmex-grade-hero-card__header">
                <div className="nirmex-grade-hero-card__eyebrow-wrap">
                  <span className="nirmex-grade-badge">{grade.family || `${currentMaterialName} Grade`}</span>
                  <span className="nirmex-grade-std">{grade.standard || (isFlange ? flangeData.standards : composite.standards)}</span>
                </div>

                <h1 id="grade-hero-title" className="nirmex-grade-hero-card__title">
                  {grade.designation || `${currentMaterialName} ${grade.slug.toUpperCase()}`}
                </h1>

                <p className="nirmex-grade-hero-card__desc">
                  {grade.overview || `Certified ${currentMaterialName} grade precision engineered and tested to international manufacturing standards.`}
                </p>

                <div className="nirmex-grade-hero-card__actions">
                  <button
                    type="button"
                    onClick={handleOpenQuote}
                    className="nirmex-btn nirmex-btn--primary"
                  >
                    <span>Request Quotation for Grade {grade.slug.toUpperCase()}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <a
                    href={`https://wa.me/919619806901?text=${encodeURIComponent(`Hello Nirmex Metal, I am inquiring about: Grade ${grade.designation || grade.slug.toUpperCase()} for ${currentMaterialName} ${isFlange ? 'Flanges' : taxonomy.name}. Please share technical data sheet and pricing.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nirmex-btn nirmex-btn--wa"
                  >
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>

              {/* Quick Grade Switcher Bar */}
              <div className="nirmex-grade-switcher-bar">
                <span className="nirmex-grade-switcher-label">Switch Grade:</span>
                <div className="nirmex-grade-switcher-pills">
                  {allGrades.map((g) => (
                    <Link
                      key={g.slug}
                      to={`/products/${isFlange ? flangeData.slug : material.slug}/${isFlange ? 'flanges' : taxonomy.slug}/grades/${g.slug}`}
                      className={`nirmex-grade-pill ${g.slug.toLowerCase() === grade.slug.toLowerCase() ? 'nirmex-grade-pill--active' : ''}`}
                    >
                      {g.slug.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Chemical Composition Table */}
            {grade.chemicalComp && (
              <section className="nirmex-tech-details-sec" aria-labelledby="chemical-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="chemical-heading" className="nirmex-tech-title">
                    Chemical Composition (% Weight)
                  </h3>
                </div>

                <div className="nirmex-tech-table-wrap">
                  <table className="nirmex-tech-table">
                    <thead>
                      <tr>
                        {Object.keys(grade.chemicalComp).map((elem) => (
                          <th key={elem} scope="col">{elem}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(grade.chemicalComp).map((val, idx) => (
                          <td key={idx}><strong>{val}</strong></td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Mechanical Properties Table */}
            {grade.mechanicalProps && (
              <section className="nirmex-tech-details-sec" aria-labelledby="mech-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="mech-heading" className="nirmex-tech-title">
                    Mechanical Properties &amp; Minimum Thresholds
                  </h3>
                </div>

                <div className="nirmex-tech-table-wrap">
                  <table className="nirmex-tech-table">
                    <tbody>
                      {grade.mechanicalProps.tensile && (
                        <tr>
                          <th scope="row">Tensile Strength (Rm)</th>
                          <td><strong>{grade.mechanicalProps.tensile}</strong></td>
                        </tr>
                      )}
                      {grade.mechanicalProps.yield && (
                        <tr>
                          <th scope="row">Yield Strength (Rp 0.2%)</th>
                          <td><strong>{grade.mechanicalProps.yield}</strong></td>
                        </tr>
                      )}
                      {grade.mechanicalProps.elongation && (
                        <tr>
                          <th scope="row">Elongation at Break (A5)</th>
                          <td>{grade.mechanicalProps.elongation}</td>
                        </tr>
                      )}
                      {grade.mechanicalProps.hardness && (
                        <tr>
                          <th scope="row">Hardness Limit</th>
                          <td>{grade.mechanicalProps.hardness}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Thermal & Corrosion Notes */}
            {(grade.thermalLimits || grade.corrosionNotes) && (
              <section className="nirmex-tech-details-sec" aria-labelledby="corr-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="corr-heading" className="nirmex-tech-title">
                    Corrosion Resistance &amp; Temperature Performance
                  </h3>
                </div>

                <div className="nirmex-notes-grid">
                  {grade.thermalLimits && (
                    <div className="nirmex-note-card">
                      <h4 className="nirmex-note-card__title">Temperature Thresholds</h4>
                      <p className="nirmex-note-card__text">{grade.thermalLimits}</p>
                    </div>
                  )}
                  {grade.corrosionNotes && (
                    <div className="nirmex-note-card">
                      <h4 className="nirmex-note-card__title">Corrosion Profile</h4>
                      <p className="nirmex-note-card__text">{grade.corrosionNotes}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* International Equivalents */}
            {grade.equivalents && (
              <section className="nirmex-tech-details-sec" aria-labelledby="equiv-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="equiv-heading" className="nirmex-tech-title">
                    International Cross-Reference &amp; Standards
                  </h3>
                </div>

                <div className="nirmex-tech-table-wrap">
                  <table className="nirmex-tech-table">
                    <tbody>
                      {Object.entries(grade.equivalents).map(([std, val]) => (
                        <tr key={std}>
                          <th scope="row" style={{ textTransform: 'uppercase' }}>{std} Standard</th>
                          <td><strong>{val}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Typical Applications */}
            {grade.applications && grade.applications.length > 0 && (
              <section className="nirmex-apps-sec" aria-labelledby="grade-apps-heading">
                <div className="nirmex-tech-details-sec__header">
                  <span className="nirmex-tech-dot" aria-hidden="true" />
                  <h3 id="grade-apps-heading" className="nirmex-tech-title">
                    Proven Mission-Critical Applications
                  </h3>
                </div>

                <div className="nirmex-apps-grid" role="list">
                  {grade.applications.map((app, idx) => (
                    <div key={idx} className="nirmex-app-card" role="listitem">
                      <h4 className="nirmex-app-card__title">Application 0{idx + 1}</h4>
                      <p className="nirmex-app-card__text">{app}</p>
                    </div>
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
          name: `${currentMaterialName} Grade ${grade.slug.toUpperCase()} ${isFlange ? 'Flanges' : taxonomy.name}`,
          image: isFlange ? flangeData.heroImage : heroImage,
          grades: grade.slug.toUpperCase(),
          standards: grade.standard || (isFlange ? flangeData.standards : composite.standards),
        }}
        category={{
          division: isFlange ? 'Manufacture Division' : taxonomy.categoryDivision,
          name: `${currentMaterialName} ${isFlange ? 'Flanges' : taxonomy.name}`,
        }}
      />
    </div>
  );
};

export default GradeDetailPage;
