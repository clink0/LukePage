'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heading, Text, Mono } from '@/components/ui/Typography';

export default function EducationPage() {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);

  // The "Script" for the boot sequence
  const bootSequence = [
    { text: "Initializing KERNEL... OK", delay: 200 },
    { text: "Loading modules: MATH_327_DIFF_EQ, PHYS_218, ENGR_336... OK", delay: 400 },
    { text: "Mounting volume: /home/lukebray/degree... SUCCESS", delay: 300 },
    { text: "Verifying checksums for CE_223_DATA_STRUCTURES... PASS", delay: 200 },
    { text: "Verifying checksums for CE_338_DIGITAL_VLSI... PASS", delay: 100 },
    { text: "Checking memory integrity... 100% RETENTION", delay: 500 },
    { text: "Detecting hardware: ATMEGA2560 (CE_351), ANALOG_ELECTRONICS (ENGR_337)... FOUND", delay: 400 },
    { text: "Compiling Major GPA stats... 3.63/4.0", delay: 600 },
    { text: "Establishing link to FORT_LEWIS_COLLEGE_DB...", delay: 800 },
    { text: "Access granted.", delay: 200 },
    { text: "Booting ACADEMIC_OS v2.0...", delay: 1000 },
  ];

  useEffect(() => {
    let currentIndex = 0;

    const runBoot = () => {
      if (currentIndex >= bootSequence.length) {
        setTimeout(() => setIsBooted(true), 500); 
        return;
      }

      const { text, delay } = bootSequence[currentIndex];
      setBootLines(prev => [...prev, text]);
      currentIndex++;
      setTimeout(runBoot, delay);
    };

    const timer = setTimeout(runBoot, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen w-full bg-black font-mono p-8 selection:bg-green-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-30'}`}>
        <Link href="/" className="text-xl font-bold tracking-tighter text-green-500 hover:text-white transition-colors">
          Luke Bray
        </Link>
        <Link href="/" className="text-sm text-green-500 uppercase tracking-widest hover:underline hover:text-white transition-colors">
          // Return to Root
        </Link>
      </nav>

      {/* BOOT SCREEN LAYER */}
      {!isBooted && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
          <div className="max-w-3xl w-full px-8">
            <div className="space-y-2">
              {bootLines.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <Mono color="green" className="opacity-50">
                    [{i.toString().padStart(4, '0')}]
                  </Mono>
                  <span className="text-green-500 typing-effect">{line}</span>
                </div>
              ))}
              <div className="h-6 w-3 bg-green-500 animate-pulse mt-2" />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT LAYER */}
      <div className={`transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-5xl mx-auto pt-32 pb-20">
          
          {/* Degree Header */}
          <div className="border-b-2 border-green-900 pb-8 mb-12">
            <Heading variant="h1" className="mb-4 text-4xl md:text-6xl">
              B.S. Computer Engineering
            </Heading>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <Heading variant="h3" className="text-green-400">
                  Fort Lewis College
                </Heading>
                <div className="flex gap-3 items-center mt-2">
                  <Text className="text-green-700 font-bold">Physics & Engineering Dept.</Text>
                  <span className="w-1 h-1 bg-green-700 rounded-full"></span>
                  <Text className="text-green-600">Minor in Mathematics</Text>
                </div>
              </div>
              
              <div className="text-right">
                <Text className="text-xl text-white mb-2">Class of 2026</Text>
                <div className="flex gap-2 justify-end">
                  <Mono variant="tag" color="green">Major GPA: 3.63</Mono>
                  <Mono variant="tag" color="neutral">Cum. GPA: 3.44</Mono>
                </div>
              </div>
            </div>
          </div>

          {/* Coursework Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Column 1: Hardware */}
            <div>
              <Heading variant="h4" className="text-green-500 border-l-4 border-green-500 pl-4 mb-6">
                Embedded & Hardware
              </Heading>
              <ul className="space-y-6">
                <CourseItem 
                  code="CE 351" 
                  title="Microcontrollers" 
                  desc="Interrupt-driven architecture, timer/counter configuration, bare-metal C." 
                />
                <CourseItem 
                  code="CE 338" 
                  title="Digital VLSI Design" 
                  desc="CMOS circuit design, layout, and simulation." 
                />
                <CourseItem 
                  code="CE 401" 
                  title="Computer Org & Arch" 
                  desc="CPU datapath design, pipelining, cache memory hierarchies." 
                />
                <CourseItem 
                  code="ENGR 337" 
                  title="Analog Electronics" 
                  desc="Transistor amplifiers, frequency response, operational amplifiers." 
                />
              </ul>
            </div>

            {/* Column 2: Software */}
            <div>
              <Heading variant="h4" className="text-green-500 border-l-4 border-green-500 pl-4 mb-6">
                Software & Signals
              </Heading>
              <ul className="space-y-6">
                <CourseItem 
                  code="CE 332" 
                  title="Digital Signal Processing" 
                  desc="Discrete-time systems, Z-transforms, FIR/IIR filter design." 
                />
                <CourseItem 
                  code="CE 223" 
                  title="Data Structures" 
                  desc="Advanced algorithmic analysis, memory management, sorting." 
                />
                <CourseItem 
                  code="ENGR 333" 
                  title="Computational Methods" 
                  desc="Numerical analysis, simulation techniques, modeling." 
                />
                <CourseItem 
                  code="CE 222" 
                  title="OOP with C++" 
                  desc="Polymorphism, inheritance, encapsulation patterns." 
                />
              </ul>
            </div>

            {/* Column 3: Math */}
            <div>
              <Heading variant="h4" className="text-green-500 border-l-4 border-green-500 pl-4 mb-6">
                Applied Mathematics
              </Heading>
              <ul className="space-y-6">
                <CourseItem 
                  code="MATH 319" 
                  title="Engineering Statistics" 
                  desc="Probability distributions, hypothesis testing, regression." 
                />
                <CourseItem 
                  code="MATH 327" 
                  title="Differential Equations" 
                  desc="First/second order systems, Laplace transforms." 
                />
                <CourseItem 
                  code="ENGR 336" 
                  title="Systems & Control" 
                  desc="Feedback control loops, stability analysis, PID tuning." 
                />
                <CourseItem 
                  code="MATH 223" 
                  title="Calculus III" 
                  desc="Multivariable calculus, vector fields, line integrals." 
                />
              </ul>
            </div>

          </div>

          {/* Current Focus */}
          <div className="mt-16 pt-12 border-t border-green-900/50">
            <Heading variant="h4" className="text-green-700 mb-6">
              Active Research & Upcoming
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActiveCourse 
                term="SPRING 2026 // IN PROGRESS" 
                title="Embedded Devices (CE 433)" 
              />
              <ActiveCourse 
                term="SPRING 2026 // IN PROGRESS" 
                title="Semiconductor Devices (ENGR 430)" 
              />
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}

// --- Local Helper Components for Cleaner JSX ---

function CourseItem({ code, title, desc }: { code: string, title: string, desc: string }) {
  return (
    <li className="group">
      <div className="flex justify-between items-center mb-1">
        <Text as="span" className="font-bold text-green-300 group-hover:text-white transition-colors">
          {title}
        </Text>
        <Mono variant="default" color="green" className="text-xs">
          {code}
        </Mono>
      </div>
      <Text variant="small" className="text-green-600/80">
        {desc}
      </Text>
    </li>
  );
}

function ActiveCourse({ term, title }: { term: string, title: string }) {
  return (
    <div className="bg-green-900/10 border border-green-900 p-4 rounded group hover:bg-green-900/20 transition-colors">
      <Mono variant="default" color="green" className="text-[10px] mb-2 block">
        {term}
      </Mono>
      <Text className="text-white font-bold group-hover:text-green-400 transition-colors">
        {title}
      </Text>
    </div>
  );
}