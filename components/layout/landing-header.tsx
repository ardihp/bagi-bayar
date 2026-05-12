import { IconSwitch2 } from "@tabler/icons-react";
import Link from "next/link";

const navbarItems = [
  { name: "Features", link: "#features" },
  { name: "How it Works", link: "#how-it-works" },
  { name: "About", link: "#about" },
];

export default function HeaderLanding() {
  return (
    <nav className="border-b border-secondary/15 border-dashed">
      <div className="flex items-center max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto w-full border-x border-secondary/15 border-dashed py-6 px-12">
        <div className="w-[200px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-linear-to-bl from-primary to-secondary shadow-[0_5px_0] shadow-secondary/30">
              <IconSwitch2 className="size-5 text-background" />
            </div>
            <p className="font-bold text-lg">Expense Splitter</p>
          </Link>
        </div>

        <div className="flex items-center gap-14 mx-auto">
          {navbarItems.map((item) => (
            <Link
              href={item.link}
              key={item.name}
              className="text-sm font-medium opacity-80"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex justify-end w-[200px]">
          <button className="btn-primary">
            <p className="text-background text-sm font-bold">Sign In</p>
          </button>
        </div>
      </div>
    </nav>
  );
}
