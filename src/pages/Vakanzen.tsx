import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, Scale, FileText, Briefcase, ChevronRight, MapPin, ArrowRight, ArrowUpDown } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";

interface Vakanz {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  job_type: string;
  is_remote: boolean | null;
}

const categories = ["Alle", "Finance", "Tax", "Audit", "Legal", "Advisory", "Consulting"];
const sortOptions = [
  { label: "Standard", value: "default" },
  { label: "Gehalt (aufsteigend)", value: "salary-asc" },
  { label: "Gehalt (absteigend)", value: "salary-desc" },
  { label: "Standort (A-Z)", value: "location-asc" }
];

const MIN_SALARY = 50;
const MAX_SALARY = 300;

const locations = ["Alle Standorte", "Berlin", "Düsseldorf", "Frankfurt", "Hamburg", "Köln", "München", "Stuttgart"];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Tax':
      return Calculator;
    case 'Audit':
      return Scale;
    case 'Legal':
      return FileText;
    default:
      return Briefcase;
  }
};

const parseSalaryMin = (salary: string): number => {
  const match = salary.match(/€?(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const Vakanzen = () => {
  const [vakanzen, setVakanzen] = useState<Vakanz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedLocation, setSelectedLocation] = useState("Alle Standorte");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([MIN_SALARY, MAX_SALARY]);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchVakanzen = async () => {
      const { data, error } = await supabase
        .from('vakanzen')
        .select('id, title, company, location, salary, category, job_type, is_remote')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching vakanzen:', error);
      } else {
        setVakanzen(data || []);
        
        // Calculate max salary from fetched data and set slider accordingly
        if (data && data.length > 0) {
          const maxSalaryFromData = Math.max(...data.map(v => parseSalaryMin(v.salary)));
          const roundedMax = Math.ceil(maxSalaryFromData / 10) * 10; // Round up to nearest 10
          const effectiveMax = Math.max(roundedMax, MAX_SALARY);
          setSalaryRange([MIN_SALARY, effectiveMax]);
        }
      }
      setIsLoading(false);
    };

    fetchVakanzen();
  }, []);

  const filteredAndSortedJobs = useMemo(() => {
    let result = [...vakanzen];

    // Filter by category
    if (selectedCategory !== "Alle") {
      result = result.filter(job => job.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== "Alle Standorte") {
      result = result.filter(job => job.location === selectedLocation);
    }

    // Filter by salary range
    result = result.filter(job => {
      const salaryMin = parseSalaryMin(job.salary);
      return salaryMin >= salaryRange[0] && salaryMin <= salaryRange[1];
    });

    // Sort
    switch (sortBy) {
      case "salary-asc":
        result.sort((a, b) => parseSalaryMin(a.salary) - parseSalaryMin(b.salary));
        break;
      case "salary-desc":
        result.sort((a, b) => parseSalaryMin(b.salary) - parseSalaryMin(a.salary));
        break;
      case "location-asc":
        result.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        break;
    }

    return result;
  }, [vakanzen, selectedCategory, selectedLocation, salaryRange, sortBy]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-gradient-silver">
              Aktuelle Vakanzen
            </h1>
            <p className="text-base md:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
              Exklusive Positionen bei führenden Kanzleien und Beratungshäusern deutschlandweit.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-teal/20 text-teal border border-teal/30' 
                    : 'border border-border text-foreground hover:border-teal/30 hover:text-teal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Salary Range & Sort Filters */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
            {/* Salary Range Slider */}
            <div className="w-full sm:w-80 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Gehalt</span>
                <span className="text-teal font-mono">€{salaryRange[0]}k - €{salaryRange[1]}k</span>
              </div>
              <Slider
                value={salaryRange}
                onValueChange={(value) => setSalaryRange(value as [number, number])}
                min={MIN_SALARY}
                max={MAX_SALARY}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>€{MIN_SALARY}k</span>
                <span>€{MAX_SALARY}k</span>
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary border border-border text-foreground hover:border-teal/30 focus:outline-none focus:border-teal/50 transition-all duration-300 cursor-pointer"
              >
                {locations.map((location) => (
                  <option key={location} value={location} className="bg-background text-foreground">
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary border border-border text-foreground hover:border-teal/30 focus:outline-none focus:border-teal/50 transition-all duration-300 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-background text-foreground">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <span className="text-sm text-muted-foreground">
              {isLoading ? 'Laden...' : `${filteredAndSortedJobs.length} ${filteredAndSortedJobs.length === 1 ? 'Position' : 'Positionen'} gefunden`}
            </span>
          </div>

          {/* Jobs Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card animate-pulse">
                <div className="h-10 w-10 rounded-xl bg-secondary mb-4" />
                <div className="h-5 w-3/4 bg-secondary rounded mb-2" />
                <div className="h-4 w-1/2 bg-secondary rounded mb-4" />
                <div className="h-4 w-full bg-secondary rounded" />
              </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {filteredAndSortedJobs.map((job) => {
                const IconComponent = getCategoryIcon(job.category);
                return (
                  <Link 
                    key={job.id}
                    to={`/vakanzen/${job.id}`}
                    className="group p-6 rounded-2xl border border-border bg-card hover:border-teal/30 hover:bg-card/80 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal">
                        <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div className="flex gap-2">
                        {job.is_remote && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal border border-teal/20">
                            Remote
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
                          {job.category}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-primary mb-1 group-hover:text-teal transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-foreground mb-4">{job.company}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5 text-foreground">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="text-teal font-mono text-xs">{job.salary}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-foreground group-hover:text-teal transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredAndSortedJobs.length === 0 && (
            <div className="text-center py-16 mb-16">
              <p className="text-foreground mb-4">Keine Positionen für diese Filterkriterien gefunden.</p>
              <button
                onClick={() => {
                  setSelectedCategory("Alle");
                  setSelectedLocation("Alle Standorte");
                  setSalaryRange([MIN_SALARY, MAX_SALARY]);
                  setSortBy("default");
                }}
                className="text-teal hover:text-teal/80 text-sm font-medium transition-colors"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center p-10 rounded-3xl border border-border bg-card">
            <h2 className="text-2xl font-medium text-primary mb-4">Nichts Passendes gefunden?</h2>
            <p className="text-foreground mb-8 max-w-lg mx-auto">
              Viele Positionen werden nicht öffentlich ausgeschrieben. Wir schlagen nur Vakanzen vor, 
              die Ihren Erwartungen und Zielen entsprechen. Kontaktieren Sie uns vertraulich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/cv-check"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border text-primary text-sm font-medium rounded-full hover:bg-secondary hover:border-teal/30 transition-all duration-300"
              >
                CV einreichen
              </a>
              <a 
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
              >
                Vertraulich anfragen <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Vakanzen;