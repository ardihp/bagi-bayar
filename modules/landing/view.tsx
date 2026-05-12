import FeaturesSection from "./components/features";
import HeroSection from "./components/hero";

export default function LandingView() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
