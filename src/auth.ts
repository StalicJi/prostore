import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcrypt-ts-edge";
import { authConfig } from "../auth.config";
import { prisma } from "./db/prisma";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const, // 使用 JWT 作為 session 儲存方式（不使用 DB）
    maxAge: 30 * 24 * 60 * 60, // session 有效時間 30 天（秒）
  },
  adapter: PrismaAdapter(prisma),
  // 使用 Credentials Provider 來做帳密登入
  providers: [
    CredentialProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      // 登入驗證邏輯
      async authorize(credentials) {
        if (credentials == null) return null;
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        //Check if user exists and if the password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user does not exist or password dose not match return null
        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks, // 從 auth.config 匯入的 callback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      // Set the userID from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // console.log(token);

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },

    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role;

        // If user has no name then use email
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
