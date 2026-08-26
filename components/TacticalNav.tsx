'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 1. Scramble Text Component
const ScrambleLink = ({ href, label, isExternal = false, onClick }: { href: string, label: string, isExternal?: boolean, onClick?: () => void }) => {
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
        iteration += 1 / 2;
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
      onClick={onClick}
      className="relative group w-fit"
    >
        <Link 
            href={href} 
            target={isExternal ? "_blank" : "_self"}
            className="block py-2 px-4 font-mono text-xl tracking-widest text-neutral-400 group-hover:text-green-400 transition-colors uppercase"
        >
            <span className="opacity-0 group-hover:opacity-100 mr-2 transition-opacity text-green-600">[</span>
            {displayText}
            <span className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity text-green-600">]</span>
        </Link>
    </div>
  );
};

// 2. Tactical Clock Component (Updated to accept className)
const TacticalClock = ({ className = "" }: { className?: string }) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className={`font-mono text-xl text-green-900 animate-pulse ${className}`}>
        <div className="opacity-50">ESTABLISHING_LINK...</div>
        <div>--:--:--</div>
      </div>
    );
  }

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className={`font-mono text-xl text-green-700 ${className}`}>
      <div className="tracking-widest flex items-center gap-2">
        <span className="text-green-900">SYS.TIME:</span> {formattedTime}
      </div>
    </div>
  );
};

// 3. Main Navigation Component
export default function TacticalNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
        {/* Main Top Bar */}
        <div className="border-b border-green-900/30">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                
                {/* Left: Status / ID */}
                <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-mono text-xl text-green-700 tracking-widest">
                        PORTFOLIO_V1
                    </span>
                </div>

                {/* Center: Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-2">
                    <ScrambleLink href="/projects" label="Projects" />
                    <ScrambleLink href="/notes" label="Notes" />
                    <ScrambleLink href="/education" label="Education" />
                    <ScrambleLink href="https://github.com/clink0" label="GitHub" isExternal />
                    <ScrambleLink href="mailto:me@example.com" label="Contact" isExternal />
                </div>

                {/* Right: Desktop Tactical Clock */}
                <TacticalClock className="hidden sm:block text-right" />

                {/* Mobile Menu Toggle Button */}
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden font-mono text-xl tracking-widest text-green-500 hover:text-green-400 transition-colors uppercase p-2"
                >
                  [{isOpen ? 'CLOSE' : 'MENU'}]
                </button>
            </div>
        </div>

        {/* Mobile Dropdown Overlay */}
        {isOpen && (
            <div className="md:hidden border-b border-green-900/30 bg-black/95 backdrop-blur-md px-4 py-6 flex flex-col gap-4">
                <ScrambleLink href="/projects" label="Projects" onClick={handleLinkClick} />
                <ScrambleLink href="/notes" label="Notes" onClick={handleLinkClick} />
                <ScrambleLink href="/education" label="Education" onClick={handleLinkClick} />
                <ScrambleLink href="https://github.com/clink0" label="GitHub" isExternal onClick={handleLinkClick} />
                <ScrambleLink href="mailto:me@example.com" label="Contact" isExternal onClick={handleLinkClick} />
                
                {/* Mobile Bottom Status Bar */}
                <div className="pt-6 mt-2 border-t border-green-900/30 flex justify-between items-end">
                    <TacticalClock className="text-left" />
                    <span className="font-mono text-[10px] text-green-900 tracking-widest uppercase">
                        SECURE_UPLINK
                    </span>
                </div>
            </div>
        )}
    </nav>
  );
}