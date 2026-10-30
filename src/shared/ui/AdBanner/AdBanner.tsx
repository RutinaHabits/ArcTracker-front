"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  atOptions: {
    key: string;
    format: string;
    height: number;
    width: number;
    params: Record<string, any>;
  };
}

export default function AdBanner({ atOptions }: AdBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !bannerRef.current) return;

    const container = bannerRef.current;

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.innerHTML = `atOptions = ${JSON.stringify(atOptions)};`;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `//bauval.org/22/${atOptions.key}`;

    container.appendChild(configScript);
    container.appendChild(invokeScript);

    return () => {
      container.innerHTML = "";
    };
  }, [atOptions]);

  return (
    <div
      ref={bannerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1.5rem 0",
        minHeight: `${atOptions.height}px`,
      }}
    />
  );
}
