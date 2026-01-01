'use client';

import GameOfLifeBackground from "@/components/GameOfLifeBackground";
import TacticalNav from "@/components/TacticalNav";

export default function Home() {
  return (
    <main className="fixed inset-0 w-full h-full bg-black overflow-hidden selection:bg-green-500/30">
      
      {/* 1. The Background Layer */}
      <GameOfLifeBackground />

      {/* 2. The New Header Layer */}
      <TacticalNav />

      {/* 3. The Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-40">
        
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
            Computer Engineering Student
            </p>
        </div>
      </div>

    </main>
  );
}