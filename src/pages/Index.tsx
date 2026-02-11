import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ValueSection from "@/components/ValueSection";
import VisionSection from "@/components/VisionSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <CapabilitiesSection />
      <ValueSection />
      <VisionSection />
      <Footer />
    </div>
  );
};

export default Index;
