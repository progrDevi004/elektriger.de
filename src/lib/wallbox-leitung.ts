/**
 * Wallbox-Zuleitung: vorkonfigurierte Leiterquerschnitt-Berechnung.
 *
 * Nutzt die VDE-0298-4-Logik aus leiterquerschnitt.ts mit typischen
 * Wallbox-Parametern (3,7 / 11 / 22 kW). Empfohlene Absicherung orientiert
 * sich an üblicher Praxis (B16 / B32) und VDE 0100-430 (Ib ≤ In ≤ Iz).
 */

import {
  berechneQuerschnitt,
  betriebsstrom,
  formatQuerschnitt,
  type LeiterquerschnittErgebnis,
  type LeiterquerschnittInput,
  type Verlegeart,
} from "./leiterquerschnitt";

export type WallboxTyp = "3.7" | "11" | "22";

export interface WallboxPreset {
  typ: WallboxTyp;
  label: string;
  leistung: number;
  system: "ac1" | "ac3";
  spannung: number;
  /** Übliche Absicherung in A. */
  absicherung: number;
  /**
   * Praxisüblicher Mindestquerschnitt in mm². Wallboxen sind Dauerverbraucher;
   * daher wird in der Praxis nicht bis an die theoretische Grenze dimensioniert.
   */
  mindestQuerschnitt: number;
  beschreibung: string;
}

export const WALLBOX_PRESETS: WallboxPreset[] = [
  {
    typ: "3.7",
    label: "3,7 kW",
    // 1-phasig, 16 A → 230 V × 16 A ≈ 3,68 kW (Marketing: „3,7 kW").
    leistung: 3680,
    system: "ac1",
    spannung: 230,
    absicherung: 16,
    mindestQuerschnitt: 2.5,
    beschreibung: "1-phasig, max. 16 A – typisch für ältere Anlagen oder kleinere Ladeleistung.",
  },
  {
    typ: "11",
    label: "11 kW",
    leistung: 11000,
    system: "ac3",
    spannung: 400,
    absicherung: 16,
    mindestQuerschnitt: 2.5,
    beschreibung: "3-phasig, 16 A pro Außenleiter – häufigster Standard in Deutschland.",
  },
  {
    typ: "22",
    label: "22 kW",
    leistung: 22000,
    system: "ac3",
    spannung: 400,
    absicherung: 32,
    mindestQuerschnitt: 6,
    beschreibung: "3-phasig, 32 A pro Außenleiter – Drehstrom-Hausanschluss erforderlich.",
  },
];

export interface WallboxLeitungInput {
  wallboxTyp: WallboxTyp;
  /** Einfache Leitungslänge Zähler/Wallbox in m. */
  laenge: number;
  verlegeart: Verlegeart;
  umgebungstemperatur: number;
  haeufung: number;
  /** Zulässiger Spannungsfall in % (Endstromkreis typ. 3 %). */
  maxSpannungsfall: number;
}

export interface WallboxLeitungErgebnis extends LeiterquerschnittErgebnis {
  preset: WallboxPreset;
  /** Typische NYM/NYY-Bezeichnung als Hinweis. */
  leitungshinweis: string | null;
}

export function wallboxZuLeiterInput(input: WallboxLeitungInput): LeiterquerschnittInput {
  const preset = WALLBOX_PRESETS.find((p) => p.typ === input.wallboxTyp)!;
  return {
    system: preset.system,
    spannung: preset.spannung,
    lastmodus: "leistung",
    strom: 0,
    leistung: preset.leistung,
    cosPhi: 1,
    laenge: input.laenge,
    maxSpannungsfall: input.maxSpannungsfall,
    verlegeart: input.verlegeart,
    umgebungstemperatur: input.umgebungstemperatur,
    haeufung: input.haeufung,
    absicherung: preset.absicherung,
    mindestQuerschnitt: preset.mindestQuerschnitt,
  };
}

function leitungshinweis(querschnitt: number, system: "ac1" | "ac3"): string {
  const adern = system === "ac3" ? 5 : 3;
  const nennstrom = system === "ac3" ? "5×" : "3×";
  return `NYM-J ${nennstrom}${formatQuerschnitt(querschnitt).replace(" mm²", "")} mm² (${adern}-adrig inkl. PE)`;
}

export function berechneWallboxLeitung(input: WallboxLeitungInput): WallboxLeitungErgebnis {
  const preset = WALLBOX_PRESETS.find((p) => p.typ === input.wallboxTyp)!;
  const basis = berechneQuerschnitt(wallboxZuLeiterInput(input));

  const hinweise = [...basis.hinweise];

  if (preset.typ === "22") {
    hinweise.unshift(
      "22-kW-Wallbox setzt einen Drehstrom-Hausanschluss (400 V) mit ausreichendem Leistungsreservat voraus.",
    );
  }
  if (preset.typ === "11" && input.laenge > 30) {
    hinweise.unshift(
      "Bei langen Zuleitungen (> 30 m) den Spannungsfall besonders prüfen – ggf. Querschnitt vergrößern.",
    );
  }

  const ib = betriebsstrom(wallboxZuLeiterInput(input));
  if (preset.absicherung < ib) {
    hinweise.unshift(
      `Die typische Absicherung B${preset.absicherung} A kann für Ib = ${ib.toFixed(1)} A zu klein sein – Fachplanung erforderlich.`,
    );
  }

  hinweise.unshift(
    `Wallboxen sind Dauerverbraucher: Es wird ein Mindestquerschnitt von ${formatQuerschnitt(preset.mindestQuerschnitt)} angesetzt und die Leitung durch die Absicherung B${preset.absicherung} A geschützt (Iᵦ ≤ In ≤ Iz).`,
  );

  return {
    ...basis,
    hinweise,
    preset,
    leitungshinweis: basis.empfehlung !== null ? leitungshinweis(basis.empfehlung, preset.system) : null,
  };
}
