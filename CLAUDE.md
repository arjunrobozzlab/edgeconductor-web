# EdgeConductor Web — Master Context

## What is Edge Conductor
Edge Conductor is Arjun's embedded AI & robotics engineering business (13+ years experience).
Goal: attract paying clients through the website and showcase live products.
Domain: edgeconductor.com — deployed on Vercel, auto-deploys on push to main.

## Business Owner
- Name: Arjun
- Email: arjun.robozz@gmail.com (personal) / edgeconductor@gmail.com (business)
- Separate company: SmartAxiom / QubISense (Arjun's employer — NEVER mention on this site)

## Tech Stack (this website)
- Next.js 15 (App Router), React 19, Tailwind CSS 4
- No UI component library — all custom
- @anthropic-ai/sdk — for Project Scoper streaming agent
- Nodemailer + Gmail SMTP — inquiry emails to business owner only
- Supabase — company data (services, projects via API)
- Vercel deployment

## Site Structure
```
app/
  page.tsx              — Homepage (main landing)
  layout.tsx            — Root layout + base SEO metadata
  sitemap.ts            — Auto sitemap.xml
  robots.ts             — robots.txt
  case-studies/
    page.tsx            — Case studies page (4 client projects + EdgeScribe)
  onboard/              — Agentic Profile onboarding flow
  api/
    scope/route.ts      — Project Scoper streaming Anthropic endpoint
    inquire/route.ts    — Contact form → owner email
    onboard/route.ts    — Agentic profile onboarding
  components/
    ProjectScoper.tsx   — Multi-turn AI chat (scopes client projects)
    AgentsSection.tsx   — Agents tab UI (Inquiry form + Project Scoper)
```

## Live Products on Site
| Product | URL | Status |
|---|---|---|
| EdgeScribe | https://edgescribe.onrender.com/login | Live |
| Frontier AI | https://frontier-ai-ten.vercel.app | Live |
| EdgeOnboard | — | In Development |

## Naming Rules — IMPORTANT
- NEVER use "Qubi" or "QubiScribe" — that is the employer's brand
- AI conversation platform on this site = **EdgeScribe**
- IoT device onboarding product = **EdgeOnboard**
- AI chat platform built by Arjun = **Frontier AI**

## AI Agents on Site
- **Project Scoper** (live): multi-turn chat → generates technical scope → captures lead email
  - Model: claude-sonnet-4-6, max_tokens: 900
  - Greeting is hard-coded in component state, NOT sent to API (messages.slice(1))
  - Scope delimiters: `---SCOPE---` / `---END SCOPE---`
  - On lead capture: POSTs to /api/inquire → email to edgeconductor@gmail.com only
- **Inquiry Agent** (live): simple form → email to owner
- **Tech Stack Matcher** (planned): not built yet

## Environment Variables (.env.local)
```
ANTHROPIC_API_KEY=...       # Project Scoper
GMAIL_USER=arjun.robozz@gmail.com
GMAIL_APP_PASSWORD=...      # Gmail SMTP (not yet configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
VERCEL_TOKEN=...
```
Note: .env.local is in .gitignore — keys are safe.

## SEO Keywords We Target
embedded AI, edge AI development, IoT firmware, OTA firmware updates,
ESP32 development, STM32 firmware, industrial IoT India, ROS2 robotics,
computer vision edge AI, FreeRTOS, MQTT IoT, custom PCB design India,
hospital AI robotics, autonomous robots, BLE IoT, LoRa IoT, 4G GSM IoT

## Case Studies (app/case-studies/page.tsx)
1. **EdgeScribe** — AI conversation coaching platform (live demo)
2. **Hospital Edge AI Robot** — YOLOv8 + ROS2 + SLAM + custom 135MB LLM, <3 sec detection (HERO card)
3. **Weighbridge RFID** — 6-point alignment, dual RS485, fail-safe
4. **Water Level GSM** — ATmega323 + SIM A7670C + MQTT, 700+ lines legacy code fixed
5. **Multi-Network Failover** — WiFi + Ethernet + 4G auto-switching

## Projects In Development (EdgeOnboard)
- QR code on device → user scans → adds to Firebase
- ESP32 AP mode → user enters WiFi → reboots to normal mode
- Web + Android + iOS control app
- Python script: USB → read MAC → generate QR → push Firebase
- Supports: ESP32, Arduino, nRF52840, STM32, ARM

## Design System
- Background: `bg-[#0a0a0a]`
- Cards: `bg-white/5 border border-white/10 rounded-2xl`
- Category labels: `text-xs font-semibold uppercase tracking-wider`
- Tech chips: `text-xs bg-white/10 text-white/50 px-2 py-1 rounded-full`
- Live badge: green dot + "Live" text, `animate-pulse`
- Primary CTA: `bg-white text-black rounded-full`
- Blue accent: `text-blue-400`, `border-blue-500/20`
- No emojis in code unless explicitly asked

## Agentic API (external, api.edgeconductor.com)
- GET /api/info, /api/services, /api/projects
- POST /api/inquire
- MCP server at /api/mcp
- llms.txt at /llms.txt

## Git Workflow
- main branch → auto-deploys to Vercel
- Always: git add <specific files> → git commit → git push
- Never commit .env.local
