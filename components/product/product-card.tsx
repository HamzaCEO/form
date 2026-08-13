import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/pricing';
import { ProductPreview } from './product-preview';
import { getDefaultConfiguration } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, index = 0, variant = 'default' }: ProductCardProps) {
  const config = getDefaultConfiguration(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative overflow-hidden border border-line bg-canvas-2/40 transition-colors duration-500 group-hover:border-ink-faint">
        <div className={variant === 'compact' ? 'aspect-[4/3]' : 'aspect-[5/4]'}>
          <ProductPreview
            product={product}
            configuration={config}
            className="h-full w-full p-8 transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute left-4 top-4">
          <span className="eyebrow text-ink-faint">{product.leadTime}</span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-light text-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
        </div>
        <p className="font-sans text-sm tabular-nums text-ink-soft">
          {formatPrice(product.basePrice)}
        </p>
      </div>
    </Link>
  );
}
