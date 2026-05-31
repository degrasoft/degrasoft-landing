import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatrixBackground from "@/components/MatrixBackground";
import GradientBlobs from "@/components/GradientBlobs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DegraSoft — Пишем код, пока все стримят",
  description: "DegraSoft — команда, которая делает инструменты для стримеров и не только. Open source проекты для стрим-комьюнити.",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-zinc-200 min-h-screen flex flex-col`}
      >
        <MatrixBackground />
        <GradientBlobs />
        <Navbar />
        <main className="relative z-10 flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
