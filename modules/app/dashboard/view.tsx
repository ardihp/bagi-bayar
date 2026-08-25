"use client";

import { signOutUser } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function DashboardAppView() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOutUser();
    router.refresh();
  };

  return (
    <div className="flex flex-col">
      <p>Dashboard app view</p>

      <div className="btn-primary" onClick={handleLogout}>
        <p>Logout</p>
      </div>
    </div>
  );
}
