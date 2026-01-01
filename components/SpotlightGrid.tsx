'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Heading, Text, Mono } from '@/components/ui/Typography';

interface Project {
  id: string;
  codeName: string;
  realName: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: '01',
    codeName: 'SIGNAL BIAS',
    realName: 'Neural Network Signal Bias Analysis',
    description: 'A critical analysis of Deep Learning in SDR. Proving that most "fingerprinting" models are just learning channel effects.',
    tags: ['Python', 'GNU Radio', 'SDR', 'ML'],
    link: '/projects/rf-fingerprinting'
  },
  {
    id: '02',
    codeName: 'MARINE SURV',
    realName: 'Acoustic-Triggered Marine Surveillance Module',
    description: 'Raspberry Pi-controlled marine surveillance system designed for ropeless fishing buoy release monitoring.',
    tags: ['Raspberry Pi', 'Bio-Acoustics', 'Embedded'],
    link: '/projects/underwater-cam'
  },
 {
    id: '03',
    codeName: 'HEXAPOD',
    realName: 'Adaptive Kinematics Engine',
    description: 'Development of 3-DOF inverse kinematics and adaptive gait planning for unstructured terrain traversal.',
    tags: ['Robotics', 'C++', 'Control Theory', 'IK'],
    link: '/projects/hexapod'
  },
  {
    id: '04',
    codeName: 'IR CONTROL',
    realName: 'ATmega2560 Universal IR Control System',
    description: 'Custom PCB design and interrupt-driven firmware for an industrial-grade universal infrared remote.',
    tags: ['PCB Design', 'Embedded C', 'AVR'],
    link: '/projects/ir-remote'
  }
];

export default function SpotlightGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      for (const [id, card] of cardsRef.current) {
        if (card) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link 
          key={project.id} 
          href={project.link}
          ref={(el) => {
            if (el) cardsRef.current.set(project.id, el);
            else cardsRef.current.delete(project.id);
          }}
          className="group relative h-full rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden hover:border-neutral-600 transition-colors"
        >
          
          {/* THE SPOTLIGHT LAYER */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.15), transparent 40%)`,
            }}
          />

          {/* THE BORDER GLOW LAYER */}
          <div 
             className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{
               background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.4), transparent 40%)`,
               zIndex: -1,
             }}
          />
          
          <div className="relative h-full p-8 flex flex-col justify-between z-10">
            <div>
              {/* ID Badge */}
              <div className="flex items-center justify-between mb-4">
                <Mono variant="tag" color="neutral">
                  REF-{project.id}
                </Mono>
                <div className="h-2 w-2 rounded-full bg-neutral-800 group-hover:bg-green-500 transition-colors" />
              </div>

              {/* Mystery Title */}
              <Heading variant="h3" className="mb-1 font-mono tracking-wider group-hover:text-green-400 transition-colors">
                {project.codeName}
              </Heading>
              
              {/* Real Name */}
              <Text variant="muted" className="font-mono mb-6 group-hover:text-neutral-300 transition-colors">
                // {project.realName}
              </Text>

              {/* Description */}
              <Text variant="muted" className="mb-6 text-neutral-400">
                {project.description}
              </Text>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <Mono 
                  key={tag} 
                  variant="tag" 
                  color="green" 
                  className="group-hover:text-green-400 group-hover:border-green-500/50 transition-all"
                >
                  {tag}
                </Mono>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}