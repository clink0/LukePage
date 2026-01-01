'use client';

import { useRef, useEffect } from 'react';

export default function SignalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Track Mouse for interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      if (!canvas || !ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // 1. Clear with trail effect (creates that phosphor fade)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // 2. Setup Grid Line Style
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#22c55e'; // Tailwind Green-500
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22c55e';
      
      ctx.beginPath();

      // 3. Draw Waveform
      // We draw multiple lines to simulate a "noisy" signal
      phaseRef.current += 0.05;
      
      for (let x = 0; x < width; x += 5) {
        // Distance from mouse affects stability
        const dx = x - mouseRef.current.x;
        const dy = centerY - mouseRef.current.y; // approximate center interaction
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // "Stability" factor: Closer to mouse = cleaner signal (0.0), Farther = Noisier (1.0)
        // This represents your research "finding the signal in the noise"
        const instability = Math.min(dist / 500, 1); 

        // Base Carrier Wave (Sine)
        const carrier = Math.sin(x * 0.01 + phaseRef.current);
        
        // "Channel Effect" Noise (Random + Perlin-ish)
        const noise = (Math.random() - 0.5) * 2 * instability * 150;
        
        // Final Y position
        const y = centerY + (carrier * 50) + noise;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-30"
    />
  );
}