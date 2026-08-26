import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Redirecting Sign In Page...",
};

export default function page() {
  return redirect("/auth/sign-in");
}
