import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "EC Climate — Smart Building HVAC | EdgeConductor",
  description: "Multi-room HVAC automation with CO₂, temperature, and humidity monitoring. Tenant QR access, rule-based relay control, and live org dashboard. Production live.",
};

const features = [
  {
    title: "CO₂ + Temp + Humidity",
    desc: "BME280 sensor for temperature, humidity, and pressure. MH-Z19 NDIR sensor for CO₂ (0–5000 ppm). Both sampled every 5s and streamed to cloud via MQTT TLS.",
    icon: "◈",
    color: "cyan",
  },
  {
    title: "HVAC Relay Control",
    desc: "Dashboard HVAC toggle → PATCH shadow/desired → MQTT publish to device → relay switches ON/OFF. Latency < 2s. Simulator confirmed round-trip live. Hard override supported.",
    icon: "⚡",
    color: "yellow",
  },
  {
    title: "Multi-Room Architecture",
    desc: "Rooms inside organizations. Each room gets sensor cards (temp, humidity, CO₂, HVAC state) with 10s live refresh. Assign/unassign devices per room from the org dashboard.",
    icon: "◻",
    color: "blue",
  },
  {
    title: "Tenant QR Access",
    desc: "QR code per room → tenant scans → /claim-room flow → login or register → room portal. Tenant sees read-only climate view. room_members table stores the relationship.",
    icon: "▣",
    color: "purple",
  },
  {
    title: "IF/THEN Rules Engine",
    desc: "CO₂ > 1000 → relay ON. Temp > 28 → HVAC ON. Rules auto-evaluate every 30s via registry setInterval. No manual trigger — fires automatically and publishes to device over MQTT.",
    icon: "✦",
    color: "green",
  },
  {
    title: "Notification Bell",
    desc: "Org admins notified on firmware upload, device offline, rule triggers. Bell icon in OrgShell nav with unread badge. Auto-refreshes every 30s. Per-org notification table.",
    icon: "◎",
    color: "rose",
  },
];

const colorMap: Record<string, string> = {
  cyan:   "text-cyan-400",
  yellow: "text-yellow-400",
  blue:   "text-blue-400",
  purple: "text-purple-400",
  green:  "text-green-400",
  rose:   "text-rose-400",
};

const roles = [
  {
    role: "Super Admin",
    path: "/",
    desc: "Full platform view. See all orgs, all devices, assign devices to orgs, upload firmware, manage users.",
    caps: ["All orgs + devices", "Firmware upload", "User management", "Device assignment"],
  },
  {
    role: "Org Admin",
    path: "/org",
    desc: "Manage one organization. Rooms, devices, automation rules, HVAC control, OTA push, notifications.",
    caps: ["Room management", "HVAC control", "Rules engine", "Notification bell"],
  },
  {
    role: "Room Tenant",
    path: "/portal/room",
    desc: "Read-only climate view for the room they're assigned to. Scan QR to join — no manual setup needed.",
    caps: ["Live temp/hum/CO₂", "HVAC status", "Read-only", "QR access"],
  },
];

const sensors = [
  { label: "temp",        value: "°C (BME280)",       good: "18–24°C" },
  { label: "hum",         value: "% RH (BME280)",     good: "40–60%" },
  { label: "co2",         value: "ppm (MH-Z19)",      good: "< 1000 ppm" },
  { label: "relay",       value: "bool (HVAC state)",  good: "ON/OFF" },
  { label: "bat",         value: "V (LiPo ADC)",      good: "3.3–4.2V" },
  { label: "signal",      value: "dBm (WiFi RSSI)",   good: "> -70 dBm" },
  { label: "uptime",      value: "seconds",            good: "—" },
  { label: "heap",        value: "bytes free",         good: "> 50 KB" },
];

export default function ClimateSolutionPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 border border-cyan-500/30 bg-cyan-500/8 px-3 py-1.5 rounded-full">
                Smart Building
              </span>
              <span className="text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-1 rounded-full">
                Production Live
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              EC Climate —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Smart Building HVAC
              </span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg">
              Multi-room HVAC automation with CO₂, temperature, and humidity monitoring.
              Tenant QR access, IF/THEN rule automation, and live org dashboard.
              Running live at Germany Climate GmbH — office monitored 24/7.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition">
                Get a Demo →
              </Link>
              <Link href="/demo"
                className="inline-flex items-center gap-2 border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm px-6 py-3 rounded-full transition">
                Try Live Demo
              </Link>
            </div>
          </div>

          {/* Room sensor mockup */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono">Germany Climate GmbH</p>
                <p className="text-white font-semibold text-sm mt-0.5">Office — Main Building, 1F</p>
              </div>
              <span className="flex items-center gap-1.5 text-green-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Temperature", value: "24.3°C",   sub: "↑ 0.3 from 1h ago", color: "text-orange-300" },
                { label: "Humidity",    value: "58%",       sub: "Normal range",       color: "text-blue-300"   },
                { label: "CO₂",        value: "847 ppm",   sub: "Good air quality",   color: "text-purple-300" },
                { label: "HVAC",        value: "OFF",       sub: "Relay open",         color: "text-white/50"   },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-3">
                  <p className="text-white/35 text-[10px] uppercase tracking-wider mb-1">{s.label}</p>
                  <p className={`font-bold text-lg font-mono ${s.color}`}>{s.value}</p>
                  <p className="text-white/25 text-[10px] mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-500/8 border border-green-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">Active Rule</p>
                <p className="text-xs text-white/70 mt-0.5">IF CO₂ &gt; 1000 ppm → HVAC ON</p>
              </div>
              <span className="text-xs text-green-400 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Everything in one platform</h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto">
            Sensors, relay control, multi-tenant access, and automation — no third-party tools needed.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <span className={`text-2xl mb-4 block ${colorMap[f.color]}`}>{f.icon}</span>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role-based access */}
      <section className="border-t border-white/8 bg-white/2 px-4 md:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Three-tier access model</h2>
            <p className="text-white/40 text-sm">Every stakeholder gets the right view — no over-sharing, no under-sharing.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {roles.map(r => (
              <div key={r.role} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
                <p className="text-xs text-white/30 font-mono mb-1">{r.path}</p>
                <h3 className="font-bold text-lg mb-2">{r.role}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{r.desc}</p>
                <div className="space-y-1.5">
                  {r.caps.map(c => (
                    <div key={c} className="flex items-center gap-2 text-xs text-white/55">
                      <span className="text-green-400">✓</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sensor data */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Sensor data fields</h2>
          <p className="text-white/40 text-sm">Every 5s. Stored in Supabase. Shown live on dashboard.</p>
        </div>
        <div className="bg-black/30 border border-white/8 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 px-4 py-2.5 border-b border-white/8 text-[10px] text-white/25 uppercase tracking-wider">
            <span>Field</span><span>Value type</span><span>Good range</span>
          </div>
          {sensors.map((s, i) => (
            <div key={s.label} className={`grid grid-cols-3 px-4 py-3 ${i < sensors.length - 1 ? "border-b border-white/8" : ""}`}>
              <span className="text-xs font-mono text-cyan-300">{s.label}</span>
              <span className="text-xs text-white/45">{s.value}</span>
              <span className="text-xs text-green-400/70">{s.good}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Automate your building climate</h2>
        <p className="text-white/40 text-sm mb-8">
          See how Germany Climate GmbH uses EC Climate to monitor and control HVAC across multiple rooms automatically.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition">
            Book a Demo →
          </Link>
          <Link href="/demo"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-7 py-3.5 rounded-full transition">
            Try Live Demo
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
