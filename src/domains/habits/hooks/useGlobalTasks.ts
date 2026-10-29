import { apiClient } from "@/shared/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../model/types";

export function useGlobalTasks() {
  return useQuery({
    queryKey: ["tasks", "global"],
    queryFn: async () => {
      const response = await apiClient.get("/tasks");
      const allTasks = response.data?.data?.tasks || response.data?.tasks || [];
      const safeTasks = Array.isArray(allTasks) ? allTasks : [];
      return safeTasks.filter((task: Task) => task.type === "GLOBAL");
    },
    staleTime: 5 * 60 * 1000,
  });
}
