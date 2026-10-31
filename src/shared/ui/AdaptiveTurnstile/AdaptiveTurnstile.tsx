"use client";

import { useEffect, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import styles from "./AdaptiveTurnstile.module.scss";

interface AdaptiveTurnstileProps {
  onSuccess: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
}

export function AdaptiveTurnstile({
  onSuccess,
  onExpire,
  onError,
}: AdaptiveTurnstileProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480.98px)");

    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className={styles.captchaWrapper}>
      <Turnstile
        key={isMobile ? "mobile-captcha" : "desktop-captcha"}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
        options={{
          size: isMobile ? "compact" : "normal",
          theme: "dark",
        }}
        onSuccess={onSuccess}
        onExpire={onExpire}
        onError={onError}
      />
    </div>
  );
}
