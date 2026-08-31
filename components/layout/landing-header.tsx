"use client";

import { useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SplitIcon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

const navbarItems = [
  { name: "Features", link: "#features" },
  { name: "How it Works", link: "#how-it-works" },
];

export function WebLogo({
  onLogoClick = () => {},
  isLogoOnly = false,
}: {
  onLogoClick?: () => void;
  isLogoOnly?: boolean;
}) {
  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onLogoClick();
  };

  return (
    <div className="w-auto md:w-54 group">
      <Link
        href="/"
        className="flex items-center gap-2 md:gap-4 group"
        onClick={handleBackToTopClick}
      >
        <div className="relative top-0 p-1.5 border-2 border-background/40 rounded-lg bg-linear-to-bl from-primary to-secondary shadow-[0_5px_0] shadow-secondary/30 group-active:top-1.25 group-active:shadow-none duration-200">
          <HugeiconsIcon
            icon={SplitIcon}
            strokeWidth={2}
            className="size-4 md:size-5 text-background rotate-90"
          />
        </div>
        {!isLogoOnly && (
          <p className="font-bold text-base md:text-lg mt-1.25 text-white group group-hover:text-secondary duration-200">
            Expenses{" "}
            <span className="text-secondary group-hover:text-white duration-200">
              Splitter
            </span>
          </p>
        )}
      </Link>
    </div>
  );
}

export default function HeaderLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavbarItemClick = (link: string) => {
    const element = document.getElementById(link.replace("#", ""));
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/80 lg:bg-background lg:relative lg:z-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-b-2 border-dashed border-secondary/10">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex items-center border-x-2 border-secondary/10 backdrop-blur-md lg:backdrop-blur-none border-dashed mb-2 py-4 lg:py-6 px-4 lg:px-8 lg:px-12">
        <WebLogo onLogoClick={() => setMobileMenuOpen(false)} />

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-14 mx-auto mt-2">
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
        <div className="hidden lg:flex items-center justify-between w-54">
          <Link href="/auth/sign-in" passHref>
            <div className="py-2 px-4 rounded-lg bg-transparent hover:bg-card-secondary hover:cursor-pointer duration-200">
              <p className="opacity-70 text-sm font-semibold">Sign In</p>
            </div>
          </Link>

          <Link href="/guest" passHref>
            <div className="btn-primary">
              <p className="text-background text-sm font-bold">
                Start as Guest
              </p>
            </div>
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="lg:hidden ml-auto p-2 cursor-pointer"
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
        <div className="lg:hidden absolute top-full left-0 right-0 z-50 border-2 border-dashed border-secondary/10 bg-background/60 backdrop-blur-md lg:backdrop-blur-none shadow-lg">
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
            <div className="flex gap-4 mt-2">
              <Link
                href="/auth/sign-in"
                className="btn-primary from-transparent! to-transparent! bg-card-secondary shadow-secondary/3! w-full"
              >
                <p className="opacity-70 text-sm font-semibold text-center">
                  Sign In
                </p>
              </Link>
              <Link href="/guest" className="btn-primary w-full">
                <p className="text-sm text-background font-bold text-center">
                  Start as Guest
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
