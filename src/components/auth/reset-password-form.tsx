"use client";
import { useCreateAuthSchema } from "@/hooks/use-createAuthSchema";
import { ResetPasswordFormSchemaType } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "../shared/loading-button";
import { PasswordInput } from "../shared/password-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  // Localization
  const t = useTranslations("auth.resetPassword");
  const locale = useLocale();
  const { ResetPasswordFormSchema } = useCreateAuthSchema();

  const form = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordFormSchemaType) {}
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
        aria-live="polite"
      >
        <div className="flex flex-col gap-y-2">
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
          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.confirmPasswordLabel")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t("form.confirmPasswordPlaceholder")}
                    {...field}
                    className="h-12"
                    aria-label={t("form.confirmPasswordLabel")}
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
            className="w-full select-none"
          >
            {t("form.submit")}
            <LogIn className="ml-2 h-5 w-5" />
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
}
