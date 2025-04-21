import { LocalizedMessage } from "./localization";

export type SignInFormSchemaType = {
  username: string;
  password: string;
};

export type SignUpFormSchemaType = {
  username: string;
  email: string;
  password: string;
};

export type VerifyEmailFormSchemaType = {
  verificationCode: string;
};

export type ForgotPasswordFormSchemaType = {
  email: string;
};

export type ResetPasswordFormSchemaType = {
  password: string;
  confirmPassword: string;
};

export type AuthError = {
  message: LocalizedMessage | string;
  isLocalized?: boolean;
};

export type AuthResponse = {
  error: AuthError | null;
};
