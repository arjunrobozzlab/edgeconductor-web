import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Platform — EdgeConductor",
  description: "Six production-grade capabilities: device registry, live telemetry, OTA firmware, scheduled rules, webhook alerts, and multi-tenant B2B access.",
};

const sections = [
  {
    id: "registry",
    tag: "Device Registry",
    color: "blue",
    title: "Register, provision, and manage every device",
    desc: "A central registry for every device in your fleet. Register via REST API, provision from the CLI tool, or let the firmware auto-register on first boot.",
    features: [
      "Serial number + product type + firmware version tracked per device",
      "QR code generated per device for zero-touch customer claiming",
      "Assign devices to organizations and rooms in bulk or one-by-one",
      "Online / Offline detection based on last_seen timestamp (< 5 min = online)",
      "Offline alerts fire when device silent for 15+ minutes",
      "Full device shadow: desired state + reported state synced via MQTT",
    ],
    code: `POST /devices/register
{
  "serial_no":    "EC-CLM-001",
  "product_type": "EC-CLIMATE-V1",
  "fw_version":   "1.2.0"
}`,
  },
  {
    id: "telemetry",
    tag: "Telemetry",
    color: "cyan",
    title: "Live sensor data + 7-day history",
    desc: "Every device streams telemetry every 5 seconds. View live cards, filter by time range, and plot historical trends — all from the same dashboard.",
    features: [
      "MQTT TLS (WiFi devices) and HTTPS (GSM devices) — both supported",
      "Telemetry stored in Supabase, queryable by ?hours=1/6/24/168",
      "Live state cards update every 5s without page refresh",
      "Historical line charts: Temp, Humidity, CO₂, Battery, Signal",
      "Time range selector: 1h · 6h · 24h · 7d",
      "Metric toggles — show/hide individual sensors per device",
    ],
    code: `// Device publishes to:
devices/{serial}/telemetry

// Payload example (EC-CLIMATE-V1):
{
  "temp": 24.3, "hum": 58,
  "co2": 847,   "relay": false,
  "bat": 4.05,  "signal": -61,
  "uptime": 3840, "heap": 186432
}`,
  },
  {
    id: "ota",
    tag: "OTA Updates",
    color: "green",
    title: "Push firmware from dashboard to device in seconds",
    desc: "Upload a compiled .bin file, select the target device, and push. If the device is offline, the update is stored as pending and auto-pushed when it reconnects.",
    features: [
      "Upload .bin firmware from dashboard — stored in Supabase Storage",
      "Push to online device via MQTT devices/{serial}/ota",
      "Offline device: stored as pending_fw_version + pending_fw_url",
      "Auto-push when device comes back online (first telemetry triggers check)",
      "Firmware version tracked per device in registry",
      "Org admins notified via notification bell on firmware upload",
    ],
    code: `// Platform pushes to device:
devices/{serial}/ota → { "url": "...", "version": "1.3.0" }

// Pending OTA (offline device):
GET /devices/:serial/commands
← { "fw_url": "...", "fw_version": "1.3.0" }`,
  },
  {
    id: "rules",
    tag: "Rules Engine",
    color: "yellow",
    title: "Threshold rules + scheduled automation + webhooks",
    desc: "Two types of automation rules — threshold-based (sensor condition) and schedule-based (time + day). When any rule fires, an optional webhook POST notifies your external system.",
    features: [
      "Threshold rules: IF co2 > 1000 THEN relay = true — evaluated every 30s",
      "Schedule rules: AT 22:00 Mon–Fri THEN relay = false",
      "Day-of-week selector per schedule rule (any combination)",
      "Rule fires → MQTT command to device in real time",
      "Webhook URL per rule — POSTs JSON to Telegram bot, Slack, n8n, Make.com",
      "last_fired timestamp tracked per rule, 90s debounce on schedule rules",
    ],
    code: `// Webhook payload on rule fire:
POST {your_webhook_url}
{
  "event":          "rule_fired",
  "rule_name":      "Night shutoff",
  "rule_type":      "schedule",
  "device_serial":  "EC-CLM-GERMANY01",
  "action":         { "key": "relay", "value": false },
  "triggered_at":   "2026-06-27T22:00:01Z"
}`,
  },
  {
    id: "multitenant",
    tag: "Multi-Tenant",
    color: "purple",
    title: "B2B hierarchy: Org Admin → Room → Tenant",
    desc: "Built for companies that deploy IoT products to business clients. Each client gets their own org, their own rooms, and their tenants get QR-based access.",
    features: [
      "Super Admin: full platform view, all orgs, all devices",
      "Org Admin: manage their org's rooms, devices, rules, OTA, notifications",
      "Room Tenant: read-only climate view, accessed via QR scan",
      "RBAC middleware — role-based routing on every page",
      "Notification bell: org admins notified on firmware upload + device offline",
      "Audit trail: last_fired, last_seen, offline_alerted_at per device/rule",
    ],
    code: `// Role routing:
admin     → /            (full platform)
org_admin → /org         (their org)
customer  → /portal      (their devices)
tenant    → /portal/room (their room)

// QR claim flow:
/claim-room?room_id=xxx → login/register → room assigned`,
  },
  {
    id: "diagnostics",
    tag: "Diagnostics",
    color: "rose",
    title: "Full device health: battery, signal, heap, GPS, reboot reason",
    desc: "Every telemetry packet carries diagnostic fields — not just sensor data. The diagnostics panel gives ops teams everything needed to debug a device remotely.",
    features: [
      "Battery voltage (V) + percentage via LiPo ADC (3.3–4.2V range)",
      "Signal strength (dBm) — WiFi RSSI or GSM CSQ",
      "Heap free (bytes) — catches memory leaks before crash",
      "Reboot reason: POWERON / SW / PANIC / WDT / BROWNOUT / EXT",
      "GPS: fix status, satellite count, TTFF (seconds)",
      "Remote reboot: dashboard button → MQTT / HTTP 205 → ESP.restart()",
    ],
    code: `// Diagnostics in every telemetry packet:
{
  "bat":           4.05,
  "signal":        -61,
  "heap":          186432,
  "uptime":        3840,
  "reboot_reason": "POWERON",
  "gps_fix":       true,
  "sats":          9,
  "ttff":          17.4
}`,
  },
];

const colorMap: Record<string, { tag: string; border: string; code: string }> = {
  blue:   { tag: "text-blue-400 bg-blue-500/10 border-blue-500/25",   border: "border-blue-500/20",   code: "border-blue-500/15 bg-blue-500/5"   },
  cyan:   { tag: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",   border: "border-cyan-500/20",   code: "border-cyan-500/15 bg-cyan-500/5"   },
  green:  { tag: "text-green-400 bg-green-500/10 border-green-500/25", border: "border-green-500/20", code: "border-green-500/15 bg-green-500/5"  },
  yellow: { tag: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25", border: "border-yellow-500/20", code: "border-yellow-500/15 bg-yellow-500/5" },
  purple: { tag: "text-purple-400 bg-purple-500/10 border-purple-500/25", border: "border-purple-500/20", code: "border-purple-500/15 bg-purple-500/5" },
  rose:   { tag: "text-rose-400 bg-rose-500/10 border-rose-500/25",   border: "border-rose-500/20",   code: "border-rose-500/15 bg-rose-500/5"   },
};

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 pt-20 pb-16 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Platform</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
          Six capabilities. One platform.
        </h1>
        <p className="text-white/45 text-base max-w-2xl mx-auto mb-8">
          Every feature built together — not stitched from five different services.
          Device registry, telemetry, OTA, rules engine, multi-tenant access, and full diagnostics.
        </p>
        {/* Jump nav */}
        <div className="flex flex-wrap justify-center gap-2">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className={`text-xs border px-3 py-1.5 rounded-full transition hover:text-white ${colorMap[s.color].tag}`}>
              {s.tag}
            </a>
          ))}
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-0">
        {sections.map((s, i) => {
          const c = colorMap[s.color];
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id}
              className="border-t border-white/8 py-20 md:py-24">
              <div className={`grid md:grid-cols-2 gap-12 items-start ${flip ? "md:flex-row-reverse" : ""}`}>

                {/* Content */}
                <div className={flip ? "md:order-2" : ""}>
                  <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${c.tag}`}>
                    {s.tag}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-4">{s.title}</h2>
                  <p className="text-white/45 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-2.5">
                    {s.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/55">
                        <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code block */}
                <div className={flip ? "md:order-1" : ""}>
                  <div className={`border rounded-2xl overflow-hidden ${c.border}`}>
                    <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${c.border} ${c.code}`}>
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <pre className={`p-5 text-xs leading-relaxed overflow-x-auto font-mono text-white/60 ${c.code}`}>
                      {s.code}
                    </pre>
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">See it live in 30 minutes</h2>
        <p className="text-white/40 text-sm mb-8">
          Book a demo and we&apos;ll walk you through every feature with a live device running.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact"
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition">
            Book a Demo →
          </Link>
          <Link href="/demo"
            className="inline-flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-7 py-3.5 rounded-full transition">
            Try Live Demo
          </Link>
          <Link href="/developers"
            className="inline-flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-7 py-3.5 rounded-full transition">
            API Reference
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
