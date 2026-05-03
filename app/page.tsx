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
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="text-xl font-bold tracking-tight">Edge Conductor</span>
        <div className="hidden md:flex gap-8 text-sm text-white/60">
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <a
          href="#contact"
          className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-white/90 transition"
        >
          Start a Project
        </a>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">
        <span className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">
          Edge AI · Robotics · Embedded Systems
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Where Hardware Meets{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Artificial Intelligence
          </span>
        </h1>
        <p className="mt-6 text-white/50 text-lg max-w-xl">
          We design and build real-world AI-powered embedded systems — edge AI devices,
          autonomous robots, and industrial IoT solutions that run intelligence directly on hardware.
        </p>
        <div className="flex gap-4 mt-10">
          <a href="#projects" className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition">
            View Projects
          </a>
          <a href="#contact" className="border border-white/20 px-6 py-3 rounded-full text-white/70 hover:text-white hover:border-white/50 transition">
            Contact Us
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-8 py-20 max-w-6xl mx-auto">
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
      <section className="px-8 py-16 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-medium text-white/80">
            We don&apos;t just write AI code —{" "}
            <span className="text-white">we make it run on real hardware.</span>
          </p>
          <p className="text-white/40 mt-4 text-sm">
            13+ years of embedded engineering. Bridging the gap between AI models and hardware that most software firms cannot.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-8 py-20 max-w-6xl mx-auto">
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

      {/* Agentic Lab */}
      <section id="agentic-lab" className="px-8 py-20 max-w-6xl mx-auto">
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

      {/* About */}
      <section id="about" className="px-8 py-20 bg-white/5 border-y border-white/10">
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
      <section id="contact" className="px-8 py-20 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Start a Project</h2>
        <p className="text-white/40 mb-8 text-sm">Have a hardware or AI project in mind? Let&apos;s build it.</p>
        <a
          href="mailto:edgeconductor@gmail.com"
          className="inline-block bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition text-lg"
        >
          edgeconductor@gmail.com
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-6 text-center text-white/30 text-sm">
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
