import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: any) => {
      const response = await apiClient.post("/tasks", newTask);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
