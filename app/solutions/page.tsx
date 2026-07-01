import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Solutions — EdgeConductor",
  description: "Vertical IoT solutions: EC Tracker for GPS fleet management, EC Climate for smart buildings, EC Home for residential automation.",
};

const solutions = [
  {
    tag: "GPS Fleet",
    name: "EC Tracker",
    desc: "Full-stack GPS fleet management. GSM connectivity, real-time map, geofence alerts, remote reboot, OTA.",
    href: "/solutions/tracker",
    color: "text-blue-400 border-blue-500/25 bg-blue-500/8",
    status: "Hardware Validated",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  },
  {
    tag: "Smart Building",
    name: "EC Climate",
    desc: "Multi-room HVAC automation with CO₂, temperature, and humidity sensors. Tenant QR access, rule-based relay control.",
    href: "/solutions/climate",
    color: "text-cyan-400 border-cyan-500/25 bg-cyan-500/8",
    status: "Production Live",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/25",
  },
  {
    tag: "Residential",
    name: "EC Home",
    desc: "Smart home relay control, energy monitoring, and scene automation. Works with any WiFi-connected microcontroller or Linux hardware.",
    href: "/solutions/home",
    color: "text-green-400 border-green-500/25 bg-green-500/8",
    status: "Coming Soon",
    statusColor: "text-white/30 bg-white/5 border-white/10",
  },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Solutions</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Built for real product categories</h1>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            Complete vertical solutions — not generic IoT infrastructure.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map(s => (
            <div key={s.name} className="bg-white/3 border border-white/10 rounded-2xl p-7 hover:border-white/20 transition flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${s.color}`}>{s.tag}</span>
                <span className={`text-xs border px-2.5 py-1 rounded-full ${s.statusColor}`}>{s.status}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{s.name}</h2>
              <p className="text-white/45 text-sm leading-relaxed flex-1 mb-6">{s.desc}</p>
              <Link href={s.href}
                className="text-sm text-white/50 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2.5 rounded-xl transition text-center">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
