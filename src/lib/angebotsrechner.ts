/**
 * Kalkulationslogik für den Angebotsrechner.
 *
 * Alle Preise sind NETTO-Richtwerte (zzgl. gesetzlicher MwSt.) und basieren auf
 * marktüblichen Spannen für Elektroarbeiten in Deutschland (Stand 2026).
 * Sie dienen ausschließlich einer unverbindlichen Orientierung – ein
 * verbindliches Angebot erfordert eine individuelle Prüfung vor Ort.
 *
 * Preise anpassen: einfach die Werte in den Konstanten unten ändern.
 * Die reine Funktion `calculateEstimate()` ist über Unit-Tests abgesichert.
 */

export type Projektart = "neubau" | "sanierung" | "einzelmassnahme";
export type Objekttyp = "wohnung" | "einfamilienhaus" | "mehrfamilienhaus" | "gewerbe";
export type Ausstattung = "basis" | "standard" | "komfort" | "premium";
export type SmartHomeLevel = "keine" | "basis" | "komfort" | "premium";
export type Tuerkommunikation =
  | "keine"
  | "klingel"
  | "audio"
  | "video"
  | "video_ip";
export type TuerExtraId = "tueroeffner" | "zusatzmonitor";
export type ModuleId =
  | "wallbox"
  | "sicherheitstechnik"
  | "netzwerk"
  | "zaehlerschrank"
  | "echeck"
  | "pv"
  | "speicher"
  | "aussen";

export interface Range {
  min: number;
  max: number;
}

export interface CalculatorInput {
  projektart: Projektart;
  objekttyp: Objekttyp;
  /** Wohn-/Nutzfläche in m². Nur relevant für Neubau/Sanierung. */
  flaeche: number;
  ausstattung: Ausstattung;
  smartHome: SmartHomeLevel;
  /** Tür-/Klingelanlage (Einzelauswahl). */
  tuerkommunikation: Tuerkommunikation;
  /** Zusatzoptionen zur Türkommunikation (nur relevant, wenn ein System gewählt ist). */
  tuerExtras: TuerExtraId[];
  module: ModuleId[];
}

export interface EstimateItem {
  label: string;
  min: number;
  max: number;
}

export interface Estimate {
  items: EstimateItem[];
  total: Range;
}

/**
 * Grundpreis der Elektroinstallation je m² (netto), nach Projektart & Ausstattung.
 * Orientiert an marktüblichen Spannen DE 2025/26 (ca. 80–250 €/m² brutto je nach
 * Ausstattung); hier netto kalkuliert für EFH-übliche Leistungen ohne Sondergewerke.
 */
export const BASE_PRICE_PER_SQM: Record<
  "neubau" | "sanierung",
  Record<Ausstattung, Range>
> = {
  neubau: {
    basis: { min: 80, max: 100 },
    standard: { min: 105, max: 135 },
    komfort: { min: 140, max: 175 },
    premium: { min: 185, max: 240 },
  },
  sanierung: {
    // Bestand: Stemm-/Schlitzarbeiten und Provisorien erhöhen den Aufwand.
    basis: { min: 100, max: 130 },
    standard: { min: 135, max: 170 },
    komfort: { min: 175, max: 215 },
    premium: { min: 220, max: 280 },
  },
};

/** Aufschlagsfaktor je Objekttyp (Komplexität/Aufwand). */
export const OBJEKT_FACTOR: Record<Objekttyp, number> = {
  wohnung: 0.95,
  einfamilienhaus: 1.0,
  mehrfamilienhaus: 1.05,
  gewerbe: 1.15,
};

/** Smart-Home-Aufschlag je m² (netto), zusätzlich zur Elektroinstallation. */
export const SMART_HOME_PER_SQM: Record<SmartHomeLevel, Range> = {
  keine: { min: 0, max: 0 },
  basis: { min: 40, max: 60 },
  komfort: { min: 75, max: 105 },
  premium: { min: 130, max: 180 },
};

export interface TuerkommunikationInfo {
  value: Tuerkommunikation;
  label: string;
  description: string;
  /** Festpreis-Spanne (netto) inkl. Gerät und Montage bei üblicher Verkabelung. */
  price: Range;
}

/**
 * Tür-/Klingelanlagen als Einzelauswahl. Preise als Komplett-Richtwerte
 * (Gerät + Material + Verlegung der Leitungen + Montage) für ein
 * Einfamilienhaus als Nachrüstung im Bestand – abgeleitet aus Marktdaten 2026.
 * Der Löwenanteil entfällt in der Praxis auf die Leitungsverlegung und die
 * Handwerkerstunden, nicht auf das Gerät selbst.
 */
export const TUERKOMMUNIKATION: TuerkommunikationInfo[] = [
  {
    value: "keine",
    label: "Keine",
    description: "Keine Tür- oder Klingelanlage.",
    price: { min: 0, max: 0 },
  },
  {
    value: "klingel",
    label: "Klingelanlage",
    description: "Klingeltaster mit Gong/Summer, inkl. Leitung und Montage.",
    price: { min: 300, max: 650 },
  },
  {
    value: "audio",
    label: "Audio-Gegensprechanlage",
    description: "Sprechanlage mit Türöffner-Anschluss, inkl. Verkabelung und Montage.",
    price: { min: 800, max: 1600 },
  },
  {
    value: "video",
    label: "Video-Türsprechanlage",
    description: "2-Draht-Videoanlage mit Innenmonitor, inkl. Verkabelung und Montage.",
    price: { min: 1500, max: 3000 },
  },
  {
    value: "video_ip",
    label: "Video-Türsprechanlage (IP / Smart)",
    description: "IP-System mit App-Anbindung und HD-Kamera, inkl. Netzwerkverkabelung und Montage.",
    price: { min: 2500, max: 4800 },
  },
];

export interface TuerExtraDefinition {
  id: TuerExtraId;
  label: string;
  description: string;
  price: Range;
}

/** Zusatzoptionen, die den Preis der Türkommunikation beeinflussen (netto). */
export const TUER_EXTRAS: TuerExtraDefinition[] = [
  {
    id: "tueroeffner",
    label: "Elektrischer Türöffner",
    description: "Nachrüstung eines elektrischen Türöffners inkl. Verkabelung und Anschluss.",
    price: { min: 280, max: 550 },
  },
  {
    id: "zusatzmonitor",
    label: "Zusätzliche Innenstation / Monitor",
    description: "Weitere Innenstation inkl. Leitung, z. B. für ein zweites Geschoss.",
    price: { min: 300, max: 600 },
  },
];

export interface ModuleDefinition {
  id: ModuleId;
  label: string;
  description: string;
  price: Range;
  /**
   * Projektarten, für die das Modul angeboten wird. Fehlt das Feld, gilt es
   * für alle Projektarten. Beispiel: Der E-Check ist bei Neubau/Sanierung
   * bereits als gesetzlich verpflichtende Erstprüfung enthalten und wird
   * daher nur als eigenständige Einzelmaßnahme angeboten.
   */
  availableFor?: Projektart[];
}

/** Optionale Zusatzmodule mit Festpreis-Spannen (netto), typische EFH-Nachrüstung. */
export const MODULES: ModuleDefinition[] = [
  {
    id: "wallbox",
    label: "Wallbox (E-Auto-Ladestation)",
    description: "11-kW-Ladestation inkl. Absicherung und Installation.",
    // Gerät + Absicherung + Leitung; lange Kabelwege treiben das Maximum.
    price: { min: 1500, max: 2800 },
  },
  {
    id: "sicherheitstechnik",
    label: "Sicherheitstechnik (Alarm & Video)",
    description: "Einbruch-, Video- und Gefahrenmeldetechnik.",
    price: { min: 2500, max: 4500 },
  },
  {
    id: "netzwerk",
    label: "Netzwerk & strukturierte Verkabelung",
    description: "LAN-Verkabelung, WLAN-Ausleuchtung, Serverschrank.",
    price: { min: 1500, max: 2800 },
  },
  {
    id: "zaehlerschrank",
    label: "Zählerschrank / Unterverteilung erneuern",
    description: "Moderner Zählerschrank inkl. Überspannungsschutz und Verdrahtung nach TAB.",
    price: { min: 2200, max: 3800 },
  },
  {
    id: "echeck",
    label: "E-Check / Anlagenprüfung",
    description: "Eigenständige Prüfung der Bestandsanlage nach VDE inkl. Dokumentation.",
    price: { min: 220, max: 400 },
    availableFor: ["einzelmassnahme"],
  },
  {
    id: "pv",
    label: "Photovoltaik-Anlage",
    description: "PV-Anlage inkl. Wechselrichter und Montage (Richtwert).",
    // Typische EFH-Anlage ca. 8–12 kWp schlüsselfertig (ohne Speicher).
    price: { min: 12000, max: 18000 },
  },
  {
    id: "speicher",
    label: "Batteriespeicher",
    description: "Stromspeicher zur Erhöhung des Eigenverbrauchs.",
    price: { min: 7000, max: 11000 },
  },
  {
    id: "aussen",
    label: "Außenbeleuchtung & Gartensteckdosen",
    description: "Wege-, Fassadenbeleuchtung und Außensteckdosen.",
    price: { min: 900, max: 1600 },
  },
];

/** Liefert die für eine Projektart angebotenen Zusatzmodule. */
export function getModulesForProjektart(projektart: Projektart): ModuleDefinition[] {
  return MODULES.filter(
    (m) => !m.availableFor || m.availableFor.includes(projektart),
  );
}

const MIN_FLAECHE = 10;
const MAX_FLAECHE = 2000;

/** Fläche auf einen sinnvollen Bereich begrenzen (verhindert Ausreißer). */
export function clampFlaeche(flaeche: number): number {
  if (!Number.isFinite(flaeche)) return MIN_FLAECHE;
  return Math.min(MAX_FLAECHE, Math.max(MIN_FLAECHE, Math.round(flaeche)));
}

/** Auf volle 100 € runden – passend zu einem Richtwert. */
function round100(value: number): number {
  return Math.round(value / 100) * 100;
}

const AUSSTATTUNG_LABEL: Record<Ausstattung, string> = {
  basis: "Basis",
  standard: "Standard",
  komfort: "Komfort",
  premium: "Premium",
};

const SMART_HOME_LABEL: Record<SmartHomeLevel, string> = {
  keine: "keine",
  basis: "Basis",
  komfort: "Komfort",
  premium: "Premium",
};

/**
 * Berechnet den unverbindlichen Kostenrichtwert (netto) inkl. Aufschlüsselung.
 * Reine Funktion – identischer Input liefert identischen Output.
 */
export function calculateEstimate(input: CalculatorInput): Estimate {
  const items: EstimateItem[] = [];
  const hasBase =
    input.projektart === "neubau" || input.projektart === "sanierung";

  if (hasBase) {
    const flaeche = clampFlaeche(input.flaeche);
    const factor = OBJEKT_FACTOR[input.objekttyp] ?? 1;
    const base = BASE_PRICE_PER_SQM[input.projektart][input.ausstattung];

    items.push({
      label: `Elektroinstallation (${AUSSTATTUNG_LABEL[input.ausstattung]})`,
      min: round100(flaeche * base.min * factor),
      max: round100(flaeche * base.max * factor),
    });

    if (input.smartHome !== "keine") {
      const sh = SMART_HOME_PER_SQM[input.smartHome];
      items.push({
        label: `Smart Home (${SMART_HOME_LABEL[input.smartHome]})`,
        min: round100(flaeche * sh.min * factor),
        max: round100(flaeche * sh.max * factor),
      });
    }
  }

  if (input.tuerkommunikation && input.tuerkommunikation !== "keine") {
    const system = TUERKOMMUNIKATION.find((t) => t.value === input.tuerkommunikation);
    if (system) {
      items.push({
        label: `Türkommunikation (${system.label})`,
        min: system.price.min,
        max: system.price.max,
      });

      for (const extraId of input.tuerExtras) {
        const extra = TUER_EXTRAS.find((e) => e.id === extraId);
        if (extra) {
          items.push({
            label: extra.label,
            min: extra.price.min,
            max: extra.price.max,
          });
        }
      }
    }
  }

  const verfuegbar = getModulesForProjektart(input.projektart);
  for (const moduleId of input.module) {
    const definition = verfuegbar.find((m) => m.id === moduleId);
    if (definition) {
      items.push({
        label: definition.label,
        min: definition.price.min,
        max: definition.price.max,
      });
    }
  }

  const total = items.reduce<Range>(
    (acc, item) => ({ min: acc.min + item.min, max: acc.max + item.max }),
    { min: 0, max: 0 },
  );

  return { items, total };
}

/** Formatiert einen Betrag als Euro (ohne Nachkommastellen), z. B. "15.000 €". */
export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
