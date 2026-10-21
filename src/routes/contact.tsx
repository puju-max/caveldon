import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { FileDown, MapPin, ClipboardCheck } from "lucide-react";
import { PageHero, Reveal } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { brand, engagements, formatPrice } from "@/components/site/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Start a Conversation | CAVELDON" },
    { name: "description", content: "Discuss your AWS or Azure infrastructure with Pujan Patel. Cloud Readiness Review: $2,500, fixed scope, 1–2 weeks." },
    { property: "og:title", content: "Start a Conversation with CAVELDON" },
    { property: "og:description", content: "Founder-led cloud engineering based in India. Explore a scoped Cloud Readiness Review for $2,500." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please enter a message").max(1000, "Keep it under 1000 characters"),
});
type Inquiry = z.infer<typeof schema>;

function Contact() {
  const [form, setForm] = useState<Inquiry>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [prepared, setPrepared] = useState(false);
  const review = engagements.find((e) => e.id === "readiness");
  const set = (key: keyof Inquiry, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setPrepared(false);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: typeof errors = {};
      result.error.issues.forEach((issue) => { next[issue.path[0] as keyof Inquiry] ??= issue.message; });
      setErrors(next);
      return;
    }
    const { name, email, message } = result.data;
    const blob = new Blob([`CAVELDON inquiry\nName: ${name}\nEmail: ${email}\n\n${message}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "caveldon-inquiry.txt";
    link.click();
    URL.revokeObjectURL(url);
    setPrepared(true);
  };
  const field = "w-full rounded-xl border bg-card/80 px-4 py-3 text-slate outline-none transition focus:border-periwinkle focus:ring-4 focus:ring-lavender/25";
  return (
    <>
      <PageHero eyebrow="Contact" title="Start a conversation." intro="Describe your situation in your own words. We can help define the technical problem before discussing a solution." />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="glass rounded-3xl p-8 md:p-10">
          <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
            {(["name", "email"] as const).map((key) => (
              <div key={key}>
                <label htmlFor={key} className="mb-2 block text-sm font-medium text-slate">{key === "name" ? "Name" : "Email"}</label>
                <input id={key} autoComplete={key} type={key === "email" ? "email" : "text"} value={form[key]} onChange={(e) => set(key, e.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} className={cn(field, errors[key] ? "border-destructive" : "border-input")} />
                {errors[key] && <p id={`${key}-error`} className="mt-2 text-xs text-destructive">{errors[key]}</p>}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate">Message</label>
              <textarea id="message" rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby="privacy-note" className={cn(field, "resize-y", errors.message ? "border-destructive" : "border-input")} />
              {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
              <p id="privacy-note" className="mt-3 text-sm leading-relaxed text-muted-foreground">Never send passwords, access keys, personal health information or client data through this form.</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">Online message delivery is not connected yet. You can save your inquiry as a draft; nothing is sent.</p>
            <Button type="submit" className="h-auto rounded-full bg-slate px-6 py-3.5 text-primary-foreground hover:bg-ink sm:col-span-2 sm:justify-self-start"><FileDown /> Save inquiry draft</Button>
            {prepared && <p role="status" className="text-sm text-steel sm:col-span-2">Your inquiry draft has been downloaded. No message has been sent.</p>}
          </form>
        </Reveal>
        <div className="space-y-6">
          {review && <Reveal delay={100} className="rounded-3xl bg-ink-gradient p-8">
            <ClipboardCheck className="h-7 w-7 text-lavender" />
            <p className="mt-5 font-mono text-xs uppercase text-lavender">Entry point</p>
            <h2 className="mt-3 text-xl font-semibold text-ink-foreground">{review.title}</h2>
            <p className="mt-4 font-display text-3xl font-semibold text-ink-foreground">{formatPrice(review)}</p>
            <p className="mt-2 text-ink-muted">Fixed scope · {review.duration}</p>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">Scope, availability and commercial terms are confirmed before paid work begins.</p>
          </Reveal>}
          <Reveal delay={180} className="glass rounded-3xl p-8">
            <div className="flex items-center gap-3 text-slate"><MapPin className="h-5 w-5 shrink-0 text-steel" /> India · IST, UTC+5:30</div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{brand.hours}</p>
            <p className="mt-5 font-display font-semibold text-slate">{brand.founder}</p>
            <p className="mt-1 text-sm text-muted-foreground">{brand.role}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
