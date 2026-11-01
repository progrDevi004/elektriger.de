import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Building, ChevronRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

const HorizontalVakanzenSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [vakanzen, setVakanzen] = useState<Vakanz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVakanzen = async () => {
      const { data, error } = await supabase
        .from('vakanzen')
        .select('id, title, company, location, salary, category, job_type, is_remote')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setVakanzen(data);
      }
      setIsLoading(false);
    };

    fetchVakanzen();
  }, []);

  useEffect(() => {
    if (isLoading || vakanzen.length === 0) return;

    const scrollContainer = scrollRef.current;
    const trigger = triggerRef.current;

    if (!scrollContainer || !trigger) return;

    // Calculate the scroll distance
    const scrollWidth = scrollContainer.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = scrollWidth - viewportWidth + 100;

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top 25%",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Refresh after layout settles
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [isLoading, vakanzen]);

  if (isLoading) {
    return (
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-8 w-48 bg-secondary rounded" />
            <div className="h-4 w-64 bg-secondary rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (vakanzen.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden" aria-label="Aktuelle Vakanzen">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-gradient-silver">
              Aktuelle Vakanzen
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Exklusive Positionen bei führenden Kanzleien.
            </p>
          </div>
          <Link
            to="/vakanzen"
            className="hidden md:flex items-center gap-2 text-primary hover:text-teal transition-colors text-sm font-medium group"
          >
            Alle Vakanzen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div ref={triggerRef} className="relative">
        <div 
          ref={scrollRef} 
          className="flex gap-6 pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        >
          {vakanzen.map((vakanz, index) => (
            <Link
              key={vakanz.id}
              to={`/vakanzen/${vakanz.id}`}
              className="group flex-shrink-0 w-[320px] md:w-[400px] rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-300 overflow-hidden hover:shadow-xl"
            >
              {/* Card Header with gradient */}
              <div 
                className="p-6 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(168 76% 36%) 0%, hsl(155 60% 35%) 50%, hsl(142 55% 38%) 100%)"
                }}
              >
                {/* Number badge */}
                <span className="absolute top-4 right-4 text-xs font-mono text-white/60">
                  {"{ " + String(index + 1).padStart(2, '0') + " }"}
                </span>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">
                    {vakanz.category}
                  </span>
                  {vakanz.is_remote && (
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">
                      Remote
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg md:text-xl font-medium text-white leading-tight line-clamp-2 min-h-[56px]">
                  {vakanz.title}
                </h3>
              </div>
              
              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{vakanz.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{vakanz.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-primary bg-secondary px-2 py-1 rounded">
                      {vakanz.salary}
                    </span>
                    <span className="px-2 py-1 rounded-full border border-border text-xs text-muted-foreground">
                      {vakanz.job_type}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-teal group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
          
          {/* View All Card */}
          <Link
            to="/vakanzen"
            className="group flex-shrink-0 w-[280px] md:w-[320px] rounded-2xl border border-border bg-card hover:border-teal/30 transition-all duration-300 flex items-center justify-center"
          >
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg font-medium text-primary group-hover:text-teal transition-colors">
                Alle Vakanzen
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Entdecken Sie mehr
              </p>
            </div>
          </Link>
          
          {/* Spacer for end padding */}
          <div className="flex-shrink-0 w-6" />
        </div>
      </div>

    </section>
  );
};

export default HorizontalVakanzenSection;
