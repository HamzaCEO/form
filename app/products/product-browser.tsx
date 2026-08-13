'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import { formatPrice } from '@/lib/pricing';
import { ProductCard } from '@/components/product/product-card';
import { Search, X } from 'lucide-react';
import type { Category } from '@/lib/types';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

export function ProductBrowser() {
  const params = useSearchParams();
  const initialCategory = params.get('category') as Category | null;

  const [category, setCategory] = useState<Category | 'all'>(
    initialCategory && CATEGORIES.some((c) => c.id === initialCategory)
      ? initialCategory
      : 'all'
  );
  const [sort, setSort] = useState<SortKey>('featured');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return result;
  }, [category, sort, query]);

  return (
    <div className="mt-12">
      {/* Controls */}
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <FilterButton
            active={category === 'all'}
            onClick={() => setCategory('all')}
            label="All"
          />
          {CATEGORIES.map((cat) => (
            <FilterButton
              key={cat.id}
              active={category === cat.id}
              onClick={() => setCategory(cat.id)}
              label={cat.label}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection"
              className="w-full border border-line bg-transparent py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-ink-faint focus:border-ink-faint sm:w-64"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink-faint hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-line bg-transparent py-2.5 pl-3 pr-8 text-sm text-ink focus:border-ink-faint"
            >
              <option value="featured" className="bg-canvas">Featured</option>
              <option value="price-asc" className="bg-canvas">Price, low to high</option>
              <option value="price-desc" className="bg-canvas">Price, high to low</option>
              <option value="name" className="bg-canvas">Name, A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="mt-6 text-sm text-ink-faint" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
        {category !== 'all' && ` in ${CATEGORIES.find((c) => c.id === category)?.label}`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-line p-16 text-center">
          <p className="font-serif text-2xl font-light text-ink">No pieces found.</p>
          <p className="mt-3 text-sm text-ink-soft">
            Try a different search or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="mt-6 text-sm uppercase tracking-[0.18em] text-accent hover:text-ink"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? 'border border-ink bg-ink px-4 py-2 text-sm uppercase tracking-[0.14em] text-canvas transition-colors'
          : 'border border-line px-4 py-2 text-sm uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-ink-faint hover:text-ink'
      }
    >
      {label}
    </button>
  );
}
