import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductBrowser } from './product-browser';

export const metadata: Metadata = {
  title: 'Collection',
  description:
    'Browse the FORM collection — chairs, lounges, tables, and sofas, each configurable to your specification.',
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <header className="border-b border-line pb-12">
        <p className="eyebrow">The collection</p>
        <h1 className="display mt-4 text-5xl text-ink sm:text-6xl lg:text-7xl">
          Four pieces. <span className="italic text-accent">Infinite</span> configurations.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
          Each piece is built to order in Copenhagen. Filter by category, sort
          by price, or search by name — then configure it to your specification.
        </p>
      </header>
      <Suspense fallback={<div className="mt-12 animate-pulse-soft text-ink-faint">Loading collection…</div>}>
        <ProductBrowser />
      </Suspense>
    </div>
  );
}
