import { Linkedin, Mail, Cookie } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { FORMER_NOTE, SITE_EMAIL, SITE_NAME, SITE_TAGLINE } from "@/data/brand";
import { getPartnerOrdered } from "@/data/partner";

const footerLinks = {
  leistungen: [
    { label: "Smart Home", href: "/smart-home" },
    { label: "Elektrik & Installation", href: "/elektroinstallation" },
    { label: "E-Check", href: "/e-check" },
    { label: "Bauüberwachung", href: "/planung-bauleitung" },
    { label: "Angebotsrechner", href: "/angebotsrechner" },
    { label: "Tools", href: "/tools" },
  ],
  region: [
    { label: "Übersicht", href: "/einsatzgebiet" },
    { label: "Peine", href: "/elektriker/peine" },
    { label: "Ilsede", href: "/elektriker/ilsede" },
    { label: "Burgdorf", href: "/elektriker/burgdorf" },
    { label: "Hannover", href: "/elektriker/hannover" },
    { label: "Braunschweig", href: "/elektriker/braunschweig" },
    { label: "Hildesheim", href: "/elektriker/hildesheim" },
    { label: "Salzgitter", href: "/elektriker/salzgitter" },
    { label: "Wolfenbüttel", href: "/elektriker/wolfenbuettel" },
  ],
  partner: [
    { label: "Übersicht", href: "/partnerbetriebe" },
    ...getPartnerOrdered().map((partner) => ({
      label: partner.name,
      href: partner.websiteUrl,
      external: true,
    })),
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" },
  ],
};

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/eyyub-abdulaziz-alici-35257b213/",
    label: "LinkedIn-Profil von Eyyub-Abdulaziz Alici",
    external: true,
  },
  { icon: Mail, href: `mailto:${SITE_EMAIL}`, label: "E-Mail senden", external: false },
];

const COOKIE_CONSENT_KEY = "cookie_consent";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openCookieSettings = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    window.location.reload();
  };

  return (
    <footer className="border-t border-border bg-secondary dark:bg-card pt-16 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-12 mb-16">
          <div className="col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6 focus:outline-none focus:ring-2 focus:ring-teal rounded-lg" aria-label="Zur Startseite">
              <BrandLogo />
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              Elektriker in Peine und Umgebung für Elektrik, Energie und Smart Home.
            </p>
            <p className="text-sm text-teal font-medium mb-1">{SITE_TAGLINE}</p>
            <p className="text-xs text-muted-foreground/80 mb-4">
              {FORMER_NOTE}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-1">
              Gunzelinstr. 12a, 31224 Peine
            </p>
            <a
              href="tel:+4915206268513"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              01520 6268513
            </a>
            <div className="flex flex-col gap-2">
              <a
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline"
              >
                Zum Blog
              </a>
              <a
                href="/faq"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline"
              >
                FAQ
              </a>
            </div>
          </div>

          <nav aria-label="Leistungen">
            <h4 className="text-primary font-medium mb-6 text-sm">Leistungen</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {footerLinks.leistungen.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Einsatzgebiet">
            <h4 className="text-primary font-medium mb-6 text-sm">Einsatzgebiet</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {footerLinks.region.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Partnerbetriebe">
            <h4 className="text-primary font-medium mb-6 text-sm">Partnerbetriebe</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {footerLinks.partner.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline"
                    {...("external" in link && link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliche Links">
            <h4 className="text-primary font-medium mb-6 text-sm">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Cookie-Einstellungen">
            <h4 className="text-primary font-medium mb-6 text-sm">Cookie-Einstellungen</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={openCookieSettings}
                  className="hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline flex items-center gap-2"
                >
                  <Cookie className="w-3 h-3" />
                  Einstellungen anpassen
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-xs text-muted-foreground">
          <p>© {currentYear} {SITE_NAME}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {socialLinks.map(({ icon: Icon, href, label, external }, index) => (
              <a
                key={index}
                href={href}
                className="hover:text-primary transition-colors focus:outline-none focus:text-primary p-1 rounded"
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;