import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Live Demo — EdgeConductor",
  description: "Try the EdgeConductor platform live — see real device telemetry, HVAC control, OTA updates, and diagnostics. No signup required.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">Live Now</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Try the platform live</h1>
          <p className="text-white/45 text-base max-w-lg mx-auto mb-8">
            A live device simulator is running right now. Explore real telemetry, HVAC relay control, OTA firmware push, and the full diagnostics panel — no account needed.
          </p>
          <a href="https://ec-platform-ten.vercel.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition">
            Open Live Demo →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-14">
          {[
            { title: "Live Telemetry", desc: "Real-time temperature, humidity, CO₂, battery, and GPS data — refreshing every 10 seconds.", icon: "◈" },
            { title: "HVAC Control", desc: "Toggle relay ON/OFF from the dashboard. Command flows through MQTT to the simulator in real time.", icon: "⚡" },
            { title: "OTA Firmware Push", desc: "Upload a firmware file and push it to the device. See the pending → received → applied flow.", icon: "↑" },
            { title: "Diagnostics Panel", desc: "View uptime, heap memory, reboot reason, signal strength, and GPS fix status per device.", icon: "◎" },
            { title: "Rules Engine", desc: "See IF/THEN automation rules fire automatically — CO₂ > 1000 → relay ON, evaluated every 30s.", icon: "✦" },
            { title: "Multi-Tenant Access", desc: "Different roles (admin, org admin, tenant) with different views — all in one platform.", icon: "◻" },
          ].map(f => (
            <div key={f.title} className="bg-white/3 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
              <span className="text-2xl text-white/30 mb-3 block">{f.icon}</span>
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/35 text-sm mb-4">Want a guided walkthrough for your team?</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm font-medium px-6 py-3 rounded-full transition">
            Book a Demo Call →
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
