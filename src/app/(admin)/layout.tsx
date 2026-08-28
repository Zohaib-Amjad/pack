import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import React from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2d5c3e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Admin · Content Manager | HOF Pack",
  description: "HOF Pack CMS & Content Manager",
  robots: {
    index: false,
    follow: false,
  },
};

import { AppProviders } from "@/components/providers/AppProviders";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-sans ${dmSans.variable}`}>
      <body className={`h-screen overflow-hidden bg-[#f5f3ee] text-[#1a1a1a] antialiased ${dmSans.className}`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
