import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "EC Home — Smart Home Automation | EdgeConductor",
  description: "Whole-home automation with smart switches, energy monitoring, scheduled rules, and family access via QR. Cloud-connected, hardware-agnostic.",
};

const features = [
  {
    icon: "⚡",
    title: "Smart Switch Control",
    desc: "Control lights, fans, AC, and appliances remotely. PATCH shadow/desired → MQTT → relay toggles in under 2 seconds. Hard override always available.",
    color: "yellow",
  },
  {
    icon: "◈",
    title: "Energy Monitoring",
    desc: "Per-circuit power consumption tracked in real time. Daily kWh totals, monthly trends, and spike alerts. Identify vampire loads and optimize usage.",
    color: "green",
  },
  {
    icon: "✦",
    title: "Schedule Automation",
    desc: "AT 22:00 → lights OFF. AT 07:00 Mon–Fri → geyser ON. Rules run server-side — fire even when phone is off. No hub required.",
    color: "blue",
  },
  {
    icon: "◎",
    title: "Family Access (QR)",
    desc: "QR code per home → family members scan → join portal. Each member gets device control access. Remove access anytime from admin panel.",
    color: "purple",
  },
  {
    icon: "▣",
    title: "Multi-Home Management",
    desc: "Manage apartment A + holiday home B from one dashboard. Each home is an org — separate device lists, rules, and members. White-label ready for builders.",
    color: "cyan",
  },
  {
    icon: "□",
    title: "OTA Firmware Updates",
    desc: "Push firmware to all home devices at once. Version pinning, rollback on failure, offline retry on reconnect. Zero-touch updates in the field.",
    color: "rose",
  },
];

const colorMap: Record<string, string> = {
  yellow: "text-yellow-400",
  green:  "text-green-400",
  blue:   "text-blue-400",
  purple: "text-purple-400",
  cyan:   "text-cyan-400",
  rose:   "text-rose-400",
};

const roles = [
  {
    role: "Home Owner",
    path: "/org",
    desc: "Full control. Manage all rooms, devices, schedules, and family members. View energy reports.",
    caps: ["All room control", "Schedule rules", "Family access", "Energy reports"],
  },
  {
    role: "Family Member",
    path: "/portal/room",
    desc: "Device control for their assigned rooms. Scan QR to join — no account setup needed.",
    caps: ["Device toggle", "Room status", "Live energy", "QR access"],
  },
  {
    role: "Property Manager",
    path: "/org",
    desc: "Manage multiple homes/apartments as separate orgs. Assign devices, push OTA, view fleet status.",
    caps: ["Multi-home view", "Device fleet", "OTA push", "Audit logs"],
  },
];

const sensors = [
  { label: "relay",    value: "bool (switch state)",       good: "ON / OFF" },
  { label: "power",    value: "W (current draw)",          good: "< rated load" },
  { label: "energy",   value: "kWh (daily total)",         good: "Trend tracking" },
  { label: "temp",     value: "°C (room temp, optional)",  good: "18–26°C" },
  { label: "motion",   value: "bool (PIR, optional)",      good: "Active/clear" },
  { label: "bat",      value: "V (backup battery)",        good: "3.3–4.2V" },
  { label: "signal",   value: "dBm (WiFi RSSI)",           good: "> -70 dBm" },
  { label: "uptime",   value: "seconds",                   good: "—" },
];

export default function HomeSolutionPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400 border border-yellow-500/30 bg-yellow-500/8 px-3 py-1.5 rounded-full">
                Smart Home
              </span>
              <span className="text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2.5 py-1 rounded-full">
                Available Now
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              EC Home —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Whole-Home Automation
              </span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg">
              Smart switches, energy monitoring, and schedule automation —
              all from one dashboard. Family QR access, no hub required,
              OTA firmware updates built in.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold px-6 py-3 rounded-full transition">
                Get a Demo →
              </Link>
              <Link href="/get-started"
                className="inline-flex items-center gap-2 border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm px-6 py-3 rounded-full transition">
                Start Free
              </Link>
            </div>
          </div>

          {/* Home dashboard mockup */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono">Sharma Residence</p>
                <p className="text-white font-semibold text-sm mt-0.5">Home — Indore</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/30 uppercase tracking-wider">Today</p>
                <p className="text-yellow-400 font-bold text-sm font-mono">3.2 kWh</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Living Room Light", value: "ON",   sub: "Since 6:30 PM",    color: "text-yellow-300", dot: "bg-yellow-400" },
                { label: "Bedroom Fan",       value: "OFF",  sub: "Schedule: 10 PM",  color: "text-white/40",   dot: "bg-white/20"   },
                { label: "AC (Master)",       value: "ON",   sub: "24°C setpoint",    color: "text-cyan-300",   dot: "bg-cyan-400"   },
                { label: "Geyser",            value: "OFF",  sub: "Schedule: 7 AM",   color: "text-white/40",   dot: "bg-white/20"   },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    <p className="text-white/35 text-[10px] uppercase tracking-wider leading-none">{s.label}</p>
                  </div>
                  <p className={`font-bold text-lg font-mono ${s.color}`}>{s.value}</p>
                  <p className="text-white/25 text-[10px] mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">Active Rule</p>
                <p className="text-xs text-white/70 mt-0.5">AT 22:00 daily → All lights OFF</p>
              </div>
              <span className="text-xs text-blue-400 font-semibold">Scheduled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Everything your home needs</h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto">
            One platform — control, monitoring, automation, and family access. No third-party apps.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <div className={`text-xl mb-3 ${colorMap[f.color]}`}>{f.icon}</div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="border-t border-white/8 bg-white/[0.015] px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Built for everyone in the home</h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              Owner controls everything. Family gets access. Property managers handle multiple homes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {roles.map(r => (
              <div key={r.role} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold">{r.role}</span>
                  <code className="text-xs text-white/25 font-mono">{r.path}</code>
                </div>
                <p className="text-white/40 text-sm mb-4 leading-relaxed">{r.desc}</p>
                <ul className="space-y-1.5">
                  {r.caps.map(c => (
                    <li key={c} className="flex items-center gap-2 text-xs text-white/50">
                      <span className="text-green-400">✓</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telemetry fields */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-3">Device telemetry fields</h2>
            <p className="text-white/40 text-sm mb-8 max-w-md">
              Each EC Home switch publishes these fields every 5s via MQTT.
              All values stored and queryable via REST API or SDK.
            </p>
            <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 px-5 py-2.5 border-b border-white/8 text-xs text-white/25 font-semibold uppercase tracking-wider">
                <span>Field</span><span>Type</span><span>Normal</span>
              </div>
              {sensors.map((s, i) => (
                <div key={s.label} className={`grid grid-cols-3 px-5 py-3 text-xs ${i < sensors.length - 1 ? "border-b border-white/6" : ""}`}>
                  <span className="font-mono text-yellow-400">{s.label}</span>
                  <span className="text-white/40">{s.value}</span>
                  <span className="text-white/30">{s.good}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-3">Use cases</h2>
            {[
              {
                title: "Residential Apartments",
                desc: "Developer builds smart home switches into apartments. Each flat is an org — owner gets QR access link at handover.",
                badge: "Most Popular",
                badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
              },
              {
                title: "Holiday Homes / AirBnB",
                desc: "Turn off all appliances remotely after guest checkout. Auto-schedule lights during stay. Monitor energy per booking.",
                badge: "Energy Saving",
                badgeColor: "text-green-400 bg-green-500/10 border-green-500/25",
              },
              {
                title: "Residential Societies",
                desc: "Society office controls common area lights, pumps, lifts. Residents get read-only energy view. Audit log for disputes.",
                badge: "Multi-tenant",
                badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
              },
            ].map(u => (
              <div key={u.title} className="bg-white/3 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-sm">{u.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${u.badgeColor}`}>{u.badge}</span>
                </div>
                <p className="text-white/35 text-xs leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/6 border border-yellow-500/20 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to automate your home?</h2>
          <p className="text-white/45 text-sm mb-8 max-w-md mx-auto">
            Start with 5 devices free. No credit card. Get live telemetry in under 10 minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/get-started"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold px-7 py-3 rounded-full transition">
              Start Free →
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm px-7 py-3 rounded-full transition">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
