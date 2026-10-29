"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { apiClient } from "@/shared/api/apiClient";

export function useSignUpForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  const {
    mutate: registerUser,
    isPending,
    error: submitError,
  } = useMutation({
    mutationFn: async ({
      userData,
      captchaToken,
    }: {
      userData: typeof formData;
      captchaToken: string;
    }) => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await apiClient.post("/auth/register", {
        ...userData,
        timezone: userTimezone,
        captchaToken,
      });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      document.cookie = `is_logged_in=true; path=/; max-age=86400`;
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        setFieldErrors((prev) => ({ ...prev, ...err.response?.data?.errors }));
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = { nickname: "", email: "", password: "" };
    let isValid = true;

    if (!formData.nickname.trim()) {
      newErrors.nickname = "A nickname is required to fill in";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Incorrect email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "A password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "The password must be at least 6 characters long.";
      isValid = false;
    }

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>,
    captchaToken: string,
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    registerUser({ userData: formData, captchaToken });
  };

  let globalErrorMessage: string | null = null;

  if (submitError) {
    if (axios.isAxiosError(submitError)) {
      if (submitError.response?.data?.message) {
        globalErrorMessage = submitError.response.data.message;
      } else if (submitError.code === "ERR_NETWORK") {
        globalErrorMessage = "The server is unavailable";
      }
    } else {
      globalErrorMessage = submitError.message;
    }

    if (!globalErrorMessage) {
      globalErrorMessage = "Registration error";
    }
  }

  return {
    formData,
    fieldErrors,
    isPending,
    globalErrorMessage,
    handleChange,
    handleSubmit,
  };
}
