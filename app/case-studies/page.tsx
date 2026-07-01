import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Case Studies — EdgeConductor",
  description:
    "Real connected product deployments powered by EdgeConductor — GPS fleet tracking for schools, HVAC automation for commercial buildings, and more.",
  alternates: { canonical: "https://edgeconductor.com/case-studies" },
};

const caseStudies = [
  {
    id: "dps-school",
    featured: true,
    category: "Fleet Management",
    industry: "Education",
    color: "blue",
    title: "DPS School — Student Bus Fleet Tracking",
    headline: "Real-time GPS visibility for 40+ school buses. Zero missed locations.",
    summary:
      "Deployed EdgeConductor's EC Tracker solution for a school fleet. Each bus carries an ESP32 + GSM module sending location every 5 seconds. Parents and operations staff track buses live on a map dashboard. Remote reboot and OTA firmware updates eliminate field visits. The school org admin manages all devices and receives offline alerts if a tracker goes silent.",
    outcomes: [
      { label: "Location update", value: "Every 5s" },
      { label: "Field visits for updates", value: "Zero" },
      { label: "Live tracking", value: "Real-time" },
      { label: "Offline alert", value: "15 min" },
    ],
    stack: ["ESP32 + A7672S GSM", "External GP-02 GPS", "HTTPS Telemetry", "EdgeConductor Registry", "Fleet Map Dashboard", "OTA Updates"],
    result: "School operations team has full GPS visibility. Firmware updated remotely. Zero hardware downtime in 3 months of production.",
    liveLabel: "Hardware Validated",
    solution: { label: "EC Tracker", href: "/solutions/tracker" },
  },
  {
    id: "germany-climate",
    featured: false,
    category: "Smart Buildings",
    industry: "Commercial Real Estate",
    color: "cyan",
    title: "Germany Climate GmbH — Multi-Room HVAC Automation",
    headline: "3 commercial buildings automated. HVAC runs on rules, not manual switches.",
    summary:
      "Deployed EC Climate across 3 office buildings in Germany. Each room has an ESP32 with BME280 and MH-Z19 CO₂ sensors, connected via MQTT to EdgeConductor cloud. Automated rules fire HVAC relay when CO₂ exceeds 1000 ppm. Night shutoff schedule runs at 22:00 Mon–Fri. Each floor tenant gets QR-code access to view their room climate. The org admin manages all buildings from one dashboard.",
    outcomes: [
      { label: "CO₂ rule latency", value: "< 30s" },
      { label: "Buildings", value: "3" },
      { label: "Manual HVAC interventions", value: "~Zero" },
      { label: "Tenant onboarding", value: "QR scan" },
    ],
    stack: ["ESP32 + BME280", "MH-Z19 CO₂", "HVAC Relay", "MQTT TLS", "Threshold Rules", "Schedule Rules", "Tenant QR Access"],
    result: "HVAC automation reduced manual interventions to near-zero. Tenants self-onboard via QR. Energy consumption reduced by removing always-on HVAC.",
    liveLabel: "Production Live",
    solution: { label: "EC Climate", href: "/solutions/climate" },
  },
  {
    id: "multi-network",
    featured: false,
    category: "Industrial IoT",
    industry: "Industrial",
    color: "orange",
    title: "Multi-Network Industrial Asset Monitor",
    headline: "WiFi down? Ethernet down? 4G kicks in. Zero data loss on network switch.",
    summary:
      "Built an industrial IoT device that automatically switches between Ethernet, WiFi, and 4G GSM based on real-time network availability. The device reads sensor data and transmits continuously using whichever network is live. Remote relay control via EdgeConductor shadow/desired. OTA firmware updates without touching the device on site.",
    outcomes: [
      { label: "Networks", value: "WiFi + ETH + 4G" },
      { label: "Failover", value: "Automatic" },
      { label: "Data loss on switch", value: "Zero" },
      { label: "Remote control", value: "Shadow relay" },
    ],
    stack: ["ESP32", "4G GSM Module", "Ethernet", "WiFi", "Relay Control", "EdgeConductor Shadow", "OTA"],
    result: "Industrial site maintains continuous telemetry even during network outages. Operations team controls equipment remotely via dashboard.",
    liveLabel: "Deployed",
    solution: { label: "Contact Us", href: "/contact" },
  },
];

const colorMap: Record<string, { tag: string; border: string; outcome: string; live: string }> = {
  blue:   { tag: "text-blue-400 bg-blue-500/10 border-blue-500/25",   border: "border-blue-500/25",   outcome: "bg-blue-500/5 border-blue-500/15",   live: "text-blue-400 bg-blue-500/10 border-blue-500/25" },
  cyan:   { tag: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",   border: "border-cyan-500/25",   outcome: "bg-cyan-500/5 border-cyan-500/15",   live: "text-green-400 bg-green-500/10 border-green-500/25" },
  orange: { tag: "text-orange-400 bg-orange-500/10 border-orange-500/25", border: "border-orange-500/25", outcome: "bg-orange-500/5 border-orange-500/15", live: "text-orange-400 bg-orange-500/10 border-orange-500/25" },
};

export default function CaseStudiesPage() {
  const featured = caseStudies.find(c => c.featured)!;
  const rest = caseStudies.filter(c => !c.featured);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 pt-20 pb-14 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Case Studies</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5">Real deployments. Real outcomes.</h1>
        <p className="text-white/45 text-sm md:text-base max-w-2xl mx-auto">
          EdgeConductor powers connected products in production — from school bus fleets to multi-building HVAC automation.
          Every case study below is real hardware, real clients, real results.
        </p>
      </section>

      {/* Featured case study */}
      <section className="px-4 md:px-8 pb-10 max-w-7xl mx-auto">
        <div className={`relative border rounded-2xl p-6 md:p-10 overflow-hidden ${colorMap[featured.color].border} bg-white/2`}>
          <div className="absolute top-5 right-5 md:top-6 md:right-6">
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${colorMap[featured.color].tag}`}>
              {featured.liveLabel}
            </span>
          </div>

          <span className={`text-xs font-semibold uppercase tracking-wider ${colorMap[featured.color].tag} border px-2 py-0.5 rounded-full`}>
            {featured.category}
          </span>
          <h2 className="text-xl md:text-3xl font-bold mt-3 mb-2 pr-20 md:pr-28">{featured.title}</h2>
          <p className="text-white/60 font-medium text-sm md:text-base mb-5">{featured.headline}</p>
          <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-3xl">{featured.summary}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {featured.outcomes.map(o => (
              <div key={o.label} className={`flex flex-col items-center border rounded-xl px-5 py-3 min-w-[100px] ${colorMap[featured.color].outcome}`}>
                <span className="text-xl font-bold text-white leading-tight">{o.value}</span>
                <span className="text-[10px] text-white/35 mt-0.5 text-center">{o.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/3 border border-white/8 rounded-xl px-5 py-4 mb-6 max-w-2xl">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-1.5">Result</p>
            <p className="text-sm text-white/60">{featured.result}</p>
          </div>

          <div className="mb-6">
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-semibold mb-2">Stack</p>
            <div className="flex flex-wrap gap-2">
              {featured.stack.map(s => (
                <span key={s} className="text-xs bg-white/8 text-white/45 px-2.5 py-1 rounded-full border border-white/8">{s}</span>
              ))}
            </div>
          </div>

          <Link href={featured.solution.href}
            className={`inline-flex items-center gap-2 border text-sm font-medium px-5 py-2.5 rounded-xl transition ${colorMap[featured.color].tag} hover:opacity-80`}>
            See {featured.solution.label} Solution →
          </Link>
        </div>
      </section>

      {/* Rest of case studies */}
      <section className="px-4 md:px-8 pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map(cs => (
            <div key={cs.id} className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-white/20 transition">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold uppercase tracking-wider border px-2 py-0.5 rounded-full ${colorMap[cs.color].tag}`}>
                  {cs.category}
                </span>
                <span className={`text-xs border px-2 py-0.5 rounded-full ${colorMap[cs.color].live}`}>
                  {cs.liveLabel}
                </span>
              </div>
              <h3 className="font-semibold text-lg leading-snug mb-2">{cs.title}</h3>
              <p className="text-white/40 text-xs font-medium mb-4 leading-relaxed">{cs.headline}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{cs.summary}</p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {cs.outcomes.map(o => (
                  <div key={o.label} className={`border rounded-xl px-3 py-2.5 ${colorMap[cs.color].outcome}`}>
                    <div className="text-sm font-bold text-white">{o.value}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{o.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/3 border border-white/8 rounded-xl px-4 py-3 mb-4">
                <p className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Result</p>
                <p className="text-xs text-white/50">{cs.result}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {cs.stack.map(s => (
                  <span key={s} className="text-xs bg-white/8 text-white/40 px-2 py-1 rounded-full border border-white/8">{s}</span>
                ))}
              </div>

              <Link href={cs.solution.href}
                className="text-sm text-center border border-white/20 text-white/50 hover:text-white hover:border-white/40 px-4 py-2 rounded-xl transition mt-auto">
                {cs.solution.label === "Contact Us" ? "Build Something Similar →" : `See ${cs.solution.label} →`}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Building something similar?</h2>
        <p className="text-white/40 text-sm mb-8">
          Whether it&apos;s fleet tracking, building automation, cold chain, or industrial monitoring —
          tell us what you&apos;re building and we&apos;ll scope a solution.
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
