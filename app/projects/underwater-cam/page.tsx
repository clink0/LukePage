'use client';

import Link from 'next/link';
import OceanBackground from '@/components/OceanBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

export default function UnderwaterCamPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* 1. Deep Sea Background */}
      <OceanBackground />

      {/* 2. Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-cyan-400 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href="/projects">
          <Mono className="text-neutral-400 hover:text-cyan-400 hover:underline transition-colors">
            // Return to Archives
          </Mono>
        </Link>
      </nav>

      {/* 3. Main Content Container */}
      <article className="relative z-10 pt-32 pb-20 px-4 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-24 border-b border-cyan-900/50 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <Mono color="cyan" className="opacity-70">
              REF-02 // MARINE SURV
            </Mono>
          </div>
          
          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            Acoustic-Triggered <br/>
            <Text as="span" className="text-neutral-500 font-bold">Marine Surveillance Module</Text>
          </Heading>
          
          <Text className="text-xl md:text-2xl text-cyan-400/90 font-mono leading-relaxed max-w-2xl">
            Solving the blind spot in ropeless fishing to protect whale migration corridors.
          </Text>
        </header>

        {/* The Problem Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">01__CONFLICT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Whale Migration Crisis</Heading>
            <Text className="text-neutral-400 mb-4">
              Commercial crab fishing faces a massive existential threat: <strong className="text-white">Whale entanglements</strong>. 
              Traditional traps use vertical ropes connecting the seafloor cage to a surface buoy. When whales migrate, they can become lethally entangled in these lines.
            </Text>
            <Text className="text-neutral-400">
              This forces entire fisheries to close for months during migration seasons, costing millions. The industry <i className="text-white">needs</i> a way to fish without vertical ropes.
            </Text>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">02__MECHANIC</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">SubSea Sonics & The Acoustic Trigger</Heading>
            
            <div className="bg-neutral-900/50 border border-cyan-900/30 p-6 rounded-lg mb-8">
              <Mono color="cyan" className="mb-2 block">// THE CONCEPT</Mono>
              <Text className="text-lg text-white">
                Ropeless fishing. The buoy stays locked to the trap on the seafloor. When the fisherman returns, they blast a specific acoustic signal into the water. The buoy "hears" it, unlocks, and floats to the surface for retrieval.
              </Text>
            </div>
            
            <Text className="text-neutral-400">
              <strong className="text-white">The Problem:</strong> It's a black box. SubSea Sonics needed to know <i className="text-white">exactly</i> how their release mechanism performed in the unpredictable, muddy, high-current conditions of the real ocean floor. They were flying blind.
            </Text>
          </div>
        </section>

        {/* The Engineering Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">03__PAYLOAD</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">The Acoustic Camera Module</Heading>
            <Text className="text-neutral-400 mb-6">
              I engineered a custom surveillance package designed to attach to the crab trap and autonomously record the release event.
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-neutral-800 rounded bg-neutral-900/30">
                    <Text className="text-cyan-400 font-bold mb-2 block">Acoustic Wake-Up</Text>
                    <Text variant="small" className="text-neutral-400">
                        To save battery during week-long deployments, the Pi stays in deep sleep. A low-power analog circuit listens for the specific "Release" ping and wakes the system instantly.
                    </Text>
                </div>
                <div className="p-4 border border-neutral-800 rounded bg-neutral-900/30">
                    <Text className="text-cyan-400 font-bold mb-2 block">Pressure Housing</Text>
                    <Text variant="small" className="text-neutral-400">
                        Custom machined acrylic housing rated for 150m depth, ensuring the electronics survive the crushing pressure of the crab grounds.
                    </Text>
                </div>
            </div>
          </div>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-500 mb-6 block">Mission Hardware</Mono>
          <div className="flex flex-wrap gap-3">
            {['Raspberry Pi Zero', 'Python', 'OpenCV', 'Hydrophone', 'Power Management', 'CAD/Fusion 360'].map((tech) => (
              <Mono 
                key={tech} 
                variant="tag" 
                className="bg-neutral-900 text-neutral-300 border-neutral-700 rounded-full px-3"
              >
                {tech}
              </Mono>
            ))}
          </div>
        </footer>

      </article>
    </main>
  );
}