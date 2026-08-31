import HeaderAuth from "@/components/layout/auth-header";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/app/dashboard");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,768px)_1fr] duration-700 delay-200">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-16" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-0 lg:border-x-2 border-dashed border-secondary/10 h-16" />
      <div className="hidden lg:block min-w-20 h-16" />

      <hr className="border-0 lg:border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex flex-col min-h-[calc(100dvh-132px)] p-4 pt-6 sm:p-8 lg:p-12 lg:pt-10 md:justify-between gap-6 md:gap-4 border-0! lg:border-x-2!">
        <HeaderAuth />

        <div className="md:p-8 rounded-2xl md:border md:border-secondary/30 md:bg-secondary/5 w-full">
          {children}
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
