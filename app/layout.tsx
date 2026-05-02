import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Overtime Tracker",
  description:
    "Track your overtime hours, calculate earnings, and stay on top of your monthly goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-screen w-screen overflow-hidden antialiased`}
      suppressHydrationWarning
    >
      <body className="h-screen w-screen overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
