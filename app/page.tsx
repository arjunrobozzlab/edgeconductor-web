import AgentsSection from "./components/AgentsSection";

const serviceIcons: Record<string, string> = {
  edge_ai: "🤖",
  robotics: "🦾",
  iot: "🏭",
  firmware: "⚙️",
};

async function getCompanyData() {
  try {
    const [servicesRes, projectsRes] = await Promise.all([
      fetch("https://api.edgeconductor.com/api/services", { cache: "no-store" }),
      fetch("https://api.edgeconductor.com/api/projects", { cache: "no-store" }),
    ]);
    const servicesData = await servicesRes.json();
    const projectsData = await projectsRes.json();
    return {
      services: servicesData.services || [],
      projects: projectsData.projects || [],
    };
  } catch {
    return { services: [], projects: [] };
  }
}

export default async function Home() {
  const { services, projects } = await getCompanyData();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-white/10">
        <span className="text-lg md:text-xl font-bold tracking-tight">Edge Conductor</span>
        <div className="hidden md:flex gap-8 text-sm text-white/60">
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="/case-studies" className="hover:text-white transition">Case Studies</a>
          <a href="#products" className="hover:text-white transition">Products</a>
          <a href="#agents" className="hover:text-white transition">Agents</a>
          <a href="#api" className="hover:text-white transition">API</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a href="/onboard"
            className="hidden sm:block text-xs md:text-sm border border-blue-500/40 text-blue-400 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium hover:bg-blue-500/10 transition">
            Get Agentic API
          </a>
          <a href="#contact"
            className="text-xs md:text-sm bg-white text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium hover:bg-white/90 transition">
            Start a Project
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-28">
        <span className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">
          Edge AI · Robotics · Embedded Systems
        </span>
        <h1 className="text-3xl md:text-6xl font-bold leading-tight max-w-3xl">
          Where Hardware Meets{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Artificial Intelligence
          </span>
        </h1>
        <p className="mt-6 text-white/50 text-base md:text-lg max-w-xl">
          We design and build real-world AI-powered embedded systems — edge AI devices,
          autonomous robots, and industrial IoT solutions that run intelligence directly on hardware.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10 w-full sm:w-auto">
          <a href="#projects" className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition text-center">
            View Projects
          </a>
          <a href="#contact" className="border border-white/20 px-6 py-3 rounded-full text-white/70 hover:text-white hover:border-white/50 transition text-center">
            Contact Us
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 md:px-8 py-12 md:py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">What We Build</h2>
        <p className="text-white/40 mb-12 text-sm">End-to-end embedded AI solutions for global clients</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s: { id: string; name: string; description: string }) => (
            <div key={s.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <div className="text-3xl mb-4">{serviceIcons[s.id] || "🔧"}</div>
              <h3 className="font-semibold mb-2">{s.name}</h3>
              <p className="text-white/40 text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiator */}
      <section className="px-4 md:px-8 py-12 md:py-16 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-2xl font-medium text-white/80">
            We don&apos;t just write AI code —{" "}
            <span className="text-white">we make it run on real hardware.</span>
          </p>
          <p className="text-white/40 mt-4 text-sm">
            13+ years of embedded engineering. Bridging the gap between AI models and hardware that most software firms cannot.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-4 md:px-8 py-12 md:py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Projects</h2>
        <p className="text-white/40 mb-12 text-sm">Real-world systems built and deployed</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p: { id: string; category: string; title: string; description: string; tags: string[] }) => (
            <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{p.category}</span>
              <h3 className="font-semibold mt-2 mb-3">{p.title}</h3>
              <p className="text-white/40 text-sm">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((tag: string) => (
                  <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/50">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="px-4 md:px-8 py-12 md:py-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">Products</h2>
          <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full font-semibold">Live</span>
        </div>
        <p className="text-white/40 mb-10 text-sm">Software products built and deployed by Edge Conductor — available for licensing or white-label</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* EdgeScribe */}
          <div className="relative bg-white/5 border border-green-500/25 rounded-2xl p-6 md:p-8 hover:border-green-500/40 transition">
            <div className="absolute top-5 right-5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-semibold">Live</span>
            </div>
            <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">AI · Conversation Intelligence</span>
            <h3 className="text-xl font-bold mt-2 mb-1">EdgeScribe</h3>
            <p className="text-white/40 text-xs mb-4">AI-powered conversation analysis & coaching platform</p>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Record any professional conversation, get automatic transcription, AI-scored communication quality, and instant reports — emailed to supervisors and synced to Google Sheets. Built to work across industries with zero setup.
            </p>

            {/* Industry tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Healthcare", "Sales Coaching", "Education", "HR & Interviews"].map((ind) => (
                <span key={ind} className="text-xs bg-green-500/10 text-green-300/70 border border-green-500/20 px-2.5 py-1 rounded-full">{ind}</span>
              ))}
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {["Whisper STT", "Google Docs API", "Gmail SMTP", "Python", "Render"].map((t) => (
                <span key={t} className="text-xs bg-white/10 text-white/45 px-2 py-1 rounded-full">{t}</span>
              ))}
            </div>

            <a
              href="https://edgescribe.onrender.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
            >
              Try Live Demo →
            </a>
          </div>

          {/* EdgeOnboard */}
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition">
            <div className="absolute top-5 right-5">
              <span className="text-xs text-yellow-400 font-semibold bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full">In Development</span>
            </div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">IoT · Device Management</span>
            <h3 className="text-xl font-bold mt-2 mb-1">EdgeOnboard</h3>
            <p className="text-white/40 text-xs mb-4">Universal IoT device onboarding & control platform</p>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Scan a QR code — instantly add any IoT device to your fleet. Supports ESP32, Arduino, nRF52840, STM32, and ARM controllers. AP-mode WiFi provisioning, Firebase-backed device registry, and multi-platform control from web, Android, or iOS.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["QR Provisioning", "AP Mode WiFi Setup", "Multi-Device Fleet", "Web + Android + iOS"].map((f) => (
                <span key={f} className="text-xs bg-blue-500/10 text-blue-300/70 border border-blue-500/20 px-2.5 py-1 rounded-full">{f}</span>
              ))}
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {["ESP32", "Firebase", "Python", "React Native", "Arduino Framework"].map((t) => (
                <span key={t} className="text-xs bg-white/10 text-white/45 px-2 py-1 rounded-full">{t}</span>
              ))}
            </div>

            <span className="inline-flex items-center gap-2 text-sm text-white/30 border border-white/10 px-5 py-2.5 rounded-xl cursor-not-allowed">
              Coming Soon
            </span>
          </div>

        </div>
      </section>

      {/* Agentic Lab */}
      <section id="agentic-lab" className="px-4 md:px-8 py-12 md:py-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">Agentic Lab</h2>
          <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-full font-semibold">New</span>
        </div>
        <p className="text-white/40 mb-12 text-sm">Building infrastructure for AI agents — moving from human-centric UI to agent-native APIs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agenticProjects.map((p) => (
            <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{p.category}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  p.status === "Done" ? "bg-green-500/20 text-green-400" :
                  p.status === "In Progress" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-white/10 text-white/40"
                }`}>{p.status}</span>
              </div>
              <h3 className="font-semibold mt-1 mb-3">{p.title}</h3>
              <p className="text-white/40 text-sm">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/50">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Integration */}
      <section id="api" className="px-4 md:px-8 py-12 md:py-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">Developer Integration</h2>
          <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full font-semibold">Live</span>
        </div>
        <p className="text-white/40 mb-10 text-sm">Connect your AI agent to EdgeConductor — MCP, REST, or AI crawler</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* MCP Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">MCP Server</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Live</span>
            </div>
            <h3 className="font-semibold mb-2">Claude Code &amp; Claude Desktop</h3>
            <p className="text-white/40 text-sm mb-4">
              Add to your <code className="text-white/60 bg-white/10 px-1 rounded">~/.mcp.json</code> — Claude can query our services, projects, and submit inquiries as native tools.
            </p>
            <pre className="bg-black/50 border border-white/10 rounded-xl p-4 text-xs text-green-300 overflow-x-auto leading-relaxed">{`{
  "mcpServers": {
    "edge-conductor": {
      "type": "http",
      "url": "https://api.edgeconductor.com/api/mcp"
    }
  }
}`}</pre>
            <div className="mt-4">
              <p className="text-white/30 text-xs mb-2">Available tools</p>
              <div className="flex flex-wrap gap-2">
                {["get_info", "get_services", "get_projects", "submit_inquiry"].map((t) => (
                  <span key={t} className="text-xs bg-white/10 text-white/50 px-2 py-1 rounded-full font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* REST API Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">REST API</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Live</span>
            </div>
            <h3 className="font-semibold mb-2">Any Agent · ChatGPT Actions · LangChain</h3>
            <p className="text-white/40 text-sm mb-4">
              Standard HTTP endpoints — works with any LLM framework, ChatGPT custom action, or automated pipeline.
            </p>
            <div className="space-y-2 mb-4">
              {[
                { method: "GET", path: "/api/info", desc: "Full company profile" },
                { method: "GET", path: "/api/services", desc: "Services + skills" },
                { method: "GET", path: "/api/projects", desc: "Portfolio (filter: ?category=iot)" },
                { method: "POST", path: "/api/inquire", desc: "Submit project inquiry" },
              ].map(({ method, path, desc }) => (
                <div key={path} className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-lg px-3 py-2">
                  <span className="text-xs font-mono text-green-400 w-10 shrink-0">{method}</span>
                  <span className="text-xs font-mono text-white/60 flex-1">{path}</span>
                  <span className="text-xs text-white/30 hidden sm:block">{desc}</span>
                </div>
              ))}
            </div>
            <p className="text-white/25 text-xs font-mono">Base: https://api.edgeconductor.com</p>
          </div>
        </div>

        {/* llms.txt strip */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider shrink-0">llms.txt</span>
            <p className="text-white/40 text-sm">
              AI crawlers (Perplexity, Claude, ChatGPT Browse) automatically read this file to understand who we are and what we build.
            </p>
          </div>
          <a
            href="https://api.edgeconductor.com/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs border border-white/20 text-white/50 px-3 py-1.5 rounded-full hover:text-white hover:border-white/40 transition"
          >
            View →
          </a>
        </div>
      </section>

      {/* Agentic Profile CTA */}
      <section className="px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div>
            <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">For Businesses</span>
            <h2 className="text-xl md:text-2xl font-bold mt-2 mb-3">Add Agentic Profile to Your Website</h2>
            <p className="text-white/50 text-sm max-w-lg">
              Make your business AI-agent ready. Fill in your details — your API goes live in minutes.
              AI agents will find your business, read your services, and send you inquiries automatically.
            </p>
          </div>
          <a href="/onboard"
            className="shrink-0 bg-white text-black px-6 md:px-8 py-3 rounded-full font-medium hover:bg-white/90 transition text-sm whitespace-nowrap">
            Get Started →
          </a>
        </div>
      </section>

      <AgentsSection />

      {/* About */}
      <section id="about" className="px-4 md:px-8 py-12 md:py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About Edge Conductor</h2>
          <p className="text-white/60 leading-relaxed mb-4">
            Edge Conductor is an embedded AI and robotics engineering company specializing in edge intelligence systems.
            Founded by engineers with 13+ years of hands-on embedded systems experience, we build real-world AI-powered
            products that run on actual hardware — not just in the cloud.
          </p>
          <p className="text-white/60 leading-relaxed">
            From edge AI devices running computer vision offline, to autonomous robots and industrial IoT systems —
            we deliver reliable hardware, firmware, and intelligent automation solutions for global clients.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 md:px-8 py-12 md:py-20 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Start a Project</h2>
        <p className="text-white/40 mb-8 text-sm">Have a hardware or AI project in mind? Let&apos;s build it.</p>
        <a
          href="mailto:edgeconductor@gmail.com"
          className="inline-block bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-white/90 transition text-sm md:text-lg break-all md:break-normal"
        >
          edgeconductor@gmail.com
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 md:px-8 py-6 text-center text-white/30 text-sm">
        © {new Date().getFullYear()} Edge Conductor. All rights reserved.
      </footer>

    </main>
  );
}

const agenticProjects: {
  category: string; title: string; desc: string;
  tags: string[]; status: "Done" | "In Progress" | "Planned";
}[] = [
  {
    category: "Agentic API",
    title: "Hello World — Agent-Readable FastAPI",
    desc: "A minimal FastAPI server exposing structured JSON endpoints. Agents call /discount or /services directly — no UI, no buttons, just clean tool specs.",
    tags: ["FastAPI", "Python", "REST API", "JSON Schema", "Pydantic"],
    status: "Done",
  },
  {
    category: "MCP · Agentic Infrastructure",
    title: "Agentic Business Profile API",
    desc: "Live API — AI agents query company info, services, projects. POST /api/inquire sends email to owner instantly. No forms, no buttons. Deploy for any company in minutes.",
    tags: ["Next.js", "llms.txt", "Nodemailer", "Vercel", "REST API"],
    status: "Done",
  },
  {
    category: "Multi-Agent · IoT",
    title: "Multi-Agent Predictive Maintenance System",
    desc: "Sensor data → anomaly detection agent → root cause analysis agent → maintenance scheduler agent. Fully automated fault detection for industrial machines.",
    tags: ["LangGraph", "MQTT", "ESP32", "Python", "Claude API"],
    status: "Planned",
  },
];
