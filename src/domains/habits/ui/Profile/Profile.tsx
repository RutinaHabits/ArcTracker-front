"use client";

import Link from "next/link";
import { useUserProfile } from "../../../profile/hooks/useUserProfile";
import styles from "./Profile.module.scss";

export function Profile() {
  const { data: userProfile } = useUserProfile();

  const avatarUrl = userProfile?.avatar_url
    ? `http://localhost:4000${userProfile.avatar_url}`
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
