import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Users, Clock, Shield, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Zielgenaue Suche",
    description: "Wir identifizieren passive Kandidaten, die perfekt zu Ihrer Position passen."
  },
  {
    icon: Users,
    title: "Exklusives Netzwerk",
    description: "Zugang zu C-Level Führungskräften und Top-Spezialisten im DACH-Raum."
  },
  {
    icon: Clock,
    title: "Schnelle Besetzung",
    description: "Erste qualifizierte Profile innerhalb von 7 Arbeitstagen."
  },
  {
    icon: Shield,
    title: "Garantierte Qualität",
    description: "6 Monate Nachbesetzungsgarantie auf alle Platzierungen."
  }
];

const ExecutiveSearch = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-medium text-primary tracking-tight mb-6">
              Executive Search
            </h1>
            <p className="text-base md:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
              Wir finden die besten Führungskräfte für Ihr Unternehmen. Diskret, schnell und passgenau.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-teal group-hover:border-teal/30 transition-colors">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a 
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal to-green text-white font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 hover:scale-[1.02] transition-all duration-300"
            >
              Suchauftrag starten <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExecutiveSearch;