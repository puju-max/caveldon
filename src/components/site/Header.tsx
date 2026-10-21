import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Engineering Lab" },
  { to: "/soc-2", label: "SOC 2" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-3" : "py-5")}>
        <div className={cn("mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500", scrolled ? "glass mx-4 py-2.5 md:mx-auto" : "py-2")}>
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-slate" activeProps={{ className: "text-slate bg-sky" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden rounded-full bg-slate px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-ink sm:inline-flex">Start a conversation</Link>
            <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="relative z-[60] grid h-10 w-10 place-items-center rounded-full border border-mist bg-card/70 text-slate lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      <div className={cn("fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm transition-opacity duration-500 lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} onClick={() => setOpen(false)} />
      <aside className={cn("fixed right-0 top-0 z-50 flex h-full w-[86%] max-w-sm flex-col bg-background px-8 pb-10 pt-28 shadow-[var(--shadow-lift)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] lg:hidden", open ? "translate-x-0" : "translate-x-full")}>
        <nav className="flex flex-col gap-1">
          {[{ to: "/", label: "Home" }, ...nav, { to: "/contact", label: "Contact" }].map((n, i) => (
            <Link key={n.to} to={n.to} className={cn("border-b border-border py-4 font-display text-2xl text-slate transition-all duration-500", open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0")} style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="mt-auto rounded-full bg-slate py-4 text-center font-medium text-primary-foreground">Start a conversation</Link>
      </aside>
    </>
  );
}
