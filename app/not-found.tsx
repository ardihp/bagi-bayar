import NotFoundView from "@/modules/not-found/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Woooops.. You're lost | Expenses Splitter",
};

export default function NotfoundPage() {
  return <NotFoundView />;
}
