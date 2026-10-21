import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal } from "@/components/site/primitives";
import { posts } from "@/components/site/data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Insights — AWS Production Readiness & Cloud Governance | Caveldon" },
      { name: "description", content: "AWS production readiness, cloud governance and audit readiness, Elastic Beanstalk vs ECS, and repeatable infrastructure-as-code deployments." },
      { property: "og:title", content: "Caveldon Insights" },
      { property: "og:description", content: "Production readiness, cloud governance, container platforms and repeatable AWS deployments." },
    ],
  }),
  component: Insights,
});

function Insights() {
  const feature = posts[0];
   if (!feature) return null;
  const rest = posts.slice(1);
  return (
    <>
      <PageHero eyebrow="Insights" title="Field notes from production." intro="AWS production readiness, cloud governance, container platforms and repeatable deployments." />
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <article className="lift group grid gap-8 overflow-hidden rounded-3xl bg-ink-gradient p-8 md:grid-cols-2 md:p-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-lavender">Featured · {feature.tag}</span>
              <h2 className="mt-5 text-2xl font-semibold leading-snug text-ink-foreground md:text-4xl">{feature.title}</h2>
              <p className="mt-5 text-ink-muted">{feature.excerpt}</p>
            </div>
            <div className="glass-dark grid place-items-center rounded-2xl p-6">
              <div className="grid w-full grid-cols-3 gap-2">
                {Array.from({ length: 27 }).map((_, i) => <span key={i} className={`h-6 rounded ${i % 5 === 3 ? "bg-periwinkle/50" : "bg-ink-foreground/10"}`} />)}
              </div>
            </div>
          </article>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <article className="lift group flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <span className="font-mono text-[11px] uppercase tracking-wider text-periwinkle">{p.tag}</span>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>

              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
