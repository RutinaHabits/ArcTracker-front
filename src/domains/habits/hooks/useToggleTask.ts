"use client";

import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      date,
      currentStatus,
    }: {
      id: string;
      date: string;
      currentStatus: string;
    }) => {
      const nextStatus =
        currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
      const response = await apiClient.post(`/tasks/${id}/log`, {
        date,
        status: nextStatus,
      });
      return response.data;
    },

    onMutate: async ({ id, date, currentStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", "local", date] });
      await queryClient.cancelQueries({ queryKey: ["tasks", "global"] });

      const previousLocalTasks = queryClient.getQueryData<any[]>([
        "tasks",
        "local",
        date,
      ]);
      const previousGlobalTasks = queryClient.getQueryData<any[]>([
        "tasks",
        "global",
      ]);

      const nextStatus =
        currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
      const mockLog =
        nextStatus === "PENDING"
          ? null
          : { id: "temp-id", log_date: date, status: "COMPLETED" as const };

      if (previousLocalTasks) {
        queryClient.setQueryData<any[]>(
          ["tasks", "local", date],
          previousLocalTasks.map((task) =>
            task.id === id ? { ...task, log: mockLog } : task,
          ),
        );
      }

      if (previousGlobalTasks) {
        queryClient.setQueryData<any[]>(
          ["tasks", "global"],
          previousGlobalTasks.map((task) =>
            task.id === id ? { ...task, log: mockLog } : task,
          ),
        );
      }

      return { previousLocalTasks, previousGlobalTasks, date };
    },

    onError: (err, variables, context) => {
      if (context?.previousLocalTasks) {
        queryClient.setQueryData(
          ["tasks", "local", context.date],
          context.previousLocalTasks,
        );
      }
      if (context?.previousGlobalTasks) {
        queryClient.setQueryData(
          ["tasks", "global"],
          context.previousGlobalTasks,
        );
      }
    },

    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "local", context?.date],
      });
      queryClient.invalidateQueries({ queryKey: ["tasks", "global"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user-progress"] });
    },
  });
}
