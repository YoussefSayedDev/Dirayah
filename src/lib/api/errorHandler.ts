import { AxiosError } from "axios";

export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    return {
      message: error.response.data || "API error",
      status: error.response.status,
    };
  }

  return { message: "Network error", status: 500 };
};
