import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_TAGLINE } from "@/data/brand";

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Mobile: kein Autoplay-Video (LCP/Bandbreite). Desktop: erst nach Idle.
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const enable = () => setShowVideo(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(enable, 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative pt-28 pb-12 overflow-hidden min-h-screen flex items-center">
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          style={{ zIndex: 0 }}
        >
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>
      )}

      <div className="absolute inset-0 bg-background/85" style={{ zIndex: 1 }} />

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent"
        style={{ zIndex: 2 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <p className="inline-flex items-center px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium">
            {SITE_TAGLINE}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-gradient-silver">
            Elektrik &amp; Energie
            <br className="hidden sm:block" />
            {" "}in Peine.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm md:text-lg text-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Ihr Elektriker in Peine und Umgebung für Neubau, Sanierung,
          Photovoltaik, Wallbox und Smart Home – persönlich beraten, sauber ausgeführt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="/kontakt"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-teal to-green text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-teal/25 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Projekt besprechen"
          >
            Kostenlose Beratung
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a
            href="/leistungen"
            className="w-full sm:w-auto px-8 py-3 border-2 border-teal/50 text-primary rounded-full text-sm font-medium hover:bg-teal/15 hover:border-teal transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Alle Leistungen ansehen"
          >
            Alle Leistungen
          </a>
        </motion.div>
      </div>
    </main>
  );
};

export default HeroSection;
