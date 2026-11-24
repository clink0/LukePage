'use client';

import SmithSphereBackground, { REVEAL_SCROLL_VH } from "@/components/SmithSphereBackground";
import TacticalNav from "@/components/TacticalNav";

export default function Home() {
  return (
    // Every layer is fixed; the page height only exists so scrolling can drive
    // the zoom-out reveal (see --reveal, set by SmithSphereBackground).
    <main
      className="relative w-full bg-black selection:bg-green-500/30"
      style={{ height: `${(1 + REVEAL_SCROLL_VH) * 100}vh` }}
    >

      {/* 1. The Background Layer (3D Smith chart; type "life" for the easter egg) */}
      <SmithSphereBackground />

      {/* 2. The New Header Layer */}
      <TacticalNav />

      {/* 3. The Hero Content: fades, grows and blurs away as you scroll */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-40"
        style={{
          opacity: "clamp(0, calc(1 - var(--reveal, 0) / 0.4), 1)",
          transform: "scale(calc(1 + var(--reveal, 0) * 0.25))",
          filter: "blur(calc(var(--reveal, 0) * 14px))",
        }}
      >
        
        {/* Added a subtle "Targeting Box" effect around the name */}
        <div className="relative p-12 border border-green-900/30 bg-black/20 backdrop-blur-[2px]">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-green-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-green-500" />

            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter mb-4 mix-blend-difference">
            Luke Bray
            </h1>
            <p className="text-xl text-green-500 font-mono tracking-widest uppercase text-center">
            Electrical Engineering Student
            </p>
        </div>
      </div>

    </main>
  );
}