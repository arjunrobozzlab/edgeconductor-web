import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Pricing — EdgeConductor",
  description: "Simple, transparent pricing for IoT teams of all sizes. Free tier to Enterprise.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    sub: "No credit card required",
    features: ["5 devices", "1 organization", "Live telemetry", "OTA firmware updates", "QR device claiming", "7-day data history", "Community support"],
    cta: "Start for free",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹4,999",
    sub: "per month",
    features: ["50 devices", "5 organizations", "Everything in Starter", "Rules engine & automation", "Multi-tenant B2B access", "90-day data history", "PDF/Excel reports", "Email + Telegram alerts", "Email support"],
    cta: "Start Pro",
    href: "/contact",
    highlight: true,
  },
  {
    name: "Business",
    price: "₹14,999",
    sub: "per month",
    features: ["250 devices", "Unlimited organizations", "Everything in Pro", "White-label branding", "Custom domain", "Audit logs", "1-year data history", "Priority support", "Onboarding call"],
    cta: "Contact Sales",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "talk to us",
    features: ["Unlimited devices", "Unlimited organizations", "Everything in Business", "Self-hosted option", "Custom integrations", "SLA guarantee", "Dedicated support", "Custom contracts"],
    cta: "Talk to Sales",
    href: "/contact",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Pricing</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Simple, transparent pricing</h1>
          <p className="text-white/45 text-base max-w-lg mx-auto">
            Start free, scale as you grow. No surprise fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map(p => (
            <div key={p.name} className={`rounded-2xl p-6 flex flex-col border transition ${
              p.highlight
                ? 'bg-blue-500/10 border-blue-500/30'
                : 'bg-white/3 border-white/10 hover:border-white/20'
            }`}>
              {p.highlight && (
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider bg-blue-500/15 border border-blue-500/25 px-2.5 py-1 rounded-full self-start mb-4">
                  Most Popular
                </span>
              )}
              <h2 className="text-lg font-bold mb-1">{p.name}</h2>
              <div className="mb-1">
                <span className="text-3xl font-bold">{p.price}</span>
                {p.price !== "Free" && p.price !== "Custom" && (
                  <span className="text-white/40 text-sm ml-1">/mo</span>
                )}
              </div>
              <p className="text-white/35 text-xs mb-6">{p.sub}</p>
              <ul className="space-y-2.5 flex-1 mb-7">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/55">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={p.href}
                className={`text-sm font-medium px-4 py-2.5 rounded-xl text-center transition ${
                  p.highlight
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'border border-white/20 text-white/65 hover:text-white hover:border-white/40'
                }`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-10">
          All prices in INR. USD pricing available. Per-device pricing for large deployments — <Link href="/contact" className="underline hover:text-white/50">contact us</Link>.
        </p>
      </section>
      <Footer />
    </main>
  );
}
