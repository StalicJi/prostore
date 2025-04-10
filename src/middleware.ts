import NextAuth from "next-auth";
import { authConfig } from "../auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/product/:slug*"], // 匹配所有 /product 開頭的頁面
};
