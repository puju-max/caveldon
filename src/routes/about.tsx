import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/components/site/data";
import { Compass, FileCode2, Eye, Handshake } from "lucide-react";
import { CTASection, PageHero, Reveal, SectionHead } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About Pujan Patel — Founder-Led Cloud Engineering | CAVELDON" },
      { name: "description", content: "Meet Pujan Patel, Founder & Principal Cloud Engineer at CAVELDON, based in India and working across AWS and Azure." },
      { property: "og:title", content: "About Caveldon" },
      { property: "og:description", content: "A founder-led cloud and operational engineering practice based in India." },
    ],
  }),
  component: About,
});

const steps = [
  ["Discover", "Understand the situation and agree scope. Written findings make the technical problem clear."],
  ["Design", "Architecture decision records and diagrams your team reviews and owns before anything is built."],
  ["Build", "Work alongside your engineers, review changes, and keep infrastructure in code and version control."],
  ["Hand off", "Agree roles, access and handover expectations. Leave clear documentation and runbooks."],
];
const values = [
  { icon: Compass, t: "Clarity over cleverness", d: "The simplest architecture that meets the requirement wins." },
  { icon: FileCode2, t: "Everything as code", d: "If it isn't in version control, it doesn't exist." },
  { icon: Eye, t: "Radical transparency", d: "Shared channels, open docs, honest estimates." },
  { icon: Handshake, t: "Leave teams stronger", d: "We measure success by what your team can do without us." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="CAVELDON. Founder-led engineering." intro={brand.short} />
      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-[1fr_1.3fr] md:py-32">
        <Reveal>
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-3xl">
            <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full">
              <defs><linearGradient id="ab" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--sky)" /><stop offset="1" stopColor="var(--lavender)" stopOpacity=".5" /></linearGradient></defs>
              <rect width="200" height="250" fill="url(#ab)" />
              {[40, 80, 120, 160].map((y, i) => <path key={y} d={`M0 ${y + 40} Q 50 ${y} 100 ${y + 30} T 200 ${y + 20}`} fill="none" stroke="var(--steel)" strokeOpacity={0.15 + i * 0.1} />)}
            </svg>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-card/80 p-5 backdrop-blur">
              <div className="font-display font-semibold text-slate">{brand.founder}</div>
              <div className="text-sm text-muted-foreground">{brand.role}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <h2 className="text-3xl font-semibold md:text-4xl">{brand.founder}</h2>
          <p className="text-sm font-medium text-steel">{brand.role}</p>
          <p>{brand.bio}</p>
          <h3 className="text-xl font-semibold">Experience</h3>
          <p>{brand.experience}</p>
          <p className="text-slate">{brand.hours}</p>
          <p className="text-sm">Cloud infrastructure · Security and compliance readiness · Managed IT operations</p>
        </Reveal>
      </section>

      <section className="bg-ink-gradient py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead dark eyebrow="Methodology" title="How we work." />
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100} className="glass-dark rounded-2xl p-7">
                <span className="font-mono text-xs text-lavender">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-ink-foreground">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead eyebrow="Values" title="What we hold ourselves to." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 80} className="lift glass flex gap-5 rounded-2xl p-7">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky text-steel"><v.icon className="h-6 w-6" /></div>
              <div><h3 className="text-lg font-semibold">{v.t}</h3><p className="mt-2 text-muted-foreground">{v.d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
