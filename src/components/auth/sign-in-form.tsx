"use client";
import { LoadingButton } from "@/components/shared/loading-button";
import { PasswordInput } from "@/components/shared/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCreateAuthSchema } from "@/hooks/use-createAuthSchema";
import { authService } from "@/lib/auth/authService";
import { LocalizedMessage } from "@/types/localization";
import { SignInFormSchemaType } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  // Localization
  const t = useTranslations("auth.signIn");
  const locale = useLocale();
  const { SignInFormSchema } = useCreateAuthSchema();
  const router = useRouter();

  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormSchemaType) {
    setIsLoading(true);

    try {
      const { error } = await authService.signIn(data.username, data.password);
      if (error) {
        const errorMessage = error.isLocalized
          ? (error.message as LocalizedMessage)[
              locale as keyof LocalizedMessage
            ]
          : (error.message as string);

        toast.error(t("common.failed"), {
          description: errorMessage,
        });
        return;
      }

      toast.success(t("common.success"), {
        description: t("common.redirectingToDashboard"),
      });

      router.push("/dashboard");
    } catch {
      toast.error(t("common.failed"), {
        description: t("common.somethingWentWrong"),
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch {
      toast.error(t("common.loginFailed"), {
        description: t("common.somethingWentWrong"),
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsFacebookLoading(true);
    try {
      await authService.signInWithFacebook();
    } catch {
      toast.error(t("common.loginFailed"), {
        description: t("common.somethingWentWrong"),
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
        <div className="flex flex-col gap-y-2">
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
          {/* Forgot Password & Remember me */}
          <div className="flex items-center justify-between">
            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="cursor-pointer" />
              <label
                htmlFor="terms"
                className="cursor-pointer text-xs leading-none font-medium opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("form.rememberMe")}
              </label>
            </div>

            {/* Forgot Password */}
            <div>
              <Link href="/forgot-password" className="text-xs hover:underline">
                {t("form.forgotPassword")}
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <LoadingButton
            loading={isLoading}
            type="submit"
            className="w-full select-none"
          >
            {t("form.signIn")}
            <LogIn className="ml-2 h-5 w-5" />
          </LoadingButton>

          {/* Or sign in with  */}
          <div className="flex items-center justify-between">
            <Separator className="my-4 !w-[35%]" />
            <span className="w-28 text-center text-xs text-gray-500">
              {t("form.orSignInWith")}
            </span>
            <Separator className="my-4 !w-[35%]" />
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
              <span className="text-sm font-medium">{t("form.google")}</span>
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
              <span className="text-sm font-medium">{t("form.facebook")}</span>
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
