'use client';

import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  cotHalf,
  parseTouchstone,
  sphereFromGamma,
  sphereFromZ,
  zFromGamma,
  type Complex,
  type Vec3,
} from '@/lib/smith';

/* ------------------------------------------------------------------ */
/* Palette: retro network-analyzer look                                */
/* ------------------------------------------------------------------ */

const COLOR_R = '#ff2d55'; // constant resistance circles
const COLOR_X = '#4a66ff'; // constant reactance circles
const COLOR_AXIS = '#c46bff'; // r = 0 equator and real axis
const LIFE_RGB: Vec3 = [0.08, 0.62, 0.26];

const DATA_URL = '/smith/cpw-gap.s2p';
const DATA_LABEL = 'CPW SERIES GAP // PLACEHOLDER MODEL';

const GRID_VALUES = [0.1, 0.2, 0.35, 0.5, 0.75, 1, 1.5, 2, 3, 5, 10];
const CURVE_SAMPLES = 260;
const SWEEP_SECONDS = 10;
const COMET_POINTS = 22;

interface Trace {
  label: string;
  color: string;
  pts: Vec3[];
  freqHz: number[];
  gamma: Complex[];
}

/* ------------------------------------------------------------------ */
/* Grid                                                                */
/* ------------------------------------------------------------------ */

function curve(fn: (a: number) => Vec3): Vec3[] {
  const pts: Vec3[] = [[1, 0, 0]];
  for (let k = 1; k < CURVE_SAMPLES; k++) pts.push(fn((2 * Math.PI * k) / CURVE_SAMPLES));
  pts.push([1, 0, 0]);
  return pts;
}
const rCircle = (r: number) => curve((a) => sphereFromZ(r, cotHalf(a)));
const xCircle = (x: number) => curve((a) => sphereFromZ(cotHalf(a), x));

function segments(curves: Vec3[][], color: string, opacity: number) {
  const pos: number[] = [];
  for (const c of curves) for (let k = 0; k < c.length - 1; k++) pos.push(...c[k], ...c[k + 1]);
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.LineSegments(geom, mat);
}

function SmithGrid({ dim }: { dim: boolean }) {
  const objs = useMemo(() => {
    const vals = [...GRID_VALUES, -1, ...GRID_VALUES.map((v) => -v)];
    return [
      segments(vals.map(rCircle), COLOR_R, 0.9),
      segments(vals.map(xCircle), COLOR_X, 1),
      segments([rCircle(0), xCircle(0)], COLOR_AXIS, 1),
    ];
  }, []);

  useEffect(
    () => () =>
      objs.forEach((o) => {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }),
    [objs],
  );

  useFrame((_, delta) => {
    // Ease the grid down while the easter egg is running.
    const target = dim ? 0.35 : 1;
    objs.forEach((o, k) => {
      const m = o.material as THREE.LineBasicMaterial;
      const base = [0.9, 1, 1][k];
      m.opacity += (base * target - m.opacity) * Math.min(1, delta * 3);
    });
  });

  return (
    <>
      {objs.map((o, k) => (
        <primitive key={k} object={o} />
      ))}
      {/* Matched load, Gamma = 0 */}
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Measured / simulated traces                                         */
/* ------------------------------------------------------------------ */

const fmt = (v: number, d = 2) => (v >= 0 ? ' ' : '-') + Math.abs(v).toFixed(d);

function Traces({ traces, hudRef }: { traces: Trace[]; hudRef: RefObject<HTMLPreElement | null> }) {
  const comets = useMemo(
    () =>
      traces.map((t) => {
        const geom = new THREE.BufferGeometry().setFromPoints(t.pts.map((p) => new THREE.Vector3(...p)));
        const mat = new THREE.LineBasicMaterial({
          color: t.color,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        return new THREE.Line(geom, mat);
      }),
    [traces],
  );
  const markers = useRef<(THREE.Mesh | null)[]>([]);
  const lastHud = useRef(-1);

  useEffect(
    () => () =>
      comets.forEach((c) => {
        c.geometry.dispose();
        (c.material as THREE.Material).dispose();
      }),
    [comets],
  );

  useFrame(({ clock }) => {
    const prog = (clock.elapsedTime % SWEEP_SECONDS) / SWEEP_SECONDS;
    let head = 0;
    traces.forEach((t, k) => {
      head = Math.floor(prog * (t.pts.length - 1));
      const start = Math.max(0, head - COMET_POINTS);
      comets[k].geometry.setDrawRange(start, head - start + 1);
      markers.current[k]?.position.set(...t.pts[head]);
    });

    // Marker readout for the first trace.
    const t = traces[0];
    head = Math.floor(prog * (t.pts.length - 1));
    if (hudRef.current && head !== lastHud.current) {
      lastHud.current = head;
      const g = t.gamma[head];
      const mag = Math.hypot(g[0], g[1]);
      const [r, x] = zFromGamma(g);
      const vswr = mag < 1 ? (1 + mag) / (1 - mag) : Infinity;
      hudRef.current.textContent = [
        `MKR  ${(t.freqHz[head] / 1e9).toFixed(3).padStart(7)} GHz`,
        `${t.label}  ${fmt(20 * Math.log10(mag))} dB  ∠${fmt((Math.atan2(g[1], g[0]) * 180) / Math.PI, 1)}°`,
        `Z    ${fmt(50 * r, 1)} ${x < 0 ? '-' : '+'} j${Math.abs(50 * x).toFixed(1)} Ω`,
        `VSWR ${Number.isFinite(vswr) ? vswr.toFixed(2) : '∞'}`,
      ].join('\n');
    }
  });

  return (
    <>
      {traces.map((t) => (
        <Line
          key={`full-${t.label}`}
          points={t.pts}
          color={t.color}
          lineWidth={1.6}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      ))}
      {comets.map((c, k) => (
        <primitive key={`comet-${k}`} object={c} />
      ))}
      {traces.map((t, k) => (
        <mesh
          key={`mkr-${t.label}`}
          ref={(el) => {
            markers.current[k] = el;
          }}
        >
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshBasicMaterial color={t.color} />
        </mesh>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Easter egg: Conway's Game of Life on the (r, x) torus               */
/* ------------------------------------------------------------------ */
/*
 * r and x each run over the whole real line plus infinity, i.e. a circle,
 * so the lattice is a torus with no edges. On the sphere both "infinity"
 * seams collapse onto the open-circuit point, so gliders shrink into it
 * and come back out the other side.
 */

const LIFE_N = 72;
const LIFE_SUB = 2; // each cell is a (SUB+1)^2 vertex patch
const LIFE_INSET = 0.12;
const LIFE_STEP = 0.1;

function LifeLayer({ active }: { active: boolean }) {
  const geom = useMemo(() => {
    const n = LIFE_N * LIFE_N;
    const vpc = (LIFE_SUB + 1) ** 2;
    const pos = new Float32Array(n * vpc * 3);
    const col = new Float32Array(n * vpc * 3);
    const index: number[] = [];
    const d = (2 * Math.PI) / LIFE_N;
    const span = 1 - 2 * LIFE_INSET;

    for (let i = 0; i < LIFE_N; i++) {
      for (let j = 0; j < LIFE_N; j++) {
        const base = (i * LIFE_N + j) * vpc;
        for (let a = 0; a <= LIFE_SUB; a++) {
          for (let b = 0; b <= LIFE_SUB; b++) {
            const psi = (i + LIFE_INSET + (span * a) / LIFE_SUB) * d;
            const th = (j + LIFE_INSET + (span * b) / LIFE_SUB) * d;
            const p = sphereFromZ(cotHalf(psi), cotHalf(th));
            const v = (base + a * (LIFE_SUB + 1) + b) * 3;
            pos[v] = p[0] * 1.003;
            pos[v + 1] = p[1] * 1.003;
            pos[v + 2] = p[2] * 1.003;
          }
        }
        for (let a = 0; a < LIFE_SUB; a++) {
          for (let b = 0; b < LIFE_SUB; b++) {
            const q = base + a * (LIFE_SUB + 1) + b;
            const r = q + LIFE_SUB + 1;
            index.push(q, r, q + 1, q + 1, r, r + 1);
          }
        }
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const colAttr = new THREE.BufferAttribute(col, 3);
    colAttr.setUsage(THREE.DynamicDrawUsage);
    geom.setAttribute('color', colAttr);
    geom.setIndex(index);
    return geom;
  }, []);

  // Mutable simulation state lives in a ref (it changes every step).
  const sim = useRef({
    grid: new Uint8Array(LIFE_N * LIFE_N),
    next: new Uint8Array(LIFE_N * LIFE_N),
    trails: new Float32Array(LIFE_N * LIFE_N),
    timer: 0,
    visible: false,
  });

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    [],
  );
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(
    () => () => {
      geom.dispose();
      material.dispose();
    },
    [geom, material],
  );

  useEffect(() => {
    const s = sim.current;
    if (active) {
      for (let k = 0; k < s.grid.length; k++) s.grid[k] = Math.random() < 0.16 ? 1 : 0;
      s.visible = true;
    } else {
      s.grid.fill(0); // trails fade out on their own
    }
  }, [active]);

  useFrame((_, delta) => {
    const s = sim.current;
    const mesh = meshRef.current;
    if (!s.visible || !mesh) return;
    s.timer += delta;
    if (s.timer < LIFE_STEP) return;
    s.timer = 0;

    const N = LIFE_N;
    const vpc = (LIFE_SUB + 1) ** 2;
    const { grid, next, trails } = s;
    const colAttr = mesh.geometry.getAttribute('color') as THREE.BufferAttribute;
    const col = colAttr.array as Float32Array;
    let alive = 0;
    let lit = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const idx = i * N + j;
        const state = grid[idx];
        alive += state;

        const t = state ? 1 : trails[idx] * 0.88;
        trails[idx] = t < 0.02 ? 0 : t;
        if (trails[idx] > 0) lit++;
        const base = idx * vpc * 3;
        for (let v = 0; v < vpc; v++) {
          col[base + v * 3] = LIFE_RGB[0] * trails[idx];
          col[base + v * 3 + 1] = LIFE_RGB[1] * trails[idx];
          col[base + v * 3 + 2] = LIFE_RGB[2] * trails[idx];
        }

        let n = 0;
        for (let di = -1; di <= 1; di++) {
          const row = ((i + di + N) % N) * N;
          for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue;
            n += grid[row + ((j + dj + N) % N)];
          }
        }
        next[idx] = n === 3 || (state && n === 2) ? 1 : 0;
      }
    }

    s.grid = next;
    s.next = grid;
    colAttr.needsUpdate = true;

    if (active && alive < N * N * 0.02) {
      // Reseed a random patch so it never dies out.
      const ci = Math.floor(Math.random() * N);
      const cj = Math.floor(Math.random() * N);
      for (let a = -6; a <= 6; a++)
        for (let b = -6; b <= 6; b++)
          if (Math.random() < 0.35) s.grid[((ci + a + N) % N) * N + ((cj + b + N) % N)] = 1;
    }
    if (!active && lit === 0) s.visible = false;
  });

  return <mesh ref={meshRef} geometry={geom} material={material} />;
}

/* ------------------------------------------------------------------ */
/* Scroll-driven zoom                                                  */
/* ------------------------------------------------------------------ */

const ZOOM_NEAR = 1.18; // camera distance at the top of the page (just above the surface)
const ZOOM_FAR = 4.0; // whole sphere in view
/** How many viewport heights of scrolling it takes to fully reveal. */
export const REVEAL_SCROLL_VH = 1.5;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function CameraRig({ reveal }: { reveal: RefObject<number> }) {
  const smooth = useRef(reveal.current ?? 0);

  useFrame(({ camera, scene }, delta) => {
    smooth.current += ((reveal.current ?? 0) - smooth.current) * Math.min(1, delta * 6);
    const dist = ZOOM_NEAR + (ZOOM_FAR - ZOOM_NEAR) * easeInOutCubic(smooth.current);
    camera.position.setLength(dist);
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.near = Math.max(0.05, dist - 0.9);
      scene.fog.far = dist + 2.6;
    }
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Scene + HUD                                                         */
/* ------------------------------------------------------------------ */

function buildTraces(text: string): Trace[] {
  const ts = parseTouchstone(text, 2);
  const mk = (label: string, color: string, i: number): Trace => {
    const gamma = ts.data.map((m) => m[i][i]);
    return { label, color, gamma, freqHz: ts.freqHz, pts: gamma.map(sphereFromGamma) };
  };
  return [mk('S11', '#39ff88', 0), mk('S22', '#22e6ff', 1)];
}

export default function SmithSphereBackground() {
  const [traces, setTraces] = useState<Trace[] | null>(null);
  const [life, setLife] = useState(false);
  const hudRef = useRef<HTMLPreElement>(null);
  const reveal = useRef(0);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Scroll position -> reveal in [0, 1]. Exposed to CSS as --reveal so the
  // page's banner and this HUD can fade without React re-renders.
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * REVEAL_SCROLL_VH)));
      reveal.current = p;
      root.style.setProperty('--reveal', p.toFixed(4));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.style.removeProperty('--reveal');
    };
  }, []);

  // On touch screens a one-finger drag should scroll the page, not spin the sphere.
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || !window.matchMedia('(pointer: coarse)').matches) return;
    controls.enableRotate = false;
    controls.domElement?.style.setProperty('touch-action', 'pan-y');
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(DATA_URL)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.statusText))))
      .then((text) => !cancelled && setTraces(buildTraces(text)))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Hidden toggle: type "life".
  useEffect(() => {
    let buf = '';
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf === 'life') {
        buf = '';
        setLife((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [3.4, 0.7, 2.0], fov: 35 }} dpr={[1, 2]}>
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 3.1, 6.6]} />
          <group rotation={[0.25, 0, 0]}>
            <SmithGrid dim={life} />
            {traces && <Traces traces={traces} hudRef={hudRef} />}
            <LifeLayer active={life} />
          </group>
          <CameraRig reveal={reveal} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            enableDamping
            autoRotate
            autoRotateSpeed={0.35}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* CRT scanlines */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.28) 0 2px, transparent 2px 4px)',
        }}
      />

      {/* Scroll hint (only at the very top) */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none font-mono text-[10px] tracking-[0.3em] text-fuchsia-400/70 flex flex-col items-center gap-1"
        style={{ opacity: 'clamp(0, calc(1 - var(--reveal, 0) / 0.08), 1)' }}
      >
        SCROLL
        <span className="animate-bounce">↓</span>
      </div>

      {/* Marker readout: pops in once the whole sphere is in view */}
      <div
        className="fixed bottom-4 left-4 z-50 pointer-events-none font-mono text-[11px] leading-relaxed text-green-500/80 hidden sm:block"
        style={{
          opacity: 'clamp(0, calc((var(--reveal, 1) - 0.65) / 0.3), 1)',
          transform: 'translateY(calc((1 - clamp(0, calc((var(--reveal, 1) - 0.65) / 0.3), 1)) * 16px))',
        }}
      >
        <div className="mb-1 text-[10px] tracking-widest text-fuchsia-400/70">
          {life ? 'LIFE ON A TORUS // r, x ∈ ℝ ∪ {∞}' : `3D SMITH CHART // ${DATA_LABEL}`}
        </div>
        {!life && traces && (
          <>
            <div className="flex gap-4 mb-1 text-[10px] tracking-widest">
              {traces.map((t) => (
                <span key={t.label} style={{ color: t.color }}>
                  ● {t.label}
                </span>
              ))}
            </div>
            <pre ref={hudRef} className="whitespace-pre" />
          </>
        )}
      </div>

      <a
        href={life ? 'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' : 'https://en.wikipedia.org/wiki/Smith_chart'}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 px-3 py-1.5 border border-fuchsia-900/50 bg-black/60 backdrop-blur-sm font-mono text-xs uppercase tracking-widest text-fuchsia-400/80 hover:text-fuchsia-300 hover:border-fuchsia-500 transition-colors"
      >
        {life ? "Conway's Game of Life ↗" : 'Smith chart ↗'}
      </a>
    </>
  );
}
