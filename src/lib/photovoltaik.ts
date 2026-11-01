/**
 * Photovoltaik: Ertrags- und Wirtschaftlichkeitsabschätzung.
 *
 * Die Werte sind grobe Orientierungswerte für Norddeutschland (Region Peine/
 * Niedersachsen). Grundlage:
 *   - Spezifischer Ertrag ~950 kWh/kWp/Jahr bei optimaler Süd-Ausrichtung (30°),
 *     abgeleitet aus PVGIS/DWD-Einstrahlungsdaten für Niedersachsen.
 *   - Ausrichtungs-/Neigungsfaktoren als typische Minderungen gegenüber dem
 *     Optimum (Süd/30°).
 *   - Eigenverbrauchsquoten aus üblichen Haushaltsprofilen (HTW Berlin).
 *   - Einspeisevergütung nach EEG (Teileinspeisung, Inbetriebnahme 2024/2025:
 *     ~8,0 ct/kWh für Anlagen bis 10 kWp).
 *
 * WICHTIG: Ersetzt keine individuelle Fachplanung. Verschattung, reale
 * Lastprofile, Degradation und Förderungen können deutlich abweichen.
 */

/** Spezifischer Referenzertrag Süd/30° in kWh je kWp und Jahr (Niedersachsen). */
export const SPEZIFISCHER_ERTRAG_OPTIMAL = 950;

/** EEG-Einspeisevergütung Teileinspeisung bis 10 kWp (€/kWh, Richtwert 2024/25). */
export const DEFAULT_EINSPEISEVERGUETUNG = 0.08;

/** Bundesweiter Richtwert Haushaltsstrom brutto (€/kWh). */
export const DEFAULT_STROMPREIS = 0.39;

/** Spezifische Anlagenkosten (€/kWp) inkl. Montage – Richtwert Aufdach. */
export const DEFAULT_KOSTEN_PRO_KWP = 1500;

/** Spezifische Speicherkosten (€/kWh) inkl. Installation – Richtwert 600–1.000 €/kWh. */
export const DEFAULT_KOSTEN_PRO_KWH_SPEICHER = 800;

/** CO₂-Faktor Strommix Deutschland ~0,4 kg/kWh (UBA-Richtwert). */
const CO2_KG_PRO_KWH = 0.4;

export type Ausrichtung = "sued" | "suedost_suedwest" | "ost_west" | "nord";
export type Neigung = "flach" | "optimal" | "steil";

export interface AusrichtungInfo {
  value: Ausrichtung;
  label: string;
  /** Ertragsfaktor relativ zum Optimum. */
  faktor: number;
}

export interface NeigungInfo {
  value: Neigung;
  label: string;
  faktor: number;
}

export const AUSRICHTUNGEN: AusrichtungInfo[] = [
  { value: "sued", label: "Süd", faktor: 1.0 },
  { value: "suedost_suedwest", label: "Südost / Südwest", faktor: 0.95 },
  { value: "ost_west", label: "Ost / West", faktor: 0.85 },
  { value: "nord", label: "Nord", faktor: 0.65 },
];

export const NEIGUNGEN: NeigungInfo[] = [
  { value: "flach", label: "Flach (0–15°)", faktor: 0.9 },
  { value: "optimal", label: "Optimal (20–40°)", faktor: 1.0 },
  { value: "steil", label: "Steil (> 45°)", faktor: 0.9 },
];

export interface PvInput {
  /** Anlagengröße in kWp. */
  leistungKwp: number;
  ausrichtung: Ausrichtung;
  neigung: Neigung;
  /** Jährlicher Haushalts-Stromverbrauch in kWh. */
  jahresverbrauch: number;
  /** Batteriespeicher vorhanden? */
  speicher: boolean;
  /** Speicherkapazität in kWh (nur relevant bei speicher = true). */
  speicherKwh: number;
  strompreis: number;
  einspeiseverguetung: number;
  /** Spezifische Anlagenkosten in €/kWp. */
  kostenProKwp: number;
  /** Spezifische Speicherkosten in €/kWh (nur relevant bei speicher = true). */
  kostenProKwhSpeicher: number;
}

export interface PvErgebnis {
  fehler: string[];
  /** Jahresertrag in kWh. */
  jahresertrag: number;
  /** Genutzter Eigenverbrauch in kWh. */
  eigenverbrauch: number;
  /** Ins Netz eingespeiste Energie in kWh. */
  einspeisung: number;
  /** Eigenverbrauchsquote in % (Anteil des Ertrags). */
  eigenverbrauchsquote: number;
  /** Autarkiegrad in % (Anteil des Verbrauchs, der durch PV gedeckt wird). */
  autarkiegrad: number;
  /** Ersparnis durch vermiedenen Netzbezug (€/Jahr). */
  ersparnisEigenverbrauch: number;
  /** Einnahmen durch Einspeisung (€/Jahr). */
  einnahmenEinspeisung: number;
  /** Gesamter wirtschaftlicher Vorteil pro Jahr (€). */
  vorteilProJahr: number;
  /** Grobe Investitionskosten inkl. Speicher (€). */
  investition: number;
  /** Anteil der Speicherkosten an der Investition (€). */
  speicherInvestition: number;
  /** Statische Amortisationszeit in Jahren. */
  amortisationJahre: number | null;
  /** CO₂-Einsparung pro Jahr (kg). */
  co2Ersparnis: number;
  hinweise: string[];
}

function round(value: number, decimals = 0): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

/**
 * Schätzt die Eigenverbrauchsquote aus dem Verhältnis Ertrag zu Verbrauch.
 * Basis: typische Haushaltsprofile ohne Speicher ~30 %, mit Speicher deutlich
 * höher. Größere Anlagen relativ zum Verbrauch senken die Quote.
 */
export function eigenverbrauchsquote(
  jahresertrag: number,
  jahresverbrauch: number,
  speicher: boolean,
  speicherKwh: number,
): number {
  if (jahresertrag <= 0 || jahresverbrauch <= 0) return 0;

  const verhaeltnis = jahresertrag / jahresverbrauch;

  // Ohne Speicher: ~30 % bei ausgeglichenem Verhältnis, weniger bei Überdimensionierung.
  let quote = 0.3;
  if (verhaeltnis > 1) {
    quote = 0.3 / verhaeltnis;
  } else {
    quote = 0.3 + (1 - verhaeltnis) * 0.1;
  }

  if (speicher && speicherKwh > 0) {
    // Speicher hebt die Quote deutlich an; grob +0,35, begrenzt durch Speichergröße.
    const speicherBonus = Math.min(0.4, 0.25 + speicherKwh * 0.02);
    quote += speicherBonus;
  }

  return Math.max(0.05, Math.min(0.9, quote));
}

export function berechnePv(input: PvInput): PvErgebnis {
  const fehler: string[] = [];
  const hinweise: string[] = [];

  if (input.leistungKwp <= 0) fehler.push("Bitte eine gültige Anlagengröße (> 0 kWp) angeben.");
  if (input.jahresverbrauch <= 0) fehler.push("Bitte einen gültigen Jahresverbrauch (> 0 kWh) angeben.");
  if (input.strompreis <= 0) fehler.push("Bitte einen gültigen Strompreis (> 0 €/kWh) angeben.");
  if (input.einspeiseverguetung < 0) fehler.push("Die Einspeisevergütung darf nicht negativ sein.");
  if (input.kostenProKwp <= 0) fehler.push("Bitte gültige Anlagenkosten (> 0 €/kWp) angeben.");

  const leer: PvErgebnis = {
    fehler,
    jahresertrag: 0,
    eigenverbrauch: 0,
    einspeisung: 0,
    eigenverbrauchsquote: 0,
    autarkiegrad: 0,
    ersparnisEigenverbrauch: 0,
    einnahmenEinspeisung: 0,
    vorteilProJahr: 0,
    investition: 0,
    speicherInvestition: 0,
    amortisationJahre: null,
    co2Ersparnis: 0,
    hinweise,
  };

  if (fehler.length > 0) return leer;

  const ausrichtung = AUSRICHTUNGEN.find((a) => a.value === input.ausrichtung) ?? AUSRICHTUNGEN[0];
  const neigung = NEIGUNGEN.find((n) => n.value === input.neigung) ?? NEIGUNGEN[1];

  const jahresertrag = input.leistungKwp * SPEZIFISCHER_ERTRAG_OPTIMAL * ausrichtung.faktor * neigung.faktor;

  const quote = eigenverbrauchsquote(
    jahresertrag,
    input.jahresverbrauch,
    input.speicher,
    input.speicherKwh,
  );

  let eigenverbrauch = jahresertrag * quote;
  // Eigenverbrauch kann den tatsächlichen Verbrauch nicht übersteigen.
  eigenverbrauch = Math.min(eigenverbrauch, input.jahresverbrauch);
  const einspeisung = Math.max(0, jahresertrag - eigenverbrauch);

  const autarkiegrad = Math.min(1, eigenverbrauch / input.jahresverbrauch);

  const ersparnisEigenverbrauch = eigenverbrauch * input.strompreis;
  const einnahmenEinspeisung = einspeisung * input.einspeiseverguetung;
  const vorteilProJahr = ersparnisEigenverbrauch + einnahmenEinspeisung;

  const speicherInvestition =
    input.speicher && input.speicherKwh > 0
      ? input.speicherKwh * input.kostenProKwhSpeicher
      : 0;
  const investition = input.leistungKwp * input.kostenProKwp + speicherInvestition;
  const amortisationJahre = vorteilProJahr > 0 ? investition / vorteilProJahr : null;

  const co2Ersparnis = jahresertrag * CO2_KG_PRO_KWH;

  if (input.ausrichtung === "nord") {
    hinweise.push("Nord-Ausrichtung liefert deutlich weniger Ertrag – wirtschaftlich oft grenzwertig.");
  }
  if (jahresertrag / input.jahresverbrauch > 1.5 && !input.speicher) {
    hinweise.push(
      "Die Anlage ist im Verhältnis zum Verbrauch groß – ohne Speicher wird viel Strom günstig eingespeist. Ein Speicher oder eine Wallbox kann den Eigenverbrauch erhöhen.",
    );
  }
  if (input.speicher && input.speicherKwh <= 0) {
    hinweise.push("Speicher aktiviert, aber keine Kapazität angegeben – bitte kWh eintragen.");
  }
  hinweise.push(
    "Statische Betrachtung: mögliche Strompreissteigerungen, Modul-Degradation (~0,5 %/Jahr), Wartung/Versicherung und ein späterer Wechselrichtertausch sind nicht eingerechnet.",
  );
  hinweise.push(
    "Orientierungswerte für Region Niedersachsen. Verschattung, Lastprofil und Förderungen wurden nicht berücksichtigt.",
  );

  return {
    fehler,
    jahresertrag: round(jahresertrag),
    eigenverbrauch: round(eigenverbrauch),
    einspeisung: round(einspeisung),
    eigenverbrauchsquote: round(quote * 100),
    autarkiegrad: round(autarkiegrad * 100),
    ersparnisEigenverbrauch: round(ersparnisEigenverbrauch, 2),
    einnahmenEinspeisung: round(einnahmenEinspeisung, 2),
    vorteilProJahr: round(vorteilProJahr, 2),
    investition: round(investition),
    speicherInvestition: round(speicherInvestition),
    amortisationJahre: amortisationJahre !== null ? round(amortisationJahre, 1) : null,
    co2Ersparnis: round(co2Ersparnis),
    hinweise,
  };
}

export function formatEuro(value: number): string {
  return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}
