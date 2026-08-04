import { SplitIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { headers } from "next/headers";
import { ReactNode } from "react";

export default async function AuthLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  const header = await headers();

  console.log("ini client request header: ", header.get("x-pathname"));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,768px)_1fr]">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-30" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-x-2 border-dashed border-secondary/10 h-30" />
      <div className="hidden lg:block min-w-20 h-30" />

      <hr className="border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex flex-col h-[calc(100vh-244px)] p-20 gap-10">
        <div className="flex items-center justify-center gap-4 pb-1.25">
          <div className="relative top-0 p-1.5 rounded-lg bg-linear-to-bl from-primary to-secondary shadow-[0_5px_0] shadow-secondary/30 group-active:top-1.25 group-active:shadow-none duration-200">
            <HugeiconsIcon
              icon={SplitIcon}
              strokeWidth={2}
              className="size-4 md:size-5 text-background rotate-90"
            />
          </div>
          <p className="font-bold text-base md:text-lg">Expenses Splitter</p>
        </div>

        <div className="w-full flex items-center justify-center p-4">
          {children}
        </div>
      </div>
      <div className="hidden lg:block min-w-20" />

      <hr className="border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-30" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-x-2 border-dashed border-secondary/10 h-30" />
      <div className="hidden lg:block min-w-20 h-30" />
    </div>
  );
}
