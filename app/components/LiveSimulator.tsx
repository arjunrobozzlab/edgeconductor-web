"use client";
import { useState, useEffect, useRef } from "react";

export default function LiveSimulator() {
  const [relay, setRelay]   = useState(false);
  const [temp, setTemp]     = useState(23.2);
  const [bat, setBat]       = useState(87);
  const [tick, setTick]     = useState(0);
  const [log, setLog]       = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const mounted = useRef(false);

  // Heartbeat every 5s
  useEffect(() => {
    const ts = () => new Date().toISOString().split("T")[1].slice(0, 8);
    setLog([
      `[${ts()}] CONNECTED  services.edgeconductor.com:8883`,
      `[${ts()}] SUBSCRIBE  devices/DEMO-CLIMATE-01/shadow/desired`,
    ]);
    mounted.current = true;
    const id = setInterval(() => {
      setTemp(t => parseFloat((t + (Math.random() - 0.5) * 0.15).toFixed(1)));
      setTick(n => n + 1);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mounted.current || tick === 0) return;
    const ts = new Date().toISOString().split("T")[1].slice(0, 8);
    setLog(prev =>
      [`[${ts}] PUBLISH  devices/DEMO-CLIMATE-01/telemetry  {"temp":${temp},"bat":${bat},"relay":${relay},"hum":52.9}`,
       ...prev].slice(0, 6)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  function handleToggle() {
    const next = !relay;
    setRelay(next);
    const ts = new Date().toISOString().split("T")[1].slice(0, 8);
    setLog(prev =>
      [`[${ts}] PUBLISH  devices/DEMO-CLIMATE-01/shadow/desired  {"relay":${next}}`,
       ...prev].slice(0, 6)
    );
    setTick(n => n + 1);
  }

  const code =
`#include <EdgeConductor.h>
EdgeConductor ec("ec_live_xxxx");
void setup() { ec.begin("YOUR_SSID", "YOUR_PASS"); }
void loop()  { ec.sendTelemetry("temp", readTemp()); delay(5000); }`;

  return (
    <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Header */}
      <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.5)" }}>DEMO-CLIMATE-01 · ESP32 ONLINE</span>
        </div>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.2)" }}>HEARTBEAT {tick * 5}s</span>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* Left — Controls */}
        <div style={{ padding: 20, borderRight: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20, fontWeight: 600 }}>Virtual Device Controls</p>

          {/* Relay */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>Relay / HVAC</p>
              <p style={{ fontSize: 11, color: relay ? "#4ade80" : "rgba(255,255,255,0.3)" }}>{relay ? "ON — HVAC running" : "OFF — HVAC idle"}</p>
            </div>
            <button onClick={handleToggle} style={{ width: 44, height: 24, borderRadius: 12, border: "none", background: relay ? "#22c55e" : "rgba(255,255,255,0.12)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
              <span style={{ position: "absolute", top: 3, left: relay ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", transition: "left 0.2s", display: "block" }} />
            </button>
          </div>

          {/* Temp */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Temperature</p>
              <p style={{ fontSize: 13, fontFamily: "monospace", color: "#4ade80" }}>{temp.toFixed(1)}°C</p>
            </div>
            <input type="range" min={15} max={40} step={0.1} value={temp}
              onChange={e => { setTemp(parseFloat(e.target.value)); setTick(n => n + 1); }}
              style={{ width: "100%", accentColor: "#4ade80" }} />
          </div>

          {/* Battery */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Battery</p>
              <p style={{ fontSize: 13, fontFamily: "monospace", color: "#facc15" }}>{bat}%</p>
            </div>
            <input type="range" min={0} max={100} value={bat}
              onChange={e => { setBat(parseInt(e.target.value)); setTick(n => n + 1); }}
              style={{ width: "100%", accentColor: "#facc15" }} />
          </div>
        </div>

        {/* Right — Cloud Response */}
        <div style={{ padding: 20 }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, fontWeight: 600 }}>Cloud Response — Live</p>

          {/* Shadow JSON */}
          <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Shadow Reported</p>
            <pre style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(74,222,128,0.8)", lineHeight: 1.6, margin: 0 }}>
{`{
  "temp":  ${temp.toFixed(1)},
  "bat":   ${bat},
  "relay": ${relay},
  "hum":   52.9,
  "co2":   653
}`}
            </pre>
          </div>

          {/* MQTT log */}
          <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "10px 14px", maxHeight: 90, overflow: "hidden" }}>
            {log.map((line, i) => (
              <p key={i} style={{ fontSize: 10, fontFamily: "monospace", color: i === 0 ? "rgba(74,222,128,0.6)" : "rgba(255,255,255,0.18)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: i < log.length - 1 ? 3 : 0 }}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Footer — code snippet */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Arduino / ESP32 — 4-line Quick Connect</p>
          <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            style={{ fontSize: 11, padding: "4px 12px", borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>{code}</pre>
      </div>
    </div>
  );
}
