import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LangSwitcher from "./LangSwitcher";

export const metadata: Metadata = {
  title: "Developers — EdgeConductor",
  description: "Official JS + Python SDKs, REST API reference, MQTT topics, ESP32 libraries, and ec CLI for the EdgeConductor IoT platform.",
};

const methodColor: Record<string, string> = {
  GET:    "text-green-400 bg-green-500/8",
  POST:   "text-blue-400 bg-blue-500/8",
  PATCH:  "text-yellow-400 bg-yellow-500/8",
  DELETE: "text-red-400 bg-red-500/8",
};

const webhookEndpoints = [
  { method: "GET",    auth: true,  path: "/orgs/:id/webhooks",   desc: "List registered webhooks for an org",                       body: null },
  { method: "POST",   auth: true,  path: "/orgs/:id/webhooks",   desc: "Register a webhook endpoint",                               body: '{"url","events":["telemetry","alert","ota","device_status"]}' },
  { method: "PATCH",  auth: true,  path: "/webhooks/:id",        desc: "Update webhook — toggle active, change URL or events",       body: '{"active":false}' },
  { method: "DELETE", auth: true,  path: "/webhooks/:id",        desc: "Delete a webhook permanently",                              body: null },
  { method: "POST",   auth: true,  path: "/webhooks/:id/test",   desc: "Send a signed test payload to verify endpoint reachability", body: null },
];

const locationEndpoints = [
  { method: "GET",    auth: true,  path: "/orgs/:id/locations",  desc: "List all locations (Site/Building/Floor/Room) for org",    body: null },
  { method: "POST",   auth: true,  path: "/orgs/:id/locations",  desc: "Create a location node",                                   body: '{"name","type":"site|building|floor|room","parent_id?"}' },
  { method: "PATCH",  auth: true,  path: "/locations/:id",       desc: "Rename or reparent a location",                            body: '{"name","parent_id"}' },
  { method: "DELETE", auth: true,  path: "/locations/:id",       desc: "Delete location (cascades to children)",                   body: null },
  { method: "PATCH",  auth: true,  path: "/devices/:serial/location", desc: "Assign a device to a location node",                  body: '{"location_id":"<uuid>"}' },
];

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
      { name: "telemetry.push(serial, payload)",              ret: "Promise<{ok}>",    desc: "Push telemetry. Keys: temp, hum, co2, bat, signal, lat, lng, speed — any numeric field accepted." },
      { name: "telemetry.history(serial, { hours, limit })",  ret: "Promise<[]>",      desc: "Historical records oldest-first. hours: 1 | 6 | 24 | 168." },
      { name: "telemetry.recent(serial, limit?)",             ret: "Promise<[]>",      desc: "Last N records newest-first. Default limit: 20." },
      { name: "telemetry.stream(serial, callback, { intervalMs })", ret: "{ stop() }", desc: "Live stream — polls every intervalMs, calls callback only when payload changes. Returns stop handle." },
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
  {
    group: "notifications",
    color: "blue",
    methods: [
      { name: "notifications.list(orgId)",            ret: "Promise<Notification[]>", desc: "In-app notifications for an org — device offline, anomalies, firmware updates." },
      { name: "notifications.markRead(id)",           ret: "Promise<Notification>",   desc: "Mark a single notification as read." },
      { name: "notifications.markAllRead(orgId)",     ret: "Promise<object>",         desc: "Mark all notifications as read for the org." },
    ],
  },
  {
    group: "anomalies",
    color: "purple",
    methods: [
      { name: "anomalies.list(orgId, { limit?, unacked? })", ret: "Promise<Anomaly[]>", desc: "List anomaly events. Pass unacked: true to get only unacknowledged alerts." },
      { name: "anomalies.acknowledge(anomalyId)",            ret: "Promise<Anomaly>",   desc: "Acknowledge (dismiss) an anomaly event from the panel." },
    ],
  },
  {
    group: "firmware",
    color: "green",
    methods: [
      { name: "firmware.list()",               ret: "Promise<Release[]>", desc: "List all firmware releases uploaded to the platform." },
      { name: "firmware.push(serial, firmwareId)", ret: "Promise<object>", desc: "Push a specific firmware release to a device. Device must be registered." },
    ],
  },
  {
    group: "apiKeys",
    color: "yellow",
    methods: [
      { name: "apiKeys.generate(orgId, name)", ret: "Promise<{ key }>",    desc: "Generate a new API key. Raw key returned once — store it securely." },
      { name: "apiKeys.list(orgId)",           ret: "Promise<Key[]>",      desc: "List API keys (prefix + metadata — raw key never returned after creation)." },
      { name: "apiKeys.revoke(keyId)",         ret: "Promise<object>",     desc: "Revoke a key permanently. Any SDK requests using it will return 401." },
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

const cliGroups = [
  {
    group: "auth",
    label: "ec login / whoami / logout",
    colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    desc: "Authentication",
    commands:
`ec login          # save API key + registry URL → ~/.ec/config.json
ec whoami         # show current login
ec logout         # remove saved credentials`,
  },
  {
    group: "device",
    label: "ec device",
    colorClass: "text-blue-400 bg-blue-500/8 border-blue-500/20",
    desc: "Fleet management",
    commands:
`ec device list                              # list all devices
ec device list --org <org_id>              # filter by org
ec device create EC-TRACK-001 tracker      # register a device
ec device get EC-TRACK-001                 # device info + shadow state
ec device shadow EC-TRACK-001 relay true   # push to shadow_desired via MQTT
ec device reboot EC-TRACK-001              # remote reboot
ec device delete EC-TRACK-001              # delete (--force if active)`,
  },
  {
    group: "telemetry",
    label: "ec telemetry",
    colorClass: "text-cyan-400 bg-cyan-500/8 border-cyan-500/20",
    desc: "Live + historical data",
    commands:
`ec telemetry watch EC-TRACK-001            # stream live telemetry (every 5s)
ec telemetry watch EC-TRACK-001 -i 10     # custom poll interval (seconds)
ec telemetry get EC-TRACK-001 -n 20       # last 20 records
ec telemetry get EC-TRACK-001 --hours 2   # last 2 hours`,
  },
  {
    group: "ota",
    label: "ec ota",
    colorClass: "text-yellow-400 bg-yellow-500/8 border-yellow-500/20",
    desc: "Firmware updates",
    commands:
`ec ota upload ./firmware.bin --version 2.1.4 --type tracker
# → uploads binary, caches to ~/.ec/last_upload.json

ec ota push --serial EC-TRACK-001         # push to one device
ec ota push --type tracker                # push to all trackers

ec ota jobs                               # list recent OTA jobs
ec ota job 12                             # status + progress of job #12`,
  },
  {
    group: "manufacture",
    label: "ec manufacture",
    colorClass: "text-purple-400 bg-purple-500/8 border-purple-500/20",
    desc: "Factory provisioning",
    commands:
`ec manufacture 50 --prefix EC-TRACK --type tracker
# → registers EC-TRACK-00001 to EC-TRACK-00050
# → manufacture_output/manufacture_EC-TRACK_<ts>.csv
# → manufacture_output/qr_EC-TRACK_<ts>/EC-TRACK-00001.png  (per device)

ec manufacture 10 --prefix EC-TRACK --type tracker --start 100   # continue batch
ec manufacture 20 --prefix EC-CLIM --type climate --claim-url https://portal.co/claim`,
  },
  {
    group: "org",
    label: "ec org",
    colorClass: "text-white/50 bg-white/5 border-white/15",
    desc: "Organizations",
    commands:
`ec org list
ec org create "Acme Corp"`,
  },
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
            <a href="https://github.com/edgeconductor-creator/edgeconductor-examples" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/4 hover:bg-white/7 hover:border-white/25 transition text-sm">
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
              <span className="text-white/60">edgeconductor-examples</span>
              <span className="text-white/20 text-xs">↗</span>
            </a>
            <a href="https://www.npmjs.com/package/ec-sdk" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition text-sm">
              <span className="text-yellow-400 font-semibold text-xs">npm</span>
              <span className="text-white/50 font-mono">ec-sdk</span>
              <span className="text-white/20 text-xs">↗</span>
            </a>
            <a href="https://pypi.org/project/edgeconductor/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition text-sm">
              <span className="text-blue-400 font-semibold text-xs">PyPI</span>
              <span className="text-white/50 font-mono">edgeconductor</span>
              <span className="text-white/20 text-xs">↗</span>
            </a>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm">
              <span className="text-emerald-400 font-semibold text-xs">CLI</span>
              <span className="text-white/50 font-mono">@edgeconductor/cli</span>
            </div>
          </div>
        </div>

        {/* Language switcher */}
        <LangSwitcher />
      </section>

      {/* ── Quick Start ───────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Quick Start</h2>
          <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-1 rounded-full font-semibold">10 min</span>
        </div>
        <div className="grid md:grid-cols-4 gap-3 mb-8">
          {[
            { step: "1", title: "Create an org", desc: "Sign up → dashboard automatically creates your first org and API key." },
            { step: "2", title: "Register a device", desc: "POST /devices/register with serial + type. Save the returned mqtt_password." },
            { step: "3", title: "Connect via MQTT", desc: "Connect to services.edgeconductor.com:8883 TLS. Publish to devices/{serial}/telemetry." },
            { step: "4", title: "See it live", desc: "Dashboard shows telemetry in under 5 seconds. Rules evaluate every 30s automatically." },
          ].map(s => (
            <div key={s.step} className="bg-white/2 border border-white/8 rounded-xl p-5">
              <span className="text-3xl font-bold text-white/10 block mb-2">{s.step}</span>
              <p className="text-sm font-semibold text-white/70 mb-1">{s.title}</p>
              <p className="text-xs text-white/35 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Code block */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-black/50 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/8 flex items-center gap-2">
              <span className="text-xs text-yellow-400 font-semibold">npm</span>
              <span className="text-xs text-white/30">JavaScript — register + push telemetry</span>
            </div>
            <pre className="px-5 py-4 text-xs font-mono text-white/55 leading-6 overflow-x-auto">{`import { EdgeConductor } from 'ec-sdk';

const ec = new EdgeConductor({ apiKey: 'ec_live_...' });

// Register device once (idempotent)
const device = await ec.devices.register({
  serial_no: 'EC-FARM-001',
  product_type: 'climate_sensor',
});
console.log(device.mqtt_password); // store in firmware flash

// Push telemetry
await ec.telemetry.push('EC-FARM-001', {
  temp: 24.5, hum: 60, co2: 820,
});`}</pre>
          </div>
          <div className="bg-black/50 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/8 flex items-center gap-2">
              <span className="text-xs text-blue-400 font-semibold">curl</span>
              <span className="text-xs text-white/30">REST — register + push telemetry</span>
            </div>
            <pre className="px-5 py-4 text-xs font-mono text-white/55 leading-6 overflow-x-auto">{`# Register device
curl -X POST https://services.edgeconductor.com/registry/devices/register \\
  -H "Content-Type: application/json" \\
  -d '{"serial_no":"EC-FARM-001","product_type":"climate"}'

# Push telemetry (with API key)
curl -X POST .../devices/EC-FARM-001/telemetry \\
  -H "Authorization: Bearer ec_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"temp":24.5,"hum":60,"co2":820}'`}</pre>
          </div>
        </div>
      </section>

      {/* ── CLI ───────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">CLI — <code className="font-mono text-white/35 text-xl">ec</code></h2>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full font-semibold">v0.1.0</span>
        </div>
        <p className="text-white/35 text-sm mb-7 max-w-2xl">
          Manage devices, push OTA firmware, stream live telemetry, and provision factory batches — all from the terminal.
          Designed for CI/CD pipelines, factory floors, and engineers who prefer the command line.
        </p>

        {/* Install strip */}
        <div className="grid sm:grid-cols-2 gap-4 mb-7">
          <div className="bg-black/50 border border-white/10 rounded-xl px-5 py-4">
            <p className="text-xs text-white/20 uppercase tracking-wider mb-3">Install</p>
            <pre className="text-sm font-mono text-emerald-400">npm install -g @edgeconductor/cli</pre>
          </div>
          <div className="bg-black/50 border border-white/10 rounded-xl px-5 py-4">
            <p className="text-xs text-white/20 uppercase tracking-wider mb-3">Authenticate</p>
            <pre className="text-sm font-mono"><span className="text-white/60">ec login</span><span className="text-white/25">   # saves ~/.ec/config.json</span></pre>
          </div>
        </div>

        {/* Command groups */}
        <div className="space-y-3">
          {cliGroups.map(grp => (
            <div key={grp.group} className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/8 flex items-center gap-3">
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${grp.colorClass}`}>
                  {grp.label}
                </span>
                <span className="text-xs text-white/25">{grp.desc}</span>
              </div>
              <pre className="px-5 py-4 text-xs font-mono text-white/50 leading-6 overflow-x-auto">{grp.commands}</pre>
            </div>
          ))}
        </div>
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
          <span className="text-xs text-white/30 font-mono border border-white/10 px-2.5 py-1 rounded-full">v0.2.0</span>
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
        <p className="text-white/35 text-sm font-mono mb-6">Base URL: https://services.edgeconductor.com/registry</p>
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

      {/* ── Webhooks API ──────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl font-bold">Webhooks</h2>
          <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2.5 py-1 rounded-full font-semibold">New</span>
        </div>
        <p className="text-white/35 text-sm mb-6 max-w-2xl">
          Register your server URL to receive real-time events. Every request carries an HMAC-SHA256 signature you can verify.
        </p>

        {/* Endpoint table */}
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-6">
          <div className="grid grid-cols-[80px_1fr_200px] md:grid-cols-[80px_260px_1fr] gap-4 px-5 py-2.5 border-b border-white/10 text-xs text-white/20 font-semibold uppercase tracking-wider">
            <span>Method</span><span>Endpoint</span><span>Description</span>
          </div>
          {webhookEndpoints.map((ep, i) => (
            <div key={`${ep.method}${ep.path}`}
              className={`grid grid-cols-[80px_1fr] md:grid-cols-[80px_260px_1fr] gap-4 items-start px-5 py-3.5 hover:bg-white/2 transition ${i < webhookEndpoints.length - 1 ? "border-b border-white/6" : ""}`}>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded w-fit ${methodColor[ep.method] || "text-white/50"}`}>{ep.method}</span>
              <span className="text-xs font-mono text-white/60">{ep.path}</span>
              <div>
                <p className="text-xs text-white/40">{ep.desc}</p>
                {ep.body && <code className="text-xs text-white/20 font-mono mt-0.5 block">{ep.body}</code>}
              </div>
            </div>
          ))}
        </div>

        {/* Event payload */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/2 border border-white/8 rounded-xl p-5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Payload format</p>
            <pre className="text-xs font-mono text-white/50 leading-relaxed">{`{
  "event": "telemetry",       // or alert, ota, device_status
  "org_id": "uuid",
  "timestamp": "2026-09-03T10:00:00Z",
  "data": { ... }             // event-specific payload
}`}</pre>
          </div>
          <div className="bg-white/2 border border-white/8 rounded-xl p-5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Signature verification (Node.js)</p>
            <pre className="text-xs font-mono text-white/50 leading-relaxed">{`const sig = req.headers['x-ec-signature'];
const expected = 'sha256=' +
  crypto.createHmac('sha256', WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

if (sig !== expected) return res.sendStatus(401);`}</pre>
          </div>
        </div>
      </section>

      {/* ── Locations API ─────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl font-bold">Locations</h2>
          <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2.5 py-1 rounded-full font-semibold">New</span>
        </div>
        <p className="text-white/35 text-sm mb-6 max-w-2xl">
          Organise devices in a physical hierarchy — Site → Building → Floor → Room. Assign any device to any node.
        </p>
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_200px] md:grid-cols-[80px_280px_1fr] gap-4 px-5 py-2.5 border-b border-white/10 text-xs text-white/20 font-semibold uppercase tracking-wider">
            <span>Method</span><span>Endpoint</span><span>Description</span>
          </div>
          {locationEndpoints.map((ep, i) => (
            <div key={`${ep.method}${ep.path}`}
              className={`grid grid-cols-[80px_1fr] md:grid-cols-[80px_280px_1fr] gap-4 items-start px-5 py-3.5 hover:bg-white/2 transition ${i < locationEndpoints.length - 1 ? "border-b border-white/6" : ""}`}>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded w-fit ${methodColor[ep.method] || "text-white/50"}`}>{ep.method}</span>
              <span className="text-xs font-mono text-white/60">{ep.path}</span>
              <div>
                <p className="text-xs text-white/40">{ep.desc}</p>
                {ep.body && <code className="text-xs text-white/20 font-mono mt-0.5 block">{ep.body}</code>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MQTT ──────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">MQTT Topics</h2>
        <p className="text-white/35 text-sm font-mono mb-6">
          Broker: services.edgeconductor.com:8883 (TLS) · Protocol: MQTT 3.1.1
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
                Register endpoints to receive <code className="text-white/50">telemetry</code>, <code className="text-white/50">alert</code>, <code className="text-white/50">ota</code>, and <code className="text-white/50">device_status</code> events.
                Each request is signed with <code className="text-white/50">X-EC-Signature: sha256=&lt;hmac&gt;</code>.
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
