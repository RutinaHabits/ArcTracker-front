import styles from "./page.module.scss";
import { SignInForm } from "@/domains/auth/components/SignInForm/SignInForm";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignInForm></SignInForm>
    </div>
  );
}
