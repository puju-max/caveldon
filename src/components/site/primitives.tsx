import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean | undefined }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "glass-dark text-lavender" : "border border-mist/60 bg-sky/60 text-steel")}>
      <span className="h-1.5 w-1.5 rounded-full bg-periwinkle pulse-soft" />
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, intro, dark, center }: { eyebrow: string; title: ReactNode; intro?: ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={cn("mt-5 text-3xl font-semibold leading-tight md:text-5xl", dark && "text-ink-foreground")}>{title}</h2>
      {intro && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-ink-muted" : "text-muted-foreground")}>{intro}</p>}
    </Reveal>
  );
}

type Btn = { to: string; children: ReactNode; variant?: "primary" | "ghost" | "light"; className?: string };
export function CTAButton({ to, children, variant = "primary", className }: Btn) {
  const styles = {
    primary: "bg-slate text-primary-foreground hover:bg-ink shadow-[var(--shadow-soft)]",
    ghost: "border border-mist bg-card/60 text-slate hover:border-lavender hover:bg-card",
    light: "bg-ink-foreground text-ink hover:bg-sky",
  }[variant];
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300", styles, className)}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-sky-gradient pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-lines" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="px-6 py-24">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink-gradient px-8 py-16 md:px-16 md:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-periwinkle/30 blur-3xl floaty" />
        <div className="relative grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-ink-foreground md:text-5xl">Ready to bring clarity to your cloud?</h2>
            <p className="mt-5 max-w-xl text-lg text-ink-muted">Describe your situation in your own words. Scope, availability and commercial terms are confirmed before paid work begins.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CTAButton to="/contact" variant="light">Start a conversation</CTAButton>
            <Link to="/work" className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-ink-foreground glass-dark transition hover:bg-ink-foreground/10">View engineering lab</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
