import type { Metadata } from "next";
import Script from "next/script";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "探索者 · 高兴 | Explorer · Gao Xing",
  description: "从保定到悉尼，从代码到产品 — 高兴的个人作品集。产品经理、AI探索者、星际旅行者。",
  keywords: ["高兴", "Gao Xing", "产品经理", "AI", "Portfolio", "悉尼大学"],
  authors: [{ name: "高兴 | Gao Xing" }],
  openGraph: {
    title: "探索者 · 高兴 | Explorer · Gao Xing",
    description: "PM · AI Explorer · Star Traveler — 从保定到悉尼，从代码到产品，寻找属于自己的轨道。",
    url: "https://shadowgaoxing.github.io/star-voyager/",
    siteName: "Star Voyager",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "探索者 · 高兴 | Explorer · Gao Xing",
    description: "PM · AI Explorer · Star Traveler",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#0a0a1a] text-[#e8e8ed] antialiased">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
        </LanguageProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1NFPWB9FPG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-1NFPWB9FPG');`}
        </Script>
      </body>
    </html>
  );
}
