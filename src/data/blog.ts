/**
 * Zentrale Datenquelle für den Blog.
 *
 * Der Blog kennt zwei Zielgruppen-Kategorien (siehe `CATEGORY_B2B` / `CATEGORY_B2C`):
 *   - "Für Architekten & Planer"      → Fachbeiträge für Architekten und TGA-Planer (B2B)
 *   - "Ratgeber für Privatkunden"     → Ratgeber für private Bauherren und Endkunden (B2C)
 * Jeder Beitrag sollte einer dieser beiden Kategorien zugeordnet werden.
 *
 * Zusätzlich kann jeder Beitrag eine optionale `subcategory` (zweites Label)
 * bekommen. Damit können Leser innerhalb von B2B bzw. B2C weiter filtern,
 * z. B. "Smart Home", "Sicherheit", "Energieeffizienz" (B2C) oder
 * "Normen & Vorschriften", "Gebäudeautomation", "TGA-Planung" (B2B).
 * Die Filter-Buttons entstehen automatisch aus den vergebenen Werten.
 *
 * Neuen Beitrag veröffentlichen:
 * 1. Ein neues Objekt in das `blogPosts`-Array unten einfügen (siehe Vorlage darunter).
 * 2. Eine eindeutige `slug` vergeben – daraus entsteht die URL: /blog/<slug>.
 * 3. `category` auf `CATEGORY_B2B` oder `CATEGORY_B2C` setzen.
 * 4. Optional eine `subcategory` als zweites Filter-Label vergeben.
 * 5. `content` als HTML-String pflegen (Überschriften, Absätze, Listen …).
 *    Die Darstellung übernimmt automatisch das Typography-Styling.
 *
 * Vorlage (kopieren, einkommentieren und ausfüllen):
 *
 * {
 *   slug: "mein-erster-beitrag",
 *   title: "Titel des Beitrags",
 *   excerpt: "Kurze Zusammenfassung für die Übersicht und SEO (1–2 Sätze).",
 *   date: "2026-01-15",            // Format: YYYY-MM-DD
 *   author: "Abdulaziz Alici",
 *   category: CATEGORY_B2C,         // oder CATEGORY_B2B
 *   subcategory: "Smart Home",      // optionales zweites Filter-Label
 *   readingTime: 4,                 // in Minuten
 *   coverImage: "/blog/mein-bild.jpg", // optional, aus dem public-Ordner
 *   content: `
 *     <p>Einleitender Absatz …</p>
 *     <h2>Zwischenüberschrift</h2>
 *     <p>Weiterer Text …</p>
 *     <ul><li>Punkt eins</li><li>Punkt zwei</li></ul>
 *   `,
 * },
 */

export interface BlogPost {
  /** Eindeutiger URL-Bezeichner, z. B. "smart-home-vorteile". */
  slug: string;
  title: string;
  /** Kurze Zusammenfassung für Übersicht und SEO-Beschreibung. */
  excerpt: string;
  /** Veröffentlichungsdatum im Format YYYY-MM-DD. */
  date: string;
  author: string;
  /** Zielgruppen-Hauptkategorie (`CATEGORY_B2B` oder `CATEGORY_B2C`). */
  category: string;
  /**
   * Optionale Unterkategorie (zweites Label) für die feinere Filterung
   * innerhalb einer Hauptkategorie, z. B. "Smart Home", "Sicherheit",
   * "Energieeffizienz", "Normen & Vorschriften", "Gebäudeautomation".
   */
  subcategory?: string;
  /** Geschätzte Lesedauer in Minuten. */
  readingTime: number;
  /** Optionales Titelbild (Pfad aus dem public-Ordner oder absolute URL). */
  coverImage?: string;
  /** Beitragsinhalt als HTML-String. */
  content: string;
}

/** Kategorie für Fachbeiträge an Architekten und TGA-Planer (B2B). */
export const CATEGORY_B2B = "Für Architekten & Planer";
/** Kategorie für Ratgeber an private Bauherren und Endkunden (B2C). */
export const CATEGORY_B2C = "Ratgeber für Privatkunden";

/**
 * Veröffentlichte Blogbeiträge.
 * Neueste Beiträge einfach hier ergänzen – die Sortierung nach Datum
 * erledigt `getAllPosts()` automatisch.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "e-check-elektroinstallation-pruefen",
    title:
      "E-Check: Wann Sie Ihre Elektroinstallation prüfen lassen sollten",
    excerpt:
      "Was der E-Check prüft, wann er sinnvoll ist – z. B. vor Hauskauf, nach Sanierung oder für die Versicherung – und worauf Sie als Eigentümer achten sollten.",
    date: "2026-08-02",
    author: "Eyyub-Abdulaziz Alici",
    category: CATEGORY_B2C,
    subcategory: "Sicherheit",
    readingTime: 7,
    content: `
      <p>Viele Eigentümer merken erst bei einem Schaden, einem Versicherungsfall oder dem Hausverkauf, dass die Elektrik längst nicht mehr dem heutigen Stand entspricht. Der <strong>E-Check</strong> schafft hier Klarheit: Eine Elektrofachkraft prüft Ihre Installation systematisch, erkennt Gefahrenstellen und dokumentiert den Zustand – verständlich und nachvollziehbar.</p>

      <p>In diesem Ratgeber erfahren Sie, was beim E-Check geprüft wird, in welchen Situationen er besonders sinnvoll ist und wie Sie die Ergebnisse sinnvoll nutzen.</p>

      <h2>Was ist der E-Check?</h2>
      <p>Der E-Check ist eine fachgerechte Prüfung Ihrer elektrischen Anlagen und Betriebsmittel durch eine qualifizierte Elektrofachkraft. Im Fokus stehen Sicherheit, Funktion und Dokumentation – nicht der Verkauf neuer Geräte.</p>
      <p>Typischerweise gehören dazu unter anderem:</p>
      <ul>
        <li>Sichtprüfung von Verteilungen, Leitungen, Steckdosen und Schaltern</li>
        <li>Prüfung von Schutzmaßnahmen (z. B. FI-/RCD-Schalter, Erdung)</li>
        <li>Messungen und Funktionskontrollen an relevanten Anlagenteilen</li>
        <li>Bewertung erkennbarer Mängel und Risiken (Brandschutz, Personenschutz)</li>
        <li>Schriftliches Prüfprotokoll mit Empfehlungen zur Behebung</li>
      </ul>
      <p>Wichtig: Ein E-Check ersetzt keine komplette Sanierung – er zeigt Ihnen aber, <em>ob</em> und <em>wo</em> Handlungsbedarf besteht.</p>

      <h2>Wann lohnt sich ein E-Check?</h2>
      <p>Es gibt Situationen, in denen eine Prüfung besonders sinnvoll ist:</p>

      <h3>1. Vor dem Kauf oder Verkauf einer Immobilie</h3>
      <p>Veraltete oder mangelhafte Elektrik kann teuer werden – und bei Verhandlungen ein starkes Argument sein. Ein aktuelles Prüfprotokoll schafft Transparenz für Käufer und Verkäufer und reduziert böse Überraschungen nach dem Notartermin.</p>

      <h3>2. Nach Umbau, Sanierung oder Nutzungsänderung</h3>
      <p>Neue Leitungen, zusätzliche Verbraucher, Küchenumbau, Dachgeschossausbau: Sobald sich die Installation verändert hat, sollte geprüft werden, ob Schutzorgane, Querschnitte und Aufteilung im Verteiler noch passen.</p>

      <h3>3. Für Versicherung und Schadensprävention</h3>
      <p>Viele Versicherer achten bei Brand- oder Leitungswasserschäden mit elektrotechnischem Bezug auf den Zustand der Anlage. Eine dokumentierte Prüfung hilft Ihnen, Risiken früh zu erkennen – und im Ernstfall nachzuweisen, dass Sie Ihre Sorgfaltspflicht ernst genommen haben.</p>

      <h3>4. Bei älteren Bestandsgebäuden</h3>
      <p>In Häusern aus den 70er-, 80er- oder 90er-Jahren fehlen oft moderne Schutzeinrichtungen, der Zählerschrank ist eng, oder Steckdosenkreise sind überlastet. Typische Warnsignale:</p>
      <ul>
        <li>Häufig auslösende Sicherungen oder FI-Schalter</li>
        <li>Warme Stecker, flackerndes Licht, knisternde Geräusche</li>
        <li>Zu wenige Stromkreise für heutige Geräte (Herd, Waschmaschine, Wallbox, Wärmepumpe)</li>
        <li>Keine oder unklare Dokumentation der Installation</li>
      </ul>

      <h3>5. Vor der Installation von Wallbox, PV oder Wärmepumpe</h3>
      <p>Neue große Verbraucher brauchen Reserven im Zählerschrank und korrekt dimensionierte Absicherung. Ein E-Check bzw. eine Bestandsaufnahme vor der Erweiterung spart Nacharbeiten und stellt sicher, dass die bestehende Anlage die zusätzliche Last sicher tragen kann.</p>

      <h2>Was passiert nach der Prüfung?</h2>
      <p>Sie erhalten eine Dokumentation mit dem Ist-Zustand und konkreten Hinweisen. Mängel werden priorisiert – also unterschieden zwischen:</p>
      <ul>
        <li><strong>Sofortmaßnahmen</strong> (Sicherheitsrisiko)</li>
        <li><strong>kurzfristig sinnvoll</strong> (Verschleiß, fehlender Schutz)</li>
        <li><strong>mittel-/langfristig</strong> (Komfort, Zukunftssicherheit, Erweiterung)</li>
      </ul>
      <p>So behalten Sie Kosten und Reihenfolge im Griff – statt alles auf einmal tauschen zu müssen.</p>

      <h2>E-Check vs. „einfach mal schauen lassen“</h2>
      <p>Ein kurzer Blick in den Zählerschrank reicht oft nicht. Der Wert liegt in der systematischen Prüfung und der <strong>schriftlichen Dokumentation</strong>. Genau die brauchen Sie bei Verkauf, Versicherung oder der Planung größerer Maßnahmen.</p>

      <h2>Fazit: Sicherheit beginnt mit Klarheit</h2>
      <p>Der E-Check ist keine Pflicht für jedes Privathaus – aber eine der sinnvollsten Maßnahmen, wenn Sie wissen wollen, wie sicher Ihre Elektrik wirklich ist. Besonders vor Immobilienkauf, nach Umbauten oder vor Wallbox, PV und Wärmepumpe schafft er Orientierung und vermeidet teure Fehlplanungen.</p>
      <p>Als Elektriker in Peine und Umgebung prüfen wir Ihre Installation fachgerecht, erklären die Ergebnisse verständlich und setzen notwendige Maßnahmen sauber um – ohne Verkaufsdruck. <a href="/e-check">Mehr zum E-Check</a> oder direkt <a href="/kontakt">Termin anfragen</a>.</p>
    `,
  },
  {
    slug: "pv-anlage-auswahl-ratgeber",
    title:
      "PV-Anlage richtig auswählen: Der verständliche Ratgeber für Privatkunden",
    excerpt:
      "Welche Photovoltaik-Anlage passt zu Ihrem Haus? Schritt für Schritt von Stromverbrauch über Dach und Anlagengröße bis Speicher – am Ende wissen Sie, welche PV-Anlage für Sie geeignet ist.",
    date: "2026-07-10",
    author: "Eyyub-Abdulaziz Alici",
    category: CATEGORY_B2C,
    subcategory: "Photovoltaik & Energie",
    readingTime: 9,
    coverImage: "/blog/pv-anlage-auswahl-ratgeber.jpg",
    content: `
      <p>Eine eigene Photovoltaik-Anlage senkt die Stromrechnung, macht unabhängiger von steigenden Preisen und schont das Klima. Aber welche Anlage ist die richtige für <em>Ihr</em> Haus? Muss es ein Speicher sein? Wie groß sollte sie sein? Dieser Ratgeber führt Sie in verständlichen Schritten durch die Auswahl. Am Ende wissen Sie, welche PV-Anlage zu Ihrer Situation passt.</p>

      <p><strong>Diese Fragen sollten Sie im Vorfeld beantworten:</strong></p>
      <ul>
        <li>Wie viel Strom verbrauche ich im Jahr?</li>
        <li>Wie viel Platz und welche Ausrichtung hat mein Dach?</li>
        <li>Möchte ich möglichst viel Strom selbst nutzen (Stichwort: Stromspeicher) oder vor allem einspeisen?</li>
      </ul>
      <p>Wenn Sie diese drei Punkte kennen, ist die halbe Entscheidung schon getroffen. Gehen wir sie der Reihe nach durch.</p>

      <h2>Schritt 1: Ihren Stromverbrauch kennen</h2>
      <p>Der Jahresverbrauch ist die wichtigste Größe für die Planung. Sie finden ihn auf Ihrer letzten Stromrechnung in Kilowattstunden (kWh). Als grobe Orientierung:</p>
      <ul>
        <li><strong>1–2 Personen:</strong> ca. 1.500–2.500 kWh/Jahr</li>
        <li><strong>3–4 Personen:</strong> ca. 3.000–4.500 kWh/Jahr</li>
        <li><strong>Haushalt mit Wärmepumpe:</strong> zusätzlich ca. 2.500–5.000 kWh/Jahr</li>
        <li><strong>Haushalt mit E-Auto:</strong> zusätzlich ca. 2.000–3.500 kWh/Jahr je nach Fahrleistung</li>
      </ul>
      <p><strong>Wichtig:</strong> Denken Sie an die Zukunft. Wer in den nächsten Jahren eine Wärmepumpe oder ein E-Auto plant, sollte den Verbrauch nicht nur von heute, sondern auch von morgen einplanen.</p>

      <h2>Schritt 2: Das Dach ehrlich prüfen</h2>
      <p>Nicht jedes Dach ist gleich gut geeignet. Vier Faktoren entscheiden über den Ertrag:</p>
      <ul>
        <li><strong>Ausrichtung:</strong> Süd ist ideal, aber Ost-West-Dächer sind heute sehr beliebt. Sie liefern morgens und abends Strom, also genau dann, wenn im Haushalt viel verbraucht wird. Nur reine Nordflächen lohnen sich selten.</li>
        <li><strong>Neigung:</strong> Am besten sind 20–40°. Flach- und Steildächer bringen etwas weniger, funktionieren aber trotzdem gut.</li>
        <li><strong>Verschattung:</strong> Bäume, Nachbargebäude, Schornsteine oder Gauben können den Ertrag spürbar mindern. Schon wenige verschattete Stunden am Tag machen einen Unterschied.</li>
        <li><strong>Dachzustand und Fläche:</strong> Ist das Dach älter, lohnt es sich, eine anstehende Sanierung mit der PV-Montage zu verbinden. Als Faustregel brauchen Sie pro kWp rund 5–6 m² Dachfläche.</li>
      </ul>

      <h2>Schritt 3: Die richtige Anlagengröße bestimmen</h2>
      <p>Die Leistung einer PV-Anlage wird in Kilowatt-Peak (kWp) angegeben. Eine einfache Faustregel für Norddeutschland: <strong>1 kWp liefert rund 950 kWh Strom pro Jahr</strong> bei guter Ausrichtung.</p>
      <p>Als grobe Orientierung für ein Einfamilienhaus:</p>
      <ul>
        <li><strong>Ohne Wärmepumpe/E-Auto:</strong> 5–8 kWp</li>
        <li><strong>Mit E-Auto oder Wärmepumpe:</strong> 8–12 kWp</li>
        <li><strong>Mit beidem:</strong> 10–15 kWp, wenn das Dach es hergibt</li>
      </ul>
      <p><strong>Unser Tipp:</strong> Machen Sie das Dach lieber voll, statt zu knapp zu planen. Die Mehrkosten für zusätzliche Module sind gering, und der Strombedarf steigt bei den meisten Haushalten über die Jahre. Wie viel Ertrag und Ersparnis bei Ihnen realistisch sind, können Sie vorab mit unserem <a href="/photovoltaik">Photovoltaik-Rechner</a> abschätzen.</p>

      <h2>Schritt 4: Brauche ich einen Speicher?</h2>
      <p>Das ist die häufigste Frage . Die Antwort hängt davon ab, wann Sie Strom verbrauchen. Ohne Speicher nutzen Sie typischerweise nur etwa <strong>30 %</strong> Ihres Solarstroms selbst; der Rest wird für eine vergleichsweise geringe Vergütung ins Netz eingespeist. Ein Speicher hebt den Eigenverbrauch auf <strong>60–70 %</strong>.</p>
      <p><strong>Ein Speicher lohnt sich eher, wenn:</strong></p>
      <ul>
        <li>Sie tagsüber wenig zu Hause sind und den Strom vor allem abends brauchen,</li>
        <li>Sie möglichst unabhängig vom Stromversorger sein möchten,</li>
        <li>Sie eine Wärmepumpe oder ein E-Auto (auch nachts) laden.</li>
      </ul>
      <p><strong>Ein Speicher lohnt sich weniger, wenn:</strong></p>
      <ul>
        <li>Sie tagsüber viel Strom verbrauchen (Homeoffice, Poolpumpe, Klimagerät),</li>
        <li>es Ihnen rein um die schnellste Amortisation geht.</li>
      </ul>
      <p>Als Größenordnung gilt: etwa <strong>1 kWh Speicher pro 1.000 kWh Jahresverbrauch</strong>, meist zwischen 5 und 10 kWh. Ein größerer Speicher bringt selten mehr, kostet aber deutlich mehr.</p>

      <h2>Schritt 5: An die Sektorenkopplung denken (Wärmepumpe, Wallbox)</h2>
      <p>Photovoltaik entfaltet ihren größten Nutzen im Zusammenspiel mit anderen Verbrauchern. Wer sein E-Auto mittags mit selbst erzeugtem Strom lädt oder die Wärmepumpe dann laufen lässt, wenn die Sonne scheint, spart am meisten. Planen Sie eine <a href="/wallbox-leitung">Wallbox</a>, sollte die Zuleitung von Anfang an passend dimensioniert sein – das lässt sich hervorragend mit der PV-Installation kombinieren.</p>

      <h2>Schritt 6: Module und Wechselrichter – worauf achten?</h2>
      <p>Sie müssen kein Technik-Experte sein, aber ein paar Punkte helfen bei der Angebotsbewertung:</p>
      <ul>
        <li><strong>Module:</strong> Heute sind monokristalline Module Standard. Achten Sie weniger auf die letzte Prozentzahl Wirkungsgrad als auf solide Produkt- und Leistungsgarantien (üblich: 12–25 Jahre Produkt, ~25–30 Jahre Leistung).</li>
        <li><strong>Wechselrichter:</strong> Das Herz der Anlage. Er wandelt den Solarstrom für Ihr Haus um. Ein hochwertiges Gerät mit gutem Monitoring zahlt sich über die Laufzeit aus.</li>
        <li><strong>Bei Verschattung:</strong> Leistungsoptimierer oder Modulwechselrichter holen aus teilverschatteten Dächern mehr heraus.</li>
        <li><strong>Notstrom-/Ersatzstromfähigkeit:</strong> Wenn Ihnen Versorgungssicherheit wichtig ist, achten Sie darauf, dass Wechselrichter und Speicher das unterstützen.</li>
      </ul>

      <h2>Schritt 7: Kosten, Vergütung und Förderung</h2>
      <p>Eine schlüsselfertige Aufdachanlage kostet aktuell grob <strong>1.200–1.800 € pro kWp</strong>, ein Speicher zusätzlich etwa <strong>600–1.000 € pro kWh</strong>. Für eingespeisten Strom erhalten Sie die gesetzliche EEG-Vergütung (bei Anlagen bis 10 kWp derzeit rund 8 ct/kWh). Seit einiger Zeit entfällt für private Anlagen zudem die Mehrwertsteuer auf Kauf und Installation.</p>
      <p>Weil sich Vergütungssätze und regionale Förderprogramme regelmäßig ändern, lohnt sich immer ein Blick auf die <strong>aktuellen Konditionen</strong> zum Zeitpunkt Ihrer Planung. Eine typische PV-Anlage amortisiert sich je nach Ausrichtung, Eigenverbrauch und Strompreis in rund <strong>10–15 Jahren</strong> – bei einer Lebensdauer von 25 Jahren und mehr.</p>

      <h2>Welche PV-Anlage passt zu Ihnen? Die Entscheidungshilfe</h2>
      <p>Ordnen Sie sich einfach einem dieser typischen Profile zu:</p>
      <ul>
        <li><strong>Der sparsame Einstieg:</strong> Kleiner Haushalt, kein E-Auto, tagsüber teils zu Hause. → <strong>5–7 kWp ohne Speicher</strong>, Fokus auf schnelle Amortisation. Ein Speicher kann später nachgerüstet werden.</li>
        <li><strong>Die klassische Familie:</strong> 3–4 Personen, abends hoher Verbrauch, Wert auf Unabhängigkeit. → <strong>8–10 kWp mit 6–8 kWh Speicher</strong>. Das beliebteste und meist sinnvollste Setup.</li>
        <li><strong>Das Zukunftshaus:</strong> Wärmepumpe und/oder E-Auto vorhanden oder geplant. → <strong>10–15 kWp mit 8–10 kWh Speicher</strong> und passend geplanter Wallbox-Zuleitung.</li>
        <li><strong>Der Tagverbraucher:</strong> Homeoffice, viel Verbrauch bei Sonnenschein. → <strong>Größere Anlage, Speicher optional</strong> – der hohe Eigenverbrauch entsteht schon ohne Batterie.</li>
        <li><strong>Das schwierige Dach:</strong> Verschattung oder ungünstige Ausrichtung. → <strong>Ost-West-Belegung mit Optimierern</strong>, realistische Ertragserwartung vorab prüfen.</li>
      </ul>

      <h2>Fazit: Die beste Anlage ist die, die zu Ihrem Verbrauch passt</h2>
      <p>Es gibt nicht „die eine" perfekte PV-Anlage, sondern die, die zu Ihrem Dach, Ihrem Verbrauch und Ihren Plänen passt. Wer seinen Verbrauch kennt, das Dach ehrlich einschätzt und an die Zukunft denkt, trifft fast automatisch die richtige Wahl. Für die meisten Familien ist eine Anlage von 8–10 kWp mit einem Speicher um 6–8 kWh das ausgewogenste Paket.</p>
      <p>Rechnen Sie Ihren persönlichen Ertrag und die Ersparnis unverbindlich mit unserem <a href="/photovoltaik">Photovoltaik-Rechner</a> durch. Und wenn Sie eine konkrete, auf Ihr Haus zugeschnittene Empfehlung möchten, beraten wir Sie als Fachbetrieb aus der Region Peine gerne persönlich.</p>
    `,
  },
  {
    slug: "elektroplanung-bauprojekt-fachplaner-frueh-einbinden",
    title:
      "Elektroplanung im Bauprojekt: Warum sich die frühe Einbindung des Fachplaners auszahlt",
    excerpt:
      "Wann lohnt sich die frühzeitige Einbindung des Elektro- und Gebäudeautomationsplaners? Ein Leitfaden für Architekten und Projektplaner – für weniger Nachträge, klare Schnittstellen und wirtschaftliche Gebäude.",
    date: "2026-07-05",
    author: "Eyyub-Abdulaziz Alici",
    category: CATEGORY_B2B,
    subcategory: "Planung & Zusammenarbeit",
    readingTime: 5,
    coverImage: "/blog/elektroplanung-bauprojekt-fachplaner-frueh-einbinden.jpg",
    content: `
      <p>In vielen Bauprojekten wird die Elektro- und Gebäudeautomationsplanung spät betrachtet – oft erst, wenn Grundriss, Statik und Fassade bereits feststehen. Für Architekten und Projektplaner entsteht daraus ein vermeidbares Risiko: nachträgliche Umplanungen, Schnittstellenkonflikte und Kostensteigerungen. Dieser Beitrag zeigt, warum sich die frühzeitige Einbindung eines spezialisierten Fachplaners lohnt und worauf es dabei ankommt.</p>

      <h2>Warum der Zeitpunkt über die Wirtschaftlichkeit entscheidet</h2>
      <p>Die grundlegenden Weichen eines Gebäudes werden in den frühen Leistungsphasen gestellt. Werden Elektro- und TGA-Anforderungen erst spät eingebracht, lassen sich Trassen, Schächte, Technikräume und Leitungswege häufig nur noch mit Kompromissen unterbringen. Frühe Abstimmung dagegen schafft technisch wie wirtschaftlich Planungssicherheit.</p>

      <h2>Was die frühe Fachplanung konkret bringt</h2>
      <ul>
        <li><strong>Weniger Nachträge:</strong> Anforderungen an Stromversorgung, Netzwerk und Automation werden von Anfang an berücksichtigt statt teuer nachgerüstet.</li>
        <li><strong>Klare Schnittstellen:</strong> Abstimmung mit Heizung, Lüftung, Sanitär und Brandschutz vermeidet Kollisionen zwischen den Gewerken.</li>
        <li><strong>Kosten- und Terminsicherheit:</strong> Ein belastbares Elektrokonzept macht Budget und Bauzeit verlässlich kalkulierbar.</li>
        <li><strong>Zukunftsfähigkeit:</strong> Reserven für spätere Erweiterungen – von Ladeinfrastruktur bis Gebäudeautomation – werden von Beginn an mitgedacht.</li>
      </ul>

      <h2>Kritische Schnittstellen, die früh geklärt gehören</h2>
      <p>Gerade an den Übergängen zwischen den Gewerken entstehen die teuersten Fehler. Frühzeitig abstimmen sollten Sie insbesondere:</p>
      <ul>
        <li>Technikräume, Steigezonen und Leitungsführung im Zusammenspiel mit der TGA.</li>
        <li>Anforderungen an Brandschutz, Not- und Sicherheitsbeleuchtung.</li>
        <li>Netzwerk- und Bus-Infrastruktur (z. B. KNX) als Rückgrat der Gebäudeautomation.</li>
        <li>Ladeinfrastruktur für E-Mobilität sowie Photovoltaik, Speicher und Lastmanagement.</li>
      </ul>

      <h2>Nachhaltigkeit und regulatorische Anforderungen</h2>
      <p>Energieeffizienz ist längst kein „Nice-to-have" mehr, sondern Teil der regulatorischen Realität (u. a. Gebäudeenergiegesetz). Ein durchdachtes Elektro- und Automationskonzept ist die Basis für effizienten Betrieb, sinnvolle Sektorenkopplung und die Erfüllung von Förder- und Zertifizierungsanforderungen. Wer diese Themen früh integriert, plant Gebäude, die auch in zehn Jahren noch anschlussfähig sind.</p>

      <h2>Fazit: Ein verlässlicher Fachpartner reduziert Ihr Risiko</h2>
      <p>Die frühzeitige Einbindung eines spezialisierten Elektro- und Gebäudeautomationsplaners ist kein zusätzlicher Aufwand, sondern eine Investition in Planungssicherheit, Wirtschaftlichkeit und Qualität. Als Fachbetrieb aus der Region Peine unterstützen wir Architekten und Projektplaner - zuverlässig, koordiniert und auf Augenhöhe - von der Konzeptphase über die Ausführungsplanung bis zur Objektüberwachung.</p>
    `,
  },
  {
    slug: "altersgerechtes-wohnen-smart-home",
    title: "Altersgerechtes Wohnen: Selbstbestimmt zuhause dank Smart Home",
    excerpt:
      "Wie moderne Elektrotechnik und Smart Home das altersgerechte Wohnen sicherer und komfortabler machen – damit ein selbstbestimmtes Leben in den eigenen vier Wänden länger möglich bleibt.",
    date: "2026-07-04",
    author: "Eyyub-Abdulaziz Alici",
    category: CATEGORY_B2C,
    subcategory: "Smart Home",
    readingTime: 5,
    coverImage: "/blog/altersgerechtes-wohnen-smart-home.jpg",
    content: `
      <p>Die meisten Menschen haben denselben Wunsch: so lange wie möglich in den eigenen vier Wänden wohnen bleiben - auch im höheren Alter. <strong>Altersgerechtes Wohnen</strong> bedeutet, das Zuhause so zu gestalten, dass es Sicherheit, Komfort und Selbstständigkeit unterstützt, statt sie einzuschränken. Moderne Elektrotechnik und Smart Home spielen dabei eine zentrale Rolle.</p>

      <h2>Was bedeutet altersgerechtes Wohnen?</h2>
      <p>Altersgerechtes - oft auch barrierefreies - Wohnen umfasst mehr als breite Türen und einen ebenerdigen Duschbereich. Entscheidend ist, dass sich alltägliche Handgriffe mühelos, sicher und ohne fremde Hilfe erledigen lassen. Genau hier setzt intelligente Gebäudetechnik an: Sie nimmt Aufgaben ab, warnt vor Gefahren und schafft Sicherheit - alles im Hintergrund.</p>

      <h2>Smart Home als Schlüssel zur Selbstständigkeit</h2>
      <p>Ein durchdachtes Smart Home lässt sich individuell auf die Bedürfnisse älterer Menschen abstimmen. Besonders hilfreich sind:</p>
      <ul>
        <li><strong>Beleuchtung mit Bewegungssensor:</strong> Licht schaltet sich nachts auf dem Weg zum Bad automatisch ein - Stürze werden vorgebeugt.</li>
        <li><strong>Sprachsteuerung:</strong> Licht, Rollläden und Heizung lassen sich per Sprachbefehl bedienen, ganz ohne Bücken oder Aufstehen.</li>
        <li><strong>Automatische Rollläden und Türen:</strong> Kein Kraftaufwand mehr - gesteuert per Knopfdruck, Zeitplan oder Sprache.</li>
        <li><strong>Zentrale Steuerung:</strong> Mit einem Tastendruck („Alles aus") werden Licht und Geräte beim Verlassen des Hauses ausgeschaltet.</li>
      </ul>

      <h2>Mehr Sicherheit im Notfall</h2>
      <p>Gerade für Menschen, die allein leben, ist das Thema Sicherheit entscheidend. Smarte Technik kann im Ernstfall Leben retten:</p>
      <ul>
        <li><strong>Rauch- und Wassermelder</strong>, die im Alarmfall automatisch Angehörige benachrichtigen.</li>
        <li><strong>Herdabschaltung</strong>, die eine vergessene Kochplatte selbstständig ausschaltet.</li>
        <li><strong>Notruf- und Sensorsysteme</strong> (Ambient Assisted Living), die ungewöhnliche Inaktivität erkennen und Alarm auslösen.</li>
        <li><strong>Videotürsprechanlagen</strong>, mit denen man sieht, wer vor der Tür steht - ohne aufstehen zu müssen.</li>
      </ul>

      <h2>Förderung: Altersgerechtes Umbauen wird unterstützt</h2>
      <p>Der altersgerechte Umbau muss nicht allein aus eigener Tasche finanziert werden. Über das KfW-Programm <a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/Förderprodukte/Altersgerecht-Umbauen-(159)/?wt_mc=167275361958_787674208512&wt_kw=e_167275361958_kfw%20altersgerecht&wt_cc3=21623236559_167275361958_787674208512&gad_source=1" target="_blank" rel="noopener noreferrer">„Altersgerecht Umbauen"</a> gibt es zinsgünstige Kredite, und die Pflegekasse bezuschusst wohnumfeldverbessernde Maßnahmen bei anerkanntem Pflegegrad. Weil sich Konditionen ändern, lohnt es sich, die aktuellen Bedingungen vor Projektstart zu prüfen – wir beraten Sie gerne dazu.</p>

      <h2>Fazit: Frühzeitig planen lohnt sich</h2>
      <p>Altersgerechtes Wohnen ist kein Thema erst „für später". Wer bei Neubau oder Sanierung frühzeitig an eine flexible, smarte Elektroinstallation denkt, spart später Kosten und Aufwand - und schafft ein Zuhause, das mit den eigenen Bedürfnissen mitwächst. Als Fachbetrieb aus der Region Peine planen und installieren wir Smart-Home-Lösungen, die genau auf Ihre Lebenssituation zugeschnitten sind.</p>
    `,
  },
];

/** Kategorie-Beschriftung für einen Beitrag ohne Kategorie. */
export const DEFAULT_CATEGORY = "Allgemein";

/** Alle Beiträge, absteigend nach Datum sortiert (neueste zuerst). */
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Einen Beitrag anhand seiner slug finden. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Alle vorkommenden Kategorien (eindeutig, alphabetisch sortiert). */
export function getCategories(): string[] {
  const set = new Set(blogPosts.map((post) => post.category || DEFAULT_CATEGORY));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "de"));
}

/**
 * Alle Unterkategorien, die innerhalb einer Hauptkategorie vorkommen
 * (eindeutig, alphabetisch sortiert). Beiträge ohne Unterkategorie werden
 * ignoriert.
 */
export function getSubcategories(category: string): string[] {
  const set = new Set(
    blogPosts
      .filter((post) => (post.category || DEFAULT_CATEGORY) === category)
      .map((post) => post.subcategory)
      .filter((sub): sub is string => Boolean(sub)),
  );
  return Array.from(set).sort((a, b) => a.localeCompare(b, "de"));
}

/** Datum menschenlesbar formatieren (z. B. "15. Januar 2026"). */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
