export interface PainPoint {
  problem: string;
  detail: string;
  solution: string;
  capability: string;
}

export interface Industry {
  slug: string;
  name: string;
  category: string;
  color: string;
  icon: string;
  heroHeadline: string;
  heroSub: string;
  problemTitle: string;
  problemSub: string;
  painPoints: PainPoint[];
  outcomes: { value: string; label: string; sub?: string }[];
  useCases: { title: string; desc: string }[];
  capabilities: string[];
  solution?: { name: string; href: string };
  caseStudy?: { client: string; headline: string; outcome: string; href: string };
}

export const industries: Industry[] = [
  {
    slug: "fleet-management",
    name: "Fleet Management",
    category: "Transportation & Logistics",
    color: "blue",
    icon: "◉",
    heroHeadline: "Every vehicle. Every moment. Full visibility.",
    heroSub:
      "Real-time GPS tracking, remote diagnostics, and OTA firmware — managed from one cloud dashboard. Built for school fleets, logistics operators, and hardware OEMs shipping fleet tracking products.",
    problemTitle: "The visibility gap that's costing you clients",
    problemSub:
      "Most fleet operators discover problems after they happen — a missed delivery, a vehicle offline, a firmware bug discovered in the field. EdgeConductor closes the gap between your hardware and your operations team.",
    painPoints: [
      {
        problem: "You don't know where your vehicles are right now",
        detail:
          "Your ops team calls drivers for status updates. Clients ask for ETAs you can't give. Manual check-ins miss exceptions entirely.",
        solution: "Live GPS every 5 seconds via cellular",
        capability:
          "Every vehicle sends GPS coordinates via GSM/4G every 5 seconds. Your dashboard shows real-time positions, last-seen timestamps, and signal strength. No check-in calls needed.",
      },
      {
        problem: "Firmware bugs require sending a technician to each vehicle",
        detail:
          "A single OTA rollout across 50 vehicles costs $500+ per truck roll, 2-3 weeks of scheduling, and takes vehicles off the road.",
        solution: "OTA firmware from the dashboard",
        capability:
          "Push firmware updates to 1 or 1,000 vehicles from the cloud dashboard. Offline vehicles queue the update and apply it automatically when they reconnect. No field visits.",
      },
      {
        problem: "A vehicle goes silent and you find out when the client calls",
        detail:
          "Reactive alerts mean problems are already escalated by the time you know about them. Your SLA is already breached.",
        solution: "Proactive offline alerts",
        capability:
          "Rules fire when a device goes offline for more than X minutes. Alert sent via webhook, Telegram, or email — before your client calls you.",
      },
      {
        problem: "Selling a fleet tracking product means building your own cloud",
        detail:
          "Building the cloud backend yourself takes 12–18 months and a dedicated engineering team — before you ship a single unit.",
        solution: "White-labeled fleet platform out of the box",
        capability:
          "EdgeConductor gives you the entire backend — device registry, live telemetry, OTA, multi-tenant client orgs, and a brandable dashboard — so you can focus on your hardware.",
      },
    ],
    outcomes: [
      { value: "5s", label: "GPS update interval", sub: "via cellular GSM/4G" },
      { value: "Zero", label: "Field visits for OTA", sub: "updates pushed remotely" },
      { value: "15 min", label: "Offline alert trigger", sub: "configurable threshold" },
      { value: "Multi-fleet", label: "Client isolation", sub: "org-level data walls" },
    ],
    useCases: [
      { title: "School bus fleet tracking", desc: "Parents and staff track bus location live. Driver logs and offline alerts managed from org dashboard." },
      { title: "Logistics & delivery fleet", desc: "Live GPS, geofence entry/exit alerts, and remote reboot — all from one ops portal." },
      { title: "Construction equipment monitoring", desc: "Track location and uptime of excavators, cranes, and heavy equipment across multiple sites." },
      { title: "Refrigerated truck compliance", desc: "Temperature + GPS in one device. Know if the reefer unit failed before the cargo is lost." },
      { title: "OEM fleet tracking product", desc: "Build and ship your own GPS tracker hardware. EdgeConductor handles the cloud. Your brand on the portal." },
      { title: "Municipal vehicle management", desc: "Track waste collection, ambulance, and utility fleets. Multi-org access for different departments." },
    ],
    capabilities: ["Live GPS Telemetry", "Cellular GSM / 4G Connectivity", "OTA Firmware Updates", "Geofence Rules Engine", "Multi-Tenant Fleet Orgs", "Offline & Alert Webhooks", "Device Diagnostics", "White-Label Portal"],
    solution: { name: "EC Tracker", href: "/solutions/tracker" },
    caseStudy: {
      client: "DPS School",
      headline: "40+ buses tracked live. Zero field visits for firmware updates.",
      outcome: "School fleet went from manual driver check-ins to real-time GPS visibility for every bus. Firmware updated remotely. Zero downtime in 3 months of production.",
      href: "/case-studies#dps-school",
    },
  },

  {
    slug: "smart-buildings",
    name: "Smart Buildings & HVAC",
    category: "Commercial Real Estate & Facilities",
    color: "cyan",
    icon: "◫",
    heroHeadline: "Automate climate. Cut energy. Give tenants control.",
    heroSub:
      "Multi-room HVAC automation with CO₂, temperature, and humidity sensing. Rules fire automatically, tenants self-onboard via QR, and building managers see every room from one dashboard.",
    problemTitle: "Buildings that waste energy and frustrate tenants",
    problemSub:
      "Most commercial buildings run HVAC on a fixed schedule, regardless of occupancy or air quality. Tenants have no visibility, managers have no control, and energy is wasted around the clock.",
    painPoints: [
      {
        problem: "HVAC runs the same schedule regardless of actual air quality",
        detail:
          "CO₂ builds up in meeting rooms during peak occupancy. HVAC runs at night when buildings are empty. Energy is wasted in both cases.",
        solution: "IF/THEN rules on live sensor data",
        capability:
          "Rules evaluate sensor data every 30 seconds. IF CO₂ > 1000 ppm → HVAC ON. AT 22:00 Mon–Fri → relay OFF. Rules fire automatically — no manual intervention needed.",
      },
      {
        problem: "Tenants call when they're uncomfortable because they have no visibility",
        detail:
          "Support tickets for temperature complaints take hours to resolve because facilities teams don't have per-room data either.",
        solution: "QR-code tenant access to live room data",
        capability:
          "Each floor or room gets a QR code. Tenants scan it and see live temperature, humidity, and CO₂ for their space. Facilities get fewer tickets. Tenants feel in control.",
      },
      {
        problem: "Managing 3 buildings means using 3 different systems",
        detail:
          "Facilities managers waste time context-switching between portals, exporting reports manually, and guessing which building has a problem.",
        solution: "All buildings, one dashboard",
        capability:
          "Every building, floor, and room lives under one org in EdgeConductor. See all sensor data, rules, and alerts from one view. Add a new building the same day it's deployed.",
      },
      {
        problem: "Night shutoff relies on someone remembering to flip a switch",
        detail:
          "Human error means HVAC runs through the night on Fridays, weekends, and holidays — burning energy nobody benefits from.",
        solution: "Scheduled relay rules — automated, never missed",
        capability:
          "Schedule rules run on a cron — every weekday at 22:00, every Monday at 07:00. EdgeConductor evaluates and fires the relay command. No manual step in the loop.",
      },
    ],
    outcomes: [
      { value: "30s", label: "Rule evaluation interval", sub: "threshold + schedule" },
      { value: "QR", label: "Tenant onboarding", sub: "zero friction self-service" },
      { value: "Multi-room", label: "Per-room sensor control", sub: "to room level" },
      { value: "Email + webhook", label: "Alert delivery", sub: "ops notification" },
    ],
    useCases: [
      { title: "Commercial office buildings", desc: "CO₂-triggered HVAC, per-floor tenant dashboards, energy shutoff schedules." },
      { title: "Hotels and hospitality", desc: "Per-room climate control based on check-in status. Energy savings during unoccupied periods." },
      { title: "Schools and universities", desc: "Classroom air quality monitoring. Auto-ventilation when CO₂ peaks during classes." },
      { title: "Coworking spaces", desc: "Zone-based HVAC automation. Tenants see air quality on a shared display or mobile QR." },
      { title: "Healthcare waiting rooms", desc: "Air quality regulation to reduce pathogen transmission. Automated alerts for facilities teams." },
      { title: "Data centers", desc: "Temperature and humidity monitoring with instant alerts if cooling fails." },
    ],
    capabilities: ["CO₂ / Temp / Humidity Telemetry", "HVAC Relay Control", "Threshold + Schedule Rules", "QR Tenant Access", "Multi-Building Org Hierarchy", "Energy Shutoff Automation", "Alert Webhooks & Email", "OTA Firmware"],
    solution: { name: "EC Climate", href: "/solutions/climate" },
    caseStudy: {
      client: "Germany Climate GmbH",
      headline: "3 buildings automated. HVAC interventions reduced to near-zero.",
      outcome: "CO₂-triggered HVAC automation across 3 office buildings. Night shutoff runs automatically. Tenants self-onboard via QR. Energy waste eliminated.",
      href: "/case-studies#germany-climate",
    },
  },

  {
    slug: "cold-chain-logistics",
    name: "Cold Chain & Logistics",
    category: "Pharmaceutical, Food & Beverage",
    color: "violet",
    icon: "◁",
    heroHeadline: "Every shipment. Every degree. Accounted for.",
    heroSub:
      "Real-time temperature and humidity monitoring from warehouse to last-mile delivery. Instant breach alerts, automated compliance reports, and end-to-end chain-of-custody visibility.",
    problemTitle: "Temperature excursions discovered too late",
    problemSub:
      "In cold chain, an undetected breach doesn't just spoil product — it triggers recalls, regulatory penalties, and client losses that take months to recover from. Most operators find out at delivery.",
    painPoints: [
      {
        problem: "Temperature excursions are discovered at delivery — not during transit",
        detail:
          "By the time a failed reefer unit is discovered at the dock, the product is already unsellable and the liability question begins.",
        solution: "Real-time breach alerts via rules engine",
        capability:
          "Threshold rules evaluate temperature every 30 seconds. IF temp > 8°C → immediate alert via webhook, SMS gateway, or email. Your team can intervene while the shipment is still in transit.",
      },
      {
        problem: "Manual logbooks are error-prone and fail compliance audits",
        detail:
          "Paper-based or spreadsheet temperature logs are incomplete, tampered-with, and hours behind. Auditors flag them immediately.",
        solution: "Automated, tamper-proof telemetry history",
        capability:
          "Every temperature reading is timestamped and stored in immutable telemetry history. Auto-generated PDF reports cover any date range. No manual data entry. Always audit-ready.",
      },
      {
        problem: "No visibility into what's happening in cold storage right now",
        detail:
          "Warehouse managers check temperature displays on-site or wait for manual checks every few hours. Problems compound between checks.",
        solution: "Live multi-zone dashboard",
        capability:
          "Every warehouse zone gets a sensor device. All zones appear on a live dashboard with current temp, humidity, and last-seen time. Red zones trigger alerts before stock is affected.",
      },
      {
        problem: "Each logistics partner needs their own data view — but you can't give them your main portal",
        detail:
          "Sharing your internal portal with clients exposes other clients' data. Building a separate portal per client costs months.",
        solution: "Multi-tenant org isolation per client",
        capability:
          "Each logistics partner or client gets their own org in EdgeConductor. They see only their shipments and sensors. You see everything from one admin view.",
      },
    ],
    outcomes: [
      { value: "Real-time", label: "Temperature monitoring", sub: "every 30 seconds" },
      { value: "< 30s", label: "Breach alert latency", sub: "from excursion to notification" },
      { value: "Auto", label: "Compliance report generation", sub: "PDF, any date range" },
      { value: "End-to-end", label: "Chain-of-custody visibility", sub: "warehouse to delivery" },
    ],
    useCases: [
      { title: "Pharmaceutical cold storage", desc: "Monitor drug storage rooms and fridges in real time. Instant alerts for any temperature excursion. Audit-ready telemetry logs." },
      { title: "Vaccine distribution", desc: "Track vaccine carriers in transit via cellular. Alert if cold chain breaks. Auto-generate compliance docs per shipment." },
      { title: "Food & beverage warehousing", desc: "Multi-zone temperature monitoring. Perishable stock protected by proactive alerts before damage occurs." },
      { title: "Refrigerated transport", desc: "Temperature + GPS in one device. Know if the reefer unit fails and exactly where the shipment was when it happened." },
      { title: "Chemical transport", desc: "Monitor hazardous goods that require controlled temperature and humidity conditions during transit." },
      { title: "Frozen food logistics", desc: "Multi-stop delivery monitoring. Detect door-open events and temperature spikes at each stop." },
    ],
    capabilities: ["Temperature & Humidity Telemetry", "Breach Threshold Alerts", "Immutable Telemetry History", "Auto PDF Compliance Reports", "Multi-Tenant Client Orgs", "Cellular / GSM Connectivity", "GPS + Temperature Combined", "Webhook & Email Alerts"],
  },

  {
    slug: "industrial-iot",
    name: "Industrial IoT",
    category: "Manufacturing & Industry",
    color: "orange",
    icon: "⬡",
    heroHeadline: "Connect your machines. Eliminate unplanned downtime.",
    heroSub:
      "Real-time machine monitoring, predictive threshold alerts, remote relay control, and OTA firmware — across every plant and every site. No more flying blind on the factory floor.",
    problemTitle: "Machines that fail without warning",
    problemSub:
      "Unplanned machine downtime costs manufacturing companies an average of $260,000 per hour. The data to predict and prevent those failures already exists in your machines — you just can't see it.",
    painPoints: [
      {
        problem: "Machines fail without warning, causing unplanned shutdowns",
        detail:
          "Maintenance runs on fixed schedules, not on actual machine condition. Failures happen between scheduled visits. Production stops. Revenue is lost.",
        solution: "Condition-based threshold alerts",
        capability:
          "Monitor vibration, current, pressure, temperature, or any analog signal. Rules evaluate every 30 seconds: IF current > 20A OR vibration > 5g → alert. Act before the machine fails.",
      },
      {
        problem: "Legacy machines have zero connectivity — you're flying blind",
        detail:
          "PLCs and older machines speak Modbus RTU or RS485. They have no cloud connectivity and no API. You can't monitor them without a physical site visit.",
        solution: "Linux gateway bridging legacy protocols",
        capability:
          "A Raspberry Pi or Linux gateway connects to Modbus RTU / RS485 machines and bridges their data to EdgeConductor via MQTT. Legacy machines get cloud connectivity without replacing hardware.",
      },
      {
        problem: "Configuration changes require sending engineers to the floor",
        detail:
          "Changing a PID setpoint, relay threshold, or operating mode means dispatching an engineer. During production. At significant cost.",
        solution: "Remote control via shadow desired state",
        capability:
          "Send configuration changes from the dashboard. EdgeConductor publishes the command to the device via MQTT. The device applies it on next connection — no site visit required.",
      },
      {
        problem: "You manage 5 plants with 5 different monitoring tools",
        detail:
          "Different tools per plant means no unified view, no cross-site comparison, and inconsistent alerting. Problems fall through the cracks between systems.",
        solution: "Multi-site, multi-org unified platform",
        capability:
          "All plants appear under one EdgeConductor account. Each plant can be a separate org for access control. One dashboard, all sites, one alert inbox.",
      },
    ],
    outcomes: [
      { value: "30s", label: "Alert evaluation interval", sub: "condition-based monitoring" },
      { value: "Modbus", label: "Legacy protocol support", sub: "via Linux gateway bridge" },
      { value: "Remote", label: "Machine config changes", sub: "via shadow desired state" },
      { value: "Multi-site", label: "Unified plant visibility", sub: "one dashboard, all sites" },
    ],
    useCases: [
      { title: "Pump and motor monitoring", desc: "Track current, vibration, and temperature. Alert when bearings are failing. Schedule maintenance before breakdown." },
      { title: "CNC machine condition monitoring", desc: "Monitor spindle load, temperature, and cycle times. Alert on abnormal conditions." },
      { title: "Water treatment plant automation", desc: "Monitor flow rate, pressure, and chemical dosing. Automate pump relay based on level sensors." },
      { title: "Compressor and HVAC plant", desc: "Monitor compressor discharge pressure and inlet temperature. Alert and shut down before safety limits breach." },
      { title: "Power monitoring", desc: "Track energy consumption across production lines. Alert on overcurrent conditions." },
      { title: "Multi-plant OEE dashboard", desc: "See uptime, alert history, and device health across all production plants from one view." },
    ],
    capabilities: ["Multi-Sensor Telemetry", "Condition-Based Threshold Alerts", "Modbus RTU via Linux Gateway", "Remote Relay & Config Control", "OTA Firmware Campaigns", "Multi-Plant Org Hierarchy", "Immutable Event Audit Logs", "Webhook & Integration API"],
    caseStudy: {
      client: "Multi-Network Industrial",
      headline: "WiFi + Ethernet + 4G failover. Zero data loss on network switch.",
      outcome: "Industrial asset monitor with automatic network failover. Continuous telemetry even during outages. Remote relay control via dashboard.",
      href: "/case-studies#multi-network",
    },
  },

  {
    slug: "healthcare-assets",
    name: "Healthcare Assets",
    category: "Healthcare & Life Sciences",
    color: "rose",
    icon: "◎",
    heroHeadline: "Track every asset. Meet every compliance requirement.",
    heroSub:
      "Real-time medical equipment tracking, medication refrigeration monitoring, and automated compliance documentation — with role-based access control for every team in your facility.",
    problemTitle: "Assets that disappear. Audits that fail. Breaches found too late.",
    problemSub:
      "Healthcare facilities spend 20% of nursing time looking for equipment. Medication refrigerators are checked manually on rounds. And compliance logs are assembled by hand the night before an audit.",
    painPoints: [
      {
        problem: "High-value equipment vanishes between departments",
        detail:
          "Infusion pumps, portable monitors, and wheelchairs get moved between departments and aren't returned. Utilization rates fall. Procurement buys more than necessary.",
        solution: "Real-time asset location tracking",
        capability:
          "Each asset gets a tracking device. Dashboard shows last-seen location, movement history, and how long it's been in each location. Find any asset in seconds.",
      },
      {
        problem: "Medication fridges are monitored manually on nursing rounds",
        detail:
          "A refrigerator door left ajar between rounds means hours of exposure before it's caught. Temperature-sensitive medications may be compromised with no record of the excursion.",
        solution: "Continuous temperature monitoring with breach alerts",
        capability:
          "Sensors inside medication refrigerators report temperature every 30 seconds. IF temp > 8°C → immediate alert to on-call staff. Full temperature log auto-generated for pharmacist review.",
      },
      {
        problem: "Compliance audits require pulling manual temperature and equipment logs",
        detail:
          "Nurses spend hours before inspections pulling records, cross-referencing paper logs, and filling gaps. Auditors find discrepancies.",
        solution: "Immutable telemetry history + auto-generated audit reports",
        capability:
          "Every sensor reading and device event is stored with a tamper-proof timestamp. Generate a compliance report for any device, any date range, in seconds. Always audit-ready.",
      },
      {
        problem: "Staff at different levels see more data than their role requires",
        detail:
          "Nurses seeing medication stock levels, contractors seeing patient-adjacent equipment history — privacy risks pile up without granular access control.",
        solution: "Role-based access control per org",
        capability:
          "Assign roles with specific data permissions per org. Nurses see their ward. Department heads see their department. Admins see all. Contractors see nothing without explicit grant.",
      },
    ],
    outcomes: [
      { value: "Real-time", label: "Asset location visibility", sub: "every device tracked" },
      { value: "30s", label: "Fridge temperature check", sub: "continuous monitoring" },
      { value: "Instant", label: "Breach alert to staff", sub: "before rounds catch it" },
      { value: "RBAC", label: "Role-based data access", sub: "per ward, per role" },
    ],
    useCases: [
      { title: "Medical equipment tracking", desc: "Track infusion pumps, portable monitors, and wheelchairs across departments. Know exactly where every asset is." },
      { title: "Medication refrigeration", desc: "Continuous temperature monitoring in pharmacy fridges. Instant alert if door is left open or cooling fails." },
      { title: "Operating room environment", desc: "Monitor OR temperature, humidity, and air pressure differential. Maintain sterile field requirements automatically." },
      { title: "Specimen storage", desc: "Track temperature in biobanks and specimen storage. Generate chain-of-custody logs for lab compliance." },
      { title: "Hospital asset management", desc: "Fleet view of all medical equipment across a hospital. Utilization rates, location history, and maintenance logs." },
      { title: "Clinic multi-site operations", desc: "Manage assets and environment monitoring across multiple clinic locations from one admin view." },
    ],
    capabilities: ["Asset Location Tracking", "Temperature & Environment Monitoring", "Medication Fridge Alerts", "Immutable Compliance Logs", "Auto Audit Report Generation", "RBAC per Role & Ward", "Multi-Department Org Hierarchy", "Webhook & Email Alerts"],
  },

  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    category: "Energy, Power & Infrastructure",
    color: "yellow",
    icon: "◈",
    heroHeadline: "Monitor every asset. Prevent every outage.",
    heroSub:
      "Real-time monitoring of remote grid assets, solar installations, pump stations, and substations — via cellular connectivity where WiFi doesn't exist. OTA firmware without truck rolls.",
    problemTitle: "Remote assets you can't see until something breaks",
    problemSub:
      "Energy and utility assets are often in remote locations with no on-site staff. Failures go undetected until a customer reports an outage, a substation trips, or a pump station floods.",
    painPoints: [
      {
        problem: "Remote substations and solar sites have no real-time monitoring",
        detail:
          "SCADA systems cover major sites. Everything else is visited on schedule. Failures between visits go undetected — sometimes for days.",
        solution: "Cellular-connected monitoring for any remote asset",
        capability:
          "Deploy monitoring devices with 4G/GSM connectivity at any remote site. Live telemetry back to your dashboard regardless of WiFi infrastructure. Assets in the middle of nowhere, visible from your desk.",
      },
      {
        problem: "Equipment degradation isn't visible until it fails",
        detail:
          "Transformer overheating, pump bearing wear, inverter voltage sag — all produce measurable signals before failure. Without continuous monitoring, that data is invisible.",
        solution: "Predictive threshold rules on continuous telemetry",
        capability:
          "Monitor current draw, voltage, temperature, vibration, or pressure continuously. Threshold rules fire alerts before equipment reaches failure — giving maintenance teams time to intervene.",
      },
      {
        problem: "Firmware updates to remote equipment require expensive truck rolls",
        detail:
          "A site visit to a remote substation or solar farm costs $500–$2000 in labor and travel. Multiply that by 50 sites and a firmware update becomes a $100K project.",
        solution: "OTA firmware over cellular — no site visit required",
        capability:
          "Push firmware updates to all devices in a campaign. Devices download and apply the update over their existing cellular connection. Offline devices queue it and apply on reconnect.",
      },
      {
        problem: "Multiple generation and distribution sites use different systems",
        detail:
          "Different SCADA vendors, different protocols, different dashboards per site. No cross-site view. Problems at one site aren't correlated with conditions at another.",
        solution: "Unified multi-site dashboard with full org hierarchy",
        capability:
          "Every site appears in one EdgeConductor view. Alerts from any site land in one inbox. Cross-site analytics visible from a single dashboard. Add new sites without adding new tools.",
      },
    ],
    outcomes: [
      { value: "Cellular", label: "Connectivity for remote assets", sub: "4G / GSM where WiFi fails" },
      { value: "30s", label: "Telemetry evaluation interval", sub: "continuous condition monitoring" },
      { value: "Zero", label: "Truck rolls for firmware updates", sub: "OTA over existing connection" },
      { value: "Multi-site", label: "Unified operational view", sub: "one dashboard, all assets" },
    ],
    useCases: [
      { title: "Solar farm monitoring", desc: "Inverter output, panel temperature, and energy yield monitored in real time. Alert on underperforming strings." },
      { title: "Remote substation monitoring", desc: "Transformer temperature, voltage, and current monitored continuously via cellular. Alert before protection trips." },
      { title: "Pump station automation", desc: "Monitor pump current draw and water level. Rules automate pump on/off. Alert on dry-run conditions." },
      { title: "Wind turbine diagnostics", desc: "Vibration, bearing temperature, and output monitoring. Early fault detection before catastrophic failure." },
      { title: "Grid edge device management", desc: "Manage firmware and configuration across hundreds of remote RTUs and edge devices from one platform." },
      { title: "Energy meter aggregation", desc: "Collect meter readings from multiple sites. Aggregate and report energy consumption by org, site, or meter." },
    ],
    capabilities: ["Cellular / 4G Remote Connectivity", "Power & Environment Telemetry", "Predictive Threshold Alerts", "OTA Firmware Campaigns", "Remote Relay & Config Control", "Multi-Site Org Hierarchy", "Scheduled Rules Automation", "Integration API + Webhooks"],
  },
];

export const colorMap: Record<string, {
  tag: string;
  border: string;
  bg: string;
  outcome: string;
  hero: string;
  pain: string;
}> = {
  blue:   { tag: "text-blue-400 bg-blue-500/10 border-blue-500/25",     border: "border-blue-500/25",   bg: "bg-blue-500/5",    outcome: "bg-blue-500/5 border-blue-500/15",    hero: "from-blue-500/10 to-transparent",   pain: "border-blue-500/15 bg-blue-500/5"   },
  cyan:   { tag: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",     border: "border-cyan-500/25",   bg: "bg-cyan-500/5",    outcome: "bg-cyan-500/5 border-cyan-500/15",    hero: "from-cyan-500/10 to-transparent",   pain: "border-cyan-500/15 bg-cyan-500/5"   },
  violet: { tag: "text-violet-400 bg-violet-500/10 border-violet-500/25", border: "border-violet-500/25", bg: "bg-violet-500/5", outcome: "bg-violet-500/5 border-violet-500/15", hero: "from-violet-500/10 to-transparent", pain: "border-violet-500/15 bg-violet-500/5" },
  orange: { tag: "text-orange-400 bg-orange-500/10 border-orange-500/25", border: "border-orange-500/25", bg: "bg-orange-500/5", outcome: "bg-orange-500/5 border-orange-500/15", hero: "from-orange-500/10 to-transparent", pain: "border-orange-500/15 bg-orange-500/5" },
  rose:   { tag: "text-rose-400 bg-rose-500/10 border-rose-500/25",     border: "border-rose-500/25",   bg: "bg-rose-500/5",    outcome: "bg-rose-500/5 border-rose-500/15",    hero: "from-rose-500/10 to-transparent",   pain: "border-rose-500/15 bg-rose-500/5"   },
  yellow: { tag: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25", border: "border-yellow-500/25", bg: "bg-yellow-500/5", outcome: "bg-yellow-500/5 border-yellow-500/15", hero: "from-yellow-500/10 to-transparent", pain: "border-yellow-500/15 bg-yellow-500/5" },
  green:  { tag: "text-green-400 bg-green-500/10 border-green-500/25",  border: "border-green-500/25",  bg: "bg-green-500/5",   outcome: "bg-green-500/5 border-green-500/15",  hero: "from-green-500/10 to-transparent",  pain: "border-green-500/15 bg-green-500/5"  },
};
