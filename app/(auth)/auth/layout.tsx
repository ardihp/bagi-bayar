import HeaderAuth from "@/components/layout/auth-header";
import { ReactNode } from "react";

export default async function AuthLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,768px)_1fr] first:grid-cols-[1fr_minmax(0,1526px)_1fr] duration-700 delay-200">
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full h-24.25" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1536px)_1fr] border-x-2 border-dashed border-secondary/10 h-24.25" />
      <div className="hidden lg:block min-w-20 h-24.25" />

      <hr className="border-t-2 border-dashed border-secondary/10 col-span-1 lg:col-span-3" />
      <div className="hidden lg:flex items-end justify-end p-3 min-w-20 w-full" />
      <div className="container flex flex-col h-[calc(100vh-244px)] p-14 justify-between">
        <HeaderAuth />

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
