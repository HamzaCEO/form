import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCTS, getProduct, getDefaultConfiguration, MATERIALS, FINISHES, BASES } from '@/lib/products';
import { formatPrice } from '@/lib/pricing';
import { ProductPreview } from '@/components/product/product-preview';
import { ArrowRight, Check } from 'lucide-react';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Piece not found' };
  return {
    title: product.name,
    description: product.description,
  openGraph: {
      title: `${product.name} — FORM`,
      description: product.description,
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const config = getDefaultConfiguration(product);
  const material = MATERIALS[config.material];
  const finish = FINISHES[config.finish];
  const base = BASES[config.base];

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-8xl px-5 pt-8 sm:px-8 lg:px-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink-faint" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-ink">Collection</Link>
          <span>/</span>
          <span className="text-ink-soft">{product.name}</span>
        </nav>
      </div>

      {/* Main layout */}
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-12 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
        {/* Preview */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            <div className="border border-line bg-canvas-2/40">
              <ProductPreview
                product={product}
                configuration={config}
                className="h-[400px] w-full p-12 sm:h-[520px] lg:h-[600px]"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-px border border-line bg-line">
              {product.availableMaterials.slice(0, 3).map((matId) => {
                const m = MATERIALS[matId];
                return (
                  <div key={matId} className="bg-canvas p-4">
                    <div className="h-12 w-full border border-line" style={{ background: m.swatch }} />
                    <p className="mt-2 text-xs text-ink-soft">{m.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5 lg:pl-8">
          <p className="eyebrow text-ink-faint">{product.leadTime}</p>
          <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">{product.name}</h1>
          <p className="mt-3 font-serif text-lg font-light italic text-accent">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-4 border-y border-line py-6">
            <span className="font-serif text-3xl font-light text-ink">{formatPrice(product.basePrice)}</span>
            <span className="text-sm text-ink-faint">Base configuration</span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-ink-soft">{product.longDescription}</p>

          {/* Specs */}
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-px border border-line bg-line">
            <SpecRow label="Width" value={`${product.baseDimensions.width} cm`} />
            <SpecRow label="Depth" value={`${product.baseDimensions.depth} cm`} />
            <SpecRow label="Height" value={`${product.baseDimensions.height} cm`} />
            <SpecRow label="Material" value={material.name} />
            <SpecRow label="Finish" value={finish.name} />
            <SpecRow label="Base" value={base.name} />
          </dl>

          {/* Configurable summary */}
          <div className="mt-8">
            <p className="eyebrow mb-4">Configurable options</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> {product.availableMaterials.length} materials</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> {product.availableFinishes.length} finishes</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> {product.availableColors.length} colours</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> {product.availableBases.length} base options</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Dimensions cut to the centimetre</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/configure/${product.slug}`}
              className="group inline-flex items-center justify-center gap-2 border border-ink bg-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-canvas hover:text-ink"
            >
              Configure this piece
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-4 py-4 text-sm uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
            >
              Back to collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-canvas px-4 py-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}
