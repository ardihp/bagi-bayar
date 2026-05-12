import { SplitIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function FooterLanding() {
  return (
    <footer className="border-t border-secondary/15 border-dashed">
      <div className="flex justify-between items-center max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto w-full border-x border-secondary/15 border-dashed py-6 px-12">
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
    </footer>
  );
}
