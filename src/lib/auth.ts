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
        if (credentials) {
          // Find the user by username
          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username as string,
            },
            include: {
              profile: true,
            },
          });

          // Check if user exists and password is correct
          if (user && user.password) {
            const isValid = await comparePassword(
              credentials.password as string,
              user.password,
            );

            if (isValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.profile?.role ?? "user", // if there is no role, default to 'user'
              };
            }
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
