import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "EdgeConductor — Connected Asset Platform for Hardware Companies",
  description:
    "Turn your hardware into a connected product. EdgeConductor is the complete connected asset platform — provisioning, live telemetry, remote control, OTA updates, multi-tenant dashboards, and white-label ready.",
  alternates: { canonical: "https://edgeconductor.com" },
};

const pillars = [
  {
    icon: "▣",
    title: "From Factory to Field in Minutes",
    desc: "Register assets, assign to client orgs, QR-code claiming — zero-touch onboarding. Your hardware is live and managed before it leaves the warehouse.",
    color: "blue",
  },
  {
    icon: "◈",
    title: "Know What's Happening, Anywhere",
    desc: "Live telemetry every 5 seconds. Battery, signal, GPS, sensor readings, crash history — your ops team has complete visibility. Weekly PDF reports auto-delivered.",
    color: "cyan",
  },
  {
    icon: "↑",
    title: "Update Every Device Remotely",
    desc: "Ship a firmware fix and push it to 1 or 1,000 devices from the dashboard. Offline devices get the update the moment they reconnect. No field visits.",
    color: "green",
  },
  {
    icon: "⚡",
    title: "Automate Operations at Scale",
    desc: "IF CO₂ > 1000 → HVAC ON. AT 22:00 Mon–Fri → relay OFF. Rules fire in 30 seconds and send webhooks to Telegram, Slack, or any system you already use.",
    color: "yellow",
  },
  {
    icon: "◎",
    title: "Deploy to Clients Without Building Infra",
    desc: "Multi-tenant from day one. Each client gets their own org, their own devices, their own users. You manage everything from one super admin view.",
    color: "purple",
  },
  {
    icon: "⬡",
    title: "Control Dashboards in Minutes",
    desc: "Drag-and-drop widget builder — toggle relay, set temperature, read sensors, see live charts. Your clients interact with real devices from a browser. No code.",
    color: "orange",
  },
  {
    icon: "□",
    title: "Integrate with Anything",
    desc: "JS SDK (npm), Python SDK (pip), REST API, MQTT, webhooks. Connect your own backend, n8n, Make.com, or any existing system. Open and programmable.",
    color: "rose",
  },
  {
    icon: "◈",
    title: "Sell Under Your Own Brand",
    desc: "White-label the entire platform. Your logo, your domain, your colors. Your clients see your product — not ours. Built for system integrators and hardware OEMs.",
    color: "violet",
  },
];

const colorMap: Record<string, string> = {
  blue:   "border-blue-500/20 bg-blue-500/5 text-blue-400",
  cyan:   "border-cyan-500/20 bg-cyan-500/5 text-cyan-400",
  green:  "border-green-500/20 bg-green-500/5 text-green-400",
  yellow: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
  purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
  rose:   "border-rose-500/20 bg-rose-500/5 text-rose-400",
  orange: "border-orange-500/20 bg-orange-500/5 text-orange-400",
  violet: "border-violet-500/20 bg-violet-500/5 text-violet-400",
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
  { value: "< 5s", label: "Telemetry to dashboard" },
  { value: "Weeks", label: "Time to ship your product" },
  { value: "White-label", label: "Your brand, our platform" },
  { value: "ESP32 → Cloud", label: "Full stack, one platform" },
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
              Connected Asset Platform
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Turn your hardware{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                into a connected product.
              </span>
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              EdgeConductor handles the entire connected product stack — provisioning, live telemetry,
              remote control, OTA firmware, rules automation, and B2B client dashboards.
              Ship your product in weeks. Scale to thousands of assets.
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
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">What You Get</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Everything to run your connected product business</h2>
          <p className="text-white/45 text-sm md:text-base max-w-xl mx-auto">
            Eight production-grade capabilities — built together, tested on real hardware, deployed with real clients.
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

      {/* ── DASHBOARD BUILDER ── */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase border border-orange-500/25 bg-orange-500/8 px-3 py-1.5 rounded-full">
              Dashboard Builder
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-5 mb-5 leading-tight">
              Drag-and-drop control dashboards.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Built for your hardware, branded as yours.
              </span>
            </h2>
            <p className="text-white/45 text-sm md:text-base leading-relaxed mb-8">
              Build custom IoT dashboards visually — no code. Place relay toggles, sensor charts,
              device status, and sliders anywhere on the canvas. Switch between Edit and Live mode.
              Every widget talks to your real device via shadow state in real time.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: "⬡", label: "Drag-and-drop grid layout", sub: "Resize and reposition any widget freely" },
                { icon: "⏻", label: "Toggle, Button, Slider", sub: "Control relay, LED, fan — bidirectional with device shadow" },
                { icon: "◈", label: "Metric cards + live charts", sub: "Temperature, humidity, CO₂ — updates every 10s" },
                { icon: "▶", label: "Live / Edit modes", sub: "Edit layout in Edit mode, interact with devices in Live mode" },
              ].map(f => (
                <div key={f.label} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm flex items-center justify-center shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white/80">{f.label}</p>
                    <p className="text-xs text-white/35">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/platform#dashboard"
              className="inline-flex items-center gap-2 border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 text-sm font-medium px-5 py-2.5 rounded-xl transition">
              See Dashboard Builder →
            </Link>
          </div>

          {/* Visual mockup */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest">Dashboard</p>
              <div className="flex gap-2">
                <span className="text-xs border border-orange-500/30 bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full">✏ Edit</span>
                <span className="text-xs border border-green-500/30 bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full">▶ Live</span>
              </div>
            </div>
            {/* Widget grid mockup */}
            <div className="grid grid-cols-3 gap-2">
              {/* Temp metric */}
              <div className="col-span-1 bg-gray-900/80 border border-white/8 rounded-xl p-3">
                <p className="text-[9px] text-gray-500 uppercase">Temperature</p>
                <p className="text-2xl font-bold font-mono text-green-400 mt-1">24.3<span className="text-xs text-gray-500 ml-0.5">°C</span></p>
                <p className="text-[9px] text-gray-700 mt-1">14:22:05</p>
              </div>
              {/* Hum metric */}
              <div className="col-span-1 bg-gray-900/80 border border-white/8 rounded-xl p-3">
                <p className="text-[9px] text-gray-500 uppercase">Humidity</p>
                <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">58<span className="text-xs text-gray-500 ml-0.5">%</span></p>
                <p className="text-[9px] text-gray-700 mt-1">14:22:05</p>
              </div>
              {/* Toggle */}
              <div className="col-span-1 bg-gray-900/80 border border-white/8 rounded-xl p-3">
                <p className="text-[9px] text-gray-500 uppercase">Relay</p>
                <p className="text-lg font-bold text-green-400 mt-1">ON</p>
                <div className="mt-1.5 w-full h-5 bg-green-500 rounded-full relative">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow block" />
                </div>
              </div>
            </div>
            {/* Chart mockup */}
            <div className="bg-gray-900/80 border border-white/8 rounded-xl p-3 col-span-3">
              <p className="text-[9px] text-gray-500 uppercase mb-2">CO₂ — Last 1h</p>
              <div className="flex items-end gap-0.5 h-12">
                {[60,55,65,70,58,80,85,75,72,68,73,78,82,88,91,85,79,83,87,90].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500/40 rounded-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            {/* Slider mockup */}
            <div className="bg-gray-900/80 border border-white/8 rounded-xl p-3">
              <p className="text-[9px] text-gray-500 uppercase">Setpoint</p>
              <p className="text-lg font-bold font-mono text-blue-400">22<span className="text-xs text-gray-500 ml-0.5">°C</span></p>
              <div className="mt-1.5 w-full h-1.5 bg-gray-700 rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-2/5 bg-blue-500 rounded-full" />
                <span className="absolute top-1/2 left-[40%] -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow block -ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHITE LABEL ── */}
      <section className="border-y border-white/8 bg-gradient-to-br from-violet-500/5 to-purple-500/3 px-4 md:px-8 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase border border-violet-500/25 bg-violet-500/8 px-3 py-1.5 rounded-full">
              White Label
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-5 mb-5 leading-tight">
              Your brand. Your domain.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                Our platform.
              </span>
            </h2>
            <p className="text-white/45 text-sm md:text-base leading-relaxed mb-8">
              Deploy EdgeConductor under your own product name. Your clients see your logo,
              your domain, your colors — with the full IoT platform running underneath.
              Built for system integrators, ISVs, and hardware companies that want to ship faster.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: "◈", title: "Custom branding", desc: "Your logo, colors, and company name across all dashboards" },
                { icon: "▣", title: "Custom domain", desc: "dashboard.yourcompany.com — your URL, your SSL cert" },
                { icon: "⚡", title: "Resell as your own", desc: "Charge your clients directly — we stay invisible" },
                { icon: "□", title: "Per-org theming", desc: "Each client org can have its own branding and access rules" },
              ].map(f => (
                <div key={f.title} className="bg-white/3 border border-white/8 rounded-xl p-4 hover:border-violet-500/20 transition">
                  <p className="text-violet-400 text-lg mb-2">{f.icon}</p>
                  <p className="text-sm font-semibold text-white/80 mb-1">{f.title}</p>
                  <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact"
                className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition">
                Talk to us about White Label →
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-6 py-3 rounded-full transition">
                View Pricing
              </Link>
            </div>
          </div>

          {/* Right — who it's for */}
          <div className="space-y-4">
            <p className="text-xs text-white/25 uppercase tracking-widest font-medium mb-6">Who uses White Label</p>
            {[
              {
                tag: "System Integrators",
                desc: "You build, install, and service IoT systems for clients. Deploy your own branded portal — no need to build the platform yourself.",
                chips: ["Your brand", "Faster delivery", "Client isolation"],
              },
              {
                tag: "Hardware OEMs",
                desc: "You manufacture ESP32 boards or sensors. Bundle the cloud platform with your hardware — sell a complete product, not just a board.",
                chips: ["Device + Cloud", "Recurring revenue", "Managed service"],
              },
              {
                tag: "SaaS Resellers",
                desc: "You already sell B2B software. Add IoT telemetry, HVAC control, and fleet tracking to your existing product suite under your name.",
                chips: ["Expand product", "No IoT infra", "White-glove setup"],
              },
            ].map(w => (
              <div key={w.tag} className="bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-violet-500/20 transition">
                <p className="font-semibold text-white/80 mb-1.5">{w.tag}</p>
                <p className="text-sm text-white/40 leading-relaxed mb-3">{w.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {w.chips.map(c => (
                    <span key={c} className="text-xs bg-violet-500/10 text-violet-400/70 border border-violet-500/15 px-2.5 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

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

      {/* ── SECURITY TRUST STRIP ── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-2">Security & Compliance</p>
            <h2 className="text-xl md:text-2xl font-bold text-white/80">Enterprise-grade security, built in from day one</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              { icon: "🔒", label: "TLS 1.3",              sub: "All traffic encrypted" },
              { icon: "🛡", label: "RBAC",                 sub: "Role-based access" },
              { icon: "🏢", label: "Tenant Isolation",     sub: "Org-level data walls" },
              { icon: "📋", label: "Audit Logs",           sub: "Immutable event trail" },
              { icon: "✅", label: "GDPR Ready",           sub: "Data residency control" },
              { icon: "🔑", label: "API Key Scoping",      sub: "Per-key permissions" },
            ].map(b => (
              <div key={b.label} className="bg-white/3 border border-white/8 rounded-xl p-4 text-center hover:border-white/15 transition">
                <div className="text-xl mb-2">{b.icon}</div>
                <div className="text-xs font-semibold text-white/70 mb-0.5">{b.label}</div>
                <div className="text-xs text-white/25">{b.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/security" className="text-sm text-white/40 hover:text-white/70 transition underline underline-offset-4">
              View full security overview →
            </Link>
          </div>
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
