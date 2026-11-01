import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { FORMER_NAME, SITE_EMAIL, SITE_NAME } from "@/data/brand";
import { motion } from "framer-motion";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background text-muted-foreground antialiased selection:bg-primary/20 selection:text-foreground">
      <SEO
        title="Datenschutzerklärung"
        description={`Datenschutzerklärung von ${SITE_NAME}.`}
        path="/datenschutz"
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
            Datenschutzerklärung
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-10"
          >
            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-medium text-foreground/80 mb-2">Allgemeine Hinweise</h3>
              <p className="leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
              <h3 className="text-lg font-medium text-foreground/80 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="leading-relaxed mb-2"><strong className="text-foreground">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
              <p className="leading-relaxed mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>
              <p className="leading-relaxed mb-2"><strong className="text-foreground">Wie erfassen wir Ihre Daten?</strong></p>
              <p className="leading-relaxed mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>
              <p className="leading-relaxed mb-2"><strong className="text-foreground">Wofür nutzen wir Ihre Daten?</strong></p>
              <p className="leading-relaxed mb-4">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
              <p className="leading-relaxed mb-2"><strong className="text-foreground">Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
              <p className="leading-relaxed">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">2. Hosting</h2>
              <p className="leading-relaxed mb-4">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <h3 className="text-lg font-medium text-foreground/80 mb-2">Externes Hosting</h3>
              <p className="leading-relaxed">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln. Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-lg font-medium text-foreground/80 mb-2">Datenschutz</h3>
              <p className="leading-relaxed mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <p className="leading-relaxed mb-4">
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
              </p>
              <h3 className="text-lg font-medium text-foreground/80 mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p className="leading-relaxed mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="leading-relaxed mb-4">
                {SITE_NAME}<br />
                vormals {FORMER_NAME}<br />
                Eyyub-Abdulaziz Alici<br />
                Gunzelinstr. 12a<br />
                31224 Peine<br /><br />
                E-Mail: {SITE_EMAIL}
              </p>
              <p className="leading-relaxed">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">4. Speicherdauer</h2>
              <p className="leading-relaxed">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">5. Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung</h2>
              <p className="leading-relaxed">
                Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">6. Empfänger von personenbezogenen Daten</h2>
              <p className="leading-relaxed">
                Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">7. Widerruf Ihrer Einwilligung zur Datenverarbeitung</h2>
              <p className="leading-relaxed">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">8. Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen</h2>
              <p className="leading-relaxed">
                WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">9. Beschwerderecht bei der zuständigen Aufsichtsbehörde</h2>
              <p className="leading-relaxed">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">10. Recht auf Datenübertragbarkeit</h2>
              <p className="leading-relaxed">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">11. Auskunft, Berichtigung und Löschung</h2>
              <p className="leading-relaxed">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">12. Recht auf Einschränkung der Verarbeitung</h2>
              <p className="leading-relaxed mb-4">
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
                <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">13. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="leading-relaxed">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">14. Datenerfassung auf dieser Website</h2>
              <h3 className="text-lg font-medium text-foreground/80 mb-2">Cookies</h3>
              <p className="leading-relaxed mb-4">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
              </p>
              <p className="leading-relaxed mb-4">
                Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
              </p>
              <h3 className="text-lg font-medium text-foreground/80 mb-2">Kontaktformular</h3>
              <p className="leading-relaxed mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="leading-relaxed">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">15. Bewerberdaten</h2>
              <p className="leading-relaxed mb-4">
                Wir erheben und verarbeiten personenbezogene Daten von Bewerbern zum Zwecke der Abwicklung des Bewerbungsverfahrens und der Personalvermittlung. Die Verarbeitung kann auch auf elektronischem Wege erfolgen. Dies ist insbesondere dann der Fall, wenn ein Bewerber entsprechende Bewerbungsunterlagen auf elektronischem Wege, beispielsweise per E-Mail oder über ein auf der Website befindliches Webformular, an uns übermittelt.
              </p>
              <p className="leading-relaxed">
                Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Beschäftigungsverhältnisses) sowie Art. 88 DSGVO i.V.m. § 26 BDSG. Ihre Bewerberdaten werden nach Abschluss des Bewerbungsverfahrens gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen oder Sie einer längeren Speicherung zugestimmt haben.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-4">16. Kontakt</h2>
              <p className="leading-relaxed">
                Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br /><br />
                <strong className="text-foreground">info@avidion-consulting.com</strong>
              </p>
            </section>

            <section className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Stand: Januar 2025
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Datenschutz;