import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Briefcase, TrendingUp, Clock, CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Briefcase,
    title: "Erfahrene Manager",
    description: "Interim-Führungskräfte mit nachweisbarer Erfolgsbilanz in vergleichbaren Situationen."
  },
  {
    icon: TrendingUp,
    title: "Sofortige Wirkung",
    description: "Schnelle Einarbeitung und unmittelbare Übernahme von Verantwortung."
  },
  {
    icon: Clock,
    title: "Flexible Einsätze",
    description: "Von 3 Monaten bis zu mehreren Jahren – angepasst an Ihre Bedürfnisse."
  },
  {
    icon: CheckCircle,
    title: "Messbare Ergebnisse",
    description: "Klare KPIs und transparente Berichterstattung während des gesamten Mandats."
  }
];

const InterimManagement = () => {
  return (
    <div className="min-h-screen bg-background text-zinc-400 antialiased selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-medium text-primary tracking-tight mb-6">
              Interim Management
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Überbrücken Sie Vakanzen mit erfahrenen Führungskräften auf Zeit.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-teal group-hover:border-teal/30 transition-colors">
                  <benefit.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{benefit.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a 
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal to-green text-white font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 hover:scale-[1.02] transition-all duration-300"
            >
              Interim Manager anfragen <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InterimManagement;