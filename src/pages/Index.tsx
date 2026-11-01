import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServiceOverview from "@/components/ServiceOverview";
import StackingCardsSection from "@/components/sections/StackingCardsSection";
import NutzenFokus from "@/components/NutzenFokus";
import BentoGrid from "@/components/BentoGrid";
import StatsSection from "@/components/StatsSection";
import GoogleReviews from "@/components/GoogleReviews";
import DualCTA from "@/components/DualCTA";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getHomeJsonLd } from "@/data/structuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Elektriker in Peine – Elektrik, Energie & Smart Home"
        description="Ihr Elektriker in Peine für Elektrik, Energie und Smart Home: Installation, Sanierung, Photovoltaik, Wallbox und E-Check – persönlich, zuverlässig und aus einer Hand."
        path="/"
        keywords="Elektriker Peine, Elektrik Peine, Elektrofachbetrieb Peine, Photovoltaik Peine, Wallbox Peine, E-Check Peine, Smart Home Peine, Elektrotechnik Peine, Elektiger, E-Tech Engineering Alici"
        jsonLd={getHomeJsonLd()}
      />
      <Navigation />
      <HeroSection />
      <ServiceOverview />
      <StackingCardsSection />
      <NutzenFokus />
      <BentoGrid />
      <StatsSection />
      <GoogleReviews />
      <DualCTA />
      <Footer />
    </div>
  );
};

export default Index;
