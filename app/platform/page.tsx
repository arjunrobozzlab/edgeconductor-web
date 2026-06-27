import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Platform — EdgeConductor",
  description: "Six production-grade capabilities built together: device registry, telemetry, OTA, rules engine, multi-tenant B2B, and mobile dashboards.",
};

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-4 py-32 md:py-48">
        <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4 border border-blue-500/30 bg-blue-500/8 px-3 py-1.5 rounded-full">
          Platform
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-2xl">
          The complete IoT infrastructure
        </h1>
        <p className="text-white/45 text-base max-w-lg mb-10">
          Detailed platform documentation coming soon. In the meantime, book a demo and we&apos;ll walk you through every feature.
        </p>
        <a href="/contact"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition">
          Book a Demo →
        </a>
      </section>
      <Footer />
    </main>
  );
}
