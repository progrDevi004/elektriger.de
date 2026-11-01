import { describe, it, expect } from "vitest";
import {
  calculateEstimate,
  clampFlaeche,
  formatEuro,
  getModulesForProjektart,
  type CalculatorInput,
} from "./angebotsrechner";

const base: CalculatorInput = {
  projektart: "neubau",
  objekttyp: "einfamilienhaus",
  flaeche: 150,
  ausstattung: "standard",
  smartHome: "keine",
  tuerkommunikation: "keine",
  tuerExtras: [],
  module: [],
};

describe("calculateEstimate", () => {
  it("berechnet die Elektroinstallation für einen Neubau (Standard)", () => {
    const result = calculateEstimate(base);
    expect(result.items).toHaveLength(1);
    // 150 m² × 105–135 €/m² × Faktor 1.0
    expect(result.total).toEqual({ min: 15800, max: 20300 });
  });

  it("addiert den Smart-Home-Aufschlag", () => {
    const result = calculateEstimate({ ...base, smartHome: "komfort" });
    expect(result.items).toHaveLength(2);
    // Basis 15800/20300 + Smart Home 150×75–105 = 11300/15800
    expect(result.total).toEqual({ min: 27100, max: 36100 });
  });

  it("berücksichtigt den Objekttyp-Faktor", () => {
    const result = calculateEstimate({
      ...base,
      objekttyp: "wohnung",
      flaeche: 100,
    });
    // 100 × 105–135 × 0.95, gerundet auf volle 100 €
    expect(result.total).toEqual({ min: 10000, max: 12800 });
  });

  it("nutzt höhere Sanierungspreise", () => {
    const result = calculateEstimate({
      ...base,
      projektart: "sanierung",
      objekttyp: "gewerbe",
      ausstattung: "premium",
      flaeche: 200,
    });
    // 200 × 220–280 × 1.15
    expect(result.total).toEqual({ min: 50600, max: 64400 });
  });

  it("rechnet bei Einzelmaßnahmen nur die Module (keine Fläche/Ausstattung)", () => {
    const result = calculateEstimate({
      ...base,
      projektart: "einzelmassnahme",
      module: ["wallbox", "echeck"],
    });
    expect(result.items).toHaveLength(2);
    expect(result.items[0].label).toContain("Wallbox");
    // Wallbox 1500/2800 + E-Check 220/400
    expect(result.total).toEqual({ min: 1720, max: 3200 });
  });

  it("bietet den E-Check nur als Einzelmaßnahme an", () => {
    expect(getModulesForProjektart("einzelmassnahme").map((m) => m.id)).toContain("echeck");
    expect(getModulesForProjektart("neubau").map((m) => m.id)).not.toContain("echeck");
    expect(getModulesForProjektart("sanierung").map((m) => m.id)).not.toContain("echeck");
  });

  it("ignoriert den E-Check bei Neubau, selbst wenn er ausgewählt ist", () => {
    const result = calculateEstimate({
      ...base,
      projektart: "neubau",
      module: ["echeck"],
    });
    // Nur die Elektroinstallation zählt – der E-Check ist bei Neubau enthalten.
    expect(result.items).toHaveLength(1);
    expect(result.items.some((i) => i.label.includes("E-Check"))).toBe(false);
  });

  it("kombiniert Basis, Smart Home und Module", () => {
    const result = calculateEstimate({
      ...base,
      smartHome: "basis",
      module: ["wallbox"],
    });
    // 15800/20300 + (150×40–60 = 6000/9000) + Wallbox 1500/2800
    expect(result.total).toEqual({ min: 23300, max: 32100 });
    expect(result.items).toHaveLength(3);
  });

  it("liefert bei Einzelmaßnahme ohne Module einen Nullbetrag", () => {
    const result = calculateEstimate({
      ...base,
      projektart: "einzelmassnahme",
      module: [],
    });
    expect(result.items).toHaveLength(0);
    expect(result.total).toEqual({ min: 0, max: 0 });
  });

  it("addiert die gewählte Türsprechanlage", () => {
    const result = calculateEstimate({
      ...base,
      projektart: "einzelmassnahme",
      tuerkommunikation: "video",
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].label).toContain("Video-Türsprechanlage");
    // Video-Türsprechanlage 1500/3000
    expect(result.total).toEqual({ min: 1500, max: 3000 });
  });

  it("addiert Türkommunikations-Zusatzoptionen zum System", () => {
    const result = calculateEstimate({
      ...base,
      projektart: "einzelmassnahme",
      tuerkommunikation: "audio",
      tuerExtras: ["tueroeffner", "zusatzmonitor"],
    });
    // Audio 800/1600 + Türöffner 280/550 + Monitor 300/600
    expect(result.items).toHaveLength(3);
    expect(result.total).toEqual({ min: 1380, max: 2750 });
  });

  it("ignoriert Zusatzoptionen, wenn keine Türanlage gewählt ist", () => {
    const result = calculateEstimate({
      ...base,
      projektart: "einzelmassnahme",
      tuerkommunikation: "keine",
      tuerExtras: ["tueroeffner"],
    });
    expect(result.items).toHaveLength(0);
    expect(result.total).toEqual({ min: 0, max: 0 });
  });
});

describe("clampFlaeche", () => {
  it("begrenzt zu kleine Werte", () => {
    expect(clampFlaeche(5)).toBe(10);
  });

  it("begrenzt zu große Werte", () => {
    expect(clampFlaeche(5000)).toBe(2000);
  });

  it("rundet auf ganze Zahlen", () => {
    expect(clampFlaeche(120.7)).toBe(121);
  });

  it("fängt ungültige Werte ab", () => {
    expect(clampFlaeche(Number.NaN)).toBe(10);
  });
});

describe("formatEuro", () => {
  it("formatiert Beträge im deutschen Format ohne Nachkommastellen", () => {
    expect(formatEuro(15000)).toMatch(/15\.000/);
  });
});
