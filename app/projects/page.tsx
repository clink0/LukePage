'use client';

import Link from 'next/link';
import SpotlightGrid from '@/components/SpotlightGrid';
import { Heading, Text, Mono } from '@/components/ui/Typography';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-green-500/30">
      
      {/* Background Grid Pattern for texture */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Header */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          {/* Using Text with 'as="span"' for the logo allows us to use the standard text styles but override size/weight */}
          <Text as="span" className="text-xl font-bold tracking-tighter text-white hover:text-green-400 transition-colors">
            Luke Bray
          </Text>
        </Link>
        
        <Link href="/">
          {/* Mono 'default' gives us that nice uppercase tracking style automatically */}
          <Mono className="text-neutral-400 hover:text-green-400 hover:underline transition-colors">
            // Return to Root
          </Mono>
        </Link>
      </nav>

      <div className="relative z-10 pt-32 pb-20 px-4">
        {/* Title Section */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Overriding h1 size to match your specific 6xl/8xl design requirement */}
          <Heading variant="h1" className="text-6xl md:text-8xl mb-6">
            Projects
          </Heading>
          
          {/* Using Text but adding font-mono to match the "Terminal" aesthetic of this specific page */}
          <Text className="text-xl max-w-2xl font-mono text-neutral-400">
            Select a file to view project details. 
            <Text as="span" className="block mt-2 text-green-500/50 text-sm">
              Some subtext here.
            </Text>
          </Text>
        </div>

        {/* The Component */}
        <SpotlightGrid />
      </div>

    </main>
  );
}