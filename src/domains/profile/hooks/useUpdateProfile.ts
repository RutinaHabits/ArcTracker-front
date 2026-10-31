import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { AxiosError } from "axios";

interface UserProfileResponse {
  id: string;
  nickname: string;
  avatar_url: string | null;
}

interface ApiErrorResponse {
  message: string;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const updateInfo = useMutation<
    UserProfileResponse,
    AxiosError<ApiErrorResponse>,
    { nickname: string }
  >({
    mutationFn: async (data) => {
      const response = await apiClient.patch<UserProfileResponse>(
        "/user/profile",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const updateAvatar = useMutation<
    UserProfileResponse,
    AxiosError<ApiErrorResponse>,
    File
  >({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await apiClient.post<UserProfileResponse>(
        "/user/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  return { updateInfo, updateAvatar };
}
