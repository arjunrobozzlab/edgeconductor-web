"use client";
import { useState } from "react";
import PoCModal from "./PoCModal";

export default function PoCTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 border border-cyan-500/30 bg-cyan-500/8 text-cyan-400 hover:bg-cyan-500/15 hover:border-cyan-500/50 text-sm font-medium px-6 py-3.5 rounded-full transition"
      >
        Check Hardware Fit →
      </button>
      <PoCModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
