import { describe, it, expect } from "vitest";
import {
  berechneQuerschnitt,
  betriebsstrom,
  belasteteAdern,
  haeufungFaktor,
  temperaturFaktor,
  spannungsfallVolt,
  formatQuerschnitt,
  type LeiterquerschnittInput,
} from "./leiterquerschnitt";

const base: LeiterquerschnittInput = {
  system: "ac1",
  spannung: 230,
  lastmodus: "strom",
  strom: 16,
  leistung: 0,
  cosPhi: 1,
  laenge: 20,
  maxSpannungsfall: 3,
  verlegeart: "B2",
  umgebungstemperatur: 30,
  haeufung: 1,
};

describe("belasteteAdern", () => {
  it("leitet die Aderzahl aus dem System ab", () => {
    expect(belasteteAdern("dc")).toBe(2);
    expect(belasteteAdern("ac1")).toBe(2);
    expect(belasteteAdern("ac3")).toBe(3);
  });
});

describe("betriebsstrom", () => {
  it("berechnet Ib aus Leistung für Drehstrom", () => {
    const ib = betriebsstrom({
      ...base,
      system: "ac3",
      spannung: 400,
      lastmodus: "leistung",
      leistung: 11000,
      cosPhi: 1,
    });
    expect(ib).toBeCloseTo(15.877, 2);
  });

  it("berechnet Ib aus Leistung für Wechselstrom", () => {
    const ib = betriebsstrom({
      ...base,
      system: "ac1",
      spannung: 230,
      lastmodus: "leistung",
      leistung: 3680,
      cosPhi: 1,
    });
    expect(ib).toBeCloseTo(16, 3);
  });

  it("berechnet Ib aus Leistung für Gleichstrom", () => {
    const ib = betriebsstrom({
      ...base,
      system: "dc",
      spannung: 12,
      lastmodus: "leistung",
      leistung: 1200,
    });
    expect(ib).toBeCloseTo(100, 3);
  });

  it("übernimmt den Strom direkt im Strommodus", () => {
    expect(betriebsstrom({ ...base, lastmodus: "strom", strom: 25 })).toBe(25);
  });
});

describe("temperaturFaktor", () => {
  it("liefert die Normwerte an den Stützstellen", () => {
    expect(temperaturFaktor(30)).toBe(1.0);
    expect(temperaturFaktor(40)).toBe(0.87);
    expect(temperaturFaktor(60)).toBe(0.5);
  });

  it("rundet konservativ auf die nächsthöhere Stufe", () => {
    expect(temperaturFaktor(33)).toBe(0.94); // nächste Stufe 35 °C
    expect(temperaturFaktor(5)).toBe(1.22); // unterhalb der Tabelle
  });

  it("gibt null zurück, wenn PVC-Grenze überschritten wird", () => {
    expect(temperaturFaktor(61)).toBeNull();
  });
});

describe("haeufungFaktor", () => {
  it("liefert die Normwerte", () => {
    expect(haeufungFaktor(1)).toBe(1.0);
    expect(haeufungFaktor(2)).toBe(0.8);
    expect(haeufungFaktor(3)).toBe(0.7);
  });

  it("rundet konservativ auf die nächsthöhere Stufe", () => {
    expect(haeufungFaktor(7)).toBe(0.52); // nächste Stufe: 8 Kreise
    expect(haeufungFaktor(20)).toBe(0.43); // über der Tabelle
  });
});

describe("spannungsfallVolt", () => {
  it("berechnet den Spannungsfall für Wechselstrom", () => {
    // 2 * 16 * 1 * 20 / (56 * 2.5) = 4.571 V
    expect(spannungsfallVolt({ ...base, system: "ac1" }, 16, 2.5)).toBeCloseTo(4.571, 2);
  });

  it("berechnet den Spannungsfall für Drehstrom", () => {
    // √3 * 16 * 1 * 20 / (56 * 2.5) = 3.959 V
    expect(spannungsfallVolt({ ...base, system: "ac3" }, 16, 2.5)).toBeCloseTo(3.959, 2);
  });

  it("berechnet den Spannungsfall für Gleichstrom", () => {
    // 2 * 100 * 10 / (56 * 4) = 8.929 V
    expect(spannungsfallVolt({ ...base, system: "dc", laenge: 10 }, 100, 4)).toBeCloseTo(8.929, 2);
  });
});

describe("berechneQuerschnitt", () => {
  it("empfiehlt den größeren Querschnitt aus beiden Kriterien", () => {
    const r = berechneQuerschnitt(base);
    expect(r.fehler).toHaveLength(0);
    expect(r.belasteteAdern).toBe(2);
    // Strombelastbarkeit: B2/2, erf. Iz = 16 → 1,5 mm² (16,5 A ≥ 16 A)
    expect(r.querschnittStrom).toBe(1.5);
    // Spannungsfall 3 %: 1,5 mm² → 3,31 % zu viel, 2,5 mm² → 1,99 %
    expect(r.querschnittSpannungsfall).toBe(2.5);
    expect(r.empfehlung).toBe(2.5);
    expect(r.izEffektiv).toBe(23);
    expect(r.spannungsfallProzent).toBeCloseTo(1.99, 1);
    expect(r.empfohleneSicherung).toBe(16);
  });

  it("berücksichtigt Temperatur- und Häufungsfaktoren", () => {
    const r = berechneQuerschnitt({
      ...base,
      system: "ac3",
      spannung: 400,
      strom: 16,
      verlegeart: "B2",
      umgebungstemperatur: 45, // f1 = 0.79
      haeufung: 3, // f2 = 0.7
      laenge: 5,
    });
    expect(r.f1).toBe(0.79);
    expect(r.f2).toBe(0.7);
    // erf. Iz = 16 / (0.79*0.7) = 28.9 → B2/3: erster Wert ≥ 28.9 ist 34 (6 mm²)
    expect(r.querschnittStrom).toBe(6);
  });

  it("meldet einen Fehler bei ungültiger Spannung", () => {
    const r = berechneQuerschnitt({ ...base, spannung: 0 });
    expect(r.fehler.length).toBeGreaterThan(0);
    expect(r.empfehlung).toBeNull();
  });

  it("gibt keine Empfehlung, wenn der Strom die Belastbarkeit übersteigt", () => {
    const r = berechneQuerschnitt({
      ...base,
      system: "ac3",
      spannung: 400,
      strom: 400,
      verlegeart: "C",
      laenge: 1,
    });
    expect(r.querschnittStrom).toBeNull();
    expect(r.empfehlung).toBeNull();
    expect(r.hinweise.length).toBeGreaterThan(0);
  });

  it("prüft eine vom Nutzer gewählte Absicherung", () => {
    const rOk = berechneQuerschnitt({ ...base, strom: 16, absicherung: 16 });
    expect(rOk.absicherungOk).toBe(true);
    const rZuKlein = berechneQuerschnitt({ ...base, strom: 16, absicherung: 10 });
    // In (10) < Ib (16) → nicht zulässig
    expect(rZuKlein.absicherungOk).toBe(false);
  });
});

describe("formatQuerschnitt", () => {
  it("formatiert im deutschen Format", () => {
    expect(formatQuerschnitt(2.5)).toBe("2,5 mm²");
    expect(formatQuerschnitt(16)).toBe("16 mm²");
  });
});
