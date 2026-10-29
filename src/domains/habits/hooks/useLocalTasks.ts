import { apiClient } from "@/shared/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../model/types";

export function useLocalTasks(date: string) {
  return useQuery({
    queryKey: ["tasks", "local", date],
    queryFn: async () => {
      const response = await apiClient.get("/tasks", { params: { date } });
      const allTasks = response.data?.data?.tasks || response.data?.tasks || [];
      const safeTasks = Array.isArray(allTasks) ? allTasks : [];
      return safeTasks.filter((task: Task) => task.type === "LOCAL");
    },
  });
}
