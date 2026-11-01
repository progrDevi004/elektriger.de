import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Home, Zap, ClipboardList, Lightbulb, ShieldCheck, Leaf, Heart, ArrowRight } from "lucide-react";
import smartHomeImg from "@/assets/smart-home.webp";
import elektroinstallationImg from "@/assets/elektroinstallation.webp";
import profiServiceImg from "@/assets/profi-service.jpg";
import architektenServiceImg from "@/assets/architekten-service.webp";

const expertiseAreas = [
  {
    icon: Zap,
    title: "Elektrik & Installation",
    description: "Ihr Elektriker für Neubau, Sanierung und Modernisierung – von der Unterverteilung bis zur Netzwerktechnik, sicher nach VDE.",
    image: elektroinstallationImg,
    link: "/elektroinstallation"
  },
  {
    icon: Home,
    title: "Smart Home",
    description: "Intelligente Haussteuerung für Licht, Heizung, Beschattung und Sicherheit – herstellerunabhängig und auf Ihren Alltag zugeschnitten.",
    image: smartHomeImg,
    link: "/smart-home"
  },
  {
    icon: ShieldCheck,
    title: "E-Check & Sicherheit",
    description: "Fachgerechter E-Check Ihrer Elektrik – Gefahrenstellen erkennen, Versicherung absichern, sorgenfrei wohnen.",
    image: profiServiceImg,
    link: "/e-check"
  },
  {
    icon: ClipboardList,
    title: "Bauüberwachung Elektro",
    description: "Unabhängige Kontrolle der Elektroarbeiten Ihrer Elektroprojekte– für Bauherren und Bauunternehmer, von der Vergabe bis zur Abnahme.",
    image: architektenServiceImg,
    link: "/planung-bauleitung"
  },
] as const;

const nutzenFokus = [
  {
    icon: Leaf,
    title: "Energiesparen",
    description: "Intelligente Heizkurven, tageslichtabhängige Beschattung und Steuerung von PV-Eigenverbrauch."
  },
  {
    icon: Lightbulb,
    title: "Komfort",
    description: "Automatisierte Szenarien wie «Gute Nacht» oder «Urlaub» – Steuerung per Sprache oder App."
  },
  {
    icon: ShieldCheck,
    title: "Sicherheit",
    description: "Vernetzte Rauchmelder, Anwesenheitssimulation, Videoüberwachung und Alarme bei Einbruch oder Wasserschäden."
  },
  {
    icon: Heart,
    title: "Ambient Assisted Living",
    description: "Assistenzsysteme für selbstbestimmtes Leben im Alter – Sturzerkennung, Herd-Abschaltung, einfache Bedienung."
  }
];

const Expertise = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Leistungen – Elektriker in Peine für Elektrik, Energie & Smart Home"
        description="Leistungen Ihres Elektrikers in Peine: Elektrik & Installation, Smart Home, E-Check, Photovoltaik/Wallbox und Bauüberwachung – alles aus einer Hand."
        path="/leistungen"
        keywords="Elektriker Peine Leistungen, Elektrik Peine, Smart Home Peine, E-Check Peine, Photovoltaik Peine, Wallbox Peine, Elektrofachbetrieb Peine"
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="relative rounded-3xl overflow-hidden mb-20">
            <img src={smartHomeImg} alt="Smart Home" className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent flex items-end">
              <div className="p-8 md:p-12 text-center w-full">
                <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 text-gradient-silver">
                  Elektrik, Energie &amp; Smart Home
                </h1>
                <p className="text-base md:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
                  Als Elektriker in Peine begleiten wir Sie von der Beratung bis zur Abnahme – klar, zuverlässig und aus einer Hand.
                </p>
              </div>
            </div>
          </div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {expertiseAreas.map((area) => (
              <a
                key={area.title}
                href={area.link}
                className="group rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={area.image as string} alt={area.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mb-4 text-teal group-hover:border-teal/30 transition-colors">
                    <area.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-3 group-hover:text-teal transition-colors">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{area.description}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Nutzen-Fokus */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal border border-teal/20 mb-4">
                Ihr Mehrwert
              </span>
              <h2 className="text-3xl md:text-4xl font-medium text-gradient-silver">
                Was Smart Home für Sie tut
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nutzenFokus.map((item, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal to-green opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground text-sm font-mono">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-teal to-green flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>

                  <h3 className="relative text-lg font-medium text-primary mb-2 group-hover:text-teal transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="relative text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-green opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
              Projekt besprechen <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Expertise;