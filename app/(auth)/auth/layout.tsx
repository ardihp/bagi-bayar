import { headers } from "next/headers";
import { ReactNode } from "react";

export default async function AuthLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  const header = await headers();

  console.log("ini client request header: ", header.get("x-pathname"));

  return <div className="flex">{children}</div>;
}
