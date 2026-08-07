import DashboardAppView from "@/modules/app/dashboard/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview | Expenses Splitter",
  description: "",
};

export default async function DashboardAppPage() {
  return <DashboardAppView />;
}
