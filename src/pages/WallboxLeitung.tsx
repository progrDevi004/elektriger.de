import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Car, ArrowRight, Info, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  berechneWallboxLeitung,
  WALLBOX_PRESETS,
  type WallboxLeitungInput,
  type WallboxTyp,
} from "@/lib/wallbox-leitung";
import {
  formatQuerschnitt,
  formatZahl,
  VERLEGEARTEN,
  type Verlegeart,
} from "@/lib/leiterquerschnitt";

const DEFAULT_INPUT: WallboxLeitungInput = {
  wallboxTyp: "11",
  laenge: 20,
  verlegeart: "C",
  umgebungstemperatur: 25,
  haeufung: 1,
  maxSpannungsfall: 3,
};

const Segment = <T extends string>({
  value,
  current,
  onChange,
  children,
  hint,
}: {
  value: T;
  current: T;
  onChange: (v: T) => void;
  children: React.ReactNode;
  hint?: string;
}) => {
  const active = value === current;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      aria-pressed={active}
      className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal ${
        active
          ? "border-teal bg-teal/5 text-primary ring-1 ring-teal/30"
          : "border-border bg-card text-muted-foreground hover:border-teal/40"
      }`}
    >
      <span className="block leading-tight">{children}</span>
      {hint && <span className="block text-[11px] text-muted-foreground mt-0.5">{hint}</span>}
    </button>
  );
};

const Field = ({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={htmlFor} className="text-sm font-medium text-primary">
      {label}
    </Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const ResultRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-2 border-b border-border/60 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-primary text-right whitespace-nowrap">{value}</span>
  </div>
);

const WallboxLeitung = () => {
  const [input, setInput] = useState<WallboxLeitungInput>(DEFAULT_INPUT);
  const update = (patch: Partial<WallboxLeitungInput>) => setInput((prev) => ({ ...prev, ...patch }));
  const num = (v: string) => (v === "" ? 0 : Number(v.replace(",", ".")));

  const ergebnis = useMemo(() => berechneWallboxLeitung(input), [input]);
  const preset = WALLBOX_PRESETS.find((p) => p.typ === input.wallboxTyp);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Wallbox Kabelquerschnitt-Rechner – Elektiger",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description:
      "Kabelquerschnitt für Wallbox-Zuleitungen (3,7 / 11 / 22 kW) nach DIN VDE 0298-4 berechnen – inkl. Spannungsfall und Strombelastbarkeit.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Wallbox Kabelquerschnitt berechnen – Leiterquerschnitt für 11 kW & 22 kW"
        description="Kabelquerschnitt für Wallbox-Zuleitung online berechnen: 3,7 kW, 11 kW und 22 kW nach DIN VDE 0298-4 – Strombelastbarkeit, Spannungsfall und NYM-Leitungshinweis."
        path="/wallbox-leitung"
        keywords="Wallbox Kabelquerschnitt, Wallbox Leitung berechnen, 11 kW Wallbox Kabel, 22 kW Wallbox Querschnitt, VDE 0298-4 Wallbox, E-Auto Ladestation Kabel"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <Car className="w-3 h-3" />
              Wallbox-Leitungsrechner
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
              Der passende <span className="text-gradient-silver">Kabelquerschnitt</span> für Ihre Wallbox.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Vorkonfiguriert für 3,7 / 11 / 22 kW – Berechnung nach DIN VDE 0298-4 mit typischer
              Absicherung (B16 / B32).
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            <div className="rounded-3xl border border-border bg-card/50 p-6 md:p-8 space-y-6">
              <Field label="Wallbox-Leistung">
                <div className="flex gap-2">
                  {WALLBOX_PRESETS.map((p) => (
                    <Segment<WallboxTyp>
                      key={p.typ}
                      value={p.typ}
                      current={input.wallboxTyp}
                      onChange={(v) => update({ wallboxTyp: v })}
                      hint={p.system === "ac3" ? "3~" : "1~"}
                    >
                      {p.label}
                    </Segment>
                  ))}
                </div>
                {preset && (
                  <p className="text-xs text-muted-foreground mt-2">{preset.beschreibung}</p>
                )}
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Leitungslänge (m)" htmlFor="laenge" hint="Zähler bis Wallbox (einfache Strecke)">
                  <Input
                    id="laenge"
                    type="number"
                    inputMode="decimal"
                    value={input.laenge || ""}
                    onChange={(e) => update({ laenge: num(e.target.value) })}
                  />
                </Field>
                <Field label="Zul. Spannungsfall (%)" htmlFor="sf" hint="Endstromkreis typ. 3 %">
                  <Input
                    id="sf"
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    value={input.maxSpannungsfall || ""}
                    onChange={(e) => update({ maxSpannungsfall: num(e.target.value) })}
                  />
                </Field>
              </div>

              <Field label="Verlegeart" hint={VERLEGEARTEN.find((v) => v.value === input.verlegeart)?.beschreibung}>
                <Select value={input.verlegeart} onValueChange={(v) => update({ verlegeart: v as Verlegeart })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VERLEGEARTEN.map((v) => (
                      <SelectItem key={v.value} value={v.value}>
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Umgebungstemperatur (°C)" htmlFor="temp">
                  <Input
                    id="temp"
                    type="number"
                    inputMode="decimal"
                    value={input.umgebungstemperatur || ""}
                    onChange={(e) => update({ umgebungstemperatur: num(e.target.value) })}
                  />
                </Field>
                <Field label="Häufung (Stromkreise)" htmlFor="haeufung">
                  <Input
                    id="haeufung"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    value={input.haeufung || ""}
                    onChange={(e) => update({ haeufung: Math.max(1, Math.round(num(e.target.value))) })}
                  />
                </Field>
              </div>
            </div>

            <div className="lg:sticky lg:top-32 self-start">
              <motion.div className="rounded-3xl border border-border bg-card/50 p-6 md:p-7" initial={false}>
                <h2 className="text-lg font-medium text-primary mb-5 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal" /> Ergebnis
                </h2>

                {ergebnis.fehler.length > 0 ? (
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400 space-y-1">
                    {ergebnis.fehler.map((f) => (
                      <p key={f} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        {f}
                      </p>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="rounded-2xl bg-gradient-to-br from-teal/10 to-green/10 border border-teal/20 p-6 text-center mb-5">
                      <p className="text-sm text-muted-foreground mb-1">Empfohlener Querschnitt (Kupfer)</p>
                      <p className="text-4xl font-semibold text-primary">
                        {ergebnis.empfehlung !== null ? formatQuerschnitt(ergebnis.empfehlung) : "–"}
                      </p>
                      {ergebnis.leitungshinweis && (
                        <p className="text-xs text-muted-foreground mt-2">{ergebnis.leitungshinweis}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Typ. Absicherung B{ergebnis.preset.absicherung} A
                      </p>
                    </div>

                    <div className="mb-4">
                      <ResultRow label="Wallbox-Leistung" value={`${(ergebnis.preset.leistung / 1000).toLocaleString("de-DE")} kW`} />
                      <ResultRow label="Betriebsstrom Iᵦ" value={`${formatZahl(ergebnis.betriebsstrom, 1)} A`} />
                      <ResultRow
                        label="Querschnitt n. Strom"
                        value={ergebnis.querschnittStrom !== null ? formatQuerschnitt(ergebnis.querschnittStrom) : "–"}
                      />
                      <ResultRow
                        label="Querschnitt n. Spannungsfall"
                        value={
                          ergebnis.querschnittSpannungsfall !== null
                            ? formatQuerschnitt(ergebnis.querschnittSpannungsfall)
                            : "–"
                        }
                      />
                      {ergebnis.spannungsfallProzent !== null && (
                        <ResultRow
                          label="Spannungsfall"
                          value={`${formatZahl(ergebnis.spannungsfallProzent, 2)} %`}
                        />
                      )}
                      {ergebnis.absicherungOk !== null && (
                        <ResultRow
                          label={`Absicherung B${ergebnis.preset.absicherung} A`}
                          value={
                            ergebnis.absicherungOk ? (
                              <span className="inline-flex items-center gap-1 text-teal">
                                <CheckCircle2 className="w-4 h-4" /> zulässig
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                <AlertTriangle className="w-4 h-4" /> prüfen
                              </span>
                            )
                          }
                        />
                      )}
                    </div>

                    {ergebnis.hinweise.length > 0 && (
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 mb-4 space-y-1.5">
                        {ergebnis.hinweise.map((h) => (
                          <p key={h} className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            {h}
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-xl p-4 mt-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-teal" />
                  <p>
                    Orientierungswert nach DIN VDE 0298-4. Die verbindliche Auslegung inkl.
                    Kurzschluss- und Abschaltbedingungen (VDE 0100) gehört in die Hand einer
                    Elektrofachkraft.
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <a
                    href="/leiterquerschnitt"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-teal/30 text-teal text-sm font-medium rounded-full hover:bg-teal/5 transition-all"
                  >
                    Allgemeiner Leiterquerschnitt-Rechner
                  </a>
                  <a
                    href="/kontakt"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
                  >
                    Wallbox-Installation anfragen <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WallboxLeitung;
