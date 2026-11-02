/**
 * NIRMAX METAL INDUSTRIES — DEDICATED FLANGE MATERIALS DATA ARCHITECTURE
 * 
 * Strict 10-Material Specification for Industrial Flanges:
 * 1. Stainless Steel Flanges     (SS)
 * 2. Carbon Steel Flanges        (carbon)
 * 3. Alloy Steel Flanges         (alloy steel types)
 * 4. Duplex & Super Duplex       (Duplex&Super)
 * 5. Nickel Alloy Flanges        (nikle)
 * 6. Monel Flanges               (monel)
 * 7. Inconel Flanges             (iconel types)
 * 8. Hastelloy Flanges           (hastelloy)
 * 9. Titanium Flanges            (titainium)
 * 10. Copper Flanges             (copper)
 * 
 * Every material strictly maps ONLY to its authentic assets in:
 * src/assets/types of product/flanges/<folder>/
 */

// Dynamically glob all asset images so Vite bundles them with hashed production URLs
const assetImages = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

/**
 * Safely resolves asset paths from the globbed asset dictionary
 */
export const resolveFlangeAsset = (partialPath) => {
  if (!partialPath) return '';
  const normalized = partialPath.replace(/\\/g, '/').toLowerCase();
  
  // Exact suffix match
  for (const key of Object.keys(assetImages)) {
    if (key.toLowerCase().endsWith(normalized)) {
      return assetImages[key];
    }
  }

  // Exact file name match
  const fileName = normalized.split('/').pop();
  for (const key of Object.keys(assetImages)) {
    const keyFileName = key.toLowerCase().split('/').pop();
    if (keyFileName === fileName && key.toLowerCase().includes(normalized.split('/')[0])) {
      return assetImages[key];
    }
  }

  // General substring match
  for (const key of Object.keys(assetImages)) {
    if (key.toLowerCase().includes(fileName)) {
      return assetImages[key];
    }
  }
  return '';
};

// ============================================================================
// 10 DEDICATED FLANGE MATERIALS (In exact user-specified order)
// ============================================================================
export const FLANGE_MATERIALS_NAV = [
  {
    slug: 'stainless-steel',
    label: 'Stainless Steel Flanges',
    shortName: 'Stainless Steel',
  },
  {
    slug: 'carbon-steel',
    label: 'Carbon Steel Flanges',
    shortName: 'Carbon Steel',
  },
  {
    slug: 'alloy-steel',
    label: 'Alloy Steel Flanges',
    shortName: 'Alloy Steel',
  },
  {
    slug: 'duplex-super-duplex',
    label: 'Duplex & Super Duplex Flanges',
    shortName: 'Duplex & Super',
  },
  {
    slug: 'nickel-alloy',
    aliases: ['nickel-alloys'],
    label: 'Nickel Alloy Flanges',
    shortName: 'Nickel Alloy',
  },
  {
    slug: 'monel',
    label: 'Monel Flanges',
    shortName: 'Monel',
  },
  {
    slug: 'inconel',
    label: 'Inconel Flanges',
    shortName: 'Inconel',
  },
  {
    slug: 'hastelloy',
    label: 'Hastelloy Flanges',
    shortName: 'Hastelloy',
  },
  {
    slug: 'titanium',
    label: 'Titanium Flanges',
    shortName: 'Titanium',
  },
  {
    slug: 'copper',
    aliases: ['copper-alloys'],
    label: 'Copper Flanges',
    shortName: 'Copper',
  },
];

export const FLANGE_MATERIALS_DATA = {
  // 1. STAINLESS STEEL
  'stainless-steel': {
    slug: 'stainless-steel',
    materialName: 'Stainless Steel',
    navLabel: 'Stainless Steel Flanges',
    pageHeading: 'STAINLESS STEEL INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF STAINLESS STEEL FLANGES',
    badge: 'Austenitic & Ferritic Grades',
    heroTag: 'AISI / ASTM Forged SS',
    heroImage: resolveFlangeAsset('Product Images/Flanges/stainless steel.avif') || resolveFlangeAsset('types of product/flanges/SS/weld neck flanges.jpeg'),
    description: 'High-integrity stainless steel flanges manufactured to ASME B16.5 and DIN EN 1092-1 from certified forged billets. Engineered for critical chemical process piping, offshore oil & gas lines, and pharmaceutical systems requiring superior corrosion resistance, high tensile strength, and hygienic passivated surfaces.',
    standards: 'ASME B16.5, ASME B16.47 Series A & B, DIN EN 1092-1, MSS SP-44, BS 4504',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500 (PN6 to PN420)',
    sizeRange: '1/2" NB to 48" NB (DN15 - DN1200)',
    facings: 'Raised Face (RF), Flat Face (FF), Ring Type Joint (RTJ)',
    testCertificates: '100% PMI Inspected, Ultrasonic Tested, EN 10204 3.1 / 3.2 Mill Test Certificates',
    availableGrades: [
      { slug: '304', code: 'ASTM A182 F304', desc: 'Standard 18/8 austenitic stainless steel' },
      { slug: '304l', code: 'ASTM A182 F304L', desc: 'Extra-low carbon prevents intergranular carbide precipitation' },
      { slug: '316', code: 'ASTM A182 F316', desc: 'Molybdenum-bearing grade with superior chloride resistance' },
      { slug: '316l', code: 'ASTM A182 F316L', desc: 'Low-carbon marine & chemical process grade' },
      { slug: '321', code: 'ASTM A182 F321', desc: 'Titanium-stabilized for elevated temperatures up to 800°C' },
      { slug: '347', code: 'ASTM A182 F347', desc: 'Niobium-stabilized high creep resistance grade' },
      { slug: '310s', code: 'ASTM A182 F310S', desc: 'High chromium-nickel heat-resistant grade up to 1150°C' },
      { slug: '904l', code: 'ASTM A182 F904L', desc: 'High-alloy austenitic grade with 4.5% Mo for sulfuric acid' },
    ],
    types: [
      {
        slug: 'weld-neck-flange',
        name: 'Weld Neck Flange',
        shortCode: 'WN',
        image: resolveFlangeAsset('types of product/flanges/SS/weld neck flanges.jpeg'),
        standards: 'ASME B16.5 / B16.47',
        shortDesc: 'Tapered hub butt-welded to pipe, engineered for severe high-pressure and cyclic thermal stress service.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/SS/slip on.jpeg'),
        standards: 'ASME B16.5 Class 150/300/600',
        shortDesc: 'Slides directly over the pipe end with fillet welds on both inside and outside for easy bolt alignment.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/SS/threded.jpeg'),
        standards: 'ASME B16.5 NPT / BSPT',
        shortDesc: 'Internal tapered female thread for fast assembly in flammable utility piping without hot work welding.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/SS/Orifice Flange.jpeg'),
        standards: 'ASME B16.36 / B16.5',
        shortDesc: 'Precision machined with differential pressure tapping holes and jack screws for metering fluids.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/SS/elbow.jpeg'),
        standards: 'Custom Engineered ASME / DIN',
        shortDesc: 'Integrated 90° directional forged elbow flanged fitting minimizing turbulence and leak paths.',
      },
      {
        slug: 'square-flange',
        name: 'Square Flange',
        shortCode: 'SQ',
        image: resolveFlangeAsset('types of product/flanges/SS/sqare.jpeg'),
        standards: 'JIS B2291 / ISO 6164',
        shortDesc: 'Heavy 4-bolt square connection profile engineered for high-pressure hydraulic and lubrication headers.',
      },
    ],
  },

  // 2. CARBON STEEL
  'carbon-steel': {
    slug: 'carbon-steel',
    materialName: 'Carbon Steel',
    navLabel: 'Carbon Steel Flanges',
    pageHeading: 'CARBON STEEL INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF CARBON STEEL FLANGES',
    badge: 'High Tensile Heavy Duty',
    heroTag: 'ASTM A105 / A350 LF2 Forged',
    heroImage: resolveFlangeAsset('Product Images/Flanges/carbon.png') || resolveFlangeAsset('types of product/flanges/carbon/long weld neck.jpeg'),
    description: 'Heavy-duty carbon steel forged flanges precision machined for high-pressure transmission lines, power generation plants, and low-temperature process piping. Built to ASME B16.5 and BS 4504, our carbon flanges feature normalized heat treatment for optimal impact toughness and yield strength under dynamic mechanical stresses.',
    standards: 'ASME B16.5, ASME B16.47 Series A & B, BS 4504, DIN 2501, MSS SP-44',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500 (PN6 to PN400)',
    sizeRange: '1/2" NB to 60" NB',
    facings: 'Raised Face (RF), Flat Face (FF), Ring Type Joint (RTJ)',
    testCertificates: '100% PMI Inspected, Charpy V-Notch Impact Tested, EN 10204 3.1 Certified',
    availableGrades: [
      { slug: 'a105', code: 'ASTM A105 / A105N', desc: 'Standard normalized carbon steel for ambient and high temperature duty' },
      { slug: 'a350-lf2', code: 'ASTM A350 LF2 Class 1', desc: 'Low-temperature notched-bar Charpy impact tested down to -46°C' },
      { slug: 'a694-f52', code: 'ASTM A694 F52', desc: 'High-yield pipeline flange (52 ksi yield strength) for hydrocarbon lines' },
      { slug: 'a694-f60', code: 'ASTM A694 F60', desc: 'High-yield pipeline flange (60 ksi yield strength)' },
      { slug: 'a694-f65', code: 'ASTM A694 F65', desc: 'High-yield transmission flange (65 ksi yield strength)' },
    ],
    types: [
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/carbon/blind.jpeg'),
        standards: 'ASME B16.5 Class 150 - 2500',
        shortDesc: 'Solid disc without a center bore designed to blank off piping systems, valves, and pressure vessel nozzles.',
      },
      {
        slug: 'cast-flange',
        name: 'Cast Flange',
        shortCode: 'CF',
        image: resolveFlangeAsset('types of product/flanges/carbon/cast.jpeg'),
        standards: 'ASTM A216 WCB / ASME B16.5',
        shortDesc: 'Heavy-section cast steel flange for bulk utility piping, water transmission, and cooling circuits.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/carbon/elbow.jpeg'),
        standards: 'Custom Engineered ASME B16.5',
        shortDesc: 'Seamless one-piece forged 90-degree flanged turn for compact industrial pump manifolds.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/carbon/expander.jpeg'),
        standards: 'ASME B16.5 / MSS SP-44',
        shortDesc: 'Integral expanding neck flange designed to connect directly into larger nominal diameter pipe runs.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/carbon/lap joint.jpeg'),
        standards: 'ASME B16.5 with Stub End',
        shortDesc: 'Freely rotates over a matching stub end, permitting easy bolt hole alignment in frequently dismantled lines.',
      },
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/carbon/long weld neck.jpeg'),
        standards: 'ASME B16.5 Heavy Barrel',
        shortDesc: 'Extended straight cylindrical neck serving as a self-reinforcing nozzle on boilers and columns.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/carbon/orifice.jpeg'),
        standards: 'ASME B16.36 / Class 300 - 2500',
        shortDesc: 'Equipped with pressure tap connections and jack screws for high-pressure differential flow measurement.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/carbon/reducing.jpeg'),
        standards: 'ASME B16.5 Spec',
        shortDesc: 'Features a smaller bore diameter to enable safe line reduction without adding an extra concentric reducer.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/carbon/slip on.jpeg'),
        standards: 'ASME B16.5 / BS 4504',
        shortDesc: 'Economical double-fillet welded flange widely utilized across oil, gas, and structural applications.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/carbon/socket weld.jpeg'),
        standards: 'ASME B16.5 Class 150/300/600',
        shortDesc: 'Counter-bored internal shoulder providing smooth fluid flow for small-bore, high-pressure piping lines.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/carbon/spectackle.jpeg'),
        standards: 'ASME B16.48 Figure-8',
        shortDesc: 'Dual solid and open circular discs joined by a bridge to clearly indicate positive pipeline isolation.',
      },
      {
        slug: 'square-flange',
        name: 'Square Flange',
        shortCode: 'SQ',
        image: resolveFlangeAsset('types of product/flanges/carbon/square.jpeg'),
        standards: 'JIS B2291 / ISO 6164',
        shortDesc: 'Heavy-duty 4-bolt square connection profile engineered for high-pressure hydraulic lines.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/carbon/threaded.jpeg'),
        standards: 'ASME B16.5 NPT / BSPT',
        shortDesc: 'Threaded internal profile for secure connections in utilities and non-weldable process zones.',
      },
    ],
  },

  // 3. ALLOY STEEL
  'alloy-steel': {
    slug: 'alloy-steel',
    materialName: 'Alloy Steel',
    navLabel: 'Alloy Steel Flanges',
    pageHeading: 'ALLOY STEEL INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF ALLOY STEEL FLANGES',
    badge: 'Chrome-Moly Elevated Temp',
    heroTag: 'ASTM A182 Chrome-Moly',
    heroImage: resolveFlangeAsset('Product Images/Flanges/alloy steel.jpg') || resolveFlangeAsset('types of product/flanges/alloy steel types/long weld neck.jpeg'),
    description: 'Chrome-Molybdenum alloy steel forged flanges engineered specifically for severe elevated temperature and cyclic thermal stress service in thermal power plants, superheaters, cracking furnaces, and petrochemical headers. Provides high creep rupture strength and oxidation resistance up to 650°C.',
    standards: 'ASME B16.5, ASME B16.47 Series A & B, DIN EN 1092-1, BS 4504',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500',
    sizeRange: '1/2" NB to 36" NB',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    testCertificates: '100% PMI Inspected, High Temp Creep & Tensile Certified, EN 10204 3.1 MTC',
    availableGrades: [
      { slug: 'f5', code: 'ASTM A182 F5', desc: '5% Cr - 0.5% Mo intermediate alloy for hydrogen and sulfur service' },
      { slug: 'f9', code: 'ASTM A182 F9', desc: '9% Cr - 1% Mo alloy steel for severe oxidation environments' },
      { slug: 'f11', code: 'ASTM A182 F11 Class 2', desc: '1.25% Cr - 0.5% Mo elevated temperature steam line flange' },
      { slug: 'f22', code: 'ASTM A182 F22 Class 3', desc: '2.25% Cr - 1% Mo power plant boiler and header connection' },
      { slug: 'f91', code: 'ASTM A182 F91', desc: '9Cr-1Mo-V high strength creep resistant modified alloy' },
    ],
    types: [
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/blind.jpeg'),
        standards: 'ASME B16.5 Class 150 - 2500',
        shortDesc: 'Chrome-moly blanking flange engineered for high-temperature pipeline test and isolation points.',
      },
      {
        slug: 'cast-flange',
        name: 'Cast Flange',
        shortCode: 'CF',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/cast.jpeg'),
        standards: 'ASTM A217 WC6 / WC9',
        shortDesc: 'Cast chrome-moly flange for high-temperature steam utility headers and turbine casing connections.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/elbow flanges.jpeg'),
        standards: 'Custom Engineered ASME / DIN',
        shortDesc: 'Integrated 90° forged directional elbow eliminating high-temperature welded elbow stress joints.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/expander flanges.jpeg'),
        standards: 'ASME B16.5 / MSS SP-44',
        shortDesc: 'Expands pipe run directly at the flange interface in power plant reheater and superheater lines.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/lap joint flanges.jpeg'),
        standards: 'ASME B16.5 with Stub End',
        shortDesc: 'Rotatable chrome-moly flange paired with alloy stub end for ease of bolt torqueing.',
      },
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/long weld neck.jpeg'),
        standards: 'ASME B16.5 Heavy Barrel',
        shortDesc: 'Integral self-reinforcing nozzle flange for cracking furnaces, boilers, and high-pressure steam drums.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/orifice flanges.jpeg'),
        standards: 'ASME B16.36 / Class 300 - 2500',
        shortDesc: 'High-temperature steam flow metering orifice flange with precision machined sensor taps.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/reducing flanes.jpeg'),
        standards: 'ASME B16.5 Spec',
        shortDesc: 'Direct diameter reduction flange designed for compact boiler piping runs and steam traps.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/slip-on-flanges.jpg'),
        standards: 'ASME B16.5 Class 150/300/600',
        shortDesc: 'Forged chrome-moly slip-on connection for intermediate pressure furnace and duct piping.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/socket weld.jpeg'),
        standards: 'ASME B16.5 Class 300/600/1500',
        shortDesc: 'Recessed socket weld connection for high-pressure small diameter boiler drain and vent lines.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/spectackle blind flanges.jpeg'),
        standards: 'ASME B16.48 High Temp',
        shortDesc: 'Figure-8 positive shutoff blind for furnace shutdown, steam line maintenance, and safety isolation.',
      },
      {
        slug: 'square-flange',
        name: 'Square Flange',
        shortCode: 'SQ',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/square flange.jpeg'),
        standards: 'JIS B2291 / ISO 6164',
        shortDesc: 'Alloy steel 4-bolt square flange designed for high-pressure hydraulic actuators and power turbines.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/alloy steel types/Threaded Flange.jpeg'),
        standards: 'ASME B16.5 NPT Thread',
        shortDesc: 'Precision threaded alloy connection for localized elevated temperature instrumentation lines.',
      },
    ],
  },

  // 4. DUPLEX & SUPER DUPLEX
  'duplex-super-duplex': {
    slug: 'duplex-super-duplex',
    materialName: 'Duplex & Super Duplex',
    navLabel: 'Duplex & Super Duplex Flanges',
    pageHeading: 'DUPLEX & SUPER DUPLEX INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF DUPLEX & SUPER DUPLEX FLANGES',
    badge: 'PREN ≥ 42 Marine Resistant',
    heroTag: 'NORSOK M-650 & NACE MR0175',
    heroImage: resolveFlangeAsset('Product Images/Flanges/super duplex.jpg') || resolveFlangeAsset('types of product/flanges/Duplex&Super/weld neck.jpeg'),
    description: 'Biphasic austenitic-ferritic 22% and 25% chromium alloy flanges combining high mechanical yield strength (>550 MPa) with exceptional resistance to pitting, crevice corrosion, and stress corrosion cracking in aggressive seawater, marine splash zones, and offshore oil/gas production manifolds.',
    standards: 'ASME B16.5, ASME B16.47 Series A & B, NORSOK M-650, ISO 15156, NACE MR0175',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500',
    sizeRange: '1/2" NB to 36" NB',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    testCertificates: 'ASTM G48 Pitting Tested, Ferrite Count 40-60%, EN 10204 3.1 MTC',
    availableGrades: [
      { slug: 'f51', code: 'ASTM A182 F51 / S31803', desc: 'Standard 2205 duplex with balanced ferritic-austenitic structure' },
      { slug: 'f60', code: 'ASTM A182 F60 / S32205', desc: 'High-nitrogen 2205 duplex with guaranteed PREN ≥ 35' },
      { slug: 'f53', code: 'ASTM A182 F53 / S32750', desc: '2507 super duplex with PREN ≥ 42 for subsea hydrocarbon manifolds' },
      { slug: 'f55', code: 'ASTM A182 F55 / S32760', desc: 'Tungsten-bearing super duplex with superior crevice resistance' },
    ],
    types: [
      {
        slug: 'weld-neck-flange',
        name: 'Weld Neck Flange',
        shortCode: 'WN',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/weld neck.jpeg'),
        standards: 'ASME B16.5 / NORSOK M-650',
        shortDesc: 'Full penetration butt weld neck engineered for subsea hydrocarbon flowlines and seawater risers.',
      },
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/blind.jpeg'),
        standards: 'ASME B16.5 Class 150 - 2500',
        shortDesc: 'Solid forged duplex blanking flange for offshore manifold test headers and subsea isolation.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/elbow.jpeg'),
        standards: 'Custom ASME / ISO 15156',
        shortDesc: 'Monolithic forged 90-degree flanged elbow minimizing erosion-corrosion at flow transitions.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/expander.jpeg'),
        standards: 'ASME B16.5 Spec',
        shortDesc: 'Integral expansion flange connecting high-pressure seawater reverse osmosis pump manifolds.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/lap joint flange.jpeg'),
        standards: 'ASME B16.5 with DSS Stub End',
        shortDesc: 'Rotatable duplex flange paired with a precision-machined stub end for tight offshore module quarters.',
      },
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/long weld neck.jpeg'),
        standards: 'ASME B16.5 Heavy Barrel',
        shortDesc: 'Reinforced long nozzle flange for subsea separator vessels, scrubbers, and heat exchanger headers.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/orifice flange.jpeg'),
        standards: 'ASME B16.36 / Class 300 - 2500',
        shortDesc: 'High-alloy duplex differential pressure metering flange for corrosive gas and sour crude lines.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/reducing flange.jpeg'),
        standards: 'ASME B16.5 Spec',
        shortDesc: 'Enables direct pipe diameter reduction while preserving full PREN ≥ 42 pitting resistance.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/slip on.jpeg'),
        standards: 'ASME B16.5 Class 150/300/600',
        shortDesc: 'Double fillet-welded duplex flange for low-to-medium pressure brackish water and utility systems.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/socket wel.jpeg'),
        standards: 'ASME B16.5 Class 300/600/1500',
        shortDesc: 'Recessed socket connection for small-bore offshore chemical injection and hydraulic control lines.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/spectackle flange.jpeg'),
        standards: 'ASME B16.48 Heavy Duty',
        shortDesc: 'Reversible positive shutoff paddle blind engineered for high-salinity seawater line maintenance.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/Duplex&Super/threaded.jpeg'),
        standards: 'ASME B16.5 NPT Spec',
        shortDesc: 'Precision threaded connection avoiding hot welding on pre-fabricated marine skid units.',
      },
    ],
  },

  // 5. NICKEL ALLOY
  'nickel-alloy': {
    slug: 'nickel-alloy',
    aliases: ['nickel-alloys'],
    materialName: 'Nickel Alloy',
    navLabel: 'Nickel Alloy Flanges',
    pageHeading: 'NICKEL ALLOY INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF NICKEL ALLOY FLANGES',
    badge: 'Severe Chemical Service',
    heroTag: 'ASTM B564 High Nickel',
    heroImage: resolveFlangeAsset('Product Images/Flanges/nikle.jpg') || resolveFlangeAsset('types of product/flanges/nikle/weld neck.jpeg'),
    description: 'High-nickel forged flanges manufactured to ASTM B564 and ASME SB564 for extreme corrosive environments, concentrated acids, and high temperatures where standard stainless steels suffer pitting or cracking. Fully certified with positive material identification and metallurgical test certs.',
    standards: 'ASTM B564, ASME SB564, ASME B16.5, DIN 17754',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500',
    sizeRange: '1/2" NB to 24" NB',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    testCertificates: '100% PMI Inspected, Intergranular Corrosion Tested (ASTM G28), EN 10204 3.1 MTC',
    availableGrades: [
      { slug: 'nickel-200', code: 'Nickel 200 / UNS N02200', desc: 'Commercially pure nickel for caustic soda and dry fluorine' },
      { slug: 'nickel-201', code: 'Nickel 201 / UNS N02201', desc: 'Low-carbon nickel preventing graphitization above 315°C' },
      { slug: 'incoloy-800', code: 'Incoloy 800 / UNS N08800', desc: 'High-temperature oxidation and carburization resistant alloy' },
      { slug: 'incoloy-825', code: 'Incoloy 825 / UNS N08825', desc: 'Titanium-stabilized alloy for sulfuric and phosphoric acid service' },
      { slug: 'alloy-20', code: 'Alloy 20 / Carpenter 20', desc: 'Specialized austenitic alloy for boiling sulfuric acid duty' },
    ],
    types: [
      {
        slug: 'weld-neck-flange',
        name: 'Weld Neck Flange',
        shortCode: 'WN',
        image: resolveFlangeAsset('types of product/flanges/nikle/weld neck.jpeg'),
        standards: 'ASTM B564 / ASME B16.5',
        shortDesc: 'Forged nickel weld neck flange providing smooth stress transition in chemical acid reactors.',
      },
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/nikle/blind.jpeg'),
        standards: 'ASTM B564 / ASME B16.5',
        shortDesc: 'Solid nickel blind for positive line isolation on caustic evaporation and chlorination headers.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/nikle/elbow.jpeg'),
        standards: 'Custom Engineered ASME B16.5',
        shortDesc: 'Integrated 90° forged nickel elbow connection for high-purity chemical distillation skids.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/nikle/expander.jpeg'),
        standards: 'ASTM B564 / ASME B16.5',
        shortDesc: 'Integral diameter expansion flange for nickel alloy reactor inlet and outlet nozzles.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/nikle/lap joint.jpeg'),
        standards: 'ASTM B564 with Nickel Stub End',
        shortDesc: 'Free-rotating backing flange reducing expensive alloy volume while easing bolt hole alignment.',
      },
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/nikle/long weld neck.jpeg'),
        standards: 'ASME B16.5 Heavy Barrel',
        shortDesc: 'Heavy-wall one-piece nozzle flange for autoclave vessels and chemical reaction columns.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/nikle/orifice.jpeg'),
        standards: 'ASME B16.36 / Class 300 - 2500',
        shortDesc: 'Specialized flow-metering orifice flange manufactured from solid nickel for corrosive fluids.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/nikle/reducing.jpeg'),
        standards: 'ASTM B564 Spec',
        shortDesc: 'Direct line reduction flange designed to save space in compact nickel process modules.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/nikle/slip on.jpeg'),
        standards: 'ASME B16.5 Class 150/300',
        shortDesc: 'Precision machined nickel slip-on connection for chemical plant storage tanks and headers.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/nikle/socket wel.jpeg'),
        standards: 'ASME B16.5 Class 300/600',
        shortDesc: 'Bored socket weld flange for small-diameter high-integrity acid sampling and drain lines.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/nikle/soectackle.jpeg'),
        standards: 'ASME B16.48 High Nickel',
        shortDesc: 'Figure-8 positive shutoff blind for chlorine bleaching units and caustic washdown lines.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/nikle/threaded.jpeg'),
        standards: 'ASME B16.5 NPT / BSP',
        shortDesc: 'Threaded nickel connection eliminating hot-work welding in active chemical process zones.',
      },
    ],
  },

  // 6. MONEL
  'monel': {
    slug: 'monel',
    materialName: 'Monel',
    navLabel: 'Monel Flanges',
    pageHeading: 'MONEL INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF MONEL FLANGES',
    badge: 'Marine & HF Acid Specialist',
    heroTag: 'ASTM B564 UNS N04400 / N05500',
    heroImage: resolveFlangeAsset('Product Images/Flanges/monel.jpeg') || resolveFlangeAsset('types of product/flanges/monel/monel.jpeg'),
    description: 'Solid-solution nickel-copper Monel forged flanges conforming to ASTM B564 UNS N04400. Provides benchmark corrosion resistance in high-velocity seawater, marine atmospheres, hydrofluoric acid alkylation units, and non-oxidizing halide salt solutions with zero stress corrosion cracking.',
    standards: 'ASTM B564, ASME SB564, ASME B16.5, MSS SP-44, DIN 2.4360',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500',
    sizeRange: '1/2" NB to 24" NB',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    testCertificates: '100% PMI Inspected, Tensile & Hardness Verified, EN 10204 3.1 MTC',
    availableGrades: [
      { slug: 'monel-400', code: 'Monel 400 / UNS N04400', desc: '67Ni-30Cu binary alloy resistant to rapidly flowing seawater and HF acid' },
      { slug: 'monel-k500', code: 'Monel K-500 / UNS N05500', desc: 'Precipitation-hardened high strength alloy for valve shafts and flanges' },
    ],
    types: [
      {
        slug: 'weld-neck-flange',
        name: 'Monel Weld Neck Flange',
        shortCode: 'WN',
        image: resolveFlangeAsset('types of product/flanges/monel/monel.jpeg'),
        standards: 'ASTM B564 / ASME B16.5',
        shortDesc: 'High-integrity Monel 400 weld neck flange for marine offshore risers and HF alkylation headers.',
      },
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/monel/blind flange.jpeg'),
        standards: 'ASME B16.5 Class 150 - 2500',
        shortDesc: 'Solid Monel disc for positive line blanking in marine desalination and brine evaporator plants.',
      },
      {
        slug: 'cast-flange',
        name: 'Cast Flange',
        shortCode: 'CF',
        image: resolveFlangeAsset('types of product/flanges/monel/cast.jpeg'),
        standards: 'ASTM A494 M35-1 / ASME B16.5',
        shortDesc: 'Heavy-pattern cast Monel flange for seawater intake pumps, condensers, and marine valves.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/monel/elbow flange.jpeg'),
        standards: 'Custom Engineered ASME B16.5',
        shortDesc: 'One-piece forged 90° Monel elbow flange providing smooth fluid velocity in marine coolers.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/monel/expander.jpeg'),
        standards: 'ASTM B564 / MSS SP-44',
        shortDesc: 'Expands pipe size directly at the flange interface on offshore oil/gas production platforms.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/monel/lap joint.jpeg'),
        standards: 'ASME B16.5 with Monel Stub End',
        shortDesc: 'Rotatable backing flange paired with Monel stub end for fast disassembly in marine pipelines.',
      },
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/monel/long weld neck.jpeg'),
        standards: 'ASME B16.5 Heavy Barrel',
        shortDesc: 'Extended heavy-barrel nozzle flange for HF alkylation deisobutanizer towers and heaters.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/monel/orifice.jpeg'),
        standards: 'ASME B16.36 / Class 300 - 2500',
        shortDesc: 'Precision Monel orifice flange with differential pressure ports for seawater flow measurement.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/monel/reducing.jpeg'),
        standards: 'ASTM B564 Spec',
        shortDesc: 'Direct reduction flange for compact seawater brine circulation and heat exchanger headers.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/monel/slip on.jpeg'),
        standards: 'ASME B16.5 Class 150/300',
        shortDesc: 'Double-welded Monel slip-on flange for marine ballast piping and coastal industrial utilities.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/monel/socket.jpeg'),
        standards: 'ASME B16.5 Class 300/600/1500',
        shortDesc: 'Recessed socket connection for small-diameter high-pressure offshore instrumentation lines.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/monel/spectackle1.jpeg'),
        standards: 'ASME B16.48 Monel Spec',
        shortDesc: 'Reversible spectacle shutoff paddle for positive line isolation on offshore drilling rigs.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/monel/threaded.jpeg'),
        standards: 'ASME B16.5 NPT Thread',
        shortDesc: 'Non-welded threaded Monel flange for rapid assembly in explosive hydrocarbon marine spaces.',
      },
    ],
  },

  // 7. INCONEL
  'inconel': {
    slug: 'inconel',
    materialName: 'Inconel',
    navLabel: 'Inconel Flanges',
    pageHeading: 'INCONEL INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF INCONEL FLANGES',
    badge: 'Cryogenic to 980°C Extreme Heat',
    heroTag: 'ASTM B564 UNS N06625 / N06600',
    heroImage: resolveFlangeAsset('Product Images/Flanges/iconel.jpeg') || resolveFlangeAsset('types of product/flanges/iconel types/weld neck.jpeg'),
    description: 'High-nickel superalloy forged flanges manufactured to ASTM B564 in Inconel 600, 625, and 718. Engineered for aerospace turbines, nuclear reactors, and deepwater sour gas manifolds where exceptional tensile, creep, and rupture strength are mandatory under severe thermal and oxidizing conditions.',
    standards: 'ASTM B564, ASME SB564, ASME B16.5, API 6A, DIN 2.4856',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500 (API 5000 / 10000)',
    sizeRange: '1/2" NB to 24" NB',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    testCertificates: '100% PMI Tested, Solution Annealed, Ultrasonic Tested, EN 10204 3.1 MTC',
    availableGrades: [
      { slug: 'inconel-600', code: 'Inconel 600 / UNS N06600', desc: 'Nickel-chromium alloy with excellent resistance to high-temperature halogen attack' },
      { slug: 'inconel-625', code: 'Inconel 625 / UNS N06625', desc: 'Mo-Nb strengthened solid solution matrix with total immunity to chloride pitting' },
      { slug: 'inconel-718', code: 'Inconel 718 / UNS N07718', desc: 'Precipitation-hardenable superalloy for cryogenic to 700°C extreme stress service' },
    ],
    types: [
      {
        slug: 'weld-neck-flange',
        name: 'Weld Neck Flange',
        shortCode: 'WN',
        image: resolveFlangeAsset('types of product/flanges/iconel types/weld neck.jpeg'),
        standards: 'ASTM B564 / ASME B16.5',
        shortDesc: 'Heavy-taper hub Inconel 625 weld neck flange for subsea sour gas risers and aerospace ducting.',
      },
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/iconel types/blind.jpeg'),
        standards: 'ASME B16.5 Class 150 - 2500',
        shortDesc: 'Solid superalloy blanking flange designed for high-temperature nuclear and petrochemical headers.',
      },
      {
        slug: 'cast-flange',
        name: 'Cast Flange',
        shortCode: 'CF',
        image: resolveFlangeAsset('types of product/flanges/iconel types/cast.jpeg'),
        standards: 'ASTM A494 / ASME B16.5',
        shortDesc: 'Heavy-section cast Inconel flange for gas turbine exhaust casings and furnace burners.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/iconel types/elbow.jpeg'),
        standards: 'Custom High-Pressure ASME B16.5',
        shortDesc: 'Integral 90-degree forged Inconel elbow flange eliminating welded fittings in hot gas ducts.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/iconel types/expander.jpeg'),
        standards: 'ASTM B564 / MSS SP-44',
        shortDesc: 'Integral expansion flange connecting high-pressure turbine lines to larger process headers.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/iconel types/lap joint flanges.jpeg'),
        standards: 'ASME B16.5 with Inconel Stub End',
        shortDesc: 'Rotatable backing flange paired with Inconel stub end for easy alignment in compact skids.',
      },
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/iconel types/long weld neck.jpeg'),
        standards: 'ASME B16.5 Heavy Barrel',
        shortDesc: 'Extended self-reinforcing nozzle flange for nuclear pressure vessels and catalytic reactors.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/iconel types/orifice.jpeg'),
        standards: 'ASME B16.36 / Class 300 - 2500',
        shortDesc: 'Flow metering orifice flange with dual sensor ports for severe high-temperature gas streams.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/iconel types/reducing.jpeg'),
        standards: 'ASTM B564 Spec',
        shortDesc: 'Direct line reducing flange saving space in compact aerospace and offshore skid modules.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/iconel types/slip on.jpeg'),
        standards: 'ASME B16.5 Class 150/300/600',
        shortDesc: 'Double-fillet welded Inconel slip-on flange for petrochemical furnace piping and ducts.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/iconel types/socket wel fitting.jpeg'),
        standards: 'ASME B16.5 Class 300/600/1500',
        shortDesc: 'Recessed socket weld connection for high-pressure small-bore turbine fuel and steam tracers.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/iconel types/specktackle.jpeg'),
        standards: 'ASME B16.48 Heavy Duty',
        shortDesc: 'Figure-8 positive shutoff blind for flare stacks, catalytic cracking lines, and reactor heads.',
      },
      {
        slug: 'square-flange',
        name: 'Square Flange',
        shortCode: 'SQ',
        image: resolveFlangeAsset('types of product/flanges/iconel types/sqaure.jpeg'),
        standards: 'ISO 6164 / High Pressure',
        shortDesc: 'Heavy 4-bolt square pattern flange for aerospace hydraulic testing and high-pressure steam.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/iconel types/threaded.jpeg'),
        standards: 'ASME B16.5 NPT / BSP',
        shortDesc: 'High-temperature threaded connection avoiding welding in explosive hydrocarbon atmospheres.',
      },
    ],
  },

  // 8. HASTELLOY
  'hastelloy': {
    slug: 'hastelloy',
    materialName: 'Hastelloy',
    navLabel: 'Hastelloy Flanges',
    pageHeading: 'HASTELLOY INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF HASTELLOY FLANGES',
    badge: 'Wet Chlorine & Acid Immunity',
    heroTag: 'ASTM B564 UNS N10276 / N06022',
    heroImage: resolveFlangeAsset('Product Images/Flanges/hastelloy.png') || resolveFlangeAsset('types of product/flanges/hastelloy/lond weld neck.jpeg'),
    description: 'Nickel-molybdenum-chromium superalloy forged flanges manufactured to ASTM B564 UNS N10276 (C-276) and UNS N06022 (C-22). Renowned worldwide as the most versatile corrosion-resistant material available, resisting wet chlorine gas, hypochlorite, sulfur dioxide scrubbers, and boiling formic/acetic acid.',
    standards: 'ASTM B564, ASME SB564, ASME B16.5, DIN 2.4819, W.Nr. 2.4602',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500',
    sizeRange: '1/2" NB to 24" NB',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    testCertificates: '100% PMI Inspected, ASTM G28 Corrosion Tested, EN 10204 3.1 MTC',
    availableGrades: [
      { slug: 'hastelloy-c276', code: 'Hastelloy C-276 / UNS N10276', desc: 'Ni-Mo-Cr alloy with unmatched resistance to aggressive chemical process acids' },
      { slug: 'hastelloy-c22', code: 'Hastelloy C-22 / UNS N06022', desc: 'Enhanced Cr alloy with superior resistance to aqueous corrosion and wet chlorine' },
      { slug: 'hastelloy-b2', code: 'Hastelloy B-2 / UNS N10665', desc: 'Dedicated nickel-molybdenum alloy resisting pure hydrochloric acid at all temps' },
    ],
    types: [
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/lond weld neck.jpeg'),
        standards: 'ASME B16.5 Heavy Barrel',
        shortDesc: 'One-piece self-reinforcing nozzle flange for pharmaceutical reactors and waste incineration scrubbers.',
      },
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/blind.jpeg'),
        standards: 'ASME B16.5 Class 150 - 2500',
        shortDesc: 'Solid Hastelloy C-276 disc for positive isolation of hot acid distillation towers and scrubbers.',
      },
      {
        slug: 'cast-flange',
        name: 'Cast Flange',
        shortCode: 'CF',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/cast.jpeg'),
        standards: 'ASTM A494 CW-12MW / ASME B16.5',
        shortDesc: 'Cast Hastelloy flange for aggressive chlor-alkali pumps, valve bonnets, and chemical headers.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/elbow.jpeg'),
        standards: 'Custom Engineered ASME B16.5',
        shortDesc: 'Forged 90-degree Hastelloy elbow flange for tight piping turns in wet chlorine bleaching lines.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/expander.jpeg'),
        standards: 'ASTM B564 / MSS SP-44',
        shortDesc: 'Integral expansion flange transitioning reactor outlets into larger exhaust absorption ducts.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/lap joint.jpeg'),
        standards: 'ASME B16.5 with Hastelloy Stub',
        shortDesc: 'Rotatable backing flange paired with C-276 stub end to lower overall exotic material expense.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/orifice.jpeg'),
        standards: 'ASME B16.36 / Class 300 - 2500',
        shortDesc: 'Flow metering orifice flange designed to withstand boiling hydrochloric and sulfuric acids.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/reducing flange.jpeg'),
        standards: 'ASTM B564 Spec',
        shortDesc: 'Direct line reduction flange engineered for space-constrained chemical pharmaceutical skids.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/slip on.jpeg'),
        standards: 'ASME B16.5 Class 150/300',
        shortDesc: 'Double fillet-welded Hastelloy C-276 flange for chemical storage tank and vessel nozzles.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/socket.jpeg'),
        standards: 'ASME B16.5 Class 300/600',
        shortDesc: 'Recessed socket weld connection for high-integrity toxic chemical sampling and instrument taps.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/spectackle blind.jpeg'),
        standards: 'ASME B16.48 Heavy Spec',
        shortDesc: 'Figure-8 positive shutoff blind for flue gas desulfurization (FGD) scrubbers and acid towers.',
      },
      {
        slug: 'square-flange',
        name: 'Square Flange',
        shortCode: 'SQ',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/sqaure.jpeg'),
        standards: 'ISO 6164 / High Pressure',
        shortDesc: 'Heavy 4-bolt square pattern flange for chemical metering pumps and acid dosing skids.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/hastelloy/threaded.jpeg'),
        standards: 'ASME B16.5 NPT / BSP',
        shortDesc: 'Threaded connection avoiding hot work in volatile organic chemical and chlorination facilities.',
      },
    ],
  },

  // 9. TITANIUM
  'titanium': {
    slug: 'titanium',
    materialName: 'Titanium',
    navLabel: 'Titanium Flanges',
    pageHeading: 'TITANIUM INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF TITANIUM FLANGES',
    badge: 'Lightweight Seawater Immunity',
    heroTag: 'ASTM B381 Gr. 2 / Gr. 5 Forged',
    heroImage: resolveFlangeAsset('Product Images/Flanges/titainium.avif') || resolveFlangeAsset('types of product/flanges/titainium/long weld neck.jpeg'),
    description: 'Commercially pure and alpha-beta titanium forged flanges conforming to ASTM B381 Grade 2 and Grade 5. Offers unmatched strength-to-weight ratio, total immunity to marine seawater pitting, and biological inertness for subsea oil drilling, chlor-alkali electrolysis cells, and aerospace airframes.',
    standards: 'ASTM B381, ASME SB381, ASME B16.5, DIN 17861, AMS 4928',
    pressureClasses: 'Class 150, 300, 600',
    sizeRange: '1/2" NB to 24" NB',
    facings: 'Raised Face (RF), Flat Face (FF)',
    testCertificates: '100% PMI Inspected, Microstructure Certified, EN 10204 3.1 MTC',
    availableGrades: [
      { slug: 'grade-1', code: 'Titanium Grade 1 / UNS R50250', desc: 'Highest purity unalloyed titanium with maximum ductility and formability' },
      { slug: 'grade-2', code: 'Titanium Grade 2 / UNS R50400', desc: 'The industrial workhorse with complete immunity to seawater and chlor-alkali' },
      { slug: 'grade-5', code: 'Titanium Grade 5 (Ti-6Al-4V) / UNS R56400', desc: 'High strength alloy with >830 MPa yield strength for aerospace & subsea' },
      { slug: 'grade-7', code: 'Titanium Grade 7 / UNS R52400', desc: 'Palladium-enhanced titanium for aggressive reducing acid media' },
    ],
    types: [
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/titainium/long weld neck.jpeg'),
        standards: 'ASTM B381 / ASME B16.5',
        shortDesc: 'One-piece titanium nozzle flange for seawater desalination evaporators and chlor-alkali reactors.',
      },
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/titainium/blind.jpeg'),
        standards: 'ASME B16.5 Class 150/300',
        shortDesc: 'Solid titanium disc for positive line isolation on offshore seawater intake and ballast lines.',
      },
      {
        slug: 'cast-flange',
        name: 'Cast Flange',
        shortCode: 'CF',
        image: resolveFlangeAsset('types of product/flanges/titainium/cast.jpeg'),
        standards: 'ASTM B367 Gr. C-2 / ASME B16.5',
        shortDesc: 'Cast titanium flange for marine centrifugal seawater pumps and chlorine cell connections.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/titainium/elbow.jpeg'),
        standards: 'Custom Engineered ASME B16.5',
        shortDesc: 'Monolithic 90-degree forged titanium elbow connection minimizing fluid drag in subsea lines.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/titainium/exoander.jpeg'),
        standards: 'ASTM B381 / MSS SP-44',
        shortDesc: 'Direct line expansion flange connecting titanium plate heat exchangers to main headers.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/titainium/lap joint.jpeg'),
        standards: 'ASME B16.5 with Ti Stub End',
        shortDesc: 'Steel backing flange over titanium stub end, slashing overall precious metal project costs.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/titainium/orifice.jpeg'),
        standards: 'ASME B16.36 / Class 300',
        shortDesc: 'Precision flow metering orifice flange providing complete immunity to corrosive brine pitting.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/titainium/reducing.jpeg'),
        standards: 'ASTM B381 Spec',
        shortDesc: 'Compact diameter reduction flange engineered for aerospace and lightweight marine skids.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/titainium/slip on.jpeg'),
        standards: 'ASME B16.5 Class 150/300',
        shortDesc: 'Fillet-welded titanium slip-on flange for paper mill bleaching towers and seawater piping.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/titainium/socket.jpeg'),
        standards: 'ASME B16.5 Class 150/300/600',
        shortDesc: 'Recessed socket weld connection for high-integrity aerospace fuel and instrumentation lines.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/titainium/spectackle blind flanges.jpeg'),
        standards: 'ASME B16.48 Titanium',
        shortDesc: 'Reversible positive shutoff paddle for offshore rig firewater headers and bleach lines.',
      },
      {
        slug: 'square-flange',
        name: 'Square Flange',
        shortCode: 'SQ',
        image: resolveFlangeAsset('types of product/flanges/titainium/square flange.jpeg'),
        standards: 'ISO 6164 / High Pressure',
        shortDesc: 'Lightweight 4-bolt square flange engineered for subsea exploration robotic hydraulic circuits.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/titainium/threaded flange.jpeg'),
        standards: 'ASME B16.5 NPT / BSP',
        shortDesc: 'Threaded connection avoiding hot work in specialized chlor-alkali and pharmaceutical plants.',
      },
    ],
  },

  // 10. COPPER
  'copper': {
    slug: 'copper',
    aliases: ['copper-alloys'],
    materialName: 'Copper & Cupro Nickel',
    navLabel: 'Copper Flanges',
    pageHeading: 'COPPER INDUSTRIAL FLANGES',
    typesHeading: 'TYPES OF COPPER FLANGES',
    badge: 'Marine Antifouling & High Thermal',
    heroTag: 'Cu-Ni 90/10 & 70/30 Certified',
    heroImage: resolveFlangeAsset('types of product/flanges/copper/long weld neck.jpeg') || resolveFlangeAsset('types of product/flanges/copper/cast.jpeg'),
    description: 'Copper and Copper-Nickel (Cupro Nickel 90/10 and 70/30) forged and plate flanges conforming to ASME B16.5, DIN 86037, and EEMUA 145. Engineered with natural biofouling resistance and exceptional thermal conductivity for naval seawater cooling, marine ballast piping, and offshore heat exchanger headers.',
    standards: 'ASME B16.5, DIN 86037, EEMUA 145, BS 4504, MIL-F-20011',
    pressureClasses: 'Class 150, 300 (10 Bar, 16 Bar, 20 Bar)',
    sizeRange: '1/2" NB to 24" NB',
    facings: 'Raised Face (RF), Flat Face (FF)',
    testCertificates: '100% PMI Inspected, Hydrostatically Tested, EN 10204 3.1 MTC',
    availableGrades: [
      { slug: 'c70600', code: 'Cupro Nickel 90/10 (UNS C70600)', desc: 'Standard marine alloy with superior resistance to seawater biofouling' },
      { slug: 'c71500', code: 'Cupro Nickel 70/30 (UNS C71500)', desc: 'High-velocity seawater piping alloy with enhanced erosion-corrosion resistance' },
      { slug: 'c11000', code: 'Pure Copper (ETP UNS C11000)', desc: 'High electrical and thermal conductivity electrolytic tough pitch copper' },
      { slug: 'naval-brass', code: 'Naval Brass (UNS C46400)', desc: 'Corrosion resistant brass alloy with tin addition for marine hardware' },
    ],
    types: [
      {
        slug: 'long-weld-neck-flange',
        name: 'Long Weld Neck Flange',
        shortCode: 'LWN',
        image: resolveFlangeAsset('types of product/flanges/copper/long weld neck.jpeg'),
        standards: 'ASME B16.5 / EEMUA 145',
        shortDesc: 'One-piece cupro-nickel nozzle flange for marine condensers, chillers, and naval heat exchangers.',
      },
      {
        slug: 'blind-flange',
        name: 'Blind Flange',
        shortCode: 'BL',
        image: resolveFlangeAsset('types of product/flanges/copper/blind.jpeg'),
        standards: 'DIN 86037 / ASME B16.5',
        shortDesc: 'Solid copper-nickel disc for positive line blanking in marine seawater cooling circuits.',
      },
      {
        slug: 'cast-flange',
        name: 'Cast Flange',
        shortCode: 'CF',
        image: resolveFlangeAsset('types of product/flanges/copper/cast.jpeg'),
        standards: 'ASTM B62 / DIN 86037',
        shortDesc: 'Heavy-pattern cast bronze/cupro flange for naval bilge pumps, valves, and sea chests.',
      },
      {
        slug: 'elbow-flange',
        name: 'Elbow Flange',
        shortCode: 'EF',
        image: resolveFlangeAsset('types of product/flanges/copper/elbow flange.jpeg'),
        standards: 'DIN 86037 Spec',
        shortDesc: 'Forged 90° copper-nickel directional elbow flange providing low resistance to seawater flow.',
      },
      {
        slug: 'expander-flange',
        name: 'Expander Flange',
        shortCode: 'EX',
        image: resolveFlangeAsset('types of product/flanges/copper/expander.jpeg'),
        standards: 'EEMUA 145 / ASME B16.5',
        shortDesc: 'Expands nominal line diameter directly at the pump discharge in naval propulsion cooling.',
      },
      {
        slug: 'lap-joint-flange',
        name: 'Lap Joint Flange',
        shortCode: 'LJ',
        image: resolveFlangeAsset('types of product/flanges/copper/lap joint flange.jpeg'),
        standards: 'DIN 86037 with Cu-Ni Collar',
        shortDesc: 'Composite flange with carbon steel backing ring and cupro-nickel inner collar for marine systems.',
      },
      {
        slug: 'orifice-flange',
        name: 'Orifice Flange',
        shortCode: 'OF',
        image: resolveFlangeAsset('types of product/flanges/copper/orifice.jpeg'),
        standards: 'ASME B16.36 / EEMUA 145',
        shortDesc: 'Differential pressure flow measurement orifice flange for naval ballast and firewater systems.',
      },
      {
        slug: 'reducing-flange',
        name: 'Reducing Flange',
        shortCode: 'RD',
        image: resolveFlangeAsset('types of product/flanges/copper/reducing dlange.jpeg'),
        standards: 'DIN 86037 Spec',
        shortDesc: 'Direct line reduction flange designed for compact marine engine room seawater manifolds.',
      },
      {
        slug: 'slip-on-flange',
        name: 'Slip-On Flange',
        shortCode: 'SO',
        image: resolveFlangeAsset('types of product/flanges/copper/slip on.jpeg'),
        standards: 'ASME B16.5 / DIN 86037',
        shortDesc: 'Fillet-welded copper slip-on flange for coastal commercial utilities and plumbing headers.',
      },
      {
        slug: 'socket-weld-flange',
        name: 'Socket Weld Flange',
        shortCode: 'SW',
        image: resolveFlangeAsset('types of product/flanges/copper/socket.jpeg'),
        standards: 'ASME B16.5 Class 150/300',
        shortDesc: 'Recessed socket weld connection for high-integrity small-bore naval instrumentation lines.',
      },
      {
        slug: 'spectacle-blind-flange',
        name: 'Spectacle Blind Flange',
        shortCode: 'SB',
        image: resolveFlangeAsset('types of product/flanges/copper/spectacjle.jpeg'),
        standards: 'EEMUA 145 Figure-8',
        shortDesc: 'Reversible positive shutoff paddle blind for marine ballast water line inspection and servicing.',
      },
      {
        slug: 'square-flange',
        name: 'Square Flange',
        shortCode: 'SQ',
        image: resolveFlangeAsset('types of product/flanges/copper/sqare flange.jpeg'),
        standards: 'JIS B2291 Spec',
        shortDesc: 'Heavy 4-bolt square pattern flange for marine hydraulic winch and steering gear circuits.',
      },
      {
        slug: 'threaded-flange',
        name: 'Threaded Flange',
        shortCode: 'TH',
        image: resolveFlangeAsset('types of product/flanges/copper/threaded.jpeg'),
        standards: 'ASME B16.5 NPT / BSP',
        shortDesc: 'Precision threaded copper connection avoiding open flames in shipboard retrofit zones.',
      },
    ],
  },
};

/**
 * Helper to retrieve normalized flange material data
 */
export const getFlangeMaterialData = (slug) => {
  if (!slug) return FLANGE_MATERIALS_DATA['stainless-steel'];
  const s = slug.toLowerCase();

  // Direct match
  if (FLANGE_MATERIALS_DATA[s]) {
    return FLANGE_MATERIALS_DATA[s];
  }

  // Alias lookup
  for (const nav of FLANGE_MATERIALS_NAV) {
    if (nav.slug === s || (nav.aliases && nav.aliases.includes(s))) {
      return FLANGE_MATERIALS_DATA[nav.slug];
    }
  }

  // Substring match
  if (s.includes('carbon')) return FLANGE_MATERIALS_DATA['carbon-steel'];
  if (s.includes('alloy') && !s.includes('nickel') && !s.includes('copper')) return FLANGE_MATERIALS_DATA['alloy-steel'];
  if (s.includes('duplex')) return FLANGE_MATERIALS_DATA['duplex-super-duplex'];
  if (s.includes('monel')) return FLANGE_MATERIALS_DATA['monel'];
  if (s.includes('inconel')) return FLANGE_MATERIALS_DATA['inconel'];
  if (s.includes('hastelloy')) return FLANGE_MATERIALS_DATA['hastelloy'];
  if (s.includes('titanium')) return FLANGE_MATERIALS_DATA['titanium'];
  if (s.includes('copper') || s.includes('cupro')) return FLANGE_MATERIALS_DATA['copper'];
  if (s.includes('nickel')) return FLANGE_MATERIALS_DATA['nickel-alloy'];

  return FLANGE_MATERIALS_DATA['stainless-steel'];
};

