import type { DefaultSession, User as NextAuthUser } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      onboardingCompleted: boolean;
      onboardingStep: number;
      firstName?: string;
      lastName?: string;
    } & DefaultSession["user"];
  }

  interface User extends NextAuthUser {
    id: string;
    role?: string;
    onboardingCompleted?: boolean;
    onboardingStep?: number;
    firstName?: string;
    lastName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id?: string;
    role?: string;
    onboardingCompleted?: boolean;
    onboardingStep?: number;
    firstName?: string;
    lastName?: string;
  }
}
