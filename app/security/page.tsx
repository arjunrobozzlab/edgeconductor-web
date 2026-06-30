import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Security — EdgeConductor",
  description: "EdgeConductor is built with enterprise-grade security at every layer — TLS 1.3, RBAC, audit logs, multi-tenant isolation, and signed OTA updates.",
};

const layers = [
  {
    icon: "🔑",
    title: "Authentication & Identity",
    color: "blue",
    items: [
      { label: "Per-device API keys", desc: "Unique key per device assigned at provisioning time. Keys are hashed — never stored in plaintext." },
      { label: "Bearer token auth", desc: "All API calls require a scoped Bearer token. Tokens are org-scoped — one org cannot access another's data." },
      { label: "RBAC",              desc: "Three roles: admin, org_admin, customer. Each role has a fixed permission set enforced server-side." },
      { label: "API key rotation",  desc: "Keys can be revoked and rotated from the dashboard at any time. Old keys are immediately invalidated." },
      { label: "Password policy",   desc: "Minimum 8-character passwords enforced at signup. Passwords are hashed with bcrypt — never stored in plaintext." },
      { label: "2FA / TOTP",        desc: "Two-factor authentication via Google Authenticator or Authy. Coming soon — will be required for org_admin and admin roles." },
    ],
  },
  {
    icon: "🔒",
    title: "Encryption",
    color: "green",
    items: [
      { label: "TLS 1.3 in transit",   desc: "All REST API traffic uses HTTPS/TLS 1.3. Older TLS versions rejected." },
      { label: "MQTT over TLS",         desc: "CloudAMQP broker enforces TLS 1.2/1.3 on port 8883. Plaintext MQTT connections rejected." },
      { label: "At-rest encryption",    desc: "All data stored in Supabase/PostgreSQL with AES-256 at-rest encryption managed by the cloud provider." },
      { label: "Secrets management",    desc: "API keys, MQTT credentials, and service keys stored as environment variables — never in code or logs." },
    ],
  },
  {
    icon: "🛡",
    title: "Access Control",
    color: "purple",
    items: [
      { label: "Org-level data isolation", desc: "Every database query is scoped to org_id. One tenant can never query, read, or modify another tenant's data." },
      { label: "Row-level security",        desc: "Supabase RLS policies enforce org isolation at the database level — even if application logic is bypassed." },
      { label: "Audit logs",               desc: "Every rule fire, OTA push, config change, and device offline event is logged with timestamp and actor. Available in Business tier." },
      { label: "Immutable audit trail",    desc: "Audit log entries cannot be modified or deleted — append-only for compliance requirements." },
    ],
  },
  {
    icon: "📡",
    title: "Device Security",
    color: "yellow",
    items: [
      { label: "Unique device identity",    desc: "Each device gets a unique serial and secret at registration. Secrets are never transmitted after initial provisioning." },
      { label: "Signed OTA packages",       desc: "OTA firmware updates are delivered over TLS. Firmware version is verified before flashing. Rollback on failure." },
      { label: "Shadow-based command model", desc: "Commands reach devices via the shadow desired state — no direct command channel that could be spoofed." },
      { label: "Offline-safe provisioning",  desc: "Device credentials are assigned at factory time. No internet required during manufacturing." },
    ],
  },
];

const compliance = [
  {
    badge: "GDPR",
    status: "Ready",
    statusColor: "green",
    desc: "Data residency in EU-hosted infrastructure available. User data deletion on request. No data sold to third parties.",
  },
  {
    badge: "HIPAA",
    status: "On Roadmap",
    statusColor: "yellow",
    desc: "Relevant for healthcare deployments (hospital environment monitoring). BAA available on Enterprise tier. Audit logs + access controls already in place.",
  },
  {
    badge: "SOC 2",
    status: "In Progress",
    statusColor: "yellow",
    desc: "SOC 2 Type II audit planned for Q4 2026. Controls for availability, confidentiality, and security are already implemented.",
  },
  {
    badge: "ISO 27001",
    status: "Roadmap",
    statusColor: "gray",
    desc: "Information security management framework alignment in progress. Relevant for enterprise and government deployments.",
  },
];

const statusColors: Record<string, string> = {
  green:  "text-green-400 bg-green-500/10 border-green-500/25",
  yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
  gray:   "text-white/40 bg-white/5 border-white/15",
};

const layerColors: Record<string, string> = {
  blue:   "text-blue-400 bg-blue-500/8 border-blue-500/20",
  green:  "text-green-400 bg-green-500/8 border-green-500/20",
  purple: "text-purple-400 bg-purple-500/8 border-purple-500/20",
  yellow: "text-yellow-400 bg-yellow-500/8 border-yellow-500/20",
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Security</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4 leading-tight">
            Security at every layer
          </h1>
          <p className="text-white/45 text-base max-w-2xl mb-8">
            From device provisioning to cloud storage, EdgeConductor is built with
            enterprise-grade security controls — encryption, isolation, audit logs,
            and compliance readiness baked in from day one.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "TLS 1.3",              color: "text-green-400 bg-green-500/8 border-green-500/20" },
              { label: "AES-256 at rest",       color: "text-green-400 bg-green-500/8 border-green-500/20" },
              { label: "Multi-tenant isolated", color: "text-blue-400 bg-blue-500/8 border-blue-500/20" },
              { label: "RBAC enforced",         color: "text-blue-400 bg-blue-500/8 border-blue-500/20" },
              { label: "Audit logs",            color: "text-purple-400 bg-purple-500/8 border-purple-500/20" },
              { label: "GDPR Ready",            color: "text-yellow-400 bg-yellow-500/8 border-yellow-500/20" },
              { label: "SOC 2 In Progress",     color: "text-yellow-400 bg-yellow-500/8 border-yellow-500/20" },
              { label: "2FA — Coming Soon",     color: "text-white/35 bg-white/4 border-white/12" },
            ].map(b => (
              <span key={b.label} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${b.color}`}>
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Security layers */}
        <div className="space-y-5">
          {layers.map(layer => (
            <div key={layer.title} className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8">
                <span className="text-lg">{layer.icon}</span>
                <h2 className={`text-base font-bold px-3 py-1 rounded-lg border text-sm ${layerColors[layer.color]}`}>
                  {layer.title}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/6">
                {layer.items.map(item => (
                  <div key={item.label} className="px-6 py-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                      <span className="text-sm font-semibold text-white/80">{item.label}</span>
                    </div>
                    <p className="text-xs text-white/35 leading-relaxed pl-3.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">Compliance Readiness</h2>
        <p className="text-white/35 text-sm mb-7 max-w-xl">
          We build toward the compliance standards our customers need — healthcare, manufacturing, smart buildings, and government.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {compliance.map(c => (
            <div key={c.badge} className="bg-white/2 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg font-black text-white/80 font-mono">{c.badge}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[c.statusColor]}`}>
                  {c.status}
                </span>
              </div>
              <p className="text-xs text-white/35 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Responsible disclosure */}
      <section className="px-4 md:px-8 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white/2 border border-white/8 rounded-2xl p-7">
            <h3 className="font-bold text-lg mb-2">Responsible Disclosure</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Found a security vulnerability? We take all reports seriously.
              Email us directly — we respond within 48 hours and will credit you
              in our security changelog.
            </p>
            <a href="mailto:edgeconductor@gmail.com?subject=Security Vulnerability Report"
              className="text-sm text-blue-400 hover:text-blue-300 transition font-medium">
              edgeconductor@gmail.com →
            </a>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/6 border border-blue-500/20 rounded-2xl p-7">
            <h3 className="font-bold text-lg mb-2">Enterprise Security Review</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Need a security questionnaire filled, penetration test results, or
              a dedicated security review before deployment? Talk to us.
            </p>
            <Link href="/contact?type=sales"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition">
              Request Security Review →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
