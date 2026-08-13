'use client';

import type { Product, Configuration } from '@/lib/types';
import { MATERIALS, FINISHES, BASES, COLORS } from '@/lib/products';
import { calculatePrice, formatPrice, getColorValue } from '@/lib/pricing';

interface SummaryProps {
  product: Product;
  configuration: Configuration;
}

export function ConfiguratorSummary({ product, configuration }: SummaryProps) {
  const breakdown = calculatePrice(product, configuration);
  const material = MATERIALS[configuration.material];
  const finish = FINISHES[configuration.finish];
  const base = BASES[configuration.base];
  const color = COLORS.find((c) => c.id === configuration.color);

  return (
    <div className="border border-line bg-canvas-2/30">
      <div className="border-b border-line p-6">
        <p className="eyebrow text-ink-faint">Your configuration</p>
        <h3 className="mt-2 font-serif text-xl font-light text-ink">{product.name}</h3>
      </div>

      <dl className="divide-y divide-line">
        <SummaryRow label="Dimensions" value={`${configuration.width} × ${configuration.depth} × ${configuration.height} cm`} />
        <SummaryRow label="Material" value={material.name} />
        <SummaryRow label="Finish" value={finish.name} />
        <SummaryRow
          label="Colour"
          value={
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 border border-line" style={{ background: color?.value ?? getColorValue(configuration.color) }} />
              {color?.name ?? configuration.color}
            </span>
          }
        />
        <SummaryRow label="Base" value={base.name} />
        <SummaryRow label="Quantity" value={String(configuration.quantity)} />
      </dl>

      {/* Price breakdown */}
      <div className="border-t border-line p-6">
        <p className="eyebrow mb-4 text-ink-faint">Price breakdown</p>
        <div className="space-y-2 text-sm">
          <PriceLine label="Base price" value={formatPrice(breakdown.basePrice)} />
          {breakdown.materialAdjustment > 0 && (
            <PriceLine label="Material" value={`+ ${formatPrice(breakdown.materialAdjustment)}`} />
          )}
          {breakdown.finishAdjustment > 0 && (
            <PriceLine label="Finish" value={`+ ${formatPrice(breakdown.finishAdjustment)}`} />
          )}
          {breakdown.baseAdjustment > 0 && (
            <PriceLine label="Base" value={`+ ${formatPrice(breakdown.baseAdjustment)}`} />
          )}
          {breakdown.dimensionAdjustment > 0 && (
            <PriceLine label="Dimensions" value={`+ ${formatPrice(breakdown.dimensionAdjustment)}`} />
          )}
          <div className="my-2 hairline" />
          <PriceLine label="Unit price" value={formatPrice(breakdown.unitPrice)} />
          <PriceLine label="Quantity" value={`× ${breakdown.quantity}`} />
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="eyebrow text-ink">Total</span>
          <span className="font-serif text-2xl font-light text-ink tabular-nums">{formatPrice(breakdown.total)}</span>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-ink-soft">
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
