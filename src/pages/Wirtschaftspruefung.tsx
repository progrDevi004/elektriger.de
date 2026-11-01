import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Scale, ArrowRight, Users, Building2, Award, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const positions = [
  "Wirtschaftsprüfer (m/w/d)",
  "Audit Manager (m/w/d)",
  "Prüfungsleiter (m/w/d)",
  "Partner Audit (m/w/d)",
  "Director Audit (m/w/d)",
  "Senior Auditor (m/w/d)"
];

const benefits = [
  { icon: ShieldCheck, title: "WP-Expertise", text: "Spezialisierung auf WP-Gesellschaften und Prüfungsabteilungen" },
  { icon: Users, title: "Premium-Netzwerk", text: "Netzwerk zu führenden Kanzleien und Unternehmen" },
  { icon: Award, title: "Karriereverständnis", text: "Verständnis für WP-Examen und Karrierewege" },
  { icon: Sparkles, title: "Diskretion", text: "Vertrauliche und professionelle Vermittlung" }
];

const targetCompanies = [
  "Big-4 Wirtschaftsprüfungsgesellschaften",
  "Next-10 und mittelständische WP-Gesellschaften",
  "Spezialisierte Prüfungsgesellschaften",
  "Interne Revisionsabteilungen in Konzernen"
];

const mandateTypes = [
  "PIE-Mandate",
  "Kapitalmarktprüfungen",
  "Mittelstandsprüfungen",
  "Konzernabschlüsse",
  "Sonderprüfungen",
  "IT-Audit"
];

const Wirtschaftspruefung = () => {
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
              Spezialisierung Audit
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-8">
              <span className="text-foreground">Wirtschafts-</span>
              <br />
              <span className="text-primary">prüfung</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Prüfungsleiter, Audit Manager und Partner für WP-Gesellschaften und Prüfungsabteilungen. Erfahrene Wirtschaftsprüfer für anspruchsvolle Mandate.
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
              { value: "300+", label: "Vermittelte WPs" },
              { value: "92%", label: "Erfolgsquote" },
              { value: "PIE", label: "& Mittelstand" },
              { value: "12+", label: "Jahre Erfahrung" }
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
              Tiefes Verständnis für den WP-Markt – wir sprechen Ihre Sprache.
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
                Von der Assistenz bis zur Partnerschaft – wir kennen alle Karrierestufen in der Wirtschaftsprüfung.
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
                Unsere Mandanten
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Wir arbeiten mit Wirtschaftsprüfungsgesellschaften und Unternehmen unterschiedlicher Größenordnungen zusammen.
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
              Der WP-Markt im Fokus
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Der Markt für Wirtschaftsprüfer ist angespannt. Die Anzahl der Berufsexamen-Absolventen sinkt, während die regulatorischen Anforderungen an Prüfungsqualität steigen. Besonders gefragt sind erfahrene Manager und Senior Manager mit PIE-Erfahrung.
              </p>
              <p>
                Wir beobachten zudem einen verstärkten Wechsel von Kandidaten aus Big-4-Strukturen in mittelständische Gesellschaften, die oft bessere Work-Life-Balance und schnellere Karrierewege bieten. Gleichzeitig suchen Konzerne verstärkt nach erfahrenen Prüfern für ihre internen Revisionsabteilungen.
              </p>
              <p className="text-foreground font-medium">
                Unser Netzwerk und unsere Marktkenntnis ermöglichen es uns, auch in diesem kompetitiven Umfeld die richtigen Kandidaten zu identifizieren und anzusprechen.
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
                Lassen Sie uns sprechen
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
                Ob Sie als WP-Gesellschaft erfahrene Prüfer suchen oder als Kandidat den nächsten Karriereschritt planen – wir sind Ihr kompetenter Ansprechpartner.
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

export default Wirtschaftspruefung;