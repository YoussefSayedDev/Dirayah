"use client";
import { LoadingButton } from "@/components/shared/loading-button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { PasswordInput } from "@/components/shared/password-input";
import { Separator } from "@/components/ui/separator";
import { useCreateAuthSchema } from "@/hooks/use-createAuthSchema";
import { useAuth } from "@/providers/auth-provider";
import { LocalizedMessage } from "@/types/localization";
import { SignUpFormSchemaType } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  // Localization
  const t = useTranslations("auth.signUp");
  const locale = useLocale();
  const { SignUpFormSchema } = useCreateAuthSchema();
  const router = useRouter();
  const { signUp, signInWithGoogle, signInWithFacebook } = useAuth();

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpFormSchemaType) {
    setIsLoading(true);

    try {
      const { error } = await signUp(data.email, data.password, data.username);

      console.log({
        error,
      });

      if (error) {
        const errorMessage = error.isLocalized
          ? (error.message as LocalizedMessage)[
              locale as keyof LocalizedMessage
            ]
          : (error.message as string);

        toast(t("failed"), {
          description: errorMessage,
          style: {
            color: "red",
          },
        });
        return;
      }

      toast(t("success"), {
        description: t("redirectingToOnboarding"),
      });

      // Give NextAuth a moment to set up the session
      setTimeout(() => {
        router.push("/onboarding");
      }, 2000);
    } catch {
      toast(t("failed"), {
        description: t("somethingWentWrong"),
        style: {
          color: "red",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch {
      toast(t("loginFailed"), {
        description: t("somethingWentWrong"),
        style: {
          color: "red",
        },
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsFacebookLoading(true);
    try {
      await signInWithFacebook();
    } catch {
      toast(t("loginFailed"), {
        description: t("somethingWentWrong"),
        style: {
          color: "red",
        },
      });
    } finally {
      setIsFacebookLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
        aria-live="polite"
      >
        {/* Errors go here */}
        <div className="flex flex-col gap-y-2">
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.usernameLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("form.usernamePlaceholder")}
                    type="text"
                    {...field}
                    className="h-12"
                    aria-label={t("form.usernameLabel")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.emailLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("form.emailPlaceholder")}
                    type="text"
                    {...field}
                    className="h-12"
                    aria-label={t("form.emailLabel")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.passwordLabel")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t("form.passwordPlaceholder")}
                    {...field}
                    className="h-12"
                    aria-label={t("form.passwordLabel")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <LoadingButton
            loading={isLoading}
            type="submit"
            className="mt-4 w-full cursor-pointer"
          >
            {t("form.signUp")}
            <LogIn className="ml-2 h-5 w-5" />
          </LoadingButton>

          {/* Or sign up with  */}
          <div className="flex items-center justify-between">
            <Separator className="my-4 !w-[30%]" />
            <span className="w-28 text-center text-xs text-gray-500">
              {t("form.orSignUpWith")}
            </span>
            <Separator className="my-4 !w-[30%]" />
          </div>

          {/* Sign In using Google or Facebook */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="border-gary-200 hover:bg-foreground hover:text-accent flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 transition-colors duration-200"
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FaGoogle className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              onClick={handleFacebookSignIn}
              disabled={isFacebookLoading}
              className="border-gary-200 hover:bg-foreground hover:text-accent flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 transition-colors duration-200"
            >
              {isFacebookLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FaFacebook className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
