import { buildProductUrl, parseProductUrl, getMaterialUrl } from '../src/utils/seoRouting.js';

console.log('--- RUNNING SEO ROUTING MATRIX VERIFICATION ---');

const testCases = [
  // 1. Product level
  {
    name: 'Build Product URL: flanges',
    fn: () => buildProductUrl({ product: 'flanges' }),
    expected: '/products/flanges-manufactured-in-mumbai',
  },
  {
    name: 'Build Product URL: forged-fittings',
    fn: () => buildProductUrl({ product: 'forged-fittings' }),
    expected: '/products/forged-fittings-manufactured-in-mumbai',
  },

  // 2. Product + Material level
  {
    name: 'Build Product+Material URL: flanges + stainless-steel',
    fn: () => buildProductUrl({ product: 'flanges', material: 'stainless-steel' }),
    expected: '/products/flanges-stainless-steel-manufactured-in-mumbai',
  },
  {
    name: 'Build Product+Material URL: flanges + duplex-super-duplex',
    fn: () => buildProductUrl({ product: 'flanges', material: 'duplex-super-duplex' }),
    expected: '/products/flanges-duplex-super-duplex-manufactured-in-mumbai',
  },

  // 3. Product + Material + Grade level
  {
    name: 'Build Grade URL: flanges + stainless-steel + 304',
    fn: () => buildProductUrl({ product: 'flanges', material: 'stainless-steel', grade: '304' }),
    expected: '/products/flanges-stainless-steel-304-manufactured-in-mumbai',
  },

  // 4. Product + Material + Grade + Type level
  {
    name: 'Build Type URL: flanges + stainless-steel + 304 + weld-neck',
    fn: () => buildProductUrl({ product: 'flanges', material: 'stainless-steel', grade: '304', type: 'weld-neck' }),
    expected: '/products/flanges-stainless-steel-304-weld-neck-flanges-manufactured-in-mumbai',
  },

  // 5. Material level
  {
    name: 'Material URL: stainless-steel',
    fn: () => getMaterialUrl('stainless-steel'),
    expected: '/stainless-steel',
  },
  {
    name: 'Material URL: copper',
    fn: () => getMaterialUrl('copper'),
    expected: '/copper',
  },

  // 6. Parser Verification
  {
    name: 'Parse: flanges-manufactured-in-mumbai',
    fn: () => {
      const res = parseProductUrl('/products/flanges-manufactured-in-mumbai');
      return res.isValid && res.level === 'product' && res.product.slug === 'flanges';
    },
    expected: true,
  },
  {
    name: 'Parse: flanges-stainless-steel-manufactured-in-mumbai',
    fn: () => {
      const res = parseProductUrl('/products/flanges-stainless-steel-manufactured-in-mumbai');
      return res.isValid && res.level === 'product-material' && res.material.slug === 'stainless-steel';
    },
    expected: true,
  },
  {
    name: 'Parse: flanges-stainless-steel-304-manufactured-in-mumbai',
    fn: () => {
      const res = parseProductUrl('/products/flanges-stainless-steel-304-manufactured-in-mumbai');
      return res.isValid && res.level === 'grade' && res.grade.slug === '304';
    },
    expected: true,
  },
  {
    name: 'Parse: flanges-stainless-steel-304-weld-neck-flanges-manufactured-in-mumbai',
    fn: () => {
      const res = parseProductUrl('/products/flanges-stainless-steel-304-weld-neck-flanges-manufactured-in-mumbai');
      return res.isValid && res.level === 'type' && res.type.slug === 'weld-neck';
    },
    expected: true,
  },
  {
    name: 'Parse Invalid Combination: flanges-nonexistent-material-999',
    fn: () => {
      const res = parseProductUrl('/products/flanges-nonexistent-material-999');
      return res.isValid;
    },
    expected: false,
  },
];

let passed = 0;
for (const tc of testCases) {
  const result = tc.fn();
  if (result === tc.expected) {
    console.log(`[PASS] ${tc.name}`);
    passed++;
  } else {
    console.error(`[FAIL] ${tc.name}: Expected "${tc.expected}", got "${result}"`);
  }
}

console.log(`\nResults: ${passed}/${testCases.length} tests passed.`);
if (passed === testCases.length) {
  console.log('✓ All SEO Architecture tests passed successfully!');
} else {
  process.exit(1);
}

