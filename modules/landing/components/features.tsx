import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const costSharing: { user: string; spend: number }[] = [
  { user: "You", spend: 120000 },
  { user: "Patrick", spend: 300000 },
  { user: "William", spend: 25000 },
];

export default function FeaturesSection() {
  return (
    <div id="features" className="container flex flex-col px-12 py-12 gap-16">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold">Features</h2>
        <p className="font-thin opacity-60 text-center">
          Specially designed for your travel efficiency.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-8 group">
        <div className="feature-card justify-between col-span-2 gap-4">
          <div className="relative rounded-lg overflow-hidden px-6 pt-6">
            <div className="w-auto h-64 relative rounded-lg overflow-hidden">
              <Image
                src="/images/feature-1.png"
                alt="Smart Planning"
                fill
                sizes="1024px"
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
            <h3 className="text-xl font-semibold">Cost Sharing</h3>
            <p className="text-sm font-thin opacity-60 max-w-xl">
              Seamlessly distribute expenses across departments or client codes.
              An intelligent system that precisely calculates and divides group
              expenses without disputes.
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden px-6 pb-6 h-full">
            <div className="relative flex flex-col gap-5">
              <div className="h-full border-l-2 border-dashed border-secondary/10 absolute -top-2 left-6" />
              <div className="h-full border-l-2 border-dashed border-secondary/10 absolute -top-2 right-6" />

              {costSharing.map((item, index) => (
                <div
                  key={item.user}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-xl border border-secondary/10 bg-secondary/5 backdrop-blur-2xl",
                    index % 2 === 0 ? "-rotate-1" : "rotate-1",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="uppercase font-bold bg-secondary/20">
                        {item.user.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="leading-none text-sm">{item.user}</p>
                  </div>
                  <p className="leading-none text-sm">
                    Rp {Number(item.spend).toLocaleString("ID-id")}
                  </p>
                </div>
              ))}
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
            <div className="grid grid-cols-3 border-2 border-secondary/10 bg-secondary/5 p-8 rounded-xl">
              <div className="flex flex-col gap-1">
                <p>Total Expenses</p>
                <p className="text-3xl font-semibold">
                  Rp {Number(4500000).toLocaleString("ID-id")}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-x-2 border-secondary/10 px-4 mx-4">
                <p>My Expenses</p>
                <p className="text-3xl font-semibold">
                  Rp {Number(1200000).toLocaleString("ID-id")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p>My Debt</p>
                <p className="text-3xl font-semibold">
                  Rp {Number(120000).toLocaleString("ID-id")}
                </p>
              </div>
            </div>

            <div className="bg-linear-to-b from-card-secondary to-transparent w-full h-full absolute top-0 left-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
