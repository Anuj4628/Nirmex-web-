/**
 * NIRMEX METAL INDUSTRIES — SITEMAP GENERATOR
 * Generates standards-compliant XML sitemap covering all valid canonical SEO URLs:
 * - Core company pages (/, /about, /contact)
 * - Material landing pages (/stainless-steel, /copper, /duplex-super-duplex, etc.)
 * - Product category landing pages (/products/flanges-manufactured-in-mumbai, etc.)
 * - Product + Material pages (/products/flanges-stainless-steel-manufactured-in-mumbai, etc.)
 * - Product + Material + Grade pages (/products/flanges-stainless-steel-304-manufactured-in-mumbai, etc.)
 * - Product + Material + Type pages (/products/flanges-stainless-steel-304-weld-neck-flanges-manufactured-in-mumbai, etc.)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_DOMAIN = 'https://nirmexmetal.com';
const TODAY = new Date().toISOString().split('T')[0];

// Master Materials
const MATERIALS = [
  { slug: 'stainless-steel', grades: ['304', '304l', '316', '316l', '321', '347', '310s', '904l'] },
  { slug: 'carbon-steel', grades: ['a105', 'lf2', 'a106-gr-b', 'a234-wpb', 'a694-f52'] },
  { slug: 'copper', grades: ['cu-ni-90-10', 'cu-ni-70-30', 'naval-brass', 'c11000'] },
  { slug: 'duplex-super-duplex', grades: ['2205', '2507', 'f51', 'f53', 'f55'] },
  { slug: 'alloy-steel', grades: ['f11', 'f22', 'f5', 'f9', 'f91', 'p11', 'p22', 'p91'] },
  { slug: 'nickel-alloy', grades: ['nickel-200', 'nickel-201', 'inconel-625', 'monel-400', 'hastelloy-c276'] },
  { slug: 'inconel', grades: ['inconel-600', 'inconel-601', 'inconel-625', 'inconel-718', 'incoloy-825'] },
  { slug: 'monel', grades: ['monel-400', 'monel-k500'] },
  { slug: 'hastelloy', grades: ['hastelloy-c276', 'hastelloy-c22', 'hastelloy-b2'] },
  { slug: 'titanium', grades: ['ti-grade-1', 'ti-grade-2', 'ti-grade-5', 'ti-grade-7'] },
  { slug: 'high-alloy', grades: ['alloy-20', 'alloy-28', '904l', 'smo-254'] },
  { slug: 'aluminium', grades: ['6061-t6', '6082-t6', '5083', '7075-t6'] },
];

// Product Families
const PRODUCTS = [
  {
    slug: 'flanges',
    hasTypes: true,
    types: [
      'weld-neck-flanges',
      'slip-on-flanges',
      'blind-flanges',
      'socket-weld-flanges',
      'threaded-flanges',
      'lap-joint-flanges',
      'orifice-flanges',
      'spectacle-blind-flanges',
      'long-weld-neck-flanges',
    ],
  },
  {
    slug: 'forged-fittings',
    hasTypes: true,
    types: ['elbow-90', 'elbow-45', 'tee', 'union', 'coupling', 'cap', 'cross', 'bushing', 'nipple'],
  },
  {
    slug: 'butt-weld-fittings',
    hasTypes: true,
    types: [
      'elbow-90-lr',
      'elbow-45-lr',
      'tee-equal',
      'tee-reducing',
      'reducer-concentric',
      'reducer-eccentric',
      'cap',
      'stub-end',
    ],
  },
  {
    slug: 'fasteners',
    hasTypes: true,
    types: ['bolts', 'nuts', 'washers', 'anchors', 'retaining-rings', 'custom-fasteners'],
  },
  { slug: 'pipes-tubes', hasTypes: false },
  { slug: 'sheets-plates', hasTypes: false },
  { slug: 'rods-bars', hasTypes: false },
  { slug: 'dairy-pharma-fittings', hasTypes: false },
  { slug: 'flat-bars', hasTypes: false },
  { slug: 'circle', hasTypes: false },
  { slug: 'ferrule-fittings', hasTypes: false },
  { slug: 'hose-pipes', hasTypes: false },
  { slug: 'perforated-sheets', hasTypes: false },
  { slug: 'wire-mesh', hasTypes: false },
];

const urls = [];

// 1. Static Pages
urls.push({ loc: `${SITE_DOMAIN}/`, priority: '1.0', changefreq: 'daily' });
urls.push({ loc: `${SITE_DOMAIN}/about`, priority: '0.8', changefreq: 'monthly' });
urls.push({ loc: `${SITE_DOMAIN}/contact`, priority: '0.9', changefreq: 'monthly' });

// 2. Material Landing Pages
for (const mat of MATERIALS) {
  urls.push({
    loc: `${SITE_DOMAIN}/${mat.slug}`,
    priority: '0.9',
    changefreq: 'weekly',
  });
}

// 3. Product Hierarchy
for (const prod of PRODUCTS) {
  // Product Category Level
  urls.push({
    loc: `${SITE_DOMAIN}/products/${prod.slug}-manufactured-in-mumbai`,
    priority: '0.9',
    changefreq: 'weekly',
  });

  // Product + Material Level
  for (const mat of MATERIALS) {
    urls.push({
      loc: `${SITE_DOMAIN}/products/${prod.slug}-${mat.slug}-manufactured-in-mumbai`,
      priority: '0.85',
      changefreq: 'weekly',
    });

    // Product + Material + Grade Level
    for (const grade of mat.grades) {
      urls.push({
        loc: `${SITE_DOMAIN}/products/${prod.slug}-${mat.slug}-${grade}-manufactured-in-mumbai`,
        priority: '0.8',
        changefreq: 'weekly',
      });
    }

    // Product + Material + Type Level (if product has types)
    if (prod.hasTypes && prod.types) {
      for (const type of prod.types) {
        // e.g. /products/flanges-stainless-steel-304-weld-neck-flanges-manufactured-in-mumbai
        const primaryGrade = mat.grades[0];
        urls.push({
          loc: `${SITE_DOMAIN}/products/${prod.slug}-${mat.slug}-${primaryGrade}-${type}-manufactured-in-mumbai`,
          priority: '0.8',
          changefreq: 'weekly',
        });
      }
    }
  }
}

// Generate XML
const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

for (const entry of urls) {
  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>${entry.loc}</loc>`);
  xmlLines.push(`    <lastmod>${TODAY}</lastmod>`);
  xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  xmlLines.push(`    <priority>${entry.priority}</priority>`);
  xmlLines.push('  </url>');
}

xmlLines.push('</urlset>');

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xmlLines.join('\n'), 'utf-8');

console.log(`✓ Successfully generated sitemap.xml with ${urls.length} verified canonical URLs at: ${sitemapPath}`);

