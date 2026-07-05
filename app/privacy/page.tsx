import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — EdgeConductor",
  description: "How EdgeConductor collects, stores, and uses your data.",
  alternates: { canonical: "https://edgeconductor.com/privacy" },
};

const sections = [
  {
    title: "1. Who We Are",
    body: `EdgeConductor is a connected product and asset operations platform operated from India. We provide device registry, live telemetry, OTA firmware management, rules automation, and B2B dashboards for hardware companies and enterprise operations teams.

Contact: edgeconductor@gmail.com`,
  },
  {
    title: "2. What Data We Collect",
    subsections: [
      {
        heading: "Account Data",
        items: [
          "Name, email address, and company name — provided on signup",
          "Password (hashed using bcrypt — never stored in plain text)",
          "Billing information — processed by Razorpay; we do not store card details",
        ],
      },
      {
        heading: "Device & Telemetry Data",
        items: [
          "Device identifiers, firmware version, last-seen timestamp",
          "Sensor readings: temperature, humidity, CO₂, GPS coordinates, battery voltage, signal strength",
          "Device events: reboots, OTA updates, online/offline transitions",
          "All telemetry is timestamped and associated with your organization",
        ],
      },
      {
        heading: "Usage Data",
        items: [
          "Dashboard activity: pages visited, features used",
          "API requests: endpoint, timestamp, response code (not request body)",
          "Browser type and IP address for security and abuse prevention",
        ],
      },
    ],
  },
  {
    title: "3. How We Use Your Data",
    items: [
      "To operate and deliver the EdgeConductor platform to your organization",
      "To send transactional emails: account confirmation, OTA notifications, alert emails",
      "To generate invoices and process subscription payments via Razorpay",
      "To detect anomalies, security incidents, and platform abuse",
      "To improve platform performance and reliability",
      "We do not sell your data to third parties. We do not use your device telemetry for advertising.",
    ],
  },
  {
    title: "4. Data Storage and Third Parties",
    body: `Your data is stored using the following infrastructure providers:

• Supabase (PostgreSQL database and authentication) — servers currently located in the United States
• Vercel (application hosting and CDN) — global edge network
• Razorpay (payment processing) — India-based, RBI-regulated

We are actively working toward India-based data residency. If data residency is a requirement for your organization, contact us to discuss enterprise hosting options.`,
  },
  {
    title: "5. Data Retention",
    items: [
      "Account data is retained for the duration of your subscription",
      "Telemetry history is retained for 7 days (Free), 90 days (Pro), or custom duration (Enterprise)",
      "On account deletion, all personal data and telemetry is permanently deleted within 30 days",
      "Billing records are retained for 7 years as required by Indian tax law (GST)",
    ],
  },
  {
    title: "6. Your Rights",
    items: [
      "Access: You can export all your organization's data via the REST API at any time",
      "Correction: Update your account information from the dashboard settings",
      "Deletion: Request account and data deletion by emailing edgeconductor@gmail.com",
      "Portability: Telemetry data is available in JSON and CSV format for export",
    ],
  },
  {
    title: "7. Security",
    body: `All data is transmitted over TLS 1.2 or higher. Device-to-cloud communication uses MQTT over TLS or HTTPS. Passwords are hashed using bcrypt. API keys are hashed before storage.

For security vulnerability disclosures, see our Security Policy at edgeconductor.com/security.`,
  },
  {
    title: "8. Cookies",
    body: `We use session cookies for authentication only. We do not use tracking cookies or third-party analytics cookies. You can disable cookies in your browser; however, the dashboard will not function without session cookies.`,
  },
  {
    title: "9. Applicable Law",
    body: `This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDPA). Any disputes shall be subject to the jurisdiction of courts in India.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. When we make material changes, we will notify account holders by email at least 14 days before the change takes effect. The date of the last revision is shown below.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-3xl mx-auto">

        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Legal</span>
          <h1 className="text-4xl font-bold mt-3 mb-3">Privacy Policy</h1>
          <p className="text-white/35 text-sm">Last updated: July 2026 &nbsp;·&nbsp; Effective: July 2026</p>
        </div>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold mb-4 text-white/90">{s.title}</h2>

              {"subsections" in s && s.subsections && (
                <div className="space-y-5">
                  {s.subsections.map((sub) => (
                    <div key={sub.heading}>
                      <p className="text-sm font-medium text-white/60 mb-2">{sub.heading}</p>
                      <ul className="space-y-1.5">
                        {sub.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-white/45 leading-relaxed">
                            <span className="text-white/20 mt-1 shrink-0">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {"items" in s && s.items && (
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/45 leading-relaxed">
                      <span className="text-white/20 mt-1 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {"body" in s && s.body && (
                <div className="text-sm text-white/45 leading-relaxed whitespace-pre-line">{s.body}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/8 pt-8">
          <p className="text-white/30 text-sm">
            Questions about this policy?{" "}
            <a href="mailto:edgeconductor@gmail.com" className="text-blue-400 hover:text-blue-300 transition">
              edgeconductor@gmail.com
            </a>
          </p>
        </div>

      </section>
      <Footer />
    </main>
  );
}
