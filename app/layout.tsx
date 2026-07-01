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
    default: "EdgeConductor — IoT Platform for Hardware Companies",
    template: "%s | EdgeConductor",
  },
  description:
    "The complete IoT stack for hardware teams. Device provisioning, live telemetry, OTA firmware updates, B2B multi-tenant dashboards, and rules engine — all in one platform.",
  keywords: [
    "IoT platform", "device management platform", "OTA firmware updates",
    "ESP32 IoT cloud", "MQTT platform", "multi-tenant IoT", "IoT dashboard",
    "fleet management IoT", "smart building IoT", "GPS tracker platform",
    "HVAC IoT control", "device provisioning", "IoT rules engine",
    "B2B IoT platform", "embedded IoT platform", "connected products platform",
    "IoT telemetry", "device registry", "IoT India", "hardware IoT SaaS",
  ],
  authors: [{ name: "EdgeConductor" }],
  creator: "EdgeConductor",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://edgeconductor.com",
    siteName: "EdgeConductor",
    title: "EdgeConductor — IoT Platform for Hardware Companies",
    description:
      "The complete IoT stack for hardware teams. Device provisioning, live telemetry, OTA firmware, B2B dashboards, and rules engine — one platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EdgeConductor — IoT Platform for Hardware Companies",
    description:
      "The complete connected asset platform. From device firmware to B2B cloud dashboards.",
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
