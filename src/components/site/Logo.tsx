import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ dark }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Caveldon home">
      <svg viewBox="0 0 32 32" className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[8deg]">
        <defs>
          <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--steel)" />
            <stop offset="1" stopColor="var(--periwinkle)" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#lg)" />
        <path d="M9 19.5a4 4 0 0 1 1.2-7.8 5.5 5.5 0 0 1 10.4 1.3A3.3 3.3 0 0 1 23 19.5Z" fill="var(--background)" opacity=".95" />
        <path d="M11 23h10" stroke="var(--background)" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
      </svg>
      <span className={cn("font-display text-[15px] font-semibold tracking-[0.22em]", dark ? "text-ink-foreground" : "text-slate")}>CAVELDON</span>
    </Link>
  );
}
