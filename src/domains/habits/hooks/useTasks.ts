"use client";

import { apiClient } from "@/shared/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../model/types";

export function useTasks(date?: string) {
  return useQuery<Task[]>({
    queryKey: ["tasks", date],
    queryFn: async () => {
      const params = date ? { date } : undefined;
      const response = await apiClient.get("/tasks", { params });

      return response.data?.data.tasks || response.data || [];
    },
    initialData: [],
  });
}
