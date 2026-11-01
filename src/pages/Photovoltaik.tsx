import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sun, ArrowRight, Info, AlertTriangle, Zap, BatteryCharging } from "lucide-react";
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
  berechnePv,
  formatEuro,
  AUSRICHTUNGEN,
  NEIGUNGEN,
  DEFAULT_STROMPREIS,
  DEFAULT_EINSPEISEVERGUETUNG,
  DEFAULT_KOSTEN_PRO_KWP,
  DEFAULT_KOSTEN_PRO_KWH_SPEICHER,
  type PvInput,
  type Ausrichtung,
  type Neigung,
} from "@/lib/photovoltaik";

const DEFAULT_INPUT: PvInput = {
  leistungKwp: 10,
  ausrichtung: "sued",
  neigung: "optimal",
  jahresverbrauch: 4000,
  speicher: false,
  speicherKwh: 8,
  strompreis: DEFAULT_STROMPREIS,
  einspeiseverguetung: DEFAULT_EINSPEISEVERGUETUNG,
  kostenProKwp: DEFAULT_KOSTEN_PRO_KWP,
  kostenProKwhSpeicher: DEFAULT_KOSTEN_PRO_KWH_SPEICHER,
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

const Photovoltaik = () => {
  const [input, setInput] = useState<PvInput>(DEFAULT_INPUT);
  const update = (patch: Partial<PvInput>) => setInput((prev) => ({ ...prev, ...patch }));
  const num = (v: string) => (v === "" ? 0 : Number(v.replace(",", ".")));

  const ergebnis = useMemo(() => berechnePv(input), [input]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Photovoltaik-Rechner – Elektiger",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description:
      "Kostenloser Photovoltaik-Rechner: Jahresertrag, Eigenverbrauch, Einspeisung, Ersparnis und Amortisation einer PV-Anlage abschätzen.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Photovoltaik-Rechner – PV-Ertrag & Amortisation berechnen"
        description="PV-Ertrag, Eigenverbrauch, Ersparnis und Amortisation online berechnen: Photovoltaik-Rechner mit realen Richtwerten für Niedersachsen – inkl. Speicher und Einspeisevergütung."
        path="/photovoltaik"
        keywords="Photovoltaik Rechner, PV Ertrag berechnen, Solaranlage Ertrag, PV Amortisation, Eigenverbrauch Photovoltaik, Photovoltaik Peine, Solaranlage lohnt sich"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <Sun className="w-3 h-3" />
              Photovoltaik-Rechner
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
              Lohnt sich Ihre <span className="text-gradient-silver">PV-Anlage</span>?
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Ertrag, Eigenverbrauch, Ersparnis und Amortisation abschätzen – mit realen
              Richtwerten für die Region Niedersachsen.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            <div className="rounded-3xl border border-border bg-card/50 p-6 md:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Anlagengröße (kWp)" htmlFor="kwp" hint="Einfamilienhaus typ. 5–12 kWp">
                  <Input
                    id="kwp"
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="1"
                    value={input.leistungKwp || ""}
                    onChange={(e) => update({ leistungKwp: num(e.target.value) })}
                  />
                </Field>
                <Field label="Jahresverbrauch (kWh)" htmlFor="verbrauch" hint="Haushalt: 1 Pers. ~1.500, 4 Pers. ~4.000">
                  <Input
                    id="verbrauch"
                    type="number"
                    inputMode="decimal"
                    min="1"
                    value={input.jahresverbrauch || ""}
                    onChange={(e) => update({ jahresverbrauch: num(e.target.value) })}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Dachausrichtung">
                  <Select value={input.ausrichtung} onValueChange={(v) => update({ ausrichtung: v as Ausrichtung })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AUSRICHTUNGEN.map((a) => (
                        <SelectItem key={a.value} value={a.value}>
                          {a.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Dachneigung">
                  <Select value={input.neigung} onValueChange={(v) => update({ neigung: v as Neigung })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NEIGUNGEN.map((n) => (
                        <SelectItem key={n.value} value={n.value}>
                          {n.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field label="Batteriespeicher">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => update({ speicher: false })}
                    aria-pressed={!input.speicher}
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal ${
                      !input.speicher
                        ? "border-teal bg-teal/5 text-primary ring-1 ring-teal/30"
                        : "border-border bg-card text-muted-foreground hover:border-teal/40"
                    }`}
                  >
                    Ohne Speicher
                  </button>
                  <button
                    type="button"
                    onClick={() => update({ speicher: true })}
                    aria-pressed={input.speicher}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal ${
                      input.speicher
                        ? "border-teal bg-teal/5 text-primary ring-1 ring-teal/30"
                        : "border-border bg-card text-muted-foreground hover:border-teal/40"
                    }`}
                  >
                    <BatteryCharging className="w-4 h-4" /> Mit Speicher
                  </button>
                </div>
              </Field>

              {input.speicher && (
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Speicherkapazität (kWh)" htmlFor="speicher" hint="typisch 5–15 kWh">
                    <Input
                      id="speicher"
                      type="number"
                      inputMode="decimal"
                      step="0.5"
                      min="1"
                      value={input.speicherKwh || ""}
                      onChange={(e) => update({ speicherKwh: num(e.target.value) })}
                    />
                  </Field>
                  <Field label="Speicherkosten (€/kWh)" htmlFor="speicherkosten" hint="inkl. Installation ~600–1.000 €/kWh">
                    <Input
                      id="speicherkosten"
                      type="number"
                      inputMode="decimal"
                      step="50"
                      min="1"
                      value={input.kostenProKwhSpeicher || ""}
                      onChange={(e) => update({ kostenProKwhSpeicher: num(e.target.value) })}
                    />
                  </Field>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Strompreis (€/kWh)" htmlFor="preis" hint="Netzbezug, ca. 0,39 €/kWh">
                  <Input
                    id="preis"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0.01"
                    value={input.strompreis || ""}
                    onChange={(e) => update({ strompreis: num(e.target.value) })}
                  />
                </Field>
                <Field label="Einspeisevergütung (€/kWh)" htmlFor="eeg" hint="EEG bis 10 kWp ~0,08 €/kWh">
                  <Input
                    id="eeg"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    value={input.einspeiseverguetung || ""}
                    onChange={(e) => update({ einspeiseverguetung: num(e.target.value) })}
                  />
                </Field>
              </div>

              <Field label="Anlagenkosten (€/kWp)" htmlFor="kosten" hint="Aufdach schlüsselfertig ~1.200–1.800 €/kWp">
                <Input
                  id="kosten"
                  type="number"
                  inputMode="decimal"
                  step="50"
                  min="1"
                  value={input.kostenProKwp || ""}
                  onChange={(e) => update({ kostenProKwp: num(e.target.value) })}
                />
              </Field>
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
                      <p className="text-sm text-muted-foreground mb-1">Wirtschaftlicher Vorteil / Jahr</p>
                      <p className="text-4xl font-semibold text-primary">{formatEuro(ergebnis.vorteilProJahr)}</p>
                      {ergebnis.amortisationJahre !== null && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Amortisation nach ca. {ergebnis.amortisationJahre.toLocaleString("de-DE")} Jahren
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <ResultRow label="Jahresertrag" value={`${ergebnis.jahresertrag.toLocaleString("de-DE")} kWh`} />
                      <ResultRow label="Eigenverbrauch" value={`${ergebnis.eigenverbrauch.toLocaleString("de-DE")} kWh`} />
                      <ResultRow label="Einspeisung" value={`${ergebnis.einspeisung.toLocaleString("de-DE")} kWh`} />
                      <ResultRow label="Eigenverbrauchsquote" value={`${ergebnis.eigenverbrauchsquote} %`} />
                      <ResultRow label="Autarkiegrad" value={`${ergebnis.autarkiegrad} %`} />
                      <ResultRow label="Ersparnis Eigenverbrauch" value={`${formatEuro(ergebnis.ersparnisEigenverbrauch)}/Jahr`} />
                      <ResultRow label="Einnahmen Einspeisung" value={`${formatEuro(ergebnis.einnahmenEinspeisung)}/Jahr`} />
                      <ResultRow label="Investition (Richtwert)" value={formatEuro(ergebnis.investition)} />
                      {ergebnis.speicherInvestition > 0 && (
                        <ResultRow label="davon Speicher" value={formatEuro(ergebnis.speicherInvestition)} />
                      )}
                      <ResultRow label="CO₂-Einsparung/Jahr" value={`${ergebnis.co2Ersparnis.toLocaleString("de-DE")} kg`} />
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
                    Grobe Orientierung ohne Verschattung, individuelles Lastprofil, Degradation oder
                    Förderungen. Für eine belastbare Auslegung und Anmeldung beraten wir Sie gerne.
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <a
                    href="/stromkosten"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-teal/30 text-teal text-sm font-medium rounded-full hover:bg-teal/5 transition-all"
                  >
                    Zum Stromkostenrechner
                  </a>
                  <a
                    href="/kontakt"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
                  >
                    PV-Beratung anfragen <ArrowRight className="w-4 h-4" />
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

export default Photovoltaik;
