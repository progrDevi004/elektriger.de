import { Leaf, Lightbulb, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    icon: Leaf,
    title: "Energiesparen",
    description: "Intelligente Heizkurven, tageslichtabhängige Beschattung und Steuerung von PV-Eigenverbrauch (Wallbox/Speicher).",
  },
  {
    icon: Lightbulb,
    title: "Komfort",
    description: "Automatisierte Szenarien wie «Gute Nacht» oder «Urlaub» – Steuerung per Sprache oder App.",
  },
  {
    icon: ShieldCheck,
    title: "Sicherheit",
    description: "Vernetzte Rauchmelder, Anwesenheitssimulation, Videoüberwachung und Alarme bei Einbruch oder Wasserschäden.",
  },
  {
    icon: Heart,
    title: "Ambient Assisted Living",
    description: "Assistenzsysteme für selbstbestimmtes Leben im Alter – Sturzerkennung, Herd-Abschaltung, einfache Bedienung.",
  },
];

const NutzenFokus = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30" aria-label="Ihr Mehrwert">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal border border-teal/20 mb-3">
            Ihr Mehrwert
          </span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-gradient-silver">
            Was moderne Elektrik für Sie tut
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground text-xs font-mono">{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-green flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>

              <h3 className="relative text-base font-medium text-primary mb-2 group-hover:text-teal transition-colors">
                {item.title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal to-green opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NutzenFokus;
