/**
 * NIRMEX METAL INDUSTRIES - Industries We Serve Data
 * Concise, authentic sector data matching the minimal red flip card design
 */

import aerospaceImg from '@/assets/Serving Global Mission-Critical Sectors/aerospace and defence.png';
import heavyEngineeringImg from '@/assets/Serving Global Mission-Critical Sectors/heavt engineering.png';
import marineImg from '@/assets/Serving Global Mission-Critical Sectors/marine.png';
import nuclearPowerImg from '@/assets/Serving Global Mission-Critical Sectors/nuclear and thermal power.png';
import petrochemicalImg from '@/assets/Serving Global Mission-Critical Sectors/petrochemical.png';
import precisionPipingImg from '@/assets/Serving Global Mission-Critical Sectors/precision industrial piping.png';

export const INDUSTRIES_SERVED = [
  {
    id: 'aerospace-defence',
    number: '01',
    sectorLabel: 'SECTOR 01',
    title: 'Aerospace & Defence',
    image: aerospaceImg,
    altText: 'Aerospace and defence precision metal components and structural engineering',
    description:
      'High-integrity forged components, precision flanges, and exotic fasteners engineered for mission-critical aircraft and military defense systems.',
    applications: [
      'Jet engine assemblies & exhaust manifolds',
      'High-altitude structural airframe connections',
      'Naval defense & military hardware systems',
    ],
    ctaText: 'Explore Industry',
    href: '#contact',
  },
  {
    id: 'heavy-engineering',
    number: '02',
    sectorLabel: 'SECTOR 02',
    title: 'Heavy Engineering',
    image: heavyEngineeringImg,
    altText: 'Heavy engineering industrial machinery and structural high-yield metal components',
    description:
      'Heavy-duty metal components and structural connections manufactured to endure extreme dynamic loads, vibrations, and severe operational stresses.',
    applications: [
      'Mining machinery & earthmoving structures',
      'Heavy-duty industrial hydraulic presses',
      'Structural crane & heavy lifting assemblies',
    ],
    ctaText: 'Explore Industry',
    href: '#contact',
  },
  {
    id: 'marine-offshore',
    number: '03',
    sectorLabel: 'SECTOR 03',
    title: 'Marine & Offshore',
    image: marineImg,
    altText: 'Offshore oil drilling platform and marine-grade corrosion-resistant piping',
    description:
      'Corrosion-resistant marine piping solutions specifically developed for seawater cooling systems, subsea manifolds, and offshore platforms.',
    applications: [
      'Offshore drilling platform topside piping',
      'Subsea manifolds & deep-sea flowlines',
      'Ship hull seawater ballast & cooling loops',
    ],
    ctaText: 'Explore Industry',
    href: '#contact',
  },
  {
    id: 'nuclear-thermal-power',
    number: '04',
    sectorLabel: 'SECTOR 04',
    title: 'Nuclear & Thermal Power',
    image: nuclearPowerImg,
    altText: 'Nuclear reactor cooling towers and thermal power plant steam generation piping',
    description:
      'Certified high-temperature and high-pressure components with complete heat traceability for nuclear reactors and steam turbine generators.',
    applications: [
      'Primary reactor coolant loop connections',
      'Superheated steam boiler headers & lines',
      'Turbine bypass manifolds & heat exchangers',
    ],
    ctaText: 'Explore Industry',
    href: '#contact',
  },
  {
    id: 'petrochemical-refineries',
    number: '05',
    sectorLabel: 'SECTOR 05',
    title: 'Petrochemicals & Refineries',
    image: petrochemicalImg,
    altText: 'Oil refinery distillation columns and petrochemical process piping network',
    description:
      'Severe-service piping components designed for volatile hydrocarbon conveyance, extreme operating temperatures, and acidic sour gas environments.',
    applications: [
      'Catalytic cracking units & crude distillation',
      'High-pressure pipeline distribution manifolds',
      'Flare headers & acidic sour gas flowlines',
    ],
    ctaText: 'Explore Industry',
    href: '#contact',
  },
  {
    id: 'precision-industrial-piping',
    number: '06',
    sectorLabel: 'SECTOR 06',
    title: 'Precision Industrial Piping',
    image: precisionPipingImg,
    altText: 'High-purity chemical processing piping skid and sanitary stainless steel tubes',
    description:
      'High-purity and close-tolerance fluid handling systems for chemical processing plants, specialized manufacturing, and clean process lines.',
    applications: [
      'Chemical metering & blending skid modules',
      'High-purity industrial gas distribution',
      'Sanitary process & fluid conveyance piping',
    ],
    ctaText: 'Explore Industry',
    href: '#contact',
  },
];
