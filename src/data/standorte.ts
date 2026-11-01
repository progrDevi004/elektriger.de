export type StandortLeistung = {
  title: string;
  description: string;
  href: string;
};

export type Standort = {
  slug: string;
  name: string;
  /** Ortsform für Fließtext, z. B. „in Hannover“ */
  inOrt: string;
  /** Entfernung / Lagebezug zu Peine – ehrlich und kurz */
  lageHinweis: string;
  /** Kurze, konkrete Anfahrt / Erreichbarkeit */
  anfahrt: string;
  isHomeBase?: boolean;
  title: string;
  description: string;
  keywords: string;
  /** H1 zweite Zeile (silber) */
  heroAccent: string;
  /** Einzigartiger Fokus-Satz unter dem Hero */
  schwerpunkt: string;
  intro: string[];
  /** Konkrete Alltagsanfragen – nicht identisch mit den Leistungskarten */
  typischeAnfragen: string[];
  leistungenHeading: string;
  highlightLeistungen: StandortLeistung[];
  werteHeading: string;
  lokalePunkte: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  ctaText: string;
};

/**
 * Standortseiten für das Einsatzgebiet (ca. 50 km um Peine).
 * Gleiche Orientierung, aber eigene Schwerpunkte, FAQs und lokale Bezüge.
 */
export const standorte: Standort[] = [
  {
    slug: "peine",
    name: "Peine",
    inOrt: "in Peine",
    lageHinweis: "Hier ist unser Firmensitz – kurze Wege und schnelle Termine vor Ort.",
    anfahrt: "Firmensitz: Gunzelinstr. 12a, 31224 Peine",
    isHomeBase: true,
    title: "Elektriker in Peine – Elektrik, Energie & Smart Home",
    description:
      "Elektriker in Peine: Elektrik, Sanierung, Smart Home, E-Check, Photovoltaik und Wallbox – persönlich aus Peine, für Peine und die Region.",
    keywords:
      "Elektriker Peine, Elektrik Peine, Elektrofachbetrieb Peine, Smart Home Peine, E-Check Peine, Wallbox Peine",
    heroAccent: "Ihr Elektriker vor Ort.",
    schwerpunkt:
      "Peine ist nicht nur Einsatzort, sondern unser Alltag: Rückfragen, Nacharbeiten und Abnahmen lassen sich vom Sitz in der Gunzelinstraße direkt klären.",
    intro: [
      "Als Elektriker mit Sitz in Peine betreuen wir Wohn- und Gewerbeobjekte in der Stadt und den Ortsteilen – von Vöhrum und Stederdorf bis Dungelbeck. Sie haben einen festen Ansprechpartner, ohne Vermittlung über eine Hotline.",
      "Viele Aufträge hier sind Alltagselektrik mit Substanz: Zählerschrank, FI-Nachrüstung, Netzwerk, Wallbox oder eine Sanierung, die zum Haus passt. Energie und Smart Home nehmen wir mit, wenn sie echten Nutzen bringen – nicht als Pflichtpaket.",
      "Weil wir vor Ort sitzen, können Termine oft enger getaktet werden als in weiter entfernten Städten. Für ein erstes Gespräch reicht oft das Kontaktformular; vor Ort schauen wir uns Verteiler und Leitungsweg an, bevor wir fest zusagen.",
    ],
    typischeAnfragen: [
      "Zählerschrank und Unterverteilung im Bestand erneuern",
      "E-Check vor Hausverkauf oder für die Versicherung",
      "Wallbox am Einfamilienhaus inkl. Leitung",
      "Smart Home für Licht, Heizung und Rollläden",
      "Neubau-Elektrik inkl. Leerrohren für später",
    ],
    leistungenHeading: "Leistungen direkt aus Peine",
    highlightLeistungen: [
      {
        title: "Elektrik & Installation",
        description: "Neubau und Sanierung – von der Unterverteilung bis zur Netzwerktechnik.",
        href: "/elektroinstallation",
      },
      {
        title: "E-Check",
        description: "Ihre Elektrik prüfen lassen – dokumentiert und für die Versicherung geeignet.",
        href: "/e-check",
      },
      {
        title: "Smart Home",
        description: "Licht, Heizung, Beschattung und Sicherheit – herstellerunabhängig.",
        href: "/smart-home",
      },
    ],
    werteHeading: "Warum der Firmensitz den Unterschied macht",
    lokalePunkte: [
      {
        title: "Kurze Wege in der Stadt",
        text: "Termine, Material und Nacharbeiten organisieren wir vom Sitz in Peine – ohne lange Anfahrt als Puffer.",
      },
      {
        title: "Ein Betrieb, drei Themen",
        text: "Elektrik, Energie und Smart Home müssen nicht an verschiedene Firmen. Sie sprechen durchgängig mit uns.",
      },
      {
        title: "Region bleibt erreichbar",
        text: "Peine ist der Kern. Darum herum fahren wir etwa 50 km – Ilsede und Burgdorf oft am selben Tag, größere Städte geplant.",
      },
    ],
    faq: [
      {
        question: "Seid ihr ein Elektriker aus Peine – oder nur „in der Region“?",
        answer:
          "Firmensitz ist Gunzelinstr. 12a in Peine. Beratung, Material und Ausführung laufen von hier. Die Region bedienen wir zusätzlich, der Sitz bleibt Peine.",
      },
      {
        question: "Macht ihr auch nur einzelne Arbeiten, ohne Komplettsanierung?",
        answer:
          "Ja. Wallbox, Zählerschrank, E-Check oder eine Smart-Home-Nachrüstung sind normale Aufträge. Sie müssen kein ganzes Haus auf einmal beauftragen.",
      },
      {
        question: "Wie schnell bekomme ich in Peine einen Termin?",
        answer:
          "Oft zügiger als in Hannover oder Hildesheim, weil keine lange Anfahrt nötig ist. Schreiben Sie kurz Ihr Vorhaben – wir sagen ehrlich, wann wir können.",
      },
    ],
    ctaText: "Projekt in Peine besprechen",
  },
  {
    slug: "hannover",
    name: "Hannover",
    inOrt: "in Hannover",
    lageHinweis: "Von Peine aus gut erreichbar – wir kommen für Beratung und Ausführung nach Hannover.",
    anfahrt: "Ca. 35–45 Minuten von Peine, je nach Stadtteil und Verkehr",
    title: "Elektriker in Hannover – Elektrik & Smart Home aus der Region",
    description:
      "Elektriker für Hannover und Umgebung: Elektrik, Sanierung, Smart Home, Wallbox und E-Check – Fachbetrieb aus Peine, vor Ort in Hannover.",
    keywords:
      "Elektriker Hannover, Elektrik Hannover, Smart Home Hannover, Wallbox Hannover, E-Check Hannover, Elektrofachbetrieb Region Hannover",
    heroAccent: "Auch in Hannover vor Ort.",
    schwerpunkt:
      "In Hannover geht es oft um Bestand, Mehrfamilienhaus und Wallbox – mit Absprachen zu Tiefgarage, Zählerplatz und Eigentümergemeinschaft.",
    intro: [
      "Hannover ist für uns ein geplant erreichbarer Einsatzort, kein Zufallsfund auf einer Karte. Wir kommen aus Peine, stimmen Termine auf Stadtteil und Anfahrt ab und führen Beratung wie Installation vor Ort aus.",
      "Typisch sind Sanierungen im Bestand, Wallboxen in Einfamilienhäusern oder Tiefgaragen und Smart-Home-Lösungen, die sich später erweitern lassen. In Mehrfamilienhäusern klären wir früh, was am Zählerplatz und an der Gemeinschaftsinstallation möglich ist.",
      "Sie bekommen keinen Callcenter-Betrieb, sondern denselben Fachbetrieb, der auch plant und ausführt. Ein verbindliches Angebot folgt, sobald Leitungsweg, Absicherung und – falls nötig – die Abstimmung mit Verwaltung oder WEG klar sind.",
    ],
    typischeAnfragen: [
      "Wallbox im EFH oder in der Tiefgarage",
      "Elektrik im Altbau modernisieren, ohne alles aufzureißen",
      "Smart Home nachrüsten (Licht, Heizung, Sicherheit)",
      "Zählerplatz und Leistung für E-Auto prüfen",
      "Abstimmung mit Hausverwaltung oder WEG",
    ],
    leistungenHeading: "Häufig in Hannover gefragt",
    highlightLeistungen: [
      {
        title: "Wallbox & E-Mobilität",
        description: "Leitung, Absicherung und Anmeldung – damit Laden zu Hause oder in der Tiefgarage sicher funktioniert.",
        href: "/wallbox-leitung",
      },
      {
        title: "Elektrik im Bestand",
        description: "Modernisierung und Nachrüstung, ohne dass alles neu gemacht werden muss.",
        href: "/elektroinstallation",
      },
      {
        title: "Smart Home",
        description: "Sinnvolle Automation für Alltag und Energieverbrauch – klar geplant.",
        href: "/smart-home",
      },
    ],
    werteHeading: "Was in Hannover oft den Ablauf bestimmt",
    lokalePunkte: [
      {
        title: "Stadtteil und Anfahrt",
        text: "Innenstadtnah oder im Speckgürtel: Wir planen Termine mit Puffer für Verkehr – und bleiben beim vereinbarten Fenster.",
      },
      {
        title: "Mehrfamilienhaus & WEG",
        text: "Wallbox, Zählerschrank oder gemeinsame Infrastruktur brauchen oft Beschlüsse. Wir sagen vorher, welche Angaben die Verwaltung braucht.",
      },
      {
        title: "Persönlich statt anonym",
        text: "Sie sprechen mit dem Betrieb aus Peine, der ausführt – nicht mit einer Vermittlung, die Aufträge weiterreicht.",
      },
    ],
    faq: [
      {
        question: "Kommt ihr wirklich nach Hannover – oder nur bis zum Umland?",
        answer:
          "Wir kommen nach Hannover und in angrenzende Stadtteile. Anfahrt sind grob 35–45 Minuten von Peine. Beratung und Ausführung finden vor Ort statt; Firmensitz bleibt Peine.",
      },
      {
        question: "Geht eine Wallbox in der Tiefgarage?",
        answer:
          "Oft ja, aber nicht pauschal. Es kommt auf Zählerplatz, Leitungsweg, Lastmanagement und die Regeln der WEG an. Das klären wir vor einem Angebot.",
      },
      {
        question: "Kann ich vorher unverbindlich schätzen?",
        answer:
          "Ja. Der Angebotsrechner gibt eine Preisspanne. Ein verbindliches Angebot erstellen wir nach Klärung vor Ort – in Hannover besonders, wenn Tiefgarage oder Bestand dazukommen.",
      },
    ],
    ctaText: "Termin in Hannover anfragen",
  },
  {
    slug: "braunschweig",
    name: "Braunschweig",
    inOrt: "in Braunschweig",
    lageHinweis: "Braunschweig liegt nah an Peine – ideal für regelmäßige Baustellenbetreuung.",
    anfahrt: "Ca. 20–25 Minuten von Peine",
    title: "Elektriker in Braunschweig – Elektrik, Energie & Smart Home",
    description:
      "Elektriker für Braunschweig: Elektrik, Photovoltaik, Wallbox, Smart Home und E-Check – Fachbetrieb aus Peine, aktiv in Braunschweig und Umgebung.",
    keywords:
      "Elektriker Braunschweig, Elektrik Braunschweig, Smart Home Braunschweig, Photovoltaik Braunschweig, Wallbox Braunschweig, E-Check Braunschweig",
    heroAccent: "Nah an Peine. Nah bei Ihnen.",
    schwerpunkt:
      "Die kurze Distanz Peine–Braunschweig eignet sich für Projekte, die mehr als einen Termin brauchen: PV-Anbindung, Smart Home und Bauüberwachung.",
    intro: [
      "Braunschweig erreichen wir von Peine in rund 20–25 Minuten. Deshalb betreuen wir hier gerne durchgängige Projekte: erste Idee, Zählerschrank, Ausführung und Abnahme – ohne dass jeder Termin ein Tagesausflug wird.",
      "Viele Anfragen drehen sich um zukunftsfähige Elektrik: Vorbereitung für Photovoltaik, Wallbox, Energiemanagement und Smart Home. Wir planen so, dass Speicher oder weitere Stromkreise später nicht teuer nachgerüstet werden müssen.",
      "Wenn schon eine Elektrofirma auf der Baustelle ist, übernehmen wir auf Wunsch die unabhängige Bauüberwachung – Qualitätskontrolle, Mängel und Abnahmebegleitung statt Ausführung im selben Auftrag.",
    ],
    typischeAnfragen: [
      "PV-Anlage elektrisch anbinden und Eigenverbrauch mitdenken",
      "Wallbox plus Reserve für Speicher",
      "Smart Home im Neubau oder als Nachrüstung",
      "Unabhängige Kontrolle der Elektroarbeiten",
      "Zählerschrank für PV, Wallbox und Haushalt vorbereiten",
    ],
    leistungenHeading: "Energie und Elektrik in Braunschweig",
    highlightLeistungen: [
      {
        title: "Photovoltaik & Energie",
        description: "Ersteinschätzung und elektrische Anbindung – mit Blick auf Eigenverbrauch.",
        href: "/photovoltaik",
      },
      {
        title: "Smart Home",
        description: "Komfort und Effizienz, abgestimmt auf Neubau oder Bestand.",
        href: "/smart-home",
      },
      {
        title: "Bauüberwachung Elektro",
        description: "Unabhängige Kontrolle der Elektrofirma – für Bauherren und Bauunternehmer.",
        href: "/planung-bauleitung",
      },
    ],
    werteHeading: "Warum Braunschweig gut zu Peine passt",
    lokalePunkte: [
      {
        title: "Kurze Anfahrt",
        text: "Rückfragen und Nacharbeiten sind von Peine aus alltagstauglich – das merkt man bei längeren Baustellen.",
      },
      {
        title: "Neubau mit Weitblick",
        text: "Leerrohre, Reserve im Verteiler und Netzwerk früh mitdenken. Das spart in Braunschweiger Neubauten später Aufwand.",
      },
      {
        title: "Auch ohne eigene Ausführung",
        text: "Wenn die Elektrofirma schon beauftragt ist, bleiben wir auf der Bauherrenseite und prüfen fachlich.",
      },
    ],
    faq: [
      {
        question: "Arbeitet ihr nur in Braunschweig-Stadt?",
        answer:
          "Braunschweig und die nähere Umgebung gehören zum Einsatzgebiet. Die Anfahrt von Peine ist kurz genug für regelmäßige Termine, nicht nur für einmalige Einsätze.",
      },
      {
        question: "Könnt ihr PV, Wallbox und Smart Home in einem Zug planen?",
        answer:
          "Ja, das ist oft sinnvoll. Wir schauen auf Zählerschrank, Leitung und spätere Erweiterungen, damit nichts doppelt aufgerissen wird.",
      },
      {
        question: "Was ist der Unterschied zwischen Ausführung und Bauüberwachung?",
        answer:
          "Ausführung heißt: wir installieren. Bauüberwachung heißt: eine andere Firma baut, wir prüfen unabhängig. Beides gleichzeitig im selben Auftrag machen wir nicht.",
      },
    ],
    ctaText: "Anfrage für Braunschweig",
  },
  {
    slug: "hildesheim",
    name: "Hildesheim",
    inOrt: "in Hildesheim",
    lageHinweis: "Im südlichen Einsatzgebiet – wir kommen für Beratung und Ausführung nach Hildesheim.",
    anfahrt: "Ca. 35–40 Minuten von Peine",
    title: "Elektriker in Hildesheim – Sanierung, E-Check & Elektrik",
    description:
      "Elektriker für Hildesheim: Elektrik modernisieren, E-Check, Smart Home und Wallbox – Fachbetrieb aus Peine, vor Ort in Hildesheim und Umgebung.",
    keywords:
      "Elektriker Hildesheim, Elektrik Hildesheim, E-Check Hildesheim, Sanierung Elektrik Hildesheim, Smart Home Hildesheim, Wallbox Hildesheim",
    heroAccent: "Sicher modernisieren.",
    schwerpunkt:
      "In Hildesheim steht oft der Bestand im Vordergrund: ältere Verteiler, fehlende FI-Absicherung und eine Sanierung in sinnvoller Reihenfolge.",
    intro: [
      "Hildesheim erreichen wir von Peine in etwa 35–40 Minuten. Die Anfragen hier sind seltener „alles neu“, sondern: Was ist noch sicher – und was sollte als Nächstes erneuert werden?",
      "Typisch sind unübersichtliche Verteiler, fehlende FI-Schalter, alte Leitungen und der Wunsch, Elektrik Schritt für Schritt zu modernisieren. Wir prüfen den Ist-Zustand, priorisieren Pflicht vor Komfort und setzen um, was Nutzen bringt.",
      "Ein E-Check vor Verkauf, Vermietung oder für die Versicherung ist hier häufig der Einstieg. Daraus entsteht eine klare Liste – nicht automatisch eine Komplettsanierung.",
    ],
    typischeAnfragen: [
      "E-Check vor Verkauf, Vermietung oder für die Versicherung",
      "FI-Schutz und Unterverteilung nachrüsten",
      "Teilmodernisierung statt Komplettabriss",
      "Wallbox im älteren Einfamilienhaus",
      "Leitungen und Reserve für späteres Smart Home vorbereiten",
    ],
    leistungenHeading: "Modernisieren in Hildesheim",
    highlightLeistungen: [
      {
        title: "E-Check",
        description: "Prüfung mit klarer Einschätzung: Was ist sicher, was sollte zeitnah erneuert werden?",
        href: "/e-check",
      },
      {
        title: "Sanierung Elektrik",
        description: "Teil- oder Komplettmodernisierung – abgestimmt auf Budget und Gebäude.",
        href: "/elektroinstallation",
      },
      {
        title: "Wallbox",
        description: "Nachrüstung im Eigenheim mit sicherer Leitung und Absicherung.",
        href: "/wallbox-leitung",
      },
    ],
    werteHeading: "So gehen wir mit Bestand in Hildesheim um",
    lokalePunkte: [
      {
        title: "Erst prüfen, dann bauen",
        text: "Nicht jedes Haus braucht sofort alles neu. Wir trennen Pflicht von Wunsch und erklären die Reihenfolge.",
      },
      {
        title: "Protokoll statt Bauchgefühl",
        text: "Prüfprotokolle und nachvollziehbare Empfehlungen – für Eigentümer, Käufer und Versicherungen.",
      },
      {
        title: "Smart Home als Option",
        text: "Bei Sanierungen legen wir gern Leerrohre und Reserve, damit Automation später ergänzt werden kann – ohne sie aufzuzwingen.",
      },
    ],
    faq: [
      {
        question: "Lohnt sich ein E-Check, bevor ich in Hildesheim sanieren lasse?",
        answer:
          "Häufig ja. Sie sehen, wo Handlungsbedarf besteht, und investieren gezielt. Manche Maßnahmen sind Pflicht für die Sicherheit, andere können warten.",
      },
      {
        question: "Ist Hildesheim noch in eurem Einsatzgebiet?",
        answer:
          "Ja. Die Anfahrt von Peine liegt bei etwa 35–40 Minuten. Wir kommen für Beratung und Ausführung, planen Termine aber bewusst – kein spontaner Kurzbesuch.",
      },
      {
        question: "Kann ich nur den Verteiler erneuern, ohne die ganze Wohnung?",
        answer:
          "Oft ja. Viele ältere Anlagen gewinnen schon durch FI-Schutz, klare Beschriftung und eine zeitgemäße Unterverteilung deutlich an Sicherheit.",
      },
    ],
    ctaText: "Beratung in Hildesheim anfragen",
  },
  {
    slug: "salzgitter",
    name: "Salzgitter",
    inOrt: "in Salzgitter",
    lageHinweis: "Südöstlich von Peine – privat und gewerblich im Einsatzgebiet.",
    anfahrt: "Ca. 25–30 Minuten von Peine",
    title: "Elektriker in Salzgitter – Elektrik & Energie zuverlässig umsetzen",
    description:
      "Elektriker für Salzgitter: Elektrik, E-Check, Wallbox, Smart Home und Energie – Fachbetrieb aus Peine für Salzgitter und Umgebung.",
    keywords:
      "Elektriker Salzgitter, Elektrik Salzgitter, E-Check Salzgitter, Wallbox Salzgitter, Smart Home Salzgitter, Elektrofachbetrieb Salzgitter",
    heroAccent: "Zuverlässig. Klar. Vor Ort.",
    schwerpunkt:
      "In Salzgitter betreuen wir private Häuser und gewerbliche Anfragen – mit Termintreue, wenn Mieter, Schichten oder Abnahmen betroffen sind.",
    intro: [
      "Salzgitter liegt rund 25–30 Minuten von Peine. Wir fahren für Wohnobjekte ebenso wie für gewerbliche Anfragen: Prüfung, Dokumentation, klassische Elektrik und – wo sinnvoll – Wallbox oder Steuerung.",
      "Wichtig ist uns eine klare Ansage: Was wird gemacht, welcher Richtwert gilt, wann sind wir fertig? Gerade wenn Produktion, Öffnungszeiten oder Mieter betroffen sind, zählt Verlässlichkeit mehr als ein möglichst früher, aber unsicherer Termin.",
      "Hausverwaltungen brauchen oft Protokolle und einen erreichbaren Ansprechpartner statt wechselnder Subunternehmer. Das bilden wir ab – ohne ein Callcenter dazwischen.",
    ],
    typischeAnfragen: [
      "E-Check für Eigentum, Vermietung oder Verwaltung",
      "Elektrik in Wohn- und Gewerbeobjekten",
      "Termine außerhalb der Stoßzeiten abstimmen",
      "Unabhängige Bauüberwachung der Elektroarbeiten",
      "Wallbox am Betriebs- oder Wohnhaus",
    ],
    leistungenHeading: "Privat und gewerblich in Salzgitter",
    highlightLeistungen: [
      {
        title: "Elektrik & Installation",
        description: "Saubere Ausführung für Wohn- und Gewerbeobjekte – nachvollziehbar dokumentiert.",
        href: "/elektroinstallation",
      },
      {
        title: "E-Check & Prüfung",
        description: "Sicherheitsprüfung mit Protokoll – für Eigentümer, Verwaltung und Versicherung.",
        href: "/e-check",
      },
      {
        title: "Bauüberwachung",
        description: "Wenn die Elektrofirma schon beauftragt ist: unabhängige fachliche Kontrolle.",
        href: "/planung-bauleitung",
      },
    ],
    werteHeading: "Worauf es in Salzgitter bei uns ankommt",
    lokalePunkte: [
      {
        title: "Termine einhalten",
        text: "Wir planen mit Anfahrt von Peine und sagen früh Bescheid, wenn sich etwas verschiebt – nicht am Morgen der Baustelle.",
      },
      {
        title: "Gewerbe & Privat",
        text: "Unterschiedliche Abläufe, gleiche Sorgfalt bei Sicherheit und Dokumentation. Gewerbe heißt bei uns nicht „schnell und ungenau“.",
      },
      {
        title: "Ein Ansprechpartner",
        text: "Für Verwaltungen: eine Nummer, ein Betrieb, nachvollziehbare Protokolle – statt einer Kette aus Vermittlungen.",
      },
    ],
    faq: [
      {
        question: "Arbeitet ihr in Salzgitter auch für Hausverwaltungen?",
        answer:
          "Ja. E-Check, Dokumentation und klare Ansprechpartner sind gerade für Verwaltungen wichtig. Wir stimmen Zugänge und Zeitfenster vorher ab.",
      },
      {
        question: "Kommt ihr in alle Stadtteile, etwa Lebenstedt?",
        answer:
          "Salzgitter und die nähere Umgebung liegen im Einsatzgebiet. Schreiben Sie den konkreten Ort dazu – wir sagen, ob der Termin sinnvoll in die Tour passt.",
      },
      {
        question: "Könnt ihr außerhalb üblicher Wohnzeiten arbeiten?",
        answer:
          "Wo es die Baustelle und die Sicherheit zulassen, stimmen wir Zeitfenster ab – etwa wenn Mieter oder Betrieb nicht gestört werden sollen. Das gehört in die Abstimmung, nicht in die Fußnote.",
      },
    ],
    ctaText: "Anfrage für Salzgitter",
  },
  {
    slug: "wolfenbuettel",
    name: "Wolfenbüttel",
    inOrt: "in Wolfenbüttel",
    lageHinweis: "Im südöstlichen Umfeld von Braunschweig – gut von Peine aus erreichbar.",
    anfahrt: "Ca. 30–35 Minuten von Peine über die Region Braunschweig",
    title: "Elektriker in Wolfenbüttel – Elektrik für Eigenheim & Energie",
    description:
      "Elektriker für Wolfenbüttel: Elektrik, Photovoltaik, Wallbox und Smart Home – Fachbetrieb aus Peine, vor Ort in Wolfenbüttel und Umgebung.",
    keywords:
      "Elektriker Wolfenbüttel, Elektrik Wolfenbüttel, Photovoltaik Wolfenbüttel, Wallbox Wolfenbüttel, Smart Home Wolfenbüttel, E-Check Wolfenbüttel",
    heroAccent: "Für Eigenheim & Alltag.",
    schwerpunkt:
      "In Wolfenbüttel dreht sich viel ums Eigenheim: sicheres Laden, PV sinnvoll nutzen und Komfort, der den Alltag nicht komplizierter macht.",
    intro: [
      "Wolfenbüttel erreichen wir von Peine in etwa 30–35 Minuten, oft über die Region Braunschweig. Die meisten Anfragen kommen aus Einfamilienhäusern: Elektrik auf den heutigen Bedarf bringen, E-Auto laden, Sonnenstrom nutzen.",
      "Wir beraten praxisnah: Was lohnt sich jetzt, was kann später nachgerüstet werden, was sollte im Zählerschrank gleich mitgedacht werden? Verkaufsdruck auf große Extra-Pakete gehört nicht dazu.",
      "Smart Home setzen wir ein, wo es den Alltag erleichtert – Licht, Heizung, Rollläden – nicht als Technikspiel. PV und Wallbox planen wir zusammen, wenn beides absehbar ist.",
    ],
    typischeAnfragen: [
      "Wallbox am Einfamilienhaus inkl. Leitungsquerschnitt",
      "PV elektrisch anbinden, optional mit Blick auf Speicher",
      "Smart Home für Alltag (Licht, Heizung, Beschattung)",
      "Zählerschrank für PV und E-Auto vorbereiten",
      "Schrittweise Sanierung statt Komplettumbau",
    ],
    leistungenHeading: "Fürs Eigenheim in Wolfenbüttel",
    highlightLeistungen: [
      {
        title: "Photovoltaik",
        description: "Orientierung zu Ertrag, Speicher und elektrischer Anbindung.",
        href: "/photovoltaik",
      },
      {
        title: "Wallbox",
        description: "Sichere Ladeinfrastruktur am Haus – inklusive Leitungsdimensionierung.",
        href: "/wallbox-leitung",
      },
      {
        title: "Smart Home",
        description: "Komfortfunktionen, die den Alltag erleichtern – ohne unnötige Komplexität.",
        href: "/smart-home",
      },
    ],
    werteHeading: "Alltag vor Technik-Show",
    lokalePunkte: [
      {
        title: "Familie, Homeoffice, E-Auto",
        text: "Wir planen für den Gebrauch: ausreichend Stromkreise, saubere Absicherung, Laden zu Hause ohne Überraschungen im Verteiler.",
      },
      {
        title: "Heute Wallbox, morgen Speicher",
        text: "Die Elektrik sollte mitwachsen. Reserve und saubere Dokumentation sparen den zweiten großen Eingriff.",
      },
      {
        title: "Verständlich entscheiden",
        text: "Sie bekommen eine Empfehlung mit Begründung – und dürfen „später“ sagen, ohne dass das Projekt kippt.",
      },
    ],
    faq: [
      {
        question: "Ist Wolfenbüttel für euch ein sinnvoller Einsatzort?",
        answer:
          "Ja. Die Anfahrt liegt bei etwa 30–35 Minuten. Wir kommen für Beratung und Ausführung; Termine planen wir mit der Tour Richtung Braunschweig.",
      },
      {
        question: "Kann ich PV und Wallbox zusammen planen?",
        answer:
          "Ja, das ist oft sinnvoll. Wir schauen auf Zählerschrank, Leitung und spätere Erweiterungen, damit die Wallbox den PV-Strom später mitnutzen kann.",
      },
      {
        question: "Muss ich für Smart Home die ganze Elektrik neu machen?",
        answer:
          "Nicht zwingend. Vieles lässt sich nachrüsten. Bei einer anstehenden Sanierung legen wir die Grundlage gleich mit – das ist günstiger als dreimal aufstemmen.",
      },
    ],
    ctaText: "Projekt in Wolfenbüttel starten",
  },
  {
    slug: "ilsede",
    name: "Ilsede",
    inOrt: "in Ilsede",
    lageHinweis: "Direkt neben Peine – sehr kurze Wege für Termine und Rückfragen.",
    anfahrt: "Ca. 10 Minuten vom Firmensitz in Peine",
    title: "Elektriker in Ilsede – Elektrik, Energie & Smart Home",
    description:
      "Elektriker für Ilsede: Elektrik, Sanierung, Smart Home, E-Check und Wallbox – Fachbetrieb aus Peine, vor Ort in Ilsede und Umgebung.",
    keywords:
      "Elektriker Ilsede, Elektrik Ilsede, Smart Home Ilsede, E-Check Ilsede, Wallbox Ilsede, Elektrofachbetrieb Ilsede",
    heroAccent: "Nachbarort. Kurze Wege.",
    schwerpunkt:
      "Ilsede liegt praktisch vor der Tür: Groß Ilsede, Gadenstedt und die Ortsteile erreichen wir ohne lange Anfahrt – gut für laufende Baustellen.",
    intro: [
      "Ilsede ist für uns kein „weiter Ort im Umkreis“, sondern Nachbarschaft. Von Peine sind es rund zehn Minuten. Für Sie heißt das: Termine ohne großen Puffer, Rückfragen ohne Tag Verzögerung, Nacharbeiten, die in den Alltag passen.",
      "Wir betreuen hier Neubauten ebenso wie Bestandsgebäude: Unterverteilung, E-Check, Wallbox, Netzwerk. Die Ortsteile um Groß Ilsede, Klein Ilsede, Gadenstedt oder Adenstedt gehören dazu, solange sie in der kurzen Distanz bleiben.",
      "Weil die Strecke kurz ist, können wir Arbeiten oft enger staffeln als in Hildesheim oder Hannover. Das Angebot bleibt dasselbe Fachniveau – nur die Logistik ist einfacher.",
    ],
    typischeAnfragen: [
      "Neubau-Elektrik in Ilsede und Ortsteilen",
      "Sanierung im Einfamilienhaus",
      "E-Check mit kurzem Vor-Ort-Termin",
      "Wallbox ohne Wochen Vorlauf für Anfahrt",
      "Nacharbeiten und Feinschliff zeitnah",
    ],
    leistungenHeading: "Elektrik in Ilsede und den Ortsteilen",
    highlightLeistungen: [
      {
        title: "Elektrik & Installation",
        description: "Neubau und Modernisierung – von der Unterverteilung bis zur Steckdose.",
        href: "/elektroinstallation",
      },
      {
        title: "E-Check",
        description: "Prüfung Ihrer Elektrik mit nachvollziehbarer Dokumentation.",
        href: "/e-check",
      },
      {
        title: "Wallbox",
        description: "Sicheres Laden zu Hause – Leitung und Absicherung inklusive.",
        href: "/wallbox-leitung",
      },
    ],
    werteHeading: "Was die Nähe zu Peine konkret ändert",
    lokalePunkte: [
      {
        title: "Flexible Termine",
        text: "Kurze Anfahrt hält Fenster kleiner und Nacharbeiten machbar – ideal bei laufenden Baustellen in Ilsede.",
      },
      {
        title: "Neubau und Bestand",
        text: "Wir kennen beides aus der Region: frische Installationen und Häuser, die schrittweise modernisiert werden.",
      },
      {
        title: "Gleicher Ansprechpartner",
        text: "Elektrik, Prüfung und smarte Ergänzungen bleiben bei uns. Sie müssen nicht drei Betriebe koordinieren.",
      },
    ],
    faq: [
      {
        question: "Kommt ihr auch in die Ortsteile von Ilsede?",
        answer:
          "Ja. Groß Ilsede und die näheren Ortsteile liegen im Kern des Einsatzgebiets. Nennen Sie uns die Adresse, dann planen wir den Termin ohne Umwege.",
      },
      {
        question: "Ist ein Termin in Ilsede schneller zu haben als in Hannover?",
        answer:
          "Oft ja, weil die Anfahrt entfällt. Verbindlich sagen wir das erst nach Ihrem Vorhaben – aber die Logistik ist klar einfacher.",
      },
      {
        question: "Macht ihr in Ilsede auch nur eine Wallbox oder einen E-Check?",
        answer:
          "Ja. Einzelmaßnahmen sind hier üblich. Ein Komplettprojekt ist nicht Voraussetzung.",
      },
    ],
    ctaText: "Anfrage für Ilsede",
  },
  {
    slug: "burgdorf",
    name: "Burgdorf",
    inOrt: "in Burgdorf",
    lageHinweis: "Zwischen Peine und Hannover – gut erreichbar im westlichen Einsatzgebiet.",
    anfahrt: "Ca. 20–25 Minuten von Peine, Richtung Region Hannover",
    title: "Elektriker in Burgdorf – Elektrik, Wallbox & Smart Home",
    description:
      "Elektriker für Burgdorf: Elektrik, Wallbox, Smart Home und E-Check – Fachbetrieb aus Peine, vor Ort in Burgdorf und Umgebung.",
    keywords:
      "Elektriker Burgdorf, Elektrik Burgdorf, Wallbox Burgdorf, Smart Home Burgdorf, E-Check Burgdorf, Elektrofachbetrieb Burgdorf",
    heroAccent: "Zwischen Peine und Hannover.",
    schwerpunkt:
      "Burgdorf liegt auf der Achse Peine–Hannover. Viele Haushalte brauchen stabile Elektrik, eine Wallbox für den Arbeitsweg und Technik, die man wirklich nutzt.",
    intro: [
      "Burgdorf erreichen wir von Peine in etwa 20–25 Minuten. Die Lage zwischen Peine und Hannover prägt die Anfragen: Einfamilienhäuser, Pendeln, E-Auto, Homeoffice – die Elektrik soll im Alltag halten, nicht nur auf dem Plan.",
      "Wir kommen aus Peine, schauen uns Verteiler und Leitungsweg vor Ort an und setzen um, was zu Haus und Budget passt. Überladene Smart-Home-Pakete, die niemand bedient, verkaufen wir nicht.",
      "Wallbox, schrittweise Sanierung und eine nachvollziehbare Prüfung sind hier die häufigsten Einstiege. Wenn später PV dazukommt, sollte der Zählerschrank das schon erlauben.",
    ],
    typischeAnfragen: [
      "Wallbox für Pendlerinnen und Pendler",
      "Unterverteilung modernisieren",
      "Smart Home für Licht und Sicherheit, ohne Herstellerzwang",
      "E-Check vor Umbau oder Verkauf",
      "Netzwerk und Arbeitszimmer im Bestand nachrüsten",
    ],
    leistungenHeading: "Wallbox, Elektrik und Smart Home in Burgdorf",
    highlightLeistungen: [
      {
        title: "Wallbox",
        description: "Ladeinfrastruktur am Haus – sicher dimensioniert und angebunden.",
        href: "/wallbox-leitung",
      },
      {
        title: "Elektrik & Sanierung",
        description: "Verteiler und Installation modernisieren – auch schrittweise möglich.",
        href: "/elektroinstallation",
      },
      {
        title: "Smart Home",
        description: "Komfort und Sicherheit – herstellerunabhängig und alltagstauglich.",
        href: "/smart-home",
      },
    ],
    werteHeading: "Was in Burgdorf oft den Ausschlag gibt",
    lokalePunkte: [
      {
        title: "Laden vor dem Arbeitstag",
        text: "Eine Wallbox muss zum Hausanschluss passen. Wir dimensionieren Leitung und Absicherung, statt nur das Gerät zu setzen.",
      },
      {
        title: "Termine auf der Achse Peine–Hannover",
        text: "Burgdorf lässt sich gut mit dem westlichen Einsatzgebiet kombinieren. Das hält Anfahrten ehrlich und Termine planbar.",
      },
      {
        title: "Notwendig vor optional",
        text: "Wir trennen, was sicherheitsrelevant ist, von dem, was Komfort bringt. Sie entscheiden, in welcher Reihenfolge investiert wird.",
      },
    ],
    faq: [
      {
        question: "Gehört Burgdorf (Region Hannover) zu eurem Einsatzgebiet?",
        answer:
          "Ja. Burgdorf liegt rund 20–25 Minuten von Peine. Wir kommen für Beratung und Ausführung; Firmensitz bleibt Peine.",
      },
      {
        question: "Ist eine Wallbox in Burgdorf oft der erste Schritt?",
        answer:
          "Häufig ja – gerade wenn der Arbeitsweg nach Hannover geht. Wir prüfen trotzdem Zählerschrank und Leitung, bevor wir ein Gerät empfehlen.",
      },
      {
        question: "Macht ihr auch Einzelmaßnahmen ohne Komplettprojekt?",
        answer:
          "Ja. Wallbox, E-Check oder Smart-Home-Nachrüstung sind übliche Aufträge. Ein Komplettumbau ist nicht nötig.",
      },
    ],
    ctaText: "Anfrage für Burgdorf",
  },
];

/** Anzeige-Reihenfolge: Firmensitz zuerst, dann nahe Orte, dann größere Städte. */
const STANDORT_ORDER = [
  "peine",
  "ilsede",
  "burgdorf",
  "hannover",
  "braunschweig",
  "hildesheim",
  "salzgitter",
  "wolfenbuettel",
] as const;

export function getStandortBySlug(slug: string): Standort | undefined {
  return standorte.find((s) => s.slug === slug);
}

export function getStandorteOrdered(): Standort[] {
  return STANDORT_ORDER.map((slug) => getStandortBySlug(slug)).filter(
    (s): s is Standort => Boolean(s),
  );
}

export function getAllStandortSlugs(): string[] {
  return getStandorteOrdered().map((s) => s.slug);
}
