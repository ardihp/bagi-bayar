import PromoSection from "./components/promo";
import FeaturesSection from "./components/features";
import HeroSection from "./components/hero";
import WorksSection from "./components/works";

export default function LandingView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr]">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <HeroSection />
      <div className="hidden lg:block min-w-20" />

      {/* Features */}
      <hr className="border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <FeaturesSection />
      <div className="hidden lg:block min-w-20" />

      {/* How It Works */}
      <hr className="border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <WorksSection />
      <div className="hidden lg:block min-w-20" />

      {/* About */}
      <hr className="border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <PromoSection />
      <div className="hidden lg:block min-w-20" />
      <div />
    </div>
  );
}
