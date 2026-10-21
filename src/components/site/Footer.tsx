import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { brand } from "./data";

export function Footer() {
  const cols = [
    { title: "Services", links: [["/services", "Cloud & Platform Engineering"], ["/soc-2", "Security & SOC 2 Readiness"], ["/services", "FinOps & Operations"]] },
    { title: "Practice", links: [["/about", "About Pujan Patel"], ["/work", "Engineering Lab"], ["/insights", "Insights"], ["/contact", "Contact"]] },
  ] as const;
  return (
    <footer className="bg-ink-gradient">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">{brand.short}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">{brand.description}</p>
          </div>
          {cols.map((col) => <div key={col.title}>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-lavender">{col.title}</h4>
            <ul className="mt-5 space-y-3">{col.links.map(([to, label]) => <li key={label}><Link to={to} className="text-sm text-ink-muted transition hover:text-ink-foreground">{label}</Link></li>)}</ul>
          </div>)}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-lavender">Founder-led</h4>
            <p className="mt-5 text-sm font-medium text-ink-foreground">{brand.founder}</p>
            <p className="mt-2 text-sm text-ink-muted">{brand.role}</p>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">{brand.hours}</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-ink-foreground/10 pt-8 text-xs text-ink-muted md:flex-row">
          <span>&copy; {new Date().getFullYear()} CAVELDON. All rights reserved.</span>
          <span className="font-mono">India &middot; IST &middot; UTC+5:30</span>
        </div>
      </div>
    </footer>
  );
}
