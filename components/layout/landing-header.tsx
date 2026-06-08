"use client";

import { useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { SplitIcon, Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { SectionMark } from "@/modules/landing/view";

const navbarItems = [
  { name: "Features", link: "#features" },
  { name: "How it Works", link: "#how-it-works" },
];

export default function HeaderLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavbarItemClick = (link: string) => {
    const element = document.getElementById(link.replace("#", ""));
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md md:bg-background md:backdrop-blur-none md:relative md:z-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-b-2 border-dashed border-secondary/10">
      <SectionMark section="Header" />
      <div className="container flex items-center border-x-2 border-secondary/10 border-dashed py-4 md:py-6 px-4 md:px-8 lg:px-12">
        <div className="w-auto md:w-50 pb-2">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative top-0 p-1.5 rounded-lg bg-linear-to-bl from-primary to-secondary shadow-[0_5px_0] shadow-secondary/30 group-active:top-1.25 group-active:shadow-none duration-200">
              <HugeiconsIcon
                icon={SplitIcon}
                strokeWidth={2}
                className="size-4 md:size-5 text-background rotate-90"
              />
            </div>
            <p className="font-bold text-base md:text-lg">Expenses Splitter</p>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-14 mx-auto">
          {navbarItems.map((item) => (
            <div
              key={item.name}
              className="text-sm font-medium opacity-70 hover:opacity-90 duration-200 cursor-pointer"
              onClick={() => handleNavbarItemClick(item.link)}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Desktop sign in */}
        <div className="hidden md:flex justify-end w-50 pb-2">
          <button className="btn-primary">
            <p className="text-background text-sm font-bold">Sign In</p>
          </button>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden ml-auto p-2 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <HugeiconsIcon
            icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
            className="size-6 opacity-80"
            strokeWidth={2}
          />
        </button>
      </div>
      <div className="hidden lg:block min-w-20 w-full" />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 border-2 border-dashed border-secondary/10 bg-background/60 backdrop-blur-lg shadow-lg">
          <div className="flex flex-col px-4 py-4 gap-4">
            {navbarItems.map((item) => (
              <div
                key={item.name}
                className="text-sm font-medium opacity-70 hover:opacity-90 duration-200 cursor-pointer py-2"
                onClick={() => handleNavbarItemClick(item.link)}
              >
                {item.name}
              </div>
            ))}
            <button className="btn-primary w-full mt-2">
              <p className="text-background text-sm font-bold">Sign In</p>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
