"use client";
import { useState } from "react";

const INSTALL: Record<string, string> = {
  js:     "npm install @edgeconductor/sdk",
  python: "pip install edgeconductor",
  curl:   "# No install needed — just HTTP",
};

const CODE: Record<string, string> = {
  js: `const { EdgeConductor } = require('@edgeconductor/sdk');

const ec = new EdgeConductor({ apiKey: 'ec_live_xxxx' });

// 1. Register device (first time only)
await ec.devices.register({
  serial_no: 'MY-DEVICE-001',
  product_type: 'EC-CLIMATE-V1',
});

// 2. Push telemetry
await ec.telemetry.push('MY-DEVICE-001', {
  temp: 24.5, hum: 60, co2: 850, bat: 4.1,
});

// 3. Read live shadow
const shadow = await ec.devices.getShadow('MY-DEVICE-001');
// → { temp: 24.5, hum: 60, co2: 850, bat: 4.1 }

// 4. Create threshold alert rule
await ec.rules.threshold(orgId, {
  name: 'CO2 High Alert',
  field: 'co2', op: '>', value: 1000,
  action: { key: 'relay', value: true },
});`,

  python: `from edgeconductor import Client

ec = Client(api_key="ec_live_xxxx")

# 1. Register device (first time only)
ec.devices.register(
    serial_no="MY-DEVICE-001",
    product_type="EC-CLIMATE-V1",
)

# 2. Push telemetry
ec.telemetry.push(
    "MY-DEVICE-001",
    temp=24.5, hum=60, co2=850, bat=4.1,
)

# 3. Read live shadow
shadow = ec.devices.get_shadow("MY-DEVICE-001")
# { 'temp': 24.5, 'hum': 60, 'co2': 850, 'bat': 4.1 }

# 4. Create threshold alert rule
ec.rules.threshold(
    org_id,
    name="CO2 High Alert",
    field="co2", op=">", value=1000,
    action={"key": "relay", "value": True},
)`,

  curl: `BASE="https://ec-registry.onrender.com"
KEY="ec_live_xxxx"

# 1. Register device
curl -X POST $BASE/devices/register \\
  -H "Content-Type: application/json" \\
  -d '{"serial_no":"MY-DEVICE-001","product_type":"EC-CLIMATE-V1"}'

# 2. Push telemetry
curl -X POST $BASE/devices/MY-DEVICE-001/telemetry \\
  -H "Authorization: Bearer $KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"temp":24.5,"hum":60,"co2":850,"bat":4.1}'

# 3. Get device + shadow
curl $BASE/devices/MY-DEVICE-001 \\
  -H "Authorization: Bearer $KEY"`,
};

const TABS = [
  { id: "js",     label: "JavaScript", badge: "Node.js",      color: "#facc15" },
  { id: "python", label: "Python",     badge: "zero deps",    color: "#60a5fa" },
  { id: "curl",   label: "cURL",       badge: "REST API",     color: "#4ade80" },
];

export default function LangSwitcher() {
  const [lang, setLang] = useState("js");
  const [copied, setCopied] = useState(false);

  const active = TABS.find(t => t.id === lang)!;

  function handleCopy() {
    navigator.clipboard.writeText(CODE[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)" }}>

      {/* Tab row */}
      <div className="flex items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setLang(tab.id)}
            className="px-5 py-3 text-sm font-medium transition-colors"
            style={{
              color: lang === tab.id ? tab.color : "rgba(255,255,255,0.3)",
              background: lang === tab.id ? "rgba(255,255,255,0.04)" : "transparent",
              borderBottom: lang === tab.id ? `2px solid ${tab.color}` : "2px solid transparent",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-xs font-mono px-4 opacity-40" style={{ color: active.color }}>
          {active.badge}
        </span>
      </div>

      {/* Install */}
      <div className="px-5 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.4)" }}>
        <pre className="text-xs font-mono text-green-300 m-0">{INSTALL[lang]}</pre>
      </div>

      {/* Code */}
      <div className="relative">
        <pre className="px-5 py-5 text-xs font-mono leading-relaxed overflow-x-auto m-0" style={{ color: "rgba(255,255,255,0.55)" }}>
          {CODE[lang]}
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-lg transition-colors"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.45)",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
