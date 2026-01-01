'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use a ref to track state inside the event listener without re-binding it
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // 1. Check for standard HTML clickable elements
      const target = e.target as HTMLElement;
      const isClickableDOM = !!target.closest('a, button, input, textarea, [role="button"]');
      
      // 2. Check for our special 3D hover flag (we will add this to FluidGlass)
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
  }, [isVisible]);

  if (!isVisible) return null;

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