"use client";
import { LogIn } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "../shared/loading-button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { useCreateAuthSchema } from "@/hooks/use-createAuthSchema";
import { SignUpFormSchemaType } from "@/lib/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PasswordInput } from "../shared/password-input";
export function SignUpForm() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Localization
  const t = useTranslations("auth.signUp");
  const { SignUpFormSchema } = useCreateAuthSchema();

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpFormSchemaType) {
    console.log(data);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
        aria-live="polite"
      >
        {/* Errors go here */}
        <div className="flex flex-col gap-y-2">
          {error && (
            <p className="text-center text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

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
            loading={isPending}
            type="submit"
            className="w-full select-none"
          >
            {t("form.signUp")}
            <LogIn className="ml-2 h-5 w-5" />
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
}
