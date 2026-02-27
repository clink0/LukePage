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
            Are machine learning models in Radio Frequency Fingerprinting truly learning hardware characteristics, or simply the wireless channel?
          </Text>
        </header>

        {/* The Problem Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">01__CONTEXT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Promise & Challenge of RFF</Heading>
            <Text className="text-neutral-400 mb-4">
              The increase of Internet of Things (IoT) devices has created a high demand for new security methods. Radio Frequency Fingerprinting (RFF) identifies devices by unique, subtle imperfections in their radio signals, much like a human fingerprint. These fingerprints are often found in the signal&apos;s turn-on transient—the initial burst of energy when a device begins to transmit.
            </Text>
            <Text className="text-neutral-400">
              While promising, a major challenge is that the wireless channel, or the environment the signal travels through, can distort the signal and obscure the device&apos;s true fingerprint. 
            </Text>
          </div>
        </section>

        {/* The Experiment Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">02__METHOD</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Experimental Setup</Heading>
            
            <div className="bg-neutral-900/50 border border-green-900/30 p-6 rounded-lg mb-8">
              <Mono color="green" className="mb-2 block">// THE HYPOTHESIS</Mono>
              <Text className="text-lg text-white">
                Algorithmic learning models may primarily learn to differentiate between channel conditions rather than transmitter hardware. The subtle variations in the hardware fingerprint may be overshadowed by the effects of the channel.
              </Text>
            </div>
            
            <Text className="text-neutral-400 mb-4">
              To isolate the effects of the wireless channel, a controlled experiment was conducted using a <strong className="text-white">single transmitter</strong>. A HackRF One SDR transmitted a simple on-off keying (OOK) signal, which was captured by a BladeRF 2.0 micro xA4 sampling at 60 MS/s. 
            </Text>
            <Text className="text-neutral-400 mb-4">
              Data was collected at five distinct physical locations. The receiver was initially placed at a starting position and then moved 3 inches farther away from the transmitter for each subsequent collection. Crucially, the data was labeled based on the receiver&apos;s physical position (0, 1, 2, 3, 4), forcing the model to classify the channel and not the device.
            </Text>
            <Text className="text-neutral-400">
              A set of 11 statistical features (including energy, standard deviation, skewness, and kurtosis) was engineered from the raw IQ data to capture the shape and spectral properties of the transient&apos;s energy envelope. This was fed into a Random Forest classifier configured with 100 estimators.
            </Text>
          </div>
        </section>

        {/* The Verdict Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">03__VERDICT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">Summary of Findings</Heading>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <Mono color="green" className="mt-1">{'>>'}</Mono>
                <Text className="text-neutral-300">
                  Our model achieved 91.68% accuracy in classifying the signal&apos;s origin based solely on the receiver&apos;s physical location, using a single transmitter.
                </Text>
              </li>
              <li className="flex items-start gap-4">
                <Mono color="green" className="mt-1">{'>>'}</Mono>
                <Text className="text-neutral-300">
                  The model learned to identify channel-sensitive features like signal energy and amplitude variation, not a hardware fingerprint.
                </Text>
              </li>
              <li className="flex items-start gap-4">
                <Mono color="red" className="mt-1">{'!!'}</Mono>
                <Text className="text-white font-bold">
                  Conclusion: This result strongly supports our hypothesis that machine learning models can easily mistake channel effects for device signatures.
                </Text>
              </li>
            </ul>
            <Text className="text-neutral-400 mt-6">
              The primary implication is that high accuracy alone is not a reliable benchmark for RFF systems. This is a call to action to develop more robust, channel-invariant methods.
            </Text>
          </div>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-500 mb-6 block">Technologies Deployed</Mono>
          <div className="flex flex-wrap gap-3">
            {['HackRF One', 'BladeRF 2.0', 'Python', 'Scikit-learn', 'Random Forest', 'Signal Processing'].map((tech) => (
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