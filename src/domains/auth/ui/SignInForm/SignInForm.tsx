"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import styles from "./SignInForm.module.scss";
import { useSignInForm } from "../../hooks/useSignInForm";
import { AdaptiveTurnstile } from "@/shared/ui/AdaptiveTurnstile/AdaptiveTurnstile";

export function SignInForm() {
  const {
    formData,
    fieldErrors,
    isPending,
    globalErrorMessage,
    handleChange,
    handleSubmit,
  } = useSignInForm();

  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [captchaError, setCaptchaError] = useState<string>("");

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      setCaptchaError("Please confirm you are not a robot.");
      return;
    }

    handleSubmit(e, captchaToken);
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.title}>Log in to your account</h2>
      <p className={styles.subtitle}>Welcome back!</p>

      <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
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

        <AdaptiveTurnstile
          onSuccess={(token) => {
            setCaptchaToken(token);
            setCaptchaError("");
          }}
          onExpire={() => setCaptchaToken("")}
          onError={() => setCaptchaError("Captcha error. Please try again.")}
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

      {(captchaError ||
        (globalErrorMessage &&
          !fieldErrors.email &&
          !fieldErrors.password)) && (
        <div className={styles.globalError}>
          {captchaError || globalErrorMessage}
        </div>
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
