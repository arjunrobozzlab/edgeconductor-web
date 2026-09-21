'use client'
import { useState } from 'react'
import Link from 'next/link'

const plans = [
  { name: 'Starter',    maxDevices: 5,   inr: 0,     usd: 0,   href: 'https://app.edgeconductor.com/register' },
  { name: 'Pro',        maxDevices: 50,  inr: 4999,  usd: 59,  href: 'https://app.edgeconductor.com/register' },
  { name: 'Business',   maxDevices: 250, inr: 14999, usd: 179, href: '/contact' },
  { name: 'Enterprise', maxDevices: Infinity, inr: null, usd: null, href: '/contact' },
]

function recommendedPlan(count: number) {
  if (count <= 5)   return 0
  if (count <= 50)  return 1
  if (count <= 250) return 2
  return 3
}

function fmt(val: number, currency: 'inr' | 'usd') {
  if (currency === 'inr') return `₹${val.toLocaleString('en-IN')}`
  return `$${val}`
}

export default function PricingCalculator() {
  const [count,    setCount]    = useState(10)
  const [currency, setCurrency] = useState<'inr' | 'usd'>('inr')
  const idx  = recommendedPlan(count)
  const plan = plans[idx]

  const price     = plan[currency]
  const perDevice = price != null && price > 0 && count > 0
    ? Math.round(price / count)
    : null

  const sliderMax = 300

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 mt-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Pricing Calculator</p>
          <h3 className="text-xl font-bold">How many devices do you need?</h3>
        </div>
        <div className="flex items-center gap-3">
          {/* currency mini toggle */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-0.5 text-xs">
            <button onClick={() => setCurrency('inr')} className={`px-3 py-1 rounded-full transition ${currency === 'inr' ? 'bg-white text-black font-semibold' : 'text-white/40'}`}>₹</button>
            <button onClick={() => setCurrency('usd')} className={`px-3 py-1 rounded-full transition ${currency === 'usd' ? 'bg-white text-black font-semibold' : 'text-white/40'}`}>$</button>
          </div>
          <span className="text-3xl font-bold font-mono text-white">{count > sliderMax ? '300+' : count}</span>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <input
          type="range" min={1} max={sliderMax}
          value={Math.min(count, sliderMax)}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full accent-blue-500 h-1.5 rounded-full cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-white/25 mt-1.5">
          <span>1</span><span>50</span><span>150</span><span>300+</span>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {plans.map((p, i) => {
          const active = i === idx
          const pPrice = p[currency]
          return (
            <div key={p.name} className={`rounded-xl border p-4 transition ${
              active ? 'border-blue-500/40 bg-blue-500/10' : 'border-white/8 bg-white/[0.02] opacity-40'
            }`}>
              {active && (
                <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider border border-blue-500/25 bg-blue-500/10 px-2 py-0.5 rounded-full block text-center mb-2">
                  Recommended
                </span>
              )}
              <p className="text-sm font-bold text-center mb-1">{p.name}</p>
              <p className={`text-center font-mono font-bold ${active ? 'text-white text-lg' : 'text-white/50 text-base'}`}>
                {pPrice === null ? 'Custom' : pPrice === 0 ? 'Free' : fmt(pPrice, currency)}
              </p>
              {pPrice != null && pPrice > 0 && <p className="text-[10px] text-white/30 text-center">/month</p>}
              <p className="text-[10px] text-white/30 text-center mt-1">
                {p.maxDevices === Infinity ? 'Unlimited devices' : `Up to ${p.maxDevices} devices`}
              </p>
            </div>
          )
        })}
      </div>

      {/* Result */}
      <div className="border-t border-white/8 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/45 text-sm">
            {count} device{count !== 1 ? 's' : ''} →{' '}
            <span className="text-white font-semibold">{plan.name} plan</span>
            {price != null && price > 0
              ? <>, <span className="text-blue-400">{fmt(price, currency)}/month</span></>
              : price === 0 ? <>, <span className="text-green-400">Free</span></> : <>, pricing on request</>
            }
          </p>
          {perDevice != null && (
            <p className="text-white/28 text-xs mt-1">
              ≈ {fmt(perDevice, currency)} per device/month
            </p>
          )}
          {price === null && (
            <p className="text-white/28 text-xs mt-1">Custom pricing for large deployments — talk to us</p>
          )}
        </div>
        <Link href={plan.href}
          className={`shrink-0 text-sm font-medium px-5 py-2.5 rounded-xl transition ${
            idx === 1
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'border border-white/20 text-white/65 hover:text-white hover:border-white/40'
          }`}>
          {price === 0 ? 'Start free →' : price === null ? 'Talk to Sales →' : `Get ${plan.name} →`}
        </Link>
      </div>
    </div>
  )
}
