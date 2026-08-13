import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <p className="font-serif text-8xl font-light text-accent">404</p>
      <h1 className="display mt-8 text-4xl text-ink sm:text-5xl">
        This page does not exist.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
        The page you are looking for may have been moved, or the link may be
        broken. Return to the collection, or start configuring a piece.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2 border border-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-canvas"
        >
          Return home
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center px-4 py-4 text-sm uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
        >
          Browse the collection
        </Link>
      </div>
    </div>
  );
}
