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
              "connect-src 'self' data: https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://*.dnstest.dev https://*.onrender.com;",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://*.challenges.cloudflare.com;",
              "frame-src 'self' https://challenges.cloudflare.com https://*.challenges.cloudflare.com;",
              "style-src 'self' 'unsafe-inline';",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
