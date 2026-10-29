"use client";

import { apiClient } from "@/shared/api/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { Input } from "@/shared/ui/Input/Input";
import styles from "./SignUpForm.module.scss";
import { useSignUpForm } from "../../hooks/useSignUpForm";
import { Turnstile } from "@marsidev/react-turnstile";

export function SignUpForm() {
  const {
    formData,
    fieldErrors,
    isPending,
    globalErrorMessage,
    handleChange,
    handleSubmit,
  } = useSignUpForm();

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
      <h2 className={styles.title}>Create an account</h2>
      <p className={styles.subtitle}>Welcome to the Arc Tracker!</p>

      <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
        <Input
          label="Nickname"
          name="nickname"
          placeholder="John"
          value={formData.nickname}
          onChange={handleChange}
          disabled={isPending}
          error={fieldErrors.nickname}
        />

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

        <div className={styles.captchaWrapper}>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
            onSuccess={(token) => {
              setCaptchaToken(token);
              setCaptchaError("");
            }}
            onExpire={() => setCaptchaToken("")}
            onError={() => setCaptchaError("Captcha error. Please try again.")}
          />
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          variant="primary"
          className={styles.signUpButton}
        >
          {isPending ? "Logging in..." : "Sign In"}
        </Button>
      </form>

      {(captchaError ||
        (globalErrorMessage &&
          !fieldErrors.email &&
          !fieldErrors.password &&
          !fieldErrors.nickname)) && (
        <div className={styles.globalError}>
          {captchaError || globalErrorMessage}
        </div>
      )}

      <p className={styles.redirectText}>
        Already have an account?{" "}
        <Link href="/sign-in" className={styles.link}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
