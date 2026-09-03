import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AppProviders } from "@/components/providers/AppProviders";
import { SITE_CONFIG } from "@/data/seed-data";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1e3d2b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Custom Packaging Boxes & Mylar Bags | Low MOQ, Free Mockup`,
  description: SITE_CONFIG.description,
  keywords: [
    "custom packaging",
    "custom boxes",
    "mailer boxes",
    "rigid boxes",
    "mylar bags",
    "kraft boxes",
    "hof pack",
    "low moq packaging",
    "free box mockup",
  ],
  authors: [{ name: "HOF Pack" }],
  creator: "HOF Pack",
  publisher: "HOF Pack",
  metadataBase: new URL("https://hofpack.com"),
  openGraph: {
    title: `${SITE_CONFIG.name} | Custom Packaging Boxes & Mylar Bags`,
    description: SITE_CONFIG.description,
    url: "https://hofpack.com",
    siteName: "HOF Pack",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HOF Pack" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-sans overflow-x-hidden max-w-full ${dmSans.variable}`}>
      <body className={`min-h-screen flex flex-col bg-[#f5f3ee] text-[#4a4a4a] antialiased overflow-x-hidden w-full max-w-full ${dmSans.className}`}>
        <AppProviders>
          <Navbar />
          <main className="flex-1 pt-20 lg:pt-[112px] w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
          <WhatsAppButton />
        </AppProviders>
      </body>
    </html>
  );
}
