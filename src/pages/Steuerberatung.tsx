import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Calculator, ArrowRight, Users, Target, Building2, Sparkles, BarChart3, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const positions = [
  "Steuerberater (m/w/d)",
  "Tax Manager (m/w/d)",
  "Senior Tax Consultant (m/w/d)",
  "Partner Tax (m/w/d)",
  "Head of Tax (m/w/d)",
  "Transfer Pricing Specialist (m/w/d)"
];

const benefits = [
  { icon: Target, title: "Deep Market Knowledge", text: "Tiefes Verständnis der steuerlichen Anforderungen und Karrierestufen" },
  { icon: Users, title: "Exklusives Netzwerk", text: "Direkter Zugang zu Top-Kandidaten aus Big-4 und Mittelstand" },
  { icon: BarChart3, title: "Marktexpertise", text: "Expertise bei Gehaltsstrukturen und Vergütungsmodellen" },
  { icon: Sparkles, title: "Premium Service", text: "Diskretion und persönliche Betreuung auf höchstem Niveau" }
];

const targetCompanies = [
  "Big-4 Gesellschaften (Deloitte, EY, KPMG, PwC)",
  "Next-10 und mittelständische Steuerberatungen",
  "Boutique-Kanzleien mit Spezialisierung",
  "Steuerabteilungen in Konzernen und Mittelstand"
];

const specializations = [
  "Unternehmenssteuer",
  "Transfer Pricing",
  "M&A Tax",
  "International Tax",
  "Umsatzsteuer",
  "Private Client"
];

const Steuerberatung = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <AnimatedBackground />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-medium text-foreground mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Spezialisierung Tax
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-8">
              <span className="text-primary">Steuerberatung</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Vermittlung von Steuerberatern, Tax Managern und Partnern für Kanzleien aller Größenordnungen – von Big-4 bis Boutique.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/kontakt" 
                className="px-8 py-3.5 bg-gradient-to-r from-teal to-green text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Vakanz besetzen <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/vakanzen" 
                className="px-8 py-3.5 border border-border text-foreground rounded-full text-sm font-medium hover:bg-muted hover:border-primary/50 transition-all duration-300 flex items-center justify-center"
              >
                Aktuelle Positionen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Vermittelte Steuerberater" },
              { value: "95%", label: "Erfolgsquote" },
              { value: "Big-4", label: "& Mittelstand" },
              { value: "15+", label: "Jahre Erfahrung" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-medium text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Bento Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              Warum mit uns arbeiten?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Spezialisierung macht den Unterschied – wir verstehen den Steuermarkt wie kein anderer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className={`group p-8 rounded-3xl border border-border bg-card hover:border-primary/30 hover:bg-muted/50 transition-all duration-500 relative overflow-hidden ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <benefit.icon className="w-32 h-32 text-primary" strokeWidth={0.5} />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:border-primary/40 transition-colors">
                    <benefit.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions Grid */}
      <section className="py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
                Positionen die wir besetzen
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Vom Berufseinsteiger bis zum Partner – wir kennen alle Karrierestufen im Steuerbereich und verstehen die unterschiedlichen Anforderungen.
              </p>
              
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div 
                    key={position}
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                      <span className="text-sm font-medium">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <span className="text-foreground font-medium">{position}</span>
                    <ArrowRight className="w-4 h-4 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
                Für wen wir arbeiten
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Wir unterstützen Kanzleien und Unternehmen unterschiedlicher Größenordnungen bei der Suche nach steuerlichen Fachkräften.
              </p>
              
              <div className="space-y-4">
                {targetCompanies.map((company) => (
                  <div 
                    key={company}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center text-green flex-shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-muted-foreground pt-2">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insight */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal to-green flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-primary font-medium">Markteinblick</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-8">
              Der Steuermarkt im Wandel
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Der Fachkräftemangel im Steuerbereich ist real. Besonders gefragt sind Kandidaten mit abgeschlossenem Steuerberaterexamen, internationaler Erfahrung und Spezialisierungen in Bereichen wie Transfer Pricing, M&A Tax oder Umsatzsteuer.
              </p>
              <p>
                Gleichzeitig beobachten wir einen Trend zu flexibleren Arbeitsmodellen: Remote Work, reduzierte Arbeitszeiten und alternative Karrierewege gewinnen an Bedeutung. Kanzleien, die hier frühzeitig reagieren, haben Vorteile im War for Talent.
              </p>
              <p className="text-foreground font-medium">
                Wir beraten Sie gerne zu aktuellen Markttrends, realistischen Gehaltserwartungen und erfolgreichen Rekrutierungsstrategien im Steuerbereich.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal to-green">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            <div className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
                Ob Sie als Kanzlei Verstärkung im Bereich Steuerberatung suchen oder als Kandidat Ihre Karriere vorantreiben möchten – wir freuen uns auf Ihre Kontaktaufnahme.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/kontakt"
                  className="px-8 py-3 bg-white text-gray-900 rounded-full text-sm font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/vakanzen"
                  className="px-8 py-3 border border-white/30 text-white rounded-full text-sm font-medium hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                >
                  Aktuelle Vakanzen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Steuerberatung;