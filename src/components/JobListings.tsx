import { Calculator, Scale, FileText, ChevronRight, ArrowRight, MapPin, Building } from "lucide-react";
import { motion } from "framer-motion";

const jobs = [
  {
    icon: Calculator,
    title: "Senior Tax Manager (m/w/d)",
    company: "Big-4 Kanzlei",
    location: "Düsseldorf",
    salary: "€85k - €110k",
    type: "Vollzeit",
    tags: ["Hybrid", "Senior"],
  },
  {
    icon: Scale,
    title: "Prüfungsleiter Audit (m/w/d)",
    company: "Mittelständische WP-Gesellschaft",
    location: "Köln",
    salary: "€90k - €120k",
    type: "Vollzeit",
    tags: ["Vor Ort", "Lead"],
  },
  {
    icon: FileText,
    title: "Senior Associate M&A (m/w/d)",
    company: "Internationale Großkanzlei",
    location: "Frankfurt",
    salary: "€100k - €140k",
    type: "Vollzeit",
    tags: ["Hybrid", "M&A"],
  },
];

const JobListings = () => {
  return (
    <section id="positions" className="py-24 md:py-32" aria-label="Aktuelle Stellenangebote">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-primary tracking-tight mb-4">
              Aktuelle Vakanzen
            </h2>
            <p className="text-foreground text-base md:text-lg">Exklusive Positionen bei führenden Kanzleien.</p>
          </div>
          <a
            href="/vakanzen"
            className="hidden md:flex items-center gap-2 text-primary hover:text-teal transition-colors text-sm font-medium group focus:outline-none focus:text-teal"
            aria-label="Alle Vakanzen anzeigen"
          >
            Alle Vakanzen 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </a>
        </motion.div>

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
          className="border border-border rounded-xl overflow-hidden"
        >
          {jobs.map((job, index) => {
            const Icon = job.icon;
            const isLast = index === jobs.length - 1;
            return (
              <motion.a
                key={job.title}
                href="/vakanzen"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.4 }}
                className={`group ${!isLast ? 'border-b border-border' : ''} py-5 md:py-6 flex flex-col gap-4 md:flex-row md:items-center justify-between hover:bg-teal/5 transition-all duration-300 px-4 md:px-6 focus:outline-none focus:bg-teal/10`}
                aria-label={`${job.title} bei ${job.company} in ${job.location}, ${job.salary}`}
              >
                {/* Job Info */}
                <div className="flex items-start md:items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-teal/10 text-teal border border-teal/20 flex items-center justify-center shrink-0 group-hover:bg-teal/20 group-hover:border-teal/40 group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-medium text-primary group-hover:text-teal transition-colors leading-tight">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3 shrink-0" />
                        <span className="truncate">{job.company}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags & Details */}
                <div className="flex items-center justify-between md:justify-end gap-3 md:gap-6 pl-13 md:pl-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Tags - hidden on mobile for cleaner look */}
                    <div className="hidden sm:flex gap-2">
                      {job.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 rounded-full bg-teal/10 text-teal text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs md:text-sm text-foreground font-mono bg-secondary/50 px-2 md:px-3 py-1 rounded-lg">
                      {job.salary}
                    </div>
                    <div className="px-2 md:px-3 py-1 rounded-full border border-border text-xs text-foreground">
                      {job.type}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-teal group-hover:translate-x-1 transition-all duration-300 shrink-0" strokeWidth={1.5} />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 md:hidden text-center"
        >
          <a 
            href="/vakanzen" 
            className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-teal transition-colors focus:outline-none focus:text-teal"
          >
            Alle Vakanzen <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default JobListings;
