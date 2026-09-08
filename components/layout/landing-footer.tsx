"use client";

import { WebLogo } from "./landing-header";

export default function FooterLanding() {
  return (
    <footer className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-t-2 border-secondary/10 border-dashed">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex flex-row justify-between items-center gap-4 border-x-0 lg:border-x-2 border-secondary/10 border-dashed pt-6 md:pt-8 pb-8 md:pb-10 px-4 md:px-8 lg:px-12">
        <WebLogo />

        <p className="text-xs text-primary text-center md:text-right">
          © {new Date().getFullYear()} Expenses Splitter.
        </p>
      </div>
      <div className="hidden lg:block min-w-20" />
    </footer>
  );
}
