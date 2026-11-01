/**
 * Stromkosten-Berechnung für elektrische Verbraucher.
 *
 * Formel:
 *   E [kWh/Jahr] = P [W] / 1000 × h/Tag × Tage/Jahr
 *   Kosten       = E × Arbeitspreis [€/kWh]
 *
 * Standard-Arbeitspreis orientiert sich am bundesweiten Haushaltsdurchschnitt
 * (ca. 0,39 €/kWh brutto, Stand 2024/2025 – BDEW/Verbraucherzentrale).
 */

/** Bundesweiter Richtwert Haushaltsstrom brutto (€/kWh). */
export const DEFAULT_STROMPREIS = 0.39;

export interface GeraetPreset {
  id: string;
  label: string;
  watt: number;
  stundenProTag: number;
  tageProJahr: number;
}

export const GERAETE_PRESETS: GeraetPreset[] = [
  { id: "kuehlschrank", label: "Kühlschrank", watt: 150, stundenProTag: 24, tageProJahr: 365 },
  { id: "waschmaschine", label: "Waschmaschine", watt: 2000, stundenProTag: 1, tageProJahr: 104 },
  { id: "geschirrspueler", label: "Geschirrspüler", watt: 1800, stundenProTag: 1, tageProJahr: 156 },
  { id: "trockner", label: "Wäschetrockner", watt: 2500, stundenProTag: 1, tageProJahr: 104 },
  { id: "herd", label: "Herd / Backofen", watt: 3000, stundenProTag: 1, tageProJahr: 200 },
  { id: "pc", label: "PC + Monitor", watt: 200, stundenProTag: 8, tageProJahr: 250 },
  { id: "led", label: "LED-Beleuchtung (Raum)", watt: 60, stundenProTag: 5, tageProJahr: 365 },
  { id: "wallbox", label: "Wallbox 11 kW", watt: 11000, stundenProTag: 2, tageProJahr: 200 },
  { id: "wp", label: "Wärmepumpe", watt: 2500, stundenProTag: 6, tageProJahr: 180 },
];

export interface StromkostenInput {
  watt: number;
  stundenProTag: number;
  tageProJahr: number;
  /** Arbeitspreis in €/kWh (brutto). */
  strompreis: number;
}

export interface StromkostenErgebnis {
  fehler: string[];
  kwhProTag: number;
  kwhProMonat: number;
  kwhProJahr: number;
  kostenProTag: number;
  kostenProMonat: number;
  kostenProJahr: number;
  co2KgProJahr: number;
  hinweise: string[];
}

/** CO₂-Faktor Strommix Deutschland ~0,4 kg/kWh (UBA-Richtwert, grob). */
const CO2_KG_PRO_KWH = 0.4;

function round(value: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

export function berechneStromkosten(input: StromkostenInput): StromkostenErgebnis {
  const fehler: string[] = [];
  const hinweise: string[] = [];

  if (input.watt <= 0) fehler.push("Bitte eine gültige Leistung (> 0 W) angeben.");
  if (input.stundenProTag < 0 || input.stundenProTag > 24) {
    fehler.push("Die Betriebsstunden pro Tag müssen zwischen 0 und 24 liegen.");
  }
  if (input.tageProJahr <= 0 || input.tageProJahr > 366) {
    fehler.push("Die Betriebstage pro Jahr müssen zwischen 1 und 366 liegen.");
  }
  if (input.strompreis <= 0) fehler.push("Bitte einen gültigen Strompreis (> 0 €/kWh) angeben.");

  const leer: StromkostenErgebnis = {
    fehler,
    kwhProTag: 0,
    kwhProMonat: 0,
    kwhProJahr: 0,
    kostenProTag: 0,
    kostenProMonat: 0,
    kostenProJahr: 0,
    co2KgProJahr: 0,
    hinweise,
  };

  if (fehler.length > 0) return leer;

  const kwhProTag = (input.watt / 1000) * input.stundenProTag;
  const kwhProJahr = kwhProTag * input.tageProJahr;
  const kwhProMonat = kwhProJahr / 12;
  const kostenProTag = kwhProTag * input.strompreis;
  const kostenProJahr = kwhProJahr * input.strompreis;
  const kostenProMonat = kostenProJahr / 12;
  const co2KgProJahr = kwhProJahr * CO2_KG_PRO_KWH;

  if (input.watt >= 7000) {
    hinweise.push(
      "Hohe Leistungsaufnahme – prüfen Sie Tarifoptimierung (z. B. Nachtstrom) und dimensionierte Zuleitung.",
    );
  }

  hinweise.push(
    `Berechnung mit ${input.strompreis.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €/kWh brutto. Grundpreis und Leistungspreis nicht enthalten.`,
  );

  return {
    fehler,
    kwhProTag: round(kwhProTag, 3),
    kwhProMonat: round(kwhProMonat, 1),
    kwhProJahr: round(kwhProJahr, 1),
    kostenProTag: round(kostenProTag, 2),
    kostenProMonat: round(kostenProMonat, 2),
    kostenProJahr: round(kostenProJahr, 2),
    co2KgProJahr: round(co2KgProJahr, 1),
    hinweise,
  };
}

export function formatEuro(value: number): string {
  return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}
