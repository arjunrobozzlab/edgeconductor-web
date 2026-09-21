"use client";
import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    inr: null, usd: null,
    label: { inr: "Free", usd: "Free" },
    sub: "No credit card required",
    features: ["5 devices", "1 organization", "Live telemetry", "OTA firmware updates", "QR device claiming", "7-day data history", "Community support"],
    cta: "Start for free",
    href: "https://app.edgeconductor.com/register",
    highlight: false,
  },
  {
    name: "Pro",
    inr: 4999, usd: 59,
    label: { inr: "₹4,999", usd: "$59" },
    sub: "per month",
    features: ["50 devices", "5 organizations", "Everything in Starter", "Rules engine & automation", "Multi-tenant B2B access", "90-day data history", "PDF/Excel reports", "Email + Telegram alerts", "Email support"],
    cta: "Start Pro",
    href: "https://app.edgeconductor.com/register",
    highlight: true,
  },
  {
    name: "Business",
    inr: 14999, usd: 179,
    label: { inr: "₹14,999", usd: "$179" },
    sub: "per month",
    features: ["250 devices", "Unlimited organizations", "Everything in Pro", "White-label branding", "Custom domain", "Audit logs", "1-year data history", "Priority support", "Onboarding call"],
    cta: "Contact Sales",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Enterprise",
    inr: null, usd: null,
    label: { inr: "Custom", usd: "Custom" },
    sub: "talk to us",
    features: ["Unlimited devices", "Unlimited organizations", "Everything in Business", "Self-hosted option", "Custom integrations", "SLA guarantee", "Dedicated support", "Custom contracts"],
    cta: "Talk to Sales",
    href: "/contact",
    highlight: false,
  },
];

export default function PricingCards() {
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");

  return (
    <>
      {/* Currency toggle */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
          <button
            onClick={() => setCurrency("inr")}
            className={`text-sm font-medium px-5 py-1.5 rounded-full transition ${
              currency === "inr"
                ? "bg-white text-black"
                : "text-white/45 hover:text-white/70"
            }`}
          >
            ₹ INR
          </button>
          <button
            onClick={() => setCurrency("usd")}
            className={`text-sm font-medium px-5 py-1.5 rounded-full transition ${
              currency === "usd"
                ? "bg-white text-black"
                : "text-white/45 hover:text-white/70"
            }`}
          >
            $ USD
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map(p => (
          <div key={p.name} className={`rounded-2xl p-6 flex flex-col border transition ${
            p.highlight
              ? "bg-blue-500/10 border-blue-500/30"
              : "bg-white/3 border-white/10 hover:border-white/20"
          }`}>
            {p.highlight && (
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider bg-blue-500/15 border border-blue-500/25 px-2.5 py-1 rounded-full self-start mb-4">
                Most Popular
              </span>
            )}
            <h2 className="text-lg font-bold mb-1">{p.name}</h2>
            <div className="mb-1">
              <span className="text-3xl font-bold">{p.label[currency]}</span>
              {p.inr !== null && (
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
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "border border-white/20 text-white/65 hover:text-white hover:border-white/40"
              }`}>
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
