import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "EdgeConductor — IoT Platform for Hardware Companies",
  description:
    "The complete IoT stack for hardware teams. Device provisioning, live telemetry, OTA firmware updates, B2B multi-tenant dashboards, and rules engine — all in one platform.",
  alternates: { canonical: "https://edgeconductor.com" },
};

const pillars = [
  {
    icon: "▣",
    title: "Device Registry & Provisioning",
    desc: "Register devices, assign to organizations, QR-code claiming — zero-touch onboarding from factory to field.",
    color: "blue",
  },
  {
    icon: "◈",
    title: "Live Telemetry & Diagnostics",
    desc: "Real-time sensor data with 1h/6h/24h/7d historical charts. Battery, signal, heap, GPS fix, reboot reason — every metric your ops team needs. Weekly PDF reports included.",
    color: "cyan",
  },
  {
    icon: "↑",
    title: "OTA Firmware Updates",
    desc: "Push firmware to devices in the field, track pending updates, automatic push on reconnect. Rollback supported.",
    color: "green",
  },
  {
    icon: "⚡",
    title: "Rules Engine & Automation",
    desc: "Threshold rules (IF CO₂ > 1000 → HVAC ON) and scheduled rules (AT 22:00 Mon–Fri → relay OFF). Webhook alerts fire to any URL — Telegram, Slack, n8n, Make.com.",
    color: "yellow",
  },
  {
    icon: "◎",
    title: "Multi-Tenant B2B Architecture",
    desc: "Org Admin → Room → Tenant hierarchy. RBAC with admin, org_admin, and customer roles. Tenant QR access per room. White-label ready.",
    color: "purple",
  },
  {
    icon: "□",
    title: "SDK + Open API",
    desc: "Official JS (npm) and Python (pip) SDKs. REST API + MQTT. Connect any system — Raspberry Pi, Ubuntu server, n8n, Make.com, or your own app.",
    color: "rose",
  },
];

const colorMap: Record<string, string> = {
  blue:   "border-blue-500/20 bg-blue-500/5 text-blue-400",
  cyan:   "border-cyan-500/20 bg-cyan-500/5 text-cyan-400",
  green:  "border-green-500/20 bg-green-500/5 text-green-400",
  yellow: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
  purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
  rose:   "border-rose-500/20 bg-rose-500/5 text-rose-400",
};

const lifecycle = [
  { step: "01", label: "Manufacture", icon: "⚙" },
  { step: "02", label: "Register", icon: "▣" },
  { step: "03", label: "Ship", icon: "→" },
  { step: "04", label: "QR Claim", icon: "◻" },
  { step: "05", label: "Monitor", icon: "◈" },
  { step: "06", label: "Configure", icon: "✦" },
  { step: "07", label: "OTA Update", icon: "↑" },
  { step: "08", label: "Diagnose", icon: "◎" },
];

const solutions = [
  {
    tag: "GPS Fleet",
    name: "EC Tracker",
    desc: "Full-stack GPS fleet management. GSM connectivity (A7672S), real-time map, geofence alerts, remote reboot, and OTA — on a single ESP32 board.",
    chips: ["ESP32 + A7672S GSM", "Live GPS Map", "Geofence Alerts", "Remote Reboot", "OTA"],
    href: "/solutions/tracker",
    color: "blue",
    liveLabel: "Hardware Validated",
  },
  {
    tag: "Smart Building",
    name: "EC Climate",
    desc: "Multi-room HVAC automation with CO₂, temperature, and humidity sensors. Tenant QR access, rule-based relay control, live org dashboard.",
    chips: ["BME280 + MH-Z19", "HVAC Relay Control", "Multi-Room", "Tenant QR Access", "IF/THEN Rules"],
    href: "/solutions/climate",
    color: "cyan",
    liveLabel: "Production Live",
  },
  {
    tag: "Residential",
    name: "EC Home",
    desc: "Smart home relay control, energy monitoring, and scene automation. Works with ESP32 and Raspberry Pi. Customer-facing mobile app included.",
    chips: ["Relay Control", "Energy Monitor", "Scenes", "Mobile App", "Voice Ready"],
    href: "/solutions/home",
    color: "green",
    liveLabel: "Coming Soon",
  },
];

const hardware = [
  {
    name: "EC Tracker Board",
    desc: "ESP32 + A7672S-LASC GSM + external GP-02 GPS. HTTPS telemetry, remote reboot, diagnostics. Hardware validated end-to-end.",
    chips: ["ESP32", "A7672S GSM", "GP-02 GPS", "LiPo Battery"],
  },
  {
    name: "EC Climate Board",
    desc: "ESP32 + BME280 humidity/temp + MH-Z19 CO₂ sensor + relay. WiFi MQTT. Multi-room building automation ready.",
    chips: ["ESP32", "BME280", "MH-Z19 CO₂", "Relay Module"],
  },
  {
    name: "EC Gateway",
    desc: "Raspberry Pi Linux gateway for BACnet, Modbus, and legacy HVAC systems. Bridge to EdgeConductor cloud via MQTT.",
    chips: ["Raspberry Pi", "BACnet", "Modbus RTU", "MQTT Bridge"],
  },
];

const stats = [
  { value: "< 5s", label: "Telemetry latency" },
  { value: "MQTT + HTTPS", label: "Dual connectivity" },
  { value: "Multi-tenant", label: "B2B ready" },
  { value: "ESP32 → Cloud", label: "Full vertical" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-4 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32 max-w-7xl mx-auto">

        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-12 md:gap-8 items-center">

          {/* Left — copy */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5 border border-blue-500/30 bg-blue-500/8 px-3 py-1.5 rounded-full">
              IoT Platform for Hardware Companies
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              The Complete IoT Stack{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                for Hardware Teams.
              </span>
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              From ESP32 firmware to B2B cloud dashboards — device provisioning, live telemetry,
              OTA updates, and multi-tenant access. One platform so your team ships products,
              not infrastructure.
            </p>

            {/* 3 CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition">
                Book a Demo →
              </Link>
              <Link href="/demo"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium px-6 py-3 rounded-full transition">
                Try Live Demo
              </Link>
              <Link href="/get-started"
                className="inline-flex items-center justify-center gap-2 text-white/50 hover:text-white text-sm font-medium px-4 py-3 transition">
                Get Started Free →
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/35">
              <span>✓ Free tier available</span>
              <span>✓ No credit card required</span>
              <span>✓ Live in 10 minutes</span>
            </div>
          </div>

          {/* Right — Platform flow diagram */}
          <div className="relative hidden md:block">
            <div className="bg-white/3 border border-white/10 rounded-2xl p-6 space-y-3">
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">Platform architecture</p>

              {/* Device layer */}
              <div className="flex gap-2">
                {["ESP32 Tracker", "ESP32 Climate", "GSM Module"].map(d => (
                  <div key={d} className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse block" />
                    </div>
                    <p className="text-xs text-blue-300/70 leading-tight">{d}</p>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 px-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/20 text-xs font-mono">MQTT / HTTPS</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Cloud layer */}
              <div className="grid grid-cols-4 gap-2">
                {["Registry", "Telemetry", "OTA", "Config"].map(s => (
                  <div key={s} className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-white/40">{s}</p>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 px-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/20 text-xs font-mono">Supabase</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Dashboard layer */}
              <div className="flex gap-2">
                {["Admin Dashboard", "Org Portal", "Mobile App"].map(d => (
                  <div key={d} className="flex-1 bg-green-500/8 border border-green-500/15 rounded-xl p-3 text-center">
                    <p className="text-xs text-green-300/60 leading-tight">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-white/8 bg-white/2 px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <p className="text-white/30 text-xs font-medium uppercase tracking-widest shrink-0">
            Powering connected products at
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {["DPS School", "Germany Climate GmbH"].map(c => (
              <span key={c} className="text-white/50 text-sm font-medium">{c}</span>
            ))}
            <span className="text-white/20 text-xs border border-white/10 px-3 py-1 rounded-full">
              + your company next?
            </span>
          </div>
        </div>
      </section>

      {/* ── PLATFORM PILLARS ── */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">What&apos;s Inside</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Everything your IoT product needs</h2>
          <p className="text-white/45 text-sm md:text-base max-w-xl mx-auto">
            Six production-grade capabilities — built together, tested on real hardware, deployed in live products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map(p => (
            <div key={p.title}
              className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/5 transition group">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg mb-5 ${colorMap[p.color]}`}>
                {p.icon}
              </div>
              <h3 className="font-semibold mb-2 text-white group-hover:text-white transition">{p.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-y border-white/8 bg-white/2 px-4 md:px-8 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Device Lifecycle</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">From chip to cloud, end to end</h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">
              EdgeConductor handles every stage — you only focus on your product.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {lifecycle.map((item, i) => (
              <div key={item.step} className="flex flex-col items-center text-center group">
                <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition">
                  <span className="text-white/50 text-lg group-hover:text-blue-400 transition">{item.icon}</span>
                  {i < lifecycle.length - 1 && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-3 h-px bg-white/15 hidden lg:block" />
                  )}
                </div>
                <span className="text-[10px] text-white/25 font-mono">{item.step}</span>
                <span className="text-xs text-white/55 mt-0.5 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Vertical Solutions</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Built for real product categories</h2>
          <p className="text-white/45 text-sm md:text-base max-w-xl mx-auto">
            Not generic IoT infrastructure — complete, vertical solutions your team can deploy as-is or customize.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map(s => {
            const c = colorMap[s.color]
            return (
              <div key={s.name} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${c}`}>
                    {s.tag}
                  </span>
                  <span className={`text-xs font-medium border px-2.5 py-1 rounded-full ${
                    s.liveLabel === 'Production Live' ? 'text-green-400 bg-green-500/10 border-green-500/25' :
                    s.liveLabel === 'Hardware Validated' ? 'text-blue-400 bg-blue-500/10 border-blue-500/25' :
                    'text-white/30 bg-white/5 border-white/10'
                  }`}>
                    {s.liveLabel}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {s.chips.map(c => (
                    <span key={c} className="text-xs bg-white/8 text-white/45 px-2.5 py-1 rounded-full border border-white/8">{c}</span>
                  ))}
                </div>
                <Link href={s.href}
                  className="text-sm text-white/50 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2 rounded-xl transition text-center">
                  Learn more →
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── HARDWARE ── */}
      <section className="border-y border-white/8 bg-white/2 px-4 md:px-8 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Hardware Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">Reference designs, production validated</h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">
              Each board has validated firmware, cloud integration, and diagnostics built in. Also works with your existing ESP32 or Raspberry Pi hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {hardware.map(h => (
              <div key={h.name} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-lg mb-4">
                  ▣
                </div>
                <h3 className="font-semibold mb-2">{h.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{h.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {h.chips.map(c => (
                    <span key={c} className="text-xs bg-white/8 text-white/40 px-2 py-1 rounded-full border border-white/8">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/30 text-xs mt-8">
            Works with any ESP32 / ESP8266 / Raspberry Pi hardware ·{" "}
            <Link href="/hardware" className="text-white/50 hover:text-white transition underline underline-offset-2">
              View full hardware docs →
            </Link>
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-white/35 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRIPLE CTA ── */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">

          {/* Book a Demo */}
          <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border border-blue-500/25 rounded-2xl p-7 flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-4">B2B Sales</span>
            <h3 className="text-xl font-bold mb-3">Book a Demo</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-6 flex-1">
              Talk to our team. We&apos;ll walk you through the platform, discuss your product requirements, and scope a deployment plan.
            </p>
            <Link href="/contact"
              className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition">
              Schedule a call →
            </Link>
          </div>

          {/* Try Live Demo */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-7 flex flex-col hover:border-white/20 transition">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Live Now</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Try Live Demo</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-6 flex-1">
              Explore the real platform with a live device simulator running. See telemetry, HVAC control, OTA, and diagnostics — no signup needed.
            </p>
            <Link href="/demo"
              className="inline-flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium px-5 py-3 rounded-xl transition">
              Open demo →
            </Link>
          </div>

          {/* Get Started Free */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-7 flex flex-col hover:border-white/20 transition">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/35 mb-4">Self-Serve</span>
            <h3 className="text-xl font-bold mb-3">Get Started Free</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-6 flex-1">
              Create an account, register your first device, and have live telemetry flowing in under 10 minutes. Free tier — 5 devices, 1 org.
            </p>
            <Link href="/get-started"
              className="inline-flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium px-5 py-3 rounded-xl transition">
              Start for free →
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
