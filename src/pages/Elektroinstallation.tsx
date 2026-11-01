import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Zap, Cable, Network, Gauge, ShieldCheck, Wrench, Lightbulb, PlugZap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Gauge, title: "Unterverteilung", description: "Planung und Aufbau moderner Stromkreisverteiler – übersichtlich, normgerecht und zukunftssicher." },
  { icon: Cable, title: "Leitungsverlegung", description: "Saubere Verkabelung im Neubau und Bestand – inkl. Schlitz-, Stemm- und Putzarbeiten." },
  { icon: Network, title: "Netzwerktechnik", description: "Strukturierte Verkabelung (LAN/WLAN), Patchfelder und Access Points für stabiles Heim- und Büronetzwerk." },
  { icon: PlugZap, title: "Steckdosen & Schalter", description: "Bedarfsgerechte Platzierung hochwertiger Schalterprogramme – funktional und ästhetisch." },
  { icon: Lightbulb, title: "Beleuchtungstechnik", description: "Innen- und Außenbeleuchtung, LED-Umrüstung und Lichtplanung für jede Anwendung." },
  { icon: ShieldCheck, title: "Schutz- & Messtechnik", description: "FI-/LS-Schalter, Überspannungsschutz und normgerechte Messprotokolle nach VDE." },
  { icon: Wrench, title: "Sanierung & Modernisierung", description: "Altanlagen erneuern, Sicherheit erhöhen, Energieeffizienz steigern." },
  { icon: Zap, title: "E-Mobilität & PV", description: "Wallboxen, PV-Anbindung und Energiemanagement aus einer Hand." },
];

const advantages = [
  "Zertifizierte Elektrofachkräfte – Arbeiten nach aktueller VDE-Norm",
  "Saubere Ausführung mit Liebe zum Detail",
  "Transparente Angebote und verlässliche Termine",
  "Ein Ansprechpartner von Planung bis Abnahme",
];

const Elektroinstallation = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Elektriker in Peine – Elektrik, Neubau & Sanierung"
        description="Elektriker in Peine für Elektrik im Neubau und Bestand: Installation, Sanierung, Zählerschrank, Netzwerk und Vorbereitung für Photovoltaik & Wallbox – sicher nach VDE."
        path="/elektroinstallation"
        keywords="Elektriker Peine, Elektrik Peine, Elektroinstallation Peine, Sanierung Elektrik, Neubau Elektrik, Elektrofachbetrieb Peine, Wallbox Peine"
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
                  <Zap className="w-3 h-3" />
                  Elektriker in Peine
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary leading-[1.1] mb-6 break-words">
                  Elektrik für Neubau
                  <br />
                  <span className="text-gradient-silver">&amp; Sanierung.</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                  Von der Unterverteilung bis zur Netzwerktechnik – sauber installiert, normgerecht nach VDE
                  und bereit für Photovoltaik, Wallbox und Smart Home.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-3">
                {features.slice(0, 4).map((feat) => (
                  <div key={feat.title} className="flex flex-col items-center justify-center p-5 rounded-2xl border border-border bg-background/50 text-center">
                    <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center mb-3">
                      <feat.icon className="w-5 h-5 text-teal" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-primary">{feat.title}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-medium text-gradient-silver">Unser Leistungsspektrum</h2>
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
            <h2 className="text-2xl font-medium text-primary mb-4">Elektroprojekt geplant?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Ob Neubau, Sanierung oder Erweiterung – wir beraten Sie unverbindlich und planen Ihre Anlage zukunftssicher.
            </p>
            <a href="/kontakt" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300">
              Beratung anfragen <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Elektroinstallation;
