'use client';

import { useState } from 'react';
import { Check, MapPin, Mail, Phone } from 'lucide-react';

type FieldErrors = Record<string, string>;

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';

    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';

    if (!form.subject.trim()) e.subject = 'Subject is required';
    else if (form.subject.trim().length < 3) e.subject = 'Subject must be at least 3 characters';

    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';

    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <header className="border-b border-line pb-12">
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-4 text-5xl text-ink sm:text-6xl lg:text-7xl">
          Talk to the <span className="italic text-accent">studio.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
          Questions about a configuration, a lead time, or a custom commission?
          Write to us — we read every message and reply within two working days.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Studio info */}
        <div className="lg:col-span-4">
          <div className="space-y-8">
            <div>
              <p className="eyebrow text-ink-faint">Studio</p>
              <div className="mt-3 flex items-start gap-3 text-sm text-ink-soft">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  Refshalevej 153<br />
                  1432 København K<br />
                  Denmark
                </span>
              </div>
            </div>
            <div>
              <p className="eyebrow text-ink-faint">Email</p>
              <div className="mt-3 flex items-center gap-3 text-sm text-ink-soft">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span>studio@form.furniture</span>
              </div>
            </div>
            <div>
              <p className="eyebrow text-ink-faint">Phone</p>
              <div className="mt-3 flex items-center gap-3 text-sm text-ink-soft">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span>+45 32 96 00 00</span>
              </div>
            </div>
            <div className="border-t border-line pt-8">
              <p className="eyebrow text-ink-faint">Hours</p>
              <div className="mt-3 space-y-1 text-sm text-ink-soft">
                <p>Monday — Friday, 09:00 — 17:00 CET</p>
                <p>Saturday, 10:00 — 15:00 CET</p>
                <p>Sunday, closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 lg:col-start-6">
          {sent ? (
            <div className="border border-line bg-canvas-2/30 p-12 text-center animate-scale-in">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-accent">
                <Check className="h-7 w-7 text-accent" />
              </div>
              <h2 className="display mt-6 text-3xl text-ink">Message sent.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Thank you for writing to FORM. We will reply within two working
                days.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 text-sm uppercase tracking-[0.14em] text-accent transition-colors hover:text-ink"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  id="name"
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                  autoComplete="name"
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>
              <FormField
                id="subject"
                label="Subject"
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
                error={errors.subject}
              />
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.14em] text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  rows={6}
                  className={`mt-2 w-full border bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none ${
                    errors.message ? 'border-error' : 'border-line focus:border-ink-faint'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-sm text-error">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center border border-ink bg-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-canvas hover:text-ink"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({
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
