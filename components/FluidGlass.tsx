'use client';

import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  Text,
  Environment
} from '@react-three/drei';
import { easing } from 'maath';

// --- 1. Resilient Game of Life Background ---
function GameOfLifePlane() {
  const { size, viewport } = useThree();
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<number[][]>([]);
  const trailsRef = useRef<number[][]>([]); // Keep the cool trails!
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

    // 1. Start with a BLANK grid (instead of random)
    const grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
    
    // 2. Helper to draw patterns
    const drawPattern = (pattern: number[][], startX: number, startY: number) => {
      pattern.forEach((row, y) => {
        row.forEach((state, x) => {
          // Check bounds to prevent crash
          if (grid[startX + x] && grid[startX + x][startY + y] !== undefined) {
            grid[startX + x][startY + y] = state;
          }
        });
      });
    };

    // --- PATTERN LIBRARY ---

    // A. The Gosper Glider Gun (The first known "gun", creates life endlessly)
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

    // B. The Pulsar (A cool exploding star oscillator)
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

    // --- APPLY CONFIGURATIONS ---
    
    // 1. Place a Gosper Gun in the top-left (feeds gliders across the screen)
    drawPattern(gosperGun, 5, 5); 

    // 2. Place a Pulsar near the center-right for visual balance
    drawPattern(pulsar, Math.floor(cols * 0.7), Math.floor(rows * 0.4));

    // 3. Add light random noise elsewhere to keep it alive
    for(let i=0; i<cols; i++) {
        for(let j=0; j<rows; j++) {
            // Avoid overwriting our cool patterns (simple check)
            if(grid[i][j] === 0 && Math.random() < 0.02) { // very sparse noise (2%)
                grid[i][j] = 1;
            }
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
    // ... (Keep the rest of your useFrame logic exactly the same as before!)
    // Just ensure you copy the entire `useFrame` block from the previous working step.
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
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 2);
    }

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

// --- 2. The Glass Dock & Nav Items ---
function DockGroup({ items }: { items: any[] }) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null!);

  const barHeight = 0.4;    
  const thickness = 0.2;    
  const topMargin = 1.0;   
  const sideMargin = 2.0;  
  const maxWidth = 10;     

  const targetWidth = Math.min(viewport.width - (sideMargin * 2), maxWidth);
  const topY = (viewport.height / 2) - (barHeight / 2) - topMargin;

  useFrame((state, delta) => {
    easing.damp3(groupRef.current.position, [0, topY, 2], 0.2, delta);
  });

  return (
    <group ref={groupRef} position={[0, topY + 5, 2]}>
      
      {/* The Glass Bar */}
      <mesh>
        <boxGeometry args={[targetWidth, barHeight, thickness]} />
        <MeshTransmissionMaterial
          thickness={10}              
          roughness={0.15}            
          transmission={1}            
          ior={1.15}                  
          chromaticAberration={0.1}   
          anisotropy={0.01}           
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          background={new THREE.Color('#000000')} 
        />
      </mesh>

      {/* The Navigation Text */}
      <group position={[0, 0.05, thickness / 2 + 0.05]}> 
            {items.map((item, i) => (
                <Text
                key={item.label}
                position={[(i - (items.length - 1) / 2) * (targetWidth / items.length * 0.8), -0.05, 0]} 
                fontSize={0.15} 
                fontWeight={800} 
                color="white"
                anchorX="center"
                anchorY="middle" 
                outlineWidth={0.005} 
                outlineColor="white"
                // --- UPDATE: New Tab Logic Here ---
                onClick={() => {
                  if (item.link.startsWith('http')) {
                    // Open external links in new tab
                    window.open(item.link, '_blank');
                  } else {
                    // Navigate internally
                    window.location.href = item.link;
                  }
                }}
                // ---------------------------------
                onPointerOver={() => { 
                  document.body.style.cursor = 'pointer';
                  document.body.setAttribute('data-hover-3d', 'true');
                }}
                onPointerOut={() => { 
                  document.body.style.cursor = 'auto';
                  document.body.setAttribute('data-hover-3d', 'false');
                }}
                >
                {item.label}
                </Text>
            ))}
 
      </group>

    </group>
  );
}

// --- 3. Main Export ---
export default function FluidGlass() {
const navItems = [
  { label: 'Projects', link: '/projects' }, 
  { label: 'Education', link: '/education' }, 
  { label: 'GitHub', link: 'https://github.com/lukebray' }, // Update with your actual handle!
  { label: 'Contact', link: 'mailto:me@example.com' }
];

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 20 }}>
        
        <GameOfLifePlane />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Environment preset="city" /> 

        <DockGroup items={navItems} />

      </Canvas>
    </div>
  );
}