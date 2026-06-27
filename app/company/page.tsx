import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Company — EdgeConductor",
  description: "EdgeConductor is an IoT platform company building the complete stack for hardware product teams.",
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-4xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Company</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">About EdgeConductor</h1>
          <div className="space-y-4 text-white/55 text-base leading-relaxed max-w-2xl">
            <p>
              EdgeConductor is an IoT platform built for hardware product companies — teams that design real physical devices and need a complete cloud backend to go with them.
            </p>
            <p>
              We started from the frustration of stitching together five different services for every connected product: a device registry here, a dashboard tool there, MQTT broker somewhere else, OTA vendor on top, and multi-tenant auth holding it all together poorly. EdgeConductor is what we wished existed.
            </p>
            <p>
              The platform is built on 13+ years of real embedded engineering experience — ESP32, GSM modules, GPS hardware, industrial sensors. We&apos;ve solved the hardware problems so you don&apos;t have to.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {[
            { label: "Founded", value: "2024" },
            { label: "Devices Connected", value: "50+" },
            { label: "Clients", value: "2 Live" },
          ].map(s => (
            <div key={s.label} className="bg-white/3 border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-1">{s.value}</div>
              <div className="text-xs text-white/35 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/3 border border-white/10 rounded-2xl p-7 mb-8">
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p className="text-white/45 text-sm mb-4">For platform inquiries, partnerships, or enterprise pricing:</p>
          <a href="mailto:edgeconductor@gmail.com"
            className="text-blue-400 hover:text-blue-300 transition text-sm font-medium">
            edgeconductor@gmail.com
          </a>
        </div>

        <div className="flex gap-4">
          <Link href="/case-studies"
            className="text-sm border border-white/20 text-white/65 hover:text-white hover:border-white/40 px-5 py-2.5 rounded-full transition">
            Case Studies →
          </Link>
          <Link href="/contact"
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium transition">
            Book a Demo →
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
