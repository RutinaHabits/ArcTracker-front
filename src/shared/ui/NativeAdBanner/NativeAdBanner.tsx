"use client";

import { useEffect } from "react";

export default function NativeAdBanner() {
  const adKey = "1d1346284124991aa12160e30f530c3f";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const containerId = `container-${adKey}`;
    const container = document.getElementById(containerId);

    if (!container) return;

    const existingScript = document.querySelector(`script[src*="${adKey}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = `https://bauval.org/21/${adKey}`;

      document.head.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1.5rem 0",
        minHeight: "90px",
        width: "100%",
      }}
    >
      <div
        id={`container-${adKey}`}
        style={{ width: "100%", maxWidth: "728px" }}
      />
    </div>
  );
}
