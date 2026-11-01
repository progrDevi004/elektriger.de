import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, Info, AlertTriangle } from "lucide-react";
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
  berechneBeleuchtung,
  RAUMTYPEN,
  LEUCHTEN_TYPEN,
  DEFAULT_WARTUNGSFAKTOR,
  type Raumtyp,
  type BeleuchtungInput,
} from "@/lib/beleuchtung";

const DEFAULT_INPUT: BeleuchtungInput = {
  raumtyp: "wohnzimmer",
  flaeche: 20,
  nutzungsgrad: 0.45,
  wartungsfaktor: DEFAULT_WARTUNGSFAKTOR,
  lichtstromProLeuchte: 800,
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

const Beleuchtung = () => {
  const [input, setInput] = useState<BeleuchtungInput>(DEFAULT_INPUT);
  const update = (patch: Partial<BeleuchtungInput>) => setInput((prev) => ({ ...prev, ...patch }));
  const num = (v: string) => (v === "" ? 0 : Number(v.replace(",", ".")));

  const ergebnis = useMemo(() => berechneBeleuchtung(input), [input]);
  const raumInfo = RAUMTYPEN.find((r) => r.value === input.raumtyp);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Beleuchtungsrechner – Elektiger",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description:
      "Kostenloser Beleuchtungsrechner: Leuchtenanzahl und Lichtstrom nach DIN 18015-2 und DIN EN 12464-1 für Wohnräume und Homeoffice.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Beleuchtungsrechner – Leuchtenanzahl nach DIN 18015-2 berechnen"
        description="Beleuchtungsstärke und Leuchtenanzahl online berechnen: Orientierungswerte nach DIN 18015-2 und DIN EN 12464-1 für Wohnzimmer, Küche, Bad, Arbeitszimmer und mehr."
        path="/beleuchtung"
        keywords="Beleuchtungsrechner, Leuchtenanzahl berechnen, Beleuchtungsstärke Lux, DIN 18015-2, DIN EN 12464-1, Lichtstrom Lumen, LED Planung"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <Lightbulb className="w-3 h-3" />
              Beleuchtungsrechner
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
              Die richtige <span className="text-gradient-silver">Beleuchtung</span> planen.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Grobe Leuchtenanzahl nach DIN 18015-2 (Wohnräume) und DIN EN 12464-1 (Arbeitsstätten)
              – inkl. Nutzungs- und Wartungsfaktor.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            <div className="rounded-3xl border border-border bg-card/50 p-6 md:p-8 space-y-6">
              <Field label="Raumtyp" hint={raumInfo ? `Zielwert Em: ${raumInfo.emLux} lx (${raumInfo.norm})` : undefined}>
                <Select value={input.raumtyp} onValueChange={(v) => update({ raumtyp: v as Raumtyp })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RAUMTYPEN.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label} ({r.emLux} lx)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Raumfläche (m²)" htmlFor="flaeche">
                <Input
                  id="flaeche"
                  type="number"
                  inputMode="decimal"
                  min="1"
                  value={input.flaeche || ""}
                  onChange={(e) => update({ flaeche: num(e.target.value) })}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nutzungsgrad UF" htmlFor="uf" hint="typisch 0,35–0,55 in Wohnräumen">
                  <Input
                    id="uf"
                    type="number"
                    inputMode="decimal"
                    step="0.05"
                    min="0.2"
                    max="0.7"
                    value={input.nutzungsgrad || ""}
                    onChange={(e) => update({ nutzungsgrad: num(e.target.value) })}
                  />
                </Field>
                <Field label="Wartungsfaktor MF" htmlFor="mf" hint="LED-Neuanlage typ. 0,80">
                  <Input
                    id="mf"
                    type="number"
                    inputMode="decimal"
                    step="0.05"
                    min="0.5"
                    max="1"
                    value={input.wartungsfaktor || ""}
                    onChange={(e) => update({ wartungsfaktor: num(e.target.value) })}
                  />
                </Field>
              </div>

              <Field label="Leuchtmittel / Lichtstrom pro Leuchte">
                <Select
                  value={String(input.lichtstromProLeuchte)}
                  onValueChange={(v) => update({ lichtstromProLeuchte: Number(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEUCHTEN_TYPEN.map((l) => (
                      <SelectItem key={l.lm} value={String(l.lm)}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="lg:sticky lg:top-32 self-start">
              <motion.div className="rounded-3xl border border-border bg-card/50 p-6 md:p-7" initial={false}>
                <h2 className="text-lg font-medium text-primary mb-5 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-teal" /> Ergebnis
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
                      <p className="text-sm text-muted-foreground mb-1">Empfohlene Leuchtenanzahl</p>
                      <p className="text-4xl font-semibold text-primary">{ergebnis.anzahlLeuchten}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        à {input.lichtstromProLeuchte.toLocaleString("de-DE")} lm
                      </p>
                    </div>

                    <div className="mb-4">
                      <ResultRow label="Ziel-Beleuchtungsstärke Em" value={`${ergebnis.emLux} lx`} />
                      <ResultRow label="Normgrundlage" value={ergebnis.norm} />
                      <ResultRow
                        label="Benötigter Lichtstrom"
                        value={`${ergebnis.gesamtLichtstrom.toLocaleString("de-DE")} lm`}
                      />
                      <ResultRow label="Erreichbares Em (gerundet)" value={`${ergebnis.emErreicht} lx`} />
                      <ResultRow label="Nutzungsgrad UF" value={input.nutzungsgrad.toLocaleString("de-DE")} />
                      <ResultRow label="Wartungsfaktor MF" value={input.wartungsfaktor.toLocaleString("de-DE")} />
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
                    Orientierungswert für die grobe Planung. Arbeitsflächen, Spots und dekorative
                    Beleuchtung können zusätzliche Leuchten erfordern – keine Ersatzleistung für
                    lichttechnische Fachplanung.
                  </p>
                </div>

                <a
                  href="/kontakt"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 mt-4 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
                >
                  Beleuchtungsplanung anfragen <ArrowRight className="w-4 h-4" />
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

export default Beleuchtung;
