import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./page.module.scss";
import { SignUpForm } from "@/domains/auth/ui/SignUpForm/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Join Arc Tracker today. Start your invisible work, build discipline, and lock in your global goals.",
};

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignUpForm></SignUpForm>
    </div>
  );
}
