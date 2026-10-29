import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const updateInfo = useMutation({
    mutationFn: async (data: { nickname: string }) => {
      const response = await apiClient.patch("/user/profile", data, {
        method: "PATCH",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const updateAvatar = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await apiClient.post("/user/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  return { updateInfo, updateAvatar };
}
