import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Euro, ArrowRight, Info, AlertTriangle, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  berechneStromkosten,
  formatEuro,
  DEFAULT_STROMPREIS,
  GERAETE_PRESETS,
  type StromkostenInput,
} from "@/lib/stromkosten";

const DEFAULT_INPUT: StromkostenInput = {
  watt: 100,
  stundenProTag: 8,
  tageProJahr: 365,
  strompreis: DEFAULT_STROMPREIS,
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

const Stromkosten = () => {
  const [input, setInput] = useState<StromkostenInput>(DEFAULT_INPUT);
  const [aktivesPreset, setAktivesPreset] = useState<string | null>(null);
  const update = (patch: Partial<StromkostenInput>) => setInput((prev) => ({ ...prev, ...patch }));
  const num = (v: string) => (v === "" ? 0 : Number(v.replace(",", ".")));

  const ergebnis = useMemo(() => berechneStromkosten(input), [input]);

  const waehlePreset = (id: string) => {
    const preset = GERAETE_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setAktivesPreset(id);
    update({
      watt: preset.watt,
      stundenProTag: preset.stundenProTag,
      tageProJahr: preset.tageProJahr,
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stromkostenrechner – Elektiger",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description:
      "Stromkosten für elektrische Geräte berechnen – Verbrauch in kWh und Kosten pro Tag, Monat und Jahr.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Stromkostenrechner – Stromverbrauch und Kosten berechnen"
        description="Stromkosten online berechnen: Verbrauch in kWh und jährliche Kosten für Haushaltsgeräte, Wallbox, Wärmepumpe und mehr – mit aktuellem Strompreis-Richtwert."
        path="/stromkosten"
        keywords="Stromkostenrechner, Stromverbrauch berechnen, kWh Kosten, Strompreis Rechner, Haushaltsgerät Stromkosten, Wallbox Stromkosten"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <Euro className="w-3 h-3" />
              Stromkostenrechner
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
              <span className="text-gradient-silver">Stromkosten</span> im Blick behalten.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Verbrauch und Kosten für elektrische Geräte berechnen – mit anpassbarem Arbeitspreis
              (Richtwert {DEFAULT_STROMPREIS.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €/kWh).
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            <div className="rounded-3xl border border-border bg-card/50 p-6 md:p-8 space-y-6">
              <Field label="Geräte-Vorlage (optional)">
                <div className="flex flex-wrap gap-2">
                  {GERAETE_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => waehlePreset(p.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        aktivesPreset === p.id
                          ? "border-teal bg-teal/10 text-teal"
                          : "border-border bg-card text-muted-foreground hover:border-teal/40"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Leistungsaufnahme (W)" htmlFor="watt" hint="Nenn- oder Durchschnittsleistung">
                <Input
                  id="watt"
                  type="number"
                  inputMode="decimal"
                  min="1"
                  value={input.watt || ""}
                  onChange={(e) => {
                    setAktivesPreset(null);
                    update({ watt: num(e.target.value) });
                  }}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Betriebsstunden pro Tag" htmlFor="stunden">
                  <Input
                    id="stunden"
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="0"
                    max="24"
                    value={input.stundenProTag || ""}
                    onChange={(e) => {
                      setAktivesPreset(null);
                      update({ stundenProTag: num(e.target.value) });
                    }}
                  />
                </Field>
                <Field label="Betriebstage pro Jahr" htmlFor="tage">
                  <Input
                    id="tage"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="366"
                    value={input.tageProJahr || ""}
                    onChange={(e) => {
                      setAktivesPreset(null);
                      update({ tageProJahr: Math.round(num(e.target.value)) });
                    }}
                  />
                </Field>
              </div>

              <Field
                label="Strompreis (€/kWh brutto)"
                htmlFor="preis"
                hint="Haushaltsdurchschnitt DE ca. 0,39 €/kWh – ohne Grundpreis"
              >
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
                      <p className="text-sm text-muted-foreground mb-1">Kosten pro Jahr</p>
                      <p className="text-4xl font-semibold text-primary">{formatEuro(ergebnis.kostenProJahr)}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {ergebnis.kwhProJahr.toLocaleString("de-DE")} kWh/Jahr
                      </p>
                    </div>

                    <div className="mb-4">
                      <ResultRow label="Verbrauch pro Tag" value={`${ergebnis.kwhProTag.toLocaleString("de-DE")} kWh`} />
                      <ResultRow label="Kosten pro Tag" value={formatEuro(ergebnis.kostenProTag)} />
                      <ResultRow label="Kosten pro Monat" value={formatEuro(ergebnis.kostenProMonat)} />
                      <ResultRow label="CO₂-Äquivalent/Jahr" value={`${ergebnis.co2KgProJahr.toLocaleString("de-DE")} kg`} />
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
                    Vereinfachte Berechnung auf Basis des Arbeitspreises. Grundpreis, Leistungspreis
                    und tatsächlicher Verbrauch (z. B. Tages-/Nachtstrom) können abweichen.
                  </p>
                </div>

                <a
                  href="/kontakt"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 mt-4 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
                >
                  Energieberatung anfragen <ArrowRight className="w-4 h-4" />
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

export default Stromkosten;
