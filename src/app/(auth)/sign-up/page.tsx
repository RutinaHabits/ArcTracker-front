import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./page.module.scss";
import { SignUpForm } from "@/domains/auth/components/SignUpForm/SignUpForm";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignUpForm></SignUpForm>
    </div>
  );
}
