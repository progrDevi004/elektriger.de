/**
 * Berechnungslogik für die Leiterquerschnitt-Bestimmung.
 *
 * Grundlage sind die Strombelastbarkeits-Werte nach DIN VDE 0298-4:2013-06
 * (Referenz-Umgebungstemperatur 30 °C) für **Kupferleiter mit PVC-Isolierung**
 * (z. B. NYM/NYY-Mantelleitungen) sowie die Umrechnungsfaktoren für abweichende
 * Umgebungstemperatur (Tabelle 5, Spalte 70 °C) und Häufung (Tabelle 7,
 * "gebündelt"). Die zulässige Leiterbetriebstemperatur beträgt 70 °C.
 *
 * Es werden zwei Kriterien geprüft und der jeweils größere Querschnitt empfohlen:
 *   1. Strombelastbarkeit:  Iz(Tabelle) · f1 · f2 ≥ Ib
 *   2. Spannungsfall:       Δu ≤ zulässiger Grenzwert (in %)
 *
 * WICHTIG: Das Ergebnis ist eine fachliche Orientierung, ersetzt aber keine
 * normgerechte Planung durch eine Elektrofachkraft (u. a. Kurzschluss- und
 * Abschaltbedingungen nach DIN VDE 0100-410/-430 sind hier nicht abgebildet).
 */

export type Stromsystem = "dc" | "ac1" | "ac3";
export type Verlegeart = "A1" | "A2" | "B1" | "B2" | "C" | "E";
export type Lastmodus = "strom" | "leistung";

/** Genormte Leiterquerschnitte in mm² (Bereich der hinterlegten Tabellen). */
export const QUERSCHNITTE = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120] as const;

/** Elektrische Leitfähigkeit κ von Kupfer in m/(Ω·mm²). */
export const KAPPA_KUPFER = 56;

/**
 * Strombelastbarkeit Iz in A nach DIN VDE 0298-4 (Tabelle 1 & 2),
 * Kupfer, PVC-Isolierung (70 °C), Umgebungstemperatur 30 °C, ohne Häufung.
 * Die Arrays sind indexgleich zu QUERSCHNITTE. Schlüssel: Verlegeart → Anzahl
 * belasteter Adern (2 oder 3).
 */
const IZ_TABELLE: Record<Verlegeart, Record<2 | 3, number[]>> = {
  A1: {
    2: [15.5, 19.5, 26, 34, 46, 61, 80, 99, 119, 151, 182, 210],
    3: [13.5, 18, 24, 31, 42, 56, 73, 89, 108, 136, 164, 188],
  },
  A2: {
    2: [15.5, 18.5, 25, 32, 43, 57, 75, 92, 110, 139, 167, 192],
    3: [13, 17.5, 23, 29, 39, 52, 68, 83, 99, 125, 150, 172],
  },
  B1: {
    2: [17.5, 24, 32, 41, 57, 76, 101, 125, 151, 192, 232, 269],
    3: [15.5, 21, 28, 36, 50, 68, 89, 110, 134, 171, 207, 239],
  },
  B2: {
    2: [16.5, 23, 30, 38, 52, 69, 90, 111, 133, 168, 201, 232],
    3: [15, 20, 27, 34, 46, 62, 80, 99, 118, 149, 179, 206],
  },
  C: {
    2: [19.5, 27, 36, 46, 63, 85, 112, 138, 168, 213, 258, 299],
    3: [17.5, 24, 32, 41, 57, 76, 96, 119, 144, 184, 223, 259],
  },
  E: {
    2: [22, 30, 40, 51, 70, 94, 119, 148, 180, 232, 282, 328],
    3: [18.5, 25, 34, 43, 60, 80, 101, 126, 153, 196, 238, 276],
  },
};

/** Kurzbeschreibung der Referenz-Verlegearten für die UI. */
export const VERLEGEARTEN: { value: Verlegeart; label: string; beschreibung: string }[] = [
  { value: "A1", label: "A1 – Aderleitungen in Rohr in wärmegedämmter Wand", beschreibung: "Einzeladern im Rohr in der Wärmedämmung (geringste Belastbarkeit)." },
  { value: "A2", label: "A2 – Mantelleitung in Rohr in wärmegedämmter Wand", beschreibung: "Mehradrige Leitung im Rohr in der Wärmedämmung." },
  { value: "B1", label: "B1 – Aderleitungen in Rohr auf/in Wand", beschreibung: "Einzeladern im Elektroinstallationsrohr/-kanal auf oder in der Wand." },
  { value: "B2", label: "B2 – Mantelleitung in Rohr auf/in Wand", beschreibung: "Mehradrige Mantelleitung (z. B. NYM) im Rohr/Kanal auf oder in der Wand." },
  { value: "C", label: "C – direkt auf/in der Wand", beschreibung: "Kabel/Mantelleitung direkt auf oder unter Putz an der Wand." },
  { value: "E", label: "E – frei in Luft", beschreibung: "Mehradriges Kabel frei in Luft / auf Kabelrinne (beste Wärmeabfuhr)." },
];

/**
 * Umrechnungsfaktoren für abweichende Umgebungstemperatur, PVC (70 °C),
 * Referenz 30 °C – DIN VDE 0298-4, Tabelle 5.
 */
const TEMPERATUR_FAKTOR: { temp: number; faktor: number }[] = [
  { temp: 10, faktor: 1.22 },
  { temp: 15, faktor: 1.17 },
  { temp: 20, faktor: 1.12 },
  { temp: 25, faktor: 1.06 },
  { temp: 30, faktor: 1.0 },
  { temp: 35, faktor: 0.94 },
  { temp: 40, faktor: 0.87 },
  { temp: 45, faktor: 0.79 },
  { temp: 50, faktor: 0.71 },
  { temp: 55, faktor: 0.61 },
  { temp: 60, faktor: 0.5 },
];

export const MAX_UMGEBUNGSTEMPERATUR = 60;

/**
 * Umrechnungsfaktoren für Häufung (gebündelt direkt auf/in der Wand, im Rohr
 * oder Kanal) – DIN VDE 0298-4, Tabelle 7. Angegeben ist die Anzahl der
 * gleichzeitig belasteten Stromkreise.
 */
const HAEUFUNG_FAKTOR: { anzahl: number; faktor: number }[] = [
  { anzahl: 1, faktor: 1.0 },
  { anzahl: 2, faktor: 0.8 },
  { anzahl: 3, faktor: 0.7 },
  { anzahl: 4, faktor: 0.65 },
  { anzahl: 5, faktor: 0.6 },
  { anzahl: 6, faktor: 0.57 },
  { anzahl: 8, faktor: 0.52 },
  { anzahl: 10, faktor: 0.48 },
  { anzahl: 12, faktor: 0.45 },
  { anzahl: 14, faktor: 0.43 },
];

/** Genormte Bemessungsströme von Leitungsschutzschaltern/Sicherungen in A. */
export const SICHERUNGEN = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125] as const;

export interface LeiterquerschnittInput {
  system: Stromsystem;
  /** Netzspannung in V (z. B. 230 für 1~, 400 für 3~). */
  spannung: number;
  lastmodus: Lastmodus;
  /** Betriebsstrom Ib in A (bei lastmodus === "strom"). */
  strom: number;
  /** Wirkleistung P in W (bei lastmodus === "leistung"). */
  leistung: number;
  /** Leistungsfaktor cos φ (bei AC). */
  cosPhi: number;
  /** Einfache Leitungslänge in m. */
  laenge: number;
  /** Zulässiger Spannungsfall in %. */
  maxSpannungsfall: number;
  verlegeart: Verlegeart;
  /** Umgebungstemperatur in °C. */
  umgebungstemperatur: number;
  /** Anzahl gleichzeitig belasteter Stromkreise (Häufung). */
  haeufung: number;
  /** Optional geplante Absicherung In in A. */
  absicherung?: number;
  /**
   * Optionaler Mindestquerschnitt in mm² (z. B. aus Herstellervorgaben oder
   * für Dauerlasten wie Wallboxen). Der empfohlene Querschnitt wird nie kleiner
   * als dieser Wert.
   */
  mindestQuerschnitt?: number;
}

export interface LeiterquerschnittErgebnis {
  fehler: string[];
  /** Anzahl belasteter Adern, abgeleitet aus dem Stromsystem. */
  belasteteAdern: 2 | 3;
  betriebsstrom: number;
  f1: number;
  f2: number;
  /** Erforderliche Tabellen-Belastbarkeit Ib / (f1·f2). */
  erforderlicheIz: number;
  /** Kleinster Querschnitt, der das Strombelastbarkeits-Kriterium erfüllt. */
  querschnittStrom: number | null;
  /** Kleinster Querschnitt, der den Spannungsfall einhält. */
  querschnittSpannungsfall: number | null;
  /** Empfohlener Querschnitt (Maximum beider Kriterien). */
  empfehlung: number | null;
  /** Tabellenwert Iz am empfohlenen Querschnitt. */
  izTabelle: number | null;
  /** Effektive Belastbarkeit Iz·f1·f2 am empfohlenen Querschnitt. */
  izEffektiv: number | null;
  /** Tatsächlicher Spannungsfall am empfohlenen Querschnitt in %. */
  spannungsfallProzent: number | null;
  /** Tatsächlicher Spannungsfall am empfohlenen Querschnitt in V. */
  spannungsfallVolt: number | null;
  /** Vorschlag für die passende Absicherung In (A). */
  empfohleneSicherung: number | null;
  /** Prüfung Ib ≤ In ≤ Iz für eine vom Nutzer gewählte Absicherung. */
  absicherungOk: boolean | null;
  hinweise: string[];
}

/** Anzahl belasteter Adern aus dem Stromsystem ableiten. */
export function belasteteAdern(system: Stromsystem): 2 | 3 {
  return system === "ac3" ? 3 : 2;
}

/** Temperatur-Umrechnungsfaktor f1 (konservativ: nächsthöhere Tabellenstufe). */
export function temperaturFaktor(temp: number): number | null {
  if (temp > MAX_UMGEBUNGSTEMPERATUR) return null;
  const eintrag = TEMPERATUR_FAKTOR.find((e) => e.temp >= temp);
  // Bei sehr niedrigen Temperaturen den günstigsten Tabellenwert verwenden.
  return eintrag ? eintrag.faktor : TEMPERATUR_FAKTOR[0].faktor;
}

/** Häufungsfaktor f2 (konservativ: nächsthöhere Tabellenstufe). */
export function haeufungFaktor(anzahl: number): number {
  if (anzahl <= 1) return 1.0;
  const eintrag = HAEUFUNG_FAKTOR.find((e) => e.anzahl >= anzahl);
  return eintrag ? eintrag.faktor : HAEUFUNG_FAKTOR[HAEUFUNG_FAKTOR.length - 1].faktor;
}

/** Betriebsstrom Ib in A aus den Eingaben bestimmen. */
export function betriebsstrom(input: LeiterquerschnittInput): number {
  if (input.lastmodus === "strom") return Math.max(0, input.strom);
  const p = Math.max(0, input.leistung);
  const u = input.spannung;
  if (u <= 0) return 0;
  if (input.system === "dc") return p / u;
  if (input.system === "ac1") return p / (u * input.cosPhi);
  return p / (Math.sqrt(3) * u * input.cosPhi);
}

/** Spannungsfall in Volt für einen gegebenen Querschnitt A (mm²). */
export function spannungsfallVolt(
  input: LeiterquerschnittInput,
  ib: number,
  querschnitt: number,
): number {
  const { system, laenge, cosPhi } = input;
  const widerstandsanteil = laenge / (KAPPA_KUPFER * querschnitt);
  if (system === "dc") return 2 * ib * widerstandsanteil;
  if (system === "ac1") return 2 * ib * cosPhi * widerstandsanteil;
  return Math.sqrt(3) * ib * cosPhi * widerstandsanteil;
}

function round(value: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

/**
 * Hauptfunktion: ermittelt den erforderlichen Leiterquerschnitt.
 * Reine Funktion – über Unit-Tests abgesichert.
 */
export function berechneQuerschnitt(input: LeiterquerschnittInput): LeiterquerschnittErgebnis {
  const fehler: string[] = [];
  const hinweise: string[] = [];

  if (input.spannung <= 0) fehler.push("Bitte eine gültige Spannung (> 0 V) angeben.");
  if (input.laenge < 0) fehler.push("Die Leitungslänge darf nicht negativ sein.");
  if (input.maxSpannungsfall <= 0) fehler.push("Der zulässige Spannungsfall muss größer als 0 % sein.");
  if (input.system !== "dc" && (input.cosPhi <= 0 || input.cosPhi > 1)) {
    fehler.push("Der Leistungsfaktor cos φ muss zwischen 0 und 1 liegen.");
  }
  if (input.lastmodus === "strom" && input.strom <= 0) {
    fehler.push("Bitte einen Betriebsstrom (> 0 A) angeben.");
  }
  if (input.lastmodus === "leistung" && input.leistung <= 0) {
    fehler.push("Bitte eine Leistung (> 0 W) angeben.");
  }

  const adern = belasteteAdern(input.system);
  const ib = betriebsstrom(input);
  const f1 = temperaturFaktor(input.umgebungstemperatur);
  const f2 = haeufungFaktor(input.haeufung);

  const leer: LeiterquerschnittErgebnis = {
    fehler,
    belasteteAdern: adern,
    betriebsstrom: round(ib, 2),
    f1: f1 ?? 0,
    f2,
    erforderlicheIz: 0,
    querschnittStrom: null,
    querschnittSpannungsfall: null,
    empfehlung: null,
    izTabelle: null,
    izEffektiv: null,
    spannungsfallProzent: null,
    spannungsfallVolt: null,
    empfohleneSicherung: null,
    absicherungOk: null,
    hinweise,
  };

  if (f1 === null) {
    fehler.push(
      `Für PVC-Isolierung ist die Umgebungstemperatur auf ${MAX_UMGEBUNGSTEMPERATUR} °C begrenzt.`,
    );
  }
  if (fehler.length > 0 || f1 === null) return leer;

  // Für den Leitungsschutz maßgebend ist der größere Wert aus Betriebsstrom Iᵦ
  // und Bemessungsstrom In der Absicherung: die Leitung muss durch das
  // Schutzorgan geschützt sein (VDE 0100-430: Iᵦ ≤ In ≤ Iz).
  const schutzstrom =
    input.absicherung && input.absicherung > 0 ? Math.max(ib, input.absicherung) : ib;
  const erforderlicheIz = schutzstrom / (f1 * f2);
  const mindestQuerschnitt = input.mindestQuerschnitt ?? 0;

  // Kriterium 1: Strombelastbarkeit (und ggf. Mindestquerschnitt)
  const izSpalte = IZ_TABELLE[input.verlegeart][adern];
  let querschnittStrom: number | null = null;
  let izTabelle: number | null = null;
  for (let i = 0; i < QUERSCHNITTE.length; i++) {
    if (izSpalte[i] >= erforderlicheIz && QUERSCHNITTE[i] >= mindestQuerschnitt) {
      querschnittStrom = QUERSCHNITTE[i];
      izTabelle = izSpalte[i];
      break;
    }
  }
  if (querschnittStrom === null) {
    hinweise.push(
      "Der Strom übersteigt die Belastbarkeit des größten hinterlegten Querschnitts (120 mm²). Bitte eine individuelle Fachplanung durchführen.",
    );
  }

  // Kriterium 2: Spannungsfall
  let querschnittSpannungsfall: number | null = null;
  for (const q of QUERSCHNITTE) {
    const uv = spannungsfallVolt(input, ib, q);
    const prozent = (uv / input.spannung) * 100;
    if (prozent <= input.maxSpannungsfall) {
      querschnittSpannungsfall = q;
      break;
    }
  }
  if (querschnittSpannungsfall === null) {
    hinweise.push(
      "Der zulässige Spannungsfall lässt sich mit den hinterlegten Querschnitten nicht einhalten – Leitungslänge prüfen oder Fachplanung anfragen.",
    );
  }

  // Empfehlung: der jeweils größere Querschnitt beider Kriterien.
  // Nur wenn beide Kriterien erfüllbar sind, ist eine sichere Empfehlung möglich.
  const empfehlung: number | null =
    querschnittStrom !== null && querschnittSpannungsfall !== null
      ? Math.max(querschnittStrom, querschnittSpannungsfall)
      : null;

  let izTabelleEmpf: number | null = null;
  let izEffektiv: number | null = null;
  let sfProzent: number | null = null;
  let sfVolt: number | null = null;
  let empfohleneSicherung: number | null = null;
  let absicherungOk: boolean | null = null;

  if (empfehlung !== null) {
    const idx = QUERSCHNITTE.indexOf(empfehlung as (typeof QUERSCHNITTE)[number]);
    izTabelleEmpf = izSpalte[idx];
    izEffektiv = round(izTabelleEmpf * f1 * f2, 1);
    const uv = spannungsfallVolt(input, ib, empfehlung);
    sfVolt = round(uv, 2);
    sfProzent = round((uv / input.spannung) * 100, 2);

    // Passende Absicherung: kleinstes In mit Ib ≤ In ≤ Iz_eff
    empfohleneSicherung =
      SICHERUNGEN.find((sich) => sich >= ib && sich <= izEffektiv!) ?? null;
    if (empfohleneSicherung === null) {
      hinweise.push(
        "Für die Belastbarkeit lässt sich keine passende genormte Absicherung finden (Ib ≤ In ≤ Iz). Bitte Querschnitt/Bedingungen prüfen.",
      );
    }

    if (input.absicherung && input.absicherung > 0) {
      absicherungOk = ib <= input.absicherung && input.absicherung <= izEffektiv;
      if (!absicherungOk) {
        hinweise.push(
          `Die gewählte Absicherung ${input.absicherung} A erfüllt die Bedingung Ib (${round(
            ib,
            1,
          )} A) ≤ In ≤ Iz (${izEffektiv} A) nicht.`,
        );
      }
    }
  }

  return {
    fehler,
    belasteteAdern: adern,
    betriebsstrom: round(ib, 2),
    f1,
    f2,
    erforderlicheIz: round(erforderlicheIz, 2),
    querschnittStrom,
    querschnittSpannungsfall,
    empfehlung,
    izTabelle: izTabelleEmpf ?? izTabelle,
    izEffektiv,
    spannungsfallProzent: sfProzent,
    spannungsfallVolt: sfVolt,
    empfohleneSicherung,
    absicherungOk,
    hinweise,
  };
}

/** Zahl im deutschen Format ausgeben. */
export function formatZahl(value: number, decimals = 2): string {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/** Querschnitt hübsch formatieren, z. B. "2,5 mm²". */
export function formatQuerschnitt(value: number): string {
  return `${formatZahl(value, 1)} mm²`;
}
