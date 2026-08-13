import type { Product, Configuration } from './types';
import { MATERIALS, FINISHES, BASES, COLORS } from './products';

export interface PriceBreakdown {
  basePrice: number;
  materialAdjustment: number;
  finishAdjustment: number;
  dimensionAdjustment: number;
  baseAdjustment: number;
  unitPrice: number;
  quantity: number;
  total: number;
}

/**
 * Calculate the price of a single configured unit, then the line total.
 *
 * unitPrice = (basePrice + finishAdj + baseAdj + dimensionAdj) * materialMultiplier
 * total    = unitPrice * quantity
 *
 * Dimension adjustments are additive (per-cm above the product's base dimensions).
 * Material is a multiplier applied last, so premium materials scale the whole build.
 */
export function calculatePrice(
  product: Product,
  config: Configuration
): PriceBreakdown {
  const basePrice = product.basePrice;

  const material = MATERIALS[config.material];
  const materialAdjustment = basePrice * (material.priceMultiplier - 1);

  const finish = FINISHES[config.finish];
  const finishAdjustment = finish.priceAdjustment;

  const base = BASES[config.base];
  const baseAdjustment = base.priceAdjustment;

  const widthDelta = config.width - product.dimensions.width.default;
  const depthDelta = config.depth - product.dimensions.depth.default;
  const heightDelta = config.height - product.dimensions.height.default;
  const dimensionAdjustment =
    widthDelta * product.dimensions.width.pricePerCm +
    depthDelta * product.dimensions.depth.pricePerCm +
    heightDelta * product.dimensions.height.pricePerCm;

  const unitPrice =
    (basePrice + finishAdjustment + baseAdjustment + dimensionAdjustment) *
    material.priceMultiplier;

  const total = unitPrice * config.quantity;

  return {
    basePrice,
    materialAdjustment,
    finishAdjustment,
    dimensionAdjustment,
    baseAdjustment,
    unitPrice,
    quantity: config.quantity,
    total,
  };
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getColorValue(colorId: string): string {
  return COLORS.find((c) => c.id === colorId)?.value ?? COLORS[0].value;
}
