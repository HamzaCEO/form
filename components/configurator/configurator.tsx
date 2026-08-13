'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, Configuration, StepId } from '@/lib/types';
import { getDefaultConfiguration } from '@/lib/products';
import { calculatePrice, formatPrice } from '@/lib/pricing';
import { useCart } from '@/lib/cart-context';
import { ProductPreview } from '@/components/product/product-preview';
import { ConfiguratorSummary } from './configurator-summary';
import {
  DimensionsStep,
  MaterialStep,
  FinishStep,
  ColorStep,
  BaseStep,
  QuantityStep,
} from './configurator-steps';
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS: { id: StepId; label: string }[] = [
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'material', label: 'Material' },
  { id: 'finish', label: 'Finish' },
  { id: 'color', label: 'Colour' },
  { id: 'base', label: 'Base' },
  { id: 'quantity', label: 'Quantity' },
];

interface ConfiguratorProps {
  product: Product;
}

export function Configurator({ product }: ConfiguratorProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [configuration, setConfiguration] = useState<Configuration>(
    getDefaultConfiguration(product)
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  const update = useCallback((patch: Partial<Configuration>) => {
    setConfiguration((prev) => ({ ...prev, ...patch }));
    setErrors({});
  }, []);

  const breakdown = useMemo(
    () => calculatePrice(product, configuration),
    [product, configuration]
  );

  const currentStep = STEPS[stepIndex];

  const validateStep = (step: StepId): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 'dimensions') {
      const d = product.dimensions;
      if (configuration.width < d.width.min || configuration.width > d.width.max)
        newErrors.width = `Width must be between ${d.width.min} and ${d.width.max} cm`;
      if (configuration.depth < d.depth.min || configuration.depth > d.depth.max)
        newErrors.depth = `Depth must be between ${d.depth.min} and ${d.depth.max} cm`;
      if (configuration.height < d.height.min || configuration.height > d.height.max)
        newErrors.height = `Height must be between ${d.height.min} and ${d.height.max} cm`;
    }
    if (step === 'quantity') {
      if (!Number.isFinite(configuration.quantity) || configuration.quantity < 1)
        newErrors.quantity = 'Quantity must be at least 1';
      if (configuration.quantity > 99)
        newErrors.quantity = 'Quantity cannot exceed 99';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validateStep(currentStep.id)) return;
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    if (!validateStep(currentStep.id)) return;
    // Validate all steps before adding
    for (const step of STEPS) {
      if (!validateStep(step.id)) {
        setStepIndex(STEPS.findIndex((s) => s.id === step.id));
        return;
      }
    }
    addItem(product.slug, configuration);
    setAdded(true);
    setTimeout(() => {
      router.push('/cart');
    }, 800);
  };

  return (
    <div className="mx-auto max-w-8xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      {/* Header */}
      <div className="border-b border-line pb-8">
        <p className="eyebrow text-ink-faint">Configuring</p>
        <h1 className="display mt-2 text-4xl text-ink sm:text-5xl">{product.name}</h1>
      </div>

      {/* Stepper */}
      <nav aria-label="Configuration steps" className="mt-8">
        <ol className="flex flex-wrap gap-2 sm:gap-0 sm:divide-x sm:divide-line sm:border sm:border-line">
          {STEPS.map((step, i) => {
            const active = i === stepIndex;
            const done = i < stepIndex;
            return (
              <li key={step.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setStepIndex(i);
                    setErrors({});
                  }}
                  aria-current={active ? 'step' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors sm:px-5',
                    active ? 'bg-canvas-2/60' : 'hover:bg-canvas-2/30'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center border text-xs tabular-nums transition-colors',
                      active
                        ? 'border-ink bg-ink text-canvas'
                        : done
                        ? 'border-accent text-accent'
                        : 'border-line text-ink-faint'
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      'hidden text-xs uppercase tracking-[0.14em] sm:inline',
                      active ? 'text-ink' : 'text-ink-faint'
                    )}
                  >
                    {step.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Main grid: steps + preview/summary */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: step content */}
        <div className="lg:col-span-7">
          <div key={currentStep.id} className="animate-fade-up">
            {currentStep.id === 'dimensions' && (
              <DimensionsStep product={product} configuration={configuration} update={update} errors={errors} />
            )}
            {currentStep.id === 'material' && (
              <MaterialStep product={product} configuration={configuration} update={update} errors={errors} />
            )}
            {currentStep.id === 'finish' && (
              <FinishStep product={product} configuration={configuration} update={update} errors={errors} />
            )}
            {currentStep.id === 'color' && (
              <ColorStep product={product} configuration={configuration} update={update} errors={errors} />
            )}
            {currentStep.id === 'base' && (
              <BaseStep product={product} configuration={configuration} update={update} errors={errors} />
            )}
            {currentStep.id === 'quantity' && (
              <QuantityStep product={product} configuration={configuration} update={update} errors={errors} />
            )}
          </div>

          {/* Nav buttons */}
          <div className="mt-12 flex items-center justify-between border-t border-line pt-8">
            <button
              type="button"
              onClick={prev}
              disabled={stepIndex === 0}
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Previous
            </button>
            {stepIndex < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="group inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-canvas"
              >
                Next
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={added}
                className="group inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-sm uppercase tracking-[0.14em] text-canvas transition-colors hover:bg-canvas hover:text-ink disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add to cart
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right: preview + summary (sticky on desktop) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            {/* Live preview */}
            <div className="border border-line bg-canvas-2/40">
              <ProductPreview
                product={product}
                configuration={configuration}
                className="h-[300px] w-full p-8 sm:h-[360px]"
              />
              <div className="flex items-center justify-between border-t border-line px-6 py-4">
                <span className="eyebrow text-ink-faint">Current total</span>
                <span className="font-serif text-2xl font-light tabular-nums text-ink">
                  {formatPrice(breakdown.total)}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6">
              <ConfiguratorSummary product={product} configuration={configuration} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 px-5 py-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-ink-faint">Step {stepIndex + 1} / {STEPS.length}</p>
            <p className="font-serif text-lg font-light text-ink">{formatPrice(breakdown.total)}</p>
          </div>
          {stepIndex < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm uppercase tracking-[0.14em] text-ink"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={added}
              className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-sm uppercase tracking-[0.14em] text-canvas disabled:opacity-50"
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              {added ? 'Added' : 'Add'}
            </button>
          )}
        </div>
      </div>
      {/* Spacer for mobile sticky bar */}
      <div className="h-24 lg:hidden" />
    </div>
  );
}
