import LandingView from "@/modules/landing/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expenses Splitter | Waktunya bagi-bagi pengeluaran bareng temen kamu",
  description: "",
};

export default function LandingPage() {
  return <LandingView />;
}
