import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Home,
  DoorOpen,
  Store,
  Hammer,
  Wrench,
  Lightbulb,
  Sparkles,
  Cpu,
  Car,
  ShieldCheck,
  Network,
  Gauge,
  ClipboardCheck,
  Sun,
  BatteryCharging,
  Trees,
  Bell,
  PhoneCall,
  Video,
  Smartphone,
  KeyRound,
  Monitor,
  Check,
  Calculator,
  RefreshCw,
  Info,
  type LucideIcon,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Slider } from "@/components/ui/slider";
import {
  calculateEstimate,
  clampFlaeche,
  formatEuro,
  getModulesForProjektart,
  TUERKOMMUNIKATION,
  TUER_EXTRAS,
  type CalculatorInput,
  type Projektart,
  type Objekttyp,
  type Ausstattung,
  type SmartHomeLevel,
  type Tuerkommunikation,
  type TuerExtraId,
  type ModuleId,
} from "@/lib/angebotsrechner";

type StepKey =
  | "projektart"
  | "objekt"
  | "ausstattung"
  | "smarthome"
  | "tuerkommunikation"
  | "module"
  | "ergebnis";

interface Option<T extends string> {
  value: T;
  label: string;
  description?: string;
  icon: LucideIcon;
}

const projektartOptions: Option<Projektart>[] = [
  { value: "neubau", label: "Neubau", description: "Kompletter Neubau von Grund auf.", icon: Building2 },
  { value: "sanierung", label: "Sanierung / Modernisierung", description: "Bestandsgebäude erneuern oder umbauen.", icon: Hammer },
  { value: "einzelmassnahme", label: "Einzelmaßnahme / Nachrüstung", description: "Einzelne Leistungen wie Wallbox, E-Check oder Zählerschrank.", icon: Wrench },
];

const objekttypOptions: Option<Objekttyp>[] = [
  { value: "wohnung", label: "Wohnung", icon: DoorOpen },
  { value: "einfamilienhaus", label: "Einfamilienhaus", icon: Home },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus", icon: Building2 },
  { value: "gewerbe", label: "Gewerbe / Büro", icon: Store },
];

const ausstattungOptions: Option<Ausstattung>[] = [
  { value: "basis", label: "Basis", description: "Grundausstattung nach Norm (DIN 18015).", icon: Lightbulb },
  { value: "standard", label: "Standard", description: "Übliche, solide Ausstattung.", icon: Home },
  { value: "komfort", label: "Komfort", description: "Mehr Steckdosen, Netzwerk, Smart-Home-Vorrüstung.", icon: Sparkles },
  { value: "premium", label: "Premium", description: "Hochwertig, KNX-fähig, individuelle Planung.", icon: Cpu },
];

const smartHomeOptions: Option<SmartHomeLevel>[] = [
  { value: "keine", label: "Kein Smart Home", description: "Klassische Elektroinstallation.", icon: Home },
  { value: "basis", label: "Basis", description: "Intelligente Lichtsteuerung.", icon: Lightbulb },
  { value: "komfort", label: "Komfort", description: "Licht, Beschattung und Heizung vernetzt.", icon: Sparkles },
  { value: "premium", label: "Premium", description: "Zusätzlich Sicherheit, Energiemanagement, Multimedia.", icon: Cpu },
];

const tuerkommunikationIcons: Record<Tuerkommunikation, LucideIcon> = {
  keine: Home,
  klingel: Bell,
  audio: PhoneCall,
  video: Video,
  video_ip: Smartphone,
};

const tuerExtraIcons: Record<TuerExtraId, LucideIcon> = {
  tueroeffner: KeyRound,
  zusatzmonitor: Monitor,
};

const moduleIcons: Record<ModuleId, LucideIcon> = {
  wallbox: Car,
  sicherheitstechnik: ShieldCheck,
  netzwerk: Network,
  zaehlerschrank: Gauge,
  echeck: ClipboardCheck,
  pv: Sun,
  speicher: BatteryCharging,
  aussen: Trees,
};

const stepTitles: Record<StepKey, string> = {
  projektart: "Was ist geplant?",
  objekt: "Angaben zum Objekt",
  ausstattung: "Ausstattungsniveau",
  smarthome: "Smart Home",
  tuerkommunikation: "Klingel- & Türsprechanlage",
  module: "Zusätzliche Leistungen",
  ergebnis: "Ihr Kostenrichtwert",
};

const DEFAULT_INPUT: CalculatorInput = {
  projektart: "neubau",
  objekttyp: "einfamilienhaus",
  flaeche: 150,
  ausstattung: "standard",
  smartHome: "keine",
  tuerkommunikation: "keine",
  tuerExtras: [],
  module: [],
};

interface SelectCardProps {
  selected: boolean;
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  description?: string;
  hint?: string;
  multi?: boolean;
}

const SelectCard = ({ selected, onClick, icon: Icon, title, description, hint, multi }: SelectCardProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`text-left w-full p-5 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal ${
      selected ? "border-teal bg-teal/5 ring-1 ring-teal/30" : "border-border bg-card hover:border-teal/40"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          selected ? "bg-gradient-to-br from-teal to-green text-white" : "bg-secondary text-teal"
        }`}
      >
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-primary leading-snug">{title}</h3>
          <span
            className={`shrink-0 w-5 h-5 border flex items-center justify-center transition-all ${
              multi ? "rounded-md" : "rounded-full"
            } ${selected ? "bg-teal border-teal text-white" : "border-border text-transparent"}`}
          >
            <Check className="w-3 h-3" strokeWidth={3} />
          </span>
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>}
        {hint && <p className="text-xs font-medium text-teal mt-2">{hint}</p>}
      </div>
    </div>
  </button>
);

const Angebotsrechner = () => {
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: StepKey[] = useMemo(
    () =>
      input.projektart === "einzelmassnahme"
        ? ["projektart", "tuerkommunikation", "module", "ergebnis"]
        : ["projektart", "objekt", "ausstattung", "smarthome", "tuerkommunikation", "module", "ergebnis"],
    [input.projektart],
  );

  // Falls sich die Schrittanzahl ändert (Projektart-Wechsel), Index gültig halten.
  useEffect(() => {
    setStepIndex((current) => Math.min(current, steps.length - 1));
  }, [steps.length]);

  const currentStep = steps[stepIndex];
  const isResult = currentStep === "ergebnis";
  const isLastInput = stepIndex === steps.length - 2;
  const progress = Math.round((stepIndex / (steps.length - 1)) * 100);

  const estimate = useMemo(() => calculateEstimate(input), [input]);

  const availableModules = useMemo(
    () => getModulesForProjektart(input.projektart),
    [input.projektart],
  );

  const update = (patch: Partial<CalculatorInput>) => setInput((prev) => ({ ...prev, ...patch }));

  const toggleModule = (id: ModuleId) =>
    setInput((prev) => ({
      ...prev,
      module: prev.module.includes(id)
        ? prev.module.filter((m) => m !== id)
        : [...prev.module, id],
    }));

  const toggleTuerExtra = (id: TuerExtraId) =>
    setInput((prev) => ({
      ...prev,
      tuerExtras: prev.tuerExtras.includes(id)
        ? prev.tuerExtras.filter((e) => e !== id)
        : [...prev.tuerExtras, id],
    }));

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const reset = () => {
    setInput(DEFAULT_INPUT);
    setStepIndex(0);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Angebotsrechner – Elektiger",
    applicationCategory: "BusinessApplication",
    description:
      "Kostenloser Online-Rechner für eine unverbindliche Kostenschätzung von Elektroinstallation, Smart Home und Zusatzleistungen.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Kostenvoranschlag Elektriker Peine – Angebotsrechner"
        description="Unverbindlichen Kostenrichtwert für Elektrik, Smart Home, Wallbox und weitere Elektroarbeiten berechnen – kostenlos und sofort. Ihr Elektriker aus Peine."
        path="/angebotsrechner"
        keywords="Kostenvoranschlag Elektriker Peine, Kosten Elektriker Peine, Angebotsrechner Elektrik, Wallbox Kosten, Smart Home Kosten, Elektroarbeiten berechnen"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6">
              <Calculator className="w-3 h-3" />
              Angebotsrechner
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-4">
              Ihr Kostenrichtwert in <span className="text-gradient-silver">wenigen Schritten.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              Wählen Sie Ihre Leistungen – am Ende erhalten Sie eine unverbindliche
              Preisspanne für Ihr Elektro- oder Smart-Home-Projekt.
            </p>
          </div>

          {/* Fortschritt */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>
                Schritt {Math.min(stepIndex + 1, steps.length)} von {steps.length}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal to-green"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Karte */}
          <div className="rounded-3xl border border-border bg-card/50 p-6 md:p-8">
            <h2 className="text-xl font-medium text-primary mb-6">{stepTitles[currentStep]}</h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {currentStep === "projektart" && (
                  <div className="grid grid-cols-1 gap-3">
                    {projektartOptions.map((opt) => (
                      <SelectCard
                        key={opt.value}
                        selected={input.projektart === opt.value}
                        onClick={() => update({ projektart: opt.value })}
                        icon={opt.icon}
                        title={opt.label}
                        description={opt.description}
                      />
                    ))}
                  </div>
                )}

                {currentStep === "objekt" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {objekttypOptions.map((opt) => (
                        <SelectCard
                          key={opt.value}
                          selected={input.objekttyp === opt.value}
                          onClick={() => update({ objekttyp: opt.value })}
                          icon={opt.icon}
                          title={opt.label}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-primary">
                          Wohn-/Nutzfläche
                        </label>
                        <span className="text-sm font-semibold text-teal">{clampFlaeche(input.flaeche)} m²</span>
                      </div>
                      <Slider
                        value={[clampFlaeche(input.flaeche)]}
                        min={20}
                        max={600}
                        step={5}
                        onValueChange={(vals) => update({ flaeche: vals[0] })}
                        aria-label="Wohn- oder Nutzfläche in Quadratmetern"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>20 m²</span>
                        <span>600 m²</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === "ausstattung" && (
                  <div className="grid grid-cols-1 gap-3">
                    {ausstattungOptions.map((opt) => (
                      <SelectCard
                        key={opt.value}
                        selected={input.ausstattung === opt.value}
                        onClick={() => update({ ausstattung: opt.value })}
                        icon={opt.icon}
                        title={opt.label}
                        description={opt.description}
                      />
                    ))}
                  </div>
                )}

                {currentStep === "smarthome" && (
                  <div className="grid grid-cols-1 gap-3">
                    {smartHomeOptions.map((opt) => (
                      <SelectCard
                        key={opt.value}
                        selected={input.smartHome === opt.value}
                        onClick={() => update({ smartHome: opt.value })}
                        icon={opt.icon}
                        title={opt.label}
                        description={opt.description}
                      />
                    ))}
                  </div>
                )}

                {currentStep === "tuerkommunikation" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-3">
                      {TUERKOMMUNIKATION.map((opt) => (
                        <SelectCard
                          key={opt.value}
                          selected={input.tuerkommunikation === opt.value}
                          onClick={() =>
                            update(
                              opt.value === "keine"
                                ? { tuerkommunikation: opt.value, tuerExtras: [] }
                                : { tuerkommunikation: opt.value },
                            )
                          }
                          icon={tuerkommunikationIcons[opt.value]}
                          title={opt.label}
                          description={opt.description}
                        />
                      ))}
                    </div>

                    {input.tuerkommunikation !== "keine" && (
                      <div>
                        <p className="text-sm font-medium text-primary mb-3">
                          Zusatzoptionen (Mehrfachauswahl)
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {TUER_EXTRAS.map((extra) => (
                            <SelectCard
                              key={extra.id}
                              multi
                              selected={input.tuerExtras.includes(extra.id)}
                              onClick={() => toggleTuerExtra(extra.id)}
                              icon={tuerExtraIcons[extra.id]}
                              title={extra.label}
                              description={extra.description}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === "module" && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Mehrfachauswahl möglich – wählen Sie alles aus, was für Sie infrage kommt.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {availableModules.map((mod) => (
                        <SelectCard
                          key={mod.id}
                          multi
                          selected={input.module.includes(mod.id)}
                          onClick={() => toggleModule(mod.id)}
                          icon={moduleIcons[mod.id]}
                          title={mod.label}
                          description={mod.description}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === "ergebnis" && (
                  <div>
                    {estimate.items.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">
                          Für eine Schätzung wählen Sie bitte mindestens eine Leistung aus.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="rounded-2xl bg-gradient-to-br from-teal/10 to-green/10 border border-teal/20 p-6 text-center mb-6">
                          <p className="text-sm text-muted-foreground mb-1">Geschätzte Kosten (Richtwert)</p>
                          <p className="text-3xl md:text-4xl font-semibold text-primary">
                            {formatEuro(estimate.total.min)} – {formatEuro(estimate.total.max)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">netto, zzgl. gesetzl. MwSt.</p>
                        </div>

                        <div className="space-y-2 mb-6">
                          {estimate.items.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center justify-between gap-4 py-2.5 px-4 rounded-xl border border-border bg-card"
                            >
                              <span className="text-sm text-primary">{item.label}</span>
                              <span className="text-sm text-muted-foreground whitespace-nowrap">
                                {formatEuro(item.min)} – {formatEuro(item.max)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-xl p-4 mb-6">
                      <Info className="w-4 h-4 shrink-0 mt-0.5 text-teal" />
                      <p>
                        Dies ist eine unverbindliche Orientierung auf Basis marktüblicher Richtwerte.
                        Der tatsächliche Preis hängt von den individuellen Gegebenheiten vor Ort ab.
                        Gern erstellen wir Ihnen ein kostenloses, verbindliches Angebot.
                      </p>
                    </div>

                    <a
                      href="/kontakt"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
                    >
                      Kostenloses Angebot anfragen <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="flex items-center justify-center gap-2 w-full mt-3 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                    >
                      <RefreshCw className="w-4 h-4" /> Neu berechnen
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation zwischen den Schritten */}
            {!isResult && (
              <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={back}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none disabled:opacity-0 disabled:pointer-events-none"
                >
                  <ArrowLeft className="w-4 h-4" /> Zurück
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-teal/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  {isLastInput ? "Ergebnis anzeigen" : "Weiter"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Angebotsrechner;
