import Image from "next/image";

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

      <div className="grid grid-cols-3 gap-x-6 gap-y-8 group">
        <div className="feature-card justify-between col-span-2 gap-4">
          <div className="relative rounded-lg overflow-hidden px-6 pt-6">
            <div className="w-auto h-54 relative rounded-lg overflow-hidden">
              <Image
                src="/images/feature-1.png"
                alt="Smart Planning"
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="bg-linear-to-t from-card-secondary to-transparent w-full h-full absolute top-0 left-0" />
          </div>

          <div className="flex flex-col justify-end items-start gap-1 px-6 pb-6">
            <h3 className="text-xl font-semibold">Smart Planning</h3>
            <p className="text-sm font-thin opacity-60 max-w-xl">
              Easily organize your destinations and itineraries in one elegant,
              integrated view.
            </p>
          </div>
        </div>

        <div className="feature-card gap-4">
          <div className="flex flex-col justify-end items-start gap-1 px-6 pt-6">
            <h3 className="text-xl font-semibold">Automatic Cost Sharing</h3>
            <p className="text-sm font-thin opacity-60 max-w-xl">
              Seamlessly distribute expenses across departments or client codes.
              An intelligent system that precisely calculates and divides group
              expenses without disputes.
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden px-6 pb-6 h-full">
            <div className="w-auto h-full relative rounded-lg overflow-hidden">
              <Image
                src="/images/feature-2.png"
                alt="Automatic Cost Sharing"
                fill
                className="object-cover object-bottom"
              />
            </div>

            <div className="bg-linear-to-b from-card-secondary to-transparent w-full h-full absolute top-0 left-0" />
          </div>
        </div>

        <div className="feature-card gap-4 col-span-3">
          <div className="flex flex-col gap-1 px-6 pt-6">
            <h3 className="text-xl font-semibold">Real-time Report</h3>
            <p className="text-sm font-thin opacity-60 max-w-xl">
              Financial visibility elevated to an art form. Watch your global
              spend consolidate instantly in perfectly proportioned,
              asymmetrical dashboards devoid of unnecessary charts.
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden px-6 pb-6">
            <div className="w-auto h-70 relative rounded-lg overflow-hidden">
              <Image
                src="/images/feature-3.png"
                alt="Real-time Report"
                fill
                className="object-cover object-[0_-50px]"
              />
            </div>

            <div className="bg-linear-to-b from-card-secondary to-transparent w-full h-full absolute top-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
