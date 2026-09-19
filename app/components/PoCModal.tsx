"use client";
import { useState } from "react";

const HARDWARE  = ["ESP32 / ESP8266", "STM32 / ARM Cortex", "Raspberry Pi / Linux", "Cellular (Quectel / SIMCom)", "Custom MCU / PLC"];
const PROTOCOLS = ["MQTT / MQTTS", "HTTP / REST", "WebSocket", "Custom Binary / Protobuf"];
const USE_CASES = ["Fleet Tracking / Telematics", "Smart Building / HVAC", "Industrial Sensor Telemetry", "White-Label OEM Portal"];
const FLEET     = ["< 100 devices", "100 – 1,000", "1,000+"];

type Props = { open: boolean; onClose: () => void };

function Chip({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  const colors: Record<string, { border: string; bg: string; text: string }> = {
    blue:   { border: active ? "#3b82f6" : "rgba(255,255,255,0.1)", bg: active ? "rgba(59,130,246,0.14)" : "rgba(255,255,255,0.03)", text: active ? "#93c5fd" : "rgba(255,255,255,0.5)" },
    green:  { border: active ? "#22c55e" : "rgba(255,255,255,0.1)", bg: active ? "rgba(34,197,94,0.12)"  : "rgba(255,255,255,0.03)", text: active ? "#86efac" : "rgba(255,255,255,0.5)" },
    violet: { border: active ? "#8b5cf6" : "rgba(255,255,255,0.1)", bg: active ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)", text: active ? "#c4b5fd" : "rgba(255,255,255,0.5)" },
  };
  const c = colors[color];
  return (
    <button onClick={onClick} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer", border: `1px solid ${c.border}`, background: c.bg, color: c.text, transition: "all 0.15s", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {label}
    </button>
  );
}

export default function PoCModal({ open, onClose }: Props) {
  const [step, setStep]         = useState(1);
  const [hardware, setHardware] = useState<string[]>([]);
  const [protocols, setProtocols] = useState<string[]>([]);
  const [useCase, setUseCase]   = useState("");
  const [fleet, setFleet]       = useState("");
  const [email, setEmail]       = useState("");
  const [company, setCompany]   = useState("");
  const [done, setDone]         = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  function toggleArr(arr: string[], val: string, set: (a: string[]) => void) {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  }

  function reset() {
    setStep(1); setHardware([]); setProtocols([]); setUseCase(""); setFleet("");
    setEmail(""); setCompany(""); setDone(false); onClose();
  }

  const btn = (label: string, onClick: () => void, disabled = false, variant: "primary" | "ghost" = "primary") => (
    <button onClick={onClick} disabled={disabled} style={{
      flex: variant === "ghost" ? 1 : 2,
      padding: "12px",
      borderRadius: 12,
      background: variant === "ghost" ? "rgba(255,255,255,0.04)" : disabled ? "rgba(255,255,255,0.05)" : "#3b82f6",
      border: variant === "ghost" ? "1px solid rgba(255,255,255,0.1)" : "none",
      color: variant === "ghost" ? "rgba(255,255,255,0.45)" : disabled ? "rgba(255,255,255,0.2)" : "#fff",
      fontSize: 14, fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {label}
    </button>
  );

  return (
    <div onClick={e => { if (e.target === e.currentTarget) reset(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, width: "100%", maxWidth: 520, padding: 28, position: "relative", fontFamily: "system-ui, -apple-system, sans-serif" }}>

        <button onClick={reset} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 22, lineHeight: 1 }}>×</button>

        {!done ? (
          <>
            {/* Progress bar */}
            <div style={{ display: "flex", gap: 5, marginBottom: 24 }}>
              {[1,2,3,4].map(s => (
                <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? "#3b82f6" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
              ))}
            </div>

            {step === 1 && (
              <>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Step 1 of 4</p>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 6 }}>What hardware are you using?</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", marginBottom: 20 }}>Select all that apply</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {HARDWARE.map(h => <Chip key={h} label={h} active={hardware.includes(h)} color="blue" onClick={() => toggleArr(hardware, h, setHardware)} />)}
                </div>
                {btn("Next →", () => setStep(2), hardware.length === 0)}
              </>
            )}

            {step === 2 && (
              <>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Step 2 of 4</p>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Protocols & connectivity</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", marginBottom: 20 }}>How will your devices communicate?</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {PROTOCOLS.map(p => <Chip key={p} label={p} active={protocols.includes(p)} color="green" onClick={() => toggleArr(protocols, p, setProtocols)} />)}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {btn("← Back", () => setStep(1), false, "ghost")}
                  {btn("Next →", () => setStep(3), protocols.length === 0)}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Step 3 of 4</p>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Use case & fleet size</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", marginBottom: 14 }}>Primary application</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
                  {USE_CASES.map(u => <Chip key={u} label={u} active={useCase === u} color="violet" onClick={() => setUseCase(u)} />)}
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", marginBottom: 10 }}>Fleet size</p>
                <div style={{ display: "flex", gap: 7, marginBottom: 22 }}>
                  {FLEET.map(f => (
                    <button key={f} onClick={() => setFleet(f)} style={{ flex: 1, padding: "8px 4px", borderRadius: 10, fontSize: 12, cursor: "pointer", border: `1px solid ${fleet === f ? "#8b5cf6" : "rgba(255,255,255,0.1)"}`, background: fleet === f ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)", color: fleet === f ? "#c4b5fd" : "rgba(255,255,255,0.45)", transition: "all 0.15s", fontFamily: "system-ui" }}>{f}</button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {btn("← Back", () => setStep(2), false, "ghost")}
                  {btn("Next →", () => setStep(4), !useCase || !fleet)}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Step 4 of 4</p>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Almost there</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", marginBottom: 20, lineHeight: 1.6 }}>We&apos;ll send a tailored architecture brief and a calendar link for a 15-min engineering fit review.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Work email" type="email"
                    style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 14, outline: "none", fontFamily: "system-ui" }} />
                  <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name"
                    style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 14, outline: "none", fontFamily: "system-ui" }} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {btn("← Back", () => setStep(3), false, "ghost")}
                  {btn(submitting ? "Sending…" : "Get Architecture Brief →", async () => {
                    setSubmitting(true);
                    try {
                      await fetch("/api/poc-inquiry", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, company, hardware, protocols, useCase, fleet }),
                      });
                    } finally {
                      setSubmitting(false);
                      setDone(true);
                    }
                  }, !email || !company || submitting)}
                </div>
              </>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>✓</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>You&apos;re in</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.42)", marginBottom: 22, lineHeight: 1.7 }}>
              We&apos;ll send a tailored architecture brief to <strong style={{ color: "#93c5fd" }}>{email}</strong> within 24 hours, with a calendar link for your 15-min engineering fit review.
            </p>
            <div style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "left" }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Your Selection</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 1.8 }}>
                <strong style={{ color: "rgba(255,255,255,0.7)" }}>Hardware:</strong> {hardware.join(", ")}<br />
                <strong style={{ color: "rgba(255,255,255,0.7)" }}>Protocols:</strong> {protocols.join(", ")}<br />
                <strong style={{ color: "rgba(255,255,255,0.7)" }}>Use case:</strong> {useCase}<br />
                <strong style={{ color: "rgba(255,255,255,0.7)" }}>Fleet size:</strong> {fleet}
              </p>
            </div>
            <button onClick={reset} style={{ padding: "10px 28px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", fontSize: 14, cursor: "pointer", fontFamily: "system-ui" }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
