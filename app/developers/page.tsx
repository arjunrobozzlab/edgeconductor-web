import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Developers — EdgeConductor",
  description: "REST API, MQTT API, ESP32 SDK, and CLI tools for integrating with the EdgeConductor IoT platform.",
};

const apis = [
  { method: "GET",  path: "/devices",                desc: "List all devices" },
  { method: "POST", path: "/devices/register",        desc: "Register a new device" },
  { method: "GET",  path: "/devices/:serial",         desc: "Get device + shadow state" },
  { method: "POST", path: "/devices/:serial/telemetry", desc: "Push telemetry (HTTP path)" },
  { method: "POST", path: "/devices/:serial/ota",     desc: "Push OTA firmware to device" },
  { method: "POST", path: "/devices/:serial/reboot",  desc: "Remote reboot command" },
  { method: "PATCH",path: "/devices/:serial/shadow/desired", desc: "Update desired state" },
  { method: "GET",  path: "/orgs",                    desc: "List organizations" },
  { method: "GET",  path: "/orgs/:id/rules",          desc: "Get automation rules" },
  { method: "POST", path: "/firmware",                desc: "Upload firmware release" },
];

const methodColor: Record<string, string> = {
  GET:   "text-green-400",
  POST:  "text-blue-400",
  PATCH: "text-yellow-400",
  DELETE:"text-red-400",
};

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-5xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Developers</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Build on EdgeConductor</h1>
          <p className="text-white/45 text-base max-w-xl">
            REST API, MQTT topics, ESP32 SDK, and CLI tools — everything you need to integrate your hardware and services.
          </p>
        </div>

        {/* REST API */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold">REST API</h2>
            <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-1 rounded-full font-semibold">Live</span>
          </div>
          <p className="text-white/40 text-sm mb-5 font-mono">Base URL: https://ec-registry.onrender.com</p>
          <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
            {apis.map((ep, i) => (
              <div key={ep.path} className={`flex items-center gap-4 px-5 py-3.5 ${i < apis.length - 1 ? 'border-b border-white/8' : ''} hover:bg-white/3 transition`}>
                <span className={`text-xs font-mono font-bold w-12 shrink-0 ${methodColor[ep.method]}`}>{ep.method}</span>
                <span className="text-xs font-mono text-white/60 flex-1">{ep.path}</span>
                <span className="text-xs text-white/30 hidden sm:block">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MQTT */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-5">MQTT Topics</h2>
          <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { dir: "PUB", topic: "devices/{serial}/telemetry", desc: "Device publishes sensor data" },
              { dir: "SUB", topic: "devices/{serial}/shadow/desired", desc: "Device receives config/commands" },
              { dir: "PUB", topic: "devices/{serial}/shadow/reported", desc: "Device reports current state" },
              { dir: "SUB", topic: "devices/{serial}/ota", desc: "Device receives OTA payload" },
            ].map((t, i) => (
              <div key={t.topic} className={`flex items-center gap-4 px-5 py-3.5 ${i < 3 ? 'border-b border-white/8' : ''}`}>
                <span className={`text-xs font-mono font-bold w-8 shrink-0 ${t.dir === 'PUB' ? 'text-blue-400' : 'text-yellow-400'}`}>{t.dir}</span>
                <span className="text-xs font-mono text-white/60 flex-1">{t.topic}</span>
                <span className="text-xs text-white/30 hidden sm:block">{t.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-3 font-mono">Broker: CloudAMQP duck.lmq.cloudamqp.com:8883 (TLS)</p>
        </div>

        {/* ESP32 SDK */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-5">ESP32 SDK (PlatformIO)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { lib: "ECConn", desc: "WiFi + GSM connectivity (WifiConn, GsmConn)" },
              { lib: "ECMqtt", desc: "MQTT client with OTA support (PubSubClient)" },
              { lib: "ECClimate", desc: "BME280 + MH-Z19 sensor readings" },
              { lib: "ECHvac", desc: "Relay and HVAC control" },
              { lib: "ECGPS", desc: "NMEA GPS parsing (GP-02 module)" },
              { lib: "ECDiag", desc: "Battery, signal, heap, reboot reason" },
            ].map(l => (
              <div key={l.lib} className="bg-white/3 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded shrink-0">{l.lib}</span>
                <span className="text-xs text-white/45 leading-relaxed">{l.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quickstart */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/8 border border-blue-500/20 rounded-2xl p-7">
          <h2 className="text-xl font-bold mb-2">Quickstart</h2>
          <p className="text-white/45 text-sm mb-5">Register a device and get telemetry flowing in under 10 minutes.</p>
          <pre className="bg-black/50 border border-white/10 rounded-xl p-5 text-xs text-green-300 overflow-x-auto leading-relaxed">{`# 1. Register device
POST https://ec-registry.onrender.com/devices/register
{
  "serial_no": "EC-CLM-001",
  "product_type": "EC-CLIMATE-V1",
  "fw_version": "1.0.0"
}

# 2. Push telemetry via MQTT
Topic: devices/EC-CLM-001/telemetry
{
  "temp": 24.5,
  "hum": 60,
  "co2": 850,
  "bat": 4.1,
  "signal": -65
}

# 3. View in dashboard
https://ec-platform-ten.vercel.app`}</pre>
        </div>
      </section>
      <Footer />
    </main>
  );
}
