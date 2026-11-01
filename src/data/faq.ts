/**
 * FAQ-Seite – Fragen und Antworten hier pflegen.
 *
 * Neue Frage: Objekt ins Array `faqItems` einfügen.
 * Reihenfolge auf der Seite = Reihenfolge in diesem Array.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "In welchem Gebiet seid ihr unterwegs?",
    answer:
      "Firmensitz ist Peine. Von hier aus betreuen wir Projekte in etwa 50 km Umkreis – unter anderem Ilsede, Burgdorf, Hannover, Braunschweig, Hildesheim, Salzgitter und Wolfenbüttel.",
  },
  {
    question: "Kann ich auch nur eine einzelne Arbeit beauftragen?",
    answer:
      "Ja. Wallbox, E-Check, Zählerschrank oder eine Smart-Home-Nachrüstung sind übliche Aufträge. Sie müssen kein Komplettprojekt vergeben.",
  },
  {
    question: "Wie bekomme ich ein Angebot?",
    answer:
      "Über das Kontaktformular, telefonisch oder per WhatsApp. Der Angebotsrechner gibt eine erste Preisspanne – ein verbindliches Angebot erstellen wir nach Klärung vor Ort.",
  },
  {
    question: "Arbeitet ihr auch am Wochenende oder außerhalb der üblichen Zeiten?",
    answer:
      "Regulär Mo–Fr. Wo es die Baustelle zulässt, stimmen wir Zeitfenster ab – zum Beispiel wenn Mieter oder Betrieb möglichst wenig gestört werden sollen.",
  },
  {
    question: "Macht ihr auch E-Check und Dokumentation für Versicherungen?",
    answer:
      "Ja. Der E-Check prüft die elektrische Anlage und wird nachvollziehbar dokumentiert – unter anderem für Eigentümer, Verwaltungen und Versicherungen.",
  },
  {
    question: "Plant ihr Smart Home herstellerunabhängig?",
    answer:
      "Ja. Wir setzen Systeme ein, die zu Haus und Alltag passen – ohne Zwang auf eine bestimmte Marke.",
  },
];
