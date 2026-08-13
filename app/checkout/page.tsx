'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { getProduct, MATERIALS, FINISHES, BASES, COLORS } from '@/lib/products';
import { formatPrice } from '@/lib/pricing';
import { ArrowRight, Check, ShoppingBag } from 'lucide-react';
import type { ContactInfo, ShippingInfo, Order } from '@/lib/types';

const SHIPPING_COST = 120;

type FieldErrors = Record<string, string>;

export default function CheckoutPage() {
  const { items, subtotal, clearCart, hydrated } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [contact, setContact] = useState<ContactInfo>({ name: '', email: '', phone: '' });
  const [shipping, setShipping] = useState<ShippingInfo>({
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  const total = subtotal + (items.length > 0 ? SHIPPING_COST : 0);

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!contact.name.trim()) e.name = 'Name is required';
    else if (contact.name.trim().length < 2) e.name = 'Name must be at least 2 characters';

    if (!contact.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = 'Enter a valid email address';

    if (!contact.phone.trim()) e.phone = 'Phone is required';
    else if (contact.phone.replace(/[\s\-()]/g, '').length < 7) e.phone = 'Enter a valid phone number';

    if (!shipping.address.trim()) e.address = 'Address is required';
    else if (shipping.address.trim().length < 5) e.address = 'Address must be at least 5 characters';

    if (!shipping.city.trim()) e.city = 'City is required';
    if (!shipping.country.trim()) e.country = 'Country is required';
    if (!shipping.postalCode.trim()) e.postalCode = 'Postal code is required';
    else if (shipping.postalCode.trim().length < 3) e.postalCode = 'Enter a valid postal code';

    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const orderNumber = `FORM-${Date.now().toString(36).toUpperCase().slice(-8)}`;
    setOrder({
      orderNumber,
      items,
      contact,
      shipping,
      subtotal,
      shippingCost: SHIPPING_COST,
      total,
      placedAt: Date.now(),
    });
    setSubmitted(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirmation screen
  if (submitted && order) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="border border-line bg-canvas-2/30 p-12 text-center animate-scale-in">
          <div className="mx-auto flex h-16 w-16 items-center justify-center border border-accent">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <p className="eyebrow mt-8 text-ink-faint">Order received</p>
          <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">
            Your FORM order has been received.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            Thank you, {order.contact.name.split(' ')[0]}. We have received your
            order and will begin crafting your pieces in Copenhagen. A
            confirmation has been sent to {order.contact.email}.
          </p>

          <div className="mx-auto mt-10 max-w-sm border-t border-line pt-6">
            <p className="eyebrow text-ink-faint">Order number</p>
            <p className="mt-2 font-serif text-2xl font-light tabular-nums text-ink">
              {order.orderNumber}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-sm border-t border-line pt-6 text-sm">
            <div className="flex items-center justify-between text-ink-soft">
              <span>Items</span>
              <span className="tabular-nums">{order.items.reduce((s, i) => s + i.configuration.quantity, 0)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-ink-soft">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-ink-soft">
              <span>Shipping</span>
              <span className="tabular-nums">{formatPrice(order.shippingCost)}</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
              <span className="eyebrow text-ink">Total</span>
              <span className="font-serif text-xl font-light tabular-nums text-ink">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          <p className="mt-10 text-xs text-ink-faint">
            This is a frontend demonstration. No real payment has been processed
            and no order has been placed.
          </p>

          <Link
            href="/products"
            className="group mt-10 inline-flex items-center gap-2 border border-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            Continue browsing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart guard
  if (hydrated && items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <header className="border-b border-line pb-12">
          <p className="eyebrow">Checkout</p>
          <h1 className="display mt-4 text-5xl text-ink sm:text-6xl">Nothing to check out.</h1>
        </header>
        <div className="mt-16 flex flex-col items-center justify-center border border-line p-16 text-center">
          <ShoppingBag className="h-12 w-12 text-ink-faint" />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
            Your cart is empty. Configure a piece first, then return here to
            check out.
          </p>
          <Link
            href="/products"
            className="group mt-8 inline-flex items-center gap-2 border border-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            Browse the collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <header className="border-b border-line pb-12">
        <p className="eyebrow">Checkout</p>
        <h1 className="display mt-4 text-5xl text-ink sm:text-6xl">Almost yours.</h1>
      </header>

      <form onSubmit={handleSubmit} noValidate className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Form fields */}
        <div className="lg:col-span-7">
          {/* Contact */}
          <fieldset className="border border-line p-6">
            <legend className="px-2 font-serif text-xl font-light text-ink">Contact</legend>
            <div className="mt-4 space-y-4">
              <Field
                id="name"
                label="Full name"
                value={contact.name}
                onChange={(v) => setContact({ ...contact, name: v })}
                error={errors.name}
                autoComplete="name"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={contact.email}
                  onChange={(v) => setContact({ ...contact, email: v })}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(v) => setContact({ ...contact, phone: v })}
                  error={errors.phone}
                  autoComplete="tel"
                />
              </div>
            </div>
          </fieldset>

          {/* Shipping */}
          <fieldset className="mt-6 border border-line p-6">
            <legend className="px-2 font-serif text-xl font-light text-ink">Shipping</legend>
            <div className="mt-4 space-y-4">
              <Field
                id="address"
                label="Street address"
                value={shipping.address}
                onChange={(v) => setShipping({ ...shipping, address: v })}
                error={errors.address}
                autoComplete="street-address"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  id="city"
                  label="City"
                  value={shipping.city}
                  onChange={(v) => setShipping({ ...shipping, city: v })}
                  error={errors.city}
                  autoComplete="address-level2"
                />
                <Field
                  id="country"
                  label="Country"
                  value={shipping.country}
                  onChange={(v) => setShipping({ ...shipping, country: v })}
                  error={errors.country}
                  autoComplete="country-name"
                />
              </div>
              <Field
                id="postalCode"
                label="Postal code"
                value={shipping.postalCode}
                onChange={(v) => setShipping({ ...shipping, postalCode: v })}
                error={errors.postalCode}
                autoComplete="postal-code"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="group mt-8 inline-flex w-full items-center justify-center gap-2 border border-ink bg-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-canvas hover:text-ink sm:w-auto"
          >
            Place order
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="border border-line bg-canvas-2/30">
              <div className="border-b border-line p-6">
                <p className="eyebrow text-ink-faint">Order summary</p>
              </div>
              <ul className="divide-y divide-line">
                {items.map((item) => {
                  const product = getProduct(item.productSlug);
                  if (!product) return null;
                  const config = item.configuration;
                  const material = MATERIALS[config.material];
                  const finish = FINISHES[config.finish];
                  const base = BASES[config.base];
                  const color = COLORS.find((c) => c.id === config.color);
                  return (
                    <li key={item.id} className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-lg font-light text-ink">{product.name}</h3>
                          <p className="mt-1 text-xs text-ink-faint">Qty {config.quantity}</p>
                        </div>
                        <span className="font-serif text-lg font-light tabular-nums text-ink">
                          {formatPrice(item.totalPrice)}
                        </span>
                      </div>
                      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-ink-soft">
                        <span>{config.width} × {config.depth} × {config.height} cm</span>
                        <span>{material.name}, {finish.name}</span>
                        <span>{color?.name ?? config.color}</span>
                        <span>{base.name}</span>
                      </dl>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-line p-6">
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-ink-soft">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between text-ink-soft">
                    <dt>Shipping</dt>
                    <dd className="tabular-nums">{formatPrice(SHIPPING_COST)}</dd>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                    <dt className="eyebrow text-ink">Total</dt>
                    <dd className="font-serif text-2xl font-light tabular-nums text-ink">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-faint">
              This is a frontend demonstration. No real payment will be processed.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.14em] text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full border bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none ${
          error ? 'border-error' : 'border-line focus:border-ink-faint'
        }`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
