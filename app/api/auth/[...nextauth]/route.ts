import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { NextRequest } from "next/server";

export const authOptions = {
  providers: [
    GithubProvider({ clientId: process.env.GITHUB_ID || "", clientSecret: process.env.GITHUB_SECRET || "" }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "dev_secret",
  callbacks: {
    async session({ session, token }) {
      // pass through
      return session;
    },
  },
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
