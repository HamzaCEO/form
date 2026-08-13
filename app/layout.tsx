import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  axes: ['opsz', 'SOFT'],
});

export const metadata: Metadata = {
  title: {
    default: 'FORM — Furniture, configured by you.',
    template: '%s — FORM',
  },
  description:
    'FORM is a premium furniture studio. Configure materials, finishes, dimensions, and bases to make each piece your own.',
  openGraph: {
    title: 'FORM — Furniture, configured by you.',
    description:
      'A premium furniture studio where every piece is configured by you.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-canvas text-ink antialiased">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
