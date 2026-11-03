/**
 * NIRMEX METAL INDUSTRIES — UNIFIED MATERIAL ↔ PRODUCT NAVIGATION MATRIX
 * 
 * Central Source of Truth for Bidirectional Navigation:
 * - Material -> Products -> Product Detail -> Material
 * - Product -> Materials -> Other Products -> Product Detail
 */

import {
  MATERIALS as CATALOGUE_MATERIALS,
  PRODUCT_TAXONOMY,
  GRADES_DB,
  resolveCatalogueAsset,
  getMaterialBySlug as getCatMaterialBySlug,
  getProductTaxonomyBySlug as getCatProductBySlug,
  getFastenerHeroImage,
  getButtWeldHeroImage,
  getForgingImageForMaterial,
} from './catalogue.data';
import { getFlangeMaterialData } from './flangeMaterials.data';
import { buildProductUrl, getMaterialUrl } from '@/utils/seoRouting';

import { PRODUCT_CATEGORIES } from './productMaterials.data';

// ============================================================================
// 1. MASTER MATERIALS DIRECTORY
// ============================================================================
export const MASTER_MATERIALS = [
  {
    id: 'stainless-steel',
    slug: 'stainless-steel',
    aliases: ['ss', 'stainless', 'stainless-steel-products'],
    name: 'Stainless Steel',
    shortName: 'SS',
    seoTitle: 'Stainless Steel Products Manufacturer & Exporter in Mumbai',
    heroTitle: 'Stainless Steel Industrial Products',
    badge: 'Austenitic & Ferritic Grades',
    overview:
      'Nirmex Metal Industries is an ISO 9001:2015 certified manufacturer, stockist, and worldwide exporter of premier stainless steel industrial piping components. Our stainless steel product catalog covers forged fittings, industrial flanges, buttweld pipe fittings, high-tensile fasteners, seamless & welded pipes, sheets, and engineered round bars across 300 & 400 series alloys.',
    popularGrades: ['304', '304L', '316', '316L', '321', '347', '310S', '904L'],
    specifications: 'ASTM A182, ASTM A240, ASTM A312, ASTM A403, ASTM A193/A194, ASME B16.5, ASME B16.11',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'dairy-pharma-fittings',
      'flat-bars',
      'circle',
      'ferrule-fittings',
      'hose-pipes',
      'perforated-sheets',
      'wire-mesh',
    ],
  },
  {
    id: 'carbon-steel',
    slug: 'carbon-steel',
    aliases: ['cs', 'carbon', 'carbon-steel-products'],
    name: 'Carbon Steel',
    shortName: 'CS',
    seoTitle: 'Carbon Steel Products Manufacturer & Stockist in Mumbai',
    heroTitle: 'Carbon Steel Industrial Products',
    badge: 'High-Tensile & Low-Temp Service',
    overview:
      'Engineered for heavy-duty pressure containment, elevated mechanical loads, and cryogenic-to-high-temperature service. Manufactured in ASTM A105, A350 LF2 Class 1/2, ASTM A106 Grade B, and ASTM A234 WPB with certified impact toughness and complete NDT inspection.',
    popularGrades: ['A105', 'A350 LF2', 'A106 Gr. B', 'A234 WPB', 'A694 F52', 'A193 B7'],
    specifications: 'ASTM A105, ASTM A350, ASTM A106, ASTM A234, ASTM A193 B7 / A194 2H, ASME B16.5, ASME B16.9',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'circle',
      'flat-bars',
    ],
  },
  {
    id: 'copper',
    slug: 'copper',
    aliases: ['copper-alloys', 'cupro-nickel', 'brass', 'cu'],
    name: 'Copper & Copper Alloys',
    shortName: 'Copper',
    seoTitle: 'Copper & Cupro-Nickel Products Manufacturer in Mumbai',
    heroTitle: 'Copper & Cupro-Nickel Products',
    badge: 'Antifouling Marine & Thermal',
    overview:
      'Pure electrolytic copper, cupro-nickel (90/10 & 70/30), naval brass, and phosphor bronze components featuring superior electrical and thermal conductivity combined with natural resistance to marine biofouling and macro-algae attachment.',
    popularGrades: ['Cu-Ni 90/10 (C70600)', 'Cu-Ni 70/30 (C71500)', 'Naval Brass C46400', 'Pure Copper C11000'],
    specifications: 'ASTM B171, ASTM B151, ASTM B111, ASTM B466, ASME SB171, DIN 86019',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'flat-bars',
    ],
  },
  {
    id: 'duplex-super-duplex',
    slug: 'duplex-super-duplex',
    aliases: ['duplex', 'super-duplex', 'duplex-stainless-steel', 'super-duplex-stainless-steel', 'dss', 'sdss'],
    name: 'Duplex & Super Duplex',
    shortName: 'Duplex & Super',
    seoTitle: 'Duplex & Super Duplex Steel Products Manufacturer in Mumbai',
    heroTitle: 'Duplex & Super Duplex Products',
    badge: 'PREN ≥ 42 Marine & Sour Gas',
    overview:
      'Biphasic austenitic-ferritic microstructure combining twice the yield strength of conventional 316L stainless steel with extraordinary resistance to chloride pitting, crevice corrosion, and stress corrosion cracking in aggressive offshore marine and desalination environments.',
    popularGrades: ['UNS S31803 (F51)', 'UNS S32205 (2205)', 'UNS S32750 (2507 / F53)', 'UNS S32760 (F55)'],
    specifications: 'ASTM A182 F51/F53/F55, ASTM A790, ASTM A815, NACE MR0175 / ISO 15156, NORSOK M-650',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'flat-bars',
    ],
  },
  {
    id: 'alloy-steel',
    slug: 'alloy-steel',
    aliases: ['as', 'alloy', 'alloy-steel-products'],
    name: 'Alloy Steel',
    shortName: 'Alloy Steel',
    badge: 'Chrome-Moly Elevated Temp',
    overview:
      'Premier chromium-molybdenum alloy steel components engineered for thermal power plants, petrochemical reformers, and high-pressure steam headers. Retaining high creep-rupture strength and thermal fatigue resistance up to 650°C.',
    popularGrades: ['F11', 'F22', 'F5', 'F9', 'F91', 'P11', 'P22', 'P91', 'B16'],
    specifications: 'ASTM A182 (F11, F22, F91), ASTM A335 (P11, P22, P91), ASTM A234 (WP11, WP22), ASME B16.5',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'circle',
      'flat-bars',
    ],
  },
  {
    id: 'nickel-alloy',
    slug: 'nickel-alloy',
    aliases: ['nickel-alloys', 'nickel', 'exotic-alloy'],
    name: 'Nickel Alloy',
    shortName: 'Nickel Alloy',
    seoTitle: 'Nickel Alloy Products Manufacturer & Stockist in Mumbai',
    heroTitle: 'Nickel Alloy Industrial Products',
    badge: 'Severe Acid & Chemical Resistance',
    overview:
      'Solid-solution and precipitation-strengthened nickel-based alloys providing supreme resistance to hot reducing and oxidizing mineral acids, wet chlorine, and high-temperature stress corrosion in chemical processing, nuclear, and aerospace sectors.',
    popularGrades: ['Inconel 625', 'Inconel 718', 'Monel 400', 'Hastelloy C276', 'Incoloy 825', 'Nickel 200/201'],
    specifications: 'ASTM B564, ASTM B166, ASTM B168, ASTM B444, ASTM B472, ASME SB564',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'circle',
      'flat-bars',
    ],
  },
  {
    id: 'inconel',
    slug: 'inconel',
    aliases: ['inconel-alloys'],
    name: 'Inconel',
    shortName: 'Inconel',
    seoTitle: 'Inconel Products Manufacturer & Exporter in Mumbai',
    heroTitle: 'Inconel High-Temp Superalloy Products',
    badge: 'Oxidation Resistant up to 1000°C',
    overview:
      'Austenitic nickel-chromium-molybdenum superalloys specifically designed for service in gas turbine exhaust, subsea wellheads, chemical reactors, and nuclear steam generators where resistance to cyclic oxidation and carburization is critical.',
    popularGrades: ['Inconel 600', 'Inconel 601', 'Inconel 625', 'Inconel 718', 'Incoloy 800H', 'Incoloy 825'],
    specifications: 'ASTM B564, ASTM B446, ASTM B443, ASTM B444, ASME SB564, AMS 5662',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'circle',
      'flat-bars',
    ],
  },
  {
    id: 'monel',
    slug: 'monel',
    aliases: ['monel-alloys'],
    name: 'Monel',
    shortName: 'Monel',
    seoTitle: 'Monel Products Manufacturer & Supplier in Mumbai',
    heroTitle: 'Monel Marine & Chemical Products',
    badge: 'Hydrofluoric Acid & Seawater Expert',
    overview:
      'Nickel-copper solid solution alloy with outstanding resistance to rapidly flowing seawater, chlorinated brine, and non-oxidizing acids including hydrofluoric and sulfuric acids. Highly ductile with excellent sub-zero mechanical properties.',
    popularGrades: ['Monel 400 (UNS N04400)', 'Monel K-500 (UNS N05500)'],
    specifications: 'ASTM B564, ASTM B164, ASTM B127, ASTM B165, ASME SB564, QQ-N-281',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'circle',
      'flat-bars',
    ],
  },
  {
    id: 'hastelloy',
    slug: 'hastelloy',
    aliases: ['hastelloy-alloys'],
    name: 'Hastelloy',
    shortName: 'Hastelloy',
    seoTitle: 'Hastelloy Products Manufacturer in Mumbai',
    heroTitle: 'Hastelloy Corrosion-Resistant Products',
    badge: 'Wet Chlorine & Acid Slurry Master',
    overview:
      'Nickel-molybdenum-chromium alloys formulated for exceptional resistance to localized pitting, crevice attack, and reducing acid environments such as hydrochloric, sulfuric, and phosphoric acid slurries.',
    popularGrades: ['Hastelloy C-276 (UNS N10276)', 'Hastelloy C-22 (UNS N06022)', 'Hastelloy B-2 (UNS N10665)'],
    specifications: 'ASTM B564, ASTM B574, ASTM B575, ASTM B622, ASME SB564, NACE MR0175',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'circle',
      'flat-bars',
    ],
  },
  {
    id: 'titanium',
    slug: 'titanium',
    aliases: ['ti', 'titanium-alloys'],
    name: 'Titanium',
    shortName: 'Titanium',
    seoTitle: 'Titanium Products Manufacturer & Exporter in Mumbai',
    heroTitle: 'Titanium Lightweight & Marine Products',
    badge: 'High Strength-to-Weight Ratio',
    overview:
      'Commercially pure and alpha-beta titanium alloys delivering complete immunity to marine seawater pitting, exceptional biocompatibility, and high thermal efficiency in lightweight aerospace, desalination, and chemical plating equipment.',
    popularGrades: ['Grade 1', 'Grade 2 (CP Titanium)', 'Grade 5 (Ti-6Al-4V)', 'Grade 7 (Ti-0.2Pd)'],
    specifications: 'ASTM B381, ASTM B348, ASTM B265, ASTM B861, ASME SB381, ISO 5832-2',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'circle',
      'flat-bars',
    ],
  },
  {
    id: 'high-alloy',
    slug: 'high-alloy',
    aliases: ['high-alloys', 'special-alloys', 'exotic-alloys'],
    name: 'High Alloy',
    shortName: 'High Alloy',
    seoTitle: 'High Alloy & Specialty Steel Products Manufacturer in Mumbai',
    heroTitle: 'High Alloy & Special Metallurgy Products',
    badge: 'Corrosion & High Temperature Service',
    overview:
      'Engineered specialty high alloy steel and superalloy piping components formulated for severe thermal, corrosive, and mechanical environments across aerospace, nuclear, chemical processing, and offshore energy industries.',
    popularGrades: ['Alloy 20', 'Alloy 28', 'Sanicro 28', '904L', 'SMO 254', 'AL-6XN'],
    specifications: 'ASTM B462, ASTM B464, ASTM B473, ASTM A182, ASME SB462',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'circle',
      'flat-bars',
    ],
  },
  {
    id: 'aluminium',
    slug: 'aluminium',
    aliases: ['aluminum', 'al', 'aluminium-alloys'],
    name: 'Aluminium',
    shortName: 'Aluminium',
    seoTitle: 'Aluminium Products Manufacturer & Stockist in Mumbai',
    heroTitle: 'Aluminium & Aluminium Alloy Products',
    badge: 'Lightweight & High Thermal Conductivity',
    overview:
      'Precision manufactured aluminium and high-strength aerospace alloy piping components, fittings, flanges, sheets, and bars offering exceptional strength-to-weight ratio, atmospheric corrosion resistance, and thermal efficiency.',
    popularGrades: ['6061-T6', '6082-T6', '5083-H111', '5086', '7075-T6', '2014'],
    specifications: 'ASTM B247, ASTM B221, ASTM B209, ASME SB247, DIN EN 573-3',
    supportedProductSlugs: [
      'flanges',
      'forging',
      'butt-weld-fittings',
      'fasteners',
      'pipes-tubes',
      'sheets-plates',
      'rods-bars',
      'flat-bars',
    ],
  },
];

// ============================================================================
// 2. RETRIEVAL & MAPPING HELPERS
// ============================================================================

/**
 * Normalizes input slug and finds master material definition
 */
export const findMasterMaterial = (slugOrAlias) => {
  if (!slugOrAlias) return MASTER_MATERIALS[0];
  const s = slugOrAlias.toLowerCase().trim();
  const direct = MASTER_MATERIALS.find(
    (m) => m.slug === s || m.id === s || (m.aliases && m.aliases.includes(s))
  );
  if (direct) return direct;

  // Fallback heuristic — Note: Duplex/Super Duplex MUST be checked before Stainless Steel
  if (s.includes('duplex') || s.includes('dss') || s.includes('sdss')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'duplex-super-duplex') || MASTER_MATERIALS[0];
  }
  if (s.includes('carbon')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'carbon-steel') || MASTER_MATERIALS[0];
  }
  if (s.includes('copper') || s.includes('brass') || s.includes('cupro')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'copper') || MASTER_MATERIALS[0];
  }
  if (s.includes('titanium')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'titanium') || MASTER_MATERIALS[0];
  }
  if (s.includes('inconel') || s.includes('incoloy')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'inconel') || MASTER_MATERIALS[0];
  }
  if (s.includes('monel')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'monel') || MASTER_MATERIALS[0];
  }
  if (s.includes('hastelloy')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'hastelloy') || MASTER_MATERIALS[0];
  }
  if (s.includes('high-alloy') || s.includes('high alloy')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'high-alloy') || MASTER_MATERIALS[0];
  }
  if (s.includes('aluminium') || s.includes('aluminum')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'aluminium') || MASTER_MATERIALS[0];
  }
  if (s.includes('alloy') && !s.includes('nickel') && !s.includes('copper')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'alloy-steel') || MASTER_MATERIALS[0];
  }
  if (s.includes('nickel')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'nickel-alloy') || MASTER_MATERIALS[0];
  }
  if (s.includes('stainless') || s.includes('ss')) {
    return MASTER_MATERIALS.find((m) => m.slug === 'stainless-steel') || MASTER_MATERIALS[0];
  }

  return MASTER_MATERIALS[0];
};

/**
 * Normalizes product slug
 */
export const normalizeProductSlug = (slug) => {
  if (!slug) return 'flanges';
  const s = slug.toLowerCase().trim();
  if (s === 'forged-fittings' || s === 'forgings') return 'forging';
  if (s === 'circles') return 'circle';
  return s;
};

/**
 * Returns clean canonical material URL
 */
export const getMaterialPageUrl = (materialSlug) => {
  return getMaterialUrl(materialSlug);
};

/**
 * Returns clean canonical product category URL
 */
export const getProductPageUrl = (productSlug) => {
  return buildProductUrl({ product: productSlug });
};

/**
 * Returns material-specific product page URL
 */
export const getMaterialProductUrl = (materialSlug, productSlug) => {
  return buildProductUrl({ product: productSlug, material: materialSlug });
};

/**
 * Returns grade detail page URL
 */
export const getGradeDetailUrl = (materialSlug, productSlug, gradeSlug) => {
  return buildProductUrl({ product: productSlug, material: materialSlug, grade: gradeSlug });
};

const matchMaterial = (matDef, matItem) => {
  if (!matDef || !matItem) return false;
  const mName = (matItem.name || '').toLowerCase();
  const mId = (matItem.id || '').toLowerCase();
  const s = matDef.slug;

  if (s === 'duplex-super-duplex') {
    return mId.includes('duplex') || mName.includes('duplex');
  }
  if (s === 'carbon-steel') {
    return mId.includes('cs') || mId.includes('carbon') || (mName.includes('carbon') && !mName.includes('stainless'));
  }
  if (s === 'stainless-steel') {
    return (mId.includes('ss') || mName.includes('stainless')) && !mName.includes('duplex') && !mId.includes('duplex');
  }
  if (s === 'copper') {
    return mId.includes('copper') || (mName.includes('copper') && !mName.includes('monel'));
  }
  if (s === 'alloy-steel') {
    return (mId.includes('alloy-steel') || mId.includes('-as') || mName.includes('alloy steel')) && !mName.includes('nickel');
  }
  if (s === 'nickel-alloy') {
    return (mId.includes('nickel') || mName.includes('nickel alloy')) && !mName.includes('cupro');
  }
  if (s === 'inconel') {
    return mId.includes('inconel') || mName.includes('inconel');
  }
  if (s === 'monel') {
    return mId.includes('monel') || mName.includes('monel');
  }
  if (s === 'hastelloy') {
    return mId.includes('hastelloy') || mName.includes('hastelloy');
  }
  if (s === 'titanium') {
    return mId.includes('titanium') || mId.includes('-ti') || mName.includes('titanium');
  }
  if (s === 'aluminium') {
    return mId.includes('aluminium') || mId.includes('aluminum') || mName.includes('aluminium') || mName.includes('aluminum');
  }
  if (s === 'high-alloy') {
    return mId.includes('high-alloy') || mName.includes('high alloy');
  }
  return mId.includes(s) || mName.includes(matDef.name.toLowerCase());
};

/**
 * Returns all products available for a given material
 */
export const getProductsForMaterial = (materialSlug) => {
  const mat = findMasterMaterial(materialSlug);
  const supported = mat.supportedProductSlugs || [];
  
  return supported.map((prodSlug) => {
    const tax = PRODUCT_TAXONOMY.find((p) => p.slug === prodSlug) || {
      slug: prodSlug,
      name: prodSlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      displayName: prodSlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      shortDesc: `High integrity ${mat.name} industrial components manufactured to international standards.`,
    };

    // Resolve an authentic photo for this material + product combo
    let cardImage = '';
    if (prodSlug === 'flanges') {
      const fData = getFlangeMaterialData(mat.slug);
      if (fData && fData.heroImage) cardImage = fData.heroImage;
    } else if (prodSlug === 'butt-weld-fittings') {
      const bwImg = getButtWeldHeroImage(mat.slug);
      if (bwImg) cardImage = bwImg;
    } else if (prodSlug === 'fasteners') {
      const fstImg = getFastenerHeroImage(mat.slug);
      if (fstImg) cardImage = fstImg;
    } else if (prodSlug === 'forging') {
      const frgImg = getForgingImageForMaterial(mat.slug, 'elbow');
      if (frgImg) cardImage = frgImg;
    }

    if (!cardImage) {
      const catData = PRODUCT_CATEGORIES[prodSlug];
      if (catData && catData.materials) {
        const match = catData.materials.find((m) => matchMaterial(mat, m));
        if (match && match.image) cardImage = match.image;
      }
      if (!cardImage && catData && catData.heroImage) {
        cardImage = catData.heroImage;
      }
    }

    if (!cardImage) {
      cardImage = resolveCatalogueAsset(`our product images/${prodSlug}.png`) ||
                  resolveCatalogueAsset(`our product images/${prodSlug}.jpg`);
    }

    return {
      slug: tax.slug,
      name: `${mat.name} ${tax.displayName || tax.name}`,
      productFamilyName: tax.displayName || tax.name,
      baseSlug: tax.slug,
      shortDesc: tax.shortDesc,
      image: cardImage,
      destinationUrl: getMaterialProductUrl(mat.slug, tax.slug),
      standards: tax.slug === 'flanges' ? 'ASME B16.5, DIN EN 1092-1' :
                 tax.slug === 'forging' ? 'ASME B16.11, BS 3799' :
                 tax.slug === 'fasteners' ? 'ASTM A193 / A194' :
                 tax.slug === 'butt-weld-fittings' ? 'ASME B16.9' :
                 'ASTM / ASME, EN 10204 3.1 MTC',
    };
  });
};

/**
 * Returns all materials available for a given product
 */
export const getMaterialsForProduct = (productSlug) => {
  const norm = normalizeProductSlug(productSlug);
  return MASTER_MATERIALS.filter((mat) => mat.supportedProductSlugs.includes(norm)).map((mat) => {
    let cardImage = '';
    if (norm === 'flanges') {
      const fData = getFlangeMaterialData(mat.slug);
      if (fData && fData.heroImage) cardImage = fData.heroImage;
    } else if (norm === 'butt-weld-fittings') {
      const bwImg = getButtWeldHeroImage(mat.slug);
      if (bwImg) cardImage = bwImg;
    } else if (norm === 'fasteners') {
      const fstImg = getFastenerHeroImage(mat.slug);
      if (fstImg) cardImage = fstImg;
    } else if (norm === 'forging') {
      const frgImg = getForgingImageForMaterial(mat.slug, 'elbow');
      if (frgImg) cardImage = frgImg;
    }

    if (!cardImage) {
      const catData = PRODUCT_CATEGORIES[norm];
      if (catData && catData.materials) {
        const match = catData.materials.find((m) => matchMaterial(mat, m));
        if (match && match.image) cardImage = match.image;
      }
      if (!cardImage && catData && catData.heroImage) {
        cardImage = catData.heroImage;
      }
    }
    if (!cardImage) {
      cardImage = resolveCatalogueAsset(`our product images/${norm}.png`);
    }

    return {
      materialSlug: mat.slug,
      materialName: mat.name,
      shortName: mat.shortName,
      badge: mat.badge,
      overview: mat.overview,
      image: cardImage,
      popularGrades: mat.popularGrades,
      destinationUrl: getMaterialProductUrl(mat.slug, norm),
      materialPageUrl: getMaterialPageUrl(mat.slug),
    };
  });
};

/**
 * Returns other products available in the same material (excluding current product)
 */
export const getRelatedProductsInMaterial = (materialSlug, currentProductSlug) => {
  const currentNorm = normalizeProductSlug(currentProductSlug);
  const allProds = getProductsForMaterial(materialSlug);
  return allProds.filter((p) => p.baseSlug !== currentNorm);
};

/**
 * Returns other materials available for the current product (excluding current material)
 */
export const getOtherMaterialsForProduct = (currentMaterialSlug, productSlug) => {
  const mat = findMasterMaterial(currentMaterialSlug);
  const allMats = getMaterialsForProduct(productSlug);
  return allMats.filter((m) => m.materialSlug !== mat.slug);
};

export default {
  MASTER_MATERIALS,
  findMasterMaterial,
  normalizeProductSlug,
  getMaterialPageUrl,
  getProductPageUrl,
  getMaterialProductUrl,
  getGradeDetailUrl,
  getProductsForMaterial,
  getMaterialsForProduct,
  getRelatedProductsInMaterial,
  getOtherMaterialsForProduct,
};

