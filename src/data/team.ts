/**
 * Zentrale Datenquelle für die Team-/Personenprofile ("Über mich"-Seiten).
 *
 * Jedes Teammitglied bekommt eine eigene Profilseite unter /team/<slug>.
 * Die Profile werden auf der Seite "Über uns" als Karten verlinkt.
 *
 * Neues Teammitglied anlegen:
 * 1. Ein neues Objekt in das `teamMembers`-Array einfügen.
 * 2. Eine eindeutige `slug` vergeben – daraus entsteht die URL: /team/<slug>.
 * 3. `image` auf den Pfad im public-Ordner setzen, z. B.
 *    "/team/max-mustermann.jpg". Fehlt das Bild, zeigt die Seite automatisch
 *    einen Platzhalter ("Foto folgt").
 * 4. `bio` als Absatz-Array pflegen, `expertise` und `qualifikationen` als
 *    Stichpunkt-Listen.
 */

export interface TeamMember {
  /** Eindeutiger URL-Bezeichner, z. B. "eyyub-abdulaziz-alici". */
  slug: string;
  name: string;
  /** Funktion/Rolle, z. B. "Gründer & Elektroingenieur". */
  role: string;
  /** Alter in Jahren (optional). */
  age?: number;
  /** Kurze, persönliche Zeile für die Karten-Vorschau auf /ueber-uns. */
  teaser: string;
  /**
   * Profilbild als Pfad aus dem public-Ordner (z. B. "/team/name.jpg").
   * Fehlt der Wert, wird ein Platzhalter angezeigt.
   */
  image?: string;
  /** Alternativtext für das Profilbild. */
  imageAlt?: string;
  /** Einleitungssatz oben auf der Profilseite. */
  intro: string;
  /** Fließtext-Absätze (Werdegang / Über mich). */
  bio: string[];
  /** Fachliche Schwerpunkte und Kompetenzen. */
  expertise: string[];
  /** Zertifikate, Abschlüsse und Nachweise. */
  zertifikate: Zertifikat[];
}

export interface Zertifikat {
  label: string;
  /**
   * Optionaler Zusatz (z. B. Fachrichtung oder ausstellende Stelle),
   * wird als kleinerer Text unter dem Label angezeigt.
   */
  detail?: string;
  /** true = liegt noch nicht vor, folgt in Kürze (wird als "in Kürze" markiert). */
  geplant?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "eyyub-abdulaziz-alici",
    name: "Eyyub-Abdulaziz Alici",
    role: "Gründer & Elektroingenieur",
    age: 32,
    teaser:
      "Elektroingenieur, Handwerker und zweifacher Papa – mit einer Leidenschaft für Elektroinstallation und Gebäudeautomation.",
    // Bild später ergänzen, z. B.: image: "/team/eyyub-abdulaziz-alici.jpg",
    image: undefined,
    imageAlt: "Eyyub-Abdulaziz Alici, Gründer von Elektiger",
    intro:
      "Elektrotechnik und IT sind meine Leidenschaft – am schönsten aber dort, wo beides im Gebäude zusammenkommt.",
    bio: [
      "Mein Name ist Eyyub-Abdulaziz Alici, ich bin 32 Jahre alt und zweifacher Papa. Ich war schon immer der Typ, der Dinge nicht nur verstehen, sondern auch selbst anpacken will.",
      "Studiert habe ich Elektro- und Informationstechnik mit Schwerpunkt Automation und Prozessinformatik. Schon während des Studiums habe ich durchgehend gearbeitet – und zwar sowohl in der Elektrotechnik als auch in der IT: in der elektrischen Montage, der elektrischen Konstruktion, der Gebäudeinstallation und in der Softwareentwicklung. Mein Studium wollte ich nie rein theoretisch erleben, sondern immer auch praktisch begreifen.",
      "Nach dem Studium habe ich als Prüfingenieur die elektrische Vorprüfung von Schienenfahrzeugen geplant und begleitet. Anschließend war ich als Softwareingenieur in der elektrischen Messtechnik tätig. Diese Stationen haben mir ein solides Fundament gegeben – in der Elektrotechnik ebenso wie in der IT.",
      "Doch ein Abschnitt aus meiner Studienzeit hat mich nie losgelassen: die Arbeit in der Gebäudeinstallation. Genau diese Verbindung aus Handwerk, Technik und direktem Kontakt zu den Menschen erfüllt mich. Deshalb habe ich mich entschieden, meine gesamte Erfahrung zu bündeln und einen eigenen Elektrofachbetrieb zu gründen. Elektroinstallation und Gebäudeautomation zu planen und umzusetzen, macht mir schlicht enormen Spaß.",
      "In jedem Arbeitsschritt lege ich Wert auf VDE-Konformität und nutze meine analytische Denkweise, um für die Wünsche und Herausforderungen meiner Kunden die optimale Lösung zu finden.",
      "Gerade in der Elektrotechnik und der Gebäudeautomation lernt man nie aus – egal, wie lange man dabei ist. Jedes Jahr kommen neue oder geänderte VDE-Vorschriften, Technologien und Lösungsansätze hinzu. Deshalb bilde ich mich kontinuierlich weiter und halte mein Wissen auf dem neuesten Stand, damit meine Kunden immer die sicherste, beste und qualitativ hochwertigste Lösung bekommen.",
    ],
    expertise: [
      "Planung & Umsetzung von Elektroinstallationen",
      "Gebäudeautomation & Smart Home",
      "Elektrische Konstruktion & Montage",
      "Softwareentwicklung & IT",
      "Mess- und Prüftechnik",
      "VDE-konforme Ausführung",
    ],
    zertifikate: [
      {
        label: "Bachelor of Engineering",
        detail: "Elektro- und Informationstechnik – Schwerpunkt Automation & Prozessinformatik",
      },
      {
        label: "Eintragung in die Handwerksrolle",
      },
      {
        label: "TREI-Sachkundenachweis",
        geplant: true,
      },
      {
        label: "Eintragung ins Installateurverzeichnis des Netzbetreibers",
        geplant: true,
      },
    ],
  },
];

/** Liefert ein Teammitglied anhand seines Slugs. */
export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}
