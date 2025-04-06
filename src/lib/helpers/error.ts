import { AuthError } from "@/types/validation";
import { getArabicErrorMessage } from "./index";

export const formatError = (error: unknown): AuthError => {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  return {
    message: {
      en: message,
      ar: getArabicErrorMessage(message),
    },
    isLocalized: true,
  };
};
