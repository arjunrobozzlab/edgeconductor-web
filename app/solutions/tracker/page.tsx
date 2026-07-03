import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "EC Tracker — GPS Fleet Management | EdgeConductor",
  description: "Full-stack GPS fleet management on ESP32 + A7672S GSM. Real-time map, geofence alerts, remote reboot, OTA updates, and cloud diagnostics. Hardware validated.",
};

const features = [
  {
    title: "Real-Time GPS Tracking",
    desc: "Live location every 5 seconds on your fleet map. GPS lock in under 20 seconds — coordinates streamed continuously. See every vehicle, exactly where it is, right now.",
    icon: "◎",
  },
  {
    title: "4G Cellular Connectivity",
    desc: "Works on any standard SIM card, anywhere with 4G coverage. No WiFi dependency, fully encrypted end-to-end. Drop in a SIM and the device connects — no network configuration needed.",
    icon: "◈",
  },
  {
    title: "Remote Reboot",
    desc: "Device offline or stuck? Reboot it from the dashboard — no physical access needed. The device restarts in under 30 seconds. Confirmed on real hardware in the field.",
    icon: "↺",
  },
  {
    title: "OTA Firmware Updates",
    desc: "Push new firmware to your entire fleet from the dashboard. Devices auto-update on next connection. Version tracked per device — no manual visits, no downtime.",
    icon: "↑",
  },
  {
    title: "Full Diagnostics",
    desc: "Every check-in reports battery level, signal strength, GPS fix status, uptime, and last reboot reason. Know device health at a glance — catch problems before they cause missed trips.",
    icon: "▣",
  },
  {
    title: "Multi-Tenant Fleet",
    desc: "Assign trackers to customer accounts. QR provisioning for self-onboarding — customers scan once and their devices appear. Each account sees only their fleet.",
    icon: "◻",
  },
];

const specs = [
  { label: "MCU",           value: "ESP32-WROOM-32" },
  { label: "Connectivity",  value: "A7672S-LASC (4G LTE)" },
  { label: "GPS",           value: "GP-02 (external, NMEA)" },
  { label: "Protocol",      value: "HTTPS (TLS 1.2 + SNI)" },
  { label: "Telemetry",     value: "Every 5s (configurable)" },
  { label: "Commands poll", value: "Every 30s" },
  { label: "Battery",       value: "LiPo 3.7V, ADC pin 34" },
  { label: "ADC scale",     value: "2.0× voltage divider" },
  { label: "Signal range",  value: "-57 to -65 dBm typical" },
  { label: "Soak tested",   value: "29/29 packets, 4m18s" },
];


export default function TrackerSolutionPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 border border-blue-500/30 bg-blue-500/8 px-3 py-1.5 rounded-full">
                GPS Fleet
              </span>
              <span className="text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2.5 py-1 rounded-full">
                Hardware Validated
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              EC Tracker —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                GPS Fleet Management
              </span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg">
              From SIM card to live fleet map in one platform — firmware, cloud, and dashboard
              all included. Plug in a device and see it on the map in minutes.
              Hardware-validated and running in production.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition">
                Get a Demo →
              </Link>
              <Link href="/hardware"
                className="inline-flex items-center gap-2 border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm px-6 py-3 rounded-full transition">
                View Hardware Specs
              </Link>
            </div>
          </div>

          {/* Live data mockup */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-5 font-mono text-xs space-y-2.5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-400 text-[10px] uppercase tracking-widest">Live device — EC-TRK-001</span>
              <span className="flex items-center gap-1.5 text-green-400 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
              </span>
            </div>
            {[
              { k: "lat",          v: "22.7499° N",   c: "text-blue-300" },
              { k: "lng",          v: "75.9006° E",   c: "text-blue-300" },
              { k: "gps_fix",      v: "true",          c: "text-green-400" },
              { k: "sats",         v: "9",             c: "text-white/70" },
              { k: "signal",       v: "-59 dBm",       c: "text-yellow-300" },
              { k: "bat",          v: "4.05V (88%)",   c: "text-green-400" },
              { k: "uptime",       v: "4m 18s",        c: "text-white/70" },
              { k: "pkt_sent",     v: "29",            c: "text-white/70" },
              { k: "pkt_failed",   v: "0",             c: "text-green-400" },
              { k: "reboot_reason",v: "POWERON",       c: "text-white/50" },
            ].map(row => (
              <div key={row.k} className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                <span className="text-white/30">{row.k}</span>
                <span className={row.c}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Everything included</h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto">
            Firmware libraries, cloud APIs, and dashboard panels — all production-tested on real GSM hardware.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <span className="text-2xl text-blue-400 mb-4 block">{f.icon}</span>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hardware Specs */}
      <section className="border-t border-white/8 bg-white/2 px-4 md:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-4">Hardware specs</h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                EC Tracker Board is based on ESP32-WROOM-32 with A7672S-LASC 4G module and external GP-02 GPS.
                Production validated — soak tested at 29/29 packets, signal -57 dBm, TTFF 17.4s.
              </p>
              <Link href="/hardware"
                className="inline-flex items-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-5 py-2.5 rounded-full transition">
                Full Hardware Docs →
              </Link>
            </div>
            <div className="bg-black/30 border border-white/8 rounded-xl overflow-hidden">
              {specs.map((s, i) => (
                <div key={s.label} className={`flex justify-between px-4 py-3 ${i < specs.length - 1 ? "border-b border-white/8" : ""}`}>
                  <span className="text-xs text-white/30">{s.label}</span>
                  <span className="text-xs text-white/65 font-medium font-mono">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you see */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">What you see for every vehicle</h2>
          <p className="text-white/40 text-sm">Updated every 5 seconds. View live on your dashboard or export via API.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Live Location",       desc: "Latitude, longitude, and GPS fix status — map updates in real time" },
            { label: "Battery Level",       desc: "Voltage and percentage — see which vehicles need charging" },
            { label: "Signal Strength",     desc: "Cellular dBm — know when a device is in a weak coverage zone" },
            { label: "GPS Satellites",      desc: "Satellite count and time-to-fix — validate location accuracy" },
            { label: "Device Uptime",       desc: "How long since last reboot — catch unexpected restarts" },
            { label: "Packet Reliability",  desc: "Packets sent vs failed — confirm your fleet is reporting consistently" },
          ].map(f => (
            <div key={f.label} className="bg-white/3 border border-white/8 rounded-xl p-4">
              <p className="text-sm font-semibold text-white/80 mb-1">{f.label}</p>
              <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to track your fleet?</h2>
        <p className="text-white/40 text-sm mb-8">
          Book a demo and we&apos;ll walk you through the full EC Tracker stack — firmware to dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition">
            Book a Demo →
          </Link>
          <Link href="/developers"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-7 py-3.5 rounded-full transition">
            View API Docs
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
