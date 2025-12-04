import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SensorCatalog } from "@/components/SensorCatalog";
import { SimulationDemo } from "@/components/SimulationDemo";
import { LearningHub } from "@/components/LearningHub";
import { MarketplacePreview } from "@/components/MarketplacePreview";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sensor & IoT Explorer - Discover, Simulate, Innovate</title>
        <meta name="description" content="Your gateway to understanding sensors and IoT technology. Explore interactive simulations, learn with hands-on tutorials, and build connected devices." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <SensorCatalog />
          <SimulationDemo />
          <LearningHub />
          <MarketplacePreview />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
