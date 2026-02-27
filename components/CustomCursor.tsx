'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Start by assuming it's a touch device to prevent a flash of the cursor on mobile during Next.js hydration
  const [isTouchDevice, setIsTouchDevice] = useState(true); 
  
  // Use a ref to track state inside the event listener without re-binding it
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // 1. HARDWARE DETECTION: Check if the device has a physical mouse
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsTouchDevice(!hasMouse);

    // If it's a phone/tablet, abort setup completely. Save battery and memory.
    if (!hasMouse) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Use functional state update to avoid dependency loop
      setIsVisible((prev) => {
        if (!prev) return true;
        return prev;
      });

      // 1. Check for standard HTML clickable elements
      const target = e.target as HTMLElement;
      const isClickableDOM = !!target.closest('a, button, input, textarea, [role="button"]');
      
      // 2. Check for our special 3D hover flag
      const isClickable3D = document.body.getAttribute('data-hover-3d') === 'true';

      const shouldHover = isClickableDOM || isClickable3D;

      // Only trigger a state update if the value actually changed (performance)
      if (shouldHover !== isHoveringRef.current) {
        setIsHovering(shouldHover);
        isHoveringRef.current = shouldHover;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []); // <-- Removed isVisible from dependencies to prevent infinite re-binding of listeners

  // 2. ABORT RENDER: If touch device or mouse is off-screen, render nothing
  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`relative flex items-center justify-center transition-transform duration-500 ease-out ${
          isHovering ? 'rotate-[225deg] scale-125' : 'rotate-0 scale-100'
        }`}
      >
        <div className="absolute w-[2px] h-4 bg-white" />
        <div className="absolute w-4 h-[2px] bg-white" />
      </div>
    </div>
  );
}