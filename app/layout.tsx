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
    default: "Edge Conductor — Embedded AI · Robotics · Industrial IoT",
    template: "%s | Edge Conductor",
  },
  description:
    "Edge Conductor builds real-world AI-powered embedded systems — edge AI devices, autonomous robots, OTA firmware updates, and industrial IoT solutions. 13+ years of embedded engineering.",
  keywords: [
    "embedded AI", "edge AI development", "edge AI company India",
    "IoT firmware development", "OTA firmware updates", "ESP32 development",
    "STM32 firmware", "industrial IoT India", "ROS2 robotics development",
    "computer vision edge AI", "FreeRTOS development", "MQTT IoT solutions",
    "custom PCB design India", "hospital AI robotics", "edge computing solutions",
    "autonomous robots India", "BLE IoT", "LoRa IoT", "4G GSM IoT",
    "embedded systems company India", "AI device development", "nRF52840",
    "TensorFlow Lite Micro", "machine learning embedded", "industrial automation India",
  ],
  authors: [{ name: "Edge Conductor" }],
  creator: "Edge Conductor",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://edgeconductor.com",
    siteName: "Edge Conductor",
    title: "Edge Conductor — Embedded AI · Robotics · Industrial IoT",
    description:
      "We build real-world AI-powered embedded systems — edge AI devices, autonomous robots, OTA firmware, and industrial IoT solutions. 13+ years of embedded engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edge Conductor — Embedded AI · Robotics · Industrial IoT",
    description:
      "We build real-world AI-powered embedded systems — edge AI devices, autonomous robots, OTA firmware, and industrial IoT solutions.",
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
