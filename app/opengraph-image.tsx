import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EdgeConductor — Connected Asset & IoT Operations Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#0a0a0a",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "sans-serif",
            }}
          >
            EC
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "sans-serif",
              letterSpacing: -0.5,
            }}
          >
            EdgeConductor
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "sans-serif",
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 800,
            marginBottom: 28,
          }}
        >
          Connected Asset &{" "}
          <span style={{ color: "#3b82f6" }}>IoT Operations</span>{" "}
          Platform
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            fontFamily: "sans-serif",
            maxWidth: 720,
            lineHeight: 1.5,
            marginBottom: 56,
          }}
        >
          Device registry, live telemetry, OTA firmware, rules engine, and white-label B2B portals — one platform for hardware companies.
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["MQTT TLS", "OTA Updates", "Fleet Ops", "White-Label"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: 100,
                border: "1px solid rgba(59,130,246,0.3)",
                background: "rgba(59,130,246,0.08)",
                color: "#93c5fd",
                fontSize: 16,
                fontFamily: "sans-serif",
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 18,
            color: "#475569",
            fontFamily: "sans-serif",
          }}
        >
          edgeconductor.com
        </div>
      </div>
    ),
    { ...size }
  );
}
