import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Live Demo — EdgeConductor",
  description: "Try the EdgeConductor platform live — see real device telemetry, HVAC control, OTA updates, and diagnostics. No signup required.",
};

const DASHBOARD_URL = "https://ec-platform-ten.vercel.app";

const features = [
  { title: "Live Telemetry",    desc: "Real-time temperature, humidity, CO₂, battery, and GPS data from 4 simulated devices.", icon: "◈" },
  { title: "HVAC Control",     desc: "Toggle relay ON/OFF from the dashboard. Command flows through MQTT in real time.",         icon: "⚡" },
  { title: "OTA Firmware Push",desc: "Push a firmware version to a device. See pending → received → applied flow.",              icon: "↑" },
  { title: "Diagnostics Panel",desc: "View uptime, heap memory, reboot reason, signal strength per device.",                     icon: "◎" },
  { title: "Rules Engine",     desc: "IF CO₂ > 1000 → relay ON. Rules auto-evaluate every 30s, no manual trigger needed.",     icon: "✦" },
  { title: "Webhooks",         desc: "Register your endpoint and receive signed payloads for telemetry, alerts, OTA events.",    icon: "↗" },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">4 Simulated Devices Running</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Try the platform live</h1>
          <p className="text-white/45 text-base max-w-xl mx-auto mb-8">
            Log in with the demo account — 4 devices are already registered and sending telemetry every 30 seconds.
            No signup, no credit card.
          </p>

          {/* Credentials card */}
          <div className="inline-block bg-white/4 border border-white/12 rounded-2xl px-8 py-6 mb-8 text-left">
            <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-4">Demo Credentials</p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-3">
                <span className="text-white/30 w-20">Email</span>
                <span className="text-white/80 select-all">demo@edgeconductor.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/30 w-20">Password</span>
                <span className="text-white/80 select-all">EdgeDemo2026!</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-8 py-3.5 rounded-full transition">
              Open Dashboard →
            </a>
            <Link href="/contact?type=demo"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm font-medium px-6 py-3.5 rounded-full transition">
              Book a Guided Demo
            </Link>
          </div>
        </div>

        {/* What's in the demo */}
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {features.map(f => (
            <div key={f.title} className="bg-white/3 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
              <span className="text-xl text-white/25 mb-3 block">{f.icon}</span>
              <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Demo devices */}
        <div className="bg-white/2 border border-white/8 rounded-2xl p-6 mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Devices in demo org</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { serial: "DEMO-CLIMATE-01", type: "Climate Sensor", desc: "Temperature · Humidity · CO₂ · Relay" },
              { serial: "DEMO-CLIMATE-02", type: "Climate Sensor", desc: "Second zone — higher CO₂, relay active" },
              { serial: "DEMO-TRACKER-01", type: "GPS Tracker",    desc: "Route loop · Speed · Battery" },
              { serial: "DEMO-ENERGY-01",  type: "Energy Meter",   desc: "Voltage · Current · Power · kWh" },
            ].map(d => (
              <div key={d.serial} className="bg-white/3 border border-white/8 rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 mt-1.5 shrink-0 animate-pulse" />
                <div>
                  <p className="text-xs font-mono text-white/70">{d.serial}</p>
                  <p className="text-xs text-white/40 mt-0.5">{d.type} · {d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/25 text-xs">Demo data is shared — anyone can log in and explore. Changes reset periodically.</p>
        </div>

      </section>
      <Footer />
    </main>
  );
}
