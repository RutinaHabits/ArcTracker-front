"use client";

import React, { useRef, useState } from "react";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { useUserProfile } from "../../hooks/useUserProfile";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./ProfileMain.module.scss";
import { useRouter } from "next/navigation";

export default function ProfileMain() {
  const router = useRouter();
  const { data: user, isLoading } = useUserProfile();
  const { updateInfo, updateAvatar } = useUpdateProfile();

  const [nickname, setNickname] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <div className={styles.loading}>Profile Upload...</div>;
  }

  const firstLetter = user?.nickname
    ? user.nickname.charAt(0).toUpperCase()
    : "?";

  const avatarUrl = user?.avatar_url
    ? `http://localhost:4000${user.avatar_url}`
    : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (file.size > 2 * 1024 * 1024) {
      setError("Max size - 2 MB");
      return;
    }

    updateAvatar.mutate(file, {
      onError: (err: any) => {
        setError(err.response?.data?.message || "Avatar upload error");
      },
    });
  };

  const handleSaveNickname = (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    if (nickname.trim().length < 3) {
      setError("The nickname must be at least 3 characters long");
      return;
    }

    updateInfo.mutate(
      { nickname: nickname.trim() },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (err: any) => {
          setError(err.response?.data?.message || "Update error");
        },
      },
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie =
      "is_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/sign-in";
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div
            className={styles.avatarWrapper}
            onClick={() => fileInputRef.current?.click()}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.nickname}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>{firstLetter}</div>
            )}
            <div className={styles.avatarOverlay}>Change</div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className={styles.fileInput}
          />

          {error && !isEditing && (
            <span className={styles.avatarErrorText}>{error}</span>
          )}

          <p className={styles.hint}>JPG, PNG, WebP up to 4 MB are allowed</p>
        </div>

        <div className={styles.infoSection}>
          {isEditing ? (
            <form onSubmit={handleSaveNickname} className={styles.editForm}>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={user?.nickname}
                className={styles.nicknameInput}
                autoFocus
              />
              {error && <span className={styles.errorText}>{error}</span>}
              <div className={styles.formActions}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setError("");
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={updateInfo.isPending}
                >
                  {updateInfo.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          ) : (
            <div className={styles.nameBlock}>
              <h2 className={styles.nickname}>{user?.nickname}</h2>
              <button
                className={styles.editBtn}
                onClick={() => {
                  setError("");
                  setNickname(user?.nickname || "");
                  setIsEditing(true);
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Change
              </button>
            </div>
          )}
          <p className={styles.email}>{user?.email}</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={`${styles.statIconWrapper} ${styles.streakActive}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Current streak</p>
              <span className={styles.statValue}>
                {`${user?.current_streak || 0} ${user?.current_streak === 1 ? "day" : "days"}`}
              </span>
            </div>
          </div>

          <div className={styles.statBox}>
            <div className={`${styles.statIconWrapper} ${styles.bestActive}`}>
              <svg
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 4h14v6.5c0 3.5-2.5 6-7 6s-7-2.5-7-6V4Z" />
                <path d="M5 6.5H3.5A1.5 1.5 0 0 0 2 8v1.5A1.5 1.5 0 0 0 3.5 11H5" />
                <path d="M19 6.5h1.5A1.5 1.5 0 0 1 22 8v1.5a1.5 1.5 0 0 1-1.5 1.5H19" />
                <path d="M12 16.5V20" />
                <path d="M8 20h8" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Best streak</p>
              <span className={styles.statValue}>
                {`${user?.best_streak || 0} ${user?.best_streak === 1 ? "day" : "days"}`}
              </span>
            </div>
          </div>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log out of the account
        </button>
      </div>
    </div>
  );
}
