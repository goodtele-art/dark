import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "다크 테트라드 성격 검사",
  description: "상담자를 위한 다크 테트라드 성격 검사 - 마키아벨리즘, 나르시시즘, 사이코패시, 사디즘",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "다크 테트라드",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
