import { useState, useEffect } from "react";
import { ArrowRight, X, Sun, Moon, Phone, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import BrandLogo from "@/components/BrandLogo";
import { SITE_EMAIL, SITE_NAME } from "@/data/brand";

const contactInfo = {
  phone: "+4915206268513",
  phoneDisplay: "01520 6268513",
  whatsapp: "4915206268513",
  email: SITE_EMAIL,
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const navLinks = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Smart Home", href: "/smart-home" },
  { label: "Angebotsrechner", href: "/angebotsrechner" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "Über uns", href: "/ueber-uns" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        <div
          className="bg-teal/10 dark:bg-teal/5 border-b border-border/60 text-xs text-muted-foreground"
          role="region"
          aria-label="Kontaktinformationen"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between gap-3">
            <span className="text-foreground/80 font-medium shrink-0">
              Ihr Elektriker in Peine
            </span>

            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-teal transition-colors focus:outline-none focus:text-teal whitespace-nowrap"
                aria-label="WhatsApp-Nachricht senden"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-teal" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-teal transition-colors focus:outline-none focus:text-teal whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-teal" aria-hidden="true" />
                <span>{contactInfo.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-1.5 hover:text-teal transition-colors focus:outline-none focus:text-teal whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5 text-teal" aria-hidden="true" />
                <span className="hidden sm:inline">{contactInfo.email}</span>
                <span className="sm:hidden">E-Mail</span>
              </a>
            </div>
          </div>
        </div>

        <nav className="w-full glass-nav transition-all duration-300" role="navigation" aria-label="Hauptnavigation">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a 
            href="/" 
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-teal rounded-lg"
            aria-label={`${SITE_NAME} - Zur Startseite`}
          >
            <BrandLogo loading="eager" />
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="hover:text-teal transition-colors focus:outline-none focus:text-teal relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal"
                aria-label={theme === 'dark' ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-foreground" />
                ) : (
                  <Moon className="w-4 h-4 text-foreground" />
                )}
              </button>
            )}
            <a 
              href="/kontakt" 
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-teal to-green text-white text-xs font-medium px-3.5 py-1.5 rounded-full hover:shadow-lg hover:shadow-teal/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Kontakt aufnehmen"
            >
              Kontakt
              <ArrowRight className="w-3 h-3" strokeWidth={2} />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal rounded-lg"
              aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : "opacity-100"}`} />
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>
      </header>

      <div 
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div 
        className={`fixed top-0 right-0 z-40 h-full w-[280px] bg-background border-l border-border transform transition-transform duration-300 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex flex-col h-full pt-28 pb-8 px-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded-lg"
            aria-label="Menü schließen"
          >
            <X className="w-5 h-5" />
          </button>

          <nav className="flex-1 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-secondary/50 rounded-xl transition-all duration-200 focus:outline-none focus:bg-teal/10 focus:text-teal"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? "fade-in 0.3s ease-out forwards" : "none"
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-border">
            <div className="space-y-2 pb-2 text-sm text-muted-foreground">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-teal transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-teal shrink-0" />
                WhatsApp
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 hover:text-teal transition-colors">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                {contactInfo.phoneDisplay}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-teal transition-colors">
                <Mail className="w-4 h-4 text-teal shrink-0" />
                {contactInfo.email}
              </a>
            </div>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium text-foreground border border-border rounded-full hover:bg-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal"
                aria-label={theme === 'dark' ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
              >
                {theme === 'dark' ? (<><Sun className="w-4 h-4" /> Hellmodus</>) : (<><Moon className="w-4 h-4" /> Dunkelmodus</>)}
              </button>
            )}
            <a 
              href="/kontakt"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium text-white bg-gradient-to-r from-teal to-green rounded-full hover:shadow-lg hover:shadow-teal/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Kontakt aufnehmen"
            >
              Kontakt aufnehmen
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;