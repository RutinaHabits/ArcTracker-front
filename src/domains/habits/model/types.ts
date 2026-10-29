export type TaskType = "GLOBAL" | "LOCAL";
export type TaskStatus = "COMPLETED" | "FAILED" | "SKIPPED";
export type FrequencyType = "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "CUSTOM";

export interface TaskLog {
  id: string;
  log_date: string;
  status: TaskStatus;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  type: TaskType;
  frequency: FrequencyType;
  custom_days: number[];
  deadline: string | null;
  is_strict_mode: boolean;
  counts_for_streak: boolean;
  active: boolean;
  created_at: string;
  due: boolean;

  log: TaskLog | null;
}

export interface UserProgress {
  userId: string;
  nickname: string;
  avatarUrl?: string;
  timezone: string;
  currentStreak: number;
  bestStreak: number;
  createdAt: string;
}
