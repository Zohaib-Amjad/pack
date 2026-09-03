import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import CustomHeader from "@/components/custom-pages/CustomHeader";
import CustomFooter from "@/components/custom-pages/CustomFooter";
import { AppProviders } from "@/components/providers/AppProviders";
import { SITE_CONFIG } from "@/data/seed-data";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1f5a38",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Custom Packaging Solutions`,
  description: SITE_CONFIG.description,
  metadataBase: new URL("https://hofpack.com"),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function CustomPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-sans overflow-x-hidden max-w-full ${dmSans.variable}`}>
      <body className={`min-h-screen flex flex-col bg-white text-[#2e2e2e] antialiased overflow-x-hidden w-full max-w-full ${dmSans.className}`}>
        <AppProviders>
          <CustomHeader />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <CustomFooter />
        </AppProviders>
      </body>
    </html>
  );
}
