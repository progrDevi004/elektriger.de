import { motion } from "framer-motion";
import { useCountUp, parseStatValue } from "@/hooks/useCountUp";
import { Zap, Home, ShieldCheck } from "lucide-react";

const stats = [
  { value: "30+", label: "Projekte realisiert", icon: Zap },
  { value: "30%", label: "Energieeinsparung", icon: Home, prefix: "Bis zu" },
  { value: "100%", label: "VDE-konform", icon: ShieldCheck },
];

const AnimatedStat = ({ value, label, icon: Icon, prefix: extraPrefix, index }: { 
  value: string; label: string; icon: React.ElementType; prefix?: string; index: number;
}) => {
  const { prefix, number, suffix } = parseStatValue(value);
  const { count, ref } = useCountUp(number, 2000);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-500 overflow-hidden h-full flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative mb-3 md:mb-4">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-teal to-green flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={1.5} />
          </div>
        </div>
        {extraPrefix && (
          <p className="relative text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{extraPrefix}</p>
        )}
        <div className="relative mb-1 md:mb-2">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-silver drop-shadow-[0_0_25px_rgba(60,198,239,0.4)] group-hover:drop-shadow-[0_0_35px_rgba(60,198,239,0.6)] transition-all duration-500">
            {prefix}{count}{suffix}
          </span>
        </div>
        <div className="relative flex-1 flex flex-col justify-center">
          <p className="text-sm sm:text-base font-medium text-primary leading-snug">{label}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-green opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 md:py-32" aria-label="Zahlen und Fakten">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal border border-teal/20 mb-4">
            Unsere Erfolgsbilanz
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gradient-silver">
            Zahlen, die überzeugen
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} prefix={stat.prefix} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;