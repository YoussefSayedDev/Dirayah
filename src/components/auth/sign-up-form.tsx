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
// import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { PasswordInput } from "../shared/password-input";
import { Separator } from "../ui/separator";
export function SignUpForm() {
  // const [error, setError] = useState("");
  // const [isPending, setIsPending] = useState(false);

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
{/*           {error && (
            <p className="text-center text-sm text-red-500" role="alert">
              {error}
            </p>
          )} */}

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
            loading={false}
            type="submit"
            className="mt-4 w-full select-none"
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
            <div className="border-gary-200 hover:bg-foreground hover:text-accent flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 transition-colors duration-200">
              <FaGoogle className="h-4 w-4" />
              <span className="text-sm font-medium">Google</span>
            </div>
            <div className="border-gary-200 hover:bg-foreground hover:text-accent flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 transition-colors duration-200">
              <FaFacebook className="h-4 w-4" />
              <span className="text-sm font-medium">Facebook</span>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
