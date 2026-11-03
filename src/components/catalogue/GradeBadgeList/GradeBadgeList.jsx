import React from 'react';
import { Link } from 'react-router-dom';
import { buildProductUrl } from '@/utils/seoRouting';
import './GradeBadgeList.css';

/**
 * GradeBadgeList Component
 * 
 * Interactive Compact Grade Boxes:
 * - Clean rectangular boxes with subtle rounded corners
 * - Red hover & active accents
 * - Fully accessible links navigating to Grade Detail Pages
 * - No images inside grade boxes
 */
export const GradeBadgeList = ({
  grades = [],
  materialSlug,
  productSlug,
  activeGradeSlug = null,
  title = 'Available Grades & Material Specifications',
  subtitle = 'Select any certified grade to inspect mechanical properties, chemical composition, and ASTM/ASME standards.',
}) => {
  if (!grades || grades.length === 0) return null;

  return (
    <section className="nirmex-grades-sec" aria-labelledby="grades-heading">
      <div className="nirmex-grades-sec__header">
        <div className="nirmex-grades-sec__title-wrap">
          <span className="nirmex-grades-sec__dot" aria-hidden="true" />
          <h3 id="grades-heading" className="nirmex-grades-sec__title">
            {title}
          </h3>
        </div>
        {subtitle && <p className="nirmex-grades-sec__sub">{subtitle}</p>}
      </div>

      <div className="nirmex-grades-grid" role="list">
        {grades.map((grade) => {
          const isActive = activeGradeSlug && activeGradeSlug.toLowerCase() === grade.slug.toLowerCase();
          const targetUrl = buildProductUrl({
            product: productSlug,
            material: materialSlug,
            grade: grade.slug,
          });

          return (
            <Link
              key={grade.slug}
              to={targetUrl}
              className={`nirmex-grade-box ${isActive ? 'nirmex-grade-box--active' : ''}`}
              role="listitem"
              title={`View complete specifications for ${grade.designation || grade.slug}`}
            >
              <span className="nirmex-grade-box__code">
                {grade.slug.toUpperCase()}
              </span>
              <span className="nirmex-grade-box__family">
                {grade.standard ? grade.standard.split('/')[0].trim() : 'ASTM'}
              </span>
              <span className="nirmex-grade-box__arrow" aria-hidden="true">→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default GradeBadgeList;

