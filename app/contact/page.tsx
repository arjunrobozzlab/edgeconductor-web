import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact — EdgeConductor",
  description: "Book a demo, ask about pricing, or get help with your IoT deployment.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-2xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Contact</span>
          <h1 className="text-4xl font-bold mt-3 mb-4">Get in touch</h1>
          <p className="text-white/45 text-base">
            Book a demo, ask about pricing, or tell us about your IoT project.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {[
            { label: "Email", value: "edgeconductor@gmail.com", href: "mailto:edgeconductor@gmail.com" },
          ].map(c => (
            <div key={c.label} className="bg-white/3 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:border-white/20 transition">
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{c.label}</p>
                <a href={c.href} className="text-white/70 hover:text-white transition text-sm">{c.value}</a>
              </div>
              <a href={c.href} className="text-blue-400 hover:text-blue-300 transition text-sm">Contact →</a>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "Book a Demo", desc: "30-min platform walkthrough with our team", icon: "◎" },
            { title: "Sales Inquiry", desc: "Pricing for your team, org count, and device count", icon: "✦" },
            { title: "Technical Support", desc: "Help with device integration, firmware, or API", icon: "◈" },
            { title: "Partnership", desc: "Hardware manufacturers, system integrators, resellers", icon: "▣" },
          ].map(c => (
            <a key={c.title} href="mailto:edgeconductor@gmail.com"
              className="bg-white/3 border border-white/10 rounded-xl p-5 hover:border-white/20 transition block">
              <span className="text-white/30 text-xl mb-3 block">{c.icon}</span>
              <h3 className="font-semibold mb-1 text-sm">{c.title}</h3>
              <p className="text-white/35 text-xs leading-relaxed">{c.desc}</p>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
