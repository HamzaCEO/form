import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-serif text-3xl font-light tracking-[0.18em] text-ink"
            >
              FORM
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Furniture, configured by you. A premium furniture studio
              working in timber, stone, and steel from Copenhagen.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-4">Collection</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/products" className="hover:text-ink">All pieces</Link></li>
              <li><Link href="/products?category=seating" className="hover:text-ink">Seating</Link></li>
              <li><Link href="/products?category=tables" className="hover:text-ink">Tables</Link></li>
              <li><Link href="/products?category=lounges" className="hover:text-ink">Lounges</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Studio</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/about" className="hover:text-ink">About FORM</Link></li>
              <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
              <li><Link href="/cart" className="hover:text-ink">Cart</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FORM Studio. A frontend demonstration project.</p>
          <p>Designed and built as a portfolio piece. No real orders are processed.</p>
        </div>
      </div>
    </footer>
  );
}
