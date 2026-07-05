import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — EdgeConductor",
  description: "Terms and conditions for using the EdgeConductor platform.",
  alternates: { canonical: "https://edgeconductor.com/terms" },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By creating an account or using the EdgeConductor platform, you agree to these Terms of Service. If you are agreeing on behalf of a company or organisation, you confirm that you have authority to bind that entity.

If you do not agree to these terms, do not use the platform.`,
  },
  {
    title: "2. What EdgeConductor Provides",
    body: `EdgeConductor provides a cloud platform for connected device management, including:

• Device registry and provisioning
• Live telemetry collection and storage
• OTA (over-the-air) firmware update management
• Rules engine and automation
• Multi-tenant B2B dashboard and white-label portal
• REST API, SDKs, and CLI tooling

The platform is provided as a software-as-a-service (SaaS) subscription. We do not provide hardware, firmware development services, or on-site installation unless explicitly agreed in a separate statement of work.`,
  },
  {
    title: "3. Account Registration",
    items: [
      "You must provide accurate information during registration, including a valid email address and company name",
      "You are responsible for all activity that occurs under your account",
      "You must not share account credentials with persons outside your organisation",
      "You must notify us immediately at edgeconductor@gmail.com if you suspect unauthorised access",
      "One person or legal entity may not maintain more than one Free account",
    ],
  },
  {
    title: "4. Subscription Plans and Payment",
    subsections: [
      {
        heading: "Plans",
        items: [
          "Starter (Free): 5 devices, 1 organisation, 7-day data retention — no payment required",
          "Pro: 50 devices, 5 organisations, 90-day retention — billed monthly at the rate published on the pricing page",
          "Enterprise: Custom device count, data retention, and SLA — billed as agreed in your contract",
        ],
      },
      {
        heading: "Billing",
        items: [
          "Pro subscriptions are billed monthly in advance via Razorpay",
          "Invoices include applicable GST as per Indian tax regulations",
          "Payment failure will result in account suspension after a 7-day grace period",
          "Prices may change with 30 days notice to account holders",
        ],
      },
      {
        heading: "Refunds",
        items: [
          "Monthly subscriptions are non-refundable once a billing cycle has started",
          "If you cancel mid-month, your access continues until the end of the current billing period",
          "Exceptions may be made for billing errors — contact us within 14 days of the disputed charge",
        ],
      },
    ],
  },
  {
    title: "5. Acceptable Use",
    body: `You may use the EdgeConductor platform only for lawful purposes and in accordance with these Terms. You must not:`,
    items: [
      "Use the platform to transmit malware, conduct DDoS attacks, or interfere with other customers' services",
      "Attempt to gain unauthorised access to other organisations' data or devices",
      "Resell or sublicense the platform without entering into a formal Partner Agreement with EdgeConductor",
      "Use the platform to process data in violation of applicable privacy laws",
      "Reverse-engineer, decompile, or attempt to extract the source code of the platform",
      "Use automated scripts to create accounts, spam the API, or circumvent usage limits",
    ],
  },
  {
    title: "6. Your Data",
    body: `You own all data you input into the platform, including device telemetry, sensor readings, and organisation configurations.

You grant EdgeConductor a limited licence to store, process, and transmit your data solely for the purpose of operating the platform.

We will not access your data except to provide support (with your permission) or to comply with a lawful order from an Indian court or regulatory authority.

On termination of your account, all your data will be permanently deleted within 30 days.`,
  },
  {
    title: "7. Intellectual Property",
    body: `The EdgeConductor platform, its branding, software, APIs, and documentation are the intellectual property of EdgeConductor.

You may not copy, modify, or distribute any part of the platform without written permission.

White-label partners operating under a Partner Agreement may display their own branding on the platform as permitted by their agreement.`,
  },
  {
    title: "8. Uptime and Service Levels",
    body: `We target 99% monthly uptime for the EdgeConductor platform. Planned maintenance windows are announced at least 24 hours in advance via status.edgeconductor.com.

Detailed uptime commitments, support response times, and credit terms are specified in the Service Level Agreement (SLA) at edgeconductor.com/sla, which forms part of these Terms for Pro and Enterprise subscribers.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `To the maximum extent permitted by Indian law:

• EdgeConductor's total liability for any claim related to the platform shall not exceed the total fees paid by you in the 3 months preceding the claim

• We are not liable for indirect, incidental, or consequential damages including but not limited to: loss of revenue, loss of data, or disruption of business operations

• We are not liable for failures caused by third-party infrastructure (Supabase, Vercel, Razorpay, cellular networks) or by your hardware, firmware, or network configuration

This limitation does not apply to liability that cannot be excluded under Indian law, including fraud or gross negligence.`,
  },
  {
    title: "10. Termination",
    items: [
      "You may cancel your subscription at any time from your account settings or by emailing us",
      "We may suspend or terminate accounts that violate the Acceptable Use policy, with or without notice depending on severity",
      "We may terminate the platform service with 90 days notice to all account holders",
      "On termination, your access ends and data is deleted within 30 days as described in Section 6",
    ],
  },
  {
    title: "11. Governing Law",
    body: `These Terms of Service are governed by the laws of India. Any disputes arising from or related to these Terms shall be resolved in the courts of India.

If any provision of these Terms is found to be unenforceable, the remaining provisions continue to apply.`,
  },
  {
    title: "12. Changes to These Terms",
    body: `We may update these Terms from time to time. For material changes, we will notify account holders by email at least 30 days before the new Terms take effect. Continued use of the platform after that date constitutes acceptance of the revised Terms.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-3xl mx-auto">

        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Legal</span>
          <h1 className="text-4xl font-bold mt-3 mb-3">Terms of Service</h1>
          <p className="text-white/35 text-sm">Last updated: July 2026 &nbsp;·&nbsp; Effective: July 2026</p>
        </div>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold mb-4 text-white/90">{s.title}</h2>

              {"body" in s && s.body && (
                <div className="text-sm text-white/45 leading-relaxed whitespace-pre-line mb-3">{s.body}</div>
              )}

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
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/8 pt-8 space-y-3">
          <p className="text-white/30 text-sm">
            Questions about these Terms?{" "}
            <a href="mailto:edgeconductor@gmail.com" className="text-blue-400 hover:text-blue-300 transition">
              edgeconductor@gmail.com
            </a>
          </p>
          <div className="flex gap-4 text-xs text-white/25">
            <Link href="/privacy" className="hover:text-white/50 transition">Privacy Policy</Link>
            <span>·</span>
            <Link href="/sla" className="hover:text-white/50 transition">Service Level Agreement</Link>
          </div>
        </div>

      </section>
      <Footer />
    </main>
  );
}
