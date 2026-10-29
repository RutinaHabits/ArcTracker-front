import { Metadata } from "next";
import styles from "./page.module.scss";
import { SignInForm } from "@/domains/auth/ui/SignInForm/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Log in to your Arc Tracker account to continue your winter arc journey and execute your daily habits.",
};

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignInForm></SignInForm>
    </div>
  );
}
