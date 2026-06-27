'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PasswordGate() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/legacy-auth', {
      method: 'POST',
      body: JSON.stringify({ password: pw }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      router.refresh()
    } else {
      setError('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm">
        <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-full font-semibold">
          Archived
        </span>
        <h1 className="text-xl font-bold mt-4 mb-1">Legacy Archive</h1>
        <p className="text-white/40 text-sm mb-6">
          Archived pages from the previous Edge Conductor website. Admin access only.
        </p>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-white/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking...' : 'Access Archive'}
          </button>
        </form>
        <p className="text-white/20 text-xs mt-4 text-center">
          <a href="/" className="hover:text-white/40 transition">← Back to EdgeConductor</a>
        </p>
      </div>
    </main>
  )
}
