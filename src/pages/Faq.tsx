import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { SITE_URL } from "@/components/SEO";
import { faqItems } from "@/data/faq";

const Faq = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: `${SITE_URL}/faq`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="FAQ – Häufige Fragen zum Elektriker in Peine"
        description="Antworten auf häufige Fragen zu Einsatzgebiet, Angebot, E-Check, Smart Home und einzelnen Elektroarbeiten von Elektiger."
        path="/faq"
        keywords="FAQ Elektriker Peine, häufige Fragen Elektrofachbetrieb, E-Check Fragen, Smart Home Fragen, Einsatzgebiet Peine"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <HelpCircle className="w-3 h-3" />
              FAQ
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
              Häufige Fragen
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Kurze Antworten zu den häufigsten Anliegen. Weitere Fragen klären wir gern
              persönlich – per Anruf, WhatsApp oder Kontaktformular.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
