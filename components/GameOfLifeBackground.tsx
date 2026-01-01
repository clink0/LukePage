'use client';

import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

function GameOfLifePlane() {
  const { size, viewport } = useThree();
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<number[][]>([]);
  const trailsRef = useRef<number[][]>([]);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const timerRef = useRef(0);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    canvasRef.current = canvas;

    const cellSize = 12;
    const cols = Math.ceil(canvas.width / cellSize);
    const rows = Math.ceil(canvas.height / cellSize);
    colsRef.current = cols;
    rowsRef.current = rows;

    const grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
    
    // Helper to draw patterns
    const drawPattern = (pattern: number[][], startX: number, startY: number) => {
      pattern.forEach((row, y) => {
        row.forEach((state, x) => {
          if (grid[startX + x] && grid[startX + x][startY + y] !== undefined) {
            grid[startX + x][startY + y] = state;
          }
        });
      });
    };

    const gosperGun = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    const pulsar = [
      [0,0,1,1,1,0,0,0,1,1,1,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,0,0,0,0,1,0,1,0,0,0,0,1],
      [1,0,0,0,0,1,0,1,0,0,0,0,1],
      [1,0,0,0,0,1,0,1,0,0,0,0,1],
      [0,0,1,1,1,0,0,0,1,1,1,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,0,0,0,1,1,1,0,0],
      [1,0,0,0,0,1,0,1,0,0,0,0,1],
      [1,0,0,0,0,1,0,1,0,0,0,0,1],
      [1,0,0,0,0,1,0,1,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,0,0,0,1,1,1,0,0]
    ];

    drawPattern(gosperGun, 5, 5); 
    drawPattern(pulsar, Math.floor(cols * 0.7), Math.floor(rows * 0.4));

    for(let i=0; i<cols; i++) {
        for(let j=0; j<rows; j++) {
            if(grid[i][j] === 0 && Math.random() < 0.02) grid[i][j] = 1;
        }
    }

    gridRef.current = grid;
    trailsRef.current = new Array(cols).fill(null).map(() => new Array(rows).fill(0));

    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.minFilter = THREE.NearestFilter;
    newTexture.magFilter = THREE.NearestFilter;
    newTexture.colorSpace = THREE.SRGBColorSpace;
    setTexture(newTexture);

    return () => { newTexture.dispose(); };
  }, [size.width, size.height]);

  useFrame((state, delta) => {
    if (!texture || !canvasRef.current) return;
    timerRef.current += delta;
    if (timerRef.current < 0.1) return; 
    timerRef.current = 0;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const grid = gridRef.current;
    const trails = trailsRef.current;
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const nextGrid = grid.map(arr => [...arr]);
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    const cellSize = 12;

    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w);
    gradient.addColorStop(0, '#022c22'); 
    gradient.addColorStop(1, '#000000'); 
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#064e3b'; 
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < w; x += cellSize) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = 0; y < h; y += cellSize) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const state = grid[i][j];
        let trail = trails[i][j];
        if (state === 1) trail = 1.0;
        else trail *= 0.9; 
        trails[i][j] = trail;

        if (trail > 0.05) {
          const alpha = Math.floor(trail * 255).toString(16).padStart(2, '0');
          ctx.fillStyle = `#22c55e${alpha}`; 
          ctx.fillRect(i * cellSize + 1, j * cellSize + 1, cellSize - 2, cellSize - 2);
        }

        let neighbors = 0;
        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            if (x === 0 && y === 0) continue;
            const col = (i + x + cols) % cols;
            const row = (j + y + rows) % rows;
            neighbors += grid[col][row];
          }
        }
        if (state === 0 && neighbors === 3) nextGrid[i][j] = 1;
        else if (state === 1 && (neighbors < 2 || neighbors > 3)) nextGrid[i][j] = 0;
      }
    }
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    for (let y = 0; y < h; y += 4) { ctx.fillRect(0, y, w, 2); }

    gridRef.current = nextGrid;
    texture.needsUpdate = true;
  });

  if (!texture) return null;

  return (
    <mesh position={[0, 0, -2]} scale={[1.2, 1.2, 1]}> 
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function GameOfLifeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 20 }}>
        <GameOfLifePlane />
      </Canvas>
    </div>
  );
}