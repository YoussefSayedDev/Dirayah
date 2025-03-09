"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

export function useCreateAuthSchema() {
  const t = useTranslations("auth.form.validation");

  const SignInFormSchema = z.object({
    username: z
      .string()
      .min(3, t("username.min"))
      .regex(/^[a-zA-Z0-9_]+$/, t("username.regex")),
    password: z
      .string()
      .min(8, t("password.min"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        t("password.regex"),
      ),
  });

  const SignUpFormSchema = z.object({
    username: z
      .string()
      .min(3, t("username.min"))
      .regex(/^[a-zA-Z0-9_]+$/, t("username.regex")),
    email: z.string().min(1, t("email.min")).email(t("email.email")),
    password: z
      .string()
      .min(8, t("password.min"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        t("password.regex"),
      ),
  });

  return {
    SignInFormSchema,
    SignUpFormSchema,
  };
}
