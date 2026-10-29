import ProfileMain from "@/domains/profile/ui/ProfileMain/ProfileMain";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Manage your Arc Tracker profile, change your avatar, and configure account settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfileMain />;
}
