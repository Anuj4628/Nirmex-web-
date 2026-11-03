/**
 * NIRMEX METAL INDUSTRIES - Hero Slider Configuration
 * Final Refinement: Full Diagonal Hero, Full-Bleed Imagery, Oversized Editorial Typography with Canonical SEO URLs
 */

import heroForgedImg from '@/assets/images/hero-forged-fittings.jpg';
import heroFastenersImg from '@/assets/images/hero-fasteners.jpg';
import heroPipesImg from '@/assets/images/hero-pipes-tubes.jpg';
import heroFlangesImg from '@/assets/images/hero-flanges.jpg';
import { buildProductUrl } from '@/utils/seoRouting';

export const HERO_SLIDES = [
  {
    id: 'forged-fittings',
    slideNumber: '01',
    eyebrow: 'INDUSTRIAL FORGED COMPONENTS',
    headlineLine1: 'FORGED FITTINGS.',
    headlineLine2: 'BUILT FOR INDUSTRY.',
    description:
      'Explore forged fittings for industrial piping and engineering applications, with product options based on material and specification requirements.',
    primaryCta: {
      label: 'Explore Forged Fittings',
      href: buildProductUrl({ product: 'forged-fittings' }),
      ariaLabel: 'Explore Nirmex forged fittings product category',
    },
    secondaryCta: {
      label: 'Request an Enquiry',
      href: '/contact',
      ariaLabel: 'Request an enquiry for forged fittings',
    },
    image: heroForgedImg,
    imageAlt: 'Nirmex Industrial Forged Steel Fittings, Elbows, Tees and Couplings',
    imagePosition: 'center 38%',
    bottomPanel: {
      brandBlockTitle: 'FORGED FITTINGS',
      brandBlockSubtitle: 'Precision Components for Industrial Piping Systems',
      cards: [
        {
          id: 'card-1-1',
          title: 'Socket Weld Fittings',
          subtitle: 'Couplings, Elbows & Tees',
          href: buildProductUrl({ product: 'forged-fittings' }),
        },
        {
          id: 'card-1-2',
          title: 'Threaded Fittings',
          subtitle: 'NPT, BSP & High Pressure',
          href: buildProductUrl({ product: 'forged-fittings' }),
        },
        {
          id: 'card-1-3',
          title: 'Material & Specifications',
          subtitle: 'Custom Engineering Enquiry',
          href: '/contact',
        },
      ],
    },
  },
  {
    id: 'fasteners',
    slideNumber: '02',
    eyebrow: 'SECURE INDUSTRIAL CONNECTIONS',
    headlineLine1: 'INDUSTRIAL FASTENERS.',
    headlineLine2: 'BUILT FOR STRENGTH.',
    description:
      'Explore industrial bolts, nuts, threaded studs and washers for piping, structural and engineering applications.',
    primaryCta: {
      label: 'Explore Fasteners',
      href: buildProductUrl({ product: 'fasteners' }),
      ariaLabel: 'Explore Nirmex industrial fasteners catalog',
    },
    secondaryCta: {
      label: 'Get Product Details',
      href: '/contact',
      ariaLabel: 'Get product details for fasteners',
    },
    image: heroFastenersImg,
    imageAlt: 'Nirmex Industrial High-Tensile Bolts, Nuts, Studs and Washers',
    imagePosition: '52% 38%',
    bottomPanel: {
      brandBlockTitle: 'INDUSTRIAL FASTENERS',
      brandBlockSubtitle: 'Bolting Solutions for Industrial Applications',
      cards: [
        {
          id: 'card-2-1',
          title: 'Bolts & Nuts',
          subtitle: 'Heavy Hex & High Tensile',
          href: buildProductUrl({ product: 'fasteners' }),
        },
        {
          id: 'card-2-2',
          title: 'Threaded Studs',
          subtitle: 'Continuous & Double-End',
          href: buildProductUrl({ product: 'fasteners' }),
        },
        {
          id: 'card-2-3',
          title: 'Washers & Components',
          subtitle: 'Flat, Spring & Machined',
          href: buildProductUrl({ product: 'fasteners' }),
        },
      ],
    },
  },
  {
    id: 'pipes-tubes',
    slideNumber: '03',
    eyebrow: 'STEEL PRODUCTS FOR INDUSTRIAL PROJECTS',
    headlineLine1: 'PIPES & TUBES.',
    headlineLine2: 'MADE FOR DEMANDING APPLICATIONS.',
    description:
      'Discover steel pipes and tubes across relevant material categories for industrial piping, fabrication and engineering requirements.',
    primaryCta: {
      label: 'Explore Pipes & Tubes',
      href: buildProductUrl({ product: 'pipes-tubes' }),
      ariaLabel: 'Explore Nirmex pipes and tubes product line',
    },
    secondaryCta: {
      label: 'Request Specifications',
      href: '/contact',
      ariaLabel: 'Request technical specifications for pipes and tubes',
    },
    image: heroPipesImg,
    imageAlt: 'Nirmex Seamless and Welded Stainless Steel and Carbon Steel Pipes',
    imagePosition: '50% 36%',
    bottomPanel: {
      brandBlockTitle: 'PIPES & TUBES',
      brandBlockSubtitle: 'Explore Material Options & Product Specifications',
      cards: [
        {
          id: 'card-3-1',
          title: 'Stainless Steel',
          subtitle: 'Austenitic & Duplex Grades',
          href: buildProductUrl({ product: 'pipes-tubes', material: 'stainless-steel' }),
        },
        {
          id: 'card-3-2',
          title: 'Carbon Steel',
          subtitle: 'Seamless & Welded Piping',
          href: buildProductUrl({ product: 'pipes-tubes', material: 'carbon-steel' }),
        },
        {
          id: 'card-3-3',
          title: 'Alloy Steel',
          subtitle: 'High Temp & Pressure Lines',
          href: buildProductUrl({ product: 'pipes-tubes', material: 'alloy-steel' }),
        },
      ],
    },
  },
  {
    id: 'flanges',
    slideNumber: '04',
    eyebrow: 'INDUSTRIAL STEEL SOURCING',
    headlineLine1: 'FLANGES & STEEL.',
    headlineLine2: 'READY FOR YOUR REQUIREMENTS.',
    description:
      'Explore industrial flanges and complementary steel products for piping, fabrication and engineering applications.',
    primaryCta: {
      label: 'Explore Flanges',
      href: buildProductUrl({ product: 'flanges' }),
      ariaLabel: 'Explore Nirmex industrial flanges portfolio',
    },
    secondaryCta: {
      label: 'Contact Our Team',
      href: '/contact',
      ariaLabel: 'Contact Nirmex technical sales team',
    },
    image: heroFlangesImg,
    imageAlt: 'Nirmex Precision Forged Stainless Steel and Carbon Steel Flanges',
    imagePosition: '50% 42%',
    bottomPanel: {
      brandBlockTitle: 'FLANGES & STEEL PRODUCTS',
      brandBlockSubtitle: 'Product Options for Industrial Requirements',
      cards: [
        {
          id: 'card-4-1',
          title: 'Industrial Flanges',
          subtitle: 'Weld Neck, Slip-On & Blind',
          href: buildProductUrl({ product: 'flanges' }),
        },
        {
          id: 'card-4-2',
          title: 'Sheets & Plates',
          subtitle: 'Complementary Steel Plates',
          href: buildProductUrl({ product: 'sheets-plates' }),
        },
        {
          id: 'card-4-3',
          title: 'Product Enquiry',
          subtitle: 'Direct Sourcing Consultation',
          href: '/contact',
        },
      ],
    },
  },
];

export default HERO_SLIDES;
