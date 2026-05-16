import type { Metadata } from "next";
import { BottomNav } from "@/components/bottom-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "谷子雷达",
  description: "在动漫周边市集快速找到售卖心仪 IP 谷子的摊位",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="mx-auto min-h-screen max-w-[390px] bg-white pb-20 shadow-[0_0_35px_rgba(15,23,42,0.08)]">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
