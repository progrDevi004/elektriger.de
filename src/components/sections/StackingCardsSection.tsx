import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import smartHomeImg from "@/assets/smart-home.webp";
import elektroinstallationImg from "@/assets/elektroinstallation.webp";
import profiServiceImg from "@/assets/profi-service.jpg";
import architektenServiceImg from "@/assets/architekten-service.webp";

interface CardData {
  title: string;
  subtitle: string;
  description: string;
  stats: string;
  number: string;
  image: string;
  link: string;
}

const cardsData: CardData[] = [
  {
    title: "Elektrik & Installation",
    subtitle: "Neubau & Sanierung",
    description: "Als Elektriker in Peine planen und installieren wir Ihre Elektrik im Neubau und Bestand – von der Unterverteilung bis zur Netzwerktechnik, sicher nach VDE.",
    stats: "Elektriker Peine",
    number: "01",
    image: elektroinstallationImg,
    link: "/elektroinstallation"
  },
  {
    title: "Smart Home",
    subtitle: "Komfort & Steuerung",
    description: "Intelligente Haussteuerung für Licht, Heizung, Beschattung und Sicherheit – herstellerunabhängig und auf Ihren Alltag zugeschnitten.",
    stats: "Komfort & Effizienz",
    number: "02",
    image: smartHomeImg,
    link: "/smart-home"
  },
  {
    title: "E-Check & Sicherheit",
    subtitle: "Prüfung Ihrer Elektrik",
    description: "Fachgerechter E-Check: Gefahrenstellen rechtzeitig erkennen, rechtssicher dokumentieren und Ihre Versicherung absichern – für ein sicheres Zuhause.",
    stats: "E-Check Peine",
    number: "03",
    image: profiServiceImg,
    link: "/e-check"
  },
  {
    title: "Bauüberwachung Elektro",
    subtitle: "Für Bauherren & Bauunternehmer",
    description: "Wir überwachen die Elektroarbeiten Ihrer ausführenden Elektrofirma – unabhängig und fachlich: Qualitätskontrolle, Mängeldokumentation und Abnahmebegleitung.",
    stats: "Bauüberwachung",
    number: "04",
    image: architektenServiceImg,
    link: "/planung-bauleitung"
  }
];

const StackingCardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      ctx = gsap.context(() => {
        cards.forEach((card) => {
          const inner = card.querySelector(".card-inner");
          if (inner) {
            gsap.set(inner, { scale: 1, opacity: 1, filter: "blur(0px)" });
          }
        });

        cards.forEach((card) => {
          const inner = card.querySelector(".card-inner");
          if (!inner) return;
          const cardHeight = card.offsetHeight;

          gsap.fromTo(
            inner,
            { scale: 1 },
            {
              scale: 0.92,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 50%", end: "top 12%", scrub: 1 },
            },
          );

          gsap.fromTo(
            inner,
            { opacity: 1, filter: "blur(0px)" },
            {
              opacity: 0.3,
              filter: "blur(4px)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 12%",
                end: () => `+=${cardHeight}`,
                scrub: 1,
              },
            },
          );
        });
      }, section);
    };

    // GSAP erst laden, wenn die Section nah am Viewport ist (spart Initial-JS).
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        void setup();
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32" aria-label="Unsere Leistungsbereiche">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-4">Elektriker in Peine</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gradient-silver">Elektrik, Energie &amp; Smart Home</h2>
        </div>

        <div className="relative">
          {cardsData.map((card, index) => (
            <div
              key={card.number}
              ref={(el) => (cardsRef.current[index] = el)}
              className="sticky top-[12vh]"
              style={{ zIndex: index + 1, marginTop: index === 0 ? 0 : '0.5rem' }}
            >
              <Link to={card.link} className="block group" aria-label={`${card.title} - ${card.subtitle}`}>
                <div 
                  className="card-inner relative overflow-hidden rounded-3xl shadow-xl transition-shadow duration-300 group-hover:shadow-2xl will-change-transform"
                  style={{
                    height: "clamp(400px, 70vh, 700px)",
                    background: "linear-gradient(135deg, hsl(24 100% 46%) 0%, hsl(18 100% 36%) 50%, hsl(12 88% 24%) 100%)",
                    transformOrigin: "center top"
                  }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      width={960}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-15 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  <div className="absolute inset-0" style={{
                    background: "radial-gradient(200px 200px at 30% 30%, rgba(255,255,255,0.15), transparent 60%), radial-gradient(300px 300px at 80% 80%, rgba(0,0,0,0.15), transparent 60%)"
                  }} />

                  <div className="relative h-full flex flex-col md:flex-row">
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center z-10">
                      <span className="text-sm font-mono text-white/70 mb-4">{"{ " + card.number + " }"}</span>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-2 tracking-tight">{card.title}</h3>
                      <p className="text-lg md:text-xl text-white/90 mb-6">{card.subtitle}</p>
                      <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md mb-8">{card.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                          {card.stats}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:flex relative md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 items-center justify-center">
                      <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-500">
                        <img
                          src={card.image}
                          alt={card.title}
                          width={640}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackingCardsSection;