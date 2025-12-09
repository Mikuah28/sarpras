import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials.email }
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role
        };
      }
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Saat login, user akan ada
      if (user) {
        token.id = user.id;          // WAJIB
        token.email = user.email;
        token.role = user.role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      // Masukkan token ke session
      session.user.id = token.id;    // WAJIB
      session.user.email = token.email;
      session.user.role = token.role ?? "user";
      return session;
    }
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
