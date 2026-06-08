import { cn } from "@/lib/utils";
import { ChevronRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const workItems = [
  {
    name: "Create trip",
    description: "Plan your journey with your travel partners",
  },
  {
    name: "Invite friends",
    description: "Invite your travel partners to join this trip",
  },
  {
    name: "Add expense",
    description: "Record every activity and expense incurred",
  },
  {
    name: "Select participants",
    description: "Determine who is involved in each expense item",
  },
  {
    name: "Split automatically",
    description:
      "Costs will be instantly calculated and split fairly according to the recorded expenses",
  },
];

export default function WorksSection() {
  return (
    <div
      id="how-it-works"
      className="scroll-mt-[72px] container flex flex-col px-4 md:px-8 lg:px-12 py-8 md:py-12 gap-8 md:gap-16"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl md:text-2xl font-bold">How It Works</h2>
        <p className="font-thin opacity-60 text-center text-sm md:text-base">
          How we organize the division of recording of money expenses from each
          of your trips
        </p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row items-stretch lg:items-center gap-4 lg:gap-2 group">
        {workItems.map((item, key) => (
          <div key={key} className="flex flex-col lg:flex-row items-center relative group/card">
            <div
              className={cn(
                "feature-card p-4 md:p-6 gap-1 h-fit rounded-xl overflow-hidden w-full",
                key >= 1 && "lg:pl-8",
              )}
            >
              <p className="text-lg md:text-xl font-semibold text-secondary opacity-20 group-hover/card:opacity-40 italic mb-2 md:mb-3 duration-200">
                0{key + 1}
              </p>
              <p className="text-lg md:text-xl font-semibold">{item.name}</p>
              <p className="text-xs md:text-sm font-thin opacity-60">{item.description}</p>

              <div className="bg-linear-to-r from-secondary to-transparent to-30% group-hover/card:hover:to-100% w-full h-full absolute opacity-5 group-hover/card:opacity-10 top-0 left-0 duration-500" />
            </div>
            {key !== workItems.length - 1 && (
              <div className="hidden lg:block rounded-full p-2 absolute -right-6 bg-card-secondary border border-secondary/10 opacity-100 group-hover:opacity-10 group-hover/card:opacity-100 z-10">
                <HugeiconsIcon
                  icon={ChevronRight}
                  className="size-5 opacity-80"
                  strokeWidth={3}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
