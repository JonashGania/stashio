import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { prisma } from "./lib/prisma";

const publicRoutes = ["/sign-in", "/sign-up"];
const authRoutes = ["/sign-in", "sign-up"];

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email } = await LoginSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          console.error("Authentication error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (publicRoutes.includes(pathname)) {
        return true;
      }

      // Redirect logged-in users away from auth routes
      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true; // Allow access to auth pages if not logged in
      }

      return isLoggedIn;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;
