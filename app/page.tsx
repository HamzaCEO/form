import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product/product-card';
import { ProductPreview } from '@/components/product/product-preview';
import { getDefaultConfiguration } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featured = PRODUCTS[1]; // FORM Lounge
  const featuredConfig = getDefaultConfiguration(featured);
  const selectedProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* HERO — asymmetrical editorial composition */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-8xl grid-cols-1 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          {/* Left: type */}
          <div className="flex flex-col justify-center py-20 lg:col-span-7 lg:py-32 lg:pr-16">
            <p className="eyebrow animate-fade-up" style={{ animationDelay: '0ms' }}>
              Copenhagen — Est. 2019
            </p>
            <h1 className="display mt-6 text-5xl text-ink animate-fade-up sm:text-6xl lg:text-7xl xl:text-8xl" style={{ animationDelay: '80ms' }}>
              Furniture,
              <br />
              <span className="italic text-accent">configured</span> by you.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft animate-fade-up" style={{ animationDelay: '160ms' }}>
              FORM is a furniture studio where every piece is cut, joined, and
              finished to your specification. Choose the material, the finish,
              the dimensions, and the base — we build the rest.
            </p>
            <div className="mt-10 flex flex-col gap-4 animate-fade-up sm:flex-row sm:items-center" style={{ animationDelay: '240ms' }}>
              <Link
                href="/configure/form-chair"
                className="group inline-flex items-center justify-center gap-2 border border-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-canvas"
              >
                Begin configuring
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-4 py-4 text-sm uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
              >
                View the collection
              </Link>
            </div>
          </div>

          {/* Right: featured product preview */}
          <div className="relative flex items-end justify-center border-t border-line py-16 lg:col-span-5 lg:border-l lg:border-t-0 lg:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-canvas-2/40" />
            <div className="relative w-full max-w-sm">
              <ProductPreview
                product={featured}
                configuration={featuredConfig}
                className="h-[280px] w-full sm:h-[360px] lg:h-[420px]"
              />
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="eyebrow text-ink-faint">Featured</p>
                  <p className="mt-1 font-serif text-lg font-light text-ink">{featured.name}</p>
                </div>
                <Link
                  href={`/products/${featured.slug}`}
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  View piece →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION CONCEPT — three principles */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-8xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">The premise</p>
              <h2 className="display mt-4 text-3xl text-ink sm:text-4xl">
                Three decisions, made well.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-base leading-relaxed text-ink-soft">
                We do not believe in infinite options. We believe in the right
                options, presented clearly. Every FORM piece is the result of
                three honest decisions — material, proportion, and base — and
                the discipline to leave the rest alone.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-3">
            {[
              { n: '01', t: 'Material', d: 'Timber, stone, or metal. The thing the piece is actually made of.' },
              { n: '02', t: 'Proportion', d: 'Cut to the centimetre. A table the exact length your room asks for.' },
              { n: '03', t: 'Finish', d: 'Natural oil, matte lacquer, or a deep stain. How the surface meets light.' },
            ].map((item) => (
              <div key={item.n} className="bg-canvas p-10">
                <p className="font-serif text-5xl font-light text-accent">{item.n}</p>
                <h3 className="mt-6 font-serif text-2xl font-light text-ink">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIAL SHOWCASE — horizontal band */}
      <section className="border-b border-line bg-canvas-2/30">
        <div className="mx-auto max-w-8xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Materials</p>
              <h2 className="display mt-4 text-3xl text-ink sm:text-4xl">
                Seven materials, sourced honestly.
              </h2>
            </div>
            <Link href="/products" className="text-sm uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink">
              See the collection →
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-7">
            {[
              { name: 'Oak', swatch: 'hsl(196, 39%, 60%)' },
              { name: 'Walnut', swatch: 'hsl(110, 36%, 32%)' },
              { name: 'Ash', swatch: 'hsl(222, 28%, 80%)' },
              { name: 'Marble', swatch: 'hsl(224, 12%, 85%)' },
              { name: 'Metal', swatch: 'hsl(168, 2%, 67%)' },
              { name: 'Leather', swatch: 'hsl(86, 29%, 26%)' },
              { name: 'Linen', swatch: 'hsl(206, 24%, 75%)' },
            ].map((m) => (
              <div key={m.name} className="bg-canvas p-6">
                <div className="h-20 w-full border border-line" style={{ background: m.swatch }} />
                <p className="mt-4 font-serif text-lg font-light text-ink">{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN PHILOSOPHY — large quote */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-32 text-center sm:px-8">
          <p className="eyebrow">Design philosophy</p>
          <blockquote className="display mt-10 text-3xl text-ink sm:text-4xl lg:text-5xl">
            <span className="text-accent">&ldquo;</span>
            We are not interested in making more furniture. We are interested
            in making <em className="italic">your</em> furniture — the piece that
            belongs in the room you already have.
            <span className="text-accent">&rdquo;</span>
          </blockquote>
          <p className="mt-10 eyebrow text-ink-faint">— Mette Sørensen, Design Director</p>
        </div>
      </section>

      {/* SELECTED PRODUCTS */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-8xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Selected</p>
              <h2 className="display mt-4 text-3xl text-ink sm:text-4xl">Pieces from the collection.</h2>
            </div>
            <Link href="/products" className="text-sm uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink">
              All pieces →
            </Link>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProducts.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="mx-auto max-w-8xl px-5 py-32 text-center sm:px-8 lg:px-12">
          <h2 className="display text-4xl text-ink sm:text-5xl lg:text-6xl">
            Start with a chair.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Configure a piece from the ground up — or browse the collection and
            start from one we have already imagined.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/configure/form-chair"
              className="group inline-flex items-center justify-center gap-2 border border-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              Configure a piece
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-4 py-4 text-sm uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
            >
              Read about the studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
