'use client';

import Link from 'next/link';
import MatrixBackground from '@/components/MatrixBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

export default function IRRemotePage() {
  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-green-500/30">
      
      {/* 1. Matrix Background */}
      <MatrixBackground />

      {/* 2. Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-green-400 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href="/projects">
          <Mono className="text-neutral-400 hover:text-green-400 hover:underline transition-colors">
            // Return to Archives
          </Mono>
        </Link>
      </nav>

      {/* 3. Main Content Container */}
      <article className="relative z-10 pt-32 pb-20 px-4 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-24 border-b border-green-900/50 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <Mono color="green" className="opacity-70">
              REF-04 // IR CONTROL
            </Mono>
          </div>
          
          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            ATmega2560 Universal <br/>
            <Text as="span" className="text-neutral-500 font-bold">IR Control System</Text>
          </Heading>
          
          <Text className="text-xl md:text-2xl text-green-400/90 font-mono leading-relaxed max-w-2xl">
            Replacing plastic junk with a custom-engineered, lithium-powered ATmega2560 command module.
          </Text>
        </header>

        {/* The Hardware Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">01__HARDWARE</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Custom PCB Design</Heading>
            <Text className="text-neutral-400 mb-6">
              The core of the SkyRemote is a custom-designed Printed Circuit Board (PCB) built around the <strong className="text-white">ATmega2560</strong>. Unlike hobbyist kits, this was designed for daily reliability.
            </Text>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-900/50 border border-green-900/30 p-4 rounded">
                    <Mono color="green" className="mb-2 block">POWER SYSTEM</Mono>
                    <Text variant="small" className="text-neutral-400">
                        Integrated Lithium-Ion charging circuit with a 5V boost converter, allowing USB-C recharging and consistent logic levels regardless of battery voltage.
                    </Text>
                </div>
                <div className="bg-neutral-900/50 border border-green-900/30 p-4 rounded">
                    <Mono color="green" className="mb-2 block">INTERFACE</Mono>
                    <Text variant="small" className="text-neutral-400">
                        3x4 tactile switch matrix directly routed to the ATmega's GPIOs (Pins 22-28), optimized for rapid polling.
                    </Text>
                </div>
            </div>
          </div>
        </section>

        {/* The Firmware Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">02__FIRMWARE</Mono>
          </div>
          
          <div className="min-w-0">
            <Heading variant="h3" className="mb-4">Interrupt-Driven Architecture</Heading>
            <Text className="text-neutral-400 mb-6">
              To ensure zero latency, I bypassed the standard Arduino <Mono variant="code" className="text-xs">loop()</Mono> polling for the keypad. Instead, I configured <strong className="text-white">Timer 1</strong> to trigger an Interrupt Service Routine (ISR) at exactly 50Hz.
            </Text>

            {/* Code Block */}
            <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto border border-neutral-800 mb-6 shadow-xl">
              <pre className="font-mono text-sm text-neutral-300 leading-relaxed">
{`ISR(TIMER1_COMPA_vect) {
  // Scan Columns
  for (int c = 0; c < NUM_COLS; c++) {
    digitalWrite(COL_PINS[c], HIGH);

    // Check Rows
    for (int r = 0; r < NUM_ROWS; r++) {
      int reading = digitalRead(ROW_PINS[r]);
      
      // Software Debounce Logic
      if (reading == 1) {
         stableCount[r][c]++;
      }
      
      // Trigger Command
      if (stableCount[r][c] == STABLE_THRESHOLD) {
         sendCmdRequest = true;
      }
    }
    digitalWrite(COL_PINS[c], LOW);
  }
}`}
              </pre>
            </div>
            
            <Text className="text-neutral-400">
                This approach allows the processor to sleep or handle other tasks, only waking up to scan the matrix. It also implements software de-bouncing and "Hold-to-Repeat" logic for volume control.
            </Text>
          </div>
        </section>

        {/* The Protocol Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">03__PROTOCOL</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">Samsung IR Integration</Heading>
            <Text className="text-neutral-400 mb-6">
                The system utilizes the <Mono variant="code" className="text-xs">IRremote.hpp</Mono> library to modulate the 38kHz carrier wave required by Samsung televisions.
            </Text>
            <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-4 border-b border-neutral-800 pb-2">
                    <Mono color="green" className="w-24">ADDR: 0x7</Mono>
                    <Text variant="small" className="text-neutral-300">Target Device Address</Text>
                </div>
                <div className="flex items-center gap-4 border-b border-neutral-800 pb-2">
                    <Mono color="green" className="w-24">CMD: 0x02</Mono>
                    <Text variant="small" className="text-neutral-300">Function: Power Toggle</Text>
                </div>
                <div className="flex items-center gap-4 border-b border-neutral-800 pb-2">
                    <Mono color="green" className="w-24">CMD: 0x07</Mono>
                    <Text variant="small" className="text-neutral-300">Function: Volume Up (+Repeat)</Text>
                </div>
            </div>
          </div>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-500 mb-6 block">Stack & Components</Mono>
          <div className="flex flex-wrap gap-3">
            {['ATmega2560', 'C++', 'PlatformIO', 'KiCad', 'IR Protocol', 'Power Electronics'].map((tech) => (
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