const nodes = [
  { x: 60, y: 70, label: "Edge / CDN", sub: "CloudFront" },
  { x: 60, y: 230, label: "Identity", sub: "IAM · SSO" },
  { x: 250, y: 150, label: "Load Balancer", sub: "ALB · WAF" },
  { x: 440, y: 70, label: "Compute", sub: "ECS · EKS" },
  { x: 440, y: 230, label: "Data", sub: "Aurora · S3" },
];

export function HeroDiagram() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[2rem] bg-lavender/20 blur-3xl" />
      <div className="relative glass rounded-3xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-mist" /><span className="h-2.5 w-2.5 rounded-full bg-mist" /><span className="h-2.5 w-2.5 rounded-full bg-mist" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">AWS · reference design</span>
        </div>
        <svg viewBox="0 0 560 310" className="w-full" role="img" aria-label="Animated AWS reference architecture diagram, not client delivery">
          <rect x="20" y="20" width="520" height="270" rx="18" fill="none" stroke="var(--mist)" strokeDasharray="4 6" />
          <text x="36" y="42" fontSize="10" fill="var(--muted-foreground)" fontFamily="JetBrains Mono, monospace">REFERENCE · AWS PLATFORM</text>
          {([[170, 95, 250, 165], [170, 255, 250, 175], [370, 165, 440, 95], [370, 175, 440, 255], [500, 120, 500, 220]] as [number, number, number, number][]).map(([a, b, c, d], i) => (
            <path key={i} d={`M${a} ${b} C ${(a + c) / 2} ${b}, ${(a + c) / 2} ${d}, ${c} ${d}`} fill="none" stroke="var(--periwinkle)" strokeWidth="1.5" className="flow" opacity=".7" />
          ))}
          {nodes.map((n, i) => (
            <g key={n.label} className="floaty" style={{ animationDelay: `${i * 0.6}s` }}>
              <rect x={n.x} y={n.y} width="120" height="52" rx="12" fill="var(--card)" stroke="var(--mist)" />
              <circle cx={n.x + 16} cy={n.y + 26} r="5" fill={i === 2 ? "var(--periwinkle)" : "var(--steel)"} className="pulse-soft" />
              <text x={n.x + 30} y={n.y + 23} fontSize="12" fontWeight="600" fill="var(--slate)" fontFamily="Inter Tight, Inter, sans-serif">{n.label}</text>
              <text x={n.x + 30} y={n.y + 38} fontSize="9.5" fill="var(--muted-foreground)" fontFamily="JetBrains Mono, monospace">{n.sub}</text>
            </g>
          ))}
        </svg>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[["Releases", "Controlled"], ["Access", "Scoped"], ["Evidence", "Traceable"]].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card/80 px-3 py-2.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="mt-0.5 font-display text-sm font-semibold text-slate">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
