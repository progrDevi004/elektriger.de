/**
 * Beleuchtungsplanung – grobe Leuchtenanzahl.
 *
 * Orientierungswerte für die mittlere Beleuchtungsstärke (Em) nach
 * DIN 18015-2 (Wohnungsinstallation) bzw. DIN EN 12464-1 (Arbeitsstätten,
 * z. B. Homeoffice). Die Berechnung nutzt den Lichtstrom-Ansatz:
 *
 *   Φ_gesamt [lm] = (Em [lx] × A [m²]) / (UF × MF)
 *   n Leuchten    = Φ_gesamt / Φ_Leuchte
 *
 * UF  = Nutzungsgrad (Raumreflexion, typ. 0,35–0,55 in Wohnräumen)
 * MF  = Wartungsfaktor (LED-Neuanlage typ. 0,80)
 */

export type Raumtyp =
  | "wohnzimmer"
  | "schlafzimmer"
  | "kueche"
  | "bad"
  | "flur"
  | "arbeitszimmer"
  | "kinderzimmer"
  | "esszimmer"
  | "keller"
  | "garage";

export interface RaumtypInfo {
  value: Raumtyp;
  label: string;
  /** Mittlere Beleuchtungsstärke Em in lx. */
  emLux: number;
  norm: string;
}

/** Em-Werte für typische Wohnraumtypen (Orientierung, nicht Ersatz für Fachplanung). */
export const RAUMTYPEN: RaumtypInfo[] = [
  { value: "wohnzimmer", label: "Wohnzimmer / Aufenthaltsraum", emLux: 150, norm: "DIN 18015-2" },
  { value: "schlafzimmer", label: "Schlafzimmer", emLux: 100, norm: "DIN 18015-2" },
  { value: "kueche", label: "Küche", emLux: 300, norm: "DIN 18015-2" },
  { value: "bad", label: "Bad / WC", emLux: 200, norm: "DIN 18015-2" },
  { value: "flur", label: "Flur / Diele", emLux: 100, norm: "DIN 18015-2" },
  { value: "arbeitszimmer", label: "Arbeitszimmer / Homeoffice", emLux: 500, norm: "DIN EN 12464-1" },
  { value: "kinderzimmer", label: "Kinderzimmer", emLux: 200, norm: "DIN 18015-2" },
  { value: "esszimmer", label: "Esszimmer", emLux: 200, norm: "DIN 18015-2" },
  { value: "keller", label: "Keller / Abstellraum", emLux: 100, norm: "DIN 18015-2" },
  { value: "garage", label: "Garage / Carport", emLux: 75, norm: "DIN EN 12464-1" },
];

/** Übliche LED-Lichtströme handelsüblicher Leuchtmittel. */
export const LEUCHTEN_TYPEN: { lm: number; label: string }[] = [
  { lm: 400, label: "400 lm (Einbaustrahler / Spots)" },
  { lm: 800, label: "800 lm (LED-Lampe ~60 W)" },
  { lm: 1200, label: "1.200 lm (LED-Lampe ~75 W)" },
  { lm: 2000, label: "2.000 lm (LED-Panel / Deckenleuchte)" },
  { lm: 3000, label: "3.000 lm (große Deckenleuchte)" },
];

/** Wartungsfaktor MF für LED-Neuanlagen (Lichtstromabnahme + Verschmutzung). */
export const DEFAULT_WARTUNGSFAKTOR = 0.8;

export interface BeleuchtungInput {
  raumtyp: Raumtyp;
  /** Bodenfläche in m². */
  flaeche: number;
  /** Nutzungsgrad UF (0,2–0,7). */
  nutzungsgrad: number;
  /** Wartungsfaktor MF (0,5–1,0). */
  wartungsfaktor: number;
  /** Lichtstrom je Leuchte in lm. */
  lichtstromProLeuchte: number;
  /** Optional: manuelles Em in lx (überschreibt Raumtyp). */
  emLuxOverride?: number;
}

export interface BeleuchtungErgebnis {
  fehler: string[];
  emLux: number;
  norm: string;
  raumLabel: string;
  nutzungsgrad: number;
  wartungsfaktor: number;
  /** Benötigter Gesamtlichtstrom in lm. */
  gesamtLichtstrom: number;
  /** Empfohlene Leuchtenanzahl (aufgerundet). */
  anzahlLeuchten: number;
  /** Tatsächlich erreichbares Em mit gewählter Leuchtenanzahl. */
  emErreicht: number;
  hinweise: string[];
}

function round(value: number, decimals = 1): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

export function berechneBeleuchtung(input: BeleuchtungInput): BeleuchtungErgebnis {
  const fehler: string[] = [];
  const hinweise: string[] = [];

  const raum = RAUMTYPEN.find((r) => r.value === input.raumtyp);
  const emLux = input.emLuxOverride ?? raum?.emLux ?? 150;
  const norm = raum?.norm ?? "DIN 18015-2";
  const raumLabel = raum?.label ?? "Raum";

  if (input.flaeche <= 0) fehler.push("Bitte eine gültige Raumfläche (> 0 m²) angeben.");
  if (input.nutzungsgrad <= 0 || input.nutzungsgrad > 1) {
    fehler.push("Der Nutzungsgrad muss zwischen 0 und 1 liegen (typisch 0,35–0,55).");
  }
  if (input.wartungsfaktor <= 0 || input.wartungsfaktor > 1) {
    fehler.push("Der Wartungsfaktor muss zwischen 0 und 1 liegen (LED typisch 0,80).");
  }
  if (input.lichtstromProLeuchte <= 0) {
    fehler.push("Bitte einen gültigen Lichtstrom pro Leuchte angeben.");
  }

  const leer: BeleuchtungErgebnis = {
    fehler,
    emLux,
    norm,
    raumLabel,
    nutzungsgrad: input.nutzungsgrad,
    wartungsfaktor: input.wartungsfaktor,
    gesamtLichtstrom: 0,
    anzahlLeuchten: 0,
    emErreicht: 0,
    hinweise,
  };

  if (fehler.length > 0) return leer;

  const gesamtLichtstrom = (emLux * input.flaeche) / (input.nutzungsgrad * input.wartungsfaktor);
  const anzahlLeuchten = Math.max(1, Math.ceil(gesamtLichtstrom / input.lichtstromProLeuchte));
  const emErreicht =
    (anzahlLeuchten * input.lichtstromProLeuchte * input.nutzungsgrad * input.wartungsfaktor) /
    input.flaeche;

  if (input.raumtyp === "kueche") {
    hinweise.push(
      "Arbeitsflächen in der Küche benötigen häufig 500 lx (DIN 18015-2) – ggf. zusätzliche Unterbauleuchten planen.",
    );
  }
  if (input.raumtyp === "bad") {
    hinweise.push(
      "Am Waschtisch werden oft 300 lx empfohlen – Spiegelleuchte separat berücksichtigen.",
    );
  }
  if (input.nutzungsgrad < 0.35) {
    hinweise.push(
      "Sehr dunkle Wände/Böden senken den Nutzungsgrad – in der Praxis eher mehr Leuchten einplanen.",
    );
  }

  hinweise.push(
    "Orientierungswert für die grobe Planung – keine Ersatzleistung für eine lichttechnische Fachplanung.",
  );

  return {
    fehler,
    emLux,
    norm,
    raumLabel,
    nutzungsgrad: input.nutzungsgrad,
    wartungsfaktor: input.wartungsfaktor,
    gesamtLichtstrom: round(gesamtLichtstrom, 0),
    anzahlLeuchten,
    emErreicht: round(emErreicht, 0),
    hinweise,
  };
}
