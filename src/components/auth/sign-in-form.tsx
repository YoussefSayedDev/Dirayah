"use client";
import { useCreateAuthSchema } from "@/hooks/use-createAuthSchema";
import { SignInFormSchemaType } from "@/lib/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "../shared/loading-button";
import { PasswordInput } from "../shared/password-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function SignInForm() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Localization
  const t = useTranslations("auth.signIn");
  const { SignInFormSchema } = useCreateAuthSchema();

  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormSchemaType) {
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
            {t("form.signIn")}
            <LogIn className="ml-2 h-5 w-5" />
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
}
