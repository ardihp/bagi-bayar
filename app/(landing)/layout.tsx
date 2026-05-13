import FooterLanding from "@/components/layout/landing-footer";
import HeaderLanding from "@/components/layout/landing-header";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <HeaderLanding />
      {children}
      <FooterLanding />
    </div>
  );
}
