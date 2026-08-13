import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS, getProduct } from '@/lib/products';
import { Configurator } from '@/components/configurator/configurator';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Configure' };
  return {
    title: `Configure ${product.name}`,
    description: `Configure your ${product.name} — choose dimensions, material, finish, colour, and base.`,
  };
}

export default function ConfigurePage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return <Configurator product={product} />;
}
