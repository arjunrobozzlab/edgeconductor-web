"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const INQUIRY_TYPES = [
  { value: "demo",    label: "Book a Demo" },
  { value: "sales",   label: "Sales / Pricing" },
  { value: "support", label: "Technical Support" },
  { value: "bug",     label: "Report a Bug" },
  { value: "partner", label: "Partnership / Integration" },
  { value: "other",   label: "Other" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", company: "",
    inquiry_type: "demo", message: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (type && INQUIRY_TYPES.find(t => t.value === type)) {
      setForm(f => ({ ...f, inquiry_type: type }));
    }
  }, []);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          project_description: `[${INQUIRY_TYPES.find(t => t.value === form.inquiry_type)?.label}]${form.company ? ` — ${form.company}` : ""}\n\n${form.message}`,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue-500/60 transition";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <section className="px-4 md:px-8 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Let&apos;s talk IoT</h1>
          <p className="text-white/45 text-base max-w-lg mx-auto">
            Book a demo, ask about pricing, or tell us about your connected product.
            We respond within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">

          {/* Form — 3 cols */}
          <div className="md:col-span-3">
            {status === "sent" ? (
              <div className="bg-green-500/10 border border-green-500/25 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h2 className="text-xl font-bold mb-2">Message sent!</h2>
                <p className="text-white/50 text-sm mb-6">
                  We&apos;ve received your inquiry and will get back to you within 24 hours at <strong>{form.email}</strong>.
                </p>
                <button onClick={() => { setStatus("idle"); setForm({ name:"", email:"", company:"", inquiry_type:"demo", message:"" }); }}
                  className="text-sm border border-white/20 text-white/60 hover:text-white px-5 py-2.5 rounded-full transition">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white/3 border border-white/10 rounded-2xl p-7 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Name *</label>
                    <input required value={form.name} onChange={set("name")}
                      className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")}
                      className={inputCls} placeholder="you@company.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Company</label>
                    <input value={form.company} onChange={set("company")}
                      className={inputCls} placeholder="Optional" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Inquiry Type *</label>
                    <select required value={form.inquiry_type} onChange={set("inquiry_type")}
                      className={inputCls}>
                      {INQUIRY_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Message *</label>
                  <textarea required value={form.message} onChange={set("message")} rows={5}
                    className={inputCls + " resize-none"}
                    placeholder="Tell us about your IoT product — device type, connectivity, number of devices, use case..." />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">Something went wrong. Please email us directly at edgeconductor@gmail.com</p>
                )}

                <button type="submit" disabled={status === "sending"}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm">
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>

                <p className="text-white/20 text-xs text-center">
                  We respond within 24 hours · No spam, ever
                </p>
              </form>
            )}
          </div>

          {/* Info — 2 cols */}
          <div className="md:col-span-2 space-y-4">
            {[
              {
                icon: "◎",
                title: "Book a Demo",
                desc: "30-minute live walkthrough of the platform — device provisioning, live telemetry, OTA, dashboards, and rules engine.",
              },
              {
                icon: "✦",
                title: "Sales & Pricing",
                desc: "Get a quote based on your device count, org structure, and feature requirements. Free tier available.",
              },
              {
                icon: "◈",
                title: "Technical Support",
                desc: "Help with ESP32 firmware integration, MQTT setup, GSM connectivity, or API questions.",
              },
              {
                icon: "▣",
                title: "Partnership",
                desc: "Hardware manufacturers, system integrators, and resellers — let's build something together.",
              },
            ].map(c => (
              <div key={c.title} className="bg-white/3 border border-white/10 rounded-xl p-5">
                <span className="text-white/25 text-lg mb-2 block">{c.icon}</span>
                <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}

            <div className="bg-white/3 border border-white/10 rounded-xl p-5">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Direct email</p>
              <a href="mailto:edgeconductor@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition text-sm font-medium">
                edgeconductor@gmail.com
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
