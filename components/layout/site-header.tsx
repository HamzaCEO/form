'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/products', label: 'Collection' },
  { href: '/configure/form-chair', label: 'Configure' },
  { href: '/about', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-line bg-canvas/95 backdrop-blur-md'
          : 'border-transparent bg-canvas'
      )}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-light tracking-[0.18em] text-ink"
          aria-label="FORM home"
        >
          FORM
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'eyebrow transition-colors hover:text-ink',
                  active ? 'text-ink' : 'text-ink-faint'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="eyebrow flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
            aria-label={`Cart, ${itemCount} items`}
          >
            <span className="hidden sm:inline">Cart</span>
            <span className="relative">
              <span className="tabular-nums">
                ({itemCount})
              </span>
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={cn('block h-px w-6 bg-ink transition-transform', mobileOpen && 'translate-y-[7px] rotate-45')} />
              <span className={cn('block h-px w-6 bg-ink transition-opacity', mobileOpen && 'opacity-0')} />
              <span className={cn('block h-px w-6 bg-ink transition-transform', mobileOpen && '-translate-y-[7px] -rotate-45')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="border-t border-line bg-canvas px-5 py-6 md:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-serif text-2xl font-light text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
