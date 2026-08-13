'use client';

import { useMemo } from 'react';
import type { Configuration, Product } from '@/lib/types';
import { MATERIALS, FINISHES, COLORS } from '@/lib/products';
import { getColorValue } from '@/lib/pricing';

interface ProductPreviewProps {
  product: Product;
  configuration: Configuration;
  className?: string;
}

/**
 * A layered SVG product preview. Not fake 3D — a sophisticated 2D architectural
 * elevation that visibly responds to material, color, finish, base, and dimension.
 */
export function ProductPreview({ product, configuration, className }: ProductPreviewProps) {
  const material = MATERIALS[configuration.material];
  const finish = FINISHES[configuration.finish];
  const colorValue = getColorValue(configuration.color);

  // Normalize dimensions into a 0–100 scale for the preview, preserving relative proportion
  const { width, depth, height } = configuration;
  const dimScale = useMemo(() => {
    const maxW = product.dimensions.width.max;
    const maxH = product.dimensions.height.max;
    return {
      wRatio: width / maxW,
      hRatio: height / maxH,
    };
  }, [width, height, product]);

  // Sheen overlay opacity based on finish
  const sheenOpacity =
    finish.sheen === 'gloss' ? 0.22 : finish.sheen === 'satin' ? 0.12 : 0;

  // Dark stain darkens the material
  const isDarkened = configuration.finish === 'dark';
  const bodyFill = isDarkened
    ? darkenHsl(material.swatch, 0.45)
    : material.swatch;

  // Base color — sled bases read as metal, upholstered bases take the textile colour
  const baseFill = configuration.base === 'sled'
    ? 'hsl(168, 2%, 67%)'
    : configuration.base === 'upholstered'
    ? colorValue
    : bodyFill;

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 400 320"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="floorShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--canvas-2))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--canvas-2))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity={sheenOpacity} />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Floor line + shadow */}
        <line x1="40" y1="280" x2="360" y2="280" stroke="hsl(var(--line))" strokeWidth="0.5" />
        <ellipse cx="200" cy="282" rx={90 * dimScale.wRatio} ry="6" fill="url(#floorShadow)" />

        {/* Silhouette */}
        {product.silhouette === 'chair' && (
          <ChairShape bodyFill={bodyFill} baseFill={baseFill} colorValue={colorValue} scale={dimScale} />
        )}
        {product.silhouette === 'lounge' && (
          <LoungeShape bodyFill={bodyFill} baseFill={baseFill} colorValue={colorValue} scale={dimScale} />
        )}
        {product.silhouette === 'table' && (
          <TableShape bodyFill={bodyFill} baseFill={baseFill} scale={dimScale} base={configuration.base} />
        )}
        {product.silhouette === 'sofa' && (
          <SofaShape bodyFill={bodyFill} baseFill={baseFill} colorValue={colorValue} scale={dimScale} />
        )}

        {/* Sheen overlay */}
        {sheenOpacity > 0 && (
          <rect x="40" y="40" width="320" height="240" fill="url(#sheen)" opacity="0.5" />
        )}
      </svg>
    </div>
  );
}

interface ShapeProps {
  bodyFill: string;
  baseFill: string;
  colorValue?: string;
  scale: { wRatio: number; hRatio: number };
}

function ChairShape({ bodyFill, baseFill, colorValue, scale }: ShapeProps) {
  const w = 70 * scale.wRatio;
  const h = 110 * scale.hRatio;
  const cx = 200;
  const seatY = 280 - 42 * scale.hRatio;
  return (
    <g>
      {/* Backrest */}
      <path
        d={`M ${cx - w / 2} ${seatY - h} Q ${cx} ${seatY - h - 12} ${cx + w / 2} ${seatY - h} L ${cx + w / 2} ${seatY - 10} L ${cx - w / 2} ${seatY - 10} Z`}
        fill={colorValue}
        opacity="0.9"
      />
      {/* Seat */}
      <rect x={cx - w / 2} y={seatY - 10} width={w} height={10} fill={bodyFill} />
      {/* Legs */}
      <rect x={cx - w / 2 + 4} y={seatY} width={4} height={42 * scale.hRatio} fill={baseFill} />
      <rect x={cx + w / 2 - 8} y={seatY} width={4} height={42 * scale.hRatio} fill={baseFill} />
      <rect x={cx - w / 2 + 4} y={seatY - h + 6} width={4} height={h - 16} fill={baseFill} opacity="0.7" />
      <rect x={cx + w / 2 - 8} y={seatY - h + 6} width={4} height={h - 16} fill={baseFill} opacity="0.7" />
    </g>
  );
}

function LoungeShape({ bodyFill, baseFill, colorValue, scale }: ShapeProps) {
  const w = 110 * scale.wRatio;
  const h = 70 * scale.hRatio;
  const cx = 200;
  const baseY = 280;
  return (
    <g>
      {/* Backrest — reclined */}
      <path
        d={`M ${cx - w / 2} ${baseY - h} L ${cx - w / 2 + 18} ${baseY - 20} L ${cx + w / 2 - 10} ${baseY - 24} L ${cx + w / 2} ${baseY - h + 6} Z`}
        fill={colorValue}
        opacity="0.92"
      />
      {/* Seat cushion */}
      <rect x={cx - w / 2 + 6} y={baseY - 26} width={w - 12} height={14} rx={3} fill={colorValue} />
      {/* Frame */}
      <rect x={cx - w / 2} y={baseY - 30} width={w} height={6} fill={bodyFill} />
      {/* Legs */}
      <rect x={cx - w / 2 + 4} y={baseY - 24} width={5} height={24} fill={baseFill} />
      <rect x={cx + w / 2 - 9} y={baseY - 24} width={5} height={24} fill={baseFill} />
    </g>
  );
}

function TableShape({ bodyFill, baseFill, scale, base }: ShapeProps & { base: string }) {
  const w = 140 * scale.wRatio;
  const h = 70 * scale.hRatio;
  const cx = 200;
  const topY = 280 - h;
  return (
    <g>
      {/* Top */}
      <rect x={cx - w / 2} y={topY} width={w} height={10} fill={bodyFill} />
      <rect x={cx - w / 2} y={topY + 10} width={w} height={2} fill="hsl(0, 0%, 0% / 0.2)" />
      {/* Base variations */}
      {base === 'sled' && (
        <g>
          <rect x={cx - w / 2 + 10} y={topY + 12} width={5} height={h - 14} fill={baseFill} />
          <rect x={cx + w / 2 - 15} y={topY + 12} width={5} height={h - 14} fill={baseFill} />
          <line x1={cx - w / 2 + 12} y1={280} x2={cx + w / 2 - 12} y2={280} stroke={baseFill} strokeWidth={4} />
        </g>
      )}
      {base === 'trestle' && (
        <g>
          <path d={`M ${cx - 30} ${topY + 12} L ${cx - 20} ${280} L ${cx - 10} ${topY + 12} Z`} fill={baseFill} />
          <path d={`M ${cx + 10} ${topY + 12} L ${cx + 20} ${280} L ${cx + 30} ${topY + 12} Z`} fill={baseFill} />
          <line x1={cx - 25} y1={275} x2={cx + 25} y2={275} stroke={baseFill} strokeWidth={3} />
        </g>
      )}
      {base === 'pedestal' && (
        <g>
          <rect x={cx - 4} y={topY + 12} width={8} height={h - 20} fill={baseFill} />
          <ellipse cx={cx} cy={278} rx={24} ry={4} fill={baseFill} />
        </g>
      )}
      {(base === 'solid-wood' || base === 'upholstered') && (
        <g>
          <rect x={cx - w / 2 + 10} y={topY + 12} width={5} height={h - 14} fill={baseFill} />
          <rect x={cx + w / 2 - 15} y={topY + 12} width={5} height={h - 14} fill={baseFill} />
        </g>
      )}
    </g>
  );
}

function SofaShape({ bodyFill, baseFill, colorValue, scale }: ShapeProps) {
  const w = 180 * scale.wRatio;
  const h = 60 * scale.hRatio;
  const cx = 200;
  const baseY = 280;
  return (
    <g>
      {/* Back */}
      <rect x={cx - w / 2} y={baseY - h - 20} width={w} height={h - 10} fill={colorValue} opacity="0.95" />
      {/* Arms */}
      <rect x={cx - w / 2} y={baseY - h} width={16} height={h} fill={colorValue} />
      <rect x={cx + w / 2 - 16} y={baseY - h} width={16} height={h} fill={colorValue} />
      {/* Seat cushions */}
      <rect x={cx - w / 2 + 18} y={baseY - h + 4} width={(w - 40) / 3 - 2} height={h - 14} rx={2} fill={colorValue} opacity="0.85" />
      <rect x={cx - w / 2 + 18 + (w - 40) / 3} y={baseY - h + 4} width={(w - 40) / 3 - 2} height={h - 14} rx={2} fill={colorValue} opacity="0.85" />
      <rect x={cx - w / 2 + 18 + 2 * ((w - 40) / 3)} y={baseY - h + 4} width={(w - 40) / 3 - 2} height={h - 14} rx={2} fill={colorValue} opacity="0.85" />
      {/* Base frame */}
      <rect x={cx - w / 2} y={baseY - 12} width={w} height={6} fill={bodyFill} />
      {/* Legs */}
      <rect x={cx - w / 2 + 6} y={baseY - 6} width={4} height={6} fill={baseFill} />
      <rect x={cx + w / 2 - 10} y={baseY - 6} width={4} height={6} fill={baseFill} />
    </g>
  );
}

/** Darken an hsl(h, s, l%) string by reducing lightness. */
function darkenHsl(hsl: string, factor: number): string {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
  if (!match) return hsl;
  const [, h, s, l] = match;
  const newL = Math.max(8, Math.round(Number(l) * factor));
  return `hsl(${h}, ${s}%, ${newL}%)`;
}
