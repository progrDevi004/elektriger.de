import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MessageSquare, Search, Users, CheckCircle, Handshake, ArrowRight, Target, Clock, TrendingUp } from "lucide-react";

const processSteps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Briefing & Analyse",
    description: "Wir verstehen Ihre Anforderungen, Kanzleikultur und die spezifischen Herausforderungen der Position.",
    duration: "Tag 1-2"
  },
  {
    number: "02",
    icon: Search,
    title: "Research & Direktansprache",
    description: "Diskrete Suche im Markt, Nutzung unseres Finance-Netzwerks und gezielte Ansprache passiver Kandidaten.",
    duration: "Tag 3-7"
  },
  {
    number: "03",
    icon: Users,
    title: "Vorqualifikation",
    description: "Prüfung von fachlicher Eignung, beruflichen Zielen, Persönlichkeit und Kanzlei-Fit.",
    duration: "Tag 8-14"
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Präsentation",
    description: "Vorstellung vorqualifizierter Kandidaten mit detaillierten Profilen und unserer Einschätzung.",
    duration: "Tag 15-18"
  },
  {
    number: "05",
    icon: Handshake,
    title: "Begleitung & Abschluss",
    description: "Unterstützung bei Vertragsverhandlungen und Onboarding für nachhaltige Besetzungen.",
    duration: "Tag 19+"
  }
];

const Prozess = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-gradient-silver">
              Unser Prozess
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Strukturiert, diskret und auf Perfect Match ausgerichtet – so finden wir die passenden Kandidaten.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative max-w-4xl mx-auto mb-24">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal/50 via-teal/20 to-transparent md:-translate-x-px" />

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-16 md:pl-0`}>
                    <div className="group p-6 rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4 md:justify-end">
                        <span className="text-xs font-mono text-teal/60">{step.duration}</span>
                      </div>
                      <h3 className="text-xl font-medium text-primary mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-teal/30 flex items-center justify-center text-teal z-10">
                    <step.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Mehrwert */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-medium text-primary text-center mb-12">Mehrwert für Kanzleien</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Weniger Fehlbesetzungen", desc: "Durch intensive Vorqualifikation", icon: Target },
                { title: "Weniger Interview-Aufwand", desc: "Nur passende Kandidaten", icon: Clock },
                { title: "Nachhaltige Besetzungen", desc: "Statt kurzfristiger Lösungen", icon: TrendingUp }
              ].map((item) => (
                <div key={item.title} className="text-center p-6 rounded-2xl border border-border bg-card">
                  <item.icon className="w-8 h-8 text-teal mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-medium text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a 
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
            >
              Prozess starten <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Prozess;
