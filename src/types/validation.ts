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

export type AuthError = {
  message: LocalizedMessage | string;
  isLocalized?: boolean;
};
