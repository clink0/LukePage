'use client';

import Link from 'next/link';
import HexapodBackground from '@/components/HexapodBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

export default function HexapodPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-amber-500/30">
      
      {/* 1. Terrain Grid Background */}
      <HexapodBackground />

      {/* 2. Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-amber-500 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href="/projects">
          <Mono className="text-neutral-400 hover:text-amber-500 hover:underline transition-colors">
            // Return to Archives
          </Mono>
        </Link>
      </nav>

      {/* 3. Main Content Container */}
      <article className="relative z-10 pt-32 pb-20 px-4 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-24 border-b border-amber-900/50 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <Mono color="amber" className="opacity-70">
              REF-03 // HEXAPOD
            </Mono>
          </div>
          
          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            Adaptive Hexapod: <br/>
            <Text as="span" className="text-neutral-500 font-bold">Kinematics Engine</Text>
          </Heading>
          
          <Text className="text-xl md:text-2xl text-amber-500/90 font-mono leading-relaxed max-w-2xl">
            "Wheels fail where the ground fights back. To explore the lunar surface, we had to reinvent the step."
          </Text>
        </header>

        {/* The Problem Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">01__TERRAIN</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Regolith Problem</Heading>
            <Text className="text-neutral-400 mb-4">
              NASA's Lunabotics competition challenges engineers to navigate a simulated lunar surface. The loose, granular regolith is a nightmare for traditional rovers—wheels spin out, dig holes, and get stuck.
            </Text>
            <Text className="text-neutral-400">
              To guarantee traversal over boulders and craters, I abandoned wheels entirely. I designed a <strong className="text-white">six-legged hexapod</strong> capable of stepping over obstacles rather than rolling through them.
            </Text>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">02__KINEMATICS</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Inverse Kinematics (IK)</Heading>
            
            <div className="bg-neutral-900/50 border border-amber-900/30 p-6 rounded-lg mb-8">
              <Mono color="amber" className="mb-2 block">// THE MATH</Mono>
              <Text className="text-lg text-white">
                Moving a leg isn't just "move servo A." To place a foot at exactly <Mono variant="code" color="amber">[x, y, z]</Mono>, you must solve a system of non-linear equations to determine the precise angle for the coxa, femur, and tibia joints simultaneously.
              </Text>
            </div>
            
            <Text className="text-neutral-400">
              I implemented a custom <strong className="text-white">Inverse Kinematics engine</strong> in C++. It calculates the joint angles in real-time, allowing the robot to maintain a level chassis even while climbing 30-degree inclines.
            </Text>
          </div>
        </section>

        {/* The Engineering Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">03__GAIT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">Adaptive Gait Control</Heading>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <Mono color="amber" className="mt-1">{'>'}</Mono>
                <Text className="text-neutral-300">
                  <strong className="text-white">Tripod Gait:</strong> For high speed on flat ground. 3 legs lift, 3 legs push. Stability is dynamic.
                </Text>
              </li>
              <li className="flex items-start gap-4">
                <Mono color="amber" className="mt-1">{'>'}</Mono>
                <Text className="text-neutral-300">
                  <strong className="text-white">Wave Gait:</strong> For climbing and rough terrain. Only one leg lifts at a time, keeping 5 points of contact for maximum stability.
                </Text>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-500 mb-6 block">System Architecture</Mono>
          <div className="flex flex-wrap gap-3">
            {['C++', 'Embedded Systems', 'Inverse Kinematics', 'Control Theory', '3D Printing', 'PCB Design'].map((tech) => (
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