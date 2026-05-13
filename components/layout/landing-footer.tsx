import { SectionMark } from "@/modules/landing/view";
import { SplitIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function FooterLanding() {
  return (
    <footer className="grid grid-cols-[1fr_minmax(0,1536px)_1fr] border-t-2 border-secondary/10 border-dashed">
      <SectionMark section="Footer" />
      <div className="container flex justify-between items-center border-x-2 border-secondary/10 border-dashed pt-8 pb-10 px-12">
        <div className="w-50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative top-0 p-1.5 rounded-lg bg-linear-to-bl from-primary to-secondary shadow-[0_5px_0] shadow-secondary/30 group-active:top-1.25 group-active:shadow-none duration-200">
              <HugeiconsIcon
                icon={SplitIcon}
                strokeWidth={2}
                className="size-5 text-background rotate-90"
              />
            </div>
            <p className="font-bold text-lg">Expenses Splitter</p>
          </Link>
        </div>

        <p className="text-xs text-primary">
          © {new Date().getFullYear()} Expenses Splitter. Clarity in motion for
          the modern traveler.
        </p>
      </div>
      <div className="min-w-20" />
    </footer>
  );
}
