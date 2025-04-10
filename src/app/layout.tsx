import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_NAME, SERVER_URL, APP_DESCRIPTION } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | Prostore`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  //根目錄
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 當 React 的 伺服端渲染（SSR）結果 和 客戶端重新 hydration 的內容不一致 時，React 會警告你有「hydration mismatch」。這個屬性suppressHydrationWarning 可以讓你「暫時忽略這個警告」。
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {/* attribute="class"	把主題放在 class 上，例如 <html class="dark">，方便搭配 Tailwind 使用 */}
        {/* defaultTheme="light"	預設主題是 light，當找不到使用者偏好時就用這個主題 */}
        {/* enableSystem	啟用系統主題偏好（使用者電腦的 dark / light 模式） */}
        {/* disableTransitionOnChange	避免切換主題時 CSS transition 被觸發（像是顏色閃爍） */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
