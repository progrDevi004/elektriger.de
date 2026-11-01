import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { X, Settings } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { motion, AnimatePresence } from "framer-motion";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const COOKIE_CONSENT_KEY = "cookie_consent";

export const getCookieConsent = (): CookieConsent | null => {
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always true - required for site functionality
    analytics: false,
    marketing: false,
    timestamp: "",
  });

  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (!existingConsent) {
      // Small delay to avoid flash on page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (consentData: CookieConsent) => {
    const dataWithTimestamp = {
      ...consentData,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(dataWithTimestamp));
    setIsVisible(false);
    
    // Trigger custom event for other components to react
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: dataWithTimestamp }));
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: "",
    });
  };

  const acceptNecessaryOnly = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: "",
    });
  };

  const saveSettings = () => {
    saveConsent(consent);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary/5 px-6 py-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              <BrandLogo heightClass="h-10" />
              <h3 className="font-semibold text-lg text-foreground">Cookie-Einstellungen</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={acceptNecessaryOnly}
              className="h-8 w-8"
              aria-label="Cookie-Banner schließen"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="p-6">
            {!showSettings ? (
              /* Main View */
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                  Einige Cookies sind für die Funktion der Website erforderlich, während andere uns helfen, 
                  die Website zu verbessern und Ihnen personalisierte Inhalte anzuzeigen.
                </p>
                <p className="text-muted-foreground text-sm">
                  Weitere Informationen finden Sie in unserer{" "}
                  <Link to="/datenschutz" className="text-primary hover:underline font-medium">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    onClick={acceptAll}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Alle akzeptieren
                  </Button>
                  <Button
                    onClick={acceptNecessaryOnly}
                    variant="outline"
                    className="flex-1"
                  >
                    Nur notwendige
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="ghost"
                    className="flex-1 gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Einstellungen
                  </Button>
                </div>
              </div>
            ) : (
              /* Settings View */
              <div className="space-y-6">
                <p className="text-muted-foreground text-sm">
                  Hier können Sie Ihre Cookie-Einstellungen anpassen. Notwendige Cookies können nicht 
                  deaktiviert werden, da sie für die grundlegende Funktion der Website erforderlich sind.
                </p>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="space-y-1 flex-1 pr-4">
                      <Label className="font-medium text-foreground">Notwendige Cookies</Label>
                      <p className="text-xs text-muted-foreground">
                        Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht 
                        deaktiviert werden. Sie speichern z.B. Ihre Cookie-Einstellungen und ermöglichen 
                        sichere Anmeldungen.
                      </p>
                    </div>
                    <Switch
                      checked={true}
                      disabled
                      className="opacity-50"
                    />
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="space-y-1 flex-1 pr-4">
                      <Label className="font-medium text-foreground">Analyse-Cookies</Label>
                      <p className="text-xs text-muted-foreground">
                        Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. 
                        Wir verwenden diese Informationen, um unsere Website zu verbessern und die 
                        Benutzererfahrung zu optimieren.
                      </p>
                    </div>
                    <Switch
                      checked={consent.analytics}
                      onCheckedChange={(checked) =>
                        setConsent((prev) => ({ ...prev, analytics: checked }))
                      }
                    />
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="space-y-1 flex-1 pr-4">
                      <Label className="font-medium text-foreground">Marketing-Cookies</Label>
                      <p className="text-xs text-muted-foreground">
                        Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten. 
                        Sie können auch die Anzahl der Anzeigen begrenzen und die Wirksamkeit von 
                        Werbekampagnen messen.
                      </p>
                    </div>
                    <Switch
                      checked={consent.marketing}
                      onCheckedChange={(checked) =>
                        setConsent((prev) => ({ ...prev, marketing: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    onClick={saveSettings}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Einstellungen speichern
                  </Button>
                  <Button
                    onClick={() => setShowSettings(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Zurück
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Sie können Ihre Einstellungen jederzeit ändern. Weitere Informationen finden Sie in unserer{" "}
                  <Link to="/datenschutz" className="text-primary hover:underline">
                    Datenschutzerklärung
                  </Link>{" "}
                  und unseren{" "}
                  <Link to="/agb" className="text-primary hover:underline">
                    AGB
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
