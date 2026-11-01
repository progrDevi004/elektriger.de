import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { SITE_URL } from "@/components/SEO";
import { BUSINESS_ID } from "@/data/site";
import { getStandorteOrdered } from "@/data/standorte";
import { SITE_NAME } from "@/data/brand";

const Einsatzgebiet = () => {
  const standorte = getStandorteOrdered();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 52.321,
          longitude: 10.233,
        },
        geoRadius: "50000",
      },
      ...standorte.map((ort) => ({
        "@type": "City",
        name: ort.name,
      })),
    ],
    url: `${SITE_URL}/einsatzgebiet`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Einsatzgebiet – Elektriker Peine und Umgebung"
        description="Einsatzgebiet von Elektiger: Peine und Umgebung im Umkreis von ca. 50 km – u. a. Ilsede, Burgdorf, Hannover, Braunschweig, Hildesheim, Salzgitter und Wolfenbüttel."
        path="/einsatzgebiet"
        keywords="Elektriker Peine Umgebung, Elektriker Ilsede, Elektriker Burgdorf, Elektriker Hannover, Elektriker Braunschweig, Elektriker Hildesheim, Elektriker Salzgitter, Elektriker Wolfenbüttel"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <MapPin className="w-3 h-3" />
              Region Peine · ca. 50 km
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary mb-5 leading-tight">
              Einsatzgebiet
              <br />
              <span className="text-gradient-silver">Peine und Umgebung.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Firmensitz ist Peine. Von hier aus betreuen wir Projekte in etwa 50 km Umkreis –
              mit persönlicher Beratung vor Ort und klaren Absprachen. Wählen Sie Ihren Ort für
              passende Informationen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {standorte.map((ort, index) => (
              <motion.div
                key={ort.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  to={`/elektriker/${ort.slug}`}
                  className="group block h-full rounded-2xl border border-border bg-card p-6 hover:border-teal/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-xl font-medium text-primary group-hover:text-teal transition-colors">
                      Elektriker {ort.name}
                    </h2>
                    {ort.isHomeBase && (
                      <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-teal/10 text-teal border border-teal/20 shrink-0">
                        Firmensitz
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {ort.lageHinweis}
                  </p>
                  <p className="text-xs text-muted-foreground/80 mb-4">
                    {ort.anfahrt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-teal">
                    Zur Ortsseite <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center p-10 rounded-3xl border border-border bg-card">
            <h2 className="text-2xl font-medium text-primary mb-4">
              Ihr Ort ist nicht dabei?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Innerhalb von ca. 50 km um Peine sind wir oft flexibel. Schreiben Sie uns einfach –
              wir sagen Ihnen ehrlich, ob wir kommen können.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all"
            >
              Kurz nachfragen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Einsatzgebiet;
