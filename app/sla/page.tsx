import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Service Level Agreement — EdgeConductor",
  description: "EdgeConductor uptime commitments, support response times, and credit terms.",
  alternates: { canonical: "https://edgeconductor.com/sla" },
};

const tiers = [
  {
    plan: "Starter (Free)",
    uptime: "Best effort",
    support: "Email — 2 business days",
    incidents: "No credit",
    color: "white",
  },
  {
    plan: "Pro",
    uptime: "99% monthly",
    support: "Email — 8 business hours",
    incidents: "Service credit",
    color: "blue",
    highlight: true,
  },
  {
    plan: "Enterprise",
    uptime: "99.5% monthly",
    support: "Email + WhatsApp — 4 hours",
    incidents: "Service credit + review",
    color: "violet",
  },
];

const supportMatrix = [
  { severity: "Critical", definition: "Platform completely unavailable or all devices disconnected", pro: "4 business hours", enterprise: "2 hours (24×7)" },
  { severity: "High", definition: "Core feature unavailable (OTA, telemetry, rules engine)", pro: "8 business hours", enterprise: "4 business hours" },
  { severity: "Medium", definition: "Feature degraded but workaround exists", pro: "1 business day", enterprise: "8 business hours" },
  { severity: "Low", definition: "Minor issue, cosmetic bug, question", pro: "2 business days", enterprise: "1 business day" },
];

const creditSchedule = [
  { downtime: "< 0.1% (< 44 min/month)", credit: "None" },
  { downtime: "0.1% – 1% (44 min – 7.3 hr)", credit: "10% of monthly fee" },
  { downtime: "1% – 5% (7.3 hr – 36 hr)", credit: "25% of monthly fee" },
  { downtime: "> 5% (> 36 hr/month)", credit: "50% of monthly fee" },
];

export default function SLAPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-4xl mx-auto">

        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Legal</span>
          <h1 className="text-4xl font-bold mt-3 mb-3">Service Level Agreement</h1>
          <p className="text-white/35 text-sm">Last updated: July 2026 &nbsp;·&nbsp; Applies to Pro and Enterprise plans</p>
          <p className="text-white/40 text-sm mt-3 max-w-2xl leading-relaxed">
            This SLA defines EdgeConductor&apos;s uptime commitments, support response times, and the credit process
            when service targets are not met. It forms part of the{" "}
            <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition">Terms of Service</Link>.
          </p>
        </div>

        {/* Uptime by plan */}
        <div className="mb-14">
          <h2 className="text-xl font-semibold mb-6">Uptime Commitment by Plan</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {tiers.map((t) => (
              <div key={t.plan} className={`border rounded-2xl p-6 ${
                t.highlight
                  ? "bg-blue-500/8 border-blue-500/25"
                  : "bg-white/3 border-white/10"
              }`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                  t.highlight ? "text-blue-400" : "text-white/35"
                }`}>{t.plan}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Monthly Uptime</p>
                    <p className={`text-lg font-bold ${t.highlight ? "text-blue-300" : "text-white/70"}`}>{t.uptime}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Support</p>
                    <p className="text-sm text-white/55">{t.support}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Downtime Credit</p>
                    <p className="text-sm text-white/55">{t.incidents}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime definition */}
        <div className="mb-14">
          <h2 className="text-xl font-semibold mb-4">How Uptime Is Measured</h2>
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6 space-y-3 text-sm text-white/50 leading-relaxed">
            <p>
              <strong className="text-white/75">Uptime</strong> is defined as the percentage of time in a calendar month that the following core services are operational and reachable:
            </p>
            <ul className="space-y-1.5 ml-4">
              {[
                "REST API (device telemetry ingestion and retrieval)",
                "MQTT broker (device-to-cloud connectivity)",
                "Dashboard (web portal for all user roles)",
                "OTA firmware delivery endpoint",
              ].map(i => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-white/20 mt-1 shrink-0">—</span>{i}
                </li>
              ))}
            </ul>
            <p>
              <strong className="text-white/75">Excluded from downtime calculation:</strong> Scheduled maintenance windows (announced 24 hours in advance at{" "}
              <a href="https://status.edgeconductor.com" className="text-blue-400 hover:text-blue-300 transition" target="_blank" rel="noopener noreferrer">
                status.edgeconductor.com
              </a>
              ), incidents caused by customer hardware or firmware, and outages caused by third-party infrastructure (Supabase, Vercel, cellular networks) that are outside our control.
            </p>
          </div>
        </div>

        {/* Support response times */}
        <div className="mb-14">
          <h2 className="text-xl font-semibold mb-2">Support Response Times</h2>
          <p className="text-white/40 text-sm mb-6">Business hours: Monday–Saturday, 9:00 AM – 6:00 PM IST</p>
          <div className="bg-black/30 border border-white/8 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 px-5 py-3 border-b border-white/8 text-[10px] text-white/25 uppercase tracking-wider">
              <span>Severity</span><span className="col-span-2">Definition</span><span className="text-right">Pro / Enterprise</span>
            </div>
            {supportMatrix.map((row, i) => (
              <div key={row.severity} className={`grid grid-cols-4 px-5 py-4 gap-3 ${i < supportMatrix.length - 1 ? "border-b border-white/8" : ""}`}>
                <span className="text-sm font-semibold text-white/80">{row.severity}</span>
                <span className="col-span-2 text-sm text-white/40 leading-snug">{row.definition}</span>
                <div className="text-right">
                  <p className="text-xs text-blue-300">{row.pro}</p>
                  <p className="text-xs text-violet-300 mt-1">{row.enterprise}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/25 text-xs mt-3">
            Report incidents to{" "}
            <a href="mailto:edgeconductor@gmail.com" className="text-blue-400 hover:text-blue-300 transition">
              edgeconductor@gmail.com
            </a>{" "}
            with subject line: <span className="font-mono text-white/35">[CRITICAL]</span>,{" "}
            <span className="font-mono text-white/35">[HIGH]</span>, etc.
          </p>
        </div>

        {/* Credit schedule */}
        <div className="mb-14">
          <h2 className="text-xl font-semibold mb-4">Service Credit Schedule (Pro & Enterprise)</h2>
          <div className="bg-black/30 border border-white/8 rounded-xl overflow-hidden mb-4">
            <div className="grid grid-cols-2 px-5 py-3 border-b border-white/8 text-[10px] text-white/25 uppercase tracking-wider">
              <span>Monthly Downtime</span><span>Credit Issued</span>
            </div>
            {creditSchedule.map((row, i) => (
              <div key={row.downtime} className={`grid grid-cols-2 px-5 py-3.5 ${i < creditSchedule.length - 1 ? "border-b border-white/8" : ""}`}>
                <span className="text-sm text-white/50">{row.downtime}</span>
                <span className={`text-sm font-medium ${row.credit === "None" ? "text-white/30" : "text-green-400"}`}>{row.credit}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm text-white/40 leading-relaxed">
            <p>Credits are applied to the next billing cycle — they are not cash refunds.</p>
            <p>To claim a credit, email edgeconductor@gmail.com within 14 days of the affected month, referencing the incident.</p>
            <p>Credits are the sole remedy for downtime under this SLA.</p>
          </div>
        </div>

        {/* Maintenance */}
        <div className="mb-14">
          <h2 className="text-xl font-semibold mb-4">Planned Maintenance</h2>
          <div className="space-y-2 text-sm text-white/45 leading-relaxed">
            <p>Scheduled maintenance is announced at least <strong className="text-white/70">24 hours in advance</strong> via{" "}
              <a href="https://status.edgeconductor.com" className="text-blue-400 hover:text-blue-300 transition" target="_blank" rel="noopener noreferrer">
                status.edgeconductor.com
              </a>{" "}
              and email notification to account owners.
            </p>
            <p>Maintenance windows are typically scheduled on <strong className="text-white/70">Sunday 2:00 AM – 6:00 AM IST</strong> to minimise impact on business operations.</p>
            <p>Emergency maintenance may be performed without advance notice in cases of active security incidents or critical infrastructure failure. We will communicate status in real time via the status page.</p>
          </div>
        </div>

        {/* Exclusions */}
        <div className="mb-14">
          <h2 className="text-xl font-semibold mb-4">Exclusions</h2>
          <p className="text-sm text-white/40 mb-3">This SLA does not apply to downtime caused by:</p>
          <ul className="space-y-1.5">
            {[
              "Customer hardware, firmware, or network configuration issues",
              "Supabase, Vercel, or Razorpay platform outages (tracked separately on their status pages)",
              "Cellular network or ISP outages affecting device connectivity",
              "Force majeure events including natural disasters, government actions, or cyber attacks",
              "Actions taken by the customer that violate the Terms of Service",
              "Free (Starter) tier — no uptime commitment applies",
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/40 leading-relaxed">
                <span className="text-white/20 mt-1 shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 border-t border-white/8 pt-8 space-y-3">
          <p className="text-white/30 text-sm">
            SLA questions or credit claims:{" "}
            <a href="mailto:edgeconductor@gmail.com" className="text-blue-400 hover:text-blue-300 transition">
              edgeconductor@gmail.com
            </a>
          </p>
          <div className="flex gap-4 text-xs text-white/25">
            <Link href="/terms" className="hover:text-white/50 transition">Terms of Service</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-white/50 transition">Privacy Policy</Link>
            <span>·</span>
            <Link href="/security" className="hover:text-white/50 transition">Security</Link>
          </div>
        </div>

      </section>
      <Footer />
    </main>
  );
}
