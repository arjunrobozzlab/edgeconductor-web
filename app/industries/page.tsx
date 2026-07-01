import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Industries — EdgeConductor",
  description:
    "EdgeConductor powers connected asset platforms across fleet management, smart buildings, cold chain, industrial IoT, healthcare, and agriculture.",
  alternates: { canonical: "https://edgeconductor.com/industries" },
};

const industries = [
  {
    id: "fleet",
    icon: "◉",
    color: "blue",
    tag: "Fleet Management",
    headline: "Know where every vehicle is. Always.",
    desc: "Real-time GPS tracking, geofence alerts, remote diagnostics, and OTA firmware updates — managed from a single dashboard. Whether you run 5 trucks or 500, EdgeConductor gives your ops team complete visibility and control without field visits.",
    outcomes: [
      { value: "< 5s", label: "Location update interval" },
      { value: "Zero", label: "Field visits for firmware updates" },
      { value: "GSM + WiFi", label: "Dual connectivity" },
      { value: "Multi-fleet", label: "B2B client isolation" },
    ],
    useCases: ["School bus fleet tracking", "Logistics vehicle management", "Construction equipment monitoring", "Cold chain transport"],
    solution: { label: "EC Tracker", href: "/solutions/tracker" },
  },
  {
    id: "buildings",
    icon: "◫",
    color: "cyan",
    tag: "Smart Buildings & HVAC",
    headline: "Automate climate. Cut energy. Give tenants control.",
    desc: "Multi-room HVAC automation with CO₂, temperature, and humidity sensors. Threshold rules fire automatically — IF CO₂ > 1000 ppm → HVAC ON. Tenants get QR-code access to their floor. Building managers see every room from one dashboard.",
    outcomes: [
      { value: "30s", label: "Rule evaluation interval" },
      { value: "QR access", label: "Tenant onboarding" },
      { value: "Multi-room", label: "Per-room control" },
      { value: "Email alerts", label: "Ops notification" },
    ],
    useCases: ["Commercial office buildings", "Hotels and hospitality", "Schools and universities", "Data centers"],
    solution: { label: "EC Climate", href: "/solutions/climate" },
  },
  {
    id: "coldchain",
    icon: "◁",
    color: "violet",
    tag: "Cold Chain & Logistics",
    headline: "Every shipment. Every degree. Accounted for.",
    desc: "Monitor temperature and humidity across warehouses, refrigerated trucks, and pharmaceutical storage. Instant alerts when thresholds are breached. Compliance reports auto-generated. Chain-of-custody visibility from manufacturer to end point.",
    outcomes: [
      { value: "Real-time", label: "Temperature monitoring" },
      { value: "Instant", label: "Breach alerts" },
      { value: "Auto", label: "Compliance reports" },
      { value: "End-to-end", label: "Chain visibility" },
    ],
    useCases: ["Pharmaceutical cold storage", "Food & beverage logistics", "Vaccine distribution", "Chemical transport"],
    solution: { label: "Coming Soon", href: "/contact" },
  },
  {
    id: "industrial",
    icon: "⬡",
    color: "orange",
    tag: "Industrial IoT",
    headline: "Connect your machines. Eliminate downtime.",
    desc: "Connect legacy machines via Modbus RTU, BACnet, or RS485. Monitor vibration, current, pressure, and temperature. Rules fire before failures happen. OTA updates keep firmware fresh across every machine on the floor.",
    outcomes: [
      { value: "Modbus", label: "Legacy protocol support" },
      { value: "OTA", label: "Remote firmware updates" },
      { value: "Threshold rules", label: "Pre-failure alerts" },
      { value: "Multi-site", label: "Plant-to-plant visibility" },
    ],
    useCases: ["Manufacturing plant monitoring", "Water treatment facilities", "Energy & utilities", "Pump and motor control"],
    solution: { label: "Contact Us", href: "/contact" },
  },
  {
    id: "agriculture",
    icon: "◈",
    color: "green",
    tag: "Agriculture & Environment",
    headline: "Grow smarter with data from the field.",
    desc: "Deploy soil moisture, temperature, and humidity sensors across fields. Automate irrigation pumps via rules. Monitor crop conditions remotely. Low-power GSM connectivity works even in rural areas with no WiFi.",
    outcomes: [
      { value: "GSM", label: "Rural connectivity" },
      { value: "Low-power", label: "Battery life optimized" },
      { value: "Auto-irrigation", label: "Rules-based control" },
      { value: "Multi-farm", label: "Client isolation" },
    ],
    useCases: ["Precision farming", "Greenhouse monitoring", "Irrigation automation", "Environmental compliance"],
    solution: { label: "Contact Us", href: "/contact" },
  },
  {
    id: "healthcare",
    icon: "◎",
    color: "rose",
    tag: "Healthcare Assets",
    headline: "Track every asset. Ensure every compliance.",
    desc: "Monitor medical equipment location, environment conditions in storage rooms, and refrigeration for medications. Automated alerts for out-of-range temperature. Audit trails for every event. RBAC ensures only authorized staff see patient-adjacent data.",
    outcomes: [
      { value: "Real-time", label: "Asset location" },
      { value: "Audit trail", label: "Immutable event log" },
      { value: "RBAC", label: "Role-based access" },
      { value: "Instant", label: "Compliance alerts" },
    ],
    useCases: ["Medical equipment tracking", "Medication refrigeration", "OR room environment", "Hospital asset management"],
    solution: { label: "Contact Us", href: "/contact" },
  },
];

const colorMap: Record<string, { tag: string; border: string; icon: string; outcome: string }> = {
  blue:   { tag: "text-blue-400 bg-blue-500/10 border-blue-500/25",    border: "border-blue-500/20",   icon: "text-blue-400",   outcome: "border-blue-500/15 bg-blue-500/5"   },
  cyan:   { tag: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",    border: "border-cyan-500/20",   icon: "text-cyan-400",   outcome: "border-cyan-500/15 bg-cyan-500/5"   },
  violet: { tag: "text-violet-400 bg-violet-500/10 border-violet-500/25", border: "border-violet-500/20", icon: "text-violet-400", outcome: "border-violet-500/15 bg-violet-500/5" },
  orange: { tag: "text-orange-400 bg-orange-500/10 border-orange-500/25", border: "border-orange-500/20", icon: "text-orange-400", outcome: "border-orange-500/15 bg-orange-500/5" },
  green:  { tag: "text-green-400 bg-green-500/10 border-green-500/25",  border: "border-green-500/20",  icon: "text-green-400",  outcome: "border-green-500/15 bg-green-500/5"  },
  rose:   { tag: "text-rose-400 bg-rose-500/10 border-rose-500/25",    border: "border-rose-500/20",   icon: "text-rose-400",   outcome: "border-rose-500/15 bg-rose-500/5"   },
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 pt-20 pb-16 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Industries</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
          Every connected asset. Every industry.
        </h1>
        <p className="text-white/45 text-base max-w-2xl mx-auto mb-8">
          EdgeConductor&apos;s platform core is industry-agnostic. The same registry, telemetry, OTA,
          and rules engine powers fleet management, smart buildings, cold chain, industrial IoT, and more.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map(ind => (
            <a key={ind.id} href={`#${ind.id}`}
              className={`text-xs border px-3 py-1.5 rounded-full transition hover:text-white ${colorMap[ind.color].tag}`}>
              {ind.tag}
            </a>
          ))}
        </div>
      </section>

      {/* Industry sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {industries.map((ind, i) => {
          const c = colorMap[ind.color];
          const flip = i % 2 === 1;
          return (
            <section key={ind.id} id={ind.id} className="border-t border-white/8 py-20 md:py-24">
              <div className={`grid md:grid-cols-2 gap-12 items-start`}>

                {/* Content */}
                <div className={flip ? "md:order-2" : ""}>
                  <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${c.tag}`}>
                    {ind.tag}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-4">{ind.headline}</h2>
                  <p className="text-white/45 text-sm leading-relaxed mb-6">{ind.desc}</p>

                  {/* Use cases */}
                  <div className="mb-6">
                    <p className="text-xs text-white/25 uppercase tracking-widest mb-3">Common use cases</p>
                    <ul className="space-y-2">
                      {ind.useCases.map(u => (
                        <li key={u} className="flex items-center gap-2.5 text-sm text-white/55">
                          <span className={`text-sm ${c.icon}`}>→</span>
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={ind.solution.href}
                    className={`inline-flex items-center gap-2 border text-sm font-medium px-5 py-2.5 rounded-xl transition ${c.tag} hover:opacity-80`}>
                    {ind.solution.label === "Coming Soon" ? `${ind.solution.label}` : `See ${ind.solution.label} →`}
                  </Link>
                </div>

                {/* Outcome metrics */}
                <div className={flip ? "md:order-1" : ""}>
                  <div className={`border rounded-2xl p-6 ${c.border} bg-white/2`}>
                    <p className="text-xs text-white/25 uppercase tracking-widest mb-5">Outcomes</p>
                    <div className="grid grid-cols-2 gap-4">
                      {ind.outcomes.map(o => (
                        <div key={o.label} className={`border rounded-xl p-4 ${c.outcome}`}>
                          <p className="text-2xl font-bold text-white mb-1">{o.value}</p>
                          <p className="text-xs text-white/40">{o.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-5 border-t border-white/8">
                      <p className="text-xs text-white/20 uppercase tracking-widest mb-3">Platform capabilities used</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Asset Registry", "Live Telemetry", "OTA Updates", "Rules Engine", "Multi-Tenant", "Alerts"].map(cap => (
                          <span key={cap} className="text-xs bg-white/5 text-white/35 border border-white/8 px-2.5 py-1 rounded-full">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Don&apos;t see your industry?</h2>
        <p className="text-white/40 text-sm mb-8">
          The platform core works for any connected asset. Tell us what you&apos;re building —
          we&apos;ll scope a solution together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact"
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition">
            Talk to Us →
          </Link>
          <Link href="/demo"
            className="inline-flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-7 py-3.5 rounded-full transition">
            Try Live Demo
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
