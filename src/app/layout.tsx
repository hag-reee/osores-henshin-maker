import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "おそレス言いワケメーカー",
  description: "返信が遅れて気まずいときの言い訳をAIが生成します",
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "おそレス言いワケメーカー",
    description: "返信が遅れて気まずいときの言い訳をAIが生成します",
    url: "https://osores-excuse-maker.vercel.app", // Provisional or omit
    siteName: "おそレス言いワケメーカー",
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "おそレス言いワケメーカー",
    description: "返信が遅れて気まずいときの言い訳をAIが生成します",
    images: ['/ogp.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New&display=swap" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
