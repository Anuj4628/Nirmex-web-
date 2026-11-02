/**
 * NIRMAX METAL INDUSTRIES — INDUSTRIAL PRODUCT CATALOGUE DATA ARCHITECTURE
 * 
 * Strict Multi-Dimensional Hierarchy:
 * Material -> Product Category -> Product Description Page -> Grade Detail Page & Type Detail Page
 * 
 * Configurable Families:
 * - Flanges: showGrades = true, showTypes = true
 * - Fasteners: showGrades = true, showTypes = true
 * - Forged Fittings: showGrades = true, showTypes = true
 * - Pipes & Tubes, Sheets, Rods, etc.: showGrades = true, showTypes = false
 */

// Dynamically glob all asset images so Vite bundles them with hashed production URLs
const assetImages = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

/**
 * Safely resolves asset paths from the globbed asset dictionary
 */
export const resolveCatalogueAsset = (partialPath) => {
  if (!partialPath) return '';
  const normalized = partialPath.replace(/\\/g, '/').toLowerCase();
  
  // Exact suffix match
  for (const key of Object.keys(assetImages)) {
    if (key.toLowerCase().endsWith(normalized)) {
      return assetImages[key];
    }
  }

  // Substring match
  const fileName = normalized.split('/').pop();
  for (const key of Object.keys(assetImages)) {
    if (key.toLowerCase().includes(fileName)) {
      return assetImages[key];
    }
  }
  return '';
};

// ============================================================================
// 1. MATERIALS INVENTORY (Persistent Left Sidebar Root)
// ============================================================================
export const MATERIALS = [
  {
    id: 'stainless-steel',
    slug: 'stainless-steel',
    name: 'Stainless Steel',
    shortName: 'SS',
    badge: 'Austenitic & Ferritic',
    description: 'High corrosion resistance, superior mechanical ductility, and hygienic surface finish across 300 & 400 series alloys.',
    popularGrades: ['304', '304L', '316', '316L', '321', '347', '310S', '904L'],
  },
  {
    id: 'carbon-steel',
    slug: 'carbon-steel',
    name: 'Carbon Steel',
    shortName: 'CS',
    badge: 'High Tensile Structural',
    description: 'Heavy duty pressure containment, structural load capacity, and cryogenic/ambient service compliance.',
    popularGrades: ['A105', 'A350 LF2', 'A106 Gr. B', 'A234 WPB', 'A694 F52', 'A193 B7'],
  },
  {
    id: 'alloy-steel',
    slug: 'alloy-steel',
    name: 'Alloy Steel',
    shortName: 'AS',
    badge: 'Chrome-Moly Elevated Temp',
    description: 'High temperature creep strength, oxidation resistance, and thermal fatigue resistance for power & refinery lines.',
    popularGrades: ['F11', 'F22', 'F5', 'F9', 'F91', 'P11', 'P22', 'P91'],
  },
  {
    id: 'duplex-super-duplex',
    slug: 'duplex-super-duplex',
    name: 'Duplex & Super Duplex',
    shortName: 'DSS / SDSS',
    badge: 'PREN > 42 Marine Resistant',
    description: 'Austenitic-ferritic microstructure combining twice the yield strength of 316 with superior chloride pitting resistance.',
    popularGrades: ['UNS S31803', 'UNS S32205 (F51)', 'UNS S32750 (2507)', 'UNS S32760 (F55)'],
  },
  {
    id: 'nickel-alloys',
    slug: 'nickel-alloys',
    aliases: ['nickel-alloy'],
    name: 'Nickel Alloy',
    shortName: 'Nickel Alloy',
    badge: 'Severe Chemical Service',
    description: 'Outstanding resistance to hot organic and inorganic acids, stress-corrosion cracking, and high-temperature oxidation.',
    popularGrades: ['Inconel 625', 'Inconel 718', 'Monel 400', 'Hastelloy C276', 'Incoloy 825'],
  },
  {
    id: 'monel',
    slug: 'monel',
    name: 'Monel',
    shortName: 'Monel',
    badge: 'Marine & HF Acid Specialist',
    description: 'Solid solution nickel-copper alloy with exceptional resistance to rapidly flowing seawater, hydrofluoric acid, and stress corrosion.',
    popularGrades: ['Monel 400 (UNS N04400)', 'Monel K-500 (UNS N05500)'],
  },
  {
    id: 'inconel',
    slug: 'inconel',
    aliases: ['inconel-alloys'],
    name: 'Inconel',
    shortName: 'Inconel',
    badge: 'High-Temperature Creep & Oxidation',
    description: 'Austenitic nickel-chromium superalloys retaining mechanical integrity up to 1000°C for gas turbines and heat exchangers.',
    popularGrades: ['Inconel 600', 'Inconel 625', 'Inconel 718', 'Incoloy 800H'],
  },
  {
    id: 'hastelloy',
    slug: 'hastelloy',
    aliases: ['hastelloy-alloys'],
    name: 'Hastelloy',
    shortName: 'Hastelloy',
    badge: 'Pitting & Crevice Corrosion Expert',
    description: 'Premier nickel-molybdenum-chromium alloys resisting wet chlorine gas, hypochlorite, and reducing acid environments.',
    popularGrades: ['Hastelloy C-276', 'Hastelloy C-22', 'Hastelloy B-2'],
  },
  {
    id: 'titanium',
    slug: 'titanium',
    name: 'Titanium',
    shortName: 'Titanium',
    badge: 'Bio-Compatible & Marine',
    description: 'Complete immunity to seawater corrosion, exceptional strength-to-weight ratio, and high melting temperature.',
    popularGrades: ['Grade 1', 'Grade 2 (CP)', 'Grade 5 (Ti-6Al-4V)', 'Grade 7'],
  },
  {
    id: 'copper-alloys',
    slug: 'copper-alloys',
    aliases: ['copper'],
    name: 'Copper',
    shortName: 'Copper',
    badge: 'Antifouling Marine',
    description: 'Excellent thermal conductivity, natural biofouling resistance, and durability in marine seawater cooling circuits.',
    popularGrades: ['Cu-Ni 90/10 (C70600)', 'Cu-Ni 70/30 (C71500)', 'Naval Brass', 'Pure Copper C11000'],
  },
];

// ============================================================================
// 2. PRODUCT FAMILIES METADATA (Cross-Material Master Taxonomy)
// ============================================================================
export const PRODUCT_TAXONOMY = [
  {
    id: 'flanges',
    slug: 'flanges',
    name: 'Flanges',
    displayName: 'Industrial Flanges',
    showTypes: true,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'ASME B16.5, B16.47, and DIN certified flanges precision machined from forged billets in Class 150 to 2500.',
    icon: 'flange',
  },
  {
    id: 'fasteners',
    slug: 'fasteners',
    name: 'Fasteners',
    displayName: 'Industrial Fasteners',
    showTypes: true,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'High-tensile stud bolts, heavy hex nuts, socket screws, and threaded rods conforming to ASTM A193/A194.',
    icon: 'bolt',
  },
  {
    id: 'forging',
    slug: 'forging',
    aliases: ['forged-fittings'],
    name: 'Forging',
    displayName: 'Forging & Forged Fittings',
    showTypes: true,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'Socket weld and threaded elbows, tees, unions, couplings, caps, and crosses rated for 2000 to 9000 PSI service.',
    icon: 'fitting',
  },
  {
    id: 'butt-weld-fittings',
    slug: 'butt-weld-fittings',
    name: 'Butt Weld Fittings',
    displayName: 'Butt Weld Pipe Fittings',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'Seamless & welded long radius elbows, equal/reducing tees, concentric reducers, and caps to ASME B16.9.',
    icon: 'pipe-bend',
  },
  {
    id: 'pipes-tubes',
    slug: 'pipes-tubes',
    name: 'Pipes & Tubes',
    displayName: 'Pipes & Instrumentation Tubes',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'Precision instrumentation tubing, heat exchanger tubes, and heavy-wall line pipes to ASTM A312/A213.',
    icon: 'tubes',
  },
  {
    id: 'sheets-plates',
    slug: 'sheets-plates',
    name: 'Sheets & Plates',
    displayName: 'Industrial Sheets & Plates',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'Hot rolled & cold rolled steel plates, chequered plates, and precision plasma/waterjet cut blanks.',
    icon: 'plate',
  },
  {
    id: 'rods-bars',
    slug: 'rods-bars',
    name: 'Rods & Bars',
    displayName: 'Bright Rods & Engineered Bars',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'Centerless ground round bars, cold drawn hex bars, and square forging billets to ASTM A276/A479.',
    icon: 'bar',
  },
  {
    id: 'ferrule-fittings',
    slug: 'ferrule-fittings',
    name: 'Ferrule Fittings',
    displayName: 'Instrumentation Ferrule Fittings',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'Single & double ferrule compression tube connectors, union tees, and bulkhead adapters up to 15,000 PSI.',
    icon: 'connector',
  },
  {
    id: 'dairy-pharma-fittings',
    slug: 'dairy-pharma-fittings',
    name: 'Dairy & Pharma Fittings',
    displayName: 'Sanitary Dairy & Pharma Fittings',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Manufacture Division',
    shortDesc: 'Tri-Clover clamps, SMS/DIN sanitary unions, and electro-polished bends (Ra < 0.4 µm) for bio-pharma.',
    icon: 'sanitary',
  },
  {
    id: 'hose-pipes',
    slug: 'hose-pipes',
    name: 'Hose Pipes',
    displayName: 'Flexible Metallic Hose Pipes',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'Corrugated stainless steel flexible metallic hoses with single/double high-tensile wire braid.',
    icon: 'hose',
  },
  {
    id: 'perforated-sheets',
    slug: 'perforated-sheets',
    name: 'Perforated Sheets',
    displayName: 'Industrial Perforated Sheets',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'Precision slotted, round-hole, and hexagonal pattern screening sheets for grading and filtration.',
    icon: 'mesh',
  },
  {
    id: 'wire-mesh',
    slug: 'wire-mesh',
    name: 'Wire Mesh',
    displayName: 'Woven Wire Cloth & Mesh',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'Plain, twilled, and Dutch weave fine wire mesh for chemical filtration, demister pads, and sieves.',
    icon: 'cloth',
  },
  {
    id: 'circle',
    slug: 'circle',
    name: 'Circle',
    displayName: 'Circles & Round Blanks',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'CNC waterjet and laser cut circular blanks for pressure vessel dished ends and flange manufacturing.',
    icon: 'circle',
  },
  {
    id: 'flat-bars',
    slug: 'flat-bars',
    name: 'Flat Bars',
    displayName: 'Solid Flat Bars & Flats',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'Hot rolled annealed and cold drawn solid flat bars with conditioned square or radiused edges.',
    icon: 'flat',
  },
  {
    id: 'patapatti-strips',
    slug: 'patapatti-strips',
    name: 'Patapatti / Strips',
    displayName: 'Precision Patapatti & Metal Strips',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'Narrow slit strip coils, edge-deburred patapatti, and shimming foils in custom temper ranges.',
    icon: 'strip',
  },
  {
    id: 'ring',
    slug: 'ring',
    name: 'Ring',
    displayName: 'Forged Rings & Rolled Rings',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'Seamless profile rolled rings, bearing race blanks, and gear forgings proof-machined to drawing.',
    icon: 'ring',
  },
  {
    id: 'coil',
    slug: 'coil',
    name: 'Coil',
    displayName: 'CR / HR Coils & Slit Coils',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'Prime mill coils in 2B, No. 4, and hot rolled finishes, precision slit to customer specified widths.',
    icon: 'coil',
  },
  {
    id: 'wires',
    slug: 'wires',
    name: 'Wires',
    displayName: 'Industrial Wires & Wire Rods',
    showTypes: false,
    showGrades: true,
    categoryDivision: 'Supplier Division',
    shortDesc: 'Cold drawn spring wire, EPQ wire, and certified TIG/MIG welding filler wire to AWS A5.9.',
    icon: 'wire',
  },
];

// ============================================================================
// 3. PRODUCT TYPES CATALOGUE (Only for Flanges, Fasteners & Forged Fittings)
// ============================================================================

export const FLANGE_TYPES = [
  {
    id: 'weld-neck-flange',
    slug: 'weld-neck-flange',
    name: 'Weld Neck Flange',
    shortCode: 'WNRF / WNRTJ',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/Weld Neck Flange.jpeg') || resolveCatalogueAsset('types of product/flanges/SS/weld neck flanges.jpeg'),
    shortDesc: 'Tapered hub butt-welded to pipe for critical severe cyclic high-pressure and high-temperature service.',
    purpose: 'Engineered with a long tapered hub that transitions thickness gradually into the pipe wall, minimizing severe stress concentration at the base of the flange.',
    standards: 'ASME B16.5, ASME B16.47 Series A & B, DIN EN 1092-1 Type 11, MSS SP-44',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500 (PN10 to PN420)',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ), Flat Face (FF)',
    features: [
      'High resistance to dishing, severe temperature swings, and cyclic pipe bending moments',
      'Smooth bore matching pipe schedule ensures zero turbulence and minimal erosion',
      'Full radiographic (RT) inspection capability across the butt-welded circumferential seam',
    ],
    applications: ['Refinery process piping', 'Steam superheater lines', 'Subsea hydrocarbon manifolds', 'Desalination high-pressure headers'],
    relatedTypeSlugs: ['slip-on-flange', 'blind-flange', 'socket-weld-flange', 'long-weld-neck-flange'],
  },
  {
    id: 'slip-on-flange',
    slug: 'slip-on-flange',
    shortCode: 'SORF',
    name: 'Slip-On Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/slip-on-flanges.jpg') || resolveCatalogueAsset('types of product/flanges/SS/slip on.jpeg'),
    shortDesc: 'Slides over pipe outer diameter and secured with double fillet welds inside and outside.',
    purpose: 'Cost-effective flange style that slips over the pipe end for quick alignment and low-stress installation in moderate pressure piping circuits.',
    standards: 'ASME B16.5, DIN EN 1092-1 Type 12, BS 4504',
    pressureClasses: 'Class 150, 300, 600, 1500 (PN6 to PN100)',
    facings: 'Raised Face (RF), Flat Face (FF)',
    features: [
      'Lower initial material and installation cost than weld neck flanges',
      'Requires less precise pipe cutting lengths before fit-up',
      'Double fillet welds provide reliable joint integrity for utility and non-critical process fluid service',
    ],
    applications: ['Cooling water distribution', 'Low-pressure steam systems', 'Firewater ring mains', 'Chemical transfer lines'],
    relatedTypeSlugs: ['weld-neck-flange', 'blind-flange', 'lap-joint-flange', 'socket-weld-flange'],
  },
  {
    id: 'blind-flange',
    slug: 'blind-flange',
    shortCode: 'BLRF',
    name: 'Blind Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/blind.jpeg'),
    shortDesc: 'Solid disc without a central bore used to seal piping terminals, pressure vessel nozzles, and valves.',
    purpose: 'Acts as a high-pressure end closure on pipelines and pressure vessels, providing easy access for internal pipe cleaning and pressure testing.',
    standards: 'ASME B16.5, ASME B16.47, DIN EN 1092-1 Type 05',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ), Flat Face (FF)',
    features: [
      'Subject to highest bending stresses at the center among all flange designs',
      'Allows convenient future expansion or inspection access into the piping line',
      'Available with tapped gauge ports or sacrificial anode plugs for corrosion monitoring',
    ],
    applications: ['Hydrotest line isolation', 'Pressure vessel cleanout ports', 'Pump manifold blanking', 'Storage tank bypass isolation'],
    relatedTypeSlugs: ['spectacle-blind-flange', 'weld-neck-flange', 'slip-on-flange', 'orifice-flange'],
  },
  {
    id: 'socket-weld-flange',
    slug: 'socket-weld-flange',
    shortCode: 'SWRF',
    name: 'Socket Weld Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/socket weld.jpeg'),
    shortDesc: 'Features a counterbore socket to seat small-diameter pipe with a single external fillet weld.',
    purpose: 'Designed for high-pressure, small-diameter piping runs (1/2" to 3") where internal bore turbulence must be avoided while maintaining mechanical rigidity.',
    standards: 'ASME B16.5, BS 3293',
    pressureClasses: 'Class 150, 300, 600, 1500',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    features: [
      'Smooth internal fluid flow with minimized crevice corrosion',
      'Requires approximately 1/16" bottom clearance expansion gap before welding to absorb thermal expansion',
      'Higher fatigue strength than threaded connections in severe vibration conditions',
    ],
    applications: ['Hydraulic control systems', 'Boiler feed water lines', 'Compressed air lines', 'Small-bore chemical dosing circuits'],
    relatedTypeSlugs: ['threaded-flange', 'weld-neck-flange', 'slip-on-flange', 'blind-flange'],
  },
  {
    id: 'threaded-flange',
    slug: 'threaded-flange',
    shortCode: 'THRF',
    name: 'Threaded Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/Threaded Flange.jpeg') || resolveCatalogueAsset('types of product/flanges/SS/threded.jpeg'),
    shortDesc: 'Internally threaded flange assembled without welding in non-welding explosive hazardous environments.',
    purpose: 'Connected to external male pipe threads (NPT / BSPT) without applying hot work or open flame welding, ideal for maintenance in explosive petrochemical zones.',
    standards: 'ASME B16.5 (Threads to ASME B1.20.1 NPT or ISO 7-1)',
    pressureClasses: 'Class 150, 300, 600, 900, 1500',
    facings: 'Raised Face (RF), Flat Face (FF)',
    features: [
      'No hot work welding permits required during site maintenance and installations',
      'Thread engagement can be seal-welded if additional joint sealing integrity is later required',
      'Economical solution for moderate temperature utility systems',
    ],
    applications: ['Fuel handling facilities', 'Explosive chemical areas', 'Plant utility water lines', 'Temporary test instrumentation manifolds'],
    relatedTypeSlugs: ['socket-weld-flange', 'slip-on-flange', 'blind-flange', 'weld-neck-flange'],
  },
  {
    id: 'lap-joint-flange',
    slug: 'lap-joint-flange',
    shortCode: 'LJRF',
    name: 'Lap Joint Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/lap joint flanges.jpeg'),
    shortDesc: 'Loose backing flange paired with a metallic stub end, allowing 360° rotational bolt hole alignment.',
    purpose: 'The loose backing flange freely rotates around the welded stub end, allowing rapid bolt hole orientation and significant cost savings in expensive exotic alloy systems.',
    standards: 'ASME B16.5, DIN EN 1092-1 Type 02',
    pressureClasses: 'Class 150, 300, 600',
    facings: 'Flat Back (seats on Stub End lap)',
    features: [
      'Cost reduction: Backing flange can be carbon steel while only the wetted stub end is titanium, inconel, or stainless',
      'Effortless 360-degree rotation facilitates quick alignment of bolt holes in tight pipe runs',
      'Ideal for systems requiring frequent dismantling for inspection or cleaning',
    ],
    applications: ['Paper pulp digest lines', 'Chemical leaching tanks', 'Food process slurry lines', 'Corrosive chemical batching'],
    relatedTypeSlugs: ['slip-on-flange', 'weld-neck-flange', 'blind-flange'],
  },
  {
    id: 'long-weld-neck-flange',
    slug: 'long-weld-neck-flange',
    shortCode: 'LWNRF',
    name: 'Long Weld Neck Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/long weld neck.jpeg'),
    shortDesc: 'Extended heavy-wall forged neck functioning as an integral column nozzle on pressure vessels.',
    purpose: 'Acts as an integrated nozzle for pressure vessels, columns, and heat exchanger shells, eliminating the need for a separate piece of pipe and reinforcement pad.',
    standards: 'ASME B16.5 Dimensional Form, Custom Vessel Standards',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    features: [
      'Square cut end barrel directly welds to the vessel shell plate without intermediate butt welds',
      'Substantially higher structural reinforcement against external seismic and piping nozzle loads',
      'Full volumetric NDT ultrasonic inspection across the entire monolithic forged body',
    ],
    applications: ['Petrochemical distillation columns', 'Boiler steam drums', 'Reactor pressure vessels', 'Subsea separator vessels'],
    relatedTypeSlugs: ['weld-neck-flange', 'blind-flange', 'orifice-flange'],
  },
  {
    id: 'orifice-flange',
    slug: 'orifice-flange',
    shortCode: 'Orifice Union',
    name: 'Orifice Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/orifice flanges.jpeg') || resolveCatalogueAsset('types of product/flanges/SS/Orifice Flange.jpeg'),
    shortDesc: 'Flange pair equipped with radial differential pressure tapping holes and jacking screws for flow metering.',
    purpose: 'Supplied in matched pairs with precision radial tap holes and jack screws to clamp an orifice plate for metering flow rate and differential pressure across fluid streams.',
    standards: 'ASME B16.36, AGA Report No. 3',
    pressureClasses: 'Class 300, 600, 900, 1500, 2500 (Weld Neck, Threaded, Slip-On)',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    features: [
      'Pre-drilled and threaded 1/2" NPT differential pressure taps on opposite sides',
      'Integral jack screws spread the flanges apart during orifice plate replacement without damaging gaskets',
      'Calibrated for accurate fiscal metering and process custody transfer',
    ],
    applications: ['Natural gas fiscal flow metering', 'Refinery custody transfer stations', 'Boiler feed steam measurement', 'Chemical mass flow monitoring'],
    relatedTypeSlugs: ['weld-neck-flange', 'blind-flange', 'spectacle-blind-flange'],
  },
  {
    id: 'spectacle-blind-flange',
    slug: 'spectacle-blind-flange',
    shortCode: 'Figure-8 / Spade',
    name: 'Spectacle Blind Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/spectackle blind flanges.jpeg'),
    shortDesc: 'Figure-8 double disc with one solid and one open ring to visibly provide 100% positive pipeline shutoff.',
    purpose: 'Sandwiched between two pipe flanges; rotating between the open hole and solid paddle gives unambiguous visual verification that a line is safely isolated or in service.',
    standards: 'ASME B16.48, MSS SP-6',
    pressureClasses: 'Class 150, 300, 600, 900, 1500, 2500',
    facings: 'Raised Face (RF), Ring Type Joint (RTJ)',
    features: [
      'Unambiguous visual confirmation of line isolation during maintenance lock-out/tag-out (LOTO)',
      'Engineered to withstand full line design pressure on the solid disc side',
      'Available as Figure-8 (Spectacle), single blind paddle (Spade), or single open ring (Spacer)',
    ],
    applications: ['Flare gas header maintenance isolation', 'Reactor maintenance lockouts', 'Loading terminal line blanking', 'Tank farm product segregation'],
    relatedTypeSlugs: ['blind-flange', 'weld-neck-flange', 'orifice-flange'],
  },
  {
    id: 'reducing-flange',
    slug: 'reducing-flange',
    shortCode: 'Red. Flange',
    name: 'Reducing Flange',
    image: resolveCatalogueAsset('types of product/flanges/alloy steel types/reducing flanes.jpeg'),
    shortDesc: 'Standard external mating dimensions with a smaller bore to make pipe diameter reductions.',
    purpose: 'Allows a direct change in pipe size without inserting an additional concentric or eccentric butt-weld reducer fitting, saving valuable longitudinal installation space.',
    standards: 'ASME B16.5, DIN EN 1092-1',
    pressureClasses: 'Class 150, 300, 600, 900',
    facings: 'Raised Face (RF), Flat Face (FF)',
    features: [
      'Saves space in tight marine pump skids and skid-mounted chemical dosing packages',
      'Available in slip-on, threaded, or socket weld reducing formats',
      'Eliminates two welded joints compared to a conventional pipe reducer installation',
    ],
    applications: ['Centrifugal pump discharge nozzles', 'Compressor inlet manifolds', 'Flow meter transitions', 'Pressure relief valve discharge piping'],
    relatedTypeSlugs: ['weld-neck-flange', 'slip-on-flange', 'blind-flange'],
  },
];

export const FASTENER_TYPES = [
  {
    id: 'stud-bolts',
    slug: 'stud-bolts',
    name: 'Stud Bolts with 2 Heavy Hex Nuts',
    image: resolveCatalogueAsset('our product images/fasteners.png') || resolveCatalogueAsset('Product Section/Manufacturer division/Fasteners/stainless-steel.webp'),
    shortDesc: 'Continuously threaded alloy & stainless rods supplied with two matched heavy hex nuts.',
    purpose: 'Primary pressure boundary fasteners for ASME B16.5 and B16.47 flange bolting, pressure vessels, and high-pressure valve bonnet assemblies.',
    standards: 'ASTM A193 Gr. B7/B8/B8M/B16, ASTM A194 Gr. 2H/8/8M, ASME B18.31.2',
    features: [
      'Full length thread engagement allows uniform torquing and tensioning',
      'Easy removal and replacement even in severe atmospheric or offshore marine exposure',
      'Available with Zinc-Nickel, Hot Dip Galvanized, PTFE Xylan 1070, and Cadmium coatings',
    ],
    applications: ['Pipeline flange joints', 'Heat exchanger channel covers', 'Subsea valve assemblies', 'Pressure vessel handholes'],
    relatedTypeSlugs: ['heavy-hex-nuts', 'hex-head-bolts', 'threaded-rods'],
  },
  {
    id: 'heavy-hex-nuts',
    slug: 'heavy-hex-nuts',
    name: 'Heavy Hex Nuts',
    image: resolveCatalogueAsset('Product Section/Manufacturer division/Fasteners/carbon.jpeg'),
    shortDesc: 'Thicker and wider across flats than standard nuts to distribute high clamping preload.',
    purpose: 'Engineered with increased cross-sectional width across flats and thickness to withstand proof load stresses without thread stripping under high torque tightening.',
    standards: 'ASME B18.2.2, ASTM A194, ISO 4033',
    features: [
      'Wider bearing area distributes high bolt clamping loads across flange faces',
      'Full proof load tested according to ASTM A194 specifications',
      'Available in plain black, zinc plated, yellow passivated, and fluoropolymer coated',
    ],
    applications: ['High pressure bolting', 'Structural bridge connections', 'Turbine casings', 'Crane rail anchors'],
    relatedTypeSlugs: ['stud-bolts', 'hex-head-bolts', 'washers'],
  },
  {
    id: 'hex-head-bolts',
    slug: 'hex-head-bolts',
    name: 'Hex Head Machine Bolts',
    image: resolveCatalogueAsset('Product Section/Manufacturer division/Fasteners/alloy steel.avif'),
    shortDesc: 'Precision engineered hexagon head bolts with partial or full shank threading.',
    purpose: 'General purpose and structural industrial fastening for machinery bases, pipe rack supports, and mechanical equipment installations.',
    standards: 'ASME B18.2.1, ISO 4014 / 4017, DIN 931 / 933',
    features: [
      'Available in Grade 8.8, 10.9, 12.9 high tensile and A2/A4-70/80 stainless steel',
      'Precision machined under-head radius to minimize fatigue failure',
      'High shear and tensile strength for structural steel fabrication',
    ],
    applications: ['Pipe hanger framing', 'Pump and motor base mounting', 'Structural steel trusses', 'Storage tank anchors'],
    relatedTypeSlugs: ['stud-bolts', 'heavy-hex-nuts', 'washers', 'anchor-bolts'],
  },
  {
    id: 'socket-head-cap-screws',
    slug: 'socket-head-cap-screws',
    name: 'Socket Head Cap Screws',
    image: resolveCatalogueAsset('Product Section/Manufacturer division/Fasteners/duplex.jpg'),
    shortDesc: 'Cylindrical head with internal hex drive for recessed, high-torque counterbored holes.',
    purpose: 'Engineered for high-clamping strength where exterior wrench clearance is limited, commonly utilized in precision die tooling, pumps, and valve actuators.',
    standards: 'ASME B18.3, DIN 912, ISO 4762',
    features: [
      'Internal hex drive permits high torquing without slippage or cam-out',
      'Compact cylindrical head fits flush inside counterbored holes',
      'Heat treated to achieve high tensile strength exceeding 1200 MPa',
    ],
    applications: ['Hydraulic valve manifolds', 'High-pressure pump casings', 'Machine tool fixtures', 'Automotive die assemblies'],
    relatedTypeSlugs: ['hex-head-bolts', 'stud-bolts', 'washers'],
  },
  {
    id: 'threaded-rods',
    slug: 'threaded-rods',
    name: 'Continuous Threaded Rods',
    image: resolveCatalogueAsset('Product Section/Manufacturer division/Fasteners/super duplex.jpeg'),
    shortDesc: '1 meter, 2 meter, and 3 meter long threaded bar stock cut to custom project lengths.',
    purpose: 'Versatile hanging and clamping component used for piping suspension, structural tie rods, chemical anchor embedding, and custom length stud fabrication.',
    standards: 'ASME B18.31.3, DIN 975 / 976',
    features: [
      'Continuous rolled threads for superior fatigue endurance and smooth nut travel',
      'Can be cut and chamfered in field to custom lengths as requirements evolve',
      'Available across 304, 316, 2205 Duplex, and Grade B7/B16 alloys',
    ],
    applications: ['HVAC & piping clevis suspension', 'Post-installed chemical anchors', 'Concrete formwork tie-backs', 'Electrical cable tray mounting'],
    relatedTypeSlugs: ['stud-bolts', 'heavy-hex-nuts', 'anchor-bolts'],
  },
  {
    id: 'washers',
    slug: 'washers',
    name: 'Plain & Spring Lock Washers',
    image: resolveCatalogueAsset('Product Section/Manufacturer division/Fasteners/exotic alloys.jpeg'),
    shortDesc: 'Hardened flat load-spreading washers and helical spring anti-loosening lock rings.',
    purpose: 'Distributes bolting pre-load across contact surfaces to prevent surface galling and provide tension maintenance against operational vibration.',
    standards: 'ASTM F436, ASME B18.21.1, DIN 125, DIN 127',
    features: [
      'Hardened ASTM F436 flat washers prevent embedment into softer flange materials',
      'Helical spring washers prevent back-off in high-vibration rotating machinery installations',
      'Available in bevelled format for structural I-beam flange bolting',
    ],
    applications: ['Flange bolting assemblies', 'Vibrating motor foundations', 'Pipeline support clamping', 'Structural bolted joints'],
    relatedTypeSlugs: ['stud-bolts', 'heavy-hex-nuts', 'hex-head-bolts'],
  },
];

/**
 * Resolves material-wise authentic forging fitting images directly from src/assets/forge 2
 */
export const getForgingImageForMaterial = (materialSlug, typeSlug) => {
  const mat = (materialSlug || '').toLowerCase();
  const type = (typeSlug || '').toLowerCase();

  let folder = 'ss';
  if (mat.includes('carbon')) folder = 'carbon';
  else if (mat.includes('alloy') && !mat.includes('nickel') && !mat.includes('copper')) folder = 'alloy steel';
  else if (mat.includes('duplex')) folder = 'duplex$super duplex';
  else if (mat.includes('nickel')) folder = 'nikle';
  else if (mat.includes('monel')) folder = 'monel';
  else if (mat.includes('inconel')) folder = 'iconel';
  else if (mat.includes('hastelloy')) folder = 'hastelloy';
  else if (mat.includes('titanium') || mat.includes('titainium')) folder = 'titainium';
  else if (mat.includes('copper') || mat.includes('cupro') || mat.includes('brass')) folder = 'copper';
  else folder = 'ss';

  let file = 'elbow.jpeg';
  if (type.includes('cap')) {
    file = 'cap.jpeg';
  } else if (type.includes('coupling')) {
    file = 'coupling.jpeg';
  } else if (type.includes('cross')) {
    file = 'cross.jpeg';
  } else if (type.includes('tee')) {
    file = 'tee.jpeg';
  } else if (type.includes('union')) {
    if (folder === 'titainium') {
      return resolveCatalogueAsset('forge 2/iconel/union.jpeg') || resolveCatalogueAsset('forge 2/ss/union.jpeg');
    }
    file = 'union.jpeg';
  } else if (type.includes('elbow')) {
    if (folder === 'duplex$super duplex') {
      file = 'duplex.jpeg';
    } else {
      file = 'elbow.jpeg';
    }
  }

  const resolved = resolveCatalogueAsset(`forge 2/${folder}/${file}`);
  if (resolved) return resolved;
  return resolveCatalogueAsset(`forge 2/ss/${file}`) || '';
};

export const FORGED_FITTING_TYPES = [
  {
    id: 'forged-elbow',
    slug: 'forged-elbow',
    aliases: ['forged-90-elbow', 'forged-45-elbow', 'elbow'],
    name: 'Forged Elbow (90° / 45°)',
    shortCode: 'Elbow (SW / NPT)',
    image: resolveCatalogueAsset('forge 2/ss/elbow.jpeg') || resolveCatalogueAsset('our product images/forged fittings.png'),
    shortDesc: 'High-pressure direction changer in Socket Weld (SW) and Screwed (NPT/BSPT) formats.',
    purpose: 'Changes fluid line direction by 90 or 45 degrees with heavy forged wall thickness rated for 2000#, 3000#, 6000#, and 9000# pressure service.',
    standards: 'ASME B16.11, BS 3799, MSS SP-79/83',
    pressureClasses: '2000#, 3000#, 6000#, 9000# PSI',
    features: [
      'Heavy forged monolithic grain structure resisting hydraulic shock and pressure pulsation',
      'Socket weld depth engineered for positive alignment and strong root weld penetration',
      'Clean female NPT / BSPT threads machined to ASME B1.20.1 standards',
    ],
    applications: ['High-pressure hydraulic circuits', 'Boiler blowdown lines', 'Chemical dosing headers', 'Wellhead flow manifolds'],
    relatedTypeSlugs: ['forged-tee', 'forged-union', 'forged-coupling', 'forged-cap', 'forged-cross'],
  },
  {
    id: 'forged-tee',
    slug: 'forged-tee',
    aliases: ['tee'],
    name: 'Forged Tee (Equal & Reducing)',
    shortCode: 'Tee (Equal / Red.)',
    image: resolveCatalogueAsset('forge 2/ss/tee.jpeg') || resolveCatalogueAsset('Product Section/Manufacturer division/Forged Fittings/carbon.avif'),
    shortDesc: '90-degree branched connection with reinforced crotch for severe pressure containment.',
    purpose: 'Splits or converges fluid streams at 90 degrees with reinforced forged crotch walls designed to withstand external piping moments and hydraulic hammer.',
    standards: 'ASME B16.11, BS 3799',
    pressureClasses: '2000#, 3000#, 6000#, 9000# PSI',
    features: [
      'Available with equal run and branch, or reducing branch for line take-offs',
      'Reinforced forged body compensates for cross-sectional area loss at the branch aperture',
      'Full volumetric NDT dye penetrant and ultrasonic tested for integrity',
    ],
    applications: ['Distribution manifold headers', 'Relief valve take-offs', 'Sampling port branches', 'Drain and vent tie-ins'],
    relatedTypeSlugs: ['forged-elbow', 'forged-coupling', 'forged-union', 'forged-cross'],
  },
  {
    id: 'forged-union',
    slug: 'forged-union',
    aliases: ['union'],
    name: 'High-Pressure Forged Union',
    shortCode: 'Union (Ground Seat)',
    image: resolveCatalogueAsset('forge 2/ss/union.jpeg') || resolveCatalogueAsset('Product Section/Manufacturer division/Forged Fittings/super duplex.jpeg'),
    shortDesc: 'Three-piece detachable coupling with ground metallic seat for rapid pipeline maintenance.',
    purpose: 'Allows quick disconnection and reconnection of piping runs, pumps, and regulators without cutting pipe or turning large lengths of pipe.',
    standards: 'MSS SP-83, ASME B16.11',
    pressureClasses: '3000#, 6000# PSI',
    features: [
      'Three-piece forged assembly (Male tailpiece, Female head, and heavy Union nut)',
      'Precision machined spherical ground metal-to-metal or bronze-to-iron sealing seat',
      'Withstands repeated uncoupling and reassembly without loss of sealing capability',
    ],
    applications: ['Pump suction and discharge lines', 'Control valve bypass manifolds', 'Filter cleanout stations', 'Compressor skid connections'],
    relatedTypeSlugs: ['forged-coupling', 'forged-elbow', 'forged-tee', 'forged-cross'],
  },
  {
    id: 'forged-coupling',
    slug: 'forged-coupling',
    aliases: ['coupling'],
    name: 'Forged Coupling (Full & Half)',
    shortCode: 'Coupling (Full / Half)',
    image: resolveCatalogueAsset('forge 2/ss/coupling.jpeg') || resolveCatalogueAsset('Product Section/Manufacturer division/Forged Fittings/duplex.jpg'),
    shortDesc: 'Straight in-line pipe joiners and vessel nozzle branch couplings in SW and Threaded form.',
    purpose: 'Full couplings join two lengths of small-diameter pipe in-line; half couplings are welded directly onto large run pipes or vessel walls to create branch connections.',
    standards: 'ASME B16.11, MSS SP-83',
    pressureClasses: '3000#, 6000# PSI',
    features: [
      'Full couplings feature internal pipe stop shoulder for precise pipe spacing',
      'Half couplings feature bevelled outer edge ready for fillet branch welding',
      'Precision machined threads prevent leakage in vibration environments',
    ],
    applications: ['Thermowell instrument tap connections', 'Pipe run extensions', 'Pressure gauge take-offs', 'Sample connection ports'],
    relatedTypeSlugs: ['forged-union', 'forged-elbow', 'forged-cap', 'forged-cross'],
  },
  {
    id: 'forged-cap',
    slug: 'forged-cap',
    aliases: ['forged-end-cap', 'cap'],
    name: 'Forged Pipe End Cap',
    shortCode: 'End Cap (SW / THD)',
    image: resolveCatalogueAsset('forge 2/ss/cap.jpeg') || resolveCatalogueAsset('Product Section/Manufacturer division/Forged Fittings/titainium.jpg'),
    shortDesc: 'High-pressure solid hemispherical caps for terminating small-bore pipe runs.',
    purpose: 'Welded or threaded onto the dead end of a small diameter pipe to terminate flow permanently while resisting full line pressure and water hammer.',
    standards: 'ASME B16.11, BS 3799',
    pressureClasses: '3000#, 6000#, 9000# PSI',
    features: [
      'Thick forged dome geometry distributes internal hydrostatic stress evenly',
      'Socket weld version allows full socket penetration weld; threaded version features clean NPT thread',
      'Provides high structural integrity compared to fabricated flat plate caps',
    ],
    applications: ['Header pipe dead ends', 'Manifold terminal isolation', 'High pressure blowoff headers', 'Test loop closure'],
    relatedTypeSlugs: ['forged-coupling', 'forged-elbow', 'forged-cross', 'forged-union'],
  },
  {
    id: 'forged-cross',
    slug: 'forged-cross',
    aliases: ['cross'],
    name: 'Forged Cross (4-Way Fitting)',
    shortCode: 'Cross (4-Way)',
    image: resolveCatalogueAsset('forge 2/ss/cross.jpeg'),
    shortDesc: 'Four-way 90-degree forged distribution fitting for multi-directional pipeline headers.',
    purpose: 'Distributes or combines flow across four intersecting pipe branches at 90-degree angles in compact instrumentation and hydraulic manifold skids.',
    standards: 'ASME B16.11, BS 3799',
    pressureClasses: '2000#, 3000#, 6000#, 9000# PSI',
    features: [
      'Monolithic four-way forged body withstands severe torsional and bending moments',
      'Uniform wall thickness and reinforced intersections eliminate pressure hot spots',
      'Available in Socket Weld (SW) and Threaded (NPT) connections',
    ],
    applications: ['Hydraulic power units', 'Multi-point distribution manifolds', 'Instrumentation cooling loops', 'Chemical injection trees'],
    relatedTypeSlugs: ['forged-tee', 'forged-elbow', 'forged-union', 'forged-coupling'],
  },
];

// ============================================================================
// 4. VERIFIED GRADES DATABASE (Technical Specifications & Chemical Properties)
// ============================================================================

export const GRADES_DB = {
  // STAINLESS STEEL GRADES
  '304': {
    slug: '304',
    designation: 'AISI 304 / ASTM A182 F304 / ASTM A312 TP304',
    materialSlug: 'stainless-steel',
    standard: 'ASTM A182 / A312 / A240 / A276',
    family: 'Austenitic Stainless Steel (18/8)',
    overview: 'The most versatile and widely utilized austenitic chromium-nickel stainless steel, providing balanced corrosion resistance, high ductility, and good weldability.',
    chemicalComp: { Cr: '18.0 - 20.0%', Ni: '8.0 - 10.5%', C: '≤ 0.08%', Mn: '≤ 2.00%', Si: '≤ 0.75%', P: '≤ 0.045%', S: '≤ 0.030%' },
    mechanicalProps: { tensile: '≥ 515 MPa (75 ksi)', yield: '≥ 205 MPa (30 ksi)', elongation: '≥ 30%', hardness: '≤ 201 HBW (92 HRB)' },
    thermalLimits: '-196°C to 800°C (-320°F to 1472°F)',
    corrosionNotes: 'Excellent in potable water, atmospheric weathering, and mild organic acids. Susceptible to chloride stress corrosion cracking above 60°C.',
    equivalents: { uns: 'UNS S30400', en: '1.4301 (X5CrNi18-10)', jis: 'SUS 304', bs: '304S31' },
    applications: ['Food and beverage processing', 'Architectural piping', 'Storage tanks and pressure vessels', 'Chemical equipment'],
  },
  '304l': {
    slug: '304l',
    designation: 'AISI 304L / ASTM A182 F304L / ASTM A312 TP304L',
    materialSlug: 'stainless-steel',
    standard: 'ASTM A182 / A312 / A240 / A276',
    family: 'Extra Low Carbon Austenitic Stainless Steel',
    overview: 'Low carbon modification of Grade 304 (C ≤ 0.030%) that eliminates harmful chromium carbide precipitation during welding, providing immunity to intergranular corrosion.',
    chemicalComp: { Cr: '18.0 - 20.0%', Ni: '8.0 - 12.0%', C: '≤ 0.030%', Mn: '≤ 2.00%', Si: '≤ 0.75%', P: '≤ 0.045%', S: '≤ 0.030%' },
    mechanicalProps: { tensile: '≥ 485 MPa (70 ksi)', yield: '≥ 170 MPa (25 ksi)', elongation: '≥ 30%', hardness: '≤ 201 HBW (92 HRB)' },
    thermalLimits: '-196°C to 450°C in welded corrosive service',
    corrosionNotes: 'Resists intergranular attack in as-welded condition without requiring post-weld solution annealing heat treatment.',
    equivalents: { uns: 'UNS S30403', en: '1.4307 (X2CrNi18-9)', jis: 'SUS 304L', bs: '304S11' },
    applications: ['Heavy gauge welded components', 'Chemical plant headers', 'Brewery & dairy process equipment', 'Pharmaceutical fluid handling'],
  },
  '316': {
    slug: '316',
    designation: 'AISI 316 / ASTM A182 F316 / ASTM A312 TP316',
    materialSlug: 'stainless-steel',
    standard: 'ASTM A182 / A312 / A240 / A276 / A193 B8M',
    family: 'Molybdenum-Bearing Austenitic Stainless Steel',
    overview: 'Molybdenum alloyed austenitic grade offering significantly enhanced resistance to chloride pitting, crevice corrosion, and elevated temperature creep.',
    chemicalComp: { Cr: '16.0 - 18.0%', Ni: '10.0 - 14.0%', Mo: '2.00 - 3.00%', C: '≤ 0.08%', Mn: '≤ 2.00%', Si: '≤ 0.75%' },
    mechanicalProps: { tensile: '≥ 515 MPa (75 ksi)', yield: '≥ 205 MPa (30 ksi)', elongation: '≥ 30%', hardness: '≤ 217 HBW (95 HRB)' },
    thermalLimits: '-196°C to 850°C continuous service',
    corrosionNotes: 'Superior to 304 in marine environments, chloride solutions, sulfuric acid, and acetic acid solutions. PREN ~ 23-25.',
    equivalents: { uns: 'UNS S31600', en: '1.4401 (X5CrNiMo17-12-2)', jis: 'SUS 316', bs: '316S31' },
    applications: ['Marine hardware and offshore piping', 'Petrochemical processing', 'Pulp and paper bleaching equipment', 'Desalination plant headers'],
  },
  '316l': {
    slug: '316l',
    designation: 'AISI 316L / ASTM A182 F316L / ASTM A312 TP316L',
    materialSlug: 'stainless-steel',
    standard: 'ASTM A182 / A312 / A240 / A276',
    family: 'Extra Low Carbon Molybdenum Austenitic Steel',
    overview: 'Extra-low carbon version of 316 (C ≤ 0.030%) immune to sensitization during heavy-section welding, standard choice for severe marine and chemical service.',
    chemicalComp: { Cr: '16.0 - 18.0%', Ni: '10.0 - 14.0%', Mo: '2.00 - 3.00%', C: '≤ 0.030%', Mn: '≤ 2.00%', Si: '≤ 0.75%' },
    mechanicalProps: { tensile: '≥ 485 MPa (70 ksi)', yield: '≥ 170 MPa (25 ksi)', elongation: '≥ 30%', hardness: '≤ 217 HBW (95 HRB)' },
    thermalLimits: '-196°C to 450°C in as-welded corrosive environments',
    corrosionNotes: 'Zero grain-boundary carbide precipitation during welding; maintains high PREN resistance to chloride pitting in welded seams.',
    equivalents: { uns: 'UNS S31603', en: '1.4404 (X2CrNiMo17-12-2)', jis: 'SUS 316L', bs: '316S11' },
    applications: ['Offshore oil & gas process lines', 'High-purity pharmaceutical piping', 'Sulfuric and acetic acid manufacturing', 'Marine scrubbers'],
  },
  '321': {
    slug: '321',
    designation: 'AISI 321 / ASTM A182 F321 / ASTM A312 TP321',
    materialSlug: 'stainless-steel',
    standard: 'ASTM A182 / A312 / A240 / A276',
    family: 'Titanium-Stabilized Austenitic Stainless Steel',
    overview: 'Stabilized with titanium addition (Ti ≥ 5 × (C+N)) to form stable titanium carbides, preventing sensitization during continuous exposure in the 425°C to 850°C range.',
    chemicalComp: { Cr: '17.0 - 19.0%', Ni: '9.0 - 12.0%', Ti: '5 × (C+N) min to 0.70%', C: '≤ 0.08%', Mn: '≤ 2.00%', Si: '≤ 0.75%' },
    mechanicalProps: { tensile: '≥ 515 MPa (75 ksi)', yield: '≥ 205 MPa (30 ksi)', elongation: '≥ 30%', hardness: '≤ 217 HBW' },
    thermalLimits: 'Designed for 425°C to 900°C (800°F to 1650°F) carbide precipitation range',
    corrosionNotes: 'Excellent resistance to intergranular corrosion after prolonged elevated temperature exposure in refinery and boiler services.',
    equivalents: { uns: 'UNS S32100', en: '1.4541 (X6CrNiTi18-10)', jis: 'SUS 321', bs: '321S31' },
    applications: ['Aircraft exhaust manifolds', 'Refinery cracking furnaces', 'High-temperature boiler tubes', 'Thermal oxidizer expansion bellows'],
  },
  '347': {
    slug: '347',
    designation: 'AISI 347 / ASTM A182 F347 / ASTM A312 TP347',
    materialSlug: 'stainless-steel',
    standard: 'ASTM A182 / A312 / A240 / A276',
    family: 'Niobium / Columbium-Stabilized Austenitic Steel',
    overview: 'Stabilized with columbium/niobium additions (Nb ≥ 10 × C) providing superior creep and stress rupture properties at temperatures exceeding 550°C.',
    chemicalComp: { Cr: '17.0 - 19.0%', Ni: '9.0 - 13.0%', Nb: '10 × C min to 1.00%', C: '≤ 0.08%', Mn: '≤ 2.00%', Si: '≤ 0.75%' },
    mechanicalProps: { tensile: '≥ 515 MPa (75 ksi)', yield: '≥ 205 MPa (30 ksi)', elongation: '≥ 30%', hardness: '≤ 217 HBW' },
    thermalLimits: 'Optimal in 425°C to 850°C severe thermal cycling regimes',
    corrosionNotes: 'Immune to intergranular attack in presence of polythionic acid in refinery hydrodesulfurization units.',
    equivalents: { uns: 'UNS S34700', en: '1.4550 (X6CrNiNb18-10)', jis: 'SUS 347', bs: '347S31' },
    applications: ['Refinery hydrocracker piping', 'Catalytic reforming units', 'Radioactive waste processing', 'Heavy diesel exhaust manifolds'],
  },
  '310s': {
    slug: '310s',
    designation: 'AISI 310S / ASTM A182 F310 / ASTM A312 TP310S',
    materialSlug: 'stainless-steel',
    standard: 'ASTM A182 / A312 / A240 / A276',
    family: 'High Chromium-Nickel Heat Resistant Stainless Steel',
    overview: 'High-alloy 25Cr-20Ni austenitic steel engineered for continuous high-temperature service up to 1150°C, offering exceptional resistance to oxidation and sulfidation.',
    chemicalComp: { Cr: '24.0 - 26.0%', Ni: '19.0 - 22.0%', C: '≤ 0.08%', Mn: '≤ 2.00%', Si: '≤ 1.50%', P: '≤ 0.045%' },
    mechanicalProps: { tensile: '≥ 515 MPa (75 ksi)', yield: '≥ 205 MPa (30 ksi)', elongation: '≥ 30%', hardness: '≤ 217 HBW' },
    thermalLimits: 'Resists oxidation in continuous air up to 1150°C (2100°F)',
    corrosionNotes: 'Forms a tenacious protective chromia scale; resists carburizing and moderately sulfidizing furnace atmospheres.',
    equivalents: { uns: 'UNS S31008', en: '1.4845 (X8CrNi25-21)', jis: 'SUS 310S', bs: '310S24' },
    applications: ['Kiln and furnace burner components', 'Fluidized bed coal combustors', 'Radiant tubes and retorts', 'Thermal recuperators'],
  },
  '904l': {
    slug: '904l',
    designation: 'Uranus B6 / ASTM A182 F904L / UNS N08904',
    materialSlug: 'stainless-steel',
    standard: 'ASTM A182 / A312 / B625 / B677',
    family: 'Super Austenitic High-Nickel Stainless Steel',
    overview: 'Non-stabilized super-austenitic alloy with high copper addition (1.0-2.0%) giving extraordinary resistance to strong reducing acids like pure sulfuric and phosphoric acid.',
    chemicalComp: { Cr: '19.0 - 23.0%', Ni: '23.0 - 28.0%', Mo: '4.0 - 5.0%', Cu: '1.0 - 2.0%', C: '≤ 0.020%', N: '≤ 0.10%' },
    mechanicalProps: { tensile: '≥ 490 MPa (71 ksi)', yield: '≥ 220 MPa (31 ksi)', elongation: '≥ 35%', hardness: '≤ 200 HBW' },
    thermalLimits: '-50°C to 400°C in aggressive acidic chemistry',
    corrosionNotes: 'PREN ≥ 34. Immune to stress corrosion cracking due to high 25% nickel content; exceptional in dilute sulfuric acid at all concentrations.',
    equivalents: { uns: 'UNS N08904', en: '1.4539 (X1NiCrMoCu25-20-5)', jis: 'SUS 890L', din: 'W.Nr. 1.4539' },
    applications: ['Phosphate fertilizer production', 'Sulfuric acid alkylation units', 'Flue gas desulfurization (FGD) scrubbers', 'Seawater cooling towers'],
  },

  // CARBON STEEL GRADES
  'a105': {
    slug: 'a105',
    designation: 'ASTM A105 / ASME SA105 Forged Carbon Steel',
    materialSlug: 'carbon-steel',
    standard: 'ASTM A105 / ASME SA105',
    family: 'Forged Carbon Steel for Ambient & High Temp',
    overview: 'Standard forged carbon steel specification for piping components including flanges, fittings, and valves for service in pressure systems at ambient and higher-temperature service.',
    chemicalComp: { C: '≤ 0.35%', Mn: '0.60 - 1.05%', P: '≤ 0.035%', S: '≤ 0.040%', Si: '0.10 - 0.35%', CE: '≤ 0.47' },
    mechanicalProps: { tensile: '≥ 485 MPa (70 ksi)', yield: '≥ 250 MPa (36 ksi)', elongation: '≥ 22%', hardness: '137 - 187 HBW' },
    thermalLimits: '-29°C to 425°C (-20°F to 800°F)',
    corrosionNotes: 'Requires protective coatings (black oxide, zinc plating, rust preventive varnish) for atmospheric exposure. Complies with NACE MR0175 with hardness control.',
    equivalents: { uns: 'UNS K03504', en: '1.0460 (C22.8 / P250GH)', jis: 'SF 490A', bs: '1503-161-430' },
    applications: ['General refinery piping', 'High-pressure steam distribution', 'Hydrocarbon transmission headers', 'Power generation balance of plant'],
  },
  'a350-lf2': {
    slug: 'a350-lf2',
    designation: 'ASTM A350 Grade LF2 Class 1 Carbon Steel',
    materialSlug: 'carbon-steel',
    standard: 'ASTM A350 / ASME SA350',
    family: 'Low-Temperature Toughness Carbon Steel',
    overview: 'Normalized carbon steel forging specification specifically tested for notch toughness at low temperatures down to -46°C (-50°F), mandatory for sub-zero Arctic and cryogenic gas service.',
    chemicalComp: { C: '≤ 0.30%', Mn: '0.60 - 1.35%', P: '≤ 0.035%', S: '≤ 0.040%', Si: '0.15 - 0.30%', CE: '≤ 0.45' },
    mechanicalProps: { tensile: '485 - 655 MPa (70 - 95 ksi)', yield: '≥ 250 MPa (36 ksi)', elongation: '≥ 22%', charpy: '≥ 20 J at -46°C (-50°F)' },
    thermalLimits: '-46°C to 345°C (-50°F to 650°F)',
    corrosionNotes: 'Heat treated by normalization and tempering to achieve fine-grained microstructure with exceptional Charpy V-notch impact absorption.',
    equivalents: { uns: 'UNS K03011', en: '1.0566 (TStE 355 / P355NL1)', din: 'TTSt35N' },
    applications: ['LNG receiving terminals', 'Refrigeration gas compressor lines', 'Offshore Arctic oil platforms', 'Liquefied propane storage'],
  },
  'a193-b7': {
    slug: 'a193-b7',
    designation: 'ASTM A193 Grade B7 Alloy Steel Stud Bolts',
    materialSlug: 'carbon-steel',
    standard: 'ASTM A193 / ASME SA193',
    family: 'Heat-Treated Chromium-Molybdenum Fastener Steel',
    overview: 'Quenched and tempered chromium-molybdenum alloy steel fastener specification (AISI 4140) engineered for high pressure vessels, valves, and flange bolting.',
    chemicalComp: { Cr: '0.80 - 1.10%', Mo: '0.15 - 0.25%', C: '0.37 - 0.49%', Mn: '0.65 - 1.10%', Si: '0.15 - 0.35%' },
    mechanicalProps: { tensile: '≥ 860 MPa (125 ksi)', yield: '≥ 720 MPa (105 ksi)', elongation: '≥ 16%', hardness: '≤ 321 HBW (35 HRC)' },
    thermalLimits: '-29°C to 450°C (-20°F to 840°F)',
    corrosionNotes: 'Commonly paired with ASTM A194 Grade 2H heavy hex nuts. Requires Xylan/PTFE coating for marine atmospheric exposure.',
    equivalents: { uns: 'UNS G41400', en: '1.7225 (42CrMo4)', aisi: 'AISI 4140' },
    applications: ['Pressure vessel main flange studs', 'High-pressure pipeline valves', 'Refinery column manways', 'Power plant steam turbine flanges'],
  },

  // ALLOY STEEL GRADES
  'f11': {
    slug: 'f11',
    designation: 'ASTM A182 Grade F11 Class 2 (1.25Cr - 0.5Mo)',
    materialSlug: 'alloy-steel',
    standard: 'ASTM A182 / ASME SA182 (Piping: ASTM A335 P11)',
    family: 'Low Alloy Chromium-Molybdenum Steel',
    overview: 'Nominal 1.25% Chromium - 0.5% Molybdenum alloy steel designed for elevated temperature creep resistance in steam and hydrogen service up to 590°C.',
    chemicalComp: { Cr: '1.00 - 1.50%', Mo: '0.44 - 0.65%', C: '0.05 - 0.15%', Mn: '0.30 - 0.60%', Si: '0.50 - 1.00%' },
    mechanicalProps: { tensile: '≥ 485 MPa (70 ksi)', yield: '≥ 275 MPa (40 ksi)', elongation: '≥ 20%', hardness: '143 - 207 HBW' },
    thermalLimits: 'Designed for elevated temperature up to 593°C (1100°F)',
    corrosionNotes: 'Superior hydrogen embrittlement and graphitization resistance compared to unalloyed carbon steels in catalytic reformers.',
    equivalents: { uns: 'UNS K11572', en: '1.7335 (13CrMo4-5)', din: '13CrMo44' },
    applications: ['Superheated steam power headers', 'Petroleum hydrocracker piping', 'Boiler downcomers', 'Cogen plant piping'],
  },
  'f22': {
    slug: 'f22',
    designation: 'ASTM A182 Grade F22 Class 3 (2.25Cr - 1.0Mo)',
    materialSlug: 'alloy-steel',
    standard: 'ASTM A182 / ASME SA182 (Piping: ASTM A335 P22)',
    family: '2.25% Chromium - 1.0% Molybdenum Alloy Steel',
    overview: 'Higher alloy content (2.25Cr - 1.0Mo) providing superior creep rupture strength and hydrogen attack resistance at temperatures up to 600°C.',
    chemicalComp: { Cr: '2.00 - 2.50%', Mo: '0.87 - 1.13%', C: '0.05 - 0.15%', Mn: '0.30 - 0.60%', Si: '≤ 0.50%' },
    mechanicalProps: { tensile: '≥ 515 MPa (75 ksi)', yield: '≥ 310 MPa (45 ksi)', elongation: '≥ 20%', hardness: '156 - 207 HBW' },
    thermalLimits: 'Engineered for steam service up to 600°C (1112°F)',
    corrosionNotes: 'Excellent performance in severe Nelson Curve high-temperature high-pressure hydrogen environments.',
    equivalents: { uns: 'UNS K21590', en: '1.7380 (10CrMo9-10)', din: '10CrMo910' },
    applications: ['Ultra-supercritical power plant reheat lines', 'Heavy oil hydroprocessing reactors', 'Syngas generation headers'],
  },
  'f91': {
    slug: 'f91',
    designation: 'ASTM A182 Grade F91 (9Cr - 1Mo - V - Nb)',
    materialSlug: 'alloy-steel',
    standard: 'ASTM A182 / ASME SA182 (Piping: ASTM A335 P91)',
    family: 'Modified 9Cr-1Mo High-Strength Martensitic Steel',
    overview: 'Advanced martensitic creep-strength enhanced ferritic (CSEF) steel micro-alloyed with Vanadium, Niobium, and Nitrogen, permitting thinner pipe wall designs at 600°C+.',
    chemicalComp: { Cr: '8.00 - 9.50%', Mo: '0.85 - 1.05%', V: '0.18 - 0.25%', Nb: '0.06 - 0.10%', N: '0.03 - 0.07%', C: '0.08 - 0.12%' },
    mechanicalProps: { tensile: '≥ 585 MPa (85 ksi)', yield: '≥ 415 MPa (60 ksi)', elongation: '≥ 20%', hardness: '190 - 248 HBW' },
    thermalLimits: 'Supercritical service up to 650°C (1200°F)',
    corrosionNotes: 'Superior thermal conductivity and lower thermal expansion coefficient than austenitic steels, eliminating severe thermal shock stresses.',
    equivalents: { uns: 'UNS K90901', en: '1.4903 (X10CrMoVNb9-1)', din: 'X10CrMoVNb9-1' },
    applications: ['Supercritical thermal power main steam lines', 'HRSG high pressure steam headers', 'Nuclear steam supply systems'],
  },

  // DUPLEX & SUPER DUPLEX GRADES
  's31803': {
    slug: 's31803',
    designation: 'UNS S31803 / S32205 / ASTM A182 F51 / F60 (2205 Duplex)',
    materialSlug: 'duplex-super-duplex',
    standard: 'ASTM A182 / A790 / A240 / A276',
    family: '22% Chromium Standard Duplex Stainless Steel',
    overview: 'Dual-phase 50/50 austenitic-ferritic microstructure delivering twice the design yield strength of 316L, coupled with outstanding resistance to chloride stress corrosion cracking.',
    chemicalComp: { Cr: '22.0 - 23.0%', Ni: '4.5 - 6.5%', Mo: '3.0 - 3.5%', N: '0.14 - 0.20%', C: '≤ 0.030%' },
    mechanicalProps: { tensile: '≥ 655 MPa (95 ksi)', yield: '≥ 450 MPa (65 ksi)', elongation: '≥ 25%', hardness: '≤ 290 HBW (31 HRC)' },
    thermalLimits: '-50°C to 280°C (-58°F to 536°F) to avoid 475°C embrittlement',
    corrosionNotes: 'PREN ≥ 35. Immune to chloride SCC in marine and downhole oilwell environments up to 150°C.',
    equivalents: { uns: 'UNS S31803 / S32205', en: '1.4462 (X2CrNiMoN22-5-3)', afr: 'Z3 CND 22-05 Az' },
    applications: ['Offshore oil & gas separation skids', 'Reverse osmosis desalination manifolds', 'Chemical cargo ship piping', 'Sour gas gathering lines'],
  },
  's32750': {
    slug: 's32750',
    designation: 'UNS S32750 / ASTM A182 F53 (Super Duplex 2507)',
    materialSlug: 'duplex-super-duplex',
    standard: 'ASTM A182 / A790 / A240 / NORSOK M-650',
    family: '25% Chromium High-Alloy Super Duplex Steel',
    overview: 'Highly alloyed super duplex with 25% Cr, 4% Mo, and 0.28% Nitrogen, engineered specifically for highly aggressive offshore chloride and subsea environments requiring PREN ≥ 42.',
    chemicalComp: { Cr: '24.0 - 26.0%', Ni: '6.0 - 8.0%', Mo: '3.0 - 5.0%', N: '0.24 - 0.32%', C: '≤ 0.030%', Cu: '≤ 0.50%' },
    mechanicalProps: { tensile: '750 - 1000 MPa (116 ksi)', yield: '≥ 550 MPa (80 ksi)', elongation: '≥ 15%', hardness: '≤ 310 HBW (32 HRC)' },
    thermalLimits: '-50°C to 250°C (-58°F to 482°F)',
    corrosionNotes: 'Critical Pitting Temperature (CPT) exceeds 50°C in ASTM G48 testing; virtually immune to crevice corrosion in aerated seawater.',
    equivalents: { uns: 'UNS S32750', en: '1.4410 (X2CrNiMoN25-7-4)', brand: 'SAF 2507' },
    applications: ['Subsea umbilicals and manifolds', 'Seawater fire fighting systems', 'Offshore sour gas risers', 'Flue gas cleaning scrubbers'],
  },

  // NICKEL ALLOY GRADES
  'inconel-625': {
    slug: 'inconel-625',
    designation: 'Inconel 625 / UNS N06625 / ASTM B564 / W.Nr. 2.4856',
    materialSlug: 'nickel-alloys',
    standard: 'ASTM B564 / B444 / B443 / B446 / ASME SB564',
    family: 'Nickel-Chromium-Molybdenum-Niobium Superalloy',
    overview: 'Solid-solution matrix strengthened by Molybdenum and Niobium, providing exceptional tensile strength from cryogenic up to 980°C without requiring precipitation hardening.',
    chemicalComp: { Ni: '≥ 58.0%', Cr: '20.0 - 23.0%', Mo: '8.0 - 10.0%', 'Nb+Ta': '3.15 - 4.15%', Fe: '≤ 5.0%', C: '≤ 0.10%' },
    mechanicalProps: { tensile: '≥ 827 MPa (120 ksi)', yield: '≥ 414 MPa (60 ksi)', elongation: '≥ 30%', hardness: '≤ 220 HBW' },
    thermalLimits: 'Cryogenic up to 980°C (1800°F)',
    corrosionNotes: 'Total immunity to chloride-induced stress corrosion cracking. Outstanding resistance to pitting, crevice corrosion, and polythionic acid.',
    equivalents: { uns: 'UNS N06625', en: '2.4856 (NiCr22Mo9Nb)', din: 'W.Nr. 2.4856' },
    applications: ['Subsea production risers and wellheads', 'Nuclear reactor core components', 'Aerospace turbine exhaust ducting', 'Sour gas flare stacks'],
  },
  'monel-400': {
    slug: 'monel-400',
    designation: 'Monel 400 / UNS N04400 / ASTM B564 / W.Nr. 2.4360',
    materialSlug: 'nickel-alloys',
    standard: 'ASTM B564 / B165 / B127 / B164',
    family: 'Nickel-Copper Solid-Solution Binary Alloy (67Ni - 30Cu)',
    overview: 'High-strength nickel-copper alloy with exceptional resistance to rapidly flowing seawater, hydrofluoric acid, sulfuric acid, and concentrated alkaline solutions.',
    chemicalComp: { Ni: '≥ 63.0%', Cu: '28.0 - 34.0%', Fe: '≤ 2.5%', Mn: '≤ 2.0%', C: '≤ 0.30%', Si: '≤ 0.50%' },
    mechanicalProps: { tensile: '≥ 480 MPa (70 ksi)', yield: '≥ 170 MPa (25 ksi)', elongation: '≥ 35%', hardness: '110 - 150 HBW' },
    thermalLimits: 'Sub-zero up to 480°C (900°F)',
    corrosionNotes: 'Remarkable resistance to dry chlorine gas and hydrofluoric acid at all concentrations up to the boiling point under de-aerated conditions.',
    equivalents: { uns: 'UNS N04400', en: '2.4360 (NiCu30Fe)', din: 'W.Nr. 2.4360' },
    applications: ['Hydrofluoric acid (HF) alkylation units', 'Marine propeller shafts and seawater pump impellers', 'Boiler feedwater deaerators', 'Brine heaters'],
  },
  'hastelloy-c276': {
    slug: 'hastelloy-c276',
    designation: 'Hastelloy C-276 / UNS N10276 / ASTM B564 / W.Nr. 2.4819',
    materialSlug: 'nickel-alloys',
    standard: 'ASTM B564 / B622 / B575 / B574',
    family: 'Nickel-Molybdenum-Chromium-Tungsten Superalloy',
    overview: 'Universally recognized as the most versatile corrosion-resistant alloy in existence, providing unmatched resistance to wet chlorine gas, hypochlorite, and ferric chloride.',
    chemicalComp: { Ni: 'Balance (~57%)', Mo: '15.0 - 17.0%', Cr: '14.5 - 16.5%', Fe: '4.0 - 7.0%', W: '3.0 - 4.5%', Co: '≤ 2.5%' },
    mechanicalProps: { tensile: '≥ 690 MPa (100 ksi)', yield: '≥ 283 MPa (41 ksi)', elongation: '≥ 40%', hardness: '≤ 220 HBW' },
    thermalLimits: 'Resists chemical corrosion up to 1040°C in oxidizing atmospheres',
    corrosionNotes: 'One of very few alloys capable of handling wet chlorine gas, hypochlorite solutions, chlorine dioxide, and boiling formic acid.',
    equivalents: { uns: 'UNS N10276', en: '2.4819 (NiMo16Cr15W)', din: 'W.Nr. 2.4819' },
    applications: ['Flue gas desulfurization (FGD) scrubbers', 'Pharmaceutical active ingredient reactors', 'Chlorination bleaching towers', 'Waste incineration piping'],
  },

  // TITANIUM GRADES
  'grade-2': {
    slug: 'grade-2',
    designation: 'Titanium Grade 2 / UNS R50400 (Commercially Pure Ti)',
    materialSlug: 'titanium',
    standard: 'ASTM B381 / B348 / B265 / B861',
    family: 'Unalloyed Commercially Pure Titanium',
    overview: 'The workhorse of industrial titanium, providing moderate strength, high impact toughness, excellent cold formability, and complete resistance to seawater and chlor-alkali brine.',
    chemicalComp: { Ti: 'Balance (≥ 98.9%)', Fe: '≤ 0.30%', O: '≤ 0.25%', C: '≤ 0.08%', N: '≤ 0.03%', H: '≤ 0.015%' },
    mechanicalProps: { tensile: '≥ 345 MPa (50 ksi)', yield: '275 - 450 MPa (40 - 65 ksi)', elongation: '≥ 20%', density: '4.51 g/cm³' },
    thermalLimits: '-250°C to 315°C continuous service',
    corrosionNotes: 'Instantly reforms a self-healing titanium dioxide (TiO2) passive film when scratched in oxidizing and aerated environments.',
    equivalents: { uns: 'UNS R50400', en: '3.7035', din: 'W.Nr. 3.7035', jis: 'Class 2 Titanium' },
    applications: ['Plate and tube seawater heat exchangers', 'Chlor-alkali electrolysis cells', 'Bleaching equipment in paper mills', 'Marine offshore piping'],
  },
  'grade-5': {
    slug: 'grade-5',
    designation: 'Titanium Grade 5 / Ti-6Al-4V / UNS R56400',
    materialSlug: 'titanium',
    standard: 'ASTM B381 / B348 / AMS 4928',
    family: 'Alpha-Beta High-Strength Titanium Alloy',
    overview: 'Alloyed with 6% Aluminum and 4% Vanadium to dramatically increase yield strength to >830 MPa while maintaining excellent corrosion resistance and low density.',
    chemicalComp: { Ti: 'Balance (~90%)', Al: '5.50 - 6.75%', V: '3.50 - 4.50%', Fe: '≤ 0.40%', O: '≤ 0.20%', C: '≤ 0.08%' },
    mechanicalProps: { tensile: '≥ 895 MPa (130 ksi)', yield: '≥ 828 MPa (120 ksi)', elongation: '≥ 10%', hardness: '30 - 36 HRC' },
    thermalLimits: 'Up to 400°C (752°F) high-strength duty',
    corrosionNotes: 'High strength-to-weight ratio (specific strength 200 kN·m/kg), excellent fracture toughness in marine and aerospace environments.',
    equivalents: { uns: 'UNS R56400', en: '3.7165', din: 'W.Nr. 3.7165', ams: 'AMS 4928 / 4967' },
    applications: ['Aerospace airframe and engine hardware', 'Offshore high-pressure drilling risers', 'Subsea pressure housings', 'High-performance turbine blades'],
  },
  'grade-1': {
    slug: 'grade-1',
    designation: 'Titanium Grade 1 / UNS R50250 (CP-4)',
    materialSlug: 'titanium',
    standard: 'ASTM B381 / B348 / B265',
    family: 'Unalloyed High-Ductility Titanium',
    overview: 'The purest grade of unalloyed commercially pure titanium offering the highest ductility and cold formability with complete immunity to chloride environments.',
    chemicalComp: { Ti: '≥ 99.5%', Fe: '≤ 0.20%', O: '≤ 0.18%', C: '≤ 0.08%', N: '≤ 0.03%', H: '≤ 0.015%' },
    mechanicalProps: { tensile: '≥ 240 MPa (35 ksi)', yield: '170 - 310 MPa (25 - 45 ksi)', elongation: '≥ 24%', hardness: '≤ 150 HBW' },
    thermalLimits: '-250°C to 300°C continuous service',
    corrosionNotes: 'Self-repairing oxide film provides complete resistance to wet chlorine, nitric acid, and marine saltwater.',
    equivalents: { uns: 'UNS R50250', en: '3.7025', din: 'W.Nr. 3.7025', jis: 'Class 1 Ti' },
    applications: ['Plate frame heat exchangers', 'Explosive cladding layers', 'Deep-sea sensor housings', 'Desalination piping'],
  },
  'grade-7': {
    slug: 'grade-7',
    designation: 'Titanium Grade 7 / Ti-0.15Pd / UNS R52400',
    materialSlug: 'titanium',
    standard: 'ASTM B381 / B348 / B265',
    family: 'Palladium-Enhanced Corrosion Resistant Titanium',
    overview: 'Commercially pure titanium with 0.12% to 0.25% palladium addition, dramatically improving corrosion resistance in reducing acid environments and crevice conditions.',
    chemicalComp: { Ti: 'Balance (≥ 99.0%)', Pd: '0.12 - 0.25%', Fe: '≤ 0.30%', O: '≤ 0.25%', C: '≤ 0.08%' },
    mechanicalProps: { tensile: '≥ 345 MPa (50 ksi)', yield: '275 - 450 MPa (40 - 65 ksi)', elongation: '≥ 20%', hardness: '≤ 200 HBW' },
    thermalLimits: '-250°C to 350°C continuous service',
    corrosionNotes: 'Eliminates crevice corrosion in hot chloride solutions and resists dilute hydrochloric and sulfuric acids at high temperatures.',
    equivalents: { uns: 'UNS R52400', en: '3.7235', din: 'W.Nr. 3.7235' },
    applications: ['Chemical reactor thermowells', 'Chlor-alkali bleach plants', 'Geothermal brine production', 'Marine scrubbers'],
  },
  'monel-k500': {
    slug: 'monel-k500',
    designation: 'Monel K-500 / UNS N05500 / ASTM B564 / W.Nr. 2.4375',
    materialSlug: 'monel',
    standard: 'ASTM B564 / B865 / QQ-N-286',
    family: 'Age-Hardenable High-Strength Nickel-Copper Alloy',
    overview: 'Precipitation-strengthened nickel-copper alloy combining Monel 400 corrosion resistance with up to three times higher yield and tensile strength.',
    chemicalComp: { Ni: '≥ 63.0%', Cu: '27.0 - 33.0%', Al: '2.30 - 3.15%', Ti: '0.35 - 0.85%', Fe: '≤ 2.0%', C: '≤ 0.18%' },
    mechanicalProps: { tensile: '≥ 965 MPa (140 ksi)', yield: '≥ 690 MPa (100 ksi)', elongation: '≥ 20%', hardness: '28 - 38 HRC' },
    thermalLimits: 'Non-magnetic from -100°C to elevated temperatures',
    corrosionNotes: 'Zero pitting or stress corrosion in marine seawater while maintaining high fatigue and tensile strength.',
    equivalents: { uns: 'UNS N05500', en: '2.4375 (NiCu30Al)', din: 'W.Nr. 2.4375' },
    applications: ['Marine valve stems and pump shafts', 'Oilwell drill collars and instruments', 'High-tensile non-magnetic fasteners', 'Subsea flanges'],
  },
  'inconel-600': {
    slug: 'inconel-600',
    designation: 'Inconel 600 / UNS N06600 / ASTM B564 / W.Nr. 2.4816',
    materialSlug: 'inconel',
    standard: 'ASTM B564 / B166 / B167 / B168',
    family: 'Nickel-Chromium High-Temperature Oxidation Alloy (72Ni-15Cr)',
    overview: 'Standard engineering material for high-temperature and severely corrosive chemical environments, resisting dry chlorine up to 550°C and oxidation up to 1150°C.',
    chemicalComp: { Ni: '≥ 72.0%', Cr: '14.0 - 17.0%', Fe: '6.0 - 10.0%', C: '≤ 0.15%', Mn: '≤ 1.0%', Si: '≤ 0.50%' },
    mechanicalProps: { tensile: '≥ 550 MPa (80 ksi)', yield: '≥ 240 MPa (35 ksi)', elongation: '≥ 30%', hardness: '≤ 180 HBW' },
    thermalLimits: 'Cryogenic up to 1150°C (2100°F) continuous duty',
    corrosionNotes: 'Immune to chloride-ion stress-corrosion cracking; exceptional in high-purity water circuits in nuclear reactors.',
    equivalents: { uns: 'UNS N06600', en: '2.4816 (NiCr15Fe)', din: 'W.Nr. 2.4816' },
    applications: ['Nuclear steam generator tubing', 'Thermal processing furnace retorts', 'Chemical manufacture of vinyl chloride', 'Barium distillation heaters'],
  },
  'inconel-718': {
    slug: 'inconel-718',
    designation: 'Inconel 718 / UNS N07718 / ASTM B564 / W.Nr. 2.4668',
    materialSlug: 'inconel',
    standard: 'ASTM B564 / B637 / AMS 5662 / API 6A718',
    family: 'Precipitation-Hardenable Niobium Superalloy',
    overview: 'Niobium-hardened nickel-chromium superalloy engineered to provide extreme yield strength (>1030 MPa) and creep-rupture properties up to 700°C without post-weld cracking.',
    chemicalComp: { Ni: '50.0 - 55.0%', Cr: '17.0 - 21.0%', Mo: '2.80 - 3.30%', 'Nb+Ta': '4.75 - 5.50%', Ti: '0.65 - 1.15%', Fe: 'Balance' },
    mechanicalProps: { tensile: '≥ 1240 MPa (180 ksi)', yield: '≥ 1030 MPa (150 ksi)', elongation: '≥ 12%', hardness: '36 - 44 HRC' },
    thermalLimits: '-250°C cryogenic up to 700°C (1300°F)',
    corrosionNotes: 'Superior resistance to stress corrosion cracking and hydrogen embrittlement in NACE MR0175 sour gas drilling environments.',
    equivalents: { uns: 'UNS N07718', en: '2.4668 (NiCr19Fe19Nb5Mo3)', din: 'W.Nr. 2.4668' },
    applications: ['High-pressure API 6A subsea wellhead valves', 'Rocket thrust chambers', 'Gas turbine rotor disks and shafts', 'Nuclear fuel element spacers'],
  },
  'hastelloy-c22': {
    slug: 'hastelloy-c22',
    designation: 'Hastelloy C-22 / UNS N06022 / ASTM B564 / W.Nr. 2.4602',
    materialSlug: 'hastelloy',
    standard: 'ASTM B564 / B574 / B575 / B622',
    family: 'Ni-Cr-Mo-W High-Chromium Superalloy',
    overview: 'Enhanced 22% chromium superalloy offering superior resistance to oxidizing acid media (nitric acid, ferric ions) and wet chlorine compared to alloy C-276.',
    chemicalComp: { Ni: 'Balance (~56%)', Cr: '20.0 - 22.5%', Mo: '12.5 - 14.5%', Fe: '2.0 - 6.0%', W: '2.5 - 3.5%', Co: '≤ 2.5%' },
    mechanicalProps: { tensile: '≥ 690 MPa (100 ksi)', yield: '≥ 310 MPa (45 ksi)', elongation: '≥ 45%', hardness: '≤ 210 HBW' },
    thermalLimits: 'Cryogenic up to 675°C (1250°F) in chemical service',
    corrosionNotes: 'PREN ≥ 45. Provides the best overall resistance in multi-component chemical streams containing mixed acids.',
    equivalents: { uns: 'UNS N06022', en: '2.4602 (NiCr21Mo14W)', din: 'W.Nr. 2.4602' },
    applications: ['Pharmaceutical clean-in-place reactors', 'Waste incineration wet scrubbers', 'Chlorination piping', 'Flue gas desulfurization headers'],
  },
  'hastelloy-b2': {
    slug: 'hastelloy-b2',
    designation: 'Hastelloy B-2 / UNS N10665 / ASTM B564 / W.Nr. 2.4617',
    materialSlug: 'hastelloy',
    standard: 'ASTM B564 / B333 / B335 / B622',
    family: 'Nickel-Molybdenum Hydrochloric Acid Specialist',
    overview: 'Solid-solution alloyed with 28% molybdenum providing unmatched resistance to pure hydrochloric, sulfuric, and phosphoric acids across all concentrations and boiling temperatures.',
    chemicalComp: { Ni: 'Balance (~68%)', Mo: '26.0 - 30.0%', Fe: '≤ 2.0%', Cr: '≤ 1.0%', Co: '≤ 1.0%', C: '≤ 0.02%' },
    mechanicalProps: { tensile: '≥ 760 MPa (110 ksi)', yield: '≥ 350 MPa (51 ksi)', elongation: '≥ 40%', hardness: '≤ 230 HBW' },
    thermalLimits: 'Optimal up to 815°C in non-oxidizing reducing atmospheres',
    corrosionNotes: 'Extraordinary resistance to pure reducing acids; must not be used in presence of ferric or cupric oxidizing contaminants.',
    equivalents: { uns: 'UNS N10665', en: '2.4617 (NiMo28)', din: 'W.Nr. 2.4617' },
    applications: ['Hydrochloric acid alkylation and synthesis', 'Acetic acid catalytic synthesis', 'Styrene production distillation towers'],
  },
  'c70600': {
    slug: 'c70600',
    designation: 'Cupro Nickel 90/10 / UNS C70600 / DIN 86037',
    materialSlug: 'copper',
    standard: 'ASTM B151 / B466 / ASME SB466 / EEMUA 145',
    family: 'Copper-Nickel 90/10 Marine Alloy',
    overview: 'High-performance copper-nickel alloy containing 10% nickel and 1.5% iron providing exceptional resistance to seawater impingement, micro-fouling, and stress corrosion.',
    chemicalComp: { Cu: 'Balance (≥ 86.5%)', Ni: '9.0 - 11.0%', Fe: '1.0 - 1.8%', Mn: '≤ 1.0%', Zn: '≤ 0.50%', Pb: '≤ 0.05%' },
    mechanicalProps: { tensile: '≥ 290 MPa (42 ksi)', yield: '≥ 105 MPa (15 ksi)', elongation: '≥ 30%', hardness: '75 - 110 HBW' },
    thermalLimits: '-270°C up to 300°C continuous seawater cooling',
    corrosionNotes: 'Forms a thin adherent copper oxide film that repels barnacles, algae, and marine micro-organisms naturally without biocide dosing.',
    equivalents: { uns: 'UNS C70600', en: 'CW352H (CuNi10Fe1Mn)', din: '2.0872', bs: 'CN102' },
    applications: ['Naval seawater cooling systems', 'Offshore platform firewater mains', 'Desalination brine heaters', 'Marine condenser tube sheets'],
  },
  'c71500': {
    slug: 'c71500',
    designation: 'Cupro Nickel 70/30 / UNS C71500 / EEMUA 145',
    materialSlug: 'copper',
    standard: 'ASTM B151 / B466 / ASME SB466 / DIN 86037',
    family: 'Copper-Nickel 70/30 High-Velocity Marine Alloy',
    overview: 'Alloyed with 30% nickel to withstand higher seawater flow velocities (up to 4.5 m/s) with enhanced resistance to erosion, pitting, and sulfide contamination.',
    chemicalComp: { Cu: 'Balance (≥ 65.0%)', Ni: '29.0 - 33.0%', Fe: '0.4 - 1.0%', Mn: '≤ 1.0%', Zn: '≤ 0.50%' },
    mechanicalProps: { tensile: '≥ 380 MPa (55 ksi)', yield: '≥ 140 MPa (20 ksi)', elongation: '≥ 30%', hardness: '90 - 130 HBW' },
    thermalLimits: '-270°C up to 350°C continuous marine service',
    corrosionNotes: 'Higher velocity threshold than 90/10; outstanding resistance to marine atmospheric corrosion and stress corrosion cracking.',
    equivalents: { uns: 'UNS C71500', en: 'CW354H (CuNi30Mn1Fe)', din: '2.0882', bs: 'CN107' },
    applications: ['Submarine seawater intake piping', 'High-pressure naval heat exchangers', 'Offshore splash zone claddings', 'Power station cooling water circuits'],
  },
  'c11000': {
    slug: 'c11000',
    designation: 'Electrolytic Tough Pitch (ETP) Copper / UNS C11000',
    materialSlug: 'copper',
    standard: 'ASTM B152 / B187 / ASTM B124',
    family: 'Commercially Pure Electrolytic Copper (99.9% Cu)',
    overview: 'High-purity electrolytic tough pitch copper featuring maximum electrical (100% IACS) and thermal conductivity (388 W/m·K) for power and heat dissipation.',
    chemicalComp: { Cu: '≥ 99.90%', O: '0.02 - 0.04%', Pb: '≤ 0.005%', Bi: '≤ 0.001%' },
    mechanicalProps: { tensile: '≥ 220 MPa (32 ksi)', yield: '≥ 70 MPa (10 ksi)', elongation: '≥ 35%', electricalConductivity: '100% IACS' },
    thermalLimits: 'Up to 200°C continuous service',
    corrosionNotes: 'Excellent resistance to industrial, urban, and marine atmospheres; not susceptible to hydrogen embrittlement below 370°C.',
    equivalents: { uns: 'UNS C11000', en: 'CW004A (Cu-ETP)', din: '2.0060', jis: 'C1100' },
    applications: ['High-current electrical busbar connections', 'Cryogenic liquefaction heat exchangers', 'Industrial distillation kettles', 'Architectural flashing'],
  },
  'naval-brass': {
    slug: 'naval-brass',
    designation: 'Naval Brass / UNS C46400 / ASTM B124 / ASTM B21',
    materialSlug: 'copper',
    standard: 'ASTM B124 / B21 / ASME SB21',
    family: 'Tin-Inhibited Alpha-Beta Marine Brass (60Cu-39Zn-1Sn)',
    overview: 'Engineered with 1% tin addition to suppress dezincification in marine environments, providing high tensile strength and rigidity for marine structural flanges.',
    chemicalComp: { Cu: '59.0 - 62.0%', Sn: '0.50 - 1.00%', Zn: 'Balance (~39%)', Fe: '≤ 0.10%', Pb: '≤ 0.20%' },
    mechanicalProps: { tensile: '≥ 415 MPa (60 ksi)', yield: '≥ 170 MPa (25 ksi)', elongation: '≥ 30%', hardness: '120 - 160 HBW' },
    thermalLimits: 'Sub-zero up to 250°C marine applications',
    corrosionNotes: 'Tin addition inhibits dezincification in stagnant and aerated seawater; superior machinability rating.',
    equivalents: { uns: 'UNS C46400', en: 'CW712R (CuZn36Sn1Pb)', din: '2.0532', bs: 'CZ112' },
    applications: ['Marine propeller shaft bearings', 'Marine condenser tube plates and flanges', 'Naval ordnance hardware', 'Seawater pump impellers'],
  },
  'f5': {
    slug: 'f5',
    designation: 'ASTM A182 F5 / 5% Cr - 0.5% Mo Low Alloy Steel',
    materialSlug: 'alloy-steel',
    standard: 'ASTM A182 / ASME SA182',
    family: 'Intermediate Chrome-Moly Creep Resistant Steel',
    overview: '5Cr-0.5Mo forged alloy steel engineered for elevated temperature hydrogen and sulfur resistance in oil refining cracking furnaces.',
    chemicalComp: { Cr: '4.00 - 6.00%', Mo: '0.44 - 0.65%', C: '≤ 0.15%', Mn: '0.30 - 0.60%', Si: '≤ 0.50%' },
    mechanicalProps: { tensile: '≥ 485 MPa (70 ksi)', yield: '≥ 275 MPa (40 ksi)', elongation: '≥ 20%', hardness: '143 - 217 HBW' },
    thermalLimits: 'Continuous elevated temperature service up to 600°C',
    corrosionNotes: 'Resists hydrogen attack and sulfur corrosion under high-temperature catalytic reforming conditions.',
    equivalents: { uns: 'UNS K41545', en: '1.7362 (12CrMo19-5)', din: 'W.Nr. 1.7362' },
    applications: ['Hydrotreater headers and flanges', 'Thermal cracking furnace tubes', 'Refinery distillation towers', 'High-pressure steam lines'],
  },
  'f9': {
    slug: 'f9',
    designation: 'ASTM A182 F9 / 9% Cr - 1% Mo Low Alloy Steel',
    materialSlug: 'alloy-steel',
    standard: 'ASTM A182 / ASME SA182',
    family: 'High Chromium Creep-Resistant Alloy Steel',
    overview: '9Cr-1Mo forged alloy steel offering enhanced oxidation resistance and high-temperature creep strength up to 650°C.',
    chemicalComp: { Cr: '8.00 - 10.00%', Mo: '0.90 - 1.10%', C: '≤ 0.15%', Mn: '0.30 - 0.60%', Si: '0.50 - 1.00%' },
    mechanicalProps: { tensile: '≥ 585 MPa (85 ksi)', yield: '≥ 380 MPa (55 ksi)', elongation: '≥ 20%', hardness: '179 - 217 HBW' },
    thermalLimits: 'Elevated temperature service up to 650°C (1200°F)',
    corrosionNotes: 'Superior scale resistance in steam and flue gas atmospheres with high sulfur dioxide content.',
    equivalents: { uns: 'UNS K90941', en: '1.7386 (X11CrMo9-1)', din: 'W.Nr. 1.7386' },
    applications: ['Superheater and reheater headers', 'Petrochemical cracker coil flanges', 'Thermal power plant steam lines'],
  },
  'a694-f60': {
    slug: 'a694-f60',
    designation: 'ASTM A694 F60 High-Yield Pipeline Forging',
    materialSlug: 'carbon-steel',
    standard: 'ASTM A694 / ASME SA694',
    family: 'Microalloyed High-Yield Carbon Transmission Steel',
    overview: 'Normalized and tempered microalloyed carbon-manganese steel developed for high-pressure cross-country hydrocarbon transmission pipelines.',
    chemicalComp: { C: '≤ 0.26%', Mn: '≤ 1.40%', P: '≤ 0.025%', S: '≤ 0.025%', Si: '0.15 - 0.35%' },
    mechanicalProps: { tensile: '≥ 515 MPa (75 ksi)', yield: '≥ 415 MPa (60 ksi)', elongation: '≥ 20%', impactToughness: '≥ 40J @ -20°C' },
    thermalLimits: '-29°C to 150°C pipeline service',
    corrosionNotes: 'HIC and SSCC resistant per NACE MR0175 for sour gas hydrocarbon transport.',
    equivalents: { standard: 'MSS SP-44 Class 60', api: 'API 5L X60 Flange' },
    applications: ['Cross-country natural gas transmission', 'Offshore crude oil export pipelines', 'Compressor station manifolds'],
  },
  'a694-f65': {
    slug: 'a694-f65',
    designation: 'ASTM A694 F65 High-Yield Pipeline Forging',
    materialSlug: 'carbon-steel',
    standard: 'ASTM A694 / ASME SA694',
    family: 'High-Yield Heavy-Section Pipeline Steel',
    overview: 'Microalloyed high-tensile forging with 65 ksi minimum yield strength, designed for severe high-pressure oil and gas trunklines.',
    chemicalComp: { C: '≤ 0.26%', Mn: '≤ 1.45%', P: '≤ 0.025%', S: '≤ 0.025%', Si: '0.15 - 0.35%' },
    mechanicalProps: { tensile: '≥ 530 MPa (77 ksi)', yield: '≥ 450 MPa (65 ksi)', elongation: '≥ 20%', impactToughness: '≥ 45J @ -20°C' },
    thermalLimits: '-29°C to 150°C pipeline service',
    corrosionNotes: 'Compliant with NACE MR0175 / ISO 15156 for severe sour crude transmission.',
    equivalents: { standard: 'MSS SP-44 Class 65', api: 'API 5L X65 Flange' },
    applications: ['Deepwater pipeline tie-ins', 'High-pressure gas grid headers', 'Mainline isolation valve manifolds'],
  },
};

// ============================================================================
// 5. HELPER RETRIEVAL FUNCTIONS
// ============================================================================

export const getMaterialBySlug = (slug) => {
  if (!slug) return null;
  const s = slug.toLowerCase();
  return MATERIALS.find((m) => m.slug === s || (m.aliases && m.aliases.includes(s)));
};

export const getProductTaxonomyBySlug = (slug) => {
  if (!slug) return null;
  const s = slug.toLowerCase();
  return PRODUCT_TAXONOMY.find((p) => p.slug === s || (p.aliases && p.aliases.includes(s)));
};

export const getGradeBySlug = (gradeSlug) => {
  if (!gradeSlug) return null;
  const s = gradeSlug.toLowerCase();
  if (GRADES_DB[s]) return GRADES_DB[s];
  if (s === 'f51' || s === 'f60') return GRADES_DB['s31803'];
  if (s === 'f53' || s === 'f55') return GRADES_DB['s32750'];
  return GRADES_DB[s] || null;
};

export const getFlangeTypeBySlug = (typeSlug) => {
  return FLANGE_TYPES.find((t) => t.slug === typeSlug);
};

export const getFastenerTypeBySlug = (typeSlug) => {
  return FASTENER_TYPES.find((t) => t.slug === typeSlug);
};

export const getForgedFittingTypeBySlug = (typeSlug, materialSlug) => {
  if (!typeSlug) return null;
  const s = typeSlug.toLowerCase();
  const found = FORGED_FITTING_TYPES.find(
    (t) => t.slug === s || (t.aliases && t.aliases.includes(s))
  );
  if (!found) return null;
  return {
    ...found,
    image: getForgingImageForMaterial(materialSlug, found.slug) || found.image,
  };
};

export const getTypesForProduct = (productSlug, materialSlug) => {
  if (productSlug === 'flanges') return FLANGE_TYPES;
  if (productSlug === 'fasteners') return FASTENER_TYPES;
  if (productSlug === 'forged-fittings' || productSlug === 'forging') {
    return FORGED_FITTING_TYPES.map((type) => ({
      ...type,
      image: getForgingImageForMaterial(materialSlug, type.slug) || type.image,
    }));
  }
  return [];
};

export const getGradesForMaterial = (materialSlug) => {
  if (!materialSlug) return [];
  const s = materialSlug.toLowerCase();
  if (s === 'monel') {
    return Object.values(GRADES_DB).filter(
      (g) => g.slug.includes('monel') || (g.designation && g.designation.toLowerCase().includes('monel'))
    );
  }
  if (s === 'inconel' || s === 'inconel-alloys') {
    return Object.values(GRADES_DB).filter(
      (g) => g.slug.includes('inconel') || (g.designation && g.designation.toLowerCase().includes('inconel'))
    );
  }
  if (s === 'hastelloy' || s === 'hastelloy-alloys') {
    return Object.values(GRADES_DB).filter(
      (g) => g.slug.includes('hastelloy') || (g.designation && g.designation.toLowerCase().includes('hastelloy'))
    );
  }
  if (s === 'titanium') {
    return Object.values(GRADES_DB).filter(
      (g) => g.materialSlug === 'titanium' || g.slug.includes('grade-')
    );
  }
  if (s === 'nickel-alloy' || s === 'nickel-alloys') {
    return Object.values(GRADES_DB).filter((g) => g.materialSlug === 'nickel-alloys' || g.materialSlug === 'nickel-alloy');
  }
  if (s === 'copper' || s === 'copper-alloys') {
    return Object.values(GRADES_DB).filter((g) => g.materialSlug === 'copper-alloys' || g.materialSlug === 'copper');
  }
  return Object.values(GRADES_DB).filter((g) => g.materialSlug === s);
};

/**
 * Returns complete composite product context
 */
export const getCompositeProduct = (materialSlug, productSlug) => {
  const material = getMaterialBySlug(materialSlug) || MATERIALS[0];
  const taxonomy = getProductTaxonomyBySlug(productSlug) || PRODUCT_TAXONOMY[0];
  const grades = getGradesForMaterial(material.slug);
  const types = getTypesForProduct(taxonomy.slug, material.slug);

  // Derive relevant hero image
  let heroImage = '';
  if (taxonomy.slug === 'flanges') {
    heroImage = resolveCatalogueAsset('our product images/flanges.png') || resolveCatalogueAsset('Product Section/Manufacturer division/Flanges/stainless steel.avif');
  } else if (taxonomy.slug === 'fasteners') {
    heroImage = resolveCatalogueAsset('our product images/fasteners.png') || resolveCatalogueAsset('Product Section/Manufacturer division/Fasteners/stainless-steel.webp');
  } else if (taxonomy.slug === 'forging' || taxonomy.slug === 'forged-fittings') {
    heroImage = getForgingImageForMaterial(material.slug, 'elbow') || resolveCatalogueAsset('our product images/forged fittings.png') || resolveCatalogueAsset('Product Section/Manufacturer division/Forged Fittings/stainles steel.jpg');
  } else if (taxonomy.slug === 'butt-weld-fittings') {
    heroImage = resolveCatalogueAsset('our product images/butt weld fittings.png');
  } else if (taxonomy.slug === 'pipes-tubes') {
    heroImage = resolveCatalogueAsset('our product images/pipes and tubes.png');
  } else if (taxonomy.slug === 'sheets-plates') {
    heroImage = resolveCatalogueAsset('our product images/sheet and plates.png');
  } else if (taxonomy.slug === 'rods-bars') {
    heroImage = resolveCatalogueAsset('our product images/rods and bars.png');
  } else {
    heroImage = resolveCatalogueAsset(`Product Section/Manufacturer division/${taxonomy.name}/stainless steel.jpg`) ||
                resolveCatalogueAsset(`Product Section/Supplier division/${taxonomy.name}/stainless steel.png`);
  }

  const isForging = taxonomy.slug === 'forging' || taxonomy.slug === 'forged-fittings';

  return {
    material,
    taxonomy,
    grades,
    types,
    heroImage,
    fullName: `${material.name} ${taxonomy.displayName || taxonomy.name}`,
    title: `${material.name} ${taxonomy.displayName || taxonomy.name}`,
    standards: `${taxonomy.name === 'Flanges' ? 'ASME B16.5, ASME B16.47, DIN EN 1092-1, MSS SP-44' : taxonomy.name === 'Fasteners' ? 'ASTM A193, ASTM A194, ASME B18.2.1, ISO 4014' : isForging ? 'ASME B16.11, BS 3799, MSS SP-79/83/95, ASTM A182 / B564 / A105' : 'ASTM / ASME Standards, EN 10204 3.1 Certified'}`,
  };
};
