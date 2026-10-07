"use client";

import { apiClient } from "@/shared/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import styles from "./HabitTracker.module.scss";

export function HabitTracker() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await apiClient.get("/tasks");
      return response.data?.data || [];
    },

    initialData: [],
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.welcomeTitle}>Панель управления</h1>
        <p className={styles.streakInfo}>
          Текущий страйк: <span className={styles.streakCount}>0 дней</span> |
          Лучший результат: 0 дней
        </p>
      </header>

      <div className={styles.grid}>
        <section className={styles.column}>
          <h2 className={styles.columnTitle}> Локальные привычки (LOCAL)</h2>
          <div className={styles.emptyState}>
            У вас пока нет регулярных привычек. Время добавить первую
          </div>
        </section>

        <section className={styles.column}>
          <h2 className={styles.columnTitle}> Глобальные цели (GLOBAL)</h2>
          <div className={styles.emptyState}>Список глобальных целей пуст.</div>
        </section>
      </div>
    </div>
  );
}
