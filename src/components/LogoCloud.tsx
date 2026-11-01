import { Scale, Calculator, FileText, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const specializations = [
  { icon: Calculator, name: "Steuerberatung", label: "Tax", number: "01", link: "/steuerberatung" },
  { icon: Scale, name: "Wirtschaftsprüfung", label: "Audit", number: "02", link: "/wirtschaftspruefung" },
  { icon: FileText, name: "Rechtsberatung", label: "Legal", number: "03", link: "/rechtsberatung" },
  { icon: Briefcase, name: "Unternehmensberatung", label: "Advisory", number: "04", link: "/unternehmensberatung" },
];

const LogoCloud = () => {
  return (
    <section className="mt-24 border-y border-border py-16 bg-black/20" aria-label="Unsere Spezialisierungen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-medium text-primary uppercase tracking-widest mb-12"
        >
          Unsere Spezialisierung
        </motion.p>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {specializations.map(({ icon: Icon, name, label, number, link }) => (
            <motion.div
              key={name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to={link}
                className="relative overflow-hidden ring-1 ring-[hsl(var(--teal))]/40 text-white rounded-xl p-5 group cursor-pointer transition-all duration-300 hover:ring-[hsl(var(--teal))] hover:scale-[1.02] block focus:outline-none focus:ring-2 focus:ring-teal"
                style={{
                  background: "linear-gradient(135deg, hsl(168 76% 36%) 0%, hsl(155 60% 35%) 50%, hsl(142 55% 38%) 100%)"
                }}
                aria-label={`${name} - ${label}`}
              >
                {/* Radial gradient overlay for depth */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(200px 200px at 30% 30%, rgba(255,255,255,0.15), transparent 60%), radial-gradient(250px 250px at 80% 80%, rgba(0,0,0,0.2), transparent 60%)"
                  }}
                />
                
                {/* Number indicator */}
                <div className="relative flex items-center justify-between">
                  <span className="text-[11px] text-white/80">{"{ " + number + " }"}</span>
                </div>
                
                {/* Content */}
                <div className="relative mt-6">
                  <p className="font-medium text-white tracking-tight">{name}</p>
                  <p className="text-white/90 text-sm">{label}</p>
                </div>
                
                {/* Icon button */}
                <div className="relative mt-8 h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-white/90 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-4 w-4 text-[hsl(168,76%,30%)]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoCloud;
