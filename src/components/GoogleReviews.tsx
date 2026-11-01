import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  FEATURABLE_WIDGET_ID,
  FEATURABLE_SCRIPT_URL,
  GOOGLE_WRITE_REVIEW_URL,
  GOOGLE_PROFILE_URL,
} from "@/data/reviews";

const FEATURABLE_SCRIPT_ID = "featurable-bundle";

const FEATURABLE_ORIGINS = [
  "https://featurable.com",
  "https://api.featurable.com",
  "https://lh3.googleusercontent.com",
] as const;

function ensurePreconnect(href: string) {
  if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = href;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

function loadFeaturableScript() {
  if (document.getElementById(FEATURABLE_SCRIPT_ID)) return;

  FEATURABLE_ORIGINS.forEach(ensurePreconnect);

  const script = document.createElement("script");
  script.id = FEATURABLE_SCRIPT_ID;
  script.src = FEATURABLE_SCRIPT_URL;
  script.defer = true;
  script.charset = "UTF-8";
  document.body.appendChild(script);
}

const GoogleReviews = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = widgetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        loadFeaturableScript();
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32" aria-label="Kundenstimmen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal border border-teal/20 mb-4">
            Kundenstimmen
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gradient-silver">
            Was unsere Kunden sagen
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 min-h-[200px]"
        >
          <div
            ref={widgetRef}
            id={FEATURABLE_WIDGET_ID}
            data-featurable-async
            data-location-code="de"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300 w-full sm:w-auto"
          >
            Bei Google bewerten <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card text-primary text-sm font-medium rounded-full hover:border-teal/40 transition-all duration-300 w-full sm:w-auto"
          >
            Alle Bewertungen ansehen <ExternalLink className="w-4 h-4 text-teal" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviews;
