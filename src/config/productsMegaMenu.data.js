/**
 * NIRMEX METAL INDUSTRIES — PRODUCTS MEGA MENU CONFIGURATION
 * 
 * Strict 9 + 9 Division Architecture using canonical SEO URLs:
 */

import { buildProductUrl } from '@/utils/seoRouting';

const RAW_MANUFACTURE_DIVISION = [
  { id: 'mfg-forging', order: 1, slug: 'forged-fittings', name: 'Forging' },
  { id: 'mfg-flanges', order: 2, slug: 'flanges', name: 'Flanges' },
  { id: 'mfg-fasteners', order: 3, slug: 'fasteners', name: 'Fasteners' },
  { id: 'mfg-buttweld', order: 4, slug: 'butt-weld-fittings', name: 'Butt Weld Fittings' },
  { id: 'mfg-pipes-tubes', order: 5, slug: 'pipes-tubes', name: 'Pipes & Tubes' },
  { id: 'mfg-sheets-plates', order: 6, slug: 'sheets-plates', name: 'Sheets & Plates' },
  { id: 'mfg-rods-bars', order: 7, slug: 'rods-bars', name: 'Rods & Bars' },
  { id: 'mfg-ferrule', order: 8, slug: 'ferrule-fittings', name: 'Ferrule Fittings' },
  { id: 'mfg-dairy-pharma', order: 9, slug: 'dairy-pharma-fittings', name: 'Dairy & Pharma Fittings' },
];

const RAW_SUPPLIER_DIVISION = [
  { id: 'sup-hose-pipes', slug: 'hose-pipes', name: 'Hose Pipes' },
  { id: 'sup-perforated', slug: 'perforated-sheets', name: 'Perforated Sheets' },
  { id: 'sup-wire-mesh', slug: 'wire-mesh', name: 'Wire Mesh' },
  { id: 'sup-circle', slug: 'circle', name: 'Circle' },
  { id: 'sup-flat-bars', slug: 'flat-bars', name: 'Flat Bars' },
  { id: 'sup-patapatti', slug: 'patapatti-strips', name: 'Patapatti / Strips' },
  { id: 'sup-ring', slug: 'ring', name: 'Ring' },
  { id: 'sup-coil', slug: 'coil', name: 'Coil' },
  { id: 'sup-wires', slug: 'wires', name: 'Wires' },
];

export const MANUFACTURE_DIVISION = RAW_MANUFACTURE_DIVISION.map((item) => ({
  ...item,
  href: buildProductUrl({ product: item.slug }),
}));

export const SUPPLIER_DIVISION = RAW_SUPPLIER_DIVISION.map((item) => ({
  ...item,
  href: buildProductUrl({ product: item.slug }),
}));

export default {
  MANUFACTURE_DIVISION,
  SUPPLIER_DIVISION,
};
