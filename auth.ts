import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "./db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userName: { label: "userName", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userName || !credentials?.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.userName, credentials.userName as string),
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.userName,
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});