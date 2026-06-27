import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Hardware — EdgeConductor",
  description: "ESP32 reference boards for GPS fleet tracking, smart building HVAC, and IoT gateways. Production-validated with full cloud integration.",
};

const boards = [
  {
    name: "EC Tracker Board",
    status: "Hardware Validated",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    desc: "ESP32 + A7672S-LASC GSM module + external GP-02 GPS. HTTPS telemetry over cellular, remote reboot via HTTP 205, diagnostics panel. End-to-end validated — 29/29 packets, signal -57dBm, TTFF 17.4s.",
    specs: [
      { label: "MCU", value: "ESP32-WROOM-32" },
      { label: "Connectivity", value: "A7672S-LASC (4G GSM)" },
      { label: "GPS", value: "GP-02 (external, NMEA)" },
      { label: "Battery", value: "LiPo 3.7V, ADC pin 34" },
      { label: "Protocol", value: "HTTPS (TLS + SNI)" },
      { label: "Telemetry rate", value: "Every 5s" },
    ],
    chips: ["ESP32", "A7672S GSM", "GP-02 GPS", "LiPo Battery", "PlatformIO"],
  },
  {
    name: "EC Climate Board",
    status: "Production Live",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/25",
    desc: "ESP32 + BME280 (temp/humidity/pressure) + MH-Z19 (CO₂) + relay module for HVAC control. WiFi + MQTT. Multi-room building automation with org/room/tenant hierarchy.",
    specs: [
      { label: "MCU", value: "ESP32-WROOM-32" },
      { label: "Connectivity", value: "WiFi 802.11 b/g/n" },
      { label: "Sensors", value: "BME280 + MH-Z19 CO₂" },
      { label: "Control", value: "Relay module (HVAC)" },
      { label: "Protocol", value: "MQTT TLS (CloudAMQP)" },
      { label: "Telemetry rate", value: "Every 5s" },
    ],
    chips: ["ESP32", "BME280", "MH-Z19 CO₂", "Relay", "MQTT TLS"],
  },
  {
    name: "EC Gateway",
    status: "Planned",
    statusColor: "text-white/30 bg-white/5 border-white/10",
    desc: "Raspberry Pi Linux gateway for legacy HVAC systems using BACnet or Modbus RTU. Bridges industrial protocols to the EdgeConductor MQTT cloud. Ideal for smart building retrofits.",
    specs: [
      { label: "Platform", value: "Raspberry Pi 4 / CM4" },
      { label: "OS", value: "Raspberry Pi OS (Linux)" },
      { label: "Protocols", value: "BACnet IP, Modbus RTU" },
      { label: "Cloud", value: "MQTT bridge to EC cloud" },
      { label: "Power", value: "PoE or 5V USB-C" },
      { label: "Storage", value: "Local buffer + sync" },
    ],
    chips: ["Raspberry Pi", "BACnet", "Modbus RTU", "Linux", "MQTT Bridge"],
  },
];

export default function HardwarePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Hardware</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Reference designs, production validated</h1>
          <p className="text-white/45 text-base max-w-xl">
            Each board ships with validated firmware, cloud integration, and a full diagnostics panel. Use our reference design or bring your own ESP32 hardware.
          </p>
        </div>

        <div className="space-y-6">
          {boards.map(b => (
            <div key={b.name} className="bg-white/3 border border-white/10 rounded-2xl p-7 hover:border-white/20 transition">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold">{b.name}</h2>
                    <span className={`text-xs border px-2.5 py-1 rounded-full font-medium ${b.statusColor}`}>{b.status}</span>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed mb-5">{b.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {b.chips.map(c => (
                      <span key={c} className="text-xs bg-white/8 text-white/40 px-2.5 py-1 rounded-full border border-white/8">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="md:w-64 shrink-0">
                  <div className="bg-black/30 border border-white/8 rounded-xl overflow-hidden">
                    {b.specs.map((s, i) => (
                      <div key={s.label} className={`flex justify-between px-4 py-2.5 ${i < b.specs.length - 1 ? 'border-b border-white/8' : ''}`}>
                        <span className="text-xs text-white/30">{s.label}</span>
                        <span className="text-xs text-white/60 font-medium">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white/3 border border-white/10 rounded-2xl p-7 text-center">
          <h3 className="font-bold mb-2">Works with your existing hardware</h3>
          <p className="text-white/40 text-sm mb-5 max-w-lg mx-auto">
            Any ESP32, ESP8266, or Raspberry Pi can connect to EdgeConductor via MQTT or HTTPS. Use our firmware libraries or implement the protocol yourself.
          </p>
          <Link href="/developers"
            className="inline-flex items-center gap-2 border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm font-medium px-5 py-2.5 rounded-full transition">
            View Developer Docs →
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
