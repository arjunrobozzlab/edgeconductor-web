import Link from 'next/link'

const links = {
  Platform: [
    { label: 'Device Registry', href: '/platform#registry' },
    { label: 'Telemetry', href: '/platform#telemetry' },
    { label: 'OTA Updates', href: '/platform#ota' },
    { label: 'Rules Engine', href: '/platform#rules' },
    { label: 'Multi-Tenant', href: '/platform#multitenant' },
  ],
  Solutions: [
    { label: 'EC Tracker', href: '/solutions/tracker' },
    { label: 'EC Climate', href: '/solutions/climate' },
    { label: 'EC Home', href: '/solutions/home' },
  ],
  Developers: [
    { label: 'Documentation', href: '/developers' },
    { label: 'REST API', href: '/developers#api' },
    { label: 'MQTT API', href: '/developers#mqtt' },
    { label: 'ESP32 SDK', href: '/developers#sdk' },
    { label: 'Quickstart', href: '/developers#quickstart' },
  ],
  Company: [
    { label: 'About', href: '/company' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
    { label: 'Legacy Site', href: '/legacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-black text-white">
                EC
              </div>
              <span className="font-bold text-white">EdgeConductor</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              The complete IoT stack for hardware teams. Device firmware to B2B cloud — all in one platform.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://github.com/EdgeConductor" target="_blank" rel="noopener noreferrer"
                className="text-white/30 hover:text-white/60 transition text-xs">GitHub</a>
              <span className="text-white/10">·</span>
              <a href="mailto:edgeconductor@gmail.com"
                className="text-white/30 hover:text-white/60 transition text-xs">Email</a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">{section}</p>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-xs text-white/50 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} EdgeConductor. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/25 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
