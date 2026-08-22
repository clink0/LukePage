'use client';

import Link from 'next/link';
import MatrixBackground from '@/components/MatrixBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

// ─── MEDIA CONFIG ────────────────────────────────────────────
const PROTOTYPE_TEST_SRC = '/media/ir-remote/prototype-test.jpg';
const PCB_LAYOUT_SRC     = '/media/ir-remote/pcb-layout.png';
const SCHEMATIC_SRC      = '/media/ir-remote/schematic.png';
const DEMO_VIDEO_ID      = 'rWdcN8Ynb7w';
// ─────────────────────────────────────────────────────────────

function MediaFrame({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="rounded-lg overflow-hidden border border-green-900/40 bg-white p-2 mb-3">
      <img src={src} alt={alt} className="w-full h-auto" />
      {caption && (
        <Mono className="text-green-400 text-sm block text-center mt-2">{caption}</Mono>
      )}
    </div>
  );
}

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
            <Mono color="green">
              REF-04 // IR CONTROL
            </Mono>
          </div>
          
          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            ATmega2560 Universal <br/>
            <span className="text-neutral-300 font-bold tracking-normal">IR Control System</span>
          </Heading>
          
          <Text className="text-xl md:text-2xl text-green-300 font-mono leading-relaxed max-w-2xl">
            Replacing plastic junk with a custom-engineered, lithium-powered ATmega2560 command module.
          </Text>
        </header>

        {/* The Prototype Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">01__PROTOTYPE</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Proof of Concept</Heading>
            <Text className="text-neutral-400 mb-6">
              Before committing to a custom PCB, I validated the concept on the bench while waiting on v2 parts to arrive. The rig reused the <strong className="text-white">v1 keypad</strong>, a &quot;Skyboard&quot; microcontroller board (a DIY ATmega-based Arduino), and a separate Arduino wired up as the IR receiver to confirm signals were actually being decoded correctly.
            </Text>

            <MediaFrame
              src={PROTOTYPE_TEST_SRC}
              alt="Breadboard prototype: v1 keypad wired to a Skyboard ATmega microcontroller, with a second Arduino-based receiver board for testing"
              caption="v1 keypad + Skyboard MC (transmit) and Arduino receiver (decode)"
            />

            <Text className="text-neutral-400">
              Once the interrupt-driven scanning and IR protocol were confirmed working here, the design moved to a dedicated PCB for v2.
            </Text>
          </div>
        </section>

        {/* The Hardware Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">02__HARDWARE</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Custom PCB Design</Heading>
            <Text className="text-neutral-400 mb-6">
              The core of the SkyRemote is a custom-designed Printed Circuit Board (PCB) built around the <strong className="text-white">ATmega2560</strong>. Unlike hobbyist kits, this was designed for daily reliability.
            </Text>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <MediaFrame
                src={PCB_LAYOUT_SRC}
                alt="PCB layout of the custom IR remote board, showing the 4x3 keypad pads, ATmega TQFP footprint, and charging/boost circuitry"
                caption="PCB Layout — v2"
              />
              <MediaFrame
                src={SCHEMATIC_SRC}
                alt="Full schematic of the IR remote: ATmega2560, TP4056 battery charger, MT3608 boost converter, keypad matrix, and IR LED driver"
                caption="Full Schematic — v2"
              />
            </div>
          </div>
        </section>

        {/* The Firmware Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">03__FIRMWARE</Mono>
          </div>
          
          <div className="min-w-0">
            <Heading variant="h3" className="mb-4">Interrupt-Driven Architecture</Heading>
            <Text className="text-neutral-400 mb-6">
              To ensure zero latency, I bypassed the standard Arduino <Mono variant="code" className="text-sm">loop()</Mono> polling for the keypad. Instead, I configured <strong className="text-white">Timer 1</strong> to trigger an Interrupt Service Routine (ISR) at exactly 50Hz.
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
            <Mono className="text-neutral-400 block sticky top-32">04__PROTOCOL</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">Samsung IR Integration</Heading>
            <Text className="text-neutral-400 mb-6">
                The system utilizes the <Mono variant="code" className="text-sm">IRremote.hpp</Mono> library to modulate the 38kHz carrier wave required by Samsung televisions.
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

        {/* The Demo Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">05__FINAL BUILD</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">v2 in Daily Use</Heading>
            <Text className="text-neutral-400 mb-6">
              The finished v2 board, keypad, and enclosure in action, replacing the original plastic remote.
            </Text>

            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-green-900/40 bg-neutral-950 mb-6">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}`}
                title="SkyRemote v2 — final product demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="bg-neutral-900/50 border border-amber-900/40 p-4 rounded">
              <Mono color="amber" className="mb-2 block">KNOWN ISSUE // BATTERY CIRCUIT</Mono>
              <Text variant="small" className="text-neutral-400">
                The onboard Li-Ion charging/boost circuit doesn&apos;t power the board correctly — root cause still unconfirmed. The remote works fine on external power, so for now v2 runs with a soldered jumper bypassing the battery circuit entirely. Debugging the charger path is next on the list.
              </Text>
            </div>
          </div>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-300 mb-6 block">Stack & Components</Mono>
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