import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { ShieldCheck, AlertTriangle, FileCheck, Search, Flame, Home, ClipboardCheck, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Search, title: "Anlagencheck", description: "Systematische Prüfung Ihrer privaten Elektroinstallation auf Mängel und Gefahrenstellen." },
  { icon: AlertTriangle, title: "Gefahrenanalyse", description: "Identifikation von Brandrisiken, fehlerhaften Schutzmaßnahmen und veralteter Technik." },
  { icon: FileCheck, title: "E-Check Prüfung", description: "Fachgerechter E-Check mit kompletter Dokumentation." },
  { icon: ClipboardCheck, title: "Versicherungsdokumentation", description: "Rechtssicheres Prüfprotokoll – akzeptiert von Versicherern und Sachverständigen." },
  { icon: Flame, title: "Brandschutz", description: "Frühzeitiges Erkennen elektrotechnischer Brandursachen – Schutz für Familie und Eigentum." },
  { icon: Lock, title: "Schutzmaßnahmen", description: "FI-Schalter, Überspannungsschutz und Erdungssysteme prüfen und nachrüsten." },
  { icon: Home, title: "Sicheres Wohnen", description: "Sorgenfrei leben mit der Gewissheit: Ihre Elektrik ist auf dem aktuellen Stand der Technik." },
  { icon: ShieldCheck, title: "Beratung & Empfehlung", description: "Klare Handlungsempfehlung bei Mängeln – Priorität, Aufwand, Kosten transparent." },
];

const advantages = [
  "Zertifizierter E-Check",
  "Rechtssichere Dokumentation für Ihre Versicherung",
  "Erfahrene Elektrofachkräfte – objektiv und unabhängig",
  "Klare Empfehlungen statt Verkaufsdruck",
];

const ECheck = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="E-Check in Peine – Elektrik prüfen lassen"
        description="E-Check und Elektroprüfung in Peine: Ihre Elektrik fachgerecht prüfen lassen – Gefahren erkennen, Versicherung absichern, sorgenfrei wohnen."
        path="/e-check"
        keywords="E-Check Peine, Elektrik prüfen Peine, Elektroprüfung Peine, Elektriker Peine E-Check, Sicherheitsprüfung Elektro"
      />
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative mb-24 overflow-hidden rounded-3xl bg-card border border-border">
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-green blur-3xl" />
            </div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-14">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6 w-fit">
                  <ShieldCheck className="w-3 h-3" />
                  E-Check
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary leading-[1.1] mb-6 break-words">
                  Sicherheit &amp;
                  <br />
                  <span className="text-gradient-silver">Gefahrenprävention.</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                  Wir prüfen Ihre private Elektroinstallation fachgerecht – Gefahrenstellen rechtzeitig
                  erkennen, Versicherung absichern, sorgenfrei wohnen.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-3">
                {features.slice(0, 4).map((feat) => (
                  <div key={feat.title} className="flex flex-col items-center justify-center p-5 rounded-2xl border border-border bg-background/50 text-center">
                    <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center mb-3">
                      <feat.icon className="w-5 h-5 text-teal" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-primary text-center">{feat.title}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-medium text-gradient-silver">Was wir prüfen</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((feat, index) => (
                <motion.div key={feat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="group p-5 rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mb-4 text-teal group-hover:border-teal/30 transition-colors">
                    <feat.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-medium text-primary mb-2">{feat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-medium text-primary text-center mb-12">Warum Elektiger?</h2>
            <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
              {advantages.map((point, index) => (
                <div key={index} className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-teal/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal text-sm font-medium">✓</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center p-10 rounded-3xl border border-border bg-card">
            <h2 className="text-2xl font-medium text-primary mb-4">Prüfung anfragen</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Lassen Sie Ihre Elektroinstallation vom Experten prüfen – für ein sicheres Zuhause und versicherungsrelevante Dokumentation.
            </p>
            <a href="/kontakt" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300">
              Termin vereinbaren <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ECheck;
