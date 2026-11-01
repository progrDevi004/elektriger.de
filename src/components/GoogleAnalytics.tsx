import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCookieConsent } from "@/components/CookieBanner";

const GA_MEASUREMENT_ID = "G-T903HED4GR";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function sendPageView(path: string) {
  if (!window.gtag) return;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: `${window.location.origin}${path}`,
    page_path: path,
  });
}

function loadGoogleAnalytics() {
  if (document.getElementById("ga-gtag")) return;

  window.dataLayer = window.dataLayer || [];
  // Offizielles gtag-Snippet: Arguments-Objekt in dataLayer pushen
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Lädt Google Analytics (gtag) einmalig – nur nach Einwilligung
 * in Analytics-Cookies. Sendet page_view auch bei internen Seitenwechseln.
 */
const GoogleAnalytics = () => {
  const location = useLocation();
  const pagePath = `${location.pathname}${location.search}`;

  useEffect(() => {
    const trackIfAllowed = () => {
      if (!getCookieConsent()?.analytics) return undefined;
      loadGoogleAnalytics();
      return window.setTimeout(() => sendPageView(pagePath), 150);
    };

    let timer = trackIfAllowed();

    const onConsentUpdated = (event: Event) => {
      const detail = (event as CustomEvent<{ analytics?: boolean }>).detail;
      if (!detail?.analytics) return;
      window.clearTimeout(timer);
      loadGoogleAnalytics();
      timer = window.setTimeout(() => sendPageView(pagePath), 150);
    };

    window.addEventListener("cookieConsentUpdated", onConsentUpdated);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("cookieConsentUpdated", onConsentUpdated);
    };
  }, [pagePath]);

  return null;
};

export default GoogleAnalytics;
