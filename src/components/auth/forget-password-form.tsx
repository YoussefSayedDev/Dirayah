"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAuthSchema } from "@/hooks/use-createAuthSchema";
// import { authService } from "@/lib/auth/authService";
// import { LocalizedMessage } from "@/types/localization";
import { ForgotPasswordFormSchemaType } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
// import { useLocale, useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { LoadingButton } from "../shared/loading-button";

export function ForgotPasswordForm() {
  // const [isLoading, setIsLoading] = useState(false);

  // Localization
  const t = useTranslations("auth.forgotPassword");
  // const locale = useLocale();
  // const router = useRouter();
  const { ForgotPasswordFormSchema } = useCreateAuthSchema();

  const form = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // async function onSubmit(data: ForgotPasswordFormSchemaType) {
  //   setIsLoading(true);

  // try {
  //   const { error } = await authService.forgotPassword(data.email);
  //   if (error) {
  //     const errorMessage = error.isLocalized
  //       ? (error.message as LocalizedMessage)[
  //           locale as keyof LocalizedMessage
  //         ]
  //       : (error.message as string);

  //     toast.error(t("common.failed"), {
  //       description: errorMessage,
  //     });
  //     return;
  //   }

  //   toast.success(t("common.success"), {
  //     description: t("common.redirectingToDashboard"),
  //   });

  //   // router.push("/dashboard");
  // } catch {
  //   toast.error(t("common.failed"), {
  //     description: t("common.somethingWentWrong"),
  //   });
  // }
  // }

  return (
    <FormProvider {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
        aria-live="polite"
      >
        <div className="flex flex-col gap-y-2">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.emailLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="text"
                    {...field}
                    className="h-12"
                    aria-label="Email"
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
