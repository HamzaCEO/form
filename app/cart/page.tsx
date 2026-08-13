'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { getProduct, MATERIALS, FINISHES, BASES, COLORS } from '@/lib/products';
import { formatPrice } from '@/lib/pricing';
import { ProductPreview } from '@/components/product/product-preview';
import { ArrowRight, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { Configuration } from '@/lib/types';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-8xl px-5 py-32 sm:px-8 lg:px-12">
        <p className="eyebrow text-ink-faint animate-pulse-soft">Loading cart…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <header className="border-b border-line pb-12">
          <p className="eyebrow">Cart</p>
          <h1 className="display mt-4 text-5xl text-ink sm:text-6xl">Your cart is empty.</h1>
        </header>
        <div className="mt-16 flex flex-col items-center justify-center border border-line p-16 text-center">
          <ShoppingBag className="h-12 w-12 text-ink-faint" />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
            You have not configured any pieces yet. Start with a chair, a lounge,
            a table, or a sofa — and make it yours.
          </p>
          <Link
            href="/products"
            className="group mt-8 inline-flex items-center gap-2 border border-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            Browse the collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <header className="border-b border-line pb-12">
        <p className="eyebrow">Cart</p>
        <h1 className="display mt-4 text-5xl text-ink sm:text-6xl">
          {items.length} {items.length === 1 ? 'piece' : 'pieces'}, configured.
        </h1>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Items */}
        <div className="lg:col-span-8">
          <ul className="space-y-6">
            {items.map((item) => {
              const product = getProduct(item.productSlug);
              if (!product) {
                // Stale data — product no longer exists
                return (
                  <li key={item.id} className="border border-line p-6">
                    <p className="text-sm text-error">This item references a product that no longer exists.</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-4 text-sm uppercase tracking-[0.14em] text-accent hover:text-ink"
                    >
                      Remove
                    </button>
                  </li>
                );
              }
              const config: Configuration = item.configuration;
              const material = MATERIALS[config.material];
              const finish = FINISHES[config.finish];
              const base = BASES[config.base];
              const color = COLORS.find((c) => c.id === config.color);

              return (
                <li key={item.id} className="border border-line">
                  <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-12 sm:gap-8">
                    {/* Preview */}
                    <div className="sm:col-span-4">
                      <div className="aspect-[5/4] border border-line bg-canvas-2/40">
                        <ProductPreview
                          product={product}
                          configuration={config}
                          className="h-full w-full p-6"
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="sm:col-span-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-serif text-2xl font-light text-ink">{product.name}</h2>
                          <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
                        </div>
                        <p className="font-serif text-xl font-light tabular-nums text-ink">
                          {formatPrice(item.totalPrice)}
                        </p>
                      </div>

                      {/* Config summary */}
                      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
                        <ConfigDetail label="Dimensions" value={`${config.width} × ${config.depth} × ${config.height} cm`} />
                        <ConfigDetail label="Material" value={material.name} />
                        <ConfigDetail label="Finish" value={finish.name} />
                        <ConfigDetail label="Colour" value={color?.name ?? config.color} />
                        <ConfigDetail label="Base" value={base.name} />
                      </dl>

                      {/* Quantity + remove */}
                      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                        <div className="flex items-center border border-line">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(1, config.quantity - 1))}
                            className="px-3 py-2 text-ink-soft transition-colors hover:bg-canvas-2 hover:text-ink"
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-center font-serif text-lg font-light tabular-nums text-ink">
                            {config.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.min(99, config.quantity + 1))}
                            className="px-3 py-2 text-ink-soft transition-colors hover:bg-canvas-2 hover:text-ink"
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-error"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8">
            <Link
              href="/products"
              className="text-sm uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
            >
              ← Continue shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <div className="border border-line bg-canvas-2/30 p-6">
              <p className="eyebrow text-ink-faint">Order summary</p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between text-ink-soft">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between text-ink-soft">
                  <dt>Shipping</dt>
                  <dd className="tabular-nums">Calculated at checkout</dd>
                </div>
                <div className="flex items-center justify-between text-ink-soft">
                  <dt>Total pieces</dt>
                  <dd className="tabular-nums">{items.reduce((s, i) => s + i.configuration.quantity, 0)}</dd>
                </div>
              </dl>
              <div className="mt-6 flex items-baseline justify-between border-t border-line pt-4">
                <span className="eyebrow text-ink">Subtotal</span>
                <span className="font-serif text-2xl font-light tabular-nums text-ink">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="group mt-6 flex w-full items-center justify-center gap-2 border border-ink bg-ink px-6 py-4 text-sm uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-canvas hover:text-ink"
              >
                Proceed to checkout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
