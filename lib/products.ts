import type {
  Product,
  MaterialOption,
  FinishOption,
  BaseOption,
  ColorOption,
  MaterialId,
  FinishId,
  BaseId,
} from './types';

export const MATERIALS: Record<MaterialId, MaterialOption> = {
  oak: {
    id: 'oak',
    name: 'Oak',
    description: 'European oak with a pronounced, open grain and warm undertone.',
    swatch: 'hsl(196, 39%, 60%)',
    priceMultiplier: 1.0,
  },
  walnut: {
    id: 'walnut',
    name: 'Walnut',
    description: 'American black walnut — dense, rich, and deepening with age.',
    swatch: 'hsl(110, 36%, 32%)',
    priceMultiplier: 1.18,
  },
  ash: {
    id: 'ash',
    name: 'Ash',
    description: 'Pale, straight-grained ash with a quiet, luminous quality.',
    swatch: 'hsl(222, 28%, 80%)',
    priceMultiplier: 0.95,
  },
  marble: {
    id: 'marble',
    name: 'Marble',
    description: 'Carrara marble, honed by hand. Cool to the touch, quietly veined.',
    swatch: 'hsl(224, 12%, 85%)',
    priceMultiplier: 1.32,
  },
  metal: {
    id: 'metal',
    name: 'Brushed Metal',
    description: 'Powder-coated steel with a brushed, architectural finish.',
    swatch: 'hsl(168, 2%, 67%)',
    priceMultiplier: 1.08,
  },
  leather: {
    id: 'leather',
    name: 'Aniline Leather',
    description: 'Full-grain aniline leather, tanned and finished in Tuscany.',
    swatch: 'hsl(86, 29%, 26%)',
    priceMultiplier: 1.24,
  },
  linen: {
    id: 'linen',
    name: 'Belgian Linen',
    description: 'Washed Belgian linen with a soft, matte hand and natural slub.',
    swatch: 'hsl(206, 24%, 75%)',
    priceMultiplier: 1.12,
  },
};

export const FINISHES: Record<FinishId, FinishOption> = {
  natural: {
    id: 'natural',
    name: 'Natural',
    description: 'Hand-rubbed oil that lets the raw material speak.',
    sheen: 'matte',
    priceAdjustment: 0,
  },
  matte: {
    id: 'matte',
    name: 'Matte',
    description: 'A flat, non-reflective lacquer for a modern, quiet surface.',
    sheen: 'matte',
    priceAdjustment: 45,
  },
  satin: {
    id: 'satin',
    name: 'Satin',
    description: 'A soft sheen that catches light without glare.',
    sheen: 'satin',
    priceAdjustment: 90,
  },
  dark: {
    id: 'dark',
    name: 'Dark Stain',
    description: 'A deep, even stain that reads almost black in low light.',
    sheen: 'matte',
    priceAdjustment: 120,
  },
  polished: {
    id: 'polished',
    name: 'Polished',
    description: 'A high-gloss finish reserved for marble and metal.',
    sheen: 'gloss',
    priceAdjustment: 160,
  },
};

export const BASES: Record<BaseId, BaseOption> = {
  'solid-wood': {
    id: 'solid-wood',
    name: 'Solid Wood',
    description: 'Four turned legs in matching timber.',
    priceAdjustment: 0,
  },
  sled: {
    id: 'sled',
    name: 'Sled Base',
    description: 'Continuous steel sled — minimal and structural.',
    priceAdjustment: 110,
  },
  trestle: {
    id: 'trestle',
    name: 'Trestle',
    description: 'Inverted trestle in solid oak, architectural in scale.',
    priceAdjustment: 180,
  },
  pedestal: {
    id: 'pedestal',
    name: 'Pedestal',
    description: 'A single turned pedestal — the table floats.',
    priceAdjustment: 240,
  },
  upholstered: {
    id: 'upholstered',
    name: 'Upholstered',
    description: 'A fully upholstered plinth in your chosen textile.',
    priceAdjustment: 210,
  },
};

export const COLORS: ColorOption[] = [
  { id: 'sand', name: 'Sand', value: 'hsl(206, 24%, 75%)' },
  { id: 'clay', name: 'Clay', value: 'hsl(176, 20%, 47%)' },
  { id: 'moss', name: 'Moss', value: 'hsl(122, 15%, 44%)' },
  { id: 'ink', name: 'Ink', value: 'hsl(42, 11%, 15%)' },
  { id: 'rust', name: 'Rust', value: 'hsl(150, 40%, 42%)' },
  { id: 'fog', name: 'Fog', value: 'hsl(212, 11%, 81%)' },
  { id: 'bone', name: 'Bone', value: 'hsl(232, 22%, 88%)' },
  { id: 'charcoal', name: 'Charcoal', value: 'hsl(48, 9%, 17%)' },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'form-chair',
    name: 'FORM Chair',
    category: 'seating',
    tagline: 'A quiet study in proportion.',
    description:
      'A single-shell chair built around a continuous curve of solid timber. Designed for the dining table, the desk, and the long conversation that follows.',
    longDescription:
      'The FORM Chair began as an exercise in drawing a single, uninterrupted line. The result is a shell that cradles the body without insisting on it — a chair that disappears when you sit, and reappears when you stand. Every joint is hand-finished in our Copenhagen workshop.',
    basePrice: 890,
    dimensions: {
      width: { min: 42, max: 56, step: 1, pricePerCm: 12, default: 48 },
      depth: { min: 48, max: 62, step: 1, pricePerCm: 10, default: 54 },
      height: { min: 74, max: 86, step: 1, pricePerCm: 14, default: 80 },
    },
    baseDimensions: { width: 48, depth: 54, height: 80 },
    availableMaterials: ['oak', 'walnut', 'ash', 'leather'],
    availableFinishes: ['natural', 'matte', 'satin', 'dark'],
    availableColors: COLORS.filter((c) => ['sand', 'clay', 'moss', 'ink', 'fog', 'bone'].includes(c.id)),
    availableBases: ['solid-wood', 'sled'],
    silhouette: 'chair',
    leadTime: '8–10 weeks',
  },
  {
    slug: 'form-lounge',
    name: 'FORM Lounge',
    category: 'lounges',
    tagline: 'Built for the long evening.',
    description:
      'A low lounge chair with a deep, reclined seat and an upholstered cradle. The frame is exposed where it matters and hidden where it does not.',
    longDescription:
      'The FORM Lounge is engineered around a single reclined angle — 14 degrees — that we arrived at after two years of prototyping. The seat is suspended on hand-tied springs; the back is wrapped in a feather-and-down blend. It is a chair made for one posture: the one you fall into at the end of the day.',
    basePrice: 1840,
    dimensions: {
      width: { min: 70, max: 92, step: 1, pricePerCm: 18, default: 82 },
      depth: { min: 80, max: 104, step: 1, pricePerCm: 20, default: 92 },
      height: { min: 66, max: 82, step: 1, pricePerCm: 16, default: 74 },
    },
    baseDimensions: { width: 82, depth: 92, height: 74 },
    availableMaterials: ['oak', 'walnut', 'leather', 'linen'],
    availableFinishes: ['natural', 'matte', 'satin', 'dark'],
    availableColors: COLORS,
    availableBases: ['solid-wood', 'sled', 'upholstered'],
    silhouette: 'lounge',
    leadTime: '10–12 weeks',
  },
  {
    slug: 'form-table',
    name: 'FORM Table',
    category: 'tables',
    tagline: 'A plane, held still.',
    description:
      'A dining table built around a single slab of timber or stone, supported by a base you choose. Designed to seat six to ten, depending on length.',
    longDescription:
      'The FORM Table is a single cantilevered plane. The top is joined from book-matched leaves; the base is a choice between a sled, a trestle, and a pedestal. We cut each top to the centimetre, so the table is exactly the length your room asks for.',
    basePrice: 2480,
    dimensions: {
      width: { min: 90, max: 120, step: 1, pricePerCm: 28, default: 100 },
      depth: { min: 80, max: 100, step: 1, pricePerCm: 22, default: 90 },
      height: { min: 72, max: 76, step: 1, pricePerCm: 30, default: 74 },
    },
    baseDimensions: { width: 100, depth: 90, height: 74 },
    availableMaterials: ['oak', 'walnut', 'ash', 'marble'],
    availableFinishes: ['natural', 'matte', 'satin', 'dark', 'polished'],
    availableColors: COLORS.filter((c) => ['sand', 'fog', 'bone', 'charcoal'].includes(c.id)),
    availableBases: ['solid-wood', 'sled', 'trestle', 'pedestal'],
    silhouette: 'table',
    leadTime: '12–14 weeks',
  },
  {
    slug: 'form-sofa',
    name: 'FORM Sofa',
    category: 'seating',
    tagline: 'A room within a room.',
    description:
      'A modular three-seat sofa with a low profile, deep seat, and removable covers. The frame is solid timber; the cushions are a feather-and-down blend.',
    longDescription:
      'The FORM Sofa is built on a solid timber frame, joined with dowels and corner blocks — no screws, no metal. The seat cushions are a 60/40 feather-and-down blend over a high-resilience foam core. Covers are removable and replaceable, so the sofa is a piece you keep, not one you throw away.',
    basePrice: 3960,
    dimensions: {
      width: { min: 200, max: 280, step: 1, pricePerCm: 32, default: 230 },
      depth: { min: 88, max: 110, step: 1, pricePerCm: 26, default: 96 },
      height: { min: 68, max: 84, step: 1, pricePerCm: 24, default: 76 },
    },
    baseDimensions: { width: 230, depth: 96, height: 76 },
    availableMaterials: ['oak', 'walnut', 'linen', 'leather'],
    availableFinishes: ['natural', 'matte', 'satin', 'dark'],
    availableColors: COLORS,
    availableBases: ['solid-wood', 'upholstered'],
    silhouette: 'sofa',
    leadTime: '12–14 weeks',
  },
];

export const CATEGORIES: { id: 'seating' | 'tables' | 'lounges'; label: string; description: string }[] = [
  { id: 'seating', label: 'Seating', description: 'Chairs and sofas for sitting, long and short.' },
  { id: 'tables', label: 'Tables', description: 'Dining and working surfaces, cut to the centimetre.' },
  { id: 'lounges', label: 'Lounges', description: 'Low reclined chairs for the long evening.' },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getDefaultConfiguration(product: Product) {
  return {
    productId: product.slug,
    width: product.dimensions.width.default,
    depth: product.dimensions.depth.default,
    height: product.dimensions.height.default,
    material: product.availableMaterials[0],
    finish: product.availableFinishes[0],
    color: product.availableColors[0].id,
    base: product.availableBases[0],
    quantity: 1,
  };
}
