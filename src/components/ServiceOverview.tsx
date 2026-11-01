import { Home, Zap, ShieldCheck, ClipboardList, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Zap,
    number: "01",
    title: "Elektrik & Installation",
    subtitle: "Neubau & Sanierung",
    description: "Ihr Elektriker für Neubau, Modernisierung und Sanierung – von der Unterverteilung bis zur Netzwerktechnik, sicher nach VDE.",
    link: "/elektroinstallation",
  },
  {
    icon: Home,
    number: "02",
    title: "Smart Home",
    subtitle: "Komfort & Steuerung",
    description: "Intelligente Haussteuerung für Licht, Heizung, Beschattung und Sicherheit – herstellerunabhängig und auf Ihren Alltag zugeschnitten.",
    link: "/smart-home",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "E-Check & Sicherheit",
    subtitle: "Prüfung & Dokumentation",
    description: "Fachgerechter E-Check Ihrer Elektrik – Gefahrenstellen erkennen, Versicherung absichern, sorgenfrei wohnen.",
    link: "/e-check",
  },
  {
    icon: ClipboardList,
    number: "04",
    title: "Bauüberwachung Elektro",
    subtitle: "Für Bauherren & Bauunternehmer",
    description: "Unabhängige Kontrolle der Elektroarbeiten Ihrer Elektroprojekte – Qualität, Normen und Abnahme im Blick.",
    link: "/planung-bauleitung",
  },
];

const ServiceOverview = () => {
  return (
    <section className="py-16 md:py-24" aria-label="Unsere Leistungen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium text-teal uppercase tracking-widest mb-3">
            Elektriker in Peine
          </p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-gradient-silver">
            Elektrik, Energie &amp; Smart Home
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45 }}
            >
              <Link
                to={service.link}
                className="group relative block h-full rounded-2xl border border-border bg-card hover:border-teal/40 transition-all duration-300 overflow-hidden p-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <span className="text-[11px] font-mono text-muted-foreground mb-4 block">
                    {`{ ${service.number} }`}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-green flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-primary mb-1 group-hover:text-teal transition-colors leading-snug sm:min-h-[3.5rem]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-teal/80 mb-3 sm:min-h-[2.5rem]">{service.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Mehr erfahren <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal to-green opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceOverview;
