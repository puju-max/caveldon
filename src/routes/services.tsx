import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CTASection, PageHero, Reveal } from "@/components/site/primitives";
import { services } from "@/components/site/data";
import { Engagements } from "@/components/site/Engagements";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Services & Pricing — AWS and Azure Engineering | CAVELDON" },
      { name: "description", content: "Cloud and platform engineering, technical security and governance readiness, FinOps and operational engineering on AWS and Azure. Published engagement pricing." },
      { property: "og:title", content: "Caveldon Services" },
      { property: "og:description", content: "AWS and Azure cloud platforms, technical security controls, FinOps and operational engineering." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Focused practices for production-grade cloud." intro="Cloud, platform and product engineering for growing software businesses. Scope, availability and commercial terms are confirmed before paid work begins." />
      {services.map((s, idx) => {
        const dark = idx === 1;
        return (
          <section key={s.id} id={s.id} className={cn("py-24 md:py-32", dark && "bg-ink-gradient")}>
            <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
              <Reveal>
                <div className={cn("grid h-14 w-14 place-items-center rounded-2xl", dark ? "glass-dark text-lavender" : "bg-sky text-steel")}><s.icon className="h-7 w-7" /></div>
                <span className={cn("mt-6 block font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "text-lavender" : "text-periwinkle")}>0{idx + 1}</span>
                <h2 className={cn("mt-2 text-3xl font-semibold md:text-5xl", dark && "text-ink-foreground")}>{s.title}</h2>
                <p className={cn("mt-6 text-lg leading-relaxed", dark ? "text-ink-muted" : "text-muted-foreground")}>{s.long}</p>
                <ul className="mt-8 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className={cn("flex items-start gap-3", dark ? "text-ink-foreground" : "text-slate")}>
                      <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", dark ? "bg-periwinkle/30 text-lavender" : "bg-sky text-steel")}><Check className="h-3 w-3" /></span>{p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120} className={cn("rounded-3xl p-8 md:p-10", dark ? "glass-dark" : "glass")}>
                <h3 className={cn("font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "text-lavender" : "text-muted-foreground")}>Our approach</h3>
                <ol className="relative mt-8 space-y-7">
                  <span className={cn("absolute left-[15px] top-2 bottom-2 w-px", dark ? "bg-ink-foreground/15" : "bg-mist")} />
                  {s.approach.map((a, i) => (
                    <li key={a} className="relative flex items-center gap-5">
                      <span className={cn("relative z-10 grid h-8 w-8 place-items-center rounded-full font-mono text-xs", dark ? "bg-ink text-lavender ring-1 ring-ink-foreground/20" : "bg-card text-steel ring-1 ring-mist")}>{i + 1}</span>
                      <span className={cn("font-display text-lg font-medium", dark ? "text-ink-foreground" : "text-slate")}>{a}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </section>
        );
      })}
      <Engagements />
      <CTASection />
    </>
  );
}
