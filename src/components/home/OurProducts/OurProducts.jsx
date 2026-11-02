import React from 'react';
import ProductCard from './ProductCard';
import { OUR_PRODUCTS } from './products.data';
import './OurProducts.css';

/**
 * OurProducts Component - Home Page Section 2
 * Red Industrial Canvas + White Rounded Cards + 1 + 2 + 3 Hierarchy
 * Matches exact reference design mock-up
 */
export const OurProducts = () => {
  const featuredProduct = OUR_PRODUCTS[0]; // 01 Forged Fittings (Featured)
  const row2Products = OUR_PRODUCTS.slice(1, 3); // 02 Flanges, 03 Fasteners
  const row3Products = OUR_PRODUCTS.slice(3, 6); // 04 Pipes & Tubes, 05 Sheets & Plates, 06 Rods & Bars

  return (
    <section
      id="product"
      className="our-products"
      aria-labelledby="our-products-heading"
    >
      <div className="our-products__container">
        {/* =================================================================
            1. Centered Section Header (Matching Reference Design)
            ================================================================= */}
        <header className="our-products__header">
          <div className="our-products__eyebrow-wrap">
            <span className="our-products__eyebrow-line" aria-hidden="true" />
            <span className="our-products__eyebrow">OUR PRODUCTS</span>
            <span className="our-products__eyebrow-line" aria-hidden="true" />
          </div>

          <h2 id="our-products-heading" className="our-products__title">
            PRECISION PRODUCTS. BUILT FOR INDUSTRY.
          </h2>

          <p className="our-products__subtitle">
            Explore our range of precision-engineered metal products designed for demanding industrial, piping and engineering applications.
          </p>
        </header>

        {/* =================================================================
            2. Products Display: 1 + 2 + 3 Hierarchy (White Rounded Cards)
            ================================================================= */}
        <div className="our-products__display">
          {/* Row 1: 1 Featured Product Card */}
          <div className="our-products__row our-products__row--featured">
            <ProductCard
              product={featuredProduct}
              isFeatured={true}
              rowType="featured"
            />
          </div>

          {/* Row 2: 2 Balanced Product Cards */}
          <div className="our-products__row our-products__row--two-col">
            {row2Products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFeatured={false}
                rowType="two-col"
              />
            ))}
          </div>

          {/* Row 3: 3 Balanced Product Cards */}
          <div className="our-products__row our-products__row--three-col">
            {row3Products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFeatured={false}
                rowType="three-col"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
