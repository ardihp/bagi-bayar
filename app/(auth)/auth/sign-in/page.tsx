import SignInView from "@/modules/auth/sign-in/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Expenses Splitter",
  description: "",
};

export default function SignInPage() {
  return <SignInView />;
}
