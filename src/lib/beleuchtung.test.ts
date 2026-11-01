import { describe, it, expect } from "vitest";
import {
  berechneBeleuchtung,
  RAUMTYPEN,
  DEFAULT_WARTUNGSFAKTOR,
} from "./beleuchtung";

describe("berechneBeleuchtung", () => {
  it("berechnet Leuchtenanzahl für Wohnzimmer nach DIN 18015-2 (150 lx)", () => {
    const ergebnis = berechneBeleuchtung({
      raumtyp: "wohnzimmer",
      flaeche: 20,
      nutzungsgrad: 0.45,
      wartungsfaktor: DEFAULT_WARTUNGSFAKTOR,
      lichtstromProLeuchte: 800,
    });
    expect(ergebnis.fehler).toHaveLength(0);
    expect(ergebnis.emLux).toBe(150);
    expect(ergebnis.norm).toBe("DIN 18015-2");
    // Φ = 150 × 20 / (0,45 × 0,8) ≈ 8.333 lm → 11 × 800 lm
    expect(ergebnis.gesamtLichtstrom).toBe(8333);
    expect(ergebnis.anzahlLeuchten).toBe(11);
    expect(ergebnis.emErreicht).toBeGreaterThanOrEqual(150);
  });

  it("nutzt 500 lx für Arbeitszimmer (DIN EN 12464-1)", () => {
    const ergebnis = berechneBeleuchtung({
      raumtyp: "arbeitszimmer",
      flaeche: 12,
      nutzungsgrad: 0.5,
      wartungsfaktor: 0.8,
      lichtstromProLeuchte: 2000,
    });
    expect(ergebnis.emLux).toBe(500);
    expect(ergebnis.norm).toBe("DIN EN 12464-1");
    // Φ = 500 × 12 / (0,5 × 0,8) = 15.000 lm → 8 × 2.000 lm
    expect(ergebnis.anzahlLeuchten).toBe(8);
  });

  it("meldet Fehler bei ungültiger Fläche", () => {
    const ergebnis = berechneBeleuchtung({
      raumtyp: "kueche",
      flaeche: 0,
      nutzungsgrad: 0.45,
      wartungsfaktor: 0.8,
      lichtstromProLeuchte: 1200,
    });
    expect(ergebnis.fehler.length).toBeGreaterThan(0);
  });

  it("enthält alle Raumtypen mit positiven Em-Werten", () => {
    for (const raum of RAUMTYPEN) {
      expect(raum.emLux).toBeGreaterThan(0);
    }
  });
});
