import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client"; // Import your Prisma client

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma), // Use Prisma Adapter
  providers: [Google],
  callbacks: {
    async session({ session, token }) {
      if (token?.id) {
        session.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        ``;
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
