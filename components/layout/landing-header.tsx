import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { SplitIcon } from "@hugeicons/core-free-icons";
import { SectionMark } from "@/modules/landing/view";

const navbarItems = [
  { name: "Features", link: "#features" },
  { name: "How it Works", link: "#how-it-works" },
  { name: "About", link: "#about" },
];

export default function HeaderLanding() {
  return (
    <nav className="grid grid-cols-[1fr_minmax(0,1536px)_1fr] border-b-2 border-dashed border-secondary/10">
      <SectionMark section="Header" />
      <div className="container flex items-center border-x-2 border-secondary/10 border-dashed py-6 px-12">
        <div className="w-50 pb-2">
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

        <div className="flex items-center gap-14 mx-auto">
          {navbarItems.map((item) => (
            <Link
              href={item.link}
              key={item.name}
              className="text-sm font-medium opacity-70 hover:opacity-90 duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex justify-end w-50 pb-2">
          <button className="btn-primary">
            <p className="text-background text-sm font-bold">Sign In</p>
          </button>
        </div>
      </div>
      <div className="min-w-20 w-full" />
    </nav>
  );
}
