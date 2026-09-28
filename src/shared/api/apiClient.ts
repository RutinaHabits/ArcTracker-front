import axios from "axios";
import { error } from "console";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    )
      originalRequest._retry = true;

    try {
      await axios.post(
        `${BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      );
      return apiClient(originalRequest);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
      return Promise.reject(refreshError);
    }
    return Promise.reject(error);
  },
);
