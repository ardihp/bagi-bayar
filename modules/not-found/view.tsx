import { WebLogo } from "@/components/layout/landing-header";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function NotFoundView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,768px)_1fr] duration-700 delay-200">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-16" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-0 lg:border-x-2 border-dashed border-secondary/10 h-16" />
      <div className="hidden lg:block min-w-20 h-16" />

      <hr className="border-0 lg:border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex flex-col min-h-[calc(100dvh-132px)] p-5 sm:p-8 lg:p-12 lg:pt-10 justify-center items-center gap-8 border-0! lg:border-x-2!">
        <WebLogo isLogoOnly />

        <div className="flex flex-col items-center gap-4">
          <p className="text-3xl leading-none font-bold text-secondary">
            Page Not Found
          </p>
          <p className="opacity-70 text-balance text-center w-80">
            The page you are looking for does not exist. Sign up to make your
            own travel journey.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/" passHref>
            <button className="btn-primary flex items-center gap-2 border-secondary/5! from-transparent! to-transparent! bg-card-secondary shadow-secondary/3! w-full">
              <HugeiconsIcon
                icon={ArrowLeft02Icon}
                className="size-4 md:size-5 opacity-70"
                strokeWidth={3}
              />
              <p className="opacity-70 text-sm font-semibold">Back Home</p>
            </button>
          </Link>
          <Link href="/auth/sign-up" passHref>
            <button className="btn-primary flex items-center gap-2">
              <p className="text-background font-bold text-sm">Sign Up</p>
               <HugeiconsIcon
                icon={ArrowRight02Icon}
                className="size-4 md:size-5 text-background"
                strokeWidth={3}
              />
            </button>
          </Link>
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
