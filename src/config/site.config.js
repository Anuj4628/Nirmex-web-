/**
 * NIRMEX METAL INDUSTRIES - Site Configuration & Authentic Company Data
 * Source of truth for corporate contact, addresses, and sales channels.
 */
export const SITE_CONFIG = {
  name: 'Nirmex Metal Industries',
  shortName: 'NIRMEX',
  tagline: 'Leading Manufacturer of Stainless Steel Pipe Fittings & Flanges',
  description:
    'ISO 9001:2015 certified manufacturer and global exporter of stainless steel pipe fittings, forged flanges, butt-weld fittings, fasteners, and high-pressure alloy piping materials.',

  // Corporate Head Office
  headOffice: {
    title: 'Head Office',
    company: 'Nirmex Metal Industries',
    addressLine1: '103, 1st Floor, Omkar Tower,',
    addressLine2: '3rd Khetwadi Lane Back Road,',
    addressLine3: 'Mumbai - 400 004Maharashtra - India',
    fullAddress: '103, 1st Floor, Omkar Tower, 3rd Khetwadi Lane Back Road, Mumbai - 400 004Maharashtra - India',
  },

  // Key Contact Person
  contactPerson: {
    name: 'Mr. Naresh Lodha',
    mobile: '+91 9930395528',
    telUrl: 'tel:+919930395528',
  },

  // Corporate Telephone
  telephone: {
    display: '+91.22.6615 7058',
    value: '+91.22.6615 7058',
    telUrl: 'tel:+912266157058',
  },

  // Manufacturing Unit
  manufacturingUnit: {
    title: 'Manufacturing Unit',
    locationLine1: 'Village neevva, dist. Banaskata,',
    locationLine2: 'Gujarat - 385310',
    fullLocation: 'Village neevva, dist. Banaskata, Gujarat - 385310',
    mobile: '+91 7303304316',
    telUrl: 'tel:+917303304316',
  },

  // Dedicated Email Channels
  emails: {
    domesticSales: {
      label: 'Domestic Sales',
      email: 'sales.nirmexmetalind@gmail.com',
      mailtoUrl: 'mailto:sales.nirmexmetalind@gmail.com',
    },
    exports: {
      label: 'Exports',
      email: 'sales@nirmexmetal.com',
      mailtoUrl: 'mailto:sales@nirmexmetal.com',
    },
    enquiry: {
      label: 'General Enquiry',
      email: 'info@nirmexmetal.com',
      mailtoUrl: 'mailto:info@nirmexmetal.com',
    },
  },

  // Quick Navigation Links
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products/flanges' },
    { label: 'Value Added Services', href: '/#services' },
    { label: 'Our Clients', href: '/#clients' },
    { label: 'Industries We Serve', href: '/#industries' },
    { label: 'Countries We Export To', href: '/#export-network' },
    { label: 'Contact Us', href: '/contact' },
  ],

  // Product Categories
  productLinks: [
    { label: 'Forged Fittings', href: '/products/forging' },
    { label: 'Flanges (Forged & Plate)', href: '/products/flanges' },
    { label: 'Industrial Fasteners', href: '/products/fasteners' },
    { label: 'Pipes & Tubes (Seamless/ERW)', href: '/products/pipes-tubes' },
    { label: 'Sheets & Plates', href: '/products/sheets-plates' },
    { label: 'Rods & Round Bars', href: '/products/rods-bars' },
  ],
};

export default SITE_CONFIG;
