import { describe, it, expect } from "vitest";
import { berechneWallboxLeitung, WALLBOX_PRESETS } from "./wallbox-leitung";

describe("berechneWallboxLeitung", () => {
  it("empfiehlt mind. 2,5 mm² für 11 kW (B16, Dauerlast) statt 1,5 mm²", () => {
    const ergebnis = berechneWallboxLeitung({
      wallboxTyp: "11",
      laenge: 20,
      verlegeart: "B2",
      umgebungstemperatur: 25,
      haeufung: 1,
      maxSpannungsfall: 3,
    });
    expect(ergebnis.fehler).toHaveLength(0);
    expect(ergebnis.preset.leistung).toBe(11000);
    // 1,5 mm² wäre durch B16 nicht sicher geschützt (In ≤ Iz) und ist für die
    // Dauerlast Wallbox unüblich → mindestens 2,5 mm².
    expect(ergebnis.empfehlung).toBe(2.5);
    expect(ergebnis.betriebsstrom).toBeCloseTo(15.9, 0);
    expect(ergebnis.leitungshinweis).toContain("5×2,5");
  });

  it("empfiehlt mind. 6 mm² für 22 kW (B32)", () => {
    const ergebnis = berechneWallboxLeitung({
      wallboxTyp: "22",
      laenge: 40,
      verlegeart: "C",
      umgebungstemperatur: 30,
      haeufung: 1,
      maxSpannungsfall: 3,
    });
    expect(ergebnis.fehler).toHaveLength(0);
    expect(ergebnis.preset.absicherung).toBe(32);
    expect(ergebnis.empfehlung).toBeGreaterThanOrEqual(6);
    expect(ergebnis.betriebsstrom).toBeCloseTo(31.8, 0);
  });

  it("berechnet 3,7 kW einphasig mit B16 (mind. 2,5 mm²)", () => {
    const ergebnis = berechneWallboxLeitung({
      wallboxTyp: "3.7",
      laenge: 15,
      verlegeart: "B2",
      umgebungstemperatur: 25,
      haeufung: 1,
      maxSpannungsfall: 3,
    });
    expect(ergebnis.preset.system).toBe("ac1");
    expect(ergebnis.preset.absicherung).toBe(16);
    expect(ergebnis.empfehlung).toBe(2.5);
    expect(ergebnis.leitungshinweis).toContain("3×2,5");
  });

  it("schützt die Leitung durch die Absicherung (In ≤ Iz)", () => {
    const ergebnis = berechneWallboxLeitung({
      wallboxTyp: "11",
      laenge: 5,
      verlegeart: "C",
      umgebungstemperatur: 25,
      haeufung: 1,
      maxSpannungsfall: 3,
    });
    // Auch bei guter Verlegung/kurzer Leitung nie unter 2,5 mm² für 11 kW.
    expect(ergebnis.empfehlung).toBeGreaterThanOrEqual(2.5);
    expect(ergebnis.izEffektiv).toBeGreaterThanOrEqual(ergebnis.preset.absicherung);
  });

  it("enthält Presets für alle gängigen Wallbox-Leistungen", () => {
    expect(WALLBOX_PRESETS.map((p) => p.typ)).toEqual(["3.7", "11", "22"]);
  });
});
