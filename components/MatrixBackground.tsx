'use client';

import { useRef, useEffect } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIG ---
    let frame = 0;
    const cols = 3;
    const rows = 4;
    let activeCol = 0;
    let activeButton: {c: number, r: number, life: number} | null = null;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // 1. Clear with trailing fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, w, h);

      const spacingX = w / (cols + 1);
      const spacingY = h / (rows + 1);
      const radius = 10;

      if (frame % 10 === 0) activeCol = (activeCol + 1) % cols;

      if (frame % 120 === 0 && !activeButton) {
        activeButton = {
          c: Math.floor(Math.random() * cols),
          r: Math.floor(Math.random() * rows),
          life: 1.0
        };
      }

      for (let c = 0; c < cols; c++) {
        // Draw Scan Line - GHOSTLY (0.02 opacity)
        if (c === activeCol) {
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.02)'; 
          ctx.lineWidth = 40;
          ctx.beginPath();
          ctx.moveTo(spacingX * (c + 1), 0);
          ctx.lineTo(spacingX * (c + 1), h);
          ctx.stroke();
        }

        for (let r = 0; r < rows; r++) {
          const x = spacingX * (c + 1);
          const y = spacingY * (r + 1);

          // Default State - BARELY VISIBLE (0.05 opacity)
          let color = 'rgba(20, 83, 45, 0.05)'; 
          let size = radius;

          // Scan State - VERY SUBTLE GLOW (0.1 opacity)
          if (c === activeCol) {
            color = 'rgba(34, 197, 94, 0.1)'; 
            size = radius * 1.1; 
          }

          // Active Press State - STILL BRIGHT (Contrast)
          if (activeButton && activeButton.c === c && activeButton.r === r) {
            color = '#ffffff'; 
            size = radius * 1.4;
            
            ctx.strokeStyle = `rgba(34, 197, 94, ${activeButton.life})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - (100 * (1 - activeButton.life))); 
            ctx.stroke();
            
            ctx.fillStyle = `rgba(34, 197, 94, ${activeButton.life})`;
            ctx.font = "14px monospace";
            ctx.fillText("0xE0E040BF", x + 20, y);
          }

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (activeButton) {
        activeButton.life -= 0.05;
        if (activeButton.life <= 0) activeButton = null;
      }

      // Circuit Lines - ALMOST INVISIBLE (0.1 opacity)
      ctx.strokeStyle = 'rgba(6, 78, 59, 0.1)'; 
      ctx.lineWidth = 1;
      
      for(let r=0; r<rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, spacingY * (r+1));
        ctx.lineTo(w, spacingY * (r+1));
        ctx.stroke();
      }
      
      for(let c=0; c<cols; c++) {
        ctx.beginPath();
        ctx.moveTo(spacingX * (c+1), 0);
        ctx.lineTo(spacingX * (c+1), h);
        ctx.stroke();
      }

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