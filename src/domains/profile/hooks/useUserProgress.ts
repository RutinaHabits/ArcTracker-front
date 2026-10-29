"use client";

import { useQuery } from "@tanstack/react-query";
import { UserProgress } from "../../habits/model/types";
import { apiClient } from "@/shared/api/apiClient";

export function useUserProgress() {
  return useQuery({
    queryKey: ["user-progress"],
    queryFn: async () => {
      const response = await apiClient.get("/tasks/progress");
      const serverData = response.data?.data;

      return {
        currentStreak: Number(serverData.currentStreak ?? 0),
        bestStreak: Number(serverData.bestStreak ?? 0),
        isTodayCompleted: Boolean(serverData.isTodayCompleted),
      };
    },
  });
}
