import { SITE_URL, DEFAULT_IMAGE, SITE_NAME } from "@/components/SEO";
import { FORMER_NAME, SITE_EMAIL } from "@/data/brand";
import { BUSINESS_ID } from "@/data/site";

export { BUSINESS_ID };
export const ELEKTROINSTALLATION_SERVICE_ID = `${SITE_URL}/elektroinstallation/#service`;
export const SMART_HOME_SERVICE_ID = `${SITE_URL}/smart-home/#service`;

/** Orte im Einsatzgebiet – bewusst ohne Import aus standorte.ts (SSG/Bundle-Trennung). */
const AREA_CITIES = [
  "Peine",
  "Ilsede",
  "Burgdorf",
  "Hannover",
  "Braunschweig",
  "Hildesheim",
  "Salzgitter",
  "Wolfenbüttel",
] as const;

const AREA_SERVED = [
  {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 52.321,
      longitude: 10.233,
    },
    geoRadius: "50000",
  },
  ...AREA_CITIES.map((name) => ({
    "@type": "City",
    name,
  })),
];

const LOGO_URL = `${SITE_URL}/apple-touch-icon.png`;

/** Öffnungszeiten laut Geschäftsangaben (Mo–Fr). */
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "08:00",
    closes: "17:00",
  },
] as const;

/**
 * Strukturierte Daten für die Startseite (@graph: Electrician + Services).
 * Wird über die SEO-Komponente ins <head> eingefügt.
 */
export function getHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Electrician",
        "@id": BUSINESS_ID,
        name: SITE_NAME,
        alternateName: FORMER_NAME,
        url: `${SITE_URL}/`,
        telephone: "+4915206268513",
        email: SITE_EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Gunzelinstr. 12a",
          addressLocality: "Peine",
          addressRegion: "Niedersachsen",
          postalCode: "31224",
          addressCountry: "DE",
        },
        areaServed: AREA_SERVED,
        priceRange: "€€",
        logo: LOGO_URL,
        image: DEFAULT_IMAGE,
        geo: {
          "@type": "GeoCoordinates",
          latitude: 52.321,
          longitude: 10.233,
        },
        openingHoursSpecification: OPENING_HOURS,
        description:
          "Elektriker in Peine für Elektrik, Energie und Smart Home – Installation, Sanierung, Photovoltaik, Wallbox, E-Check und intelligente Haussteuerung.",
        knowsAbout: [
          "Elektriker Peine",
          "Elektrik",
          "Elektroinstallation",
          "Photovoltaik",
          "Wallbox",
          "E-Check",
          "Smart Home",
          "Elektrotechnik",
        ],
        sameAs: [
          "https://www.linkedin.com/in/eyyub-abdulaziz-alici-35257b213/",
          "https://g.page/r/Cf2o45kEwYgYEBE",
        ],
      },
      {
        "@type": "Service",
        "@id": ELEKTROINSTALLATION_SERVICE_ID,
        name: "Elektrik & Installation",
        provider: { "@id": BUSINESS_ID },
        areaServed: AREA_SERVED,
        serviceType: "Elektrik und Elektroinstallation",
      },
      {
        "@type": "Service",
        "@id": SMART_HOME_SERVICE_ID,
        name: "Smart Home",
        provider: { "@id": BUSINESS_ID },
        areaServed: AREA_SERVED,
        serviceType: "Smart Home und Hausautomation",
      },
    ],
  };
}
