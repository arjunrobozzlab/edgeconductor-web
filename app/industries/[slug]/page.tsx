import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { industries, colorMap } from "../data";

export function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ind = industries.find((i) => i.slug === params.slug);
  if (!ind) return {};
  return {
    title: `${ind.name} — EdgeConductor Connected Asset Platform`,
    description: ind.heroSub,
    alternates: { canonical: `https://edgeconductor.com/industries/${ind.slug}` },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = industries.find((i) => i.slug === params.slug);
  if (!ind) notFound();

  const c = colorMap[ind.color];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className={`relative overflow-hidden px-4 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${c.hero} pointer-events-none`} />
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/25 mb-6">
            <Link href="/industries" className="hover:text-white/50 transition">Industries</Link>
            <span>/</span>
            <span className="text-white/40">{ind.name}</span>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs font-bold uppercase tracking-widest border px-3 py-1.5 rounded-full ${c.tag}`}>
                {ind.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              {ind.heroHeadline}
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {ind.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact"
                className="inline-flex items-center justify-center bg-white text-black text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-white/90 transition">
                Book a Demo →
              </Link>
              <Link href="/demo"
                className="inline-flex items-center justify-center border border-white/20 text-white/65 hover:text-white hover:border-white/40 text-sm px-6 py-3.5 rounded-full transition">
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUTCOME METRICS ── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {ind.outcomes.map((o) => (
            <div key={o.label} className={`border rounded-2xl px-5 py-5 ${c.outcome}`}>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{o.value}</p>
              <p className="text-xs font-semibold text-white/65 mb-0.5">{o.label}</p>
              {o.sub && <p className="text-[10px] text-white/30">{o.sub}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ── */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/28 uppercase">The Problem</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{ind.problemTitle}</h2>
          <p className="text-white/45 text-base leading-relaxed">{ind.problemSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ind.painPoints.map((pp, i) => (
            <div key={i} className="border border-white/8 bg-white/[0.02] rounded-2xl p-6 hover:border-white/15 transition">
              {/* Problem */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-red-500/50 text-lg mt-0.5 shrink-0">✕</span>
                <div>
                  <p className="font-semibold text-white/75 leading-snug mb-1">{pp.problem}</p>
                  <p className="text-sm text-white/35 leading-relaxed">{pp.detail}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/6 my-4" />

              {/* Solution */}
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg mt-0.5 shrink-0">✓</span>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${c.tag.split(" ")[0]}`}>
                    {pp.solution}
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed">{pp.capability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      {ind.caseStudy && (
        <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-white/25 uppercase">Case Study</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-3">{ind.caseStudy.headline}</h2>
              <p className="text-white/45 text-sm leading-relaxed mb-5">{ind.caseStudy.outcome}</p>
              <Link href={ind.caseStudy.href}
                className={`inline-flex items-center gap-2 border text-sm font-medium px-5 py-2.5 rounded-xl transition ${c.tag} hover:opacity-80`}>
                Read Full Case Study →
              </Link>
            </div>
            <div className={`border rounded-2xl p-6 ${c.border} ${c.bg}`}>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Client</p>
              <p className="text-xl font-bold text-white mb-4">{ind.caseStudy.client}</p>
              <div className="space-y-2">
                {ind.outcomes.map((o) => (
                  <div key={o.label} className="flex items-center justify-between border border-white/6 rounded-xl px-4 py-2.5 bg-white/3">
                    <span className="text-xs text-white/40">{o.label}</span>
                    <span className="text-sm font-bold text-white">{o.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── USE CASES ── */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-white/28 uppercase">Use Cases</span>
          <h2 className="text-3xl font-bold mt-3 mb-3">What teams build with EdgeConductor in {ind.name}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ind.useCases.map((uc) => (
            <div key={uc.title} className="border border-white/8 bg-white/[0.02] rounded-2xl p-5 hover:border-white/18 transition">
              <div className={`w-1 h-6 rounded-full mb-3 ${c.tag.split(" ")[0].replace("text-", "bg-")}`} />
              <h3 className="font-semibold text-white/80 mb-2 text-sm">{uc.title}</h3>
              <p className="text-xs text-white/38 leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLATFORM CAPABILITIES ── */}
      <section className="border-y border-white/8 bg-white/[0.015] px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest text-white/28 uppercase">Platform Capabilities</span>
            <h2 className="text-2xl font-bold mt-3">Everything you need for {ind.name}</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {ind.capabilities.map((cap) => (
              <span key={cap}
                className={`text-sm border px-4 py-2 rounded-full ${c.tag}`}>
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SOLUTION ── */}
      {ind.solution && (
        <section className="px-4 md:px-8 py-16 max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest text-white/25 uppercase">Pre-Built Solution</span>
          <h2 className="text-2xl font-bold mt-3 mb-3">
            Deploy {ind.solution.name} — ready to ship
          </h2>
          <p className="text-white/40 text-sm mb-6">
            A complete, production-validated solution for {ind.name.toLowerCase()} built on EdgeConductor.
            Hardware reference design included. Deploy as-is or customize for your product.
          </p>
          <Link href={ind.solution.href}
            className={`inline-flex items-center justify-center border text-sm font-semibold px-7 py-3.5 rounded-full transition ${c.tag} hover:opacity-80`}>
            See {ind.solution.name} →
          </Link>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="border-t border-white/8 px-4 md:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to deploy for {ind.name.toLowerCase()}?
          </h2>
          <p className="text-white/40 text-sm mb-8 max-w-xl mx-auto">
            Tell us about your deployment — fleet size, hardware, connectivity requirements.
            We&apos;ll scope a solution and show you exactly how EdgeConductor fits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact"
              className="inline-flex items-center justify-center bg-white text-black text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition">
              Book a Demo →
            </Link>
            <Link href="/case-studies"
              className="inline-flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm px-8 py-3.5 rounded-full transition">
              See Case Studies →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
