import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Operations — EdgeConductor",
  description: "EdgeConductor powers Device Operations, Fleet Operations, Building Operations, Asset Operations, and Customer Operations — the outcomes enterprise businesses actually buy.",
  alternates: { canonical: "https://edgeconductor.com/operations" },
};

const operations = [
  {
    id: "device",
    label: "Device Operations",
    color: "blue",
    number: "01",
    headline: "Manufacture, deploy, and maintain every device in your fleet",
    sub: "Every connected product follows the same lifecycle — from factory floor to field deployment to retirement. Device Operations is the foundation that every other operation runs on.",
    flow: ["Manufacture", "Register", "Provision", "Ship", "Claim", "Operate", "OTA", "Diagnose", "Retire"],
    outcomes: [
      {
        icon: "◎",
        title: "Factory-ready in one command",
        desc: "Register 500 devices, generate QR code PNGs, and produce a claim CSV — in a single terminal command. No web UI required at the factory floor.",
      },
      {
        icon: "□",
        title: "Zero-touch customer onboarding",
        desc: "End customers scan a QR code. Device is claimed, org is assigned, and dashboard access is granted automatically. Zero manual steps on your side.",
      },
      {
        icon: "↑",
        title: "Fleet-wide firmware campaigns",
        desc: "Push firmware to every device of a product type in one action. Offline devices receive the update on their next connection — no missed devices.",
      },
      {
        icon: "◈",
        title: "Remote diagnostics, no site visit",
        desc: "Battery, signal strength, heap memory, uptime, reboot reason — all visible from the dashboard. Reboot any device remotely if needed.",
      },
    ],
    capabilities: ["CLI Provisioning", "QR Claim Flow", "OTA Campaigns", "Remote Reboot", "Diagnostics Panel"],
    link: { label: "Device Registry →", href: "/platform#registry" },
  },
  {
    id: "fleet",
    label: "Fleet Operations",
    color: "amber",
    number: "02",
    headline: "Track, dispatch, and maintain every moving asset in real time",
    sub: "Whether you operate delivery vehicles, field service equipment, construction machinery, or any mobile asset — Fleet Operations gives you live location, health monitoring, and exception alerts in one view.",
    flow: ["Asset", "Route", "Live Location", "Geofence", "Exception Alert", "Dispatch", "Maintenance Log"],
    outcomes: [
      {
        icon: "◎",
        title: "Live location, updated every 5 seconds",
        desc: "GPS coordinates, signal quality, and battery health streamed continuously. Know where every asset is and whether it is healthy — right now.",
      },
      {
        icon: "⚡",
        title: "Exception alerts, not just status updates",
        desc: "Asset goes offline for 15 minutes, battery drops below threshold, or signal degrades — your operations team is notified before customers are impacted.",
      },
      {
        icon: "✦",
        title: "Anomaly detection, not just thresholds",
        desc: "Rolling-average intelligence surfaces unusual battery drain, GPS drift, or signal degradation before a static threshold would ever fire.",
      },
      {
        icon: "▣",
        title: "7-day history, not just live state",
        desc: "Replay where any asset was at any point in the last week. Know exactly when it went offline, when signal degraded, and what state it reported.",
      },
    ],
    capabilities: ["GPS Telemetry", "Offline Alerts", "Anomaly Detection", "7-Day History", "Fleet Map"],
    link: { label: "Fleet Solution →", href: "/solutions/tracker" },
  },
  {
    id: "building",
    label: "Building Operations",
    color: "cyan",
    number: "03",
    headline: "Monitor and automate every space across your property portfolio",
    sub: "From a single floor to a multi-building campus — Building Operations gives facilities teams, property managers, and tenants real-time environmental data, automated HVAC control, and compliance-ready records.",
    flow: ["Property", "Building", "Floor", "Room", "Sensors", "HVAC Control", "Tenant Access", "Reports"],
    outcomes: [
      {
        icon: "◎",
        title: "Room-by-room environmental visibility",
        desc: "Temperature, humidity, and CO₂ per room — live. Identify comfort issues before tenants file complaints. Know which spaces need attention right now.",
      },
      {
        icon: "⚡",
        title: "Automated HVAC, no BMS vendor required",
        desc: "IF CO₂ exceeds 1000 ppm THEN activate ventilation. Schedule rules. Threshold rules. No building management system integration needed.",
      },
      {
        icon: "□",
        title: "Tenant self-service via QR code",
        desc: "Tenants scan a code, register, and get read-only access to their space's climate data. No helpdesk tickets. No manual provisioning on your side.",
      },
      {
        icon: "◈",
        title: "White-labeled per property",
        desc: "Each property owner sees their building under your brand — your logo, your colors. No EdgeConductor branding visible to your clients or their tenants.",
      },
    ],
    capabilities: ["Room Hierarchy", "Threshold Rules", "Schedule Automation", "QR Tenant Access", "White-Label"],
    link: { label: "Climate Solution →", href: "/solutions/climate" },
  },
  {
    id: "asset",
    label: "Asset Operations",
    color: "orange",
    number: "04",
    headline: "Monitor health, track location, and automate maintenance for every critical asset",
    sub: "Industrial equipment, refrigerated containers, medical devices, energy infrastructure — Asset Operations gives you a single view of every asset's health, configuration history, and operational status.",
    flow: ["Asset Registry", "Live Health", "Location Tracking", "Anomaly Alert", "Remote Config", "OTA Update", "Lifecycle Log"],
    outcomes: [
      {
        icon: "✦",
        title: "Know before it breaks",
        desc: "Anomaly detection watches every metric against a learned baseline for that specific asset. Unusual readings surface before a static threshold would fire.",
      },
      {
        icon: "□",
        title: "Push configuration without a site visit",
        desc: "Update setpoints, alert thresholds, sampling intervals — all delivered to the asset via secure MQTT shadow state. Applied on next connection if offline.",
      },
      {
        icon: "▣",
        title: "Compliance-ready audit trail",
        desc: "Every configuration change, rule fire, OTA event, and offline alert is logged with timestamp, actor, and before/after state. Exportable on demand.",
      },
      {
        icon: "◈",
        title: "Full asset lifecycle in one record",
        desc: "From manufacture serial through retirement — firmware version history, configuration changes, health trends, and anomaly events on a single timeline.",
      },
    ],
    capabilities: ["Anomaly Detection", "Shadow Config", "Audit Logs", "OTA History", "Rules Engine"],
    link: { label: "Industry Use Cases →", href: "/industries" },
  },
  {
    id: "customer",
    label: "Customer Operations",
    color: "violet",
    number: "05",
    headline: "Operate all your clients' deployments under your own brand",
    sub: "System integrators and hardware OEMs who deploy to multiple enterprise clients need more than a dashboard — they need a Partner Portal. Create orgs, onboard clients, and monitor every deployment from one multi-tenant view.",
    flow: ["Your Brand", "Partner Portal", "Create Org", "Invite Admin", "White-Label", "Devices Live", "Client Ops"],
    outcomes: [
      {
        icon: "▣",
        title: "One portal for every client",
        desc: "Create a new customer org in seconds, assign devices, invite their org admin — and let them operate independently under your brand from day one.",
      },
      {
        icon: "◈",
        title: "Every client sees your brand, not ours",
        desc: "Custom logo, colors, and org name per client. Your clients experience your connected product — EdgeConductor stays invisible underneath.",
      },
      {
        icon: "□",
        title: "Complete isolation, aggregate visibility",
        desc: "Each client sees only their own devices and data. You see aggregate stats across all clients — total devices, online count, anomalies — from your Partner Portal.",
      },
      {
        icon: "✦",
        title: "Your margins, your client relationship",
        desc: "Sell a white-labeled connected operations platform at your price. Your client pays you. EdgeConductor is a cost of goods, not a competitor.",
      },
    ],
    capabilities: ["Partner Portal", "Multi-Tenant RBAC", "White-Label Branding", "Org Management", "API Key Scoping"],
    link: { label: "Partner Program →", href: "/partners" },
  },
];

const colorMap: Record<string, {
  tag: string; dot: string; arrow: string; cap: string;
  flowBg: string; flowText: string; border: string; glow: string;
}> = {
  blue:   {
    tag:      "text-blue-400 bg-blue-500/10 border-blue-500/25",
    dot:      "bg-blue-400",
    arrow:    "text-blue-400/30",
    cap:      "text-blue-300/80 bg-blue-500/8 border-blue-500/20",
    flowBg:   "bg-blue-500/8 border-blue-500/20",
    flowText: "text-blue-200/70",
    border:   "border-blue-500/15",
    glow:     "from-blue-500/6",
  },
  amber:  {
    tag:      "text-amber-400 bg-amber-500/10 border-amber-500/25",
    dot:      "bg-amber-400",
    arrow:    "text-amber-400/30",
    cap:      "text-amber-300/80 bg-amber-500/8 border-amber-500/20",
    flowBg:   "bg-amber-500/8 border-amber-500/20",
    flowText: "text-amber-200/70",
    border:   "border-amber-500/15",
    glow:     "from-amber-500/6",
  },
  cyan:   {
    tag:      "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    dot:      "bg-cyan-400",
    arrow:    "text-cyan-400/30",
    cap:      "text-cyan-300/80 bg-cyan-500/8 border-cyan-500/20",
    flowBg:   "bg-cyan-500/8 border-cyan-500/20",
    flowText: "text-cyan-200/70",
    border:   "border-cyan-500/15",
    glow:     "from-cyan-500/6",
  },
  orange: {
    tag:      "text-orange-400 bg-orange-500/10 border-orange-500/25",
    dot:      "bg-orange-400",
    arrow:    "text-orange-400/30",
    cap:      "text-orange-300/80 bg-orange-500/8 border-orange-500/20",
    flowBg:   "bg-orange-500/8 border-orange-500/20",
    flowText: "text-orange-200/70",
    border:   "border-orange-500/15",
    glow:     "from-orange-500/6",
  },
  violet: {
    tag:      "text-violet-400 bg-violet-500/10 border-violet-500/25",
    dot:      "bg-violet-400",
    arrow:    "text-violet-400/30",
    cap:      "text-violet-300/80 bg-violet-500/8 border-violet-500/20",
    flowBg:   "bg-violet-500/8 border-violet-500/20",
    flowText: "text-violet-200/70",
    border:   "border-violet-500/15",
    glow:     "from-violet-500/6",
  },
};

export default function OperationsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Operations</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5 leading-[1.1]">
            Your customers don&apos;t buy<br />
            <span className="text-white/30">connected devices.</span><br />
            They buy connected operations.
          </h1>
          <p className="text-white/45 text-base leading-relaxed mb-8 max-w-2xl">
            Every business that deploys hardware is running an operation —
            fleet operations, building operations, asset operations, customer operations.
            EdgeConductor is built to run those operations, not just store the telemetry.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/demo"
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition">
              See It Running →
            </Link>
            <Link href="/platform"
              className="inline-flex items-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-6 py-3 rounded-full transition">
              Platform Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Shift ─────────────────────────────────────────────────────── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — what platforms sell */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-7">
              <p className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-5">
                What most IoT platforms sell
              </p>
              <div className="space-y-3">
                {[
                  "Device Registry",
                  "MQTT Telemetry",
                  "OTA Firmware",
                  "Rules Engine",
                  "Dashboard Builder",
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-white/35 text-sm">
                    <span className="text-white/15">—</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/20 text-xs mt-6 italic">
                &ldquo;Interesting technology stack.&rdquo;
                <br />
                — every enterprise buyer who didn&apos;t convert
              </p>
            </div>

            {/* Right — what customers buy */}
            <div className="bg-white/3 border border-white/10 rounded-2xl p-7">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">
                What your customer actually buys
              </p>
              <div className="space-y-3">
                {[
                  { label: "Device Operations",   color: "text-blue-400"   },
                  { label: "Fleet Operations",    color: "text-amber-400"  },
                  { label: "Building Operations", color: "text-cyan-400"   },
                  { label: "Asset Operations",    color: "text-orange-400" },
                  { label: "Customer Operations", color: "text-violet-400" },
                ].map(o => (
                  <div key={o.label} className="flex items-center gap-3 text-sm">
                    <span className={`text-base ${o.color}`}>✓</span>
                    <span className={`font-medium ${o.color}`}>{o.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/45 text-xs mt-6">
                These are not features. They are the outcomes your customers pay for.
                The platform features are the engine. Operations are what it runs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Operations Sections ────────────────────────────────────────────── */}
      {operations.map((op, idx) => {
        const c = colorMap[op.color];
        return (
          <section
            key={op.id}
            id={op.id}
            className={`border-b border-white/8 px-4 md:px-8 py-20 md:py-24 bg-gradient-to-b ${c.glow} to-transparent`}
          >
            <div className="max-w-7xl mx-auto">

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-xs font-mono text-white/20`}>{op.number}</span>
                <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${c.tag}`}>
                  {op.label}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 max-w-3xl">{op.headline}</h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-2xl">{op.sub}</p>

              {/* Operational flow */}
              <div className="overflow-x-auto mb-10">
                <div className="flex items-center gap-0 min-w-max">
                  {op.flow.map((step, i) => (
                    <div key={step} className="flex items-center gap-0">
                      <div className={`border rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap ${c.flowBg} ${c.flowText}`}>
                        {step}
                      </div>
                      {i < op.flow.length - 1 && (
                        <span className={`text-base mx-1 ${c.arrow}`}>→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {op.outcomes.map(o => (
                  <div key={o.title} className={`bg-white/2 border ${c.border} rounded-xl p-5 hover:bg-white/3 transition`}>
                    <span className="text-lg text-white/30 block mb-3">{o.icon}</span>
                    <h3 className="text-sm font-semibold text-white/80 mb-2">{o.title}</h3>
                    <p className="text-xs text-white/35 leading-relaxed">{o.desc}</p>
                  </div>
                ))}
              </div>

              {/* Capabilities + link */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-white/25 shrink-0">Powered by</span>
                {op.capabilities.map(cap => (
                  <span key={cap} className={`text-xs border px-2.5 py-1 rounded-full font-medium ${c.cap}`}>
                    {cap}
                  </span>
                ))}
                <div className="ml-auto">
                  <Link href={op.link.href}
                    className="text-sm text-white/50 hover:text-white transition">
                    {op.link.label}
                  </Link>
                </div>
              </div>

            </div>
          </section>
        );
      })}

      {/* ── Platform Powers Operations ──────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Under the hood</span>
          <h2 className="text-3xl font-bold mt-3 mb-3">Every operation runs on the same platform</h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            The platform capabilities are not the product. They are what makes the operations possible.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-white/25 uppercase tracking-wider pb-3 font-normal w-40">Operation</th>
                <th className="text-left text-xs text-white/25 uppercase tracking-wider pb-3 font-normal">Platform capabilities that power it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {[
                { label: "Device Operations",   color: "text-blue-400",   caps: ["Device Registry", "CLI Provisioning", "OTA Campaigns", "Remote Reboot", "Diagnostics"] },
                { label: "Fleet Operations",    color: "text-amber-400",  caps: ["GPS Telemetry", "7-Day History", "Anomaly Detection", "Offline Alerts", "Fleet Map"] },
                { label: "Building Operations", color: "text-cyan-400",   caps: ["Room Hierarchy", "Live Sensors", "Rules Engine", "Tenant QR Access", "White-Label"] },
                { label: "Asset Operations",    color: "text-orange-400", caps: ["Anomaly Detection", "Shadow Config", "Rules Engine", "Audit Logs", "OTA History"] },
                { label: "Customer Operations", color: "text-violet-400", caps: ["Partner Portal", "Multi-Tenant RBAC", "White-Label Branding", "API Keys", "Org Management"] },
              ].map(row => (
                <tr key={row.label}>
                  <td className={`py-4 text-sm font-medium ${row.color} w-40`}>{row.label}</td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-2">
                      {row.caps.map(cap => (
                        <span key={cap} className="text-xs text-white/40 bg-white/4 border border-white/8 px-2.5 py-1 rounded-full">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <Link href="/platform"
            className="text-sm text-white/40 hover:text-white transition">
            See all platform capabilities →
          </Link>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">What operations do you run?</h2>
        <p className="text-white/40 text-sm mb-8 leading-relaxed">
          Tell us your use case — fleet, building, asset, or customer operations.
          We&apos;ll show you exactly how EdgeConductor runs it, with a live device on a call.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact"
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition">
            Book a 30-min Demo →
          </Link>
          <Link href="/case-studies"
            className="inline-flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-7 py-3.5 rounded-full transition">
            See Live Deployments
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
