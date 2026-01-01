'use client';

import { useRef, useEffect } from 'react';

export default function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIGURATION ---
    const bubbles: { x: number; y: number; speed: number; size: number }[] = [];
    let radarAngle = 0;

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Init Bubbles
    for (let i = 0; i < 50; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        size: Math.random() * 3,
      });
    }

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;

      // 1. Deep Ocean Gradient Background
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#020617'); // Slate 950 (Surface-ish dark)
      gradient.addColorStop(1, '#000000'); // Pure Black (Abyss)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // 2. Draw Bubbles (Rising)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)'; // Faint Light Blue
      bubbles.forEach((b) => {
        b.y -= b.speed;
        // Reset if it goes off top
        if (b.y < -10) {
          b.y = h + 10;
          b.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Sonar Sweep Effect
      // Draws a rotating gradient radar in the center
      const cx = w / 2;
      const cy = h / 2;
      const maxRadius = Math.max(w, h) * 0.6;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(radarAngle);
      
      // The "Sweep" beam
      const sonarGrad = ctx.createConicGradient(0, 0, 0);
      sonarGrad.addColorStop(0, 'rgba(0, 255, 127, 0)'); // Transparent tail
      sonarGrad.addColorStop(0.8, 'rgba(0, 255, 127, 0)'); 
      sonarGrad.addColorStop(1, 'rgba(0, 255, 127, 0.15)'); // Bright leading edge (Spring Green)
      
      ctx.fillStyle = sonarGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxRadius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();

      // 4. Radar Rings (Static concentric circles)
      ctx.strokeStyle = 'rgba(0, 255, 127, 0.05)';
      ctx.lineWidth = 1;
      [100, 250, 450, 700].forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      radarAngle += 0.01; // Rotation speed
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}