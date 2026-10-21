import { engagements, formatPrice } from "./data";
import { CTAButton, Reveal, SectionHead } from "./primitives";

export function Engagements() {
  return (
    <section className="bg-ink-gradient py-24 md:py-32" id="engagements">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead dark eyebrow="Engagements" title="Clear scope. Published pricing." intro="Scope, availability and commercial terms are confirmed before paid work begins. All prices in USD." />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.id} delay={i * 80} className="lift glass-dark flex flex-col rounded-2xl p-7">
              <h3 className="min-h-14 text-xl font-semibold text-ink-foreground">{e.title}</h3>
              <p className="mt-5 font-display text-3xl font-semibold text-ink-foreground">{formatPrice(e)}</p>
              <p className="mt-3 flex-1 text-sm text-ink-muted">{e.fixedScope ? `Fixed scope · ${e.duration}` : `${e.minimumMonths}-month minimum`}</p>
              <CTAButton to="/contact" variant="light" className="mt-7 self-start">Start a conversation</CTAButton>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
