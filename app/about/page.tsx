import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'FORM is a furniture studio in Copenhagen. We build configurable furniture from timber, stone, and steel.',
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-8xl px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
          <p className="eyebrow animate-fade-up">FORM Studio</p>
          <h1 className="display mt-6 max-w-3xl text-5xl text-ink sm:text-6xl lg:text-7xl animate-fade-up" style={{ animationDelay: '80ms' }}>
            We build furniture <span className="italic text-accent">for the room you already have.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft animate-fade-up" style={{ animationDelay: '160ms' }}>
            FORM is a furniture studio in Copenhagen, founded in 2019 by Mette
            Sørensen and Lars Bjerg. We make a small number of pieces — a chair,
            a lounge, a table, a sofa — and we make each one to the centimetre,
            to the material, and to the finish that you choose.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-8xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Philosophy</p>
              <h2 className="display mt-4 text-3xl text-ink sm:text-4xl">
                Fewer pieces, made better.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-6 text-base leading-relaxed text-ink-soft">
                <p>
                  We do not release collections every season. We do not chase
                  trends. We design four pieces and we refine them, year after
                  year, until they are right. The FORM Chair has been in
                  production since 2019; we have changed the joinery three times
                  and the seat curve twice.
                </p>
                <p>
                  Every FORM piece is built to order. Nothing is stocked. When
                  you configure a chair, we cut the timber for that chair, join
                  it by hand, and finish it to your specification. The lead time
                  is long because the work is slow.
                </p>
                <p>
                  We believe furniture should outlast the room it was made for.
                  A FORM table is designed to be the table in your dining room
                  for thirty years — and then the table in someone else&apos;s.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="border-b border-line bg-canvas-2/30">
        <div className="mx-auto max-w-8xl px-5 py-24 sm:px-8 lg:px-12">
          <p className="eyebrow">Materials</p>
          <h2 className="display mt-4 text-3xl text-ink sm:text-4xl">
            Sourced honestly, worked by hand.
          </h2>
          <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'European Oak', origin: 'Burgundy, France', note: 'Air-dried for 18 months before it reaches the bench.' },
              { name: 'American Walnut', origin: 'Missouri, USA', note: 'FSC-certified, selected for figure and colour.' },
              { name: 'Carrara Marble', origin: 'Tuscany, Italy', note: 'Cut from the same quarry Michelangelo used.' },
              { name: 'Brushed Steel', origin: 'Aalborg, Denmark', note: 'Powder-coated in our own workshop.' },
              { name: 'Aniline Leather', origin: 'Tuscany, Italy', note: 'Full-grain, tanned with oak bark.' },
              { name: 'Belgian Linen', origin: 'Flanders, Belgium', note: 'Washed and tumble-dried for a soft hand.' },
            ].map((m) => (
              <div key={m.name} className="bg-canvas p-8">
                <h3 className="font-serif text-xl font-light text-ink">{m.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-accent">{m.origin}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-8xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Craftsmanship</p>
              <h2 className="display mt-4 text-3xl text-ink sm:text-4xl">
                The bench, the chisel, the hand.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-6 text-base leading-relaxed text-ink-soft">
                <p>
                  Every FORM piece is joined by hand. We use mortise-and-tenon
                  joints for chairs, dovetails for drawers, and dowel joints for
                  tables. No screws, no metal brackets, no glue in structural
                  joints. The wood holds the wood.
                </p>
                <p>
                  Each piece is finished by a single maker, from rough timber to
                  final oil. We sign each piece with the maker&apos;s initials
                  and the date, stamped under the seat or the tabletop.
                </p>
                <p>
                  Our workshop is a converted boathouse on Refshaleøen, in
                  Copenhagen harbour. Twelve makers, four designers, one dog
                  named Otto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="border-b border-line bg-canvas-2/30">
        <div className="mx-auto max-w-8xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Customization</p>
              <h2 className="display mt-4 text-3xl text-ink sm:text-4xl">
                Your decisions, our hands.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-6 text-base leading-relaxed text-ink-soft">
                <p>
                  Customization is not a feature. It is the premise. We do not
                  make a chair and then let you pick a colour. We make your
                  chair, to your dimensions, in your material, with your finish.
                  The configurator is the design tool — the order is the
                  drawing.
                </p>
                <p>
                  Every dimension is cut to the centimetre. If your room needs a
                  table that is 218 centimetres long, we cut a table that is 218
                  centimetres long. The price adjusts honestly — you pay for the
                  material and the labour, by the centimetre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-8xl px-5 py-32 text-center sm:px-8 lg:px-12">
          <h2 className="display text-4xl text-ink sm:text-5xl">
            Configure a piece.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Start with a chair, a lounge, a table, or a sofa — and make it yours.
          </p>
          <Link
            href="/configure/form-chair"
            className="group mt-10 inline-flex items-center gap-2 border border-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            Begin configuring
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
