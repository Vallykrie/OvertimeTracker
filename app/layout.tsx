import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Overtime Tracker | Aching sayang Nathan ❤️",
    template: "%s | Overtime Tracker",
  },
  description:
    "Nathan buat web untuk Aching sayangku menghitung lemburnya ❤️. A modern, premium glassmorphic web application to track overtime hours, calculate earnings, and monitor monthly goals.",
  keywords: [
    "Overtime Tracker",
    "Time Tracking",
    "Salary Calculator",
    "Next.js 16",
    "Tailwind CSS v4",
    "Glassmorphism",
    "Productivity Tool",
    "Overtime Calculator",
  ],
  authors: [{ name: "Nathan" }],
  creator: "Nathan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Vallykrie/OvertimeTracker",
    title: "Overtime Tracker | Premium Time & Earnings Management",
    description:
      "A modern, single-page web application to track your overtime hours, calculate earnings, and monitor your monthly goals with a sleek glassmorphic UI.",
    siteName: "Overtime Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overtime Tracker | Premium Time & Earnings Management",
    description:
      "Track overtime hours, calculate earnings, and monitor monthly goals with a stunning glassmorphic UI.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
