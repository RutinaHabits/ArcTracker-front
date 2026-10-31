import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "connect-src 'self' data: https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://*.dnstest.dev https://*.onrender.com https://bauval.org https://*.bauval.org;",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://bauval.org https://*.bauval.org https://*.highperformanceformat.com https://*.adsttc.com;",
              "frame-src 'self' https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://bauval.org https://*.bauval.org https://*.highperformanceformat.com https://*.displayvertising.com;",
              "style-src 'self' 'unsafe-inline';",
              "media-src 'self' https://*.blob.vercel-storage.com;",
              "img-src 'self' data: blob: https://*.blob.vercel-storage.com https://*.onrender.com https://bauval.org https://*.bauval.org https://*.highperformanceformat.com https://*.displayvertising.com https://*.nresystems.com https://*.storageimagedisplay.com;",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
