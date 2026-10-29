import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteTaskArgs {
  id: string;
  date: string;
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, date }: DeleteTaskArgs) => {
      const response = await apiClient.delete(`/tasks/${id}`, {
        params: { date },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user-progress"] });
    },
  });
}
