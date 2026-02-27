'use client';

import Link from 'next/link';
import HexapodBackground from '@/components/HexapodBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

// ─── MEDIA CONFIG ────────────────────────────────────────────
// Replace these paths with your actual files once you have them.
// For video: drop your .mp4 into /public/media/ and update the path.
// For photo: drop your image into /public/media/ and update the path.
const SIMULATION_VIDEO_SRC = '/media/cpg-sim.mov';
const ROBOT_PHOTO_SRC      = '/media/hexapod-robot.jpg';
const ROBOT_PHOTO_ALT      = 'markwtech 3D-printed hexapod robot with 624Z dual-bearing joints on Martian regolith test surface';
// ─────────────────────────────────────────────────────────────

export default function HexapodPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-amber-500/30">

      {/* 1. Terrain Grid Background */}
      <HexapodBackground />

      {/* 2. Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-amber-500 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href="/projects">
          <Mono className="text-neutral-400 hover:text-amber-500 hover:underline transition-colors">
            // Return to Archives
          </Mono>
        </Link>
      </nav>

      {/* 3. Main Content */}
      <article className="relative z-10 pt-32 pb-20 px-4 max-w-4xl mx-auto">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <header className="mb-24 border-b border-amber-900/50 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <Mono color="amber" className="opacity-70">
              REF-03 // HEXAPOD
            </Mono>
            <span className="text-neutral-700">|</span>
            <Mono className="text-neutral-600 text-xs">NASA LUNABOTICS 2026</Mono>
          </div>

          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            Adaptive Hexapod: <br/>
            <Text as="span" className="text-neutral-500 font-bold">CPG Locomotion Engine</Text>
          </Heading>

          <Text className="text-xl md:text-2xl text-amber-500/90 font-mono leading-relaxed max-w-2xl">
            "Wheels fail where the ground fights back. To explore the lunar surface, we had to reinvent the step."
          </Text>

          {/* Stat bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '18',   label: 'DOF' },
              { val: '40Hz', label: 'Control Loop' },
              { val: '3',    label: 'Emergent Gaits' },
              { val: '6',    label: 'Oscillators' },
            ].map(({ val, label }) => (
              <div key={label} className="border border-amber-900/30 bg-neutral-950/60 p-4 rounded">
                <div className="text-2xl font-bold text-amber-400 font-mono">{val}</div>
                <Mono className="text-neutral-500 text-xs mt-1">{label}</Mono>
              </div>
            ))}
          </div>
        </header>

        {/* ── 01 TERRAIN ─────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">01__TERRAIN</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Regolith Problem</Heading>
            <Text className="text-neutral-400 mb-4">
              NASA's Lunabotics competition challenges engineers to navigate a simulated lunar surface. The loose, granular regolith is a nightmare for traditional rovers — wheels spin out, dig holes, and get stuck.
            </Text>
            <Text className="text-neutral-400">
              To guarantee traversal over boulders and craters, I abandoned wheels entirely. I designed a <strong className="text-white">six-legged hexapod</strong> capable of stepping over obstacles rather than rolling through them. Each foot can probe for stable ground independently — something no wheel can do.
            </Text>
          </div>
        </section>

        {/* ── 02 MEDIA ───────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">02__MEDIA</Mono>
          </div>
          <div className="space-y-6">

            {/* Simulation Video */}
            <div>
              <Mono color="amber" className="mb-3 block text-xs">// CPG SIMULATION — Python / Matplotlib</Mono>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-amber-900/40 bg-neutral-950 group">
                <video
                  src={SIMULATION_VIDEO_SRC}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
                {/* Fallback overlay if video not found */}
                <noscript>
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
                    <Mono className="text-neutral-600">// video not available</Mono>
                  </div>
                </noscript>
                {/* Amber scanline overlay for aesthetics */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(245,158,11,0.015)_2px,rgba(245,158,11,0.015)_4px)] rounded-lg" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="pointer-events-none absolute bottom-3 left-4">
                  <Mono className="text-amber-500/60 text-xs">hexapod_cpg.py — Kuramoto oscillators × 6</Mono>
                </div>
              </div>
            </div>

            {/* Robot Photo */}
            <div>
              <Mono color="amber" className="mb-3 block text-xs">// HARDWARE — markwtech frame // MG996R × 18 // PLA + TPU</Mono>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-amber-900/40 bg-neutral-950">
                <img
                  src={ROBOT_PHOTO_SRC}
                  alt={ROBOT_PHOTO_ALT}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Show placeholder if image not found
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (next) next.style.display = 'flex';
                  }}
                />
                {/* Placeholder shown if image missing */}
                <div
                  className="absolute inset-0 hidden items-center justify-center flex-col gap-3 bg-neutral-950"
                  style={{ display: 'none' }}
                >
                  <div className="w-16 h-16 border-2 border-amber-900/40 rounded-full flex items-center justify-center">
                    <Mono className="text-amber-900/60 text-xl">📷</Mono>
                  </div>
                  <Mono className="text-neutral-700 text-xs">// photo pending — update ROBOT_PHOTO_SRC</Mono>
                </div>
                {/* Scanlines */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(245,158,11,0.015)_2px,rgba(245,158,11,0.015)_4px)] rounded-lg" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="pointer-events-none absolute bottom-3 left-4">
                  <Mono className="text-amber-500/60 text-xs">markwtech frame // 624Z bearings × 18 // 4-40 fasteners // PLA 30% infill</Mono>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 03 KINEMATICS ──────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">03__KINEMATICS</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Inverse Kinematics (IK)</Heading>

            <div className="bg-neutral-900/50 border border-amber-900/30 p-6 rounded-lg mb-8">
              <Mono color="amber" className="mb-2 block">// THE MATH</Mono>
              <Text className="text-lg text-white">
                Moving a leg isn't just "move servo A." To place a foot at exactly{' '}
                <Mono variant="code" color="amber">[x, y, z]</Mono>, you must solve a system
                of non-linear equations — the Law of Cosines applied through three joint planes
                simultaneously — to determine coxa, femur, and tibia angles.
              </Text>
            </div>

            <Text className="text-neutral-400 mb-4">
              I implemented a custom <strong className="text-white">geometric IK engine</strong> in C++,
              validated to sub-millimeter round-trip accuracy across all six legs. It runs in under 0.6ms
              per leg on the Arduino Mega — fast enough to solve all 18 joints within the 25ms control
              budget at 40Hz.
            </Text>
            <Text className="text-neutral-400">
              The same IK math was independently ported to Python for simulation, where phase-plane
              visualization confirmed the geometric approach matched the firmware to floating-point precision.
            </Text>
          </div>
        </section>

        {/* ── 04 CPG ─────────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">04__CPG</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Central Pattern Generator</Heading>
            <Text className="text-neutral-400 mb-6">
              Real insects don't compute gait keyframes — their spinal cord runs a self-organizing
              oscillator network called a <strong className="text-white">Central Pattern Generator</strong>.
              The brain sends one signal ("walk faster"), and the CPG handles all inter-leg coordination
              automatically. I implemented the same architecture.
            </Text>

            {/* CPG equation */}
            <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
              <Mono color="amber" className="block mb-3 text-xs">// KURAMOTO COUPLED OSCILLATORS</Mono>
              <div className="text-green-400 space-y-1">
                <div>dφᵢ/dt = <span className="text-amber-400">ω</span> + Σⱼ <span className="text-amber-400">Kᵢⱼ</span> · sin(φⱼ − φᵢ − <span className="text-amber-400">θᵢⱼ</span>)</div>
              </div>
              <div className="mt-4 space-y-1 text-neutral-500 text-xs">
                <div><span className="text-neutral-300">φᵢ</span>   — oscillator phase, leg i ∈ [0, 2π)</div>
                <div><span className="text-neutral-300">ω</span>    — natural frequency  →  controls speed + gait type</div>
                <div><span className="text-neutral-300">Kᵢⱼ</span>  — coupling strength between legs i and j</div>
                <div><span className="text-neutral-300">θᵢⱼ</span>  — target phase offset  →  encodes desired gait</div>
              </div>
            </div>

            {/* Gait emergence table */}
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-amber-900/30">
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-500 text-xs">ω (rad/s)</Mono></th>
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-500 text-xs">GAIT</Mono></th>
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-500 text-xs">LEGS DOWN</Mono></th>
                    <th className="text-left py-2"><Mono className="text-neutral-500 text-xs">USE CASE</Mono></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {[
                    { omega: '~1.0', gait: 'Wave',   legs: '5', use: 'Rocks, slopes, max stability' },
                    { omega: '~3.0', gait: 'Ripple', legs: '4', use: 'General traversal, sand' },
                    { omega: '~5.0', gait: 'Tripod', legs: '3', use: 'Speed, flat cleared ground' },
                  ].map(({ omega, gait, legs, use }) => (
                    <tr key={gait} className="group">
                      <td className="py-3 pr-6"><Mono className="text-amber-400">{omega}</Mono></td>
                      <td className="py-3 pr-6"><Text className="text-white font-semibold">{gait}</Text></td>
                      <td className="py-3 pr-6"><Mono className="text-neutral-300">{legs}</Mono></td>
                      <td className="py-3"><Text className="text-neutral-500 text-sm">{use}</Text></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Text className="text-neutral-400">
              The key insight: gait type is not a mode switch. It is a{' '}
              <strong className="text-white">continuous function of ω</strong>. Change one number,
              and the wave→ripple→tripod transition emerges from the coupling dynamics automatically.
              No state machine. No hard-coded offsets.
            </Text>
          </div>
        </section>

        {/* ── 05 SENSOR SUITE ────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">05__SENSORS</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">Terrain Sensor Suite</Heading>
            <Text className="text-neutral-400 mb-8">
              Each sensor feeds directly back into the CPG parameters — not a simple stop/turn
              interrupt, but a continuous modulation of oscillator frequency, duty factor, and
              step height. The robot's gait adapts in real time to what it's actually experiencing.
            </Text>
            <div className="space-y-4">
              {[
                {
                  id: 'S1',
                  name: 'MPU-6050 IMU',
                  target: 'Sand / Tilt',
                  desc: 'Body roll, pitch, and yaw at 40Hz. Feeds body height compensation and asymmetric stance adjustments on inclines.',
                  integration: 'ω reduction on tilt > 8°',
                  cost: '~$5',
                },
                {
                  id: 'S2',
                  name: '6× Foot Contact Switches',
                  target: 'Sand / Sinking',
                  desc: 'Microswitches at each tibia tip trigger CPG phase-reset on touchdown — the robot re-syncs gait to actual ground contact rather than predicted contact. Biological insects use the same mechanism.',
                  integration: 'Phase reset: φᵢ → 0 on contact',
                  cost: '~$5',
                },
                {
                  id: 'S3',
                  name: '3× IR Range (GP2Y0A21)',
                  target: 'Holes / Voids',
                  desc: 'Front-facing downward IR sensors detect sudden loss of ground return — indicating a crater or drop edge. Triggers hard stop and reroute.',
                  integration: 'Hard stop → reverse → turn',
                  cost: '~$9',
                },
                {
                  id: 'S4',
                  name: '3× HC-SR04 Ultrasonic',
                  target: 'Rocks / Obstacles',
                  desc: 'Forward-facing sonar detects surface obstacles at 2–400cm. Detection increases ω (wave gait) and STEP_HEIGHT for clearance, resolving smaller rocks without stopping.',
                  integration: 'ω ↑ + step height ↑ on detection',
                  cost: '~$5',
                },
              ].map(({ id, name, target, desc, integration, cost }) => (
                <div
                  key={id}
                  className="border border-neutral-800 hover:border-amber-900/60 bg-neutral-950/40 hover:bg-neutral-900/40 rounded-lg p-5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Mono color="amber" className="text-xs opacity-60">{id}</Mono>
                      <Text className="text-white font-semibold">{name}</Text>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs border border-amber-900/40 text-amber-600/70 px-2 py-0.5 rounded font-mono">
                        {target}
                      </span>
                      <Mono className="text-neutral-600 text-xs">{cost}</Mono>
                    </div>
                  </div>
                  <Text className="text-neutral-400 text-sm mb-3">{desc}</Text>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                    <Mono className="text-neutral-600 text-xs">{integration}</Mono>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MECHANICAL ──────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">06__MECH</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-2">Frame Replacement</Heading>
            <Mono color="amber" className="text-xs mb-6 block">
              FutureTrace kit → markwtech 3D-printed frame
            </Mono>

            {/* The problem */}
            <Text className="text-neutral-400 mb-6">
              The original FutureTrace kit mounts every servo as a cantilever — the output shaft
              is the only structural connection between the servo body and the driven leg segment.
              Every stance phase redirects the robot's full weight radially through that shaft.
              The stock plastic bushing grinds out within hours. The shaft deflects under load,
              and that deflection introduces positioning error that compounds through the entire IK chain.
              Cheap servos fighting shear loads they were never designed for.
            </Text>

            {/* Before / After */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="border border-neutral-800 rounded-lg p-5 bg-neutral-950/60">
                <Mono className="text-red-500/70 text-xs mb-3 block">// BEFORE — FutureTrace kit</Mono>
                <div className="font-mono text-xs text-neutral-500 space-y-1 mb-4">
                  <div>servo ──[bushing]──horn──── leg</div>
                  <div className="text-red-500/50">{'             ↑ all load here'}</div>
                </div>
                <Text className="text-neutral-500 text-sm">
                  Single cantilevered bushing. Radial load grinds it out in hours.
                  Output drifts ±3–5° from commanded angle. Gait becomes unreliable on sand.
                </Text>
              </div>
              <div className="border border-amber-900/40 rounded-lg p-5 bg-neutral-950/60">
                <Mono className="text-green-500/70 text-xs mb-3 block">// AFTER — markwtech frame</Mono>
                <div className="font-mono text-xs text-neutral-500 space-y-1 mb-4">
                  <div>servo ──[<span className="text-amber-400">624Z</span>]──horn──── leg ────[<span className="text-amber-400">624Z</span>]── mount</div>
                  <div className="text-green-500/50">{'      ↑ shared                     ↑ shared'}</div>
                </div>
                <Text className="text-neutral-500 text-sm">
                  Dual 624Z bearings built into every servo mount. Servo outputs pure torque.
                  All radial load carried by the printed frame. Sub-degree positioning throughout.
                </Text>
              </div>
            </div>

            {/* Why markwtech specifically */}
            <div className="bg-neutral-900/50 border border-amber-900/30 p-5 rounded-lg mb-6">
              <Mono color="amber" className="mb-3 block text-xs">// WHY THIS FRAME</Mono>
              <Text className="text-neutral-400 text-sm mb-4">
                The markwtech hexapod (inspired by the Trossen PhantomX, designed for MG996R-class
                servos) solves the shear problem at the design level — not as a retrofit. Every one
                of the 18 servo mounts has a press-fit 624Z bearing seat on the outboard side,
                machined into the print geometry itself. The bearings are structural from day one.
              </Text>
              <ul className="space-y-2">
                {[
                  { label: 'Frame material', val: 'PLA, 30% infill — printed hot (210°C) for layer adhesion' },
                  { label: 'Foot bumpers',   val: 'TPU, 10% infill — compliant, grip-enhancing on regolith' },
                  { label: 'Bearings',       val: '624Z (4mm ID × 13mm OD × 5mm) × 18 — one per servo mount' },
                  { label: 'Fasteners',      val: '4-40 machine screws + nuts, 3/8″ / 1/2″ / 5/8″ lengths' },
                  { label: 'Servos',         val: 'MG996R clone, 11 kg·cm — same pinout as existing firmware' },
                  { label: 'Files',          val: 'Thingiverse #3463845 — Fusion 360 source + print-ready STLs' },
                ].map(({ label, val }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Mono color="amber" className="mt-0.5 flex-shrink-0 w-28 text-right hidden sm:block">{label}</Mono>
                    <Mono color="amber" className="mt-0.5 flex-shrink-0 sm:hidden">{'>'}</Mono>
                    <Text className="text-neutral-300 text-sm">{val}</Text>
                  </li>
                ))}
              </ul>
            </div>

            {/* Print parts list */}
            <div className="border border-neutral-800 rounded-lg p-5 bg-neutral-950/40">
              <Mono className="text-neutral-500 text-xs mb-4 block">// PRINTED PARTS MANIFEST</Mono>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                {[
                  ['1×', 'Body bottom plate'],
                  ['1×', 'Body top plate'],
                  ['6×', 'Body risers'],
                  ['18×', 'Servo mounts (bearing seat)'],
                  ['12×', 'Femur brackets'],
                  ['12×', 'Femur bracket end caps'],
                  ['6×', 'Tibia brackets'],
                  ['6×', 'Tibia bracket end caps'],
                  ['6×', 'Tibia base plates'],
                  ['6×', 'Tibia foot plates'],
                  ['6×', 'Tibia sides 1 + 2'],
                  ['6×', 'Tibia spacer tubes'],
                  ['6×', 'TPU foot bumpers'],
                  ['6×', 'Wire guides'],
                ].map(([qty, part]) => (
                  <div key={part} className="flex items-baseline gap-2">
                    <Mono className="text-amber-600/60 text-xs w-6 flex-shrink-0">{qty}</Mono>
                    <Text className="text-neutral-500 text-xs">{part}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 07 TIMING ──────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">07__TIMING</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">Control Loop Budget</Heading>
            <Text className="text-neutral-400 mb-6">
              The Arduino Mega runs at 16MHz with no FPU. Every millisecond is accounted for.
              The 40Hz loop (25ms period) is divided across tasks in strict priority order.
            </Text>

            {/* Budget bars */}
            <div className="space-y-3 mb-6">
              {[
                { label: 'CPG step() — 11× sin()', ms: 2.5,  total: 25, color: 'bg-amber-500' },
                { label: '6× IK solve + servo write', ms: 3.5,  total: 25, color: 'bg-amber-400' },
                { label: 'IMU read (I²C)',            ms: 0.5,  total: 25, color: 'bg-amber-300' },
                { label: '6× foot switch read',       ms: 0.1,  total: 25, color: 'bg-amber-200' },
                { label: 'Ultrasonic (1× per frame)', ms: 1.0,  total: 25, color: 'bg-amber-100' },
                { label: 'IR sensors (3× analog)',    ms: 0.3,  total: 25, color: 'bg-yellow-200' },
                { label: 'Serial + overhead',         ms: 0.5,  total: 25, color: 'bg-neutral-600' },
                { label: 'Headroom',                  ms: 16.6, total: 25, color: 'bg-neutral-800 border border-neutral-700' },
              ].map(({ label, ms, total, color }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-44 flex-shrink-0">
                    <Mono className="text-neutral-500 text-xs">{label}</Mono>
                  </div>
                  <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all`}
                      style={{ width: `${(ms / total) * 100}%` }}
                    />
                  </div>
                  <Mono className="text-neutral-400 text-xs w-10 text-right">{ms}ms</Mono>
                </div>
              ))}
            </div>

            <Text className="text-neutral-500 text-sm">
              Total used: ~8.4ms of 25ms available. 16.6ms headroom reserved for sensor
              fusion algorithms and future expansion.
            </Text>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────── */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-500 mb-6 block">System Architecture</Mono>
          <div className="flex flex-wrap gap-3">
            {[
              'C++', 'Python', 'Embedded Systems', 'Inverse Kinematics',
              'Kuramoto Oscillators', 'Control Theory', 'Arduino Mega 2560',
              'Fusion 360', '3D Printing', 'PLA / TPU', 'Sensor Fusion',
            ].map((tech) => (
              <Mono
                key={tech}
                variant="tag"
                className="bg-neutral-900 text-neutral-300 border-neutral-700 rounded-full px-3"
              >
                {tech}
              </Mono>
            ))}
          </div>
        </footer>

      </article>
    </main>
  );
}