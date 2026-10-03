"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Input.module.scss";

import eyeIcon from "@/../public/icons/eye-open.png";
import eyeOffIcon from "@/../public/icons/eye-close.png";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, type, ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordType = type === "password";

  const currentType = isPasswordType && isPasswordVisible ? "text" : type;

  const togglePasswordVisibility = () => {
    return setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type={currentType} {...props} />
        {isPasswordType && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            <Image
              src={isPasswordVisible ? eyeOffIcon : eyeIcon}
              alt=""
              className={styles.eyeIcon}
              width={25}
              height={25}
            />
          </button>
        )}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
