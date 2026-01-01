'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 1. Scramble Text Component
// This handles the "Decryption" animation effect on hover
const ScrambleLink = ({ href, label, isExternal = false }: { href: string, label: string, isExternal?: boolean }) => {
  const [displayText, setDisplayText] = useState(label);
  const [isHovering, setIsHovering] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isHovering) {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split("")
            .map((char, index) => {
              if (index < iteration) return label[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        if (iteration >= label.length) clearInterval(interval);
        iteration += 1 / 2; // Speed of decoding
      }, 30);
    } else {
      setDisplayText(label);
    }

    return () => clearInterval(interval);
  }, [isHovering, label]);

  return (
    <div 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative group"
    >
        <Link 
            href={href} 
            target={isExternal ? "_blank" : "_self"}
            className="block py-2 px-4 font-mono text-sm tracking-widest text-neutral-400 group-hover:text-green-400 transition-colors uppercase"
        >
            {/* The Brackets Effect */}
            <span className="opacity-0 group-hover:opacity-100 mr-2 transition-opacity text-green-600">[</span>
            {displayText}
            <span className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity text-green-600">]</span>
        </Link>
    </div>
  );
};

export default function TacticalNav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-green-900/30 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* Left: Status / ID */}
            <div className="flex items-center gap-4">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-green-700 tracking-widest">
                    PORTFOLIO_V1
                </span>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
                <ScrambleLink href="/projects" label="Projects" />
                <ScrambleLink href="/education" label="Education" />
                <ScrambleLink href="https://github.com/clink0" label="GitHub" isExternal />
                <ScrambleLink href="mailto:me@example.com" label="Contact" isExternal />
            </div>

            <div className="font-mono text-xs text-green-900 text-right hidden sm:block">
                <div>Something Here</div>
            </div>
        </div>
    </nav>
  );
}