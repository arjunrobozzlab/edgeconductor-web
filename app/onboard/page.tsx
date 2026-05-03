"use client";
import { useState } from "react";

const defaultServices = [{ name: "", description: "", skills: "", use_cases: "" }];
const defaultProjects = [{ title: "", category: "", description: "", tags: "" }];

export default function OnboardPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [error, setError] = useState("");

  const [basic, setBasic] = useState({
    slug: "", name: "", tagline: "", description: "",
    location: "", serving: "", experience_years: "", founded: "",
  });

  const [contact, setContact] = useState({
    email: "", website: "", phone: "", how_to_hire: "",
  });

  const [services, setServices] = useState(defaultServices);
  const [projects, setProjects] = useState(defaultProjects);

  function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  function updateService(i: number, field: string, value: string) {
    setServices(services.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  function updateProject(i: number, field: string, value: string) {
    setProjects(projects.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...basic,
        experience_years: parseInt(basic.experience_years) || 0,
        founded: parseInt(basic.founded) || 0,
        contact: {
          email: contact.email,
          website: contact.website,
          phone: contact.phone,
        },
        how_to_hire: contact.how_to_hire,
        services: services.map((s) => ({
          id: slugify(s.name),
          name: s.name,
          description: s.description,
          skills: s.skills.split(",").map((x) => x.trim()).filter(Boolean),
          use_cases: s.use_cases.split(",").map((x) => x.trim()).filter(Boolean),
        })),
        projects: projects.map((p) => ({
          id: slugify(p.title),
          title: p.title,
          category: p.category,
          description: p.description,
          tags: p.tags.split(",").map((x) => x.trim()).filter(Boolean),
        })),
      };

      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setApiUrl(data.api_url || "");
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    const base = apiUrl || "deploying...";
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-3">Agentic Profile Active</h1>
          <p className="text-white/50 text-sm mb-2">Your API is deploying. Check email for confirmation.</p>
          <p className="text-white/30 text-xs mb-6">Live at: <span className="text-blue-400">{base}</span></p>
          <div className="flex flex-col gap-2 text-left">
            {["/api/services", "/api/projects", "/api/info"].map((path) => (
              <a key={path} href={`${apiUrl}${path}`} target="_blank"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 font-mono text-sm text-blue-400 hover:border-white/30 transition">
                {apiUrl}{path}
              </a>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-16 max-w-2xl mx-auto">
      <div className="mb-10">
        <span className="text-xs text-white/40 uppercase tracking-widest">Agentic Profile Setup</span>
        <h1 className="text-2xl font-bold mt-2">Add Your Company</h1>
        <p className="text-white/40 text-sm mt-1">Fill in your details — your agentic API goes live instantly.</p>
        <div className="flex gap-2 mt-6">
          {["Basic Info", "Contact", "Services", "Projects"].map((label, i) => (
            <div key={label} className={`flex-1 h-1 rounded-full ${step > i ? "bg-blue-500" : "bg-white/10"}`} />
          ))}
        </div>
      </div>

      {/* Step 1 - Basic Info */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-white/80">Basic Information</h2>
          <Field label="Company Name" value={basic.name} onChange={(v) => setBasic({ ...basic, name: v, slug: slugify(v) })} placeholder="Edge Conductor" />
          <Field label="Slug (URL identifier)" value={basic.slug} onChange={(v) => setBasic({ ...basic, slug: v })} placeholder="edge-conductor" />
          <Field label="Tagline" value={basic.tagline} onChange={(v) => setBasic({ ...basic, tagline: v })} placeholder="Embedded AI · Robotics · IoT" />
          <Field label="Description" value={basic.description} onChange={(v) => setBasic({ ...basic, description: v })} placeholder="What your company does..." textarea />
          <Field label="Location" value={basic.location} onChange={(v) => setBasic({ ...basic, location: v })} placeholder="Indore, India" />
          <Field label="Serving" value={basic.serving} onChange={(v) => setBasic({ ...basic, serving: v })} placeholder="Global clients (remote)" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Years of Experience" value={basic.experience_years} onChange={(v) => setBasic({ ...basic, experience_years: v })} placeholder="13" />
            <Field label="Founded Year" value={basic.founded} onChange={(v) => setBasic({ ...basic, founded: v })} placeholder="2013" />
          </div>
          <NavButtons onNext={() => setStep(2)} nextDisabled={!basic.name || !basic.slug} />
        </div>
      )}

      {/* Step 2 - Contact */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-white/80">Contact Details</h2>
          <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} placeholder="you@company.com" />
          <Field label="Website" value={contact.website} onChange={(v) => setContact({ ...contact, website: v })} placeholder="https://yourcompany.com" />
          <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} placeholder="+91-9999999999" />
          <Field label="How to Hire" value={contact.how_to_hire} onChange={(v) => setContact({ ...contact, how_to_hire: v })} placeholder="Email us with project description, budget, timeline..." textarea />
          <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!contact.email} />
        </div>
      )}

      {/* Step 3 - Services */}
      {step === 3 && (
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-white/80">Services</h2>
          {services.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/50">Service {i + 1}</span>
                {services.length > 1 && (
                  <button onClick={() => setServices(services.filter((_, idx) => idx !== i))}
                    className="text-xs text-red-400 hover:text-red-300">Remove</button>
                )}
              </div>
              <Field label="Service Name" value={s.name} onChange={(v) => updateService(i, "name", v)} placeholder="Edge AI Systems" />
              <Field label="Description" value={s.description} onChange={(v) => updateService(i, "description", v)} placeholder="What this service does..." textarea />
              <Field label="Skills (comma separated)" value={s.skills} onChange={(v) => updateService(i, "skills", v)} placeholder="YOLOv8, OpenCV, Python" />
              <Field label="Use Cases (comma separated)" value={s.use_cases} onChange={(v) => updateService(i, "use_cases", v)} placeholder="Defect detection, People counting" />
            </div>
          ))}
          <button onClick={() => setServices([...services, { name: "", description: "", skills: "", use_cases: "" }])}
            className="border border-white/20 rounded-xl py-2 text-sm text-white/50 hover:text-white hover:border-white/40 transition">
            + Add Service
          </button>
          <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} />
        </div>
      )}

      {/* Step 4 - Projects */}
      {step === 4 && (
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-white/80">Portfolio Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/50">Project {i + 1}</span>
                {projects.length > 1 && (
                  <button onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}
                    className="text-xs text-red-400 hover:text-red-300">Remove</button>
                )}
              </div>
              <Field label="Project Title" value={p.title} onChange={(v) => updateProject(i, "title", v)} placeholder="Hospital AI Robot" />
              <Field label="Category" value={p.category} onChange={(v) => updateProject(i, "category", v)} placeholder="Edge AI · Robotics" />
              <Field label="Description" value={p.description} onChange={(v) => updateProject(i, "description", v)} placeholder="What was built..." textarea />
              <Field label="Tags (comma separated)" value={p.tags} onChange={(v) => updateProject(i, "tags", v)} placeholder="YOLOv8, ROS2, Raspberry Pi" />
            </div>
          ))}
          <button onClick={() => setProjects([...projects, { title: "", category: "", description: "", tags: "" }])}
            className="border border-white/20 rounded-xl py-2 text-sm text-white/50 hover:text-white hover:border-white/40 transition">
            + Add Project
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <NavButtons onBack={() => setStep(3)} onNext={handleSubmit} nextLabel={loading ? "Saving..." : "Go Live"} nextDisabled={loading} />
        </div>
      )}
    </main>
  );
}

function Field({ label, value, onChange, placeholder, textarea }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; textarea?: boolean;
}) {
  const cls = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30";
  return (
    <div>
      <label className="text-xs text-white/40 mb-1 block">{label}</label>
      {textarea
        ? <textarea className={cls + " resize-none h-20"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        : <input className={cls} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      }
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel = "Next", nextDisabled = false }: {
  onBack?: () => void; onNext?: () => void; nextLabel?: string; nextDisabled?: boolean;
}) {
  return (
    <div className="flex justify-between mt-2">
      {onBack
        ? <button onClick={onBack} className="text-sm text-white/40 hover:text-white transition">← Back</button>
        : <div />
      }
      {onNext && (
        <button onClick={onNext} disabled={nextDisabled}
          className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition disabled:opacity-40">
          {nextLabel} →
        </button>
      )}
    </div>
  );
}
