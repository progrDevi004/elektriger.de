import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { FORMER_NAME, SITE_EMAIL, SITE_NAME } from "@/data/brand";
import { motion } from "framer-motion";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background text-muted-foreground antialiased selection:bg-primary/20 selection:text-foreground">
      <SEO
        title="Impressum"
        description={`Impressum von ${SITE_NAME}, Gunzelinstr. 12a, 31224 Peine.`}
        path="/impressum"
        noindex
      />
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-12"
          >
            Impressum
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-10"
          >
            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-muted-foreground leading-relaxed">
                {SITE_NAME}<br />
                vormals {FORMER_NAME}<br />
                Eyyub-Abdulaziz Alici<br />
                Gunzelinstr. 12a<br />
                31224 Peine
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">Kontakt</h2>
              <p className="text-muted-foreground leading-relaxed">
                Telefon: 01520 6268513<br />
                E-Mail: {SITE_EMAIL}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">Aufsichtsbehörde</h2>
              <p className="text-muted-foreground leading-relaxed">
                Handwerkskammer Braunschweig - Lüneburg - Stade<br />
                Betriebsnummer 28968
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">Redaktionell verantwortlich</h2>
              <p className="text-muted-foreground leading-relaxed">
                Eyyub-Abdulaziz Alici<br />
                Gunzelinstr. 12a<br />
                31224 Peine
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">EU-Streitschlichtung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                  https://ec.europa.eu/consumers/odr
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">Haftung für Inhalte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">Haftung für Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">Urheberrecht</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;