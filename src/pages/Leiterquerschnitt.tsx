import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Cable, ArrowRight, Info, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
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
  berechneQuerschnitt,
  formatQuerschnitt,
  formatZahl,
  VERLEGEARTEN,
  SICHERUNGEN,
  type LeiterquerschnittInput,
  type Stromsystem,
  type Lastmodus,
  type Verlegeart,
} from "@/lib/leiterquerschnitt";

const systemOptions: { value: Stromsystem; label: string; hint: string }[] = [
  { value: "ac1", label: "Wechselstrom 1~", hint: "230 V" },
  { value: "ac3", label: "Drehstrom 3~", hint: "400 V" },
  { value: "dc", label: "Gleichstrom", hint: "DC" },
];

const DEFAULT_INPUT: LeiterquerschnittInput = {
  system: "ac1",
  spannung: 230,
  lastmodus: "leistung",
  strom: 16,
  leistung: 3680,
  cosPhi: 0.95,
  laenge: 25,
  maxSpannungsfall: 3,
  verlegeart: "B2",
  umgebungstemperatur: 25,
  haeufung: 1,
  absicherung: undefined,
};

const spannungFuerSystem: Record<Stromsystem, number> = { ac1: 230, ac3: 400, dc: 24 };

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

const Leiterquerschnitt = () => {
  const [input, setInput] = useState<LeiterquerschnittInput>(DEFAULT_INPUT);

  const update = (patch: Partial<LeiterquerschnittInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const setSystem = (system: Stromsystem) =>
    update({
      system,
      spannung: spannungFuerSystem[system],
    });

  const num = (v: string) => (v === "" ? 0 : Number(v.replace(",", ".")));

  const ergebnis = useMemo(() => berechneQuerschnitt(input), [input]);
  const istAC = input.system !== "dc";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Leiterquerschnitt-Rechner – Elektiger",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description:
      "Kostenloser Online-Rechner zur Bestimmung des erforderlichen Leiterquerschnitts nach DIN VDE 0298-4 – unter Berücksichtigung von Strombelastbarkeit, Verlegeart, Umgebungstemperatur, Häufung und Spannungsfall.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Kabelquerschnitt berechnen – Leiterquerschnitt-Rechner nach VDE 0298-4"
        description="Leiter- und Kabelquerschnitt online berechnen nach DIN VDE 0298-4: Strombelastbarkeit, Spannungsfall, Verlegeart, Umgebungstemperatur und Häufung – kostenloses Hilfsmittel für die Elektroplanung."
        path="/leiterquerschnitt"
        keywords="Kabelquerschnitt berechnen, Leiterquerschnitt Rechner, VDE 0298-4, Strombelastbarkeit, Spannungsfall berechnen, Kupferleiter Querschnitt, Verlegeart Elektro"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <Cable className="w-3 h-3" />
              Leiterquerschnitt-Rechner
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
              Den passenden <span className="text-gradient-silver">Leiterquerschnitt</span> bestimmen.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Berechnung nach DIN VDE 0298-4 für Kupferleiter mit PVC-Isolierung (z. B. NYM) –
              geprüft auf Strombelastbarkeit <span className="text-primary">und</span> Spannungsfall.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            {/* Formular */}
            <div className="rounded-3xl border border-border bg-card/50 p-6 md:p-8 space-y-8">
              {/* Stromsystem */}
              <Field label="Stromsystem">
                <div className="flex gap-2">
                  {systemOptions.map((opt) => (
                    <Segment key={opt.value} value={opt.value} current={input.system} onChange={setSystem} hint={opt.hint}>
                      {opt.label}
                    </Segment>
                  ))}
                </div>
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Spannung (V)" htmlFor="spannung">
                  <Input
                    id="spannung"
                    type="number"
                    inputMode="decimal"
                    value={input.spannung || ""}
                    onChange={(e) => update({ spannung: num(e.target.value) })}
                  />
                </Field>

                {istAC && (
                  <Field label="Leistungsfaktor cos φ" htmlFor="cosphi" hint="typisch 0,9–1,0">
                    <Input
                      id="cosphi"
                      type="number"
                      inputMode="decimal"
                      step="0.05"
                      min="0"
                      max="1"
                      value={input.cosPhi || ""}
                      onChange={(e) => update({ cosPhi: num(e.target.value) })}
                    />
                  </Field>
                )}
              </div>

              {/* Last */}
              <Field label="Last vorgeben als">
                <div className="flex gap-2 mb-4">
                  <Segment<Lastmodus> value="leistung" current={input.lastmodus} onChange={(v) => update({ lastmodus: v })}>
                    Leistung
                  </Segment>
                  <Segment<Lastmodus> value="strom" current={input.lastmodus} onChange={(v) => update({ lastmodus: v })}>
                    Strom
                  </Segment>
                </div>
                {input.lastmodus === "leistung" ? (
                  <Input
                    aria-label="Leistung in Watt"
                    type="number"
                    inputMode="decimal"
                    value={input.leistung || ""}
                    onChange={(e) => update({ leistung: num(e.target.value) })}
                    placeholder="Leistung in W"
                  />
                ) : (
                  <Input
                    aria-label="Betriebsstrom in Ampere"
                    type="number"
                    inputMode="decimal"
                    value={input.strom || ""}
                    onChange={(e) => update({ strom: num(e.target.value) })}
                    placeholder="Betriebsstrom in A"
                  />
                )}
                <p className="text-xs text-muted-foreground mt-1.5">
                  {input.lastmodus === "leistung" ? "Wirkleistung in Watt (W)." : "Betriebsstrom Iᵦ in Ampere (A)."}
                </p>
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Leitungslänge (m)" htmlFor="laenge" hint="einfache Strecke (Hin­leitung)">
                  <Input
                    id="laenge"
                    type="number"
                    inputMode="decimal"
                    value={input.laenge || ""}
                    onChange={(e) => update({ laenge: num(e.target.value) })}
                  />
                </Field>
                <Field label="Zul. Spannungsfall (%)" htmlFor="sf" hint="Endstromkreise üblich 3 %">
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
                <Field label="Umgebungstemperatur (°C)" htmlFor="temp" hint="Referenz 30 °C, max. 60 °C (PVC)">
                  <Input
                    id="temp"
                    type="number"
                    inputMode="decimal"
                    value={input.umgebungstemperatur || ""}
                    onChange={(e) => update({ umgebungstemperatur: num(e.target.value) })}
                  />
                </Field>
                <Field label="Häufung (Stromkreise)" htmlFor="haeufung" hint="gebündelt verlegte Kreise">
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

              <Field label="Geplante Absicherung (optional)" hint="zur Prüfung Iᵦ ≤ In ≤ Iz">
                <Select
                  value={input.absicherung ? String(input.absicherung) : "none"}
                  onValueChange={(v) => update({ absicherung: v === "none" ? undefined : Number(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">– keine Angabe –</SelectItem>
                    {SICHERUNGEN.map((s) => (
                      <SelectItem key={s} value={String(s)}>
                        {s} A
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Ergebnis */}
            <div className="lg:sticky lg:top-32 self-start">
              <motion.div
                className="rounded-3xl border border-border bg-card/50 p-6 md:p-7"
                initial={false}
              >
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
                      {ergebnis.empfohleneSicherung !== null && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Vorschlag Absicherung: {ergebnis.empfohleneSicherung} A
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <ResultRow label="Betriebsstrom Iᵦ" value={`${formatZahl(ergebnis.betriebsstrom, 1)} A`} />
                      <ResultRow label="Belastete Adern" value={ergebnis.belasteteAdern} />
                      <ResultRow label="Faktor Temperatur f₁" value={formatZahl(ergebnis.f1, 2)} />
                      <ResultRow label="Faktor Häufung f₂" value={formatZahl(ergebnis.f2, 2)} />
                      <ResultRow label="Erforderl. Iz (Tabelle)" value={`${formatZahl(ergebnis.erforderlicheIz, 1)} A`} />
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
                      {ergebnis.izEffektiv !== null && (
                        <ResultRow label="Belastbarkeit Iz (effektiv)" value={`${formatZahl(ergebnis.izEffektiv, 1)} A`} />
                      )}
                      {ergebnis.spannungsfallProzent !== null && (
                        <ResultRow
                          label="Spannungsfall"
                          value={`${formatZahl(ergebnis.spannungsfallProzent, 2)} % (${formatZahl(
                            ergebnis.spannungsfallVolt ?? 0,
                            2,
                          )} V)`}
                        />
                      )}
                      {ergebnis.absicherungOk !== null && input.absicherung && (
                        <ResultRow
                          label={`Absicherung ${input.absicherung} A`}
                          value={
                            ergebnis.absicherungOk ? (
                              <span className="inline-flex items-center gap-1 text-teal">
                                <CheckCircle2 className="w-4 h-4" /> zulässig
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                <AlertTriangle className="w-4 h-4" /> unzulässig
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
                    Orientierungswert nach DIN VDE 0298-4 (Kupfer, PVC, 70 °C). Kurzschluss- und
                    Abschaltbedingungen (VDE 0100-410/-430) sind nicht berücksichtigt. Die
                    verbindliche Auslegung gehört in die Hand einer Elektrofachkraft.
                  </p>
                </div>

                <a
                  href="/kontakt"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 mt-4 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
                >
                  Fachplanung anfragen <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leiterquerschnitt;
