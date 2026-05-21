import AboutSection from "./components/about";
import FeaturesSection from "./components/features";
import HeroSection from "./components/hero";
import WorksSection from "./components/works";

export function SectionMark({ section }: { section: string }) {
  return (
    <div className="flex items-end justify-end p-3 min-w-20 w-full">
      <p className="font-pixel text-sm font-semibold text-secondary/20">{`# ${section}`}</p>
    </div>
  );
}

export default function LandingView() {
  return (
    <div className="grid grid-cols-[1fr_minmax(0,1536px)_1fr]">
      <SectionMark section="Hero" />
      <HeroSection />
      <div className="min-w-20" />

      {/* Features */}
      <hr className="border-t-2 border-dashed border-secondary/10 col-span-3" />
      <SectionMark section="Section.1" />
      <FeaturesSection />
      <div className="min-w-20" />

      {/* How It Works */}
      <hr className="border-t-2 border-dashed border-secondary/10 col-span-3" />
      <SectionMark section="Section.2" />
      <WorksSection />
      <div className="min-w-20" />

      {/* About */}
      <hr className="border-t-2 border-dashed border-secondary/10 col-span-3" />
      <SectionMark section="Section.3" />
      <AboutSection />
      <div className="min-w-20" />
      <div />
    </div>
  );
}
