import FeaturesSection from "./components/features";
import HeroSection from "./components/hero";

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
      <hr className="border-t-2 border-dashed border-secondary/10 col-span-3" />
      <SectionMark section="Feature" />
      <FeaturesSection />
      <div />
    </div>
  );
}
