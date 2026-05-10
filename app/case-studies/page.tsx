const caseStudies = [
  {
    id: "hospital-edge-ai",
    category: "Edge AI · Robotics · Computer Vision",
    industry: "Healthcare",
    title: "Hospital Edge AI Patient Monitoring & Autonomous Robot",
    headline: "Fall detected and nurse alerted in under 3 seconds — fully offline",
    summary:
      "Built a privacy-first hospital monitoring system that detects patient falls using YOLOv8, retrieves medical context from a local ChromaDB vector database, reasons with a custom 135 MB edge-fine-tuned LLM running via Ollama, and dispatches an autonomous ROS2/LiDAR robot — all on Raspberry Pi 4 with zero cloud dependency. Federated Learning across edge nodes improves the model without ever sharing raw patient data.",
    outcomes: [
      { label: "Detection time", value: "< 3 sec" },
      { label: "Cloud dependency", value: "Zero" },
      { label: "LLM model size", value: "135 MB" },
      { label: "Systems integrated", value: "7+" },
    ],
    stack: [
      "YOLOv8", "ROS2 Jazzy", "SLAM Toolbox", "Nav2",
      "Ollama", "ChromaDB", "Federated Learning (Flower)",
      "Raspberry Pi 4", "ESP32", "RPLIDAR C1", "MQTT", "OpenCV",
    ],
    hero: true,
  },
  {
    id: "weighbridge-rfid",
    category: "Industrial Automation · RFID · RS485",
    industry: "Industrial Automation",
    title: "Truck Weighbridge Alignment & RFID Identification System",
    headline: "Zero incorrect weight readings via 6-point alignment + fail-safe logic",
    summary:
      "Automated a truck weighbridge using UHF RFID vehicle detection, 6-position sensor alignment verification, and dual RS485 communication with PC weighing software. Fail-safe logic blocks weight measurement until the truck is correctly positioned, then triggers audio guidance, takes the reading, and releases the boom barrier automatically.",
    outcomes: [
      { label: "Alignment sensors", value: "6-point" },
      { label: "RS485 channels", value: "Dual" },
      { label: "Incorrect readings", value: "Zero" },
      { label: "Workflow", value: "Fully automated" },
    ],
    stack: ["UHF RFID", "RS485 (dual)", "Arduino Nano", "ESP32", "Relay Modules", "Boom Barrier Control"],
    hero: false,
  },
  {
    id: "water-level-gsm",
    category: "Industrial IoT · GSM · MQTT",
    industry: "Water Management",
    title: "Industrial Water Level Monitoring via GSM & MQTT",
    headline: "700+ lines of legacy firmware rescued — deployed in 3 months",
    summary:
      "Took over a failing client project for a Bhopal startup. Debugged and restructured 700+ lines of unclear ATmega323 legacy code, rebuilt bidirectional MQTT communication over SIM A7670C 4G GSM, calibrated a 26 GHz radar level sensor using a 16-bit ADC, and delivered a production IoT system with real-time cloud dashboard, remote command handling, and EEPROM-backed local storage.",
    outcomes: [
      { label: "Legacy code fixed", value: "700+ lines" },
      { label: "Development time", value: "3 months" },
      { label: "ADC resolution", value: "16-bit" },
      { label: "Communication", value: "Bidirectional" },
    ],
    stack: ["ATmega323", "SIM A7670C 4G GSM", "MQTT", "ADS1115 16-bit ADC", "INA219", "26 GHz Radar Sensor", "EEPROM", "RTC"],
    hero: false,
  },
  {
    id: "multi-network-failover",
    category: "Industrial IoT · Network Redundancy",
    industry: "Industrial IoT",
    title: "Multi-Network IoT Device with Automatic Communication Failover",
    headline: "Near-zero downtime — auto-failover across WiFi, Ethernet, and 4G",
    summary:
      "Built an industrial IoT device that seamlessly switches between Ethernet, WiFi, and 4G GSM based on real-time network availability. The device reads sensor data, creates structured payloads, and transmits continuously using whichever network is live. Includes remote relay control for equipment management — designed for industrial sites where any single network can go down.",
    outcomes: [
      { label: "Networks", value: "WiFi + ETH + 4G" },
      { label: "Failover", value: "Automatic" },
      { label: "Data loss on switch", value: "Zero" },
      { label: "Remote control", value: "Relay output" },
    ],
    stack: ["ESP32", "4G GSM Module", "Ethernet Interface", "WiFi", "Relay Control", "Embedded C", "Arduino Framework"],
    hero: false,
  },
];

const industryColor: Record<string, string> = {
  Healthcare: "text-rose-400",
  "Industrial Automation": "text-orange-400",
  "Water Management": "text-cyan-400",
  "Industrial IoT": "text-blue-400",
};

function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[90px]">
      <span className="text-lg font-bold text-white leading-tight">{value}</span>
      <span className="text-[10px] text-white/35 mt-0.5 text-center leading-tight">{label}</span>
    </div>
  );
}

function StackChip({ label }: { label: string }) {
  return (
    <span className="text-xs bg-white/10 text-white/50 px-2.5 py-1 rounded-full">{label}</span>
  );
}

export default function CaseStudiesPage() {
  const hero = caseStudies.find((c) => c.hero)!;
  const rest = caseStudies.filter((c) => !c.hero);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-white/10">
        <a href="/" className="text-lg md:text-xl font-bold tracking-tight hover:text-white/80 transition">
          Edge Conductor
        </a>
        <div className="hidden md:flex gap-8 text-sm text-white/60">
          <a href="/#services" className="hover:text-white transition">Services</a>
          <a href="/#projects" className="hover:text-white transition">Projects</a>
          <a href="/case-studies" className="text-white font-medium">Case Studies</a>
          <a href="/#agents" className="hover:text-white transition">Agents</a>
          <a href="/#api" className="hover:text-white transition">API</a>
          <a href="/#contact" className="hover:text-white transition">Contact</a>
        </div>
        <a
          href="/#contact"
          className="text-xs md:text-sm bg-white text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium hover:bg-white/90 transition"
        >
          Start a Project
        </a>
      </nav>

      {/* Page header */}
      <section className="px-4 md:px-8 pt-14 pb-10 max-w-6xl mx-auto">
        <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">
          Real work · Real clients · Real outcomes
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Case Studies</h1>
        <p className="text-white/40 text-sm md:text-base max-w-2xl">
          13+ years of embedded engineering — from hospital AI robots to industrial weighbridge automation.
          Every project below is production work delivered for a real client.
        </p>
      </section>

      {/* Hero case study */}
      <section className="px-4 md:px-8 pb-10 max-w-6xl mx-auto">
        <div className="relative border border-blue-500/30 bg-blue-500/5 rounded-2xl p-6 md:p-10 overflow-hidden">
          {/* Featured badge */}
          <div className="absolute top-5 right-5 md:top-6 md:right-6">
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400 bg-blue-500/20 border border-blue-500/30 px-2.5 py-1 rounded-full">
              Featured
            </span>
          </div>

          <span className={`text-xs font-semibold uppercase tracking-wider ${industryColor[hero.industry]}`}>
            {hero.industry}
          </span>
          <h2 className="text-xl md:text-3xl font-bold mt-2 mb-3 pr-20 md:pr-28">{hero.title}</h2>
          <p className="text-blue-300 font-medium text-sm md:text-base mb-5">{hero.headline}</p>
          <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-3xl">{hero.summary}</p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-3 mb-8">
            {hero.outcomes.map((o) => (
              <MetricChip key={o.label} label={o.label} value={o.value} />
            ))}
          </div>

          {/* Stack */}
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-semibold mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {hero.stack.map((s) => (
                <StackChip key={s} label={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 project cards */}
      <section className="px-4 md:px-8 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((cs) => (
            <div
              key={cs.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-white/20 transition"
            >
              <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${industryColor[cs.industry]}`}>
                {cs.industry}
              </span>
              <h3 className="font-semibold text-base leading-snug mb-2">{cs.title}</h3>
              <p className="text-white/40 text-xs font-medium mb-4 leading-relaxed">{cs.headline}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">{cs.summary}</p>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {cs.outcomes.map((o) => (
                  <div key={o.label} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
                    <div className="text-sm font-bold text-white">{o.value}</div>
                    <div className="text-[10px] text-white/30 leading-tight mt-0.5">{o.label}</div>
                  </div>
                ))}
              </div>

              {/* Stack chips */}
              <div>
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-semibold mb-1.5">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {cs.stack.map((s) => (
                    <StackChip key={s} label={s} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 pb-20 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl px-6 md:px-10 py-8 md:py-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3">Have a similar project in mind?</h2>
          <p className="text-white/40 text-sm mb-6 max-w-lg mx-auto">
            From hospital AI to industrial automation — if it runs on hardware and needs intelligence, we build it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#agents"
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition text-sm"
            >
              Scope My Project →
            </a>
            <a
              href="/#contact"
              className="border border-white/20 text-white/70 px-6 py-3 rounded-full font-medium hover:text-white hover:border-white/50 transition text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 md:px-8 py-6 text-center text-white/30 text-sm">
        © {new Date().getFullYear()} Edge Conductor. All rights reserved.
      </footer>
    </main>
  );
}
