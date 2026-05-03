"use client";
import { useState } from "react";

const agents = [
  {
    id: "inquiry",
    icon: "📬",
    title: "Inquiry Agent",
    desc: "Send a project brief — get contacted within 24 hours.",
    active: true,
  },
  {
    id: "scoper",
    icon: "🔧",
    title: "Project Scoper",
    desc: "Describe your idea — get hardware recommendations + cost estimate.",
    active: false,
  },
  {
    id: "matcher",
    icon: "🤖",
    title: "Tech Stack Matcher",
    desc: "Tell us what you want to build — get the right tech stack suggested.",
    active: false,
  },
];

export default function AgentsSection() {
  const [active, setActive] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", project_description: "", budget: "", timeline: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleInquiry() {
    if (!form.name || !form.email || !form.project_description) {
      setError("Name, email and project description are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.edgeconductor.com/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="agents" className="px-8 py-20 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold">Try Our Agents</h2>
        <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full font-semibold">Live</span>
      </div>
      <p className="text-white/40 mb-12 text-sm">AI agents that work for you — no forms, no wait, just results</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id}
            className={`border rounded-2xl p-6 transition cursor-pointer ${
              agent.active
                ? "bg-white/5 border-white/10 hover:border-white/30"
                : "bg-white/[0.02] border-white/5 opacity-50 cursor-not-allowed"
            } ${active === agent.id ? "border-blue-500/40 bg-blue-500/5" : ""}`}
            onClick={() => agent.active && setActive(active === agent.id ? null : agent.id)}
          >
            <div className="text-3xl mb-3">{agent.icon}</div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{agent.title}</h3>
              {!agent.active && <span className="text-xs text-white/30 border border-white/10 px-2 py-0.5 rounded-full">Soon</span>}
            </div>
            <p className="text-white/40 text-sm">{agent.desc}</p>
            {agent.active && (
              <span className="text-xs text-blue-400 mt-3 inline-block">
                {active === agent.id ? "▲ Close" : "▼ Try it"}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Inquiry Agent Form */}
      {active === "inquiry" && (
        <div className="mt-6 bg-white/5 border border-blue-500/20 rounded-2xl p-6 max-w-xl">
          {success ? (
            <div className="text-center py-6">
              <div className="text-3xl mb-3">✓</div>
              <p className="font-semibold mb-1">Inquiry sent!</p>
              <p className="text-white/40 text-sm">We will contact you within 24 hours.</p>
              <button onClick={() => { setSuccess(false); setForm({ name: "", email: "", project_description: "", budget: "", timeline: "" }); }}
                className="mt-4 text-xs text-blue-400 hover:underline">Send another</button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-sm text-white/70 mb-1">Tell us about your project</h3>
              <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 resize-none h-24"
                placeholder="Describe your project..." value={form.project_description} onChange={(e) => setForm({ ...form, project_description: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                  placeholder="Budget (optional)" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                  placeholder="Timeline (optional)" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button onClick={handleInquiry} disabled={loading}
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition disabled:opacity-40 mt-1">
                {loading ? "Sending..." : "Send to Agent →"}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
