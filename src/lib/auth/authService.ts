import { AuthResponse } from "@/types/validation";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { getArabicErrorMessage } from "../helpers";

export const authService = {
  signIn: async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const result = await nextAuthSignIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        return {
          error: {
            message: {
              en: result.error,
              ar: getArabicErrorMessage(result.error),
            },
            isLocalized: true,
          },
        };
      }
      return { error: null };
    } catch {
      return {
        error: {
          message: {
            en: "An unexpected error occurred",
            ar: "حدث خطأ غير متوقع",
          },
          isLocalized: true,
        },
      };
    }
  },

  signUp: async (
    email: string,
    password: string,
    username: string,
  ): Promise<AuthResponse> => {
    try {
      // Call the register API endpoint
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: {
              en: data.error.message.en || "Registration failed",
              ar: data.error.message.ar || "فشل التسجيل",
            },
            isLocalized: true,
          },
        };
      }

      // Sign in the user after successful registration
      const signInResult = await nextAuthSignIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        return {
          error: {
            message: {
              en: `Sign in failed: ${signInResult.error}`,
              ar: `فشل تسجيل الدخول: ${signInResult.error}`,
            },
            isLocalized: true,
          },
        };
      }

      // At this point, NextAuth will have created a session
      return {
        error: null,
      };
    } catch {
      return {
        error: {
          message: {
            en: "An unexpected error occurred",
            ar: "حدث خطأ غير متوقع",
          },
          isLocalized: true,
        },
      };
    }
  },

  signOut: async () => {
    await nextAuthSignOut({ redirect: false });
  },

  signInWithGoogle: async (): Promise<void> => {
    try {
      await nextAuthSignIn("google", { callbackUrl: "/onboarding" });
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  },

  signInWithFacebook: async () => {
    try {
      await nextAuthSignIn("facebook", { callbackUrl: "/onboarding" });
    } catch (error) {
      console.error("Facebook sign-in error:", error);
      throw error;
    }
  },
};
