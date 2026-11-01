import { GraduationCap, ShieldCheck, MessageSquare, Sparkles, Leaf, Heart } from "lucide-react";
import { motion } from "framer-motion";
import smartHomeImage from "@/assets/smart-home.webp";
import { SITE_NAME } from "@/data/brand";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const BentoGrid = () => {
  return (
    <section id="vertrauen" className="py-24 md:py-32" aria-label={`Warum ${SITE_NAME}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-gradient-silver">
            Warum {SITE_NAME}?
          </h2>
          <p className="text-foreground text-base md:text-lg max-w-xl">
            Ihr Elektriker in Peine für Elektrik, Energie und Smart Home – klar beraten und sauber umgesetzt.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1 - Large with Image */}
          <motion.div 
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2 rounded-3xl border border-border bg-card/20 card-hover relative overflow-hidden group focus-within:ring-2 focus-within:ring-teal"
          >
            <div className="absolute inset-0">
              <img
                src={smartHomeImage}
                alt=""
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            </div>
            <div className="relative z-10 p-8">
              <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mb-6 text-teal group-hover:border-teal/30 transition-colors">
                <GraduationCap className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-primary mb-3">Durchdacht geplant, handwerklich stark</h3>
              <p className="text-foreground leading-relaxed max-w-md">
                Als Elektroingenieur und Handwerker verbinden wir präzise Planung mit sauberer Ausführung – damit Ihre Elektrik sicher und zukunftsfähig ist.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="col-span-1 p-8 rounded-3xl border border-border bg-card/20 card-hover group focus-within:ring-2 focus-within:ring-teal"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mb-6 text-teal group-hover:border-teal/30 transition-colors">
              <MessageSquare className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Auf Augenhöhe</h3>
            <p className="text-foreground leading-relaxed">
              Wir erklären Ihnen technische Details so, dass Sie sie wirklich verstehen. Egal wie tief Sie im Thema stecken: Wir beraten Sie verständlich und direkt, damit Sie bei Ihrem Projekt immer ein gutes Gefühl haben.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="col-span-1 p-8 rounded-3xl border border-border bg-card/20 card-hover group focus-within:ring-2 focus-within:ring-teal"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mb-6 text-teal group-hover:border-teal/30 transition-colors">
              <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Qualitätsversprechen</h3>
            <p className="text-foreground leading-relaxed">
              Verlässliche Terminplanung, saubere Baustellen und klare Absprachen – jede Anlage wird penibel geprüft und eingemessen.
            </p>
          </motion.div>

          {/* Card 4 - Large */}
          <motion.div 
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2 p-8 rounded-3xl border border-border bg-card/20 card-hover flex flex-col md:flex-row gap-8 items-start md:items-center group focus-within:ring-2 focus-within:ring-teal"
          >
            <div className="flex-1">
              <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mb-6 text-teal group-hover:border-teal/30 transition-colors">
                <Sparkles className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-primary mb-3">Herstellerunabhängig</h3>
              <p className="text-foreground leading-relaxed">
                Wir arbeiten mit den besten Systemen am Markt – unabhängig vom Hersteller. So bekommen Sie genau die Lösung, die zu Ihrem Zuhause passt, ohne Kompromisse.
              </p>
            </div>
            <div className="w-full md:w-48 h-32 flex items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center text-teal">
                <Heart className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center text-teal">
                <Leaf className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full bg-teal/30 border border-teal/40 flex items-center justify-center text-teal">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;