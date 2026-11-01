import { describe, it, expect } from "vitest";
import {
  berechneStromkosten,
  DEFAULT_STROMPREIS,
  GERAETE_PRESETS,
} from "./stromkosten";

describe("berechneStromkosten", () => {
  it("berechnet Jahreskosten für 100 W, 8 h/Tag, 365 Tage", () => {
    const ergebnis = berechneStromkosten({
      watt: 100,
      stundenProTag: 8,
      tageProJahr: 365,
      strompreis: DEFAULT_STROMPREIS,
    });
    expect(ergebnis.fehler).toHaveLength(0);
    expect(ergebnis.kwhProJahr).toBe(292);
    expect(ergebnis.kostenProJahr).toBeCloseTo(113.88, 1);
    expect(ergebnis.kostenProMonat).toBeCloseTo(9.49, 1);
  });

  it("berechnet Wallbox-Preset (11 kW, 2 h, 200 Tage)", () => {
    const preset = GERAETE_PRESETS.find((p) => p.id === "wallbox")!;
    const ergebnis = berechneStromkosten({
      watt: preset.watt,
      stundenProTag: preset.stundenProTag,
      tageProJahr: preset.tageProJahr,
      strompreis: 0.39,
    });
    // 11 kW × 2 h × 200 Tage = 4.400 kWh
    expect(ergebnis.kwhProJahr).toBe(4400);
    expect(ergebnis.kostenProJahr).toBeCloseTo(1716, 0);
  });

  it("meldet Fehler bei ungültigem Strompreis", () => {
    const ergebnis = berechneStromkosten({
      watt: 500,
      stundenProTag: 2,
      tageProJahr: 365,
      strompreis: 0,
    });
    expect(ergebnis.fehler.length).toBeGreaterThan(0);
  });
});
