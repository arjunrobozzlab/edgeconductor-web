import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "EdgeConductor — Connected Asset Platform for Hardware Companies",
  description:
    "Don't build IoT infrastructure. EdgeConductor gives hardware companies device registry, live telemetry, OTA updates, remote control, and white-label B2B dashboards — out of the box. Ship in weeks, not years.",
  alternates: { canonical: "https://edgeconductor.com" },
};

const capabilities = [
  {
    icon: "▣",
    title: "From Factory to Field in Minutes",
    desc: "Register assets, assign to client orgs, QR-code claiming — zero-touch onboarding. Your hardware is live and managed before it leaves the warehouse.",
    color: "blue",
  },
  {
    icon: "◈",
    title: "Know What's Happening, Anywhere",
    desc: "Live telemetry every 5 seconds. Battery, signal, GPS, sensor readings, crash history — your ops team has complete visibility. PDF reports auto-delivered.",
    color: "cyan",
  },
  {
    icon: "↑",
    title: "Update Every Device Remotely",
    desc: "Ship a firmware fix and push it to 1 or 10,000 devices from the dashboard. Offline devices get the update the moment they reconnect. No field visits.",
    color: "green",
  },
  {
    icon: "⚡",
    title: "Automate Operations at Scale",
    desc: "IF CO₂ > 1000 → HVAC ON. AT 22:00 Mon–Fri → relay OFF. Rules evaluate in under 30 seconds and fire webhooks to Telegram, Slack, or any system.",
    color: "yellow",
  },
  {
    icon: "◎",
    title: "Deploy to Clients Without Building Infra",
    desc: "Multi-tenant from day one. Each client gets their own org, devices, and users. You manage everything from one super admin view with full audit trails.",
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

const solutions = [
  {
    tag: "GPS Fleet",
    name: "EC Tracker",
    desc: "Full-stack GPS fleet management. Cellular connectivity, real-time map, geofence alerts, remote reboot, and OTA — from a single cloud dashboard.",
    chips: ["Cellular GSM", "Live GPS Map", "Geofence Alerts", "Remote Reboot", "OTA"],
    href: "/solutions/tracker",
    color: "blue",
    liveLabel: "Hardware Validated",
  },
  {
    tag: "Smart Building",
    name: "EC Climate",
    desc: "Multi-room HVAC automation with CO₂, temperature, and humidity sensors. Tenant QR access, rule-based relay control, live org dashboard.",
    chips: ["CO₂ + Temp + RH", "HVAC Relay Control", "Multi-Room", "Tenant QR Access", "IF/THEN Rules"],
    href: "/solutions/climate",
    color: "cyan",
    liveLabel: "Production Live",
  },
  {
    tag: "Residential",
    name: "EC Home",
    desc: "Smart home relay control, energy monitoring, and scene automation. Customer-facing mobile app included. White-label ready.",
    chips: ["Relay Control", "Energy Monitor", "Scenes", "Mobile App", "Voice Ready"],
    href: "/solutions/home",
    color: "green",
    liveLabel: "Coming Soon",
  },
];

const stats = [
  { value: "10 min", label: "First device sending live telemetry" },
  { value: "6 weeks", label: "Typical time to first client deployment" },
  { value: "Zero", label: "Cloud infrastructure to build or maintain" },
  { value: "10,000+", label: "Assets supported per deployment" },
];

const buildVsBuy = [
  { task: "MQTT broker + DevOps", diy: "2–3 months" },
  { task: "Device registry & database", diy: "2 months" },
  { task: "OTA update pipeline", diy: "3 months" },
  { task: "Multi-tenant architecture", diy: "3 months" },
  { task: "Dashboard & frontend", diy: "4 months" },
  { task: "REST API + documentation", diy: "2 months" },
  { task: "Security, RBAC, audit logs", diy: "2 months" },
  { task: "Ongoing infra maintenance", diy: "Forever" },
];

const personas = [
  {
    color: "blue",
    icon: "▣",
    who: "Hardware OEMs",
    pain: "You manufacture connected hardware. Your clients expect a cloud portal, live data, and OTA updates — but you're spending engineering time building cloud infra instead of improving your product.",
    outcomes: [
      "Ship a connected product, not just hardware",
      "Add recurring SaaS revenue to your business model",
      "Push OTA updates to your entire fleet remotely",
      "White-label the portal under your product brand",
    ],
  },
  {
    color: "cyan",
    icon: "◎",
    who: "System Integrators",
    pain: "You win IoT contracts and deploy for enterprise clients. Every project from scratch means 12+ months of platform-building before you deliver value. That's margin you're burning.",
    outcomes: [
      "Deliver a white-labeled client portal in weeks",
      "Your brand, your domain, your margin",
      "Zero infrastructure to build or maintain",
      "Manage unlimited client orgs from one admin",
    ],
  },
  {
    color: "violet",
    icon: "⬡",
    who: "Enterprise Operations",
    pain: "You have hundreds of assets in the field — vehicles, machines, buildings — with no real-time visibility, no remote control, and no way to push updates without field visits.",
    outcomes: [
      "Real-time asset telemetry and diagnostics",
      "Remote relay control and configuration",
      "Automated alerts when thresholds are breached",
      "OTA firmware — no site visits required",
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-4 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32 max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Left — copy */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5 border border-blue-500/30 bg-blue-500/8 px-3 py-1.5 rounded-full">
              Connected Asset Platform
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              Don&apos;t build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                IoT infrastructure.
              </span>
              <br />
              Build your product.
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-3 max-w-lg">
              Most hardware companies burn <strong className="text-white/70">12–18 months</strong> and <strong className="text-white/70">$300K+</strong> building
              cloud infrastructure before shipping a single connected product.
            </p>
            <p className="text-white/45 text-base leading-relaxed mb-8 max-w-lg">
              EdgeConductor gives you the entire stack — device registry, live telemetry, remote control,
              OTA firmware, rules automation, and B2B dashboards — out of the box.
              First device live in 10 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-3.5 rounded-full transition">
                Book a Demo →
              </Link>
              <Link href="/demo"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium px-6 py-3.5 rounded-full transition">
                Try Live Demo
              </Link>
              <Link href="/get-started"
                className="inline-flex items-center justify-center gap-2 text-white/45 hover:text-white text-sm font-medium px-4 py-3.5 transition">
                Get Started Free →
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/30">
              <span>✓ Free tier available</span>
              <span>✓ No credit card required</span>
              <span>✓ Live in 10 minutes</span>
            </div>
          </div>

          {/* Right — Live platform dashboard mockup */}
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Dashboard header bar */}
              <div className="border-b border-white/8 px-4 py-3 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[6px] font-black text-white">EC</div>
                  <span className="text-xs font-medium text-white/50">Acme IoT Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/20 font-mono">3 orgs · 847 assets</span>
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 text-blue-300 text-[8px] font-bold flex items-center justify-center">A</div>
                </div>
              </div>

              {/* Asset health summary */}
              <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/8">
                {[
                  { value: "847", label: "Assets Online", color: "text-green-400", bg: "bg-green-500/5" },
                  { value: "12", label: "Pending OTA", color: "text-yellow-400", bg: "bg-yellow-500/5" },
                  { value: "3", label: "Active Alerts", color: "text-red-400", bg: "bg-red-500/5" },
                ].map(s => (
                  <div key={s.label} className={`${s.bg} px-4 py-3 text-center`}>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[9px] text-white/25 mt-0.5 uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Live telemetry feed */}
              <div className="p-4 space-y-2">
                <p className="text-[9px] text-white/20 uppercase tracking-widest mb-3 font-semibold">Live Asset Feed</p>
                {[
                  { id: "Fleet_VH_021", val: "48.23°N  11.54°E", type: "GPS", dot: "bg-green-400" },
                  { id: "HVAC_Floor_03", val: "24.1°C  58% RH", type: "Climate", dot: "bg-green-400" },
                  { id: "Pump_Station_A", val: "2.4 bar  RELAY ON", type: "Industrial", dot: "bg-yellow-400 animate-pulse" },
                  { id: "Tracker_042", val: "Signal lost · 8m ago", type: "GPS", dot: "bg-red-400" },
                ].map(a => (
                  <div key={a.id} className="flex items-center gap-3 bg-white/[0.02] border border-white/6 rounded-lg px-3 py-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`} />
                    <span className="text-xs font-mono text-white/55 flex-1 truncate">{a.id}</span>
                    <span className="text-[10px] text-white/28 shrink-0">{a.val}</span>
                  </div>
                ))}
              </div>

              {/* OTA progress bar */}
              <div className="border-t border-white/6 mx-4 mb-4 pt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-white/35 font-medium">OTA Campaign — firmware v2.1.4</span>
                  <span className="text-[10px] text-blue-400 font-mono">607 / 847</span>
                </div>
                <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                </div>
                <p className="text-[9px] text-white/20 mt-1">72% complete · ~14 min remaining</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest shrink-0">
            Powering connected products at
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {["DPS School", "Germany Climate GmbH"].map(c => (
              <span key={c} className="text-white/45 text-sm font-medium">{c}</span>
            ))}
            <span className="text-white/18 text-xs border border-white/8 px-3 py-1 rounded-full">
              + your company next?
            </span>
          </div>
        </div>
      </section>

      {/* ── PLATFORM LAYER ── */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">What EdgeConductor Is</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            The platform between your hardware and your business
          </h2>
          <p className="text-white/45 text-sm md:text-base max-w-2xl mx-auto">
            You own the hardware. Your clients run the business. EdgeConductor is the
            production-grade infrastructure layer that connects them — securely, scalably, and under your brand.
          </p>
        </div>

        {/* Three-tier architecture */}
        <div className="space-y-1">
          {/* Tier 1: Hardware */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5">
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-semibold mb-3">Your Hardware — Any device, any protocol</p>
            <div className="flex flex-wrap gap-2">
              {["Fleet Vehicles", "HVAC Systems", "Industrial Machines", "Smart Buildings", "Field Sensors", "Cold Chain Assets", "Medical Equipment", "Any IoT Device"].map(d => (
                <span key={d} className="text-xs bg-white/5 border border-white/8 px-3 py-1.5 rounded-full text-white/45">{d}</span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center py-1">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-3 bg-white/12" />
              <span className="text-[9px] text-white/18 font-mono tracking-wider">MQTT · HTTPS · REST</span>
              <div className="w-px h-3 bg-white/12" />
            </div>
          </div>

          {/* Tier 2: EdgeConductor */}
          <div className="border border-blue-500/30 bg-gradient-to-br from-blue-500/8 via-blue-500/5 to-cyan-500/5 rounded-2xl px-6 py-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[7px] font-black text-white shrink-0">EC</div>
              <p className="text-xs text-blue-400 uppercase tracking-widest font-bold">EdgeConductor Platform</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                "Device Registry", "Live Telemetry", "OTA Updates", "Remote Control",
                "Rules Engine", "Multi-Tenant B2B", "White-Label", "SDK + REST API",
              ].map(s => (
                <div key={s} className="bg-blue-500/10 border border-blue-500/15 rounded-lg px-3 py-2 text-center">
                  <p className="text-xs text-blue-300/65 font-medium">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center py-1">
            <div className="w-px h-6 bg-white/12" />
          </div>

          {/* Tier 3: Business */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5">
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-semibold mb-3">Your Business — Operators, clients, and partners</p>
            <div className="flex flex-wrap gap-2">
              {["Operations Dashboard", "Client Org Portals", "Partner Admin", "Mobile Access", "API Integrations", "Webhooks & Alerts"].map(d => (
                <span key={d} className="text-xs bg-white/5 border border-white/8 px-3 py-1.5 rounded-full text-white/45">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BUILD VS BUY ── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Why EdgeConductor</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              The IoT infrastructure tax. We&apos;ve already paid it.
            </h2>
            <p className="text-white/45 text-sm max-w-xl mx-auto">
              Every team that builds a connected product faces the same decision.
              Here&apos;s what it actually costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Build it yourself */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                <p className="text-sm font-semibold text-white/50">Building it yourself</p>
              </div>
              <div className="space-y-2.5 mb-6">
                {buildVsBuy.map(r => (
                  <div key={r.task} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-red-500/50 text-xs shrink-0">✕</span>
                      <span className="text-sm text-white/35">{r.task}</span>
                    </div>
                    <span className="text-xs font-mono text-white/25 shrink-0">{r.diy}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/8 pt-4">
                <p className="text-sm font-semibold text-white/40">18 months · 3 engineers</p>
                <p className="text-xs text-white/25 mt-0.5">$200K–$500K before you ship a single product</p>
              </div>
            </div>

            {/* EdgeConductor */}
            <div className="bg-gradient-to-br from-blue-500/8 to-cyan-500/5 border border-blue-500/25 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <p className="text-sm font-semibold text-blue-300/80">EdgeConductor</p>
              </div>
              <div className="space-y-2.5 mb-6">
                {[
                  { task: "Device registry + MQTT", when: "Day 1" },
                  { task: "Live telemetry streaming", when: "10 minutes" },
                  { task: "OTA firmware campaigns", when: "Day 1" },
                  { task: "Multi-tenant B2B architecture", when: "Day 1" },
                  { task: "Drag-drop dashboard builder", when: "30 minutes" },
                  { task: "REST API + webhooks", when: "Day 1" },
                  { task: "TLS encryption + RBAC + audit logs", when: "Built in" },
                  { task: "Infrastructure maintenance", when: "We own it" },
                ].map(r => (
                  <div key={r.task} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-green-400 text-xs shrink-0">✓</span>
                      <span className="text-sm text-white/60">{r.task}</span>
                    </div>
                    <span className="text-xs font-mono text-blue-400/70 shrink-0">{r.when}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-blue-500/20 pt-4">
                <p className="text-sm font-semibold text-white/80">First device live in 10 minutes</p>
                <p className="text-xs text-white/40 mt-0.5">First client deployment in 6 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Platform Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Everything to run your connected product business</h2>
          <p className="text-white/45 text-sm md:text-base max-w-xl mx-auto">
            Eight production-grade capabilities — built together, tested on real hardware, deployed with real clients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map(p => (
            <div key={p.title}
              className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/18 hover:bg-white/[0.05] transition group">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base mb-4 ${colorMap[p.color]}`}>
                {p.icon}
              </div>
              <h3 className="font-semibold text-sm mb-2 text-white/85 group-hover:text-white transition leading-snug">{p.title}</h3>
              <p className="text-white/38 text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Who Uses EdgeConductor</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Built for your business model</h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">
              Whether you manufacture hardware, deploy for clients, or operate distributed assets —
              EdgeConductor is built for your specific use case.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {personas.map(p => {
              const cMap: Record<string, { tag: string; border: string; icon: string }> = {
                blue:   { tag: "text-blue-400 bg-blue-500/10 border-blue-500/25", border: "border-blue-500/20", icon: "text-blue-400" },
                cyan:   { tag: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25", border: "border-cyan-500/20", icon: "text-cyan-400" },
                violet: { tag: "text-violet-400 bg-violet-500/10 border-violet-500/25", border: "border-violet-500/20", icon: "text-violet-400" },
              };
              const c = cMap[p.color];
              return (
                <div key={p.who} className={`bg-white/[0.03] border ${c.border} rounded-2xl p-6 hover:bg-white/[0.05] transition`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg mb-4 ${c.tag}`}>
                    {p.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full ${c.tag}`}>
                    {p.who}
                  </span>
                  <p className="text-white/40 text-sm leading-relaxed mt-4 mb-5">{p.pain}</p>
                  <ul className="space-y-2">
                    {p.outcomes.map(o => (
                      <li key={o} className="flex items-start gap-2 text-xs text-white/55">
                        <span className={`${c.icon} shrink-0 mt-0.5`}>→</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/partners"
              className="inline-flex items-center gap-2 border border-white/15 text-white/45 hover:text-white hover:border-white/30 text-sm px-5 py-2.5 rounded-full transition">
              View Partner Program →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Vertical Solutions</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Complete solutions for real product categories</h2>
          <p className="text-white/45 text-sm md:text-base max-w-xl mx-auto">
            Not generic IoT infrastructure — complete, vertical solutions your team can deploy as-is or customize for your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map(s => {
            const c = colorMap[s.color];
            return (
              <div key={s.name} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${c}`}>
                    {s.tag}
                  </span>
                  <span className={`text-xs font-medium border px-2.5 py-1 rounded-full ${
                    s.liveLabel === "Production Live" ? "text-green-400 bg-green-500/10 border-green-500/25" :
                    s.liveLabel === "Hardware Validated" ? "text-blue-400 bg-blue-500/10 border-blue-500/25" :
                    "text-white/25 bg-white/5 border-white/10"
                  }`}>
                    {s.liveLabel}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {s.chips.map(chip => (
                    <span key={chip} className="text-xs bg-white/8 text-white/40 px-2.5 py-1 rounded-full border border-white/8">{chip}</span>
                  ))}
                </div>
                <Link href={s.href}
                  className="text-sm text-white/45 hover:text-white border border-white/12 hover:border-white/30 px-4 py-2 rounded-xl transition text-center">
                  Learn more →
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/industries"
            className="inline-flex items-center gap-2 border border-white/15 text-white/45 hover:text-white hover:border-white/30 text-sm px-5 py-2.5 rounded-full transition">
            View all industries →
          </Link>
        </div>
      </section>

      {/* ── DASHBOARD BUILDER ── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
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
                { icon: "⬡", label: "Drag-and-drop grid layout", sub: "Resize and reposition any widget freely — no code" },
                { icon: "⏻", label: "Toggle, Button, Slider widgets", sub: "Bidirectional — sends command, shows device-confirmed state" },
                { icon: "◈", label: "Metric cards + live charts", sub: "Temperature, CO₂, battery, signal — updates in real time" },
                { icon: "▶", label: "Edit / Live mode", sub: "Build layout in Edit, control real devices in Live" },
              ].map(f => (
                <div key={f.label} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm flex items-center justify-center shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white/75">{f.label}</p>
                    <p className="text-xs text-white/30">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/platform#dashboard"
              className="inline-flex items-center gap-2 border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 text-sm font-medium px-5 py-2.5 rounded-xl transition">
              See Dashboard Builder →
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/[0.02]">
              <p className="text-xs font-mono text-white/25 uppercase tracking-widest">Dashboard Editor</p>
              <div className="flex gap-2">
                <span className="text-[10px] border border-orange-500/30 bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full">✏ Edit</span>
                <span className="text-[10px] border border-green-500/30 bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full">▶ Live</span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {/* Top row: metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-black/40 border border-white/6 rounded-xl p-3">
                  <p className="text-[9px] text-white/30 uppercase tracking-wide">Temperature</p>
                  <p className="text-2xl font-bold font-mono text-green-400 mt-1">24.3<span className="text-xs text-white/25 ml-0.5">°C</span></p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[8px] text-white/20">Live</span>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/6 rounded-xl p-3">
                  <p className="text-[9px] text-white/30 uppercase tracking-wide">Humidity</p>
                  <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">58<span className="text-xs text-white/25 ml-0.5">%</span></p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[8px] text-white/20">Live</span>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/6 rounded-xl p-3">
                  <p className="text-[9px] text-white/30 uppercase tracking-wide">Relay</p>
                  <p className="text-base font-bold text-green-400 mt-1">ON</p>
                  <div className="mt-2 w-full h-4 bg-green-500 rounded-full relative">
                    <span className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow block" />
                  </div>
                </div>
              </div>
              {/* Chart */}
              <div className="bg-black/40 border border-white/6 rounded-xl p-3">
                <p className="text-[9px] text-white/30 uppercase tracking-wide mb-2">CO₂ — Last 1 Hour</p>
                <div className="flex items-end gap-0.5 h-12">
                  {[60,55,65,70,58,80,85,75,72,68,73,78,82,88,91,85,79,83,87,90,85,88,92,95].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/35 rounded-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[8px] text-white/15">1h ago</span>
                  <span className="text-[8px] text-white/15">Now</span>
                </div>
              </div>
              {/* Slider */}
              <div className="bg-black/40 border border-white/6 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[9px] text-white/30 uppercase tracking-wide">Setpoint</p>
                  <p className="text-sm font-bold font-mono text-blue-400">22<span className="text-[9px] text-white/25 ml-0.5">°C</span></p>
                </div>
                <div className="w-full h-1.5 bg-white/8 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full w-2/5 bg-blue-500 rounded-full" />
                  <span className="absolute top-1/2 left-[40%] -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow block -ml-1.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHITE LABEL ── */}
      <section className="bg-gradient-to-br from-violet-500/5 to-purple-500/3 px-4 md:px-8 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
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
              your domain, your colors — with the full connected asset platform running underneath.
              Built for system integrators, ISVs, and hardware companies that want to ship faster.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: "◈", title: "Custom branding", desc: "Your logo, colors, and company name across all dashboards" },
                { icon: "▣", title: "Custom domain", desc: "dashboard.yourcompany.com — your URL, your SSL cert" },
                { icon: "⚡", title: "Resell as your own", desc: "Charge your clients directly — we stay invisible" },
                { icon: "□", title: "Per-org theming", desc: "Each client org can have its own branding and access rules" },
              ].map(f => (
                <div key={f.title} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 hover:border-violet-500/20 transition">
                  <p className="text-violet-400 text-lg mb-2">{f.icon}</p>
                  <p className="text-sm font-semibold text-white/75 mb-1">{f.title}</p>
                  <p className="text-xs text-white/30 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact"
                className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition">
                Talk to us about White Label →
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center justify-center border border-white/20 text-white/55 hover:text-white hover:border-white/40 text-sm px-6 py-3 rounded-full transition">
                View Pricing
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-white/22 uppercase tracking-widest font-semibold mb-6">Who uses White Label</p>
            {[
              {
                tag: "System Integrators",
                desc: "You build, install, and service IoT systems for clients. Deploy your own branded portal — no need to build the platform yourself.",
                chips: ["Your brand", "Faster delivery", "Client isolation"],
              },
              {
                tag: "Hardware OEMs",
                desc: "You manufacture connected hardware. Bundle the cloud platform with your product — sell a complete solution, not just a device.",
                chips: ["Device + Cloud", "Recurring revenue", "Managed service"],
              },
              {
                tag: "SaaS Resellers",
                desc: "You already sell B2B software. Add IoT telemetry, HVAC control, and fleet tracking to your existing product suite under your name.",
                chips: ["Expand product", "No IoT infra", "White-glove setup"],
              },
            ].map(w => (
              <div key={w.tag} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-violet-500/20 transition">
                <p className="font-semibold text-white/75 mb-1.5">{w.tag}</p>
                <p className="text-sm text-white/38 leading-relaxed mb-3">{w.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {w.chips.map(c => (
                    <span key={c} className="text-xs bg-violet-500/10 text-violet-400/65 border border-violet-500/15 px-2.5 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/8 px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{s.value}</div>
              <div className="text-xs text-white/30 leading-snug max-w-[140px] mx-auto">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="bg-white/[0.01] px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/22 mb-2">Security & Compliance</p>
            <h2 className="text-xl md:text-2xl font-bold text-white/70">Enterprise-grade security, built in from day one</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              { icon: "🔒", label: "TLS 1.3",          sub: "All traffic encrypted" },
              { icon: "🛡",  label: "RBAC",             sub: "Role-based access control" },
              { icon: "🏢",  label: "Tenant Isolation", sub: "Org-level data walls" },
              { icon: "📋",  label: "Audit Logs",       sub: "Immutable event trail" },
              { icon: "✅",  label: "GDPR Ready",       sub: "Data residency control" },
              { icon: "🔑",  label: "API Key Scoping",  sub: "Per-key permissions" },
            ].map(b => (
              <div key={b.label} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 text-center hover:border-white/15 transition">
                <div className="text-xl mb-2">{b.icon}</div>
                <div className="text-xs font-semibold text-white/60 mb-0.5">{b.label}</div>
                <div className="text-[10px] text-white/22">{b.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/security" className="text-sm text-white/30 hover:text-white/60 transition underline underline-offset-4">
              View full security overview →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border border-blue-500/25 rounded-2xl p-7 flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-4">Enterprise & B2B</span>
            <h3 className="text-xl font-bold mb-3">Book a Demo</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">
              Talk to our team. We&apos;ll walk through the platform, scope a deployment, and show you exactly what&apos;s possible for your product.
            </p>
            <Link href="/contact"
              className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition">
              Schedule a call →
            </Link>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 flex flex-col hover:border-white/20 transition">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Live Now</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Try Live Demo</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">
              Explore the real platform with a live device simulator. See telemetry, HVAC control, OTA, and diagnostics — no signup needed.
            </p>
            <Link href="/demo"
              className="inline-flex items-center justify-center border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm font-medium px-5 py-3 rounded-xl transition">
              Open demo →
            </Link>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 flex flex-col hover:border-white/20 transition">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Self-Serve</span>
            <h3 className="text-xl font-bold mb-3">Get Started Free</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">
              Create an account, register your first device, and have live telemetry flowing in under 10 minutes. Free tier — 5 devices, 1 org.
            </p>
            <Link href="/get-started"
              className="inline-flex items-center justify-center border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm font-medium px-5 py-3 rounded-xl transition">
              Start for free →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
