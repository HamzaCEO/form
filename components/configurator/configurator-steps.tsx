'use client';

import type { Product, Configuration, MaterialId, FinishId, BaseId } from '@/lib/types';
import { MATERIALS, FINISHES, BASES, COLORS } from '@/lib/products';
import { getColorValue } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepProps {
  product: Product;
  configuration: Configuration;
  update: (patch: Partial<Configuration>) => void;
  errors: Record<string, string>;
}

/* ─── Step 1: Dimensions ─── */
export function DimensionsStep({ product, configuration, update, errors }: StepProps) {
  const dims = product.dimensions;
  return (
    <div className="space-y-10">
      <StepHeader
        number="01"
        title="Dimensions"
        description="Each piece is cut to the centimetre. Adjust width, depth, and height to fit your room."
      />
      <div className="space-y-8">
        <DimensionControl
          label="Width"
          value={configuration.width}
          min={dims.width.min}
          max={dims.width.max}
          step={dims.width.step}
          unit="cm"
          error={errors.width}
          onChange={(v) => update({ width: v })}
          pricePerCm={dims.width.pricePerCm}
        />
        <DimensionControl
          label="Depth"
          value={configuration.depth}
          min={dims.depth.min}
          max={dims.depth.max}
          step={dims.depth.step}
          unit="cm"
          error={errors.depth}
          onChange={(v) => update({ depth: v })}
          pricePerCm={dims.depth.pricePerCm}
        />
        <DimensionControl
          label="Height"
          value={configuration.height}
          min={dims.height.min}
          max={dims.height.max}
          step={dims.height.step}
          unit="cm"
          error={errors.height}
          onChange={(v) => update({ height: v })}
          pricePerCm={dims.height.pricePerCm}
        />
      </div>
    </div>
  );
}

function DimensionControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  error,
  onChange,
  pricePerCm,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  error?: string;
  onChange: (v: number) => void;
  pricePerCm: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={`dim-${label}`} className="text-sm uppercase tracking-[0.14em] text-ink">
          {label}
        </label>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-light tabular-nums text-ink">{value}</span>
          <span className="text-sm text-ink-faint">{unit}</span>
        </div>
      </div>
      <input
        id={`dim-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={error ? `error-${label}` : undefined}
        aria-invalid={!!error}
        className="mt-3"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-ink-faint">
        <span>{min} cm min</span>
        <span>+{pricePerCm}/cm above base</span>
        <span>{max} cm max</span>
      </div>
      {error && (
        <p id={`error-${label}`} role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Step 2: Material ─── */
export function MaterialStep({ product, configuration, update }: StepProps) {
  return (
    <div className="space-y-10">
      <StepHeader
        number="02"
        title="Material"
        description="The thing the piece is actually made of. Each material has its own grain, weight, and character."
      />
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {product.availableMaterials.map((matId: MaterialId) => {
          const mat = MATERIALS[matId];
          const active = configuration.material === matId;
          return (
            <button
              key={matId}
              type="button"
              onClick={() => update({ material: matId })}
              aria-pressed={active}
              className={cn(
                'group flex items-start gap-4 bg-canvas p-6 text-left transition-colors',
                active ? 'bg-canvas-2/60' : 'hover:bg-canvas-2/30'
              )}
            >
              <div
                className="mt-1 h-12 w-12 shrink-0 border border-line"
                style={{ background: mat.swatch }}
                aria-hidden="true"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-lg font-light text-ink">{mat.name}</h4>
                  {active && <Check className="h-4 w-4 text-accent" />}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{mat.description}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-faint">
                  ×{mat.priceMultiplier.toFixed(2)} material factor
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 3: Finish ─── */
export function FinishStep({ product, configuration, update }: StepProps) {
  return (
    <div className="space-y-10">
      <StepHeader
        number="03"
        title="Finish"
        description="How the surface meets light. From a raw, natural oil to a deep, even stain."
      />
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {product.availableFinishes.map((finId: FinishId) => {
          const fin = FINISHES[finId];
          const active = configuration.finish === finId;
          return (
            <button
              key={finId}
              type="button"
              onClick={() => update({ finish: finId })}
              aria-pressed={active}
              className={cn(
                'flex items-start gap-4 bg-canvas p-6 text-left transition-colors',
                active ? 'bg-canvas-2/60' : 'hover:bg-canvas-2/30'
              )}
            >
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center border border-line">
                <div
                  className="h-8 w-8"
                  style={{
                    background: 'hsl(196 160 112)',
                    opacity: fin.sheen === 'matte' ? 0.7 : fin.sheen === 'satin' ? 0.85 : 1,
                    filter: fin.id === 'dark' ? 'brightness(0.4)' : 'none',
                  }}
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-lg font-light text-ink">{fin.name}</h4>
                  {active && <Check className="h-4 w-4 text-accent" />}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{fin.description}</p>
                {fin.priceAdjustment > 0 && (
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-faint">
                    +{fin.priceAdjustment} flat
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 4: Colour ─── */
export function ColorStep({ product, configuration, update }: StepProps) {
  return (
    <div className="space-y-10">
      <StepHeader
        number="04"
        title="Colour"
        description="The colour of the upholstery, seat, or textile. Applied to leather and linen components."
      />
      <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        {product.availableColors.map((color) => {
          const active = configuration.color === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => update({ color: color.id })}
              aria-pressed={active}
              aria-label={`${color.name}`}
              className={cn(
                'group flex flex-col items-center gap-3 bg-canvas p-6 transition-colors',
                active ? 'bg-canvas-2/60' : 'hover:bg-canvas-2/30'
              )}
            >
              <div
                className="h-14 w-14 border border-line transition-transform group-hover:scale-110"
                style={{ background: color.value }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink">{color.name}</span>
                {active && <Check className="h-3 w-3 text-accent" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 5: Base ─── */
export function BaseStep({ product, configuration, update }: StepProps) {
  return (
    <div className="space-y-10">
      <StepHeader
        number="05"
        title="Base"
        description="The structure that holds the piece. Each base changes the silhouette and the price."
      />
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {product.availableBases.map((baseId: BaseId) => {
          const base = BASES[baseId];
          const active = configuration.base === baseId;
          return (
            <button
              key={baseId}
              type="button"
              onClick={() => update({ base: baseId })}
              aria-pressed={active}
              className={cn(
                'flex items-start gap-4 bg-canvas p-6 text-left transition-colors',
                active ? 'bg-canvas-2/60' : 'hover:bg-canvas-2/30'
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-lg font-light text-ink">{base.name}</h4>
                  {active && <Check className="h-4 w-4 text-accent" />}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{base.description}</p>
                {base.priceAdjustment > 0 && (
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-faint">
                    +{base.priceAdjustment} flat
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 6: Quantity ─── */
export function QuantityStep({ product, configuration, update, errors }: StepProps) {
  return (
    <div className="space-y-10">
      <StepHeader
        number="06"
        title="Quantity"
        description="How many of this exact configuration would you like? Each piece is made to order."
      />
      <div className="flex items-center gap-6">
        <div className="flex items-center border border-line">
          <button
            type="button"
            onClick={() => update({ quantity: Math.max(1, configuration.quantity - 1) })}
            className="px-5 py-4 text-lg text-ink-soft transition-colors hover:bg-canvas-2 hover:text-ink"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={configuration.quantity}
            onChange={(e) => update({ quantity: Number(e.target.value) })}
            aria-label="Quantity"
            aria-invalid={!!errors.quantity}
            className="w-16 border-x border-line bg-transparent py-4 text-center font-serif text-xl font-light text-ink focus:outline-none"
          />
          <button
            type="button"
            onClick={() => update({ quantity: Math.min(99, configuration.quantity + 1) })}
            className="px-5 py-4 text-lg text-ink-soft transition-colors hover:bg-canvas-2 hover:text-ink"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <p className="text-sm text-ink-faint">Max 99 per configuration</p>
      </div>
      {errors.quantity && (
        <p role="alert" className="text-sm text-error">{errors.quantity}</p>
      )}
    </div>
  );
}

/* ─── Shared header ─── */
function StepHeader({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div>
      <p className="font-serif text-5xl font-light text-accent">{number}</p>
      <h2 className="display mt-4 text-3xl text-ink">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}
