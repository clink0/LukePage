"use client";

import { useRef, useEffect } from "react";

export default function NotesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const driftRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const cellSize = 48;

    const animate = () => {
      if (!canvas || !ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Fine graph-paper grid, evoking a notebook page.
      ctx.strokeStyle = "rgba(6, 182, 212, 0.10)"; // cyan-500
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // A slow-drifting soft highlight, like a page catching light.
      driftRef.current += 0.15;
      const glowX = width * 0.5 + Math.sin(driftRef.current * 0.01) * width * 0.3;
      const glowY = height * 0.4 + Math.cos(driftRef.current * 0.007) * height * 0.25;

      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.max(width, height) * 0.35);
      gradient.addColorStop(0, "rgba(6, 182, 212, 0.08)");
      gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
}
