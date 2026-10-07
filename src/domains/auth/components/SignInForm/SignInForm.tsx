"use client";

import { Button } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { Input } from "@/shared/ui/Input/Input";
import styles from "./SignInForm.module.scss";
import { useSignInForm } from "./hooks/useSignInForm";

export function SignInForm() {
  const {
    formData,
    fieldErrors,
    isPending,
    globalErrorMessage,
    handleChange,
    handleSubmit,
  } = useSignInForm();

  return (
    <div className={styles.formCard}>
      <h2 className={styles.title}>Log in to your account</h2>
      <p className={styles.subtitle}>Welcome back!</p>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="example@mail.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isPending}
          error={fieldErrors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          disabled={isPending}
          error={fieldErrors.password}
        />

        <Button
          type="submit"
          isLoading={isPending}
          variant="primary"
          className={styles.signUpButton}
        >
          {isPending ? "Registration..." : "Sign In"}
        </Button>
      </form>

      {globalErrorMessage && !fieldErrors.email && !fieldErrors.password && (
        <div className={styles.globalError}>{globalErrorMessage}</div>
      )}

      <p className={styles.redirectText}>
        Don't have an account?{" "}
        <Link href="/sign-up" className={styles.link}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
