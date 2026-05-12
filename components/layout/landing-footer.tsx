import { IconSwitch2 } from "@tabler/icons-react";
import Link from "next/link";

export default function FooterLanding() {
  return (
    <footer className="border-t border-secondary/15 border-dashed">
      <div className="flex justify-between items-center max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto w-full border-x border-secondary/15 border-dashed py-6 px-12">
        <div className="w-[200px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-linear-to-bl from-primary to-secondary shadow-[0_5px_0] shadow-secondary/30">
              <IconSwitch2 className="size-5 text-background" />
            </div>
            <p className="font-bold text-lg">Expense Splitter</p>
          </Link>
        </div>

        <p className="text-xs text-primary">
          © {new Date().getFullYear()} Expense Splitter. Clarity in motion for
          the modern traveler.
        </p>
      </div>
    </footer>
  );
}
