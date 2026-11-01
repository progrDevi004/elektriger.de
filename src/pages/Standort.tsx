import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Zap,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { SITE_URL } from "@/components/SEO";
import { BUSINESS_ID } from "@/data/site";
import { getStandortBySlug, getStandorteOrdered } from "@/data/standorte";

const Standort = () => {
  const { slug } = useParams<{ slug: string }>();
  const ort = useMemo(() => (slug ? getStandortBySlug(slug) : undefined), [slug]);

  if (!ort) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased">
        <SEO
          title="Standort nicht gefunden"
          description="Diese Standortseite existiert nicht."
          path={`/elektriker/${slug ?? ""}`}
          noindex
        />
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-semibold text-primary mb-4">
              Standort nicht gefunden
            </h1>
            <p className="text-muted-foreground mb-8">
              Diese Seite existiert nicht. Schauen Sie sich unser Einsatzgebiet an.
            </p>
            <Link
              to="/einsatzgebiet"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full"
            >
              <ArrowLeft className="w-4 h-4" /> Zum Einsatzgebiet
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const path = `/elektriker/${ort.slug}`;
  const andereOrte = getStandorteOrdered().filter((s) => s.slug !== ort.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}${path}/#service`,
        name: `Elektriker ${ort.name}`,
        serviceType: "Elektrik, Energie und Smart Home",
        provider: { "@id": BUSINESS_ID },
        areaServed: {
          "@type": "City",
          name: ort.name,
        },
        url: `${SITE_URL}${path}`,
        description: ort.description,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${path}/#faq`,
        mainEntity: ort.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Einsatzgebiet",
            item: `${SITE_URL}/einsatzgebiet`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Elektriker ${ort.name}`,
            item: `${SITE_URL}${path}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title={ort.title}
        description={ort.description}
        path={path}
        keywords={ort.keywords}
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative mb-16 overflow-hidden rounded-3xl bg-card border border-border">
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-green blur-3xl" />
            </div>
            <div className="relative p-8 md:p-14 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
                  <MapPin className="w-3 h-3" />
                  {ort.isHomeBase ? "Firmensitz" : "Einsatzgebiet"} · {ort.name}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
                  Elektriker {ort.inOrt}
                  <br />
                  <span className="text-gradient-silver">{ort.heroAccent}</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-3">
                  {ort.lageHinweis}
                </p>
                <p className="text-sm text-muted-foreground/80 mb-4">
                  {ort.anfahrt}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  {ort.schwerpunkt}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/kontakt"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all"
                  >
                    {ort.ctaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/leistungen"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-background text-primary text-sm font-medium rounded-full hover:border-teal/40 transition-all"
                  >
                    Alle Leistungen
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            <div className="lg:col-span-2 space-y-5">
              {ort.intro.map((absatz) => (
                <p key={absatz.slice(0, 40)} className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {absatz}
                </p>
              ))}
            </div>
            <aside className="rounded-2xl border border-border bg-card p-6 h-fit">
              <div className="flex items-center gap-2 text-primary font-medium mb-4">
                <Zap className="w-4 h-4 text-teal" />
                Typische Anfragen {ort.inOrt}
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {ort.typischeAnfragen.map((anfrage) => (
                  <li key={anfrage} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span>{anfrage}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="mb-20" aria-label="Leistungen vor Ort">
            <h2 className="text-2xl md:text-3xl font-medium text-gradient-silver mb-8 text-center">
              {ort.leistungenHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ort.highlightLeistungen.map((leistung, index) => (
                <motion.div
                  key={leistung.href}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={leistung.href}
                    className="group block h-full rounded-2xl border border-border bg-card p-6 hover:border-teal/40 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-primary mb-2 group-hover:text-teal transition-colors">
                      {leistung.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {leistung.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-teal">
                      Mehr erfahren <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20" aria-label="Lokal relevant">
            <h2 className="text-2xl md:text-3xl font-medium text-primary text-center mb-8">
              {ort.werteHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {ort.lokalePunkte.map((punkt) => (
                <div
                  key={punkt.title}
                  className="rounded-2xl border border-border bg-card/50 p-6"
                >
                  <h3 className="text-base font-medium text-primary mb-2">{punkt.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{punkt.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20 max-w-3xl mx-auto" aria-label="Häufige Fragen">
            <h2 className="text-2xl md:text-3xl font-medium text-gradient-silver text-center mb-8">
              Häufige Fragen
            </h2>
            <div className="space-y-4">
              {ort.faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex gap-3">
                    <HelpCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-primary mb-2">
                        {item.question}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16" aria-label="Weitere Orte">
            <h2 className="text-xl font-medium text-primary mb-4 text-center">
              Weitere Orte im Einsatzgebiet
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {andereOrte.map((s) => (
                <Link
                  key={s.slug}
                  to={`/elektriker/${s.slug}`}
                  className="px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground hover:border-teal/40 hover:text-primary transition-colors"
                >
                  Elektriker {s.name}
                </Link>
              ))}
              <Link
                to="/einsatzgebiet"
                className="px-4 py-2 rounded-full border border-teal/30 bg-teal/10 text-sm text-teal hover:border-teal/50 transition-colors"
              >
                Alle Orte ansehen
              </Link>
            </div>
          </section>

          <div className="text-center p-10 rounded-3xl border border-border bg-card">
            <h2 className="text-2xl font-medium text-primary mb-4">{ort.ctaText}</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Schildern Sie kurz Ihr Vorhaben {ort.inOrt} – wir melden uns in der Regel innerhalb von 24 Stunden.
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

export default Standort;
