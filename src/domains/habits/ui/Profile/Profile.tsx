"use client";

import Link from "next/link";
import { useUserProfile } from "../../../profile/hooks/useUserProfile";
import styles from "./Profile.module.scss";

export function Profile() {
  const { data: userProfile } = useUserProfile();

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://habit-tracker-backend-8vsc.onrender.com";

  const normalizedBackendUrl = backendUrl
    .replace(/\/$/, "")
    .replace(/\/api$/, "");

  const avatarUrl = userProfile?.avatar_url
    ? `${normalizedBackendUrl}${userProfile.avatar_url.startsWith("/") ? userProfile.avatar_url : `/${userProfile.avatar_url}`}`
    : null;

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Dashboard</h1>
      <Link href={"/dashboard/profile"} className={styles.profileAvatarLink}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className={styles.avatarImg} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {userProfile?.nickname?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </Link>
    </header>
  );
}
