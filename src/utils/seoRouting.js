/**
 * NIRMEX METAL INDUSTRIES — MASTER SEO ROUTING & URL ENGINE
 * 
 * Central Source of Truth for:
 * 1. Canonical SEO URL Construction
 * 2. Bi-directional URL Parsing & Strict Validation
 * 3. Product -> Material -> Grade -> Product Type Hierarchy
 * 4. Automatic Canonical Suffix: "-manufactured-in-mumbai"
 */

import {
  PRODUCT_TAXONOMY,
  MATERIALS as CATALOGUE_MATERIALS,
  GRADES_DB,
  FLANGE_TYPES,
  FASTENER_BASE_TYPES,
  FORGED_FITTING_TYPES,
  BUTT_WELD_BASE_TYPES,
  getGradesForMaterial,
  getTypesForProduct,
} from '@/config/catalogue.data';
import { MASTER_MATERIALS, findMasterMaterial } from '@/config/navigationMatrix.data';
import { getFlangeMaterialData } from '@/config/flangeMaterials.data';

export const LOCATION_SUFFIX = '-manufactured-in-mumbai';
export const SITE_DOMAIN = 'https://nirmexmetal.com';

/**
 * Standardizes product slug to canonical identifier
 */
export const normalizeProductSlug = (slug) => {
  if (!slug) return 'flanges';
  const s = slug.toLowerCase().trim();
  if (s === 'forging' || s === 'forgings') return 'forged-fittings';
  if (s === 'circles') return 'circle';
  if (s === 'buttweld' || s === 'butt-weld') return 'butt-weld-fittings';
  if (s === 'pipes' || s === 'tubes' || s === 'pipe-tubes') return 'pipes-tubes';
  if (s === 'sheets' || s === 'plates') return 'sheets-plates';
  if (s === 'rods' || s === 'bars') return 'rods-bars';
  return s;
};

/**
 * Standardizes material slug to canonical identifier
 */
export const normalizeMaterialSlug = (slug) => {
  if (!slug) return 'stainless-steel';
  const s = slug.toLowerCase().trim();
  const found = findMasterMaterial(s);
  return found ? found.slug : s;
};

/**
 * Standardizes grade slug to clean alphanumeric format
 */
export const normalizeGradeSlug = (slug) => {
  if (!slug) return '';
  return slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

/**
 * Standardizes product type slug
 */
export const normalizeTypeSlug = (slug) => {
  if (!slug) return '';
  let s = slug.toLowerCase().trim();
  s = s.replace(/-flanges$/, '').replace(/-fittings$/, '').replace(/-fasteners$/, '');
  return s;
};

/**
 * MASTER URL BUILDER
 * Generates canonical SEO URLs across all 4 hierarchical levels:
 * 
 * 1. Product: /products/flanges-manufactured-in-mumbai
 * 2. Product + Material: /products/flanges-stainless-steel-manufactured-in-mumbai
 * 3. Product + Material + Grade: /products/flanges-stainless-steel-304-manufactured-in-mumbai
 * 4. Product + Material + Grade + Type: /products/flanges-stainless-steel-304-weld-neck-flanges-manufactured-in-mumbai
 */
export const buildProductUrl = ({ product, material, grade, type }) => {
  const prod = normalizeProductSlug(product || 'flanges');

  // Level 1: Product-only category landing
  if (!material && !grade && !type) {
    return `/products/${prod}${LOCATION_SUFFIX}`;
  }

  const mat = normalizeMaterialSlug(material);

  // If grade provided
  const g = grade ? normalizeGradeSlug(grade) : null;

  // If type provided
  const t = type ? normalizeTypeSlug(type) : null;

  // Level 4: Product + Material + Grade + Type
  if (t && g) {
    // Determine friendly type suffix (e.g. weld-neck-flanges, bolts-fasteners)
    let typeName = t;
    if (prod === 'flanges' && !t.includes('flange')) {
      typeName = `${t}-flanges`;
    }
    return `/products/${prod}-${mat}-${g}-${typeName}${LOCATION_SUFFIX}`;
  }

  // Level 4b: Product + Material + Type (no specific grade)
  if (t && !g) {
    let typeName = t;
    if (prod === 'flanges' && !t.includes('flange')) {
      typeName = `${t}-flanges`;
    }
    return `/products/${prod}-${mat}-${typeName}${LOCATION_SUFFIX}`;
  }

  // Level 3: Product + Material + Grade
  if (g) {
    return `/products/${prod}-${mat}-${g}${LOCATION_SUFFIX}`;
  }

  // Level 2: Product + Material
  return `/products/${prod}-${mat}${LOCATION_SUFFIX}`;
};

/**
 * Canonical Material Landing Page URL
 * e.g. /stainless-steel, /copper, /duplex-super-duplex
 */
export const getMaterialUrl = (materialSlug) => {
  const mat = findMasterMaterial(materialSlug);
  return `/${mat ? mat.slug : 'stainless-steel'}`;
};

/**
 * Retrieves valid grades list for a given product and material
 */
export const getValidGrades = (productSlug, materialSlug) => {
  const normProd = normalizeProductSlug(productSlug);
  const normMat = normalizeMaterialSlug(materialSlug);

  if (normProd === 'flanges') {
    const flangeData = getFlangeMaterialData(normMat);
    if (flangeData && flangeData.availableGrades) {
      return flangeData.availableGrades.map((g) => ({
        slug: normalizeGradeSlug(g.slug),
        code: g.code,
        desc: g.desc,
      }));
    }
  }

  const catGrades = getGradesForMaterial(normMat);
  if (catGrades && catGrades.length > 0) {
    return catGrades.map((g) => ({
      slug: normalizeGradeSlug(g.slug),
      code: g.designation || g.slug,
      desc: g.overview || '',
    }));
  }

  const master = findMasterMaterial(normMat);
  if (master && master.popularGrades) {
    return master.popularGrades.map((p) => ({
      slug: normalizeGradeSlug(p),
      code: p,
      desc: `${master.name} Grade ${p}`,
    }));
  }

  return [];
};

/**
 * Retrieves valid types list for a given product and material
 */
export const getValidTypes = (productSlug, materialSlug) => {
  const normProd = normalizeProductSlug(productSlug);
  const normMat = normalizeMaterialSlug(materialSlug);

  if (normProd === 'flanges') {
    const flangeData = getFlangeMaterialData(normMat);
    if (flangeData && flangeData.types) {
      return flangeData.types.map((t) => ({
        slug: normalizeTypeSlug(t.slug),
        name: t.name,
        image: t.image,
        desc: t.desc,
      }));
    }
    return FLANGE_TYPES.map((t) => ({
      slug: normalizeTypeSlug(t.slug),
      name: t.name,
      image: t.image,
      desc: t.desc,
    }));
  }

  const types = getTypesForProduct(normProd, normMat);
  if (types && types.length > 0) {
    return types.map((t) => ({
      slug: normalizeTypeSlug(t.slug),
      name: t.name,
      image: t.image,
      desc: t.desc,
    }));
  }

  return [];
};

/**
 * MASTER URL PARSER & STRICT VALIDATOR
 * Decodes any incoming URL / slug and validates against real metallurgical databases.
 * Returns { isValid: false } if the combination is invalid.
 */
export const parseProductUrl = (rawPathOrSlug) => {
  if (!rawPathOrSlug) return { isValid: false, reason: 'Empty URL' };

  let clean = rawPathOrSlug
    .toLowerCase()
    .trim()
    .replace(/^\/products\//, '')
    .replace(/^\//, '')
    .replace(/\/$/, '');

  // 1. Direct Material Page Match (e.g. "stainless-steel", "copper", "duplex-super-duplex")
  const directMat = MASTER_MATERIALS.find(
    (m) => m.slug === clean || m.id === clean || (m.aliases && m.aliases.includes(clean))
  );
  if (directMat) {
    return {
      isValid: true,
      level: 'material',
      material: directMat,
      canonicalUrl: getMaterialUrl(directMat.slug),
    };
  }

  // Strip location suffixes
  clean = clean
    .replace(/-manufactured-in-mumbai$/, '')
    .replace(/-manufacturer-in-mumbai$/, '')
    .replace(/-stockist-in-mumbai$/, '')
    .replace(/-supplier-in-mumbai$/, '')
    .replace(/-exporters-in-mumbai$/, '');

  // 2. Direct Product Category Match (e.g. "flanges", "forged-fittings")
  const directProduct = PRODUCT_TAXONOMY.find(
    (p) => p.slug === clean || (p.aliases && p.aliases.includes(clean))
  );
  if (directProduct) {
    return {
      isValid: true,
      level: 'product',
      product: directProduct,
      canonicalUrl: buildProductUrl({ product: directProduct.slug }),
    };
  }

  // 3. Composite Parsing: Product + Material [+ Grade] [+ Type]
  // Match product taxonomy from start
  let matchedProduct = null;
  let remainderAfterProduct = '';

  for (const prod of PRODUCT_TAXONOMY) {
    const keys = [prod.slug, ...(prod.aliases || [])];
    for (const key of keys) {
      if (clean === key) {
        matchedProduct = prod;
        remainderAfterProduct = '';
        break;
      } else if (clean.startsWith(key + '-')) {
        matchedProduct = prod;
        remainderAfterProduct = clean.slice(key.length + 1);
        break;
      }
    }
    if (matchedProduct) break;
  }

  if (!matchedProduct) {
    return { isValid: false, reason: 'Product not recognized' };
  }

  if (!remainderAfterProduct) {
    return {
      isValid: true,
      level: 'product',
      product: matchedProduct,
      canonicalUrl: buildProductUrl({ product: matchedProduct.slug }),
    };
  }

  // Match Material from remainder
  let matchedMaterial = null;
  let remainderAfterMaterial = '';

  for (const mat of MASTER_MATERIALS) {
    const keys = [mat.slug, mat.id, ...(mat.aliases || [])];
    // Sort keys by length descending to match longer aliases first (e.g. 'duplex-super-duplex' before 'duplex')
    keys.sort((a, b) => b.length - a.length);

    for (const key of keys) {
      if (remainderAfterMaterial) break;
      if (remainderAfterProduct === key) {
        matchedMaterial = mat;
        remainderAfterMaterial = '';
        break;
      } else if (remainderAfterProduct.startsWith(key + '-')) {
        matchedMaterial = mat;
        remainderAfterMaterial = remainderAfterProduct.slice(key.length + 1);
        break;
      }
    }
    if (matchedMaterial) break;
  }

  // Special case: Duplex 2205 / Super Duplex 2507 shorthand (e.g. "duplex-2205", "super-duplex-2507")
  if (!matchedMaterial) {
    if (remainderAfterProduct.startsWith('duplex-') || remainderAfterProduct.startsWith('super-duplex-')) {
      matchedMaterial = findMasterMaterial('duplex-super-duplex');
      if (remainderAfterProduct.startsWith('duplex-')) {
        remainderAfterMaterial = remainderAfterProduct.slice('duplex-'.length);
      } else {
        remainderAfterMaterial = remainderAfterProduct.slice('super-duplex-'.length);
      }
    }
  }

  if (!matchedMaterial) {
    return { isValid: false, reason: 'Material not recognized' };
  }

  // Validate that this material is supported for this product
  if (
    matchedMaterial.supportedProductSlugs &&
    !matchedMaterial.supportedProductSlugs.includes(matchedProduct.slug) &&
    !matchedMaterial.supportedProductSlugs.includes(normalizeProductSlug(matchedProduct.slug))
  ) {
    return { isValid: false, reason: `Material ${matchedMaterial.name} does not support product ${matchedProduct.name}` };
  }

  // If no remainder, this is Level 2: Product + Material
  if (!remainderAfterMaterial) {
    return {
      isValid: true,
      level: 'product-material',
      product: matchedProduct,
      material: matchedMaterial,
      canonicalUrl: buildProductUrl({ product: matchedProduct.slug, material: matchedMaterial.slug }),
    };
  }

  // Now inspect remainder for Grade and/or Type
  const validGrades = getValidGrades(matchedProduct.slug, matchedMaterial.slug);
  const validTypes = getValidTypes(matchedProduct.slug, matchedMaterial.slug);

  let matchedGrade = null;
  let matchedType = null;

  // Clean remainder
  const normRemainder = remainderAfterMaterial;

  // A. Check if remainder directly matches a grade
  for (const g of validGrades) {
    const gSlug = normalizeGradeSlug(g.slug);
    const gCode = normalizeGradeSlug(g.code);
    if (normRemainder === gSlug || normRemainder === gCode) {
      matchedGrade = g;
      break;
    }
  }

  if (matchedGrade) {
    return {
      isValid: true,
      level: 'grade',
      product: matchedProduct,
      material: matchedMaterial,
      grade: matchedGrade,
      canonicalUrl: buildProductUrl({
        product: matchedProduct.slug,
        material: matchedMaterial.slug,
        grade: matchedGrade.slug,
      }),
    };
  }

  // B. Check if remainder directly matches a type
  for (const t of validTypes) {
    const tSlug = normalizeTypeSlug(t.slug);
    const tWithProd = `${tSlug}-${matchedProduct.slug}`;
    if (normRemainder === tSlug || normRemainder === tWithProd) {
      matchedType = t;
      break;
    }
  }

  if (matchedType) {
    return {
      isValid: true,
      level: 'type',
      product: matchedProduct,
      material: matchedMaterial,
      type: matchedType,
      canonicalUrl: buildProductUrl({
        product: matchedProduct.slug,
        material: matchedMaterial.slug,
        type: matchedType.slug,
      }),
    };
  }

  // C. Check composite: Grade + Type (e.g. "304-weld-neck-flanges")
  for (const g of validGrades) {
    const gKeys = [normalizeGradeSlug(g.slug), normalizeGradeSlug(g.code)];
    for (const gKey of gKeys) {
      if (normRemainder.startsWith(gKey + '-')) {
        const potentialType = normRemainder.slice(gKey.length + 1);
        for (const t of validTypes) {
          const tSlug = normalizeTypeSlug(t.slug);
          const tWithProd = `${tSlug}-${matchedProduct.slug}`;
          if (potentialType === tSlug || potentialType === tWithProd) {
            matchedGrade = g;
            matchedType = t;
            break;
          }
        }
        if (matchedGrade && matchedType) break;
      }
    }
    if (matchedGrade && matchedType) break;
  }

  if (matchedGrade && matchedType) {
    return {
      isValid: true,
      level: 'type',
      product: matchedProduct,
      material: matchedMaterial,
      grade: matchedGrade,
      type: matchedType,
      canonicalUrl: buildProductUrl({
        product: matchedProduct.slug,
        material: matchedMaterial.slug,
        grade: matchedGrade.slug,
        type: matchedType.slug,
      }),
    };
  }

  // If remainder exists but neither grade nor type could be validated -> Invalid combination (No fallback!)
  return {
    isValid: false,
    reason: `Invalid grade or type specification: "${remainderAfterMaterial}"`,
  };
};

/**
 * Returns all valid SEO routes across the website for sitemap.xml generation
 */
export const getAllValidSEORoutes = () => {
  const routes = [];

  // Core Static Pages
  routes.push({ url: '/', priority: '1.0', changefreq: 'daily' });
  routes.push({ url: '/about', priority: '0.8', changefreq: 'monthly' });
  routes.push({ url: '/contact', priority: '0.9', changefreq: 'monthly' });

  // Material Pages
  for (const mat of MASTER_MATERIALS) {
    routes.push({
      url: getMaterialUrl(mat.slug),
      priority: '0.9',
      changefreq: 'weekly',
    });
  }

  // Product Category Pages
  for (const prod of PRODUCT_TAXONOMY) {
    routes.push({
      url: buildProductUrl({ product: prod.slug }),
      priority: '0.9',
      changefreq: 'weekly',
    });

    // Valid Materials for this Product
    for (const mat of MASTER_MATERIALS) {
      const isSupported =
        mat.supportedProductSlugs &&
        (mat.supportedProductSlugs.includes(prod.slug) ||
          mat.supportedProductSlugs.includes(normalizeProductSlug(prod.slug)));

      if (!isSupported) continue;

      // Product + Material Level
      routes.push({
        url: buildProductUrl({ product: prod.slug, material: mat.slug }),
        priority: '0.85',
        changefreq: 'weekly',
      });

      // Product + Material + Grade Level
      const grades = getValidGrades(prod.slug, mat.slug);
      for (const g of grades) {
        routes.push({
          url: buildProductUrl({ product: prod.slug, material: mat.slug, grade: g.slug }),
          priority: '0.8',
          changefreq: 'weekly',
        });
      }

      // Product + Material + Type Level
      const types = getValidTypes(prod.slug, mat.slug);
      for (const t of types) {
        // Representative first grade if available
        const repGrade = grades.length > 0 ? grades[0].slug : null;
        routes.push({
          url: buildProductUrl({
            product: prod.slug,
            material: mat.slug,
            grade: repGrade,
            type: t.slug,
          }),
          priority: '0.8',
          changefreq: 'weekly',
        });
      }
    }
  }

  return routes;
};
