import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Cpu, Award, MessageSquare, ShieldCheck, ArrowRight, MapPin, Zap, Home, ClipboardCheck, Quote, User } from "lucide-react";
import { motion } from "framer-motion";
import beratungImg from "@/assets/architekten-service.webp";
import { teamMembers } from "@/data/team";
import { FORMER_NAME, SITE_NAME } from "@/data/brand";

const values = [
  {
    icon: Cpu,
    title: "Durchdacht & handwerklich stark",
    description: "Als Elektroingenieur und Handwerker planen wir systematisch und setzen präzise um – für sichere, zukunftsfähige Elektrik."
  },
  {
    icon: MessageSquare,
    title: "Auf Augenhöhe",
    description: "Verständliche, ehrliche und lösungsorientierte Beratung"
  },
  {
    icon: Award,
    title: "Qualität vor Quantität",
    description: "Jede Anlage wird penibel geprüft und eingemessen. Keine Kompromisse bei der Sicherheit."
  },
  {
    icon: ShieldCheck,
    title: "Zuverlässigkeit",
    description: "Saubere Baustellen, klare Absprachen und Pünktlichkeit – darauf können Sie sich verlassen."
  }
];

const philosophy = [
  "Herstellerunabhängige Beratung ohne versteckte Interessen",
  "Langfristiger Service mit Programmierung, Updates und Support",
  "Kombination aus Smart-Home-Expertise und klassischem Elektrohandwerk",
  "Klarer Fokus auf Energieeffizienz und Komfort"
];

const stats = [
  { icon: Zap, value: "Elektrik", label: "Installation & Sanierung" },
  { icon: Home, value: "Energie", label: "PV, Wallbox & Effizienz" },
  { icon: ClipboardCheck, value: "E-Check", label: "Prüfung & Dokumentation" },
  { icon: Cpu, value: "Smart Home", label: "Haussteuerung" }
];

const UeberUns = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Über uns – Elektriker in Peine für Elektrik & Energie"
        description={`${SITE_NAME}: Ihr Elektriker in Peine für Elektrik, Energie und Smart Home – persönlich, zuverlässig und mit Blick auf sichere, zukunftsfähige Lösungen.`}
        path="/ueber-uns"
        keywords={`Elektriker Peine, Elektrofachbetrieb Peine, Elektrik Peine, Elektrobetrieb Peine, ${SITE_NAME}, ${FORMER_NAME}`}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Modern Hero – text-driven, no image */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground text-xs mb-6">
                <MapPin className="w-3 h-3 text-teal" />
                Peine &bull; ganz Niedersachsen
              </div>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-primary leading-[1.1]">
                Elektriker in Peine
                <br />
                <span className="text-gradient-silver">für Elektrik &amp; Energie.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {SITE_NAME} (vormals {FORMER_NAME}) ist Ihr Ansprechpartner für Elektrik,
                Energie und Smart Home – klar beraten, sauber ausgeführt und persönlich betreut.
              </p>
            </motion.div>

            {/* Stat pills row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-5 h-5 text-teal" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Positioning */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gradient-silver">Unser Selbstverständnis</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Wir sind Elektriker aus Peine mit Fokus auf sichere Elektrik, smarte Energie und komfortables
              Wohnen. Als Elektroingenieur und Handwerker denken wir Lösungen zu Ende – und setzen sie
              praxisnah um.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Von der ersten Beratung über Installation und Prüfung bis zum langfristigen Service:
              ein Ansprechpartner, klare Absprachen, zuverlässige Termine.
            </p>
          </div>

          {/* Values */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-12 text-gradient-silver">Unsere Werte</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mx-auto mb-4 text-teal group-hover:border-teal/30 transition-colors">
                    <value.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-primary mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-medium text-primary text-center mb-12">Wie wir arbeiten</h2>
            <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
              {philosophy.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-teal/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal text-sm font-medium">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team – Personenprofile */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-3 text-gradient-silver">
              Das Team
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Hinter {SITE_NAME} stehen Menschen mit Leidenschaft für
              Technik und Handwerk. Lernen Sie uns kennen.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <Link
                  key={member.slug}
                  to={`/team/${member.slug}`}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-border bg-secondary flex items-center justify-center mb-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.imageAlt ?? member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={160}
                        height={160}
                      />
                    ) : (
                      <User className="w-8 h-8 text-teal" strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-primary group-hover:text-teal transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-teal mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {member.teaser}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-teal transition-colors">
                    Profil ansehen <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quote with Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border bg-card"
          >
            <div className="relative h-80 md:h-96 lg:h-auto">
              <img
                src={beratungImg}
                alt={`Beratung bei ${SITE_NAME}`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={1280}
                height={720}
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <Quote className="w-8 h-8 text-teal/40 mb-4" strokeWidth={1.5} />
              <blockquote className="text-lg md:text-xl text-primary leading-relaxed mb-6 italic">
                „Technik soll den Menschen dienen – nicht umgekehrt. Deshalb planen wir jede Anlage so,
                als wäre es unsere eigene."
              </blockquote>
              <div>
                <p className="text-sm font-medium text-primary">Eyyub-Abdulaziz Alici</p>
                <p className="text-xs text-muted-foreground">Gründer, {SITE_NAME}</p>
              </div>
            </div>
          </motion.div>
          <div className="text-center p-10 rounded-3xl border border-border bg-card">
            <h2 className="text-2xl font-medium text-primary mb-4">Projekt besprechen?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Ob Neubau, Sanierung oder Smart-Home-Nachrüstung – wir freuen uns auf Ihre Anfrage.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
            >
              Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UeberUns;
