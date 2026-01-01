'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Text,
  Environment,
  RoundedBox,
  Float
} from '@react-three/drei';

function Dock() {
  const items = [
    { label: 'Work', link: '#work' },
    { label: 'Skills', link: '#skills' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'Contact', link: 'mailto:me@example.com' }
  ];

  return (
    <group position={[0, -3, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* The Glass Bar */}
        <RoundedBox args={[11, 1.5, 0.5]} radius={0.2} smoothness={4}>
          <meshPhysicalMaterial
            transmission={1}      // Glass-like transparency
            roughness={0.1}       // Shiny
            thickness={2}         // Volume for refraction
            ior={1.5}             // Index of Refraction (Glass)
            clearcoat={1}         // Extra shine
            color="#ffffff"
            transparent={true}
            opacity={0.5}         // Ensure it's see-through
          />
        </RoundedBox>

        {/* Navigation Items floating inside */}
        {items.map((item, i) => (
          <NavItem key={i} index={i} total={items.length} label={item.label} link={item.link} />
        ))}
      </Float>
    </group>
  );
}

function NavItem({ index, total, label, link }: { index: number, total: number, label: string, link: string }) {
  const spacing = 2.5;
  const xPos = (index - (total - 1) / 2) * spacing;
  const [hovered, setHovered] = useState(false);

  return (
    <Text
      position={[xPos, 0, 0.3]} // Slightly in front of the glass center
      fontSize={0.35}
      color={hovered ? "#4ade80" : "white"} // Green on hover
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={() => window.location.href = link}
    >
      {label}
    </Text>
  );
}

export default function GlassDock() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 25 }} gl={{ alpha: true }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment is CRITICAL for glass to look real */}
        <Environment preset="city" />

        <Dock />
      </Canvas>
    </div>
  );
}