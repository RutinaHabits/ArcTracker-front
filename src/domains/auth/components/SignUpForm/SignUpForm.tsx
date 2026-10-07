"use client";

import { apiClient } from "@/shared/api/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { Input } from "@/shared/ui/Input/Input";
import styles from "./SignUpForm.module.scss";
import { useSignUpForm } from "./hooks/useSignUpForm";

export function SignUpForm() {
  const {
    formData,
    fieldErrors,
    isPending,
    globalErrorMessage,
    handleChange,
    handleSubmit,
  } = useSignUpForm();

  return (
    <div className={styles.formCard}>
      <h2 className={styles.title}>Create an account</h2>
      <p className={styles.subtitle}>Welcome to the habit tracker!</p>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
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

        <Button
          type="submit"
          isLoading={isPending}
          variant="primary"
          className={styles.signUpButton}
        >
          {isPending ? "Registration..." : "Sign Up"}
        </Button>
      </form>

      {globalErrorMessage && !fieldErrors.email && !fieldErrors.password && (
        <div className={styles.globalError}>{globalErrorMessage}</div>
      )}

      <p className={styles.redirectText}>
        Already have an account?{" "}
        <Link href="/sign-in" className={styles.link}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
