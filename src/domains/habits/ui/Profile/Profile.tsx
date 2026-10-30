"use client";

import Link from "next/link";
import { useUserProfile } from "../../../profile/hooks/useUserProfile";
import styles from "./Profile.module.scss";

export function Profile() {
  const { data: userProfile } = useUserProfile();

  const avatarUrl = userProfile?.avatar_url || null;

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Dashboard</h1>
      <Link href={"/dashboard/profile"} className={styles.profileAvatarLink}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            crossOrigin="anonymous"
            className={styles.avatarImg}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {userProfile?.nickname?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </Link>
    </header>
  );
}
