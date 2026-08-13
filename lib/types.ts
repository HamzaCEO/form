export type Category = 'seating' | 'tables' | 'lounges';

export type MaterialId =
  | 'oak'
  | 'walnut'
  | 'ash'
  | 'marble'
  | 'metal'
  | 'leather'
  | 'linen';

export type FinishId = 'natural' | 'matte' | 'satin' | 'dark' | 'polished';

export type BaseId = 'solid-wood' | 'sled' | 'trestle' | 'pedestal' | 'upholstered';

export interface MaterialOption {
  id: MaterialId;
  name: string;
  description: string;
  /** CSS color used in preview + swatch */
  swatch: string;
  /** Price multiplier applied to base price */
  priceMultiplier: number;
}

export interface FinishOption {
  id: FinishId;
  name: string;
  description: string;
  /** Opacity/sheen overlay applied to preview */
  sheen: 'matte' | 'satin' | 'gloss';
  priceAdjustment: number;
}

export interface ColorOption {
  id: string;
  name: string;
  /** CSS color value */
  value: string;
}

export interface BaseOption {
  id: BaseId;
  name: string;
  description: string;
  priceAdjustment: number;
}

export interface DimensionRange {
  min: number;
  max: number;
  step: number;
  /** Price per cm above the base dimension */
  pricePerCm: number;
  default: number;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  longDescription: string;
  basePrice: number;
  /** Which dimensions are configurable */
  dimensions: {
    width: DimensionRange;
    depth: DimensionRange;
    height: DimensionRange;
  };
  /** Default base dimensions shown in listing */
  baseDimensions: { width: number; depth: number; height: number };
  availableMaterials: MaterialId[];
  availableFinishes: FinishId[];
  availableColors: ColorOption[];
  availableBases: BaseId[];
  /** Preview silhouette key */
  silhouette: 'chair' | 'lounge' | 'table' | 'sofa';
  leadTime: string;
}

export interface Configuration {
  productId: string;
  width: number;
  depth: number;
  height: number;
  material: MaterialId;
  finish: FinishId;
  color: string;
  base: BaseId;
  quantity: number;
}

export interface CartItem {
  id: string;
  productSlug: string;
  productName: string;
  configuration: Configuration;
  unitPrice: number;
  totalPrice: number;
  addedAt: number;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  orderNumber: string;
  items: CartItem[];
  contact: ContactInfo;
  shipping: ShippingInfo;
  subtotal: number;
  shippingCost: number;
  total: number;
  placedAt: number;
}

export type StepId = 'dimensions' | 'material' | 'finish' | 'color' | 'base' | 'quantity';

export interface ConfigStep {
  id: StepId;
  label: string;
  number: number;
}
