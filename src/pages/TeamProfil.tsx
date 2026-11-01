import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  User,
  Sparkles,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { SITE_URL, DEFAULT_IMAGE } from "@/components/SEO";
import { getTeamMemberBySlug } from "@/data/team";
import { SITE_NAME } from "@/data/brand";

const TeamProfil = () => {
  const { slug } = useParams<{ slug: string }>();
  const member = useMemo(
    () => (slug ? getTeamMemberBySlug(slug) : undefined),
    [slug],
  );

  if (!member) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased">
        <SEO
          title="Profil nicht gefunden"
          description="Das angeforderte Personenprofil existiert nicht."
          path={`/team/${slug ?? ""}`}
          noindex
        />
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-semibold text-primary mb-4">
              Profil nicht gefunden
            </h1>
            <p className="text-muted-foreground mb-8">
              Dieses Personenprofil existiert nicht oder wurde verschoben.
            </p>
            <Link
              to="/ueber-uns"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" /> Zurück zu „Über uns"
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.teaser,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    image: member.image ? `${SITE_URL}${member.image}` : DEFAULT_IMAGE,
    url: `${SITE_URL}/team/${member.slug}`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title={`${member.name} – ${member.role}`}
        description={member.teaser}
        path={`/team/${member.slug}`}
        type="article"
        image={member.image ? `${SITE_URL}${member.image}` : DEFAULT_IMAGE}
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            to="/ueber-uns"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-teal transition-colors mb-8 focus:outline-none focus:text-teal"
          >
            <ArrowLeft className="w-4 h-4" /> Über uns
          </Link>

          {/* Hero: Bild + Kurzvorstellung */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {member.image ? (
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-border bg-secondary">
                  <img
                    src={member.image}
                    alt={member.imageAlt ?? member.name}
                    className="w-full h-full object-cover"
                    width={600}
                    height={800}
                  />
                </div>
              ) : (
                // Reservierte Bildfläche – Foto wird später ergänzt.
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-dashed border-border bg-card flex flex-col items-center justify-center text-center px-6">
                  <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-teal" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium text-primary">Foto folgt</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hier entsteht das Profilbild.
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
                <MapPin className="w-3 h-3" />
                {SITE_NAME} · Peine
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-3">
                {member.name}
              </h1>
              <p className="text-lg text-teal font-medium mb-6">{member.role}</p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                „{member.intro}"
              </p>
            </motion.div>
          </div>

          {/* Über mich / Werdegang */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 mb-20">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-medium text-gradient-silver mb-8">
                Mein Weg
              </h2>
              <div className="space-y-5">
                {member.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Schwerpunkte */}
            <aside className="lg:col-span-1">
              <div className="rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-32">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-teal" strokeWidth={1.5} />
                  <h3 className="text-lg font-medium text-primary">
                    Schwerpunkte
                  </h3>
                </div>
                <ul className="space-y-3">
                  {member.expertise.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Zertifikate & Nachweise */}
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap className="w-6 h-6 text-teal" strokeWidth={1.5} />
              <h2 className="text-2xl md:text-3xl font-medium text-primary">
                Zertifikate & Nachweise
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {member.zertifikate.map((zertifikat) => (
                <div
                  key={zertifikat.label}
                  className={`flex items-start gap-4 p-5 rounded-2xl border bg-card transition-colors ${
                    zertifikat.geplant
                      ? "border-dashed border-border"
                      : "border-border hover:border-emerald-500/40"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      zertifikat.geplant ? "bg-secondary" : "bg-emerald-500/10"
                    }`}
                  >
                    {zertifikat.geplant ? (
                      <Clock
                        className="w-5 h-5 text-muted-foreground"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <CheckCircle2
                        className="w-5 h-5 text-emerald-500"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-primary">
                        {zertifikat.label}
                      </p>
                      {zertifikat.geplant && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary border border-border text-[11px] font-medium text-muted-foreground">
                          in Kürze
                        </span>
                      )}
                    </div>
                    {zertifikat.detail && (
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                        {zertifikat.detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center p-10 rounded-3xl border border-border bg-gradient-to-br from-teal/5 to-green/5">
            <h2 className="text-2xl font-medium text-primary mb-4">
              Lassen Sie uns Ihr Projekt besprechen
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Ob Neubau, Sanierung oder Smart-Home-Nachrüstung – ich freue mich
              auf Ihre Anfrage und finde die passende Lösung für Sie.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300 w-full sm:w-auto"
              >
                Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/angebotsrechner"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card text-primary text-sm font-medium rounded-full hover:border-teal/40 transition-all duration-300 w-full sm:w-auto"
              >
                <Calculator className="w-4 h-4 text-teal" /> Zum Angebotsrechner
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamProfil;
