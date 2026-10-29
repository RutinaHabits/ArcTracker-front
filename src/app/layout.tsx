import type { Metadata } from "next";
import { QueryProvider } from "@/shared/api/QueryProvider";
import { Rubik, Geist_Mono } from "next/font/google";
import "./styles/main.scss";
import StoreProvider from "./StoreProvider";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Arc Tracker",
    template: "%s | Arc Tracker",
  },
  description:
    "No excuses. No visibility. Just pure execution. Track your habits, set global goals, and record results until the sun returns.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${rubik.variable} ${geistMono.variable}`}
    >
      <body>
        <StoreProvider>
          <QueryProvider>{children}</QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
