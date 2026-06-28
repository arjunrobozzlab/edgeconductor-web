"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PLATFORM = "https://ec-platform-ten.vercel.app";

const FREE_FEATURES = [
  "5 devices",
  "1 organization",
  "Live telemetry + historical charts",
  "OTA firmware updates",
  "QR device claiming",
  "7-day data history",
  "Rules engine (threshold + schedule)",
  "Webhook alerts",
];

const PRO_FEATURES = [
  "50 devices · 5 organizations",
  "Everything in Free",
  "90-day data history",
  "PDF/Excel weekly reports",
  "Multi-tenant B2B access",
  "Email + Telegram alerts",
  "Priority support",
  "Onboarding call",
];

type Plan    = "free" | "pro";
type Product = "climate" | "tracker" | "home";
type Status  = "idle" | "loading" | "success" | "error";

const PRODUCTS: { key: Product; icon: string; label: string; desc: string; color: string }[] = [
  { key: "climate", icon: "🌡", label: "EC Climate",  desc: "Smart Building · HVAC · CO₂ · Multi-Room",   color: "border-cyan-500/40 bg-cyan-500/8 text-cyan-400"   },
  { key: "tracker", icon: "📍", label: "EC Tracker",  desc: "GPS Fleet · Vehicle Tracking · Remote Reboot", color: "border-blue-500/40 bg-blue-500/8 text-blue-400"   },
  { key: "home",    icon: "🏠", label: "EC Home",     desc: "Home Automation · Relay · Energy · Scenes",    color: "border-green-500/40 bg-green-500/8 text-green-400" },
];

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue-500/60 transition";

export default function GetStartedPage() {
  const [plan, setPlan]       = useState<Plan>("free");
  const [product, setProduct] = useState<Product>("climate");
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setError]  = useState("");
  const [email, setEmail]     = useState("");
  const [form, setForm]       = useState({ name: "", email: "", company: "", password: "", confirm: "" });

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(p => ({ ...p, [field]: e.target.value }));
      if (field === "email") setEmail(e.target.value);
    };
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setStatus("loading"); setError("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, company: form.company, password: form.password, product_type: product }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); setStatus("error"); return; }
      setStatus("success");
    } catch {
      setError("Network error. Please try again."); setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <section className="px-4 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Get Started</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Start building your IoT product</h1>
          <p className="text-white/45 text-base max-w-lg mx-auto">
            Free forever for up to 5 devices. No credit card required.
          </p>
        </div>

        {/* Plan toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            {(["free", "pro"] as Plan[]).map(p => (
              <button key={p} onClick={() => setPlan(p)}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition ${
                  plan === p ? "bg-blue-500 text-white" : "text-white/50 hover:text-white"
                }`}>
                {p === "free" ? "Starter — Free" : "Pro — ₹4,999/mo"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">

          {/* Left — Form or Pro CTA */}
          <div>
            {status === "success" ? (
              <div className="bg-green-500/10 border border-green-500/25 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5 text-2xl">
                  ✓
                </div>
                <h2 className="text-xl font-bold mb-2">Account created!</h2>
                <p className="text-white/50 text-sm mb-2">
                  We sent two emails to <strong className="text-white">{email}</strong>:
                </p>
                <ul className="text-white/40 text-sm space-y-1 mb-6">
                  <li>1. A <strong className="text-white">confirmation link</strong> from Supabase — click it to activate</li>
                  <li>2. A <strong className="text-white">welcome email</strong> from EdgeConductor with your dashboard link</li>
                </ul>
                <a href={`${PLATFORM}/portal/login`}
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition">
                  Open Dashboard →
                </a>
                <p className="text-white/20 text-xs mt-4">
                  Confirm your email first, then sign in
                </p>
              </div>
            ) : plan === "pro" ? (
              <div className="bg-white/3 border border-white/10 rounded-2xl p-8 text-center">
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Pro Plan</span>
                <div className="text-4xl font-bold my-3">₹4,999<span className="text-white/30 text-lg">/mo</span></div>
                <p className="text-white/45 text-sm mb-8">
                  Get a demo call — we&apos;ll scope your requirements, set up your org, and onboard your team.
                </p>
                <Link href="/contact?type=sales"
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-3 rounded-xl transition text-center mb-3">
                  Talk to Sales →
                </Link>
                <Link href="/contact"
                  className="block w-full border border-white/15 text-white/60 hover:text-white text-sm py-3 rounded-xl transition text-center">
                  Book a Demo
                </Link>
                <p className="text-white/20 text-xs mt-4">Typical onboarding: 1–2 business days</p>
              </div>
            ) : (
              <form onSubmit={submit}
                className="bg-white/3 border border-white/10 rounded-2xl p-7 space-y-4">
                <h2 className="text-lg font-bold mb-1">Create your account</h2>
                <p className="text-white/35 text-sm">Free forever · No credit card</p>

                {/* Product type selector */}
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">What are you building? *</label>
                  <div className="space-y-2">
                    {PRODUCTS.map(p => (
                      <button key={p.key} type="button" onClick={() => setProduct(p.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition ${
                          product === p.key ? p.color : "border-white/10 bg-white/3 text-white/50 hover:border-white/20"
                        }`}>
                        <span className="text-xl">{p.icon}</span>
                        <div>
                          <p className={`text-sm font-semibold ${product === p.key ? "" : "text-white/60"}`}>{p.label}</p>
                          <p className="text-xs opacity-60">{p.desc}</p>
                        </div>
                        {product === p.key && <span className="ml-auto text-xs font-bold">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input required value={form.name} onChange={set("name")}
                      className={inputCls} placeholder="Your name" autoFocus />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")}
                      className={inputCls} placeholder="you@company.com" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Company <span className="text-white/20 normal-case">(optional)</span></label>
                    <input value={form.company} onChange={set("company")}
                      className={inputCls} placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Password *</label>
                    <input required type="password" value={form.password} onChange={set("password")}
                      className={inputCls} placeholder="Min 6 chars" minLength={6} />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Confirm *</label>
                    <input required type="password" value={form.confirm} onChange={set("confirm")}
                      className={inputCls} placeholder="Repeat password" />
                  </div>
                </div>

                {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

                <button type="submit" disabled={status === "loading"}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm">
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : "Create Free Account →"}
                </button>

                <p className="text-white/20 text-xs text-center leading-relaxed">
                  By signing up you agree to our terms · No credit card required
                </p>

                <div className="border-t border-white/8 pt-4 text-center">
                  <span className="text-white/30 text-xs">Already have an account? </span>
                  <a href={`${PLATFORM}/portal/login`}
                    className="text-blue-400 hover:text-blue-300 text-xs transition">
                    Sign in →
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right — Feature list */}
          <div className="space-y-4">
            <div className={`rounded-2xl p-6 border transition-all ${
              plan === "free"
                ? "bg-blue-500/8 border-blue-500/25"
                : "bg-white/3 border-white/10"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">{plan === "free" ? "Starter — Free" : "Pro — ₹4,999/mo"}</h3>
                {plan === "free" && (
                  <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-1 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              <ul className="space-y-2.5">
                {(plan === "free" ? FREE_FEATURES : PRO_FEATURES).map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust signals */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-5 space-y-3">
              {[
                { icon: "◎", text: "Hardware-validated on real ESP32 + GSM devices" },
                { icon: "◈", text: "Live telemetry in < 5 seconds end-to-end" },
                { icon: "▣", text: "Used by DPS School and Germany Climate GmbH" },
                { icon: "↑", text: "OTA firmware push from dashboard" },
              ].map(t => (
                <div key={t.text} className="flex items-start gap-3">
                  <span className="text-blue-400 text-sm shrink-0 mt-0.5">{t.icon}</span>
                  <span className="text-white/40 text-xs leading-relaxed">{t.text}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-white/25 text-xs">
                Questions? <Link href="/contact" className="text-blue-400 hover:text-blue-300">Talk to us →</Link>
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
