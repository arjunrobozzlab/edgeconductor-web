'use client'
import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Hardware', href: '/hardware' },
  { label: 'Security', href: '/security' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Developers', href: '/developers' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-black text-white">
            EC
          </div>
          <span className="font-bold tracking-tight text-white">EdgeConductor</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-sm text-white/55">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/demo"
            className="text-sm border border-white/20 text-white/65 px-4 py-2 rounded-full hover:text-white hover:border-white/40 transition">
            Try Demo
          </Link>
          <Link href="/contact"
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium transition">
            Book a Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open
            ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0a] px-4 py-4">
          <div className="space-y-1 mb-4">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="block text-white/60 hover:text-white py-2.5 text-sm transition-colors"
                onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link href="/demo"
              className="text-sm border border-white/20 text-white/65 px-4 py-2.5 rounded-full text-center hover:text-white transition"
              onClick={() => setOpen(false)}>
              Try Demo
            </Link>
            <Link href="/contact"
              className="text-sm bg-blue-500 text-white px-4 py-2.5 rounded-full font-medium text-center hover:bg-blue-600 transition"
              onClick={() => setOpen(false)}>
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
