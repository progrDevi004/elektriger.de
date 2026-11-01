/**
 * Partnerbetriebe – zentrale Liste für die Seite /partnerbetriebe.
 * Neue Partner einfach hier ergänzen.
 */

import alarmHeldenLogo from "@/assets/alarm-helden.svg";

export type Partner = {
  slug: string;
  name: string;
  ort: string;
  /** Kurzbeschreibung der Zusammenarbeit / des Angebots. */
  description: string;
  /** Schwerpunkte als kurze Stichworte. */
  schwerpunkte: string[];
  websiteUrl: string;
  websiteLabel: string;
  /** Optional: Logo als importierter Asset-Pfad (Vite). */
  logoSrc?: string;
  logoAlt?: string;
};

export const partnerBetriebe: Partner[] = [
  {
    slug: "alarm-helden",
    name: "Alarm-Helden",
    ort: "Hildesheim",
    description:
      "Partner für Einbruchschutz und moderne Sicherheitstechnik in Hildesheim und Niedersachsen. Mit Live-Videoüberwachung, direkter Leitstellen-Anbindung und Ajax-Systemen – Sicherheit, bevor etwas passiert.",
    schwerpunkte: [
      "Einbruchprävention",
      "24/7 Videoüberwachung",
      "Brand- & Wasserschutz",
    ],
    websiteUrl: "https://alarm-helden.de",
    websiteLabel: "alarm-helden.de",
    logoSrc: alarmHeldenLogo,
    logoAlt: "Alarm-Helden Logo",
  },
];

export function getPartnerOrdered(): Partner[] {
  return [...partnerBetriebe];
}
