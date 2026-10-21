import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHead } from "./primitives";

export function FAQSection({ items }: { items: string[][] }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <SectionHead center eyebrow="FAQ" title="Common questions." />
      <Reveal className="mt-12 glass rounded-2xl px-6">
        <Accordion type="single" collapsible>
          {items.map(([question, answer]) => (
            <AccordionItem key={question} value={question ?? ""}>
              <AccordionTrigger className="text-left font-display text-base text-slate">{question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
