/**
 * NIRMEX METAL INDUSTRIES - Our Products Data Configuration
 * Exact 6 Products in user-specified order:
 * 1. Forged Fittings (Featured - Row 1)
 * 2. Flanges (Row 2 - Left)
 * 3. Fasteners (Row 2 - Right)
 * 4. Pipes & Tubes (Row 3 - Left)
 * 5. Sheets & Plates (Row 3 - Center)
 * 6. Rods & Bars (Row 3 - Right)
 */

import forgedImg from '@/assets/our product images/forged fittings.png';
import flangesImg from '@/assets/our product images/flanges.png';
import fastenersImg from '@/assets/our product images/fasteners.png';
import pipesImg from '@/assets/our product images/pipes and tubes.png';
import sheetsImg from '@/assets/our product images/sheet and plates.png';
import rodsImg from '@/assets/our product images/rods and bars.png';

export const OUR_PRODUCTS = [
  // 1. FEATURED PRODUCT (Row 1 - Full Width Hero Card)
  {
    id: 'forged-fittings',
    number: '01',
    badge: 'FEATURED PRODUCT',
    category: 'FORGED FITTINGS',
    title: 'Forged Fittings',
    subtitle: 'High-Performance Piping Fittings',
    description:
      'Precision-engineered high-pressure forged fittings designed for heavy-duty industrial piping systems, leak-proof connections, and critical fluid conveyance.',
    image: forgedImg,
    imageAlt: 'Nirmex High-Performance Precision Forged Steel Fittings',
    highlights: ['High Pressure Rated', 'Corrosion Resistant', 'Precision Machined'],
    href: '#forged-fittings',
    featured: true,
  },

  // 2. PRODUCT CARD (Row 2 - Card 1 of 2)
  {
    id: 'flanges',
    number: '02',
    category: 'FORGED CONNECTIONS',
    title: 'Flanges',
    subtitle: 'Precision Forged Flanges',
    description:
      'High-strength flanges for critical piping and pressure applications.',
    image: flangesImg,
    imageAlt: 'Nirmex Precision Forged Industrial Flanges',
    href: '#flanges',
    featured: false,
  },

  // 3. PRODUCT CARD (Row 2 - Card 2 of 2)
  {
    id: 'fasteners',
    number: '03',
    category: 'FASTENERS',
    title: 'Fasteners',
    subtitle: 'Reliable Industrial Fasteners',
    description:
      'Durable and high-precision fasteners for secure and long-lasting assemblies.',
    image: fastenersImg,
    imageAlt: 'Nirmex Reliable High-Tensile Industrial Fasteners',
    href: '#fasteners',
    featured: false,
  },

  // 4. PRODUCT CARD (Row 3 - Card 1 of 3)
  {
    id: 'pipes-tubes',
    number: '04',
    category: 'PIPES & TUBES',
    title: 'Pipes & Tubes',
    subtitle: 'Seamless & Welded Piping Solutions',
    description:
      'High-precision stainless steel, carbon steel, and alloy pipes for industrial piping.',
    image: pipesImg,
    imageAlt: 'Nirmex High-Precision Stainless Steel and Carbon Steel Pipes & Tubes',
    href: '#pipes-tubes',
    featured: false,
  },

  // 5. PRODUCT CARD (Row 3 - Card 2 of 3)
  {
    id: 'sheets-plates',
    number: '05',
    category: 'SHEETS & PLATES',
    title: 'Sheets & Plates',
    subtitle: 'High-Quality Metal Sheets & Plates',
    description:
      'Durable and precise sheets and plates for industrial fabrication and processing.',
    image: sheetsImg,
    imageAlt: 'Nirmex High-Quality Metal Sheets and Plates',
    href: '#sheets-plates',
    featured: false,
  },

  // 6. PRODUCT CARD (Row 3 - Card 3 of 3)
  {
    id: 'rods-bars',
    number: '06',
    category: 'RODS & BARS',
    title: 'Rods & Bars',
    subtitle: 'Precision Metal Rods & Bars',
    description:
      'High-strength rods and bars for engineering and manufacturing applications.',
    image: rodsImg,
    imageAlt: 'Nirmex Precision Industrial Metal Rods and Bars',
    href: '#rods-bars',
    featured: false,
  },
];
