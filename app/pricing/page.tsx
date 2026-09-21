import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingCards from "./PricingCards";
import PricingCalculator from "./PricingCalculator";

export const metadata: Metadata = {
  title: "Pricing – EdgeConductor",
  description: "Simple, transparent pricing for IoT teams of all sizes. Free tier to Enterprise. Plans in INR and USD.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <section className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">Pricing</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Simple, transparent pricing</h1>
          <p className="text-white/45 text-base max-w-lg mx-auto">
            Start free, scale as you grow. No surprise fees.
          </p>
        </div>

        <PricingCards />
        <PricingCalculator />

        <p className="text-center text-white/30 text-xs mt-10">
          Per-device pricing for large deployments — <Link href="/contact" className="underline hover:text-white/50">contact us</Link>.
        </p>
        <p className="text-center text-white/25 text-xs mt-3">
          Already have an account?{" "}
          <a href="https://app.edgeconductor.com/login" className="underline hover:text-white/50">Sign in</a>
        </p>
      </section>
      <Footer />
    </main>
  );
}
