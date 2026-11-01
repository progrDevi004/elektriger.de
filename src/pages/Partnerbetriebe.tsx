import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Handshake, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getPartnerOrdered } from "@/data/partner";

const Partnerbetriebe = () => {
  const partner = getPartnerOrdered();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Partnerbetriebe – Gemeinsam für Ihr Projekt"
        description="Unsere Partnerbetriebe in der Region: Spezialisten, mit denen wir bei Sicherheitstechnik und verwandten Gewerken zusammenarbeiten – z. B. Alarm-Helden in Hildesheim."
        path="/partnerbetriebe"
        keywords="Partnerbetriebe Elektriker Peine, Alarm-Helden Hildesheim, Sicherheitstechnik Partner, Einbruchschutz Hildesheim"
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <Handshake className="w-3 h-3" />
              Netzwerk
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary mb-5 leading-tight">
              Partnerbetriebe
              <br />
              <span className="text-gradient-silver">Starke Spezialisten an unserer Seite.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Für manche Aufgaben braucht es zusätzliche Expertise – etwa bei
              Sicherheits- oder Heizungstechnik. Deshalb arbeiten wir mit
              ausgewählten Partnerbetrieben zusammen, denen wir vertrauen und die
              unsere Ansprüche an Qualität und Zuverlässigkeit teilen.
            </p>
          </div>

          <div className="space-y-5 mb-16">
            {partner.map((p, index) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl border border-border bg-card overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-8 p-6 md:p-10 items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h2 className="text-2xl md:text-3xl font-medium text-primary tracking-tight">
                        {p.name}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground px-2.5 py-1 rounded-full border border-border bg-background">
                        <MapPin className="w-3 h-3 text-teal" />
                        {p.ort}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                      {p.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 mb-6">
                      {p.schwerpunkte.map((s) => (
                        <li
                          key={s}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary px-3 py-1.5 rounded-full border border-border bg-background"
                        >
                          <ShieldCheck className="w-3 h-3 text-teal" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all"
                    >
                      Zur Website {p.websiteLabel}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {p.logoSrc && (
                    <a
                      href={p.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-2xl border border-border bg-white p-5 lg:p-6 hover:border-teal/40 transition-colors"
                      aria-label={`${p.name} Website öffnen`}
                    >
                      <img
                        src={p.logoSrc}
                        alt={p.logoAlt ?? `${p.name} Logo`}
                        width={200}
                        height={62}
                        className="w-full max-w-[200px] h-auto object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center p-10 rounded-3xl border border-border bg-card">
            <h2 className="text-2xl font-medium text-primary mb-4">
              Interesse an einer Partnerschaft?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Sie sind Fachbetrieb in der Region und möchten gemeinsam Projekte
              umsetzen? Schreiben Sie uns – wir freuen uns über den Austausch.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all"
            >
              Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partnerbetriebe;
