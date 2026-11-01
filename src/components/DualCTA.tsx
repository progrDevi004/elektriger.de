import { Home, Building2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import patternBg from "@/assets/pattern-bg.jpg";

const DualCTA = () => {
  return (
    <section className="py-24" aria-label="Call to Action">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-b from-teal/40 via-teal/10 to-transparent rounded-3xl blur-sm" />
          
          <div className="relative rounded-3xl bg-gradient-to-b from-secondary/80 to-card border border-teal/20 overflow-hidden">
            <div className="absolute inset-0">
              <img src={patternBg} alt="" className="w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-background/80 to-card" />
            </div>
            
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-40 bg-teal/15 blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
              {/* Left: Privatkunden */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-border/50 flex flex-col items-start justify-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-teal/20 text-teal flex items-center justify-center mb-6 group-hover:border-teal/40 group-hover:shadow-lg group-hover:shadow-teal/10 group-hover:scale-105 transition-all duration-300">
                  <Home className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3 text-gradient-silver">
                  Für Eigenheimbesitzer
                </h3>
                <p className="text-foreground/80 text-sm md:text-base mb-4 max-w-sm leading-relaxed">
                  Elektrik erneuern, Smart Home nachrüsten oder Energie smarter nutzen – wir machen Ihr Zuhause sicher und effizient.
                </p>
                <ul className="text-sm text-muted-foreground mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Elektrik im Neubau &amp; Bestand
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Photovoltaik, Wallbox &amp; Smart Home
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Persönlicher Service aus Peine
                  </li>
                </ul>
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Beratungsgespräch vereinbaren"
                >
                  Beratung anfragen <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </a>
              </motion.div>

              {/* Right: Gewerbekunden */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-10 md:p-14 flex flex-col items-start justify-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-border text-teal flex items-center justify-center mb-6 group-hover:border-teal/30 group-hover:shadow-lg group-hover:shadow-teal/10 group-hover:scale-105 transition-all duration-300">
                  <Building2 className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3 text-gradient-silver">
                  Für Gewerbekunden
                </h3>
                <p className="text-foreground/80 text-sm md:text-base mb-4 max-w-sm leading-relaxed">
                  E-Check, Bauüberwachung und zuverlässige Termine – für Hausverwaltungen, Bauträger und Bauunternehmer.
                </p>
                <ul className="text-sm text-muted-foreground mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    E-Check &amp; Dokumentation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Überwachung von Elektroarbeiten
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Klare Absprachen, termingerecht
                  </li>
                </ul>
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-teal/40 text-primary text-sm font-medium rounded-full hover:bg-teal/10 hover:border-teal hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Angebot anfordern"
                >
                  Angebot anfordern <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DualCTA;