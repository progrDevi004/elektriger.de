import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BarChart3, FileText, TrendingUp, Download, ArrowRight } from "lucide-react";

const studies = [
  {
    title: "Tech & IT Gehaltsstudie 2024",
    description: "Umfassende Analyse der Vergütungen im Tech-Sektor für alle Karrierestufen.",
    icon: BarChart3
  },
  {
    title: "FinTech Leadership Report",
    description: "C-Level Gehälter und Boni im FinTech-Bereich im DACH-Raum.",
    icon: TrendingUp
  },
  {
    title: "Start-up Compensation Guide",
    description: "Equity, Gehälter und Benefits bei Scale-ups und Start-ups.",
    icon: FileText
  }
];

const Gehaltsstudien = () => {
  return (
    <div className="min-h-screen bg-background text-zinc-400 antialiased selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-medium text-primary tracking-tight mb-6">
              Gehaltsstudien
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Datenbasierte Insights für Ihre Vergütungsstrategie und Gehaltsverhandlungen.
            </p>
          </div>

          {/* Studies List */}
          <div className="space-y-4 mb-20">
            {studies.map((study) => (
              <div 
                key={study.title}
                className="group p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal shrink-0 group-hover:border-teal/30 transition-colors">
                    <study.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{study.title}</h3>
                    <p className="text-zinc-400 text-sm">{study.description}</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-zinc-300 text-sm font-medium rounded-full hover:bg-white/5 hover:border-white/20 transition-all duration-300 shrink-0">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a 
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal to-green text-white font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 hover:scale-[1.02] transition-all duration-300"
            >
              Individuelle Studie anfordern <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gehaltsstudien;