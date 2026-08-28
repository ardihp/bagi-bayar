import GuestModeView from "@/modules/guest/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Mode | Expenses Splitter",
  description: "",
};

export default function GuestModePage() {
  return <GuestModeView />;
}
