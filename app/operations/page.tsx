import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Operations — EdgeConductor",
  description: "EdgeConductor powers Device Operations, Fleet Operations, Building Operations, Asset Operations, and Customer Operations — the outcomes enterprise businesses actually buy.",
  alternates: { canonical: "https://edgeconductor.com/operations" },
};

// type = "lifecycle" → horizontal arrow flow (Device)
// type = "entities"  → domain pill grid, no arrows (Fleet, Building, Customer)
// type = "chain"     → special vertical chain + asset type grid (Asset)

type OpOutcome = { title: string; desc: string };

type BaseOp = {
  id: string;
  label: string;
  color: string;
  number: string;
  headline: string;
  sub: string;
  outcomes: OpOutcome[];
  capabilities: string[];
  link: { label: string; href: string };
};
type LifecycleOp = BaseOp & { type: "lifecycle"; flow: string[] };
type EntitiesOp  = BaseOp & { type: "entities";  entities: string[] };
type ChainOp     = BaseOp & { type: "chain"; chain: string[]; assetTypes: string[] };
type Operation   = LifecycleOp | EntitiesOp | ChainOp;

const operations: Operation[] = [
  {
    id: "device",
    type: "lifecycle",
    label: "Device Operations",
    color: "blue",
    number: "01",
    headline: "Manage your product lifecycle from factory floor to retirement",
    sub: "Every product your team manufactures goes through the same stages. Device Operations manages each one — so nothing falls through the cracks between the factory floor and the customer's hands.",
    flow: ["Manufacture", "Deploy", "Operate", "Maintain", "Upgrade", "Retire"],
    outcomes: [
      {
        title: "Every unit tracked from day one",
        desc: "The moment a unit comes off the production line, it exists in your system — serial, product type, firmware version, manufacture date. Not after shipping. Day one.",
      },
      {
        title: "First power-on is automatic onboarding",
        desc: "Customer scans a QR code. Device is provisioned, org is assigned, dashboard access is created — automatically. No manual steps. No helpdesk tickets.",
      },
      {
        title: "Update any device without a site visit",
        desc: "Push a firmware fix to one device or 10,000. Offline devices receive it on next connection. Your field team never touches a device for software issues.",
      },
      {
        title: "Retire cleanly, not just abandon",
        desc: "When a device reaches end of life, decommission it properly — remove from org, archive history, invalidate credentials. A full lifecycle, not just a deployment.",
      },
    ],
    capabilities: ["Device Registry", "CLI Provisioning", "QR Claim Flow", "OTA Campaigns", "Remote Diagnostics"],
    link: { label: "Device Registry →", href: "/platform#registry" },
  },
  {
    id: "fleet",
    type: "entities",
    label: "Fleet Operations",
    color: "amber",
    number: "02",
    headline: "Manage your entire transport operation from one view",
    sub: "You manage vehicles. Your drivers need to be on route. Your maintenance can't fall behind. Your compliance needs to be documented. Fleet Operations puts all of that in one connected view — without switching between five different tools.",
    entities: ["Vehicles", "Drivers", "Trips", "Maintenance", "Compliance"],
    outcomes: [
      {
        title: "Know where every vehicle is right now",
        desc: "Not just a GPS ping — vehicle health, driver, last stop, battery, signal quality. A complete picture of every asset in your fleet, live.",
      },
      {
        title: "Know when something is wrong before you're called",
        desc: "Vehicle offline. Battery dropping fast. Unusual route deviation. Your ops team gets an alert before a driver or customer notices — not after.",
      },
      {
        title: "Know when maintenance is due, not overdue",
        desc: "Anomaly detection watches usage patterns. Maintenance rules fire on schedule or on event. Your team works proactively, not reactively.",
      },
      {
        title: "Know when a compliance event needs documenting",
        desc: "Every geofence event, alert, and route deviation is logged with timestamp and vehicle state. Compliance documentation is automatic.",
      },
    ],
    capabilities: ["Live GPS Tracking", "Offline Alerts", "Anomaly Detection", "Geofencing", "Maintenance Rules"],
    link: { label: "Fleet Solution →", href: "/solutions/tracker" },
  },
  {
    id: "building",
    type: "entities",
    label: "Building Operations",
    color: "cyan",
    number: "03",
    headline: "Manage every building, room, and tenant from one platform",
    sub: "You manage buildings and the people inside them. HVAC needs to respond before tenants complain. Energy needs to be tracked before the bill arrives. Building Operations connects your spaces, automates the routine, and lets tenants self-serve — without you managing it manually.",
    entities: ["Buildings", "Rooms", "Tenants", "HVAC", "Energy", "Maintenance"],
    outcomes: [
      {
        title: "See your entire property portfolio in one view",
        desc: "Every building, every floor, every room — environmental status at a glance. Know which properties need attention without logging into a dozen systems.",
      },
      {
        title: "Know which rooms need attention right now",
        desc: "CO₂ spiking in Room 3B. Temperature drifting on Floor 2. Your team sees the room, the reading, and the action needed — all in one place.",
      },
      {
        title: "Tenants manage their own spaces",
        desc: "Tenants scan a QR code, register, and see their space's live data. They can log maintenance issues. No helpdesk. No manual provisioning on your side.",
      },
      {
        title: "Every building runs under your brand",
        desc: "Each property owner or client gets a white-labeled portal — your logo, your colors. They never see a generic IoT dashboard.",
      },
    ],
    capabilities: ["Property Hierarchy", "Room-Level Monitoring", "Threshold + Schedule Rules", "Tenant QR Access", "White-Label"],
    link: { label: "Climate Solution →", href: "/solutions/climate" },
  },
  {
    id: "asset",
    type: "chain",
    label: "Asset Operations",
    color: "orange",
    number: "04",
    headline: "One complete record per asset — from first power-on to last shutdown",
    sub: "If it has a location, a health state, and a maintenance history — it is an asset you are responsible for. Asset Operations gives every physical asset a live record, alerts you before something breaks, and logs every event for compliance.",
    chain: ["Asset", "Location", "Health", "Configuration", "Lifecycle", "Optimization"],
    assetTypes: ["Vehicle", "HVAC System", "Shipment", "Room", "Machine", "Sensor Node", "Gateway"],
    outcomes: [
      {
        title: "Know where every asset is",
        desc: "Fixed or mobile, every asset has a location record — GPS, site assignment, room mapping, or zone. Know where it is now and where it has been.",
      },
      {
        title: "Know the health of every asset in real time",
        desc: "Temperature, battery, signal, uptime, vibration — every metric for that specific asset type. Live and historically, per individual unit.",
      },
      {
        title: "Change configuration without a site visit",
        desc: "Update alert thresholds, sampling rates, or operational setpoints remotely — delivered via shadow state on next connection.",
      },
      {
        title: "Optimize from actual usage patterns",
        desc: "Anomaly detection learns the baseline for every asset individually. When behavior deviates, you know before any static threshold would fire.",
      },
    ],
    capabilities: ["Asset Registry", "Anomaly Detection", "Shadow Config", "Audit Trail", "Lifecycle Log"],
    link: { label: "Industries →", href: "/industries" },
  },
  {
    id: "customer",
    type: "entities",
    label: "Customer Operations",
    color: "violet",
    number: "05",
    headline: "Run your client business on this platform",
    sub: "You have clients. Each one has their own devices, users, and expectations. Customer Operations lets you manage every client from one place — their devices, their org, their permissions — all under your brand, with their data completely separate from everyone else's.",
    entities: ["Organizations", "Partners", "White Label", "Users", "Permissions", "Support", "Billing"],
    outcomes: [
      {
        title: "Your org structure mirrors your business",
        desc: "Every client is an organization. Every org has its own devices, users, and settings. Your portal shows all of them — isolated from each other, visible to you.",
      },
      {
        title: "Partners manage their clients independently",
        desc: "System integrators create and manage client orgs from a partner portal. They provision devices, invite admins, and monitor deployments — under their own brand.",
      },
      {
        title: "Every client sees your brand, not ours",
        desc: "Custom logo, colors, and org name per client. Your clients experience your product. EdgeConductor stays invisible. You own the relationship.",
      },
      {
        title: "Permissions follow your org hierarchy",
        desc: "Super admin. Partner. Org admin. User. Read-only. Every role maps to how your business works — not a generic model that needs bending to fit.",
      },
    ],
    capabilities: ["Partner Portal", "Multi-Tenant RBAC", "White-Label Branding", "API Key Scoping", "Audit Logs"],
    link: { label: "Partner Program →", href: "/partners" },
  },
];

const colorMap: Record<string, {
  tag: string; arrow: string; cap: string;
  entityBg: string; entityText: string; border: string; glow: string;
  chainLine: string; chainDot: string; chainNode: string;
}> = {
  blue:   {
    tag:       "text-blue-400 bg-blue-500/10 border-blue-500/25",
    arrow:     "text-blue-400/25",
    cap:       "text-blue-300/80 bg-blue-500/8 border-blue-500/20",
    entityBg:  "bg-blue-500/8 border-blue-500/18 text-blue-200/75",
    entityText:"text-blue-200/75",
    border:    "border-blue-500/15",
    glow:      "from-blue-500/5",
    chainLine: "bg-blue-500/20",
    chainDot:  "bg-blue-400",
    chainNode: "bg-blue-500/10 border-blue-500/25 text-blue-300",
  },
  amber:  {
    tag:       "text-amber-400 bg-amber-500/10 border-amber-500/25",
    arrow:     "text-amber-400/25",
    cap:       "text-amber-300/80 bg-amber-500/8 border-amber-500/20",
    entityBg:  "bg-amber-500/8 border-amber-500/18 text-amber-200/75",
    entityText:"text-amber-200/75",
    border:    "border-amber-500/15",
    glow:      "from-amber-500/5",
    chainLine: "bg-amber-500/20",
    chainDot:  "bg-amber-400",
    chainNode: "bg-amber-500/10 border-amber-500/25 text-amber-300",
  },
  cyan:   {
    tag:       "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    arrow:     "text-cyan-400/25",
    cap:       "text-cyan-300/80 bg-cyan-500/8 border-cyan-500/20",
    entityBg:  "bg-cyan-500/8 border-cyan-500/18 text-cyan-200/75",
    entityText:"text-cyan-200/75",
    border:    "border-cyan-500/15",
    glow:      "from-cyan-500/5",
    chainLine: "bg-cyan-500/20",
    chainDot:  "bg-cyan-400",
    chainNode: "bg-cyan-500/10 border-cyan-500/25 text-cyan-300",
  },
  orange: {
    tag:       "text-orange-400 bg-orange-500/10 border-orange-500/25",
    arrow:     "text-orange-400/25",
    cap:       "text-orange-300/80 bg-orange-500/8 border-orange-500/20",
    entityBg:  "bg-orange-500/8 border-orange-500/18 text-orange-200/75",
    entityText:"text-orange-200/75",
    border:    "border-orange-500/15",
    glow:      "from-orange-500/5",
    chainLine: "bg-orange-500/20",
    chainDot:  "bg-orange-400",
    chainNode: "bg-orange-500/10 border-orange-500/25 text-orange-300",
  },
  violet: {
    tag:       "text-violet-400 bg-violet-500/10 border-violet-500/25",
    arrow:     "text-violet-400/25",
    cap:       "text-violet-300/80 bg-violet-500/8 border-violet-500/20",
    entityBg:  "bg-violet-500/8 border-violet-500/18 text-violet-200/75",
    entityText:"text-violet-200/75",
    border:    "border-violet-500/15",
    glow:      "from-violet-500/5",
    chainLine: "bg-violet-500/20",
    chainDot:  "bg-violet-400",
    chainNode: "bg-violet-500/10 border-violet-500/25 text-violet-300",
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
            Manage your fleet, your buildings,<br />
            <span className="text-white/35">or your assets —</span><br />
            from one platform.
          </h1>
          <p className="text-white/45 text-base leading-relaxed mb-8 max-w-2xl">
            Whether you run school buses, commercial buildings, cold chain shipments, or industrial equipment —
            EdgeConductor gives your team live visibility, remote control, and automated alerts.
            No infrastructure to build. No five tools to stitch together.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition">
              Book a Demo →
            </Link>
            <Link href="/demo"
              className="inline-flex items-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-6 py-3 rounded-full transition">
              Try Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Does this sound like you? ─────────────────────────────────────── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-8">Does this sound like you?</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                color: "amber",
                who: "You run a vehicle fleet",
                pain: [
                  "You don't know exactly where every vehicle is right now",
                  "Maintenance is reactive — you fix it after it breaks",
                  "Compliance documentation is done manually after the fact",
                ],
                fix: "Live location for every vehicle. Maintenance alerts before breakdowns. Compliance logs that write themselves.",
                href: "#fleet",
              },
              {
                color: "cyan",
                who: "You manage buildings and tenants",
                pain: [
                  "Tenants call when HVAC fails — you find out last",
                  "Energy bills arrive before you understand what caused them",
                  "Maintenance requests fall through the cracks",
                ],
                fix: "Automated HVAC. Room-by-room environmental monitoring. Tenants self-serve via QR code.",
                href: "#building",
              },
              {
                color: "orange",
                who: "You operate physical assets",
                pain: [
                  "Machines and equipment break without warning",
                  "Configuration changes require someone on-site",
                  "Health data lives in a spreadsheet no one updates",
                ],
                fix: "Anomaly detection catches issues early. Remote configuration. Every asset's health live on one screen.",
                href: "#asset",
              },
            ].map(s => {
              const cc: Record<string, string> = {
                amber:  "border-amber-500/20 bg-amber-500/5 text-amber-400",
                cyan:   "border-cyan-500/20 bg-cyan-500/5 text-cyan-400",
                orange: "border-orange-500/20 bg-orange-500/5 text-orange-400",
              };
              return (
                <a key={s.who} href={s.href}
                  className="group bg-white/2 border border-white/8 hover:border-white/18 hover:bg-white/3 rounded-2xl p-6 transition flex flex-col">
                  <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full w-fit mb-4 ${cc[s.color]}`}>
                    {s.who}
                  </span>
                  <ul className="space-y-2 mb-5 flex-1">
                    {s.pain.map(p => (
                      <li key={p} className="flex items-start gap-2 text-xs text-white/35">
                        <span className="text-white/20 mt-0.5 shrink-0">✕</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/55 leading-relaxed border-t border-white/8 pt-4">
                    <span className="text-green-400">✓ </span>{s.fix}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Operation Cards — portfolio overview ─────────────────────────── */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Choose your operation</span>
          <h2 className="text-2xl font-bold mt-3">What will you run?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              id: "fleet",
              label: "Fleet Operations",
              color: "amber",
              sentence: "Manage vehicles, drivers and compliance from a single platform.",
              entities: ["Vehicles", "Drivers", "Trips", "Maintenance", "Compliance"],
            },
            {
              id: "building",
              label: "Building Operations",
              color: "cyan",
              sentence: "Operate buildings, HVAC and tenant environments remotely.",
              entities: ["Buildings", "Rooms", "Tenants", "HVAC", "Energy", "Maintenance"],
            },
            {
              id: "device",
              label: "Device Operations",
              color: "blue",
              sentence: "Deploy and maintain thousands of connected devices remotely.",
              entities: ["Manufacture", "Deploy", "Operate", "Maintain", "Upgrade", "Retire"],
            },
            {
              id: "asset",
              label: "Asset Operations",
              color: "orange",
              sentence: "Track, monitor and optimize physical assets throughout their lifecycle.",
              entities: ["Asset", "Location", "Health", "Configuration", "Lifecycle", "Optimization"],
            },
            {
              id: "customer",
              label: "Customer Operations",
              color: "violet",
              sentence: "Operate customers, partners and white-label businesses at scale.",
              entities: ["Organizations", "Partners", "White Label", "Users", "Permissions", "Support", "Billing"],
            },
          ].map(card => {
            const c = colorMap[card.color];
            return (
              <a key={card.id} href={`#${card.id}`}
                className={`group bg-white/2 border ${c.border} hover:bg-white/4 hover:border-opacity-50 rounded-2xl p-5 transition flex flex-col`}>
                <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full w-fit mb-3 ${c.tag}`}>
                  {card.label}
                </span>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{card.sentence}</p>
                <ul className="space-y-1.5 flex-1">
                  {card.entities.map(e => (
                    <li key={e} className="flex items-center gap-2 text-sm text-white/45 group-hover:text-white/55 transition">
                      <span className={`w-1 h-1 rounded-full shrink-0 ${colorMap[card.color].chainDot} opacity-50`} />
                      {e}
                    </li>
                  ))}
                </ul>
                <span className={`text-xs mt-4 ${c.tag} opacity-60 group-hover:opacity-100 transition`}>
                  Explore →
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Operations Sections ────────────────────────────────────────────── */}
      {operations.map((op) => {
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
                <span className="text-xs font-mono text-white/20">{op.number}</span>
                <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${c.tag}`}>
                  {op.label}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 max-w-3xl">{op.headline}</h2>
              <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-2xl">{op.sub}</p>

              {/* ── Lifecycle: horizontal arrow flow ── */}
              {op.type === "lifecycle" && (
                <div className="overflow-x-auto mb-10">
                  <div className="flex items-center gap-0 min-w-max">
                    {op.flow.map((step, i) => (
                      <div key={step} className="flex items-center gap-0">
                        <div className={`border rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap ${c.entityBg}`}>
                          {step}
                        </div>
                        {i < op.flow.length - 1 && (
                          <span className={`text-base mx-1.5 ${c.arrow}`}>→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Entities: domain pill grid ── */}
              {op.type === "entities" && (
                <div className="mb-10">
                  <p className="text-xs text-white/25 uppercase tracking-widest mb-3">What you manage</p>
                  <div className="flex flex-wrap gap-2">
                    {op.entities.map(e => (
                      <span key={e} className={`border rounded-full px-4 py-2 text-sm font-medium ${c.entityBg}`}>
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Chain: special Asset Operations layout ── */}
              {op.type === "chain" && (
                <div className="mb-10 grid md:grid-cols-2 gap-8 items-start">
                  {/* Vertical chain */}
                  <div>
                    <p className="text-xs text-white/25 uppercase tracking-widest mb-4">Asset operational chain</p>
                    <div className="flex flex-col gap-0">
                      {op.chain.map((step, i) => (
                        <div key={step} className="flex flex-col items-start">
                          <div className={`border rounded-xl px-5 py-3 text-sm font-semibold w-full ${c.chainNode}`}>
                            {step}
                          </div>
                          {i < op.chain.length - 1 && (
                            <div className="flex flex-col items-start ml-5 gap-0">
                              <div className={`w-px h-3 ${c.chainLine}`} />
                              <span className={`text-xs ${c.arrow} font-mono`}>↓</span>
                              <div className={`w-px h-3 ${c.chainLine}`} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Asset type examples */}
                  <div>
                    <p className="text-xs text-white/25 uppercase tracking-widest mb-4">Works for any asset type</p>
                    <div className="grid grid-cols-2 gap-2">
                      {op.assetTypes.map(at => (
                        <div key={at} className={`border rounded-xl px-4 py-3 text-sm font-medium ${c.entityBg}`}>
                          {at}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-white/25 mt-4 leading-relaxed">
                      Any physical asset that has a sensor, a location, a health state, and
                      a lifecycle can be an asset in EdgeConductor.
                    </p>
                  </div>
                </div>
              )}

              {/* Outcome cards — same for all types */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {op.outcomes.map(o => (
                  <div key={o.title} className={`bg-white/2 border ${c.border} rounded-xl p-5 hover:bg-white/3 transition`}>
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
                  <Link href={op.link.href} className="text-sm text-white/45 hover:text-white transition">
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
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">One platform, every operation</span>
          <h2 className="text-3xl font-bold mt-3 mb-3">Every operation runs on the same core</h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            One core platform — device registry, telemetry, rules, OTA, RBAC — running five different operations.
            Add a new product type without rebuilding anything.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-white/25 uppercase tracking-wider pb-3 font-normal w-44">Operation</th>
                <th className="text-left text-xs text-white/25 uppercase tracking-wider pb-3 font-normal">Platform capabilities that power it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {[
                { label: "Device Operations",   color: "text-blue-400",   caps: ["Device Registry", "CLI Provisioning", "OTA Campaigns", "Remote Reboot", "Diagnostics"] },
                { label: "Fleet Operations",    color: "text-amber-400",  caps: ["GPS Telemetry", "7-Day History", "Anomaly Detection", "Offline Alerts", "Fleet Map"] },
                { label: "Building Operations", color: "text-cyan-400",   caps: ["Property Hierarchy", "Live Sensors", "Rules Engine", "Tenant QR Access", "White-Label"] },
                { label: "Asset Operations",    color: "text-orange-400", caps: ["Asset Registry", "Anomaly Detection", "Shadow Config", "Audit Logs", "Lifecycle Log"] },
                { label: "Customer Operations", color: "text-violet-400", caps: ["Partner Portal", "Multi-Tenant RBAC", "White-Label Branding", "API Keys", "Org Management"] },
              ].map(row => (
                <tr key={row.label}>
                  <td className={`py-4 text-sm font-medium ${row.color} w-44`}>{row.label}</td>
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
          <Link href="/platform" className="text-sm text-white/40 hover:text-white transition">
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
