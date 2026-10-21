import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, Reveal } from "@/components/site/primitives";
import { labDesigns } from "@/components/site/data";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Engineering Lab — Cloud Reference Designs | CAVELDON" },
      { name: "description", content: "Engineering Lab reference designs for cloud platforms, security controls, reliability and cloud cost efficiency. Not client delivery." },
      { property: "og:title", content: "CAVELDON Engineering Lab" },
      { property: "og:description", content: "AWS and Azure engineering reference designs, explicitly not client delivery." },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <>
      <PageHero eyebrow="Engineering Lab" title="Engineering Lab reference designs." intro="Cloud platform, security and operational reference designs — not client delivery." />
      <section className="mx-auto max-w-6xl space-y-8 px-6 py-24">
        {labDesigns.map((c) => (
          <Reveal key={c.id}>
            <article className="lift glass grid gap-10 rounded-3xl p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-sky px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-steel">{c.category}</span>
                  <span className="text-sm text-muted-foreground">{c.label}</span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold leading-snug md:text-3xl">{c.title}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{c.summary}</p>
              </div>
              <div className="grid content-center gap-4">
                {c.principles.map((principle, i) => (
                  <div key={principle} className="flex items-start gap-4 border-b border-border pb-4 last:border-0">
                    <span className="font-mono text-xs text-periwinkle">0{i + 1}</span>
                    <span className="font-display text-lg font-medium text-slate">{principle}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <CTASection />
    </>
  );
}
