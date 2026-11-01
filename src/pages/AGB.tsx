import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { FORMER_NAME, SITE_EMAIL, SITE_NAME } from "@/data/brand";
import { motion } from "framer-motion";

const AGB = () => {
  return (
    <div className="min-h-screen bg-background text-muted-foreground antialiased selection:bg-primary/20 selection:text-foreground">
      <SEO
        title="AGB"
        description={`Allgemeine Geschäftsbedingungen von ${SITE_NAME}.`}
        path="/agb"
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
            Allgemeine Geschäftsbedingungen
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-10"
          >
            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 1 Geltungsbereich und Vertragsgegenstand</h2>
              <p className="leading-relaxed mb-4">
                (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend &bdquo;AGB&ldquo;) gelten für alle Verträge zwischen {SITE_NAME} (vormals {FORMER_NAME}), Inhaber Eyyub-Abdulaziz Alici, Gunzelinstr. 12a, 31224 Peine (nachfolgend &bdquo;Auftragnehmer&ldquo;) und seinen Auftraggebern (nachfolgend &bdquo;Auftraggeber&ldquo;) über Leistungen im Bereich Elektroinstallation, Smart Home, Gebäudeautomation sowie damit verbundene Planungs- und Beratungsleistungen.
              </p>
              <p className="leading-relaxed mb-4">
                (2) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können. Unternehmer ist jede natürliche oder juristische Person oder rechtsfähige Personengesellschaft, die bei Abschluss des Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.
              </p>
              <p className="leading-relaxed">
                (3) Abweichende, entgegenstehende oder ergänzende AGB des Auftraggebers werden nur dann Vertragsbestandteil, wenn der Auftragnehmer ihrer Geltung ausdrücklich schriftlich zugestimmt hat.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 2 Vertragsschluss und Angebot</h2>
              <p className="leading-relaxed mb-4">
                (1) Angebote des Auftragnehmers sind freibleibend, sofern nicht ausdrücklich als verbindlich gekennzeichnet. Maßgeblich für den Leistungsumfang ist die schriftliche Auftragsbestätigung bzw. das vom Auftraggeber angenommene Angebot.
              </p>
              <p className="leading-relaxed mb-4">
                (2) Ein Vertrag kommt durch schriftliche Auftragsbestätigung des Auftragnehmers, durch Annahme des Angebots durch den Auftraggeber oder durch Aufnahme der Leistungserbringung zustande.
              </p>
              <p className="leading-relaxed">
                (3) Kostenvoranschläge sind, sofern nicht ausdrücklich als verbindlich gekennzeichnet, unverbindlich. Eine geringfügige Überschreitung (bis zu 15 %) ist zulässig und vom Auftraggeber zu vergüten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 3 Leistungsumfang</h2>
              <p className="leading-relaxed mb-4">
                (1) Der Auftragnehmer erbringt Leistungen aus den Bereichen Elektroinstallation, Smart-Home-Integration (u.a. KNX, Loxone, Matter), Gebäudeautomation, energieeffiziente Lösungen sowie damit verbundene Planungs-, Beratungs- und Wartungsleistungen.
              </p>
              <p className="leading-relaxed mb-4">
                (2) Die Leistungen werden nach den anerkannten Regeln der Technik, insbesondere den jeweils gültigen VDE-Normen und DIN-Vorschriften, erbracht.
              </p>
              <p className="leading-relaxed">
                (3) Teilleistungen sind zulässig, soweit sie für den Auftraggeber zumutbar sind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 4 Mitwirkungspflichten des Auftraggebers</h2>
              <p className="leading-relaxed mb-4">
                (1) Der Auftraggeber stellt dem Auftragnehmer alle für die Leistungserbringung erforderlichen Informationen, Pläne und Unterlagen rechtzeitig und vollständig zur Verfügung.
              </p>
              <p className="leading-relaxed mb-4">
                (2) Der Auftraggeber sorgt für freien und sicheren Zugang zur Baustelle bzw. zum Leistungsort sowie für die Bereitstellung von Strom und Wasser ohne gesonderte Berechnung.
              </p>
              <p className="leading-relaxed">
                (3) Verzögerungen, die durch Verletzung der Mitwirkungspflichten entstehen, gehen zu Lasten des Auftraggebers. Daraus entstehende Mehrkosten (z.B. Wartezeiten, erneute Anfahrten) können gesondert berechnet werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 5 Preise und Zahlungsbedingungen</h2>
              <p className="leading-relaxed mb-4">
                (1) Es gelten die im Angebot bzw. in der Auftragsbestätigung vereinbarten Preise. Alle Preise verstehen sich, sofern nicht anders angegeben, zuzüglich der jeweils gültigen gesetzlichen Umsatzsteuer.
              </p>
              <p className="leading-relaxed mb-4">
                (2) Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig.
              </p>
              <p className="leading-relaxed mb-4">
                (3) Bei umfangreichen Aufträgen ist der Auftragnehmer berechtigt, angemessene Abschlagszahlungen entsprechend dem Leistungsfortschritt zu verlangen.
              </p>
              <p className="leading-relaxed">
                (4) Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in gesetzlicher Höhe (gegenüber Verbrauchern 5 Prozentpunkte, gegenüber Unternehmern 9 Prozentpunkte über dem Basiszinssatz) zu berechnen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 6 Ausführung und Termine</h2>
              <p className="leading-relaxed mb-4">
                (1) Termine und Fristen sind nur dann verbindlich, wenn sie ausdrücklich schriftlich als verbindlich vereinbart wurden.
              </p>
              <p className="leading-relaxed">
                (2) Ereignisse höherer Gewalt sowie unvorhersehbare Lieferengpässe (z.B. bei Smart-Home-Komponenten) verlängern die Leistungsfrist angemessen. Der Auftragnehmer informiert den Auftraggeber unverzüglich.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 7 Abnahme</h2>
              <p className="leading-relaxed mb-4">
                (1) Bei Werkleistungen ist der Auftraggeber zur förmlichen Abnahme verpflichtet, sobald die Leistung im Wesentlichen vertragsgemäß erbracht wurde. Wesentliche Mängel berechtigen zur Verweigerung der Abnahme.
              </p>
              <p className="leading-relaxed">
                (2) Nimmt der Auftraggeber die Leistung in Benutzung, gilt die Abnahme spätestens nach Ablauf von 12 Werktagen nach Mitteilung der Fertigstellung als erfolgt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 8 Eigentumsvorbehalt</h2>
              <p className="leading-relaxed">
                Gelieferte Materialien und Geräte bleiben bis zur vollständigen Bezahlung Eigentum des Auftragnehmers. Bei fest verbauten Komponenten gelten die gesetzlichen Bestimmungen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 9 Gewährleistung</h2>
              <p className="leading-relaxed mb-4">
                (1) Es gelten die gesetzlichen Gewährleistungsrechte. Die Gewährleistungsfrist beträgt bei Werkleistungen an Bauwerken 5 Jahre, im Übrigen 2 Jahre ab Abnahme bzw. Lieferung.
              </p>
              <p className="leading-relaxed mb-4">
                (2) Der Auftragnehmer leistet bei berechtigten Mängelrügen nach seiner Wahl Nachbesserung oder Neuherstellung. Bei Fehlschlagen der Nacherfüllung kann der Auftraggeber Minderung verlangen oder vom Vertrag zurücktreten.
              </p>
              <p className="leading-relaxed">
                (3) Offensichtliche Mängel sind unverzüglich, spätestens innerhalb von 14 Tagen nach Abnahme schriftlich anzuzeigen. Für Unternehmer gelten die Untersuchungs- und Rügepflichten nach § 377 HGB.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 10 Haftung</h2>
              <p className="leading-relaxed mb-4">
                (1) Der Auftragnehmer haftet unbeschränkt für Vorsatz, grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
              </p>
              <p className="leading-relaxed mb-4">
                (2) Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und nur in Höhe des vorhersehbaren, vertragstypischen Schadens.
              </p>
              <p className="leading-relaxed">
                (3) Eine darüber hinausgehende Haftung ist ausgeschlossen. Die Vorschriften des Produkthaftungsgesetzes bleiben unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 11 Widerrufsrecht für Verbraucher</h2>
              <p className="leading-relaxed mb-4">
                (1) Verbrauchern steht bei außerhalb von Geschäftsräumen geschlossenen Verträgen sowie bei Fernabsatzverträgen ein gesetzliches Widerrufsrecht von 14 Tagen zu.
              </p>
              <p className="leading-relaxed">
                (2) Auf Wunsch des Verbrauchers kann mit der Leistungserbringung bereits vor Ablauf der Widerrufsfrist begonnen werden. In diesem Fall hat der Verbraucher im Falle des Widerrufs einen angemessenen Wertersatz für die bis zum Widerruf erbrachten Leistungen zu zahlen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 12 Datenschutz</h2>
              <p className="leading-relaxed">
                Der Auftragnehmer verarbeitet personenbezogene Daten ausschließlich zur Vertragsabwicklung gemäß den geltenden datenschutzrechtlichen Bestimmungen, insbesondere der DSGVO. Nähere Informationen entnehmen Sie unserer Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">§ 13 Schlussbestimmungen</h2>
              <p className="leading-relaxed mb-4">
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
              </p>
              <p className="leading-relaxed mb-4">
                (2) Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist, sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist, Peine.
              </p>
              <p className="leading-relaxed mb-4">
                (3) Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit (https://ec.europa.eu/consumers/odr). Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
              <p className="leading-relaxed">
                (4) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.
              </p>
            </section>

            <section className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Stand: Mai 2026<br />
                {SITE_NAME} · Gunzelinstr. 12a · 31224 Peine · Tel. 01520 6268513 · {SITE_EMAIL}
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AGB;
