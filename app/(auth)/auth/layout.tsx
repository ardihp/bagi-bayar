import { SplitIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { headers } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";

export default async function AuthLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  const header = await headers();
  const pathname = header.get("x-pathname");

  console.log(pathname)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,768px)_1fr] first:grid-cols-[1fr_minmax(0,1526px)_1fr] duration-700 delay-200">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-24.25" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-x-2 border-dashed border-secondary/10 h-24.25" />
      <div className="hidden lg:block min-w-20 h-24.25" />

      <hr className="border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex flex-col h-[calc(100vh-244px)] p-14 justify-between">
        <div className="flex flex-col items-center justify-center gap-8 pb-1.25">
          <Link href="/" title="Back to home" passHref>
            <div className="relative top-0 p-1.5 rounded-xl bg-linear-to-bl from-primary to-secondary shadow-[0_5px_0] shadow-secondary/30 active:top-1.25 active:shadow-none duration-200">
              <HugeiconsIcon
                icon={SplitIcon}
                strokeWidth={2}
                className="size-8 md:size-10 text-background rotate-90"
              />
            </div>
          </Link>
          <div className="flex flex-col items-center gap-2">
            <p className="font-semibold text-4xl text-center">
              {pathname?.includes("sign-in")
                ? "Welcome back, explorer!"
                : "Ready for your next adventure?"}
            </p>

            <p className="text-md opacity-70 text-center">
              {pathname?.includes("sign-in")
                ? "Log in to track your trips and stay on budget."
                : "Create an account and effortlessly track your travel expenses."}
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-secondary/30 bg-secondary/5 w-full">
          {children}
        </div>
      </div>
      <div className="hidden lg:block min-w-20" />

      <hr className="border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-24.25" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-x-2 border-dashed border-secondary/10 h-24.25" />
      <div className="hidden lg:block min-w-20 h-24.25" />
    </div>
  );
}
