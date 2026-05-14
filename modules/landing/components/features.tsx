export default function FeaturesSection() {
  return (
    <div id="features" className="container flex flex-col px-12 py-8 gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">Features</h2>
        <p className="text-sm font-thin opacity-60 max-w-md">
          Designed for discerning finance teams who demand both elegance and
          absolute precision.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5 group">
        <div className="feature-card col-span-2">
          <div className="flex flex-col justify-end items-start gap-1">
            <h3 className="text-xl font-semibold">Smart Planning</h3>
            <p className="text-sm font-thin opacity-60 max-w-xl">
              Easily organize your destinations and itineraries in one elegant,
              integrated view.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="flex flex-col justify-end items-start gap-1">
            <h3 className="text-xl font-semibold">Automatic Cost Sharing</h3>
            <p className="text-sm font-thin opacity-60 max-w-xl">
              An intelligent system that precisely calculates and divides group
              expenses without disputes.
            </p>
          </div>
        </div>

        <div className="feature-card col-span-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">Real-time Report</h3>
            <p className="text-sm font-thin opacity-60 max-w-xl">
              Financial visibility elevated to an art form. Watch your global
              spend consolidate instantly in perfectly proportioned,
              asymmetrical dashboards devoid of unnecessary charts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
