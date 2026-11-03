import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import { PRODUCT_TAXONOMY } from '@/config/catalogue.data';
import { MASTER_MATERIALS } from '@/config/navigationMatrix.data';
import { buildProductUrl, getMaterialUrl } from '@/utils/seoRouting';
import './NotFoundPage.css';

export const NotFoundPage = ({ reason } = {}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="nirmex-404-page">
      <SEO
        title="404 - Product Configuration Not Found | Nirmex Metal Industries"
        description="The requested industrial product, material specification, or grade configuration does not exist in our active manufacturing directory."
      />

      <div className="nirmex-404-container">
        <div className="nirmex-404-card">
          <div className="nirmex-404-badge">
            <span className="nirmex-404-badge-dot" aria-hidden="true" />
            <span>METALLURGICAL DIRECTORY</span>
          </div>

          <h1 className="nirmex-404-code">404</h1>
          <h2 className="nirmex-404-title">Specification Not Found</h2>
          <p className="nirmex-404-desc">
            {reason
              ? `The requested combination (${reason}) is not recognized in our certified mill catalogue.`
              : 'The requested product, material, or grade configuration could not be found.'}
          </p>

          <div className="nirmex-404-actions">
            <Link to="/" className="nirmex-btn nirmex-btn--primary">
              Return to Homepage
            </Link>
            <Link to="/products/flanges-manufactured-in-mumbai" className="nirmex-btn nirmex-btn--secondary">
              Explore Products
            </Link>
          </div>

          <div className="nirmex-404-suggestions">
            <div className="nirmex-404-suggest-col">
              <h3 className="nirmex-404-suggest-heading">Available Products</h3>
              <div className="nirmex-404-links">
                {PRODUCT_TAXONOMY.slice(0, 6).map((p) => (
                  <Link key={p.slug} to={buildProductUrl({ product: p.slug })} className="nirmex-404-link">
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="nirmex-404-suggest-col">
              <h3 className="nirmex-404-suggest-heading">Available Materials</h3>
              <div className="nirmex-404-links">
                {MASTER_MATERIALS.slice(0, 6).map((m) => (
                  <Link key={m.slug} to={getMaterialUrl(m.slug)} className="nirmex-404-link">
                    {m.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

