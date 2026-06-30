import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LangSwitcher from "./LangSwitcher";

export const metadata: Metadata = {
  title: "Developers — EdgeConductor",
  description: "Official JS + Python SDKs, REST API reference, MQTT topics, and ESP32 libraries for the EdgeConductor IoT platform.",
};

const methodColor: Record<string, string> = {
  GET:    "text-green-400 bg-green-500/8",
  POST:   "text-blue-400 bg-blue-500/8",
  PATCH:  "text-yellow-400 bg-yellow-500/8",
  DELETE: "text-red-400 bg-red-500/8",
};

const endpoints = [
  { method: "POST",  auth: false, path: "/devices/register",               desc: "Register a new device",                    body: '{"serial_no","product_type","fw_version"}' },
  { method: "GET",   auth: true,  path: "/devices",                         desc: "List devices (filter: org_id, tenant_id)", body: null },
  { method: "GET",   auth: true,  path: "/devices/:serial",                 desc: "Get device details + reported shadow",     body: null },
  { method: "POST",  auth: true,  path: "/devices/:serial/telemetry",       desc: "Push telemetry from device",               body: '{"temp","hum","co2","bat","signal",...}' },
  { method: "GET",   auth: true,  path: "/devices/:serial/telemetry",       desc: "Historical telemetry (?hours=1|6|24|168)", body: null },
  { method: "PATCH", auth: true,  path: "/devices/:serial/shadow/desired",  desc: "Push config/command to device via MQTT",   body: '{"relay":true,"setpoint":22}' },
  { method: "POST",  auth: true,  path: "/devices/:serial/ota",             desc: "Trigger OTA firmware update",              body: '{"firmware_id":"..."}' },
  { method: "POST",  auth: true,  path: "/devices/:serial/reboot",          desc: "Remote reboot command",                    body: null },
  { method: "GET",   auth: true,  path: "/orgs",                            desc: "List organizations",                       body: null },
  { method: "GET",   auth: true,  path: "/orgs/:id/rooms",                  desc: "List rooms in org",                        body: null },
  { method: "GET",   auth: true,  path: "/orgs/:id/rules",                  desc: "List automation rules",                    body: null },
  { method: "POST",  auth: true,  path: "/orgs/:id/rules",                  desc: "Create rule (threshold or schedule)",      body: '{"name","rule_type","condition","action"}' },
  { method: "PATCH", auth: true,  path: "/rules/:id",                       desc: "Enable/disable/update rule",               body: '{"enabled":true}' },
  { method: "DELETE",auth: true,  path: "/rules/:id",                       desc: "Delete rule",                              body: null },
  { method: "GET",   auth: true,  path: "/orgs/:id/audit",                  desc: "Audit log (last 100 events)",              body: null },
  { method: "POST",  auth: true,  path: "/orgs/:id/api-keys",               desc: "Generate API key",                         body: '{"name":"My Key"}' },
  { method: "GET",   auth: true,  path: "/orgs/:id/api-keys",               desc: "List API keys",                            body: null },
  { method: "DELETE",auth: true,  path: "/api-keys/:id",                    desc: "Revoke API key",                           body: null },
];

const sdkMethods = [
  {
    group: "devices",
    color: "blue",
    methods: [
      { name: "devices.register({ serial_no, product_type, fw_version? })", ret: "Promise<Device>",    desc: "Register a new device. Safe to call repeatedly — idempotent." },
      { name: "devices.list({ orgId?, tenantId? })",                         ret: "Promise<Device[]>",  desc: "List devices. Filter by org or tenant." },
      { name: "devices.get(serial)",                                          ret: "Promise<Device>",    desc: "Full device object including shadow_reported and shadow_desired." },
      { name: "devices.getShadow(serial)",                                    ret: "Promise<object>",    desc: "Shorthand for get() — returns only shadow_reported (latest sensor values)." },
      { name: "devices.pushConfig(serial, config)",                           ret: "Promise<object>",    desc: "Update desired state → delivered to device via MQTT." },
      { name: "devices.reboot(serial)",                                       ret: "Promise<object>",    desc: "Send reboot command to device via MQTT." },
      { name: "devices.assign(serial, { orgId?, roomId? })",                  ret: "Promise<object>",    desc: "Assign device to an org and/or room." },
    ],
  },
  {
    group: "telemetry",
    color: "green",
    methods: [
      { name: "telemetry.push(serial, payload)",         ret: "Promise<{ok}>",     desc: "Push telemetry. Keys: temp, hum, co2, bat, signal, lat, lng, speed — any numeric field accepted." },
      { name: "telemetry.history(serial, { hours, limit })", ret: "Promise<[]>",   desc: "Historical records oldest-first. hours: 1 | 6 | 24 | 168." },
      { name: "telemetry.recent(serial, limit?)",        ret: "Promise<[]>",       desc: "Last N records newest-first. Default limit: 20." },
    ],
  },
  {
    group: "rules",
    color: "purple",
    methods: [
      { name: "rules.list(orgId)",                                                   ret: "Promise<Rule[]>",  desc: "All rules for an org." },
      { name: "rules.threshold(orgId, { name, field, op, value, action, webhookUrl? })", ret: "Promise<Rule>", desc: "Create threshold rule. op: '>' | '<' | '>=' | '<=' | '==' | '!='." },
      { name: "rules.schedule(orgId, { name, time, days, action })",                ret: "Promise<Rule>",    desc: "Create schedule rule. time: 'HH:MM', days: ['mon','tue',...]." },
      { name: "rules.enable(ruleId) / rules.disable(ruleId)",                       ret: "Promise<Rule>",    desc: "Toggle rule on/off without deleting." },
      { name: "rules.delete(ruleId)",                                                ret: "Promise<object>",  desc: "Permanently delete rule." },
    ],
  },
  {
    group: "orgs",
    color: "yellow",
    methods: [
      { name: "orgs.list()",                            ret: "Promise<Org[]>",  desc: "All organizations you have access to." },
      { name: "orgs.get(orgId)",                        ret: "Promise<Org>",    desc: "Org details including white-label settings." },
      { name: "orgs.rooms(orgId)",                      ret: "Promise<Room[]>", desc: "All rooms/zones in org." },
      { name: "orgs.createRoom(orgId, { name, floor, building })", ret: "Promise<Room>", desc: "Create a new room." },
    ],
  },
  {
    group: "audit",
    color: "gray",
    methods: [
      { name: "audit.list(orgId, { limit? })",  ret: "Promise<Event[]>",  desc: "Last N audit events. Actions: rule_fired, device_offline, ota_pushed, config_pushed." },
    ],
  },
];

const groupColors: Record<string, string> = {
  blue:   "text-blue-400 bg-blue-500/8 border-blue-500/20",
  green:  "text-green-400 bg-green-500/8 border-green-500/20",
  purple: "text-purple-400 bg-purple-500/8 border-purple-500/20",
  yellow: "text-yellow-400 bg-yellow-500/8 border-yellow-500/20",
  gray:   "text-white/50 bg-white/5 border-white/15",
};

const errors = [
  { code: "400", title: "Bad Request",   desc: "Missing or invalid fields in request body." },
  { code: "401", title: "Unauthorized",  desc: "Missing or invalid Bearer token / API key." },
  { code: "403", title: "Forbidden",     desc: "Key exists but does not have access to this resource." },
  { code: "404", title: "Not Found",     desc: "Device or resource does not exist." },
  { code: "409", title: "Conflict",      desc: "Device serial already registered." },
  { code: "429", title: "Rate Limited",  desc: "Too many requests. Back off and retry." },
  { code: "500", title: "Server Error",  desc: "Internal error — contact support if persistent." },
];

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Developers</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4 leading-tight">
            Build on EdgeConductor<br />
            <span className="text-white/30">in minutes, not days</span>
          </h1>
          <p className="text-white/45 text-base max-w-2xl mb-8">
            Official SDKs for JS and Python, a REST API, MQTT topics, and ESP32 libraries.
            Everything you need — no vendor lock-in, no bloat.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.npmjs.com/package/@edgeconductor/sdk" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition text-sm">
              <span className="text-yellow-400 font-semibold text-xs">npm</span>
              <span className="text-white/50 font-mono">@edgeconductor/sdk</span>
              <span className="text-white/20 text-xs">↗</span>
            </a>
            <a href="https://pypi.org/project/edgeconductor/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition text-sm">
              <span className="text-blue-400 font-semibold text-xs">PyPI</span>
              <span className="text-white/50 font-mono">edgeconductor</span>
              <span className="text-white/20 text-xs">↗</span>
            </a>
          </div>
        </div>

        {/* Language switcher */}
        <LangSwitcher />
      </section>

      {/* ── Authentication ─────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Authentication</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-2 text-white/80">Get an API Key</h3>
            <p className="text-white/40 text-sm mb-4">
              Login to the dashboard → Org Settings → API Keys → Generate Key.
              The key is shown only once — store it securely.
            </p>
            <Link href="https://ec-platform-ten.vercel.app" target="_blank"
              className="text-sm text-blue-400 hover:text-blue-300 transition">
              Open Dashboard →
            </Link>
          </div>
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-3 text-white/80">Bearer Token</h3>
            <pre className="text-xs font-mono text-white/50 bg-black/40 rounded-lg p-3 mb-3">{`Authorization: Bearer ec_live_xxxx`}</pre>
            <p className="text-white/35 text-xs">
              All authenticated endpoints require this header.
              Keys are scoped to your org — never expose them client-side.
            </p>
          </div>
        </div>
      </section>

      {/* ── SDK Reference ─────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-7">
          <h2 className="text-2xl font-bold">SDK Reference</h2>
          <span className="text-xs text-white/30 font-mono border border-white/10 px-2.5 py-1 rounded-full">v0.1.0</span>
        </div>
        <div className="space-y-5">
          {sdkMethods.map(group => (
            <div key={group.group} className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/8 flex items-center gap-3">
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${groupColors[group.color]}`}>
                  ec.{group.group}
                </span>
              </div>
              <div className="divide-y divide-white/6">
                {group.methods.map(m => (
                  <div key={m.name} className="px-5 py-4 hover:bg-white/2 transition">
                    <div className="flex flex-wrap items-start gap-3 mb-1.5">
                      <code className="text-xs font-mono text-white/70 leading-relaxed">{m.name}</code>
                      <span className="text-xs font-mono text-white/25 shrink-0">→ {m.ret}</span>
                    </div>
                    <p className="text-xs text-white/35 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REST API ──────────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl font-bold">REST API Reference</h2>
          <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-1 rounded-full font-semibold">Live</span>
        </div>
        <p className="text-white/35 text-sm font-mono mb-6">Base URL: https://ec-registry.onrender.com</p>
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_200px_16px] md:grid-cols-[80px_220px_1fr_100px] gap-4 px-5 py-2.5 border-b border-white/10 text-xs text-white/20 font-semibold uppercase tracking-wider">
            <span>Method</span><span>Endpoint</span><span>Description</span><span className="hidden md:block">Auth</span>
          </div>
          {endpoints.map((ep, i) => (
            <div key={`${ep.method}${ep.path}`}
              className={`grid grid-cols-[80px_1fr] md:grid-cols-[80px_220px_1fr_100px] gap-4 items-start px-5 py-3.5 hover:bg-white/2 transition ${i < endpoints.length - 1 ? "border-b border-white/6" : ""}`}>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded w-fit ${methodColor[ep.method] || "text-white/50"}`}>
                {ep.method}
              </span>
              <span className="text-xs font-mono text-white/60">{ep.path}</span>
              <div>
                <p className="text-xs text-white/40">{ep.desc}</p>
                {ep.body && (
                  <code className="text-xs text-white/20 font-mono mt-0.5 block">{ep.body}</code>
                )}
              </div>
              <span className={`hidden md:block text-xs font-mono ${ep.auth ? "text-yellow-400/60" : "text-white/20"}`}>
                {ep.auth ? "Bearer" : "—"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MQTT ──────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">MQTT Topics</h2>
        <p className="text-white/35 text-sm font-mono mb-6">
          Broker: duck.lmq.cloudamqp.com:8883 (TLS) · Protocol: MQTT 3.1.1
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          {[
            { dir: "PUB", color: "blue",   topic: "devices/{serial}/telemetry",       desc: "Device → Cloud. Publish sensor readings. Triggers rule evaluation.", ex: '{"temp":24.5,"hum":60,"co2":850,"bat":4.1}' },
            { dir: "SUB", color: "yellow", topic: "devices/{serial}/shadow/desired",  desc: "Cloud → Device. Receive config updates and remote commands.",        ex: '{"relay":true,"setpoint":22}' },
            { dir: "PUB", color: "blue",   topic: "devices/{serial}/shadow/reported", desc: "Device → Cloud. Report current state after applying desired.",        ex: '{"relay":true,"temp":22.1}' },
            { dir: "SUB", color: "green",  topic: "devices/{serial}/ota",             desc: "Cloud → Device. Receive OTA firmware payload and version.",           ex: '{"url":"...","version":"1.2.0"}' },
          ].map(t => (
            <div key={t.topic} className="bg-white/2 border border-white/8 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  t.color === "blue" ? "text-blue-400 bg-blue-500/10" :
                  t.color === "yellow" ? "text-yellow-400 bg-yellow-500/10" :
                  "text-green-400 bg-green-500/10"
                }`}>{t.dir}</span>
                <code className="text-xs font-mono text-white/55">{t.topic}</code>
              </div>
              <p className="text-xs text-white/35 mb-3">{t.desc}</p>
              <pre className="text-xs font-mono text-white/25 bg-black/30 rounded-lg px-3 py-2 overflow-x-auto">{t.ex}</pre>
            </div>
          ))}
        </div>
        <div className="bg-blue-500/6 border border-blue-500/15 rounded-xl px-5 py-4">
          <p className="text-white/40 text-sm">
            <span className="text-blue-400 font-semibold">MQTT credentials</span> — Username: your device serial, Password: device secret (returned on register).
            TLS required on port 8883. QoS 1 recommended.
          </p>
        </div>
      </section>

      {/* ── ESP32 SDK ─────────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">ESP32 Libraries</h2>
        <p className="text-white/35 text-sm mb-6">PlatformIO libraries for EdgeConductor hardware. Add to <code className="font-mono text-white/45">platformio.ini</code>.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { lib: "ECConn",    desc: "WiFi + GSM connectivity",           detail: "WifiConn + GsmConn auto-failover" },
            { lib: "ECMqtt",    desc: "MQTT client with OTA",              detail: "PubSubClient wrapper, handles reconnect" },
            { lib: "ECClimate", desc: "BME280 + MH-Z19 sensors",          detail: "Temp, humidity, CO₂ readings" },
            { lib: "ECHvac",    desc: "Relay + HVAC control",             detail: "Relay state synced via shadow" },
            { lib: "ECGPS",     desc: "NMEA GPS parsing",                  detail: "GP-02 module, lat/lng/speed" },
            { lib: "ECDiag",    desc: "Device diagnostics",               detail: "Battery, signal, heap, reboot reason" },
          ].map(l => (
            <div key={l.lib} className="bg-white/2 border border-white/8 rounded-xl p-5 hover:border-white/15 transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg font-semibold">{l.lib}</span>
              </div>
              <p className="text-sm text-white/55 mb-1">{l.desc}</p>
              <p className="text-xs text-white/25">{l.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Errors + Rate Limits ──────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Error Codes</h2>
            <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
              {errors.map((e, i) => (
                <div key={e.code} className={`flex items-start gap-4 px-5 py-3.5 ${i < errors.length - 1 ? "border-b border-white/6" : ""}`}>
                  <span className={`text-xs font-mono font-bold shrink-0 ${
                    e.code.startsWith("4") ? "text-red-400" : e.code.startsWith("5") ? "text-orange-400" : "text-white/40"
                  }`}>{e.code}</span>
                  <div>
                    <p className="text-xs font-semibold text-white/60 mb-0.5">{e.title}</p>
                    <p className="text-xs text-white/30">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Rate Limits</h2>
            <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-5">
              {[
                { plan: "Starter",    limit: "100 req / min" },
                { plan: "Pro",        limit: "1,000 req / min" },
                { plan: "Business",   limit: "10,000 req / min" },
                { plan: "Enterprise", limit: "Custom / unlimited" },
              ].map((r, i) => (
                <div key={r.plan} className={`flex justify-between items-center px-5 py-3.5 ${i < 3 ? "border-b border-white/6" : ""}`}>
                  <span className="text-sm text-white/50">{r.plan}</span>
                  <span className="text-xs font-mono text-white/35">{r.limit}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/2 border border-white/8 rounded-xl px-5 py-4">
              <h3 className="text-sm font-semibold text-white/60 mb-2">Webhooks</h3>
              <p className="text-xs text-white/35 leading-relaxed">
                Rules can fire a webhook on threshold breach or schedule.
                POST to your endpoint with JSON payload.
                HMAC signature verification coming in v0.2.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Support CTA ───────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-24 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/6 border border-blue-500/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Need help integrating?</h2>
            <p className="text-white/40 text-sm max-w-md">
              Open a GitHub issue, email us, or book a 30-min onboarding call.
              We reply within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact?type=demo"
              className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition">
              Book a Demo
            </Link>
            <Link href="/contact?type=support"
              className="px-5 py-2.5 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium transition">
              Contact Support
            </Link>
            <Link href="/contact?type=bug"
              className="px-5 py-2.5 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium transition">
              Report a Bug
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
