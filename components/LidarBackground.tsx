'use client';

import { useRef, useEffect } from 'react';

export default function LidarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIGURATION ---
    let frame = 0;
    const points: { x: number; y: number; z: number; phase: number }[] = [];
    const numPoints = 1200; 

    // Generate irregular "Debris" cloud
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 80 + Math.random() * 120; 
      
      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        phase: Math.random()
      });
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // 1. Clear Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, w, h);

      // 2. Rotation Only (No light movement)
      const angle = frame * 0.002; 
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      points.forEach(p => {
        // Rotation Matrix (Y-axis)
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;
        const ry = p.y; 

        // 3D Perspective Projection
        const fov = 400;
        const scale = fov / (fov + rz + 200);
        const sx = cx + rx * scale;
        const sy = cy + ry * scale;

        // --- AMBIENT OCCLUSION LIGHTING ---
        // Light is static at the center (0,0,0).
        // Points are bright in the middle, dark at the edges.
        const distFromCenter = Math.sqrt(rx*rx + ry*ry + rz*rz);
        const maxRadius = 200;

        // Calculate static alpha based on position
        let alpha = Math.max(0.1, 1 - (distFromCenter / maxRadius));
        
        // Depth cueing: Points further back are dimmer
        if (rz > 0) alpha *= 0.5;

        // Color Logic:
        // Core: White/Rose Mix
        // Outer: Rose Red
        let r = 244, g = 63, b = 94; // Rose-500 base
        
        // Hot Core Effect
        if (distFromCenter < 50) {
            r = 255; g = 220; b = 220; // Nearly white
            alpha = 1.0; 
        }

        // Size adjustment for depth (Closer = Bigger)
        const size = Math.max(0.5, (1.8 * scale));

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
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
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
    />
  );
}