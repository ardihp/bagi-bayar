import SignUpView from "@/modules/auth/sign-up/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Expenses Splitter",
  description: "",
};

export default function SignUpPage() {
  return <SignUpView />;
}
