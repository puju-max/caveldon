import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { HeroDiagram } from "@/components/site/HeroDiagram";
import { CTAButton, CTASection, Eyebrow, Reveal, SectionHead } from "@/components/site/primitives";
import { services, labDesigns, homeFaq } from "@/components/site/data";
import { Engagements } from "@/components/site/Engagements";
import { FAQSection } from "@/components/site/FAQSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Caveldon — Engineering clarity for cloud infrastructure" },
      { name: "description", content: "Founder-led cloud and platform engineering for growing software businesses on AWS and Azure." },
      { property: "og:title", content: "Caveldon — Engineering clarity for cloud infrastructure" },
      { property: "og:description", content: "Founder-led AWS and Azure architecture, technical security readiness, and operational engineering." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-sky-gradient pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute inset-0 grid-lines" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <Eyebrow>Cloud & platform engineering consultancy</Eyebrow>
            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.02] md:text-7xl">
              Engineering <span className="text-gradient">clarity</span> for cloud infrastructure.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              We help startups and growing companies build, secure and operate production systems on AWS and Azure — with written findings, version-controlled infrastructure, and evidence that controls actually run.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTAButton to="/contact">Start a conversation</CTAButton>
              <CTAButton to="/work" variant="ghost">View engineering lab</CTAButton>
            </div>
          </Reveal>
          <Reveal delay={150}><HeroDiagram /></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHead eyebrow="Why Caveldon" title="Senior engineering. Clear decisions. Infrastructure you own." />
          <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>Most cloud problems aren't technical — they're clarity problems. Undocumented decisions, invisible costs, controls nobody can prove.</p>
            <p>We work embedded with your team, write everything as code, and leave behind systems and runbooks your engineers understand completely.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sky/50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow="Services" title="Three practices, one standard of craft." intro="Cloud platforms, technical security controls, and operational efficiency across AWS and Azure." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 100}>
                <Link to="/services" className="lift glass group flex h-full flex-col rounded-2xl p-8">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky text-steel transition group-hover:bg-periwinkle group-hover:text-accent-foreground"><s.icon className="h-6 w-6" /></div>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-steel">Learn more <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Engagements />

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Engineering Lab" title="Reference designs, not client delivery." />
          <Reveal><CTAButton to="/work" variant="ghost">View engineering lab</CTAButton></Reveal>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {labDesigns.map((c, i) => (
            <Reveal key={c.id} delay={i * 100}>
              <Link to="/work" className="lift group flex h-full flex-col rounded-2xl border border-border bg-card p-8">
                <span className="font-mono text-[11px] uppercase tracking-wider text-periwinkle">{c.category}</span>
                <h3 className="mt-4 text-xl font-semibold leading-snug">{c.title}</h3>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{c.label}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                <ul className="mt-6 space-y-2 border-t border-border pt-6">
                  {c.principles.map((principle) => <li key={principle} className="text-sm text-steel">{principle}</li>)}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FAQSection items={homeFaq} />
      <CTASection />
    </>
  );
}
