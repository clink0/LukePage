'use client';

import { useRef, useEffect } from 'react';

export default function HexapodBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIGURATION ---
    let frame = 0;
    const gridWidth = 60;  // Wider grid to cover edges
    const gridDepth = 30;  // Deeper draw distance
    const speed = 0.15;    // Slightly faster flight
    
    // Terrain Parameters
    const hillHeight = 50; 
    const noiseScale = 0.25;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // --- TERRAIN FUNCTION ---
    const getTerrainHeight = (x: number, z: number) => {
      // Create rolling dunes
      const y1 = Math.sin(x * 0.2) * Math.cos(z * 0.2) * 2;
      const y2 = Math.cos(x * 0.5 + z * 0.5) * 1;
      return (y1 + y2) * hillHeight;
    };

    // --- PROJECTION FUNCTION ---
    const project = (x: number, y: number, z: number, w: number, h: number) => {
      const fov = 250; 
      
      // ADJUSTMENT 1: Camera Height / Offset
      // We push the terrain 'down' (positive Y) to simulate the camera being high up
      const cameraY = 300; 
      
      // ADJUSTMENT 2: Horizon Line
      // We set the vanishing point to the top 40% of the screen, not the center
      const horizonY = h * 0.4;

      const scale = fov / (fov + z);
      
      const screenX = w / 2 + x * scale * 120; // 120 = grid spacing width
      
      // Apply projection:
      // horizon + (terrain_height + camera_height) * perspective_scale
      const screenY = horizonY + (y + cameraY) * scale;

      return { x: screenX, y: screenY, scale };
    };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const t = frame * speed; 
      
      // Recalculate horizon for background drawing
      const horizonY = h * 0.4; 

      // 1. Clear Background (Sky vs Ground)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#000000'); // Space black top
      bgGrad.addColorStop(0.4, '#000000'); // Horizon line black
      bgGrad.addColorStop(1, '#1a1005'); // Dark amber ground fade
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Draw Terrain
      ctx.lineWidth = 1;

      // Loop back-to-front for correct overlapping (painters algorithm)
      for (let z = gridDepth; z > 0; z--) {
        
        // Fog: Fade out distant lines
        const alpha = Math.max(0, 1 - (z / gridDepth));
        
        // Make lines thicker closer to camera
        ctx.lineWidth = Math.max(0.5, 2 * alpha); 
        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.4})`; // Amber-500

        ctx.beginPath();

        for (let x = -gridWidth / 2; x <= gridWidth / 2; x++) {
          
          // Calculate terrain heights
          // We add 't' to z to simulate forward movement
          const currentZ = z;
          const nextZ = z + 1;
          
          const yCurrent = getTerrainHeight(x * noiseScale, (currentZ - t) * noiseScale);
          const yRight = getTerrainHeight((x + 1) * noiseScale, (currentZ - t) * noiseScale);
          const yNext = getTerrainHeight(x * noiseScale, (nextZ - t) * noiseScale);

          // Project points
          const pCurrent = project(x, yCurrent, currentZ * 40, w, h);
          const pRight = project(x + 1, yRight, currentZ * 40, w, h);
          const pNext = project(x, yNext, nextZ * 40, w, h);

          // DRAW LATERAL LINES (Left to Right)
          if (x < gridWidth / 2) {
            if (pCurrent.scale > 0 && pRight.scale > 0) {
              ctx.moveTo(pCurrent.x, pCurrent.y);
              ctx.lineTo(pRight.x, pRight.y);
            }
          }

          // DRAW LONGITUDINAL LINES (Front to Back)
          if (z < gridDepth) {
             if (pCurrent.scale > 0 && pNext.scale > 0) {
              ctx.moveTo(pCurrent.x, pCurrent.y);
              ctx.lineTo(pNext.x, pNext.y);
            }
          }
        }
        ctx.stroke();
      }

      // 3. Horizon Glow (Atmosphere)
      // Placed exactly at our new horizonY to mask the geometry generation
      const glow = ctx.createLinearGradient(0, horizonY - 50, 0, horizonY + 100);
      glow.addColorStop(0, 'rgba(0,0,0,0)'); // Transparent top
      glow.addColorStop(0.4, 'rgba(245, 158, 11, 0.15)'); // Amber horizon
      glow.addColorStop(1, 'rgba(0,0,0,0)'); // Transparent bottom
      
      ctx.fillStyle = glow;
      ctx.fillRect(0, horizonY - 50, w, 150);

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
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}