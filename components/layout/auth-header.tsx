"use client";

import { SplitIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WebLogo } from "./landing-header";

export default function HeaderAuth() {
  const pathname = usePathname();

  const textContent = (() => {
    let content = { title: "", subtitle: "" };

    switch (pathname) {
      case "/auth/sign-in":
        content = {
          title: "Welcome back, explorer!",
          subtitle: "Log in to track your trips and stay on budget.",
        };
        break;
      case "/auth/sign-up":
        content = {
          title: "Ready for your next adventure?",
          subtitle:
            "Create an account and effortlessly track your travel expenses.",
        };
        break;
      case "/guest":
        content = {
          title: "Ready to explore?",
          subtitle: "Start a new trip or access an existing one with a code.",
        };
        break;
      default:
        content = { title: "", subtitle: "" };
        break;
    }

    return content;
  })();

  return (
    <div className="flex flex-col justify-center gap-4 md:gap-6 px-2 pb-1.25">
      <WebLogo />

      <div className="flex flex-col md:gap-2">
        <p className="font-semibold text-xl md:text-3xl">{textContent.title}</p>

        <p className="text-sm md:text-base opacity-70 text-pretty">
          {textContent.subtitle}
        </p>
      </div>
    </div>
  );
}
