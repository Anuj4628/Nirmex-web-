import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import MaterialPage from '@/pages/Material/MaterialPage';
import ProductMaterialPage from '@/pages/Products/ProductMaterialPage';
import ProductDetailPage from '@/pages/Catalogue/ProductDetailPage';
import GradeDetailPage from '@/pages/Catalogue/GradeDetailPage';
import { MASTER_MATERIALS, findMasterMaterial, normalizeProductSlug } from '@/config/navigationMatrix.data';
import { PRODUCT_TAXONOMY } from '@/config/catalogue.data';

/**
 * SEORouteResolver Component
 * 
 * Intelligently resolves SEO-friendly slug patterns:
 * 1. Material Slugs: /stainless-steel, /carbon-steel, /nickel-alloy, etc.
 * 2. Product SEO Slugs: /flanges-manufactured-in-mumbai, /forged-fittings-manufactured-in-mumbai
 * 3. Material-Product SEO Slugs: /flanges-stainless-steel-manufactured-in-mumbai
 * 4. Grade-Specific SEO Slugs: /flanges-stainless-steel-310S-manufactured-in-mumbai
 */
export const SEORouteResolver = () => {
  const { seoSlug } = useParams();

  if (!seoSlug) {
    return <Navigate to="/" replace />;
  }

  const raw = seoSlug.toLowerCase().trim();

  // 1. Direct Material Match (e.g. /stainless-steel, /carbon-steel, /titanium)
  const isDirectMaterial = MASTER_MATERIALS.some(
    (m) => m.slug === raw || m.id === raw || (m.aliases && m.aliases.includes(raw))
  );
  if (isDirectMaterial) {
    return <MaterialPage />;
  }

  // Strip common SEO suffixes if present
  let clean = raw
    .replace(/-manufactured-in-mumbai$/, '')
    .replace(/-manufacturer-in-mumbai$/, '')
    .replace(/-stockist-in-mumbai$/, '')
    .replace(/-supplier-in-mumbai$/, '')
    .replace(/-exporters-in-mumbai$/, '');

  // 2. Direct Product Category Match (e.g. /flanges-manufactured-in-mumbai)
  const isDirectProduct = PRODUCT_TAXONOMY.some(
    (p) => p.slug === clean || (p.aliases && p.aliases.includes(clean))
  );
  if (isDirectProduct) {
    return <ProductMaterialPage />;
  }

  // 3. Composite Material + Product or Product + Material
  // e.g. flanges-stainless-steel, stainless-steel-flanges, forged-fittings-stainless-steel
  let matchedProduct = null;
  let matchedMaterial = null;
  let matchedGrade = null;

  // Try to find product taxonomy match from the beginning or end of clean string
  for (const prod of PRODUCT_TAXONOMY) {
    const prodSlug = prod.slug;
    const aliases = prod.aliases || [];
    const allProdKeys = [prodSlug, ...aliases];

    for (const pKey of allProdKeys) {
      if (clean.startsWith(pKey + '-')) {
        matchedProduct = prodSlug;
        const remainder = clean.slice((pKey + '-').length);
        
        // Check if remainder contains material and optional grade
        for (const mat of MASTER_MATERIALS) {
          const matKeys = [mat.slug, ...(mat.aliases || [])];
          for (const mKey of matKeys) {
            if (remainder === mKey) {
              matchedMaterial = mat.slug;
              break;
            } else if (remainder.startsWith(mKey + '-')) {
              matchedMaterial = mat.slug;
              matchedGrade = remainder.slice((mKey + '-').length);
              break;
            }
          }
          if (matchedMaterial) break;
        }
        break;
      } else if (clean.endsWith('-' + pKey)) {
        matchedProduct = prodSlug;
        const remainder = clean.slice(0, -(pKey.length + 1));
        const mat = findMasterMaterial(remainder);
        if (mat) matchedMaterial = mat.slug;
        break;
      }
    }
    if (matchedProduct && matchedMaterial) break;
  }

  // If matched grade + material + product
  if (matchedProduct && matchedMaterial && matchedGrade) {
    return <GradeDetailPage />;
  }

  // If matched material + product
  if (matchedProduct && matchedMaterial) {
    return <ProductDetailPage />;
  }

  // Fallback heuristic: check if any material name is inside the string
  const fallbackMat = findMasterMaterial(clean);
  if (fallbackMat && clean.includes(fallbackMat.slug)) {
    return <MaterialPage />;
  }

  // Default fallback to Home
  return <Navigate to="/" replace />;
};

export default SEORouteResolver;

