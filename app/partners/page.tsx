import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Partner Program — EdgeConductor",
  description:
    "Build and sell connected product solutions under your own brand. EdgeConductor's partner program for system integrators, hardware OEMs, and SaaS resellers.",
  alternates: { canonical: "https://edgeconductor.com/partners" },
};

const partnerTypes = [
  {
    icon: "◎",
    color: "blue",
    title: "System Integrators",
    subtitle: "You build and deploy IoT solutions for clients",
    desc: "You win contracts, spec the hardware, install devices, and hand over a working system. With EdgeConductor, you deliver a white-labeled connected product platform — under your brand — without building any cloud infrastructure. Your margins, your client relationship.",
    benefits: [
      "White-label dashboard with your logo and colors",
      "Manage unlimited client orgs from one super admin",
      "QR-code device provisioning — zero-touch client onboarding",
      "SDK and REST API to integrate with your existing tools",
      "Priority support and dedicated onboarding",
    ],
    cta: "Apply as SI Partner →",
  },
  {
    icon: "▣",
    color: "cyan",
    title: "Hardware OEMs",
    subtitle: "You manufacture connected hardware products",
    desc: "You build ESP32 boards, sensors, gateways, or industrial controllers. Bundle EdgeConductor with your hardware and sell a complete connected product — not just a board. Your customers get provisioning, live telemetry, OTA updates, and a control dashboard. Charge recurring platform fees.",
    benefits: [
      "Pre-built firmware SDK for ESP32 and Linux hardware",
      "OTA update campaigns across your entire device fleet",
      "Per-device diagnostics — battery, signal, crash, uptime",
      "White-label portal for your end customers",
      "Bulk device registration and QR provisioning via CLI",
    ],
    cta: "Apply as OEM Partner →",
  },
  {
    icon: "⬡",
    color: "violet",
    title: "SaaS Resellers",
    subtitle: "You already sell B2B software to businesses",
    desc: "You have existing customers in logistics, facilities, manufacturing, or field services. Add IoT telemetry, asset tracking, and automation to your product suite — under your brand — without hiring an embedded team. We handle the hardware layer. You handle the relationship.",
    benefits: [
      "Embeddable dashboard widgets for your existing product",
      "Webhooks and REST API for deep integration",
      "Revenue share model — add recurring IoT tier to your pricing",
      "Your clients never see EdgeConductor",
      "Co-marketing and joint case studies available",
    ],
    cta: "Apply as Reseller →",
  },
];

const colorMap: Record<string, string> = {
  blue:   "text-blue-400 bg-blue-500/10 border-blue-500/25",
  cyan:   "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/25",
};

const howItWorks = [
  { step: "01", title: "Apply", desc: "Fill out the partner application. We'll review your use case and respond within 2 business days." },
  { step: "02", title: "Onboard", desc: "Get your partner account, white-label credentials, and a dedicated onboarding call with our team." },
  { step: "03", title: "Build", desc: "Configure your first client org, register devices, and test the full flow with our sandbox environment." },
  { step: "04", title: "Deploy", desc: "Ship devices to your client. They scan QR codes, self-onboard, and start operating. You get the margin." },
  { step: "05", title: "Scale", desc: "Add more client orgs, more devices, more verticals. The platform scales with you — no infra to manage." },
];

const included = [
  { icon: "◈", label: "White-label branding", desc: "Logo, colors, org name" },
  { icon: "▣", label: "Multi-client management", desc: "One super admin, all orgs" },
  { icon: "□", label: "REST API + SDK", desc: "JS and Python, open" },
  { icon: "↑", label: "OTA campaigns", desc: "Push firmware to fleet" },
  { icon: "⚡", label: "Rules engine", desc: "Threshold + schedule automation" },
  { icon: "◎", label: "Diagnostics", desc: "Battery, signal, crash, uptime" },
  { icon: "⬡", label: "Dashboard builder", desc: "Drag-drop control widgets" },
  { icon: "✦", label: "Audit logs", desc: "Full event trail per org" },
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 pt-20 pb-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-violet-400 uppercase mb-5 border border-violet-500/30 bg-violet-500/8 px-3 py-1.5 rounded-full">
            Partner Program
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
            Sell connected product solutions{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              under your brand.
            </span>
          </h1>
          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">
            We built the platform. You own the client relationship, the branding, and the margin.
            System integrators, hardware OEMs, and SaaS resellers — build faster with EdgeConductor underneath.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition">
              Apply to Partner Program →
            </Link>
            <Link href="/demo"
              className="inline-flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-7 py-3.5 rounded-full transition">
              See the Platform
            </Link>
          </div>
        </div>

        {/* Partner type cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerTypes.map(p => (
            <div key={p.title} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition flex flex-col">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg mb-4 ${colorMap[p.color]}`}>
                {p.icon}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider border px-2 py-0.5 rounded-full w-fit mb-3 ${colorMap[p.color]}`}>
                {p.title}
              </span>
              <p className="text-xs text-white/35 mb-3 font-medium">{p.subtitle}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
              <ul className="space-y-2 mb-6">
                {p.benefits.map(b => (
                  <li key={b} className="flex items-start gap-2 text-xs text-white/50">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/contact"
                className="text-sm text-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 px-4 py-2.5 rounded-xl transition mt-auto">
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">What Partners Get</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">The full platform. Your name on it.</h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">
              Every partner gets access to the complete EdgeConductor platform — not a subset.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {included.map(f => (
              <div key={f.label} className="bg-white/3 border border-white/8 rounded-xl p-4 hover:border-white/15 transition">
                <span className="text-xl text-white/40 block mb-2">{f.icon}</span>
                <p className="text-sm font-semibold text-white/75 mb-0.5">{f.label}</p>
                <p className="text-xs text-white/30">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">How It Works</span>
          <h2 className="text-3xl font-bold mt-3 mb-3">From application to first deployment</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {howItWorks.map((step, i) => (
            <div key={step.step} className="relative">
              <div className="bg-white/3 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition h-full">
                <span className="text-xs font-mono text-white/20 mb-3 block">{step.step}</span>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
              </div>
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 text-white/15 text-sm z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to partner?</h2>
        <p className="text-white/40 text-sm mb-8">
          Tell us what you&apos;re building and which partner tier fits best.
          We respond within 2 business days.
        </p>
        <Link href="/contact"
          className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-8 py-3.5 rounded-full transition">
          Apply to the Partner Program →
        </Link>
        <p className="text-white/25 text-xs mt-4">
          Questions? Email us at <span className="text-white/40">partners@edgeconductor.com</span>
        </p>
      </section>

      <Footer />
    </main>
  );
}
