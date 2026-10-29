import { HabitTracker } from "@/domains/habits/ui/HabitTracker/HabitTracker";
import styles from "./page.module.scss";
import { Profile } from "@/domains/habits/ui/Profile/Profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Set tasks, check your daily streaks, and stay focus on your goals.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <Profile />
      <main>
        <HabitTracker />
      </main>
    </div>
  );
}
