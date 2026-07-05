import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Getting Started — EdgeConductor",
  description: "Step-by-step guide to getting your first device live on EdgeConductor. Hardware, firmware, provisioning, and dashboard setup.",
  alternates: { canonical: "https://edgeconductor.com/onboarding" },
};

const solutions = [
  {
    key: "climate",
    icon: "🌡",
    label: "EC Climate",
    desc: "Smart buildings, HVAC, CO₂ & temperature monitoring",
    color: "cyan",
    hardware: [
      { part: "ESP32-WROOM-32 Dev Board", role: "Main controller" },
      { part: "BME280 Sensor Module", role: "Temperature, Humidity, Pressure" },
      { part: "MH-Z19B CO₂ Sensor", role: "Air quality (CO₂ ppm)" },
      { part: "5V Relay Module", role: "HVAC control" },
      { part: "5V Power Supply (USB or 12V adapter)", role: "Power" },
    ],
    note: "All parts available on Robu.in, RobotShop, or Amazon India. Total hardware cost approx ₹1,500–₂,500 per room.",
  },
  {
    key: "tracker",
    icon: "📍",
    label: "EC Tracker",
    desc: "GPS fleet tracking via 4G cellular",
    color: "blue",
    hardware: [
      { part: "ESP32-WROOM-32 Dev Board", role: "Main controller" },
      { part: "A7672S-LASC 4G Module", role: "Cellular connectivity" },
      { part: "GP-02 GPS Module (external)", role: "GPS location" },
      { part: "LiPo Battery 3.7V 2000mAh", role: "Power" },
      { part: "Standard SIM card (Jio/Airtel/BSNL)", role: "Cellular data" },
    ],
    note: "Full hardware BOM and PCB design available on request. Contact us for pre-built EC Tracker boards.",
  },
];

const colorMap: Record<string, { badge: string; dot: string }> = {
  cyan:   { badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",   dot: "bg-cyan-400" },
  blue:   { badge: "text-blue-400 bg-blue-500/10 border-blue-500/25",   dot: "bg-blue-400" },
  green:  { badge: "text-green-400 bg-green-500/10 border-green-500/25", dot: "bg-green-400" },
  violet: { badge: "text-violet-400 bg-violet-500/10 border-violet-500/25", dot: "bg-violet-400" },
};

const steps = [
  {
    step: "01",
    title: "Create your account",
    color: "blue",
    desc: "Sign up for free — no credit card required for the Starter plan (up to 5 devices).",
    actions: [
      { label: "Create Free Account →", href: "/get-started", primary: true },
      { label: "Or talk to us for a managed setup →", href: "/contact", primary: false },
    ],
    notes: [
      "Use your company email if possible",
      "Select your product type: EC Climate or EC Tracker",
      "Check your inbox — you will receive a confirmation email from Supabase and a welcome email from us",
    ],
  },
  {
    step: "02",
    title: "Get your hardware",
    color: "cyan",
    desc: "Buy the parts for your solution, or contact us if you need a pre-assembled board.",
    note: "If you are on the Pro plan, your onboarding call includes a hardware review — we will confirm exactly what to buy for your specific installation.",
  },
  {
    step: "03",
    title: "Flash the firmware",
    color: "green",
    desc: "Download the firmware for your solution and flash it to your ESP32 using Arduino IDE or PlatformIO.",
    steps: [
      "Download the latest firmware .zip from your dashboard → Firmware section",
      "Open the .ino or platformio.ini file in your IDE",
      "Edit the config file: add your WiFi SSID, password, and the Device Secret Key shown in your dashboard",
      "Select board: ESP32 Dev Module (Arduino) or esp32dev (PlatformIO)",
      "Flash via USB (baud: 115200)",
      "Open Serial Monitor — you should see 'Connected to EdgeConductor' within 30 seconds",
    ],
    note: "Firmware source is available at github.com/EdgeConductor. For EC Tracker (cellular), SIM APN configuration is documented in the firmware README.",
  },
  {
    step: "04",
    title: "Claim your device",
    color: "violet",
    desc: "Register the device to your organisation using the QR code printed by the firmware on first boot.",
    steps: [
      "Power on your device — on first boot it prints a QR code on the Serial Monitor",
      "In your dashboard, go to Devices → Add Device",
      "Scan the QR code or enter the device serial number manually",
      "Assign it to your organisation",
      "The device should appear Online within 10–15 seconds",
    ],
    note: "For batch provisioning (10+ devices at once), use the EC CLI: ec device register --serial <SERIAL> --org <ORG_ID>",
  },
  {
    step: "05",
    title: "Configure your dashboard",
    color: "blue",
    desc: "Set up rooms (EC Climate) or assign vehicles (EC Tracker), then build your widget layout.",
    steps: [
      "EC Climate: Go to Organisation → Rooms → Create Room → assign your device to the room",
      "EC Tracker: Go to Organisation → Fleet → your device appears on the live map automatically",
      "Dashboard → drag and drop widgets: temperature gauge, GPS map, HVAC toggle, CO₂ chart",
      "Set your organisation name and upload your logo if using white-label",
    ],
  },
  {
    step: "06",
    title: "Set your first rule",
    color: "green",
    desc: "Automate your operation — no code required.",
    examples: [
      { trigger: "IF CO₂ > 1000 ppm", action: "→ Turn HVAC ON", product: "EC Climate" },
      { trigger: "AT 22:00 Mon–Fri", action: "→ Turn HVAC OFF", product: "EC Climate" },
      { trigger: "IF device offline > 10 min", action: "→ Send email alert", product: "Both" },
      { trigger: "IF battery < 15%", action: "→ Send Telegram notification", product: "EC Tracker" },
    ],
    steps: [
      "Go to Organisation → Rules → New Rule",
      "Select trigger type: Threshold, Schedule, or Device Status",
      "Select action: Relay control, Email alert, Webhook, or Telegram",
      "Save — rule evaluates automatically every 30 seconds",
    ],
  },
];

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-4 md:px-8 pt-20 pb-16 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5 border border-blue-500/30 bg-blue-500/8 px-3 py-1.5 rounded-full">
            Getting Started
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Your first device live in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              10 minutes
            </span>
          </h1>
          <p className="text-white/45 text-base leading-relaxed mb-8">
            Follow this guide to go from hardware in hand to live telemetry on your dashboard.
            No cloud infrastructure to manage — EdgeConductor handles everything.
          </p>

          {/* Two paths */}
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="bg-blue-500/8 border border-blue-500/25 rounded-2xl p-5">
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">Self-guided</p>
              <p className="text-white/70 text-sm font-semibold mb-1">I am technical</p>
              <p className="text-white/40 text-xs leading-relaxed">Follow the steps below. You will have your first device live in under 30 minutes.</p>
            </div>
            <div className="bg-white/3 border border-white/10 rounded-2xl p-5">
              <p className="text-white/35 text-xs font-semibold uppercase tracking-wider mb-2">Managed Setup — Pro Plan</p>
              <p className="text-white/70 text-sm font-semibold mb-1">I need help with setup</p>
              <p className="text-white/40 text-xs leading-relaxed mb-3">
                Pro plan includes an onboarding call. We review your hardware, configure firmware, and set up your dashboard together.
              </p>
              <Link href="/contact?type=onboarding"
                className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-full transition">
                Book Onboarding Call →
              </Link>
            </div>
          </div>
        </div>

        {/* Hardware section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Hardware You Need</h2>
          <p className="text-white/40 text-sm mb-8">Pick your solution, buy the parts, and come back to Step 03.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map(sol => (
              <div key={sol.key} className="bg-white/3 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{sol.icon}</span>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${colorMap[sol.color].badge}`}>
                      {sol.label}
                    </span>
                    <p className="text-white/35 text-xs mt-1">{sol.desc}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {sol.hardware.map(h => (
                    <div key={h.part} className="flex items-start justify-between gap-4">
                      <span className="text-sm text-white/65 font-medium">{h.part}</span>
                      <span className="text-xs text-white/30 shrink-0">{h.role}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/30 leading-relaxed border-t border-white/8 pt-3">{sol.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Setup Steps</h2>
          {steps.map((s) => (
            <div key={s.step} className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-white/15 transition">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-xs font-mono text-white/20 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full shrink-0">{s.step}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-white/45 text-sm">{s.desc}</p>
                </div>
              </div>

              {"actions" in s && s.actions && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {s.actions.map(a => (
                    <Link key={a.href} href={a.href}
                      className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition ${
                        a.primary
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "border border-white/15 text-white/55 hover:text-white hover:border-white/30"
                      }`}>
                      {a.label}
                    </Link>
                  ))}
                </div>
              )}

              {"steps" in s && s.steps && (
                <ol className="space-y-2 mb-4">
                  {s.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                      <span className="text-white/20 font-mono text-xs mt-0.5 shrink-0">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              )}

              {"examples" in s && s.examples && (
                <div className="grid sm:grid-cols-2 gap-2 mb-4">
                  {s.examples.map(ex => (
                    <div key={ex.trigger} className="bg-white/3 border border-white/8 rounded-xl px-4 py-3">
                      <p className="text-xs font-mono text-green-400">{ex.trigger}</p>
                      <p className="text-xs font-mono text-white/60">{ex.action}</p>
                      <p className="text-[10px] text-white/25 mt-1">{ex.product}</p>
                    </div>
                  ))}
                </div>
              )}

              {"note" in s && s.note && (
                <div className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 mt-3">
                  <p className="text-xs text-white/30 leading-relaxed">💡 {s.note}</p>
                </div>
              )}

              {"notes" in s && s.notes && (
                <ul className="space-y-1.5 mt-3">
                  {s.notes.map(n => (
                    <li key={n} className="flex items-start gap-2 text-xs text-white/35">
                      <span className="text-white/20 mt-0.5 shrink-0">—</span>{n}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Done + what next */}
        <div className="mt-14 bg-gradient-to-br from-blue-500/8 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-8 text-center">
          <p className="text-2xl mb-3">🎉</p>
          <h2 className="text-2xl font-bold mb-2">You&apos;re live.</h2>
          <p className="text-white/45 text-sm mb-8 max-w-md mx-auto">
            Your device is online, telemetry is flowing, and your first rule is active.
            Here&apos;s what to do next.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left mb-8">
            {[
              { title: "Invite your team", desc: "Add org admins and team members from Organisation → Users", href: null },
              { title: "Set up white-label", desc: "Add your logo and domain to brand the portal for your clients", href: "/partners" },
              { title: "Explore the API", desc: "Connect your existing systems using the REST API or webhooks", href: "/developers" },
            ].map(n => (
              <div key={n.title} className="bg-black/20 border border-white/8 rounded-xl p-4">
                <p className="text-sm font-semibold mb-1">{n.title}</p>
                <p className="text-xs text-white/35 leading-relaxed mb-2">{n.desc}</p>
                {n.href && (
                  <Link href={n.href} className="text-xs text-blue-400 hover:text-blue-300 transition">
                    Learn more →
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="text-white/30 text-sm">
            Stuck on a step?{" "}
            <a href="mailto:edgeconductor@gmail.com" className="text-blue-400 hover:text-blue-300 transition">
              edgeconductor@gmail.com
            </a>{" "}
            — we respond within 24 hours.
          </p>
        </div>

      </section>
      <Footer />
    </main>
  );
}
