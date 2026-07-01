import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { industries, colorMap } from "./data";

export const metadata: Metadata = {
  title: "Industries — EdgeConductor Connected Asset Platform",
  description:
    "EdgeConductor powers connected asset platforms across fleet management, smart buildings, cold chain & pharma, industrial IoT, healthcare, and energy & utilities.",
  alternates: { canonical: "https://edgeconductor.com/industries" },
};

const commonCapabilities = [
  { icon: "▣", label: "Device Registry", desc: "Every asset provisioned, assigned, and tracked from manufacture to field" },
  { icon: "◈", label: "Live Telemetry", desc: "Sensor data every 5 seconds — temperature, GPS, power, vibration, anything" },
  { icon: "↑", label: "OTA Updates", desc: "Push firmware to any device, any location, any connectivity — no truck rolls" },
  { icon: "⚡", label: "Rules Engine", desc: "Threshold + schedule rules that evaluate every 30 seconds and fire alerts instantly" },
  { icon: "◎", label: "Multi-Tenant B2B", desc: "Each client gets their own org, data isolation, and branded access" },
  { icon: "□", label: "White-Label Ready", desc: "Your logo, your domain, your product — EdgeConductor runs underneath" },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="px-4 md:px-8 pt-20 pb-16 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Industries</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
          One platform. Every connected asset industry.
        </h1>
        <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto mb-8">
          EdgeConductor&apos;s platform core — device registry, live telemetry, OTA, rules engine, multi-tenant B2B — is
          industry-agnostic. The same infrastructure powers fleet management, cold chain pharma, industrial monitoring,
          healthcare assets, and energy utilities.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map((ind) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`}
              className={`text-xs border px-3.5 py-1.5 rounded-full transition hover:opacity-90 ${colorMap[ind.color].tag}`}>
              {ind.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ── INDUSTRY CARDS ── */}
      <section className="px-4 md:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => {
            const c = colorMap[ind.color];
            return (
              <Link key={ind.slug} href={`/industries/${ind.slug}`}
                className="group bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.05] transition flex flex-col">

                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider border px-2.5 py-1 rounded-full ${c.tag}`}>
                    {ind.name}
                  </span>
                  <span className="text-white/20 text-xs">{ind.category}</span>
                </div>

                <h2 className="text-lg font-bold text-white/85 group-hover:text-white transition leading-snug mb-3">
                  {ind.heroHeadline}
                </h2>

                <p className="text-white/38 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                  {ind.heroSub}
                </p>

                {/* Outcome preview */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {ind.outcomes.slice(0, 2).map((o) => (
                    <div key={o.label} className={`border rounded-xl px-3 py-2.5 ${c.outcome}`}>
                      <p className="text-sm font-bold text-white">{o.value}</p>
                      <p className="text-[10px] text-white/30 mt-0.5 leading-tight">{o.label}</p>
                    </div>
                  ))}
                </div>

                <div className={`flex items-center gap-2 text-sm font-medium ${c.tag.split(" ")[0]} group-hover:opacity-80 transition`}>
                  See {ind.name} solutions
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── COMMON PLATFORM CAPABILITIES ── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-white/28 uppercase">Platform Core</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              The same infrastructure. Every industry.
            </h2>
            <p className="text-white/45 text-sm max-w-xl mx-auto">
              Whether you&apos;re tracking pharma shipments or monitoring wind turbines, the platform core is identical.
              Industry solutions are vertical configurations on top of the same foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonCapabilities.map((cap) => (
              <div key={cap.label} className="bg-white/[0.02] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-base mb-4">
                  {cap.icon}
                </div>
                <p className="font-semibold text-white/75 mb-1.5 text-sm">{cap.label}</p>
                <p className="text-xs text-white/35 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI COMPARISON ── */}
      <section className="px-4 md:px-8 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/28 uppercase">Why EdgeConductor</span>
          <h2 className="text-3xl font-bold mt-3 mb-4">
            Industry-specific outcomes. Platform-level efficiency.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              metric: "10 min",
              label: "First device live",
              desc: "From account creation to live telemetry — across any industry, any hardware.",
            },
            {
              metric: "6 weeks",
              label: "Client deployment",
              desc: "From first device to first white-labeled client portal delivered to your customer.",
            },
            {
              metric: "Zero",
              label: "Infrastructure to build",
              desc: "No MQTT broker to configure, no multi-tenant DB schema, no OTA pipeline to build.",
            },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 text-center hover:border-white/15 transition">
              <p className="text-4xl font-bold text-white mb-1">{s.metric}</p>
              <p className="text-sm font-semibold text-white/60 mb-3">{s.label}</p>
              <p className="text-xs text-white/35 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Don&apos;t see your industry?</h2>
        <p className="text-white/40 text-sm mb-8">
          The platform core works for any connected asset. Tell us what you&apos;re building —
          hardware type, connectivity, number of assets, B2B or direct. We&apos;ll scope it together.
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
