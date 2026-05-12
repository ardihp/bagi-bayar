import FooterLanding from "@/components/layout/landing-footer";
import HeaderLanding from "@/components/layout/landing-header";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <HeaderLanding />
      <div className="max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl w-full mx-auto border-x border-dashed border-secondary/15">
        {children}
      </div>
      <FooterLanding />
    </div>
  );
}
