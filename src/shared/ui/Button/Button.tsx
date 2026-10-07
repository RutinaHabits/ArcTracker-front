import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export function Button({
  className,
  children,
  type = "button",
  variant = "primary",
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinnerWrapper}>
          <span className={styles.spinner} />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
