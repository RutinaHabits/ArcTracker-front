"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";

export function useUserProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await apiClient.get("/user/profile");
      return response?.data.data;
    },
  });
}
