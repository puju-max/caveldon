import { createFileRoute } from "@tanstack/react-router";
import { Lock, FileCheck2, Radar, KeyRound } from "lucide-react";
import { CTAButton, CTASection, PageHero, Reveal, SectionHead } from "@/components/site/primitives";
import { soc2Faq } from "@/components/site/data";
import { FAQSection } from "@/components/site/FAQSection";

export const Route = createFileRoute("/soc-2")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "SOC 2 Readiness — Technical Cloud Controls | CAVELDON" },
      { name: "description", content: "Technical controls, documentation, evidence and remediation on AWS and Azure to support independent SOC 2 review." },
      { property: "og:title", content: "SOC 2 Readiness by Caveldon" },
      { property: "og:description", content: "Technical AWS and Azure security readiness. Formal SOC 2 reports are provided by independent CPA firms." },
    ],
  }),
  component: Soc2,
});

const pillars = [
  { icon: KeyRound, t: "Access control", d: "Named user access, SSO, MFA, least privilege and reviewed access boundaries." },
  { icon: Lock, t: "Encryption & data", d: "Encryption, documented data boundaries and tested backups." },
  { icon: Radar, t: "Monitoring", d: "Activity logging, configuration checks, monitoring and operational alerting across AWS and Azure." },
  { icon: FileCheck2, t: "Change management", d: "Separated environments, reviewed changes, delivery checks and traceable deployment records." },
];
const timeline = [["Scope", "Define systems and owners"], ["Review", "Assess controls and gaps"], ["Remediate", "Implement and verify changes"], ["Evidence", "Prepare for independent review"]];

function Soc2() {
  return (
    <>
      <PageHero eyebrow="SOC 2 Readiness" title={<>Security controls, <span className="text-gradient">with evidence.</span></>} intro="Technical cloud controls, documentation, evidence and remediation on AWS and Azure. Independent auditors or appropriately qualified professionals provide formal audit reports, certifications and legal advice.">
        <div className="mt-9 flex flex-wrap gap-3">
          <CTAButton to="/contact">Get a readiness assessment</CTAButton>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead eyebrow="Trust Services Criteria" title="Controls implemented and documented." intro="A control inventory with named owners, scope boundaries, evidence collection and gap analysis against the framework." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 80} className="lift glass rounded-2xl p-7">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-steel"><p.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-gradient py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead dark eyebrow="Readiness process" title="Start with scope. Follow the evidence." intro="Timing depends on your starting point, access and the remediation required." />
          <div className="relative mt-16 grid gap-8 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-4 hidden h-px bg-ink-foreground/15 md:block" />
            {timeline.map(([w, t], i) => (
              <Reveal key={w} delay={i * 120} className="relative">
                <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-periwinkle font-mono text-xs text-accent-foreground">{i + 1}</span>
                <div className="mt-5 font-mono text-xs uppercase tracking-wider text-lavender">{w}</div>
                <div className="mt-1 font-display text-xl font-semibold text-ink-foreground">{t}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={soc2Faq} />
      <CTASection />
    </>
  );
}
