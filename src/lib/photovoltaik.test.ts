import { describe, it, expect } from "vitest";
import {
  berechnePv,
  eigenverbrauchsquote,
  SPEZIFISCHER_ERTRAG_OPTIMAL,
  DEFAULT_STROMPREIS,
  DEFAULT_EINSPEISEVERGUETUNG,
  DEFAULT_KOSTEN_PRO_KWP,
  DEFAULT_KOSTEN_PRO_KWH_SPEICHER,
  AUSRICHTUNGEN,
  NEIGUNGEN,
  type PvInput,
} from "./photovoltaik";

const base: PvInput = {
  leistungKwp: 10,
  ausrichtung: "sued",
  neigung: "optimal",
  jahresverbrauch: 4000,
  speicher: false,
  speicherKwh: 0,
  strompreis: DEFAULT_STROMPREIS,
  einspeiseverguetung: DEFAULT_EINSPEISEVERGUETUNG,
  kostenProKwp: DEFAULT_KOSTEN_PRO_KWP,
  kostenProKwhSpeicher: DEFAULT_KOSTEN_PRO_KWH_SPEICHER,
};

describe("berechnePv", () => {
  it("berechnet den Jahresertrag bei Süd/optimal (Faktor 1,0)", () => {
    const r = berechnePv(base);
    expect(r.fehler).toHaveLength(0);
    // 10 kWp × 950 × 1,0 × 1,0 = 9.500 kWh
    expect(r.jahresertrag).toBe(10 * SPEZIFISCHER_ERTRAG_OPTIMAL);
  });

  it("reduziert den Ertrag bei Ost/West-Ausrichtung", () => {
    const r = berechnePv({ ...base, ausrichtung: "ost_west" });
    // 10 × 950 × 0,85 × 1,0 = 8.075 kWh
    expect(r.jahresertrag).toBe(8075);
  });

  it("erhöht den Eigenverbrauch mit Speicher", () => {
    const ohne = berechnePv(base);
    const mit = berechnePv({ ...base, speicher: true, speicherKwh: 8 });
    expect(mit.eigenverbrauchsquote).toBeGreaterThan(ohne.eigenverbrauchsquote);
    expect(mit.eigenverbrauch).toBeGreaterThan(ohne.eigenverbrauch);
  });

  it("begrenzt den Eigenverbrauch auf den Jahresverbrauch", () => {
    const r = berechnePv({ ...base, jahresverbrauch: 1500, speicher: true, speicherKwh: 15 });
    expect(r.eigenverbrauch).toBeLessThanOrEqual(1500);
    expect(r.autarkiegrad).toBeLessThanOrEqual(100);
  });

  it("berechnet Investition und Amortisation", () => {
    const r = berechnePv(base);
    expect(r.investition).toBe(10 * DEFAULT_KOSTEN_PRO_KWP);
    expect(r.speicherInvestition).toBe(0);
    expect(r.amortisationJahre).not.toBeNull();
    expect(r.amortisationJahre!).toBeGreaterThan(0);
    // Plausibilität: PV amortisiert sich üblicherweise in ~8–20 Jahren
    expect(r.amortisationJahre!).toBeLessThan(30);
  });

  it("rechnet Speicherkosten in die Investition ein", () => {
    const r = berechnePv({ ...base, speicher: true, speicherKwh: 8 });
    expect(r.speicherInvestition).toBe(8 * DEFAULT_KOSTEN_PRO_KWH_SPEICHER);
    expect(r.investition).toBe(10 * DEFAULT_KOSTEN_PRO_KWP + r.speicherInvestition);
    expect(r.investition).toBeGreaterThan(berechnePv(base).investition);
  });

  it("setzt Vorteil = Ersparnis + Einspeisung", () => {
    const r = berechnePv(base);
    expect(r.vorteilProJahr).toBeCloseTo(r.ersparnisEigenverbrauch + r.einnahmenEinspeisung, 1);
  });

  it("meldet Fehler bei ungültiger Anlagengröße", () => {
    const r = berechnePv({ ...base, leistungKwp: 0 });
    expect(r.fehler.length).toBeGreaterThan(0);
    expect(r.amortisationJahre).toBeNull();
  });
});

describe("eigenverbrauchsquote", () => {
  it("liegt ohne Speicher bei ungefähr 30 % bei ausgeglichenem Verhältnis", () => {
    const q = eigenverbrauchsquote(4000, 4000, false, 0);
    expect(q).toBeCloseTo(0.3, 1);
  });

  it("sinkt bei stark überdimensionierter Anlage", () => {
    const q = eigenverbrauchsquote(12000, 4000, false, 0);
    expect(q).toBeLessThan(0.3);
  });

  it("bleibt im gültigen Bereich [0,05; 0,9]", () => {
    const q = eigenverbrauchsquote(9500, 4000, true, 20);
    expect(q).toBeGreaterThanOrEqual(0.05);
    expect(q).toBeLessThanOrEqual(0.9);
  });
});

describe("Konstanten", () => {
  it("Ausrichtungen enthalten Süd mit Faktor 1,0", () => {
    expect(AUSRICHTUNGEN.find((a) => a.value === "sued")?.faktor).toBe(1.0);
  });
  it("Neigung optimal hat Faktor 1,0", () => {
    expect(NEIGUNGEN.find((n) => n.value === "optimal")?.faktor).toBe(1.0);
  });
});
