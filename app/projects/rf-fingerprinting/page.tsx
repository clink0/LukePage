'use client';

import Link from 'next/link';
import SignalBackground from '@/components/SignalBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

export default function RFFingerprintingPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-green-500/30">
      
      {/* 1. Custom Oscilloscope Background */}
      <SignalBackground />

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
              REF-01 // SIGNAL BIAS
            </Mono>
          </div>
          
          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            Neural Network: <br/>
            <Text as="span" className="text-neutral-500 font-bold">Signal Bias Analysis</Text>
          </Heading>
          
          <Text className="text-xl md:text-2xl text-green-400/90 font-mono leading-relaxed max-w-2xl">
            Is your Neural Network identifying the radio hardware... or just memorizing the room it&apos;s sitting in?
          </Text>
        </header>

        {/* The Problem Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">01__CONTEXT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Promise of RFF</Heading>
            <Text className="text-neutral-400 mb-4">
              Radio Frequency Fingerprinting (RFF) relies on the idea that every radio transmitter has tiny, unique hardware imperfections—like a fingerprint. If we can detect these, we can secure IoT devices by identifying exactly <i className="text-white">which</i> device is transmitting, not just what the digital ID says.
            </Text>
            <Text className="text-neutral-400">
              Most modern research uses <strong className="text-white">Deep Learning</strong> to classify these fingerprints. They feed raw IQ data into a CNN, get 99% accuracy, and declare victory.
            </Text>
          </div>
        </section>

        {/* The Experiment Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">02__HYPOTHESIS</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Flaw in the Methodology</Heading>
            
            <div className="bg-neutral-900/50 border border-green-900/30 p-6 rounded-lg mb-8">
              <Mono color="green" className="mb-2 block">// THE THEORY</Mono>
              <Text className="text-lg text-white">
                Deep Learning models are lazy. If the wireless channel (the path the signal takes through the air) adds a strong "bias" to the signal—like multipath reflections off a wall—the AI will learn to recognize the <strong className="text-green-400">wall</strong>, not the radio.
              </Text>
            </div>
            
            <Text className="text-neutral-400">
              I designed an experiment using <strong className="text-white">GNU Radio</strong> and <strong className="text-white">Python</strong> to prove this. I generated synthetic datasets where I could isolate specific hardware impairments (I/Q imbalance, Phase Noise) and separate them from channel effects.
            </Text>
          </div>
        </section>

        {/* The Verdict Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">03__VERDICT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">The Results</Heading>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <Mono color="green" className="mt-1">{'>>'}</Mono>
                <Text className="text-neutral-300">
                  When the channel was static (radio didn&apos;t move), the model achieved <strong className="text-white">98% accuracy</strong>.
                </Text>
              </li>
              <li className="flex items-start gap-4">
                <Mono color="green" className="mt-1">{'>>'}</Mono>
                <Text className="text-neutral-300">
                  When the same radios were moved to a new location (changing the channel), accuracy plummeted to <strong className="text-white">random guessing (~15%)</strong>.
                </Text>
              </li>
              <li className="flex items-start gap-4">
                <Mono color="red" className="mt-1">{'!!'}</Mono>
                <Text className="text-white font-bold">
                  Conclusion: The model wasn&apos;t fingerprinting the radio hardware. It was fingerprinting the room.
                </Text>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-500 mb-6 block">Technologies Deployed</Mono>
          <div className="flex flex-wrap gap-3">
            {['GNU Radio', 'Python', 'PyTorch', 'SDR (Software Defined Radio)', 'Signal Processing', 'Matplotlib'].map((tech) => (
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