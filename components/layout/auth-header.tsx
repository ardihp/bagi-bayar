"use client";

import { SplitIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <div className="flex flex-col items-center justify-center gap-4 md:gap-6 px-2 pb-1.25">
      <Link href="/" title="Back to home" passHref>
        <div className="relative top-0 p-1.5 rounded-xl bg-linear-to-bl from-primary to-secondary shadow-[0_5px_0] shadow-secondary/30 active:top-1.25 active:shadow-none duration-200">
          <HugeiconsIcon
            icon={SplitIcon}
            strokeWidth={2}
            className="size-8 md:size-9 text-background rotate-90"
          />
        </div>
      </Link>
      <div className="flex flex-col items-center md:gap-2">
        <p className="font-semibold text-xl md:text-3xl text-center">
          {textContent.title}
        </p>

        <p className="text-sm md:text-base opacity-70 text-center text-pretty">
          {textContent.subtitle}
        </p>
      </div>
    </div>
  );
}
