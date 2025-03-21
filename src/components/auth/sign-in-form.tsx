"use client";
import { useCreateAuthSchema } from "@/hooks/use-createAuthSchema";
import { SignInFormSchemaType } from "@/lib/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
// import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { LoadingButton } from "../shared/loading-button";
import { PasswordInput } from "../shared/password-input";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export function SignInForm() {
  // const [error, setError] = useState("");
  // const [isPending, setIsPending] = useState(false);

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
          {/* Foregot Password & Remember me */}
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
            loading={false}
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
            <div className="border-gary-200 hover:bg-foreground hover:text-accent flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 transition-colors duration-200">
              <FaGoogle className="h-4 w-4" />
              <span className="text-sm font-medium">{t("form.google")}</span>
            </div>
            <div className="border-gary-200 hover:bg-foreground hover:text-accent flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 transition-colors duration-200">
              <FaFacebook className="h-4 w-4" />
              <span className="text-sm font-medium">{t("form.facebook")}</span>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
