import React from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import MaterialPage from '@/pages/Material/MaterialPage';
import ProductMaterialPage from '@/pages/Products/ProductMaterialPage';
import ProductDetailPage from '@/pages/Catalogue/ProductDetailPage';
import GradeDetailPage from '@/pages/Catalogue/GradeDetailPage';
import TypeDetailPage from '@/pages/Catalogue/TypeDetailPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import { parseProductUrl } from '@/utils/seoRouting';

/**
 * SEORouteResolver Component
 * 
 * Dynamic Master Route Resolver across the 4-level hierarchy:
 * 1. Material Level: /stainless-steel, /copper, /duplex-super-duplex
 * 2. Product Level: /products/flanges-manufactured-in-mumbai
 * 3. Product + Material Level: /products/flanges-stainless-steel-manufactured-in-mumbai
 * 4. Grade Level: /products/flanges-stainless-steel-304-manufactured-in-mumbai
 * 5. Type Level: /products/flanges-stainless-steel-304-weld-neck-flanges-manufactured-in-mumbai
 * 
 * Strict Validation:
 * - Invalid combinations return 404 (NotFoundPage)
 * - Never silently falls back to Stainless Steel
 */
export const SEORouteResolver = () => {
  const { seoSlug, slug, product, material } = useParams();
  const location = useLocation();

  const rawSlug = seoSlug || slug || location.pathname;
  const result = parseProductUrl(rawSlug);

  if (!result.isValid) {
    return <NotFoundPage reason={result.reason} />;
  }

  // 1. Material Landing Page
  if (result.level === 'material') {
    return <MaterialPage materialSlug={result.material.slug} />;
  }

  // 2. Product Category Landing Page
  if (result.level === 'product') {
    return <ProductMaterialPage productSlug={result.product.slug} />;
  }

  // 3. Product + Material Product Description Page
  if (result.level === 'product-material') {
    return (
      <ProductDetailPage
        materialSlug={result.material.slug}
        productSlug={result.product.slug}
      />
    );
  }

  // 4. Grade Detail Page
  if (result.level === 'grade') {
    return (
      <GradeDetailPage
        materialSlug={result.material.slug}
        productSlug={result.product.slug}
        gradeSlug={result.grade.slug}
      />
    );
  }

  // 5. Product Type Detail Page
  if (result.level === 'type') {
    return (
      <TypeDetailPage
        materialSlug={result.material.slug}
        productSlug={result.product.slug}
        gradeSlug={result.grade?.slug}
        typeSlug={result.type.slug}
      />
    );
  }

  return <NotFoundPage />;
};

export default SEORouteResolver;
