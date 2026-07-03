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
  metadataBase: new URL("https://edgeconductor.com"),
  title: {
    default: "EdgeConductor — Connected Product & Asset Operations Platform",
    template: "%s | EdgeConductor",
  },
  description:
    "The connected product & asset operations platform for hardware companies. Device registry, live telemetry, OTA firmware, fleet operations, building operations, anomaly detection, and partner portal — one platform.",
  keywords: [
    "connected asset operations platform", "device management platform", "OTA firmware updates",
    "fleet operations platform", "building operations platform", "asset operations",
    "GPS tracker platform", "HVAC control platform", "device provisioning",
    "multi-tenant B2B platform", "partner portal", "connected product platform",
    "IoT telemetry", "device registry", "hardware SaaS India", "anomaly detection IoT",
    "white label IoT platform", "ESP32 cloud platform", "connected operations",
  ],
  authors: [{ name: "EdgeConductor" }],
  creator: "EdgeConductor",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://edgeconductor.com",
    siteName: "EdgeConductor",
    title: "EdgeConductor — Connected Product & Asset Operations Platform",
    description:
      "Run fleet operations, building operations, and asset operations on one platform. Device registry, OTA, telemetry, anomaly detection, and white-label B2B dashboards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EdgeConductor — Connected Product & Asset Operations Platform",
    description:
      "The complete connected product & asset operations platform. From device firmware to fleet and building operations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0a] text-white">{children}</body>
    </html>
  );
}
