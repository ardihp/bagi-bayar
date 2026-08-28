"use client";

import HeaderAuth from "@/components/layout/auth-header";
import {
  InputCursorTextIcon,
  PlusSignSquareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ReactNode, useState } from "react";

const OptionWrapper = ({ children, ...rest }: React.ComponentProps<"div">) => {
  return (
    <div
      className="flex flex-col gap-1 p-5 sm:p-8 rounded-2xl border border-secondary/30 bg-secondary/5 w-full duration-300 hover:bg-secondary/10 hover:border-secondary/50 cursor-pointer relative overflow-hidden"
      {...rest}
    >
      {children}
    </div>
  );
};

export default function GuestModeView() {
  const [mode, setMode] = useState<"create" | "code" | "">("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,768px)_1fr] duration-700 delay-200">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-16" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-0 lg:border-x-2 border-dashed border-secondary/10 h-16" />
      <div className="hidden lg:block min-w-20 h-16" />

      <hr className="border-0 lg:border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex flex-col min-h-[calc(100dvh-132px)] p-4 pt-6 sm:p-8 lg:p-12 lg:pt-10 justify-center md:justify-between gap-4 border-0! lg:border-x-2!">
        <HeaderAuth />

        <div className="flex items-center gap-6">
          <OptionWrapper onClick={() => setMode("create")}>
            <HugeiconsIcon
              icon={PlusSignSquareIcon}
              className="absolute -top-3 -right-3 size-14 rotate-45 text-secondary/15"
              strokeWidth={2}
            />
            <p className="text-lg font-semibold">Create New</p>
            <p className="text-sm text-pretty opacity-70">
              Make a new tracker for your self or you can also add some friends
            </p>
          </OptionWrapper>
          <OptionWrapper onClick={() => setMode("code")}>
            <HugeiconsIcon
              icon={InputCursorTextIcon}
              className="absolute -top-3 -right-3 size-14 rotate-45 text-secondary/15"
              strokeWidth={2}
            />
            <p className="text-lg font-semibold">Enter Code</p>
            <p className="text-sm text-pretty opacity-70">
              View your detail journey by entering the code
            </p>
          </OptionWrapper>
        </div>
      </div>
      <div className="hidden lg:block min-w-20" />

      <hr className="border-0 lg:border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-16" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-0 lg:border-x-2 border-dashed border-secondary/10 h-16" />
      <div className="hidden lg:block min-w-20 h-16" />
    </div>
  );
}
