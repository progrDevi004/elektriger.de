import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Cable, ArrowRight, Wrench, Lightbulb, Euro, Car, Sun } from "lucide-react";

const tools = [
  {
    icon: Cable,
    title: "Leiterquerschnitt-Rechner",
    description:
      "Kabel- und Leiterquerschnitt nach DIN VDE 0298-4 berechnen – inkl. Strombelastbarkeit, Spannungsfall, Verlegeart, Umgebungstemperatur und Häufung.",
    href: "/leiterquerschnitt",
    tag: "VDE 0298-4",
  },
  {
    icon: Car,
    title: "Wallbox-Leitungsrechner",
    description:
      "Kabelquerschnitt für Wallbox-Zuleitungen (3,7 / 11 / 22 kW) – vorkonfiguriert mit typischer Absicherung und NYM-Leitungshinweis.",
    href: "/wallbox-leitung",
    tag: "Wallbox",
  },
  {
    icon: Lightbulb,
    title: "Beleuchtungsrechner",
    description:
      "Leuchtenanzahl und Lichtstrom nach DIN 18015-2 und DIN EN 12464-1 – für Wohnzimmer, Küche, Bad, Arbeitszimmer und mehr.",
    href: "/beleuchtung",
    tag: "DIN 18015-2",
  },
  {
    icon: Euro,
    title: "Stromkostenrechner",
    description:
      "Stromverbrauch und Kosten pro Tag, Monat und Jahr berechnen – mit Geräte-Vorlagen und anpassbarem Strompreis.",
    href: "/stromkosten",
    tag: "kWh & €",
  },
  {
    icon: Sun,
    title: "Photovoltaik-Rechner",
    description:
      "Ertrag, Eigenverbrauch, Ersparnis und Amortisation einer PV-Anlage abschätzen – mit Speicheroption und realen Richtwerten für Niedersachsen.",
    href: "/photovoltaik",
    tag: "PV & Speicher",
  },
] as const;

const Tools = () => (
  <div className="min-h-screen bg-background text-foreground antialiased">
    <SEO
      title="Tools – Kabelquerschnitt, Photovoltaik, Beleuchtung & Stromkosten"
      description="Kostenlose Online-Tools für die Elektroplanung: Leiterquerschnitt nach VDE 0298-4, Wallbox-Kabel, Photovoltaik-Rechner, Beleuchtungsrechner und Stromkostenrechner von Elektiger."
      path="/tools"
      keywords="Elektro Tools, Kabelquerschnitt berechnen, Wallbox Kabelquerschnitt, Photovoltaik Rechner, Beleuchtungsrechner, Stromkostenrechner, VDE 0298-4, Elektroplanung Hilfsmittel"
    />
    <Navigation />

    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
            <Wrench className="w-3 h-3" />
            Tools
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
            Praktische <span className="text-gradient-silver">Hilfsmittel</span> für Ihre Planung.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Kostenlose Rechner und Werkzeuge rund um Elektrotechnik – schnell, übersichtlich und
            nach gängigen Normen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group relative block rounded-2xl border border-border bg-card hover:border-teal/40 transition-all duration-300 overflow-hidden p-6 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <span className="inline-block text-[11px] font-medium text-teal bg-teal/10 border border-teal/20 rounded-full px-2.5 py-0.5 mb-4">
                  {tool.tag}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-green flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <tool.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-lg font-medium text-primary mb-2 group-hover:text-teal transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Tool öffnen <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default Tools;
