import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Code2, Users, PieChart, Briefcase, Building, ChevronRight } from "lucide-react";
import heroFinance from "@/assets/hero-finance.jpg";
const jobs = [
  {
    icon: Code2,
    title: "CTO / Technischer Leiter",
    company: "FinTech Scale-up",
    location: "Berlin (Hybrid)",
    salary: "€180k - €220k",
    type: "Vollzeit",
    color: "indigo"
  },
  {
    icon: Users,
    title: "Head of HR",
    company: "Enterprise SaaS",
    location: "München",
    salary: "€110k - €140k",
    type: "Vollzeit",
    color: "teal"
  },
  {
    icon: PieChart,
    title: "Senior Product Manager",
    company: "Logistics",
    location: "Hamburg",
    salary: "€95k - €115k",
    type: "Remote",
    color: "orange"
  },
  {
    icon: Briefcase,
    title: "VP Engineering",
    company: "AI Startup",
    location: "Berlin",
    salary: "€150k - €200k",
    type: "Vollzeit",
    color: "indigo"
  },
  {
    icon: Building,
    title: "CFO",
    company: "E-Commerce",
    location: "Frankfurt",
    salary: "€200k - €280k",
    type: "Vollzeit",
    color: "teal"
  }
];

const getColorClasses = (color: string) => {
  const colors: Record<string, string> = {
    indigo: "bg-indigo/15 text-indigo border-indigo/20",
    teal: "bg-teal/15 text-teal border-teal/20",
    orange: "bg-orange/15 text-orange border-orange/20",
  };
  return colors[color] || colors.indigo;
};

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero with Image */}
          <div className="relative rounded-3xl overflow-hidden mb-20">
            <img 
              src={heroFinance} 
              alt="Jobbörse" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent flex items-center">
              <div className="p-8 md:p-12 max-w-xl">
                <h1 className="text-4xl md:text-6xl font-medium text-primary tracking-tight mb-4">
                  Jobbörse
                </h1>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  Entdecken Sie exklusive Führungspositionen bei Top-Arbeitgebern.
                </p>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="flex flex-col">
            {jobs.map((job, index) => (
              <a 
                key={index}
                href="#"
                className="group border-t border-white/5 py-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-all duration-300 px-4 -mx-4 rounded-lg"
              >
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className={`w-10 h-10 rounded-full ${getColorClasses(job.color)} flex items-center justify-center border`}>
                    <job.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white group-hover:text-teal transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-foreground">{job.company} • {job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 md:gap-12">
                  <div className="text-sm text-foreground font-mono">{job.salary}</div>
                  <div className="px-3 py-1 rounded-full border border-white/10 text-xs text-foreground">{job.type}</div>
                  <ChevronRight className="w-5 h-5 text-foreground group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
              </a>
            ))}
            <div className="border-t border-white/5" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;