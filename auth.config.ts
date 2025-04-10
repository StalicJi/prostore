import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [], // 這是為了符合 NextAuthConfig 的型別要求，實際的 providers 會在 auth.ts 設定
  callbacks: {
    authorized({ request, auth }: any) {
      //   // 要保護的路徑（正則表示式）
      //   const protectedPaths = [
      //     /\/shipping-address/,
      //     /\/payment-method/,
      //     /\/place-order/,
      //     /\/profile/,
      //     /\/user\/(.*)/,
      //     /\/order\/(.*)/,
      //     /\/admin/,
      //   ];
      //   // 取得請求中的路徑
      //   const { pathname } = request.nextUrl;

      //   // 如果沒有登入且進入受保護的路徑，則不允許訪問
      //   if (!auth && protectedPaths.some((path) => path.test(pathname)))
      //     return false;

      // 若沒有 sessionCartId（購物車識別碼）則建立一個
      if (!request.cookies.get("sessionCartId")) {
        // Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();
        // console.log(sessionCartId);

        // Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: new Headers(request.headers),
          },
        });

        // Set newly generated sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
