/**
 * NIRMEX METAL INDUSTRIES - Navigation Structure Configuration
 * Order strictly follows project specifications:
 * 1. Home
 * 2. About Us
 * 3. Product
 * 4. Material
 * 5. Certificate
 * 6. Contact Us
 */
export const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    isHome: true,
  },
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
    isHome: false,
  },
  {
    id: 'product',
    label: 'Products',
    href: '#product',
    isHome: false,
  },
  {
    id: 'material',
    label: 'Material',
    href: '#material',
    isHome: false,
  },
  {
    id: 'certificate',
    label: 'Certificate',
    href: '#certificate',
    isHome: false,
  },
  {
    id: 'contact',
    label: 'Contact Us',
    href: '#contact',
    isHome: false,
  },
];

export const CTA_CONFIG = {
  label: 'Get Quote',
  href: '#quote',
  ariaLabel: 'Request a quotation for Nirmex metal products',
};

