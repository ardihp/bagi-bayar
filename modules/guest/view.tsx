"use client";

import {
  ArrowLeft02Icon,
  ArrowTurnBackwardIcon,
  InputCursorTextIcon,
  PlusSignSquareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import CodeMode from "./mode/code";
import CreateMode from "./mode/create";
import { WebLogo } from "@/components/layout/landing-header";

const OptionWrapper = ({ children, ...rest }: React.ComponentProps<"div">) => {
  return (
    <div
      className="flex flex-col gap-1 p-5 sm:p-8 rounded-2xl border border-secondary/30 bg-secondary/5 w-full h-auto duration-300 hover:bg-secondary/10 hover:border-secondary/50 cursor-pointer relative overflow-hidden"
      {...rest}
    >
      {children}
    </div>
  );
};

export default function GuestModeView() {
  const [mode, setMode] = useState<"create" | "code" | "none">("none");

  const textContent = (() => {
    let content = { title: "", subtitle: "" };

    switch (mode) {
      case "code":
        content = {
          title: "Enter trip code",
          subtitle: "Type or paste your code to view trip details.",
        };
        break;
      case "create":
        content = {
          title: "Plan your new trip",
          subtitle:
            "Fill in your trip details to track expenses and share access with travel mates.",
        };
        break;
      case "none":
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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,768px)_1fr] duration-700 delay-200">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-16" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-0 lg:border-x-2 border-dashed border-secondary/10 h-16" />
      <div className="hidden lg:block min-w-20 h-16" />

      <hr className="border-0 lg:border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex flex-col min-h-[calc(100dvh-132px)] p-4 pt-6 sm:p-8 lg:p-12 lg:pt-10 md:justify-between gap-8 md:gap-4 border-0! lg:border-x-2!">
        <div className="flex flex-col justify-center gap-4 md:gap-6 px-2 pb-1.25">
          {mode === "none" ? (
            <WebLogo />
          ) : (
            <div
              className="flex items-center gap-4 group cursor-pointer w-fit"
              onClick={() => setMode("none")}
            >
              <button
                type="button"
                className="btn-primary flex items-center justify-center gap-2 p-1.5! group-active:top-1.25! group-active:shadow-none!"
              >
                <HugeiconsIcon
                  icon={ArrowTurnBackwardIcon}
                  className="text-background size-4 md:size-5"
                  strokeWidth={2}
                />
              </button>
              <p className="font-bold text-base md:text-lg mt-1.25 text-white group-hover:text-secondary duration-200">
                Back
              </p>
            </div>
          )}

          <div className="flex flex-col gap-1 md:gap-2">
            <p className="font-semibold text-xl md:text-3xl">
              {textContent.title}
            </p>

            <p className="text-sm md:text-base opacity-70 text-pretty">
              {textContent.subtitle}
            </p>
          </div>
        </div>

        {mode === "none" && (
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <OptionWrapper onClick={() => setMode("create")}>
              <HugeiconsIcon
                icon={PlusSignSquareIcon}
                className="absolute -top-3 -right-3 size-14 rotate-45 text-secondary/15"
                strokeWidth={2}
              />
              <p className="md:text-lg font-semibold">Create New</p>
              <p className="text-sm text-pretty opacity-70">
                Make a new tracker for your self or you can also add some
                friends
              </p>
            </OptionWrapper>
            <OptionWrapper onClick={() => setMode("code")}>
              <HugeiconsIcon
                icon={InputCursorTextIcon}
                className="absolute -top-3 -right-3 size-14 rotate-45 text-secondary/15"
                strokeWidth={2}
              />
              <p className="md:text-lg font-semibold">Enter Code</p>
              <p className="text-sm text-pretty opacity-70">
                View your detail expense trip by entering the code
              </p>
            </OptionWrapper>
          </div>
        )}

        {mode === "code" && <CodeMode />}
        {mode === "create" && <CreateMode />}
      </div>
      <div className="hidden lg:block min-w-20" />

      <hr className="border-0 lg:border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-16" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-0 lg:border-x-2 border-dashed border-secondary/10 h-16" />
      <div className="hidden lg:block min-w-20 h-16" />
    </div>
  );
}
