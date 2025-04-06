import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { comparePassword } from "./passwordUtils";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username as string,
          },
        });

        if (user && user.password) {
          const isValid = await comparePassword(
            credentials.password as string,
            user.password,
          );

          if (isValid) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }

        return null;
      },
    }),
  ],
});
