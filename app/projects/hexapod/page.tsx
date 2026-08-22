'use client';

import Link from 'next/link';
import HexapodBackground from '@/components/HexapodBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

// ─── MEDIA CONFIG ────────────────────────────────────────────
const MWTECH_MODEL_SRC = '/media/hexapod/mwtech-3d-model.png';
const BUILT_ROBOT_SRC  = '/media/hexapod/hexapod-assembled-v2.jpg';
const DUNES_MORNING_SRC = '/media/hexapod/dunes-morning.jpg';
const COURSE_RUN_SRC   = '/media/hexapod/dunes-course-run-v2.jpg';
const TEAM_PHOTO_SRC   = '/media/hexapod/team-photo.jpg';

const FIRST_LEG_VIDEO_ID     = 'dVvIcy9fosA';
const FIRST_STEPS_VIDEO_ID   = '4lkkmAWNKkA';
const FAILED_COURSES_VIDEO_ID = 'yPovUUTLEn4';
const DANCE_VIDEO_ID         = 'fvnBJrQA3wc';
// ─────────────────────────────────────────────────────────────

function MediaFrame({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="rounded-lg overflow-hidden border border-amber-900/40 bg-white p-2 mb-3">
      <img src={src} alt={alt} className="w-full h-auto" />
      {caption && (
        <Mono className="text-amber-300 text-xl block text-center mt-2">{caption}</Mono>
      )}
    </div>
  );
}

function VideoFrame({
  videoId,
  title,
  caption,
}: {
  videoId: string;
  title: string;
  caption: string;
}) {
  return (
    <div>
      <div className="relative w-full max-w-[280px] mx-auto aspect-[9/16] rounded-lg overflow-hidden border border-amber-900/40 bg-neutral-950">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <Mono className="text-amber-300 text-xl block text-center mt-2">{caption}</Mono>
    </div>
  );
}

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
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Mono color="amber">
              REF-03 // HEXAPOD
            </Mono>
            <span className="text-neutral-500">|</span>
            <Mono className="text-neutral-400 text-xl">COLORADO SPACE GRANT ROBOTICS COMPETITION</Mono>
          </div>

          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            Adaptive Hexapod: <br/>
            <span className="text-neutral-300 font-bold tracking-normal">CPG Locomotion Engine</span>
          </Heading>

          <Text className="text-xl md:text-2xl text-amber-300 font-mono leading-relaxed max-w-2xl">
            A six-legged, 18-servo walker built to cross terrain wheels can&apos;t — raced (and danced) at the Great Sand Dunes.
          </Text>

          {/* Stat bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '18',   label: 'DOF' },
              { val: '40Hz', label: 'Control Loop' },
              { val: '9-DOF', label: 'IMU' },
              { val: '2',    label: 'Bump Sensors' },
            ].map(({ val, label }) => (
              <div key={label} className="border border-amber-900/30 bg-neutral-950/60 p-4 rounded">
                <div className="text-2xl font-bold text-amber-400 font-mono">{val}</div>
                <Mono className="text-neutral-300 text-xl mt-1">{label}</Mono>
              </div>
            ))}
          </div>
        </header>

        {/* ── 01 TERRAIN ─────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">01__TERRAIN</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Regolith Problem</Heading>
            <Text className="text-neutral-400 mb-4">
              Loose, granular regolith — the kind NASA&apos;s Lunabotics competition simulates and the kind that covers the Great Sand Dunes — is a nightmare for traditional rovers. Wheels spin out, dig holes, and get stuck.
            </Text>
            <Text className="text-neutral-400">
              To guarantee traversal over that terrain, I abandoned wheels entirely and designed a <strong className="text-white">six-legged hexapod</strong> capable of stepping over loose sand rather than rolling through it. The real proving ground ended up being the <strong className="text-white">Colorado Space Grant Robotics Competition</strong>, held right on the dunes.
            </Text>
          </div>
        </section>

        {/* ── 02 ORIGIN ──────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">02__ORIGIN</Mono>
          </div>
          <div className="space-y-8">
            <div>
              <Heading variant="h3" className="mb-4">Standing on markwtech&apos;s Shoulders</Heading>
              <Text className="text-neutral-400 mb-6">
                Rather than design a hexapod frame from scratch, we started from markwtech&apos;s open-source hexapod design — the 3D model below — and built, wired, and reprogrammed our own unit on top of it, later reworking the servo mounts ourselves (see <Mono variant="code" color="amber">06__MECH</Mono>).
              </Text>
              <MediaFrame
                src={MWTECH_MODEL_SRC}
                alt="markwtech open-source hexapod 3D model — six-legged frame with 18 servos and central microcontroller mount, used as the base design"
                caption="markwtech reference 3D model — our starting point"
              />
            </div>

            <div>
              <Text className="text-neutral-400 mb-4">
                Bring-up went leg by leg. Here&apos;s the first leg wired up and moving under our own firmware, before the rest of the frame was even assembled.
              </Text>
              <VideoFrame
                videoId={FIRST_LEG_VIDEO_ID}
                title="First hexapod leg built and working"
                caption="First leg — built and moving"
              />
            </div>

            <div>
              <Text className="text-neutral-400 mb-4">
                All six legs assembled, wired, and mounted to the central Arduino Mega controller — fully built for the first time.
              </Text>
              <MediaFrame
                src={BUILT_ROBOT_SRC}
                alt="Fully assembled hexapod robot with all six legs, servos, and central Arduino Mega controller, resting on a wooden workbench"
                caption="Fully assembled — all 18 servos wired"
              />
            </div>

            <div>
              <Text className="text-neutral-400 mb-4">
                And its first steps under its own power.
              </Text>
              <VideoFrame
                videoId={FIRST_STEPS_VIDEO_ID}
                title="Hexapod's first steps"
                caption="First steps"
              />
            </div>
          </div>
        </section>

        {/* ── 03 KINEMATICS ──────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">03__KINEMATICS</Mono>
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
              This IK engine is what both the CPG research below and the simpler gait that actually raced
              (05__GAIT) are built on top of.
            </Text>
          </div>
        </section>

        {/* ── 04 CPG ─────────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">04__CPG</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Central Pattern Generator</Heading>
            <div className="bg-neutral-900/50 border border-amber-900/30 p-4 rounded-lg mb-6">
              <Mono color="amber" className="mb-2 block text-xl">// R&D, NOT WHAT RACED</Mono>
              <Text className="text-neutral-300 text-xl">
                This is real, completed work — designed, coded, and validated in simulation — not vaporware.
                But coordinating six independently-driven oscillators in firmware turned out to be its own
                project, and with competition day approaching we shipped a simpler, proven gait instead
                (see <Mono variant="code" color="amber">05__GAIT</Mono>). This section is what we built toward, not what raced.
              </Text>
            </div>
            <Text className="text-neutral-400 mb-6">
              Real insects don't compute gait keyframes — their spinal cord runs a self-organizing
              oscillator network called a <strong className="text-white">Central Pattern Generator</strong>.
              The brain sends one signal ("walk faster"), and the CPG handles all inter-leg coordination
              automatically. I designed the same architecture for this robot.
            </Text>

            {/* CPG equation */}
            <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-lg mb-6 font-mono text-xl overflow-x-auto">
              <Mono color="amber" className="block mb-3 text-xl">// KURAMOTO COUPLED OSCILLATORS</Mono>
              <div className="text-green-400 space-y-1">
                <div>dφᵢ/dt = <span className="text-amber-400">ω</span> + Σⱼ <span className="text-amber-400">Kᵢⱼ</span> · sin(φⱼ − φᵢ − <span className="text-amber-400">θᵢⱼ</span>)</div>
              </div>
              <div className="mt-4 space-y-1 text-neutral-300 text-xl">
                <div><span className="text-neutral-300">φᵢ</span>   — oscillator phase, leg i ∈ [0, 2π)</div>
                <div><span className="text-neutral-300">ω</span>    — natural frequency  →  controls speed + gait type</div>
                <div><span className="text-neutral-300">Kᵢⱼ</span>  — coupling strength between legs i and j</div>
                <div><span className="text-neutral-300">θᵢⱼ</span>  — target phase offset  →  encodes desired gait</div>
              </div>
            </div>

            {/* Gait emergence table */}
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-xl border-collapse">
                <thead>
                  <tr className="border-b border-amber-900/30">
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-300 text-xl">ω (rad/s)</Mono></th>
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-300 text-xl">GAIT</Mono></th>
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-300 text-xl">LEGS DOWN</Mono></th>
                    <th className="text-left py-2"><Mono className="text-neutral-300 text-xl">USE CASE</Mono></th>
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
                      <td className="py-3"><Text className="text-neutral-300 text-xl">{use}</Text></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Text className="text-neutral-400">
              The key insight: gait type is not a mode switch. It is a{' '}
              <strong className="text-white">continuous function of ω</strong>. Change one number,
              and the wave→ripple→tripod transition emerges from the coupling dynamics automatically.
              No state machine. No hard-coded offsets. The fixed tripod gait that actually raced is the
              ω≈5.0 row of this table, hard-coded instead of emergent.
            </Text>
          </div>
        </section>

        {/* ── 05 GAIT & RECOVERY ─────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">05__GAIT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">What Actually Raced</Heading>
            <Text className="text-neutral-400 mb-6">
              With the CPG unfinished, the fielded robot ran a <strong className="text-white">fixed tripod
              gait</strong> adapted from markwtech&apos;s reference code — three legs down at all times,
              simple and proven — driven through our own IK engine. Obstacle handling was a straightforward
              bump-and-recover loop instead of continuous sensor fusion:
            </Text>

            <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-lg mb-6 font-mono text-xl space-y-2">
              <div><span className="text-amber-400">FRONT-LEFT bumper hit</span>  →  turn right  →  resume forward</div>
              <div><span className="text-amber-400">FRONT-RIGHT bumper hit</span> →  turn left   →  resume forward</div>
              <div><span className="text-neutral-300">after N steps forward</span> →  read 9-DOF IMU heading  →  re-correct back to straight</div>
            </div>

            <Text className="text-neutral-400 mb-6">
              That&apos;s it: two front bump switches for obstacles, and the IMU periodically pulling the
              heading back to forward so small drift doesn&apos;t compound over a run.
            </Text>

            <div className="bg-neutral-900/50 border border-amber-900/30 p-4 rounded-lg">
              <Mono color="amber" className="mb-2 block text-xl">// WHAT DIDN&apos;T MAKE IT IN</Mono>
              <Text className="text-neutral-300 text-xl">
                The IR range finders, foot contact switches, and ultrasonic sensors from the original
                CPG-fed sensor suite design were never implemented on the competition robot — there simply
                wasn&apos;t time. Bump switches and the IMU were the entire terrain-sensing budget on race day.
              </Text>
            </div>
          </div>
        </section>

        {/* ── 06 MECHANICAL ──────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">06__MECH</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-2">Frame Replacement</Heading>
            <Mono color="amber" className="text-xl mb-6 block">
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
                <Mono className="text-red-400 text-xl mb-3 block">// BEFORE — FutureTrace kit</Mono>
                <div className="font-mono text-xl text-neutral-300 space-y-1 mb-4">
                  <div>servo ──[bushing]──horn──── leg</div>
                  <div className="text-red-400">{'             ↑ all load here'}</div>
                </div>
                <Text className="text-neutral-300 text-xl">
                  Single cantilevered bushing. Radial load grinds it out in hours.
                  Output drifts ±3–5° from commanded angle. Gait becomes unreliable on sand.
                </Text>
              </div>
              <div className="border border-amber-900/40 rounded-lg p-5 bg-neutral-950/60">
                <Mono className="text-green-400 text-xl mb-3 block">// AFTER — markwtech frame</Mono>
                <div className="font-mono text-xl text-neutral-300 space-y-1 mb-4">
                  <div>servo ──[<span className="text-amber-400">624Z</span>]──horn──── leg ────[<span className="text-amber-400">624Z</span>]── mount</div>
                  <div className="text-green-400">{'      ↑ shared                     ↑ shared'}</div>
                </div>
                <Text className="text-neutral-300 text-xl">
                  Dual 624Z bearings built into every servo mount. Servo outputs pure torque.
                  All radial load carried by the printed frame. Sub-degree positioning throughout.
                </Text>
              </div>
            </div>

            {/* Why markwtech specifically */}
            <div className="bg-neutral-900/50 border border-amber-900/30 p-5 rounded-lg mb-6">
              <Mono color="amber" className="mb-3 block text-xl">// WHY THIS FRAME</Mono>
              <Text className="text-neutral-400 text-xl mb-4">
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
                    <Mono color="amber" className="mt-0.5 flex-shrink-0 w-40 text-right hidden sm:block">{label}</Mono>
                    <Mono color="amber" className="mt-0.5 flex-shrink-0 sm:hidden">{'>'}</Mono>
                    <Text className="text-neutral-300 text-xl">{val}</Text>
                  </li>
                ))}
              </ul>
            </div>

            {/* Print parts list */}
            <div className="border border-neutral-800 rounded-lg p-5 bg-neutral-950/40">
              <Mono className="text-neutral-300 text-xl mb-4 block">// PRINTED PARTS MANIFEST</Mono>
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
                    <Mono className="text-amber-400 text-xl w-14 flex-shrink-0">{qty}</Mono>
                    <Text className="text-neutral-300 text-xl">{part}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 07 TIMING ──────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">07__TIMING</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">Control Loop Budget</Heading>
            <Text className="text-neutral-400 mb-6">
              The Arduino Mega runs at 16MHz with no FPU. This is the budget for the gait that actually
              raced — fixed tripod gait, bump switches, and IMU heading correction — inside the 40Hz
              (25ms) loop.
            </Text>

            {/* Budget bars */}
            <div className="space-y-3 mb-6">
              {[
                { label: 'Tripod step() + 6× IK solve', ms: 3.5,  total: 25, color: 'bg-amber-500' },
                { label: 'Bump switch reads (2× digital)', ms: 0.1,  total: 25, color: 'bg-amber-400' },
                { label: 'IMU read (I²C, 9-DOF)',        ms: 0.5,  total: 25, color: 'bg-amber-300' },
                { label: 'Serial + overhead',            ms: 0.5,  total: 25, color: 'bg-neutral-600' },
                { label: 'Headroom',                     ms: 20.4, total: 25, color: 'bg-neutral-800 border border-neutral-700' },
              ].map(({ label, ms, total, color }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-56 flex-shrink-0">
                    <Mono className="text-neutral-300 text-xl">{label}</Mono>
                  </div>
                  <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all`}
                      style={{ width: `${(ms / total) * 100}%` }}
                    />
                  </div>
                  <Mono className="text-neutral-400 text-xl w-20 text-right">{ms}ms</Mono>
                </div>
              ))}
            </div>

            <Text className="text-neutral-300 text-xl">
              Total used: ~4.6ms of 25ms available. Plenty of headroom left over — most of it would
              have gone to the CPG and the extra sensors in 04__CPG, had there been time to finish them.
            </Text>
          </div>
        </section>

        {/* ── 08 COMPETITION ─────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">08__COMPETITION</Mono>
          </div>
          <div className="space-y-8">
            <div>
              <Heading variant="h3" className="mb-4">Race Day at the Great Sand Dunes</Heading>
              <Text className="text-neutral-400 mb-6">
                The Colorado Space Grant Robotics Competition ran right on the dunes — as close to a
                lunar regolith analog as Colorado gets.
              </Text>
              <MediaFrame
                src={DUNES_MORNING_SRC}
                alt="Morning view of the Great Sand Dunes in Colorado, with storm clouds rolling over the mountains behind the dune field"
                caption="Great Sand Dunes, CO — competition morning"
              />
            </div>

            <div>
              <Text className="text-neutral-400 mb-4">
                The tripod gait and bump-recovery loop got us through the first course clean.
              </Text>
              <MediaFrame
                src={COURSE_RUN_SRC}
                alt="Hexapod robot walking a lane marked with wooden course stakes on the sand dunes, leaving a trail of leg prints in the sand"
                caption="First course — completed"
              />
            </div>

            <div>
              <Text className="text-neutral-400 mb-4">
                We failed every other course. The tripod gait and bump logic that worked on the first
                run didn&apos;t generalize to the rest of the obstacle set.
              </Text>
              <VideoFrame
                videoId={FAILED_COURSES_VIDEO_ID}
                title="Hexapod failing the remaining competition courses"
                caption="The other courses — did not go as well"
              />
            </div>

            <div>
              <Text className="text-neutral-400 mb-4">
                But it can dance. We built a dedicated dance mode, and it was worth every minute.
              </Text>
              <VideoFrame
                videoId={DANCE_VIDEO_ID}
                title="Hexapod dance mode"
                caption="Dance mode — undefeated"
              />
            </div>
          </div>
        </section>

        {/* ── CREDITS ────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="max-w-md">
            <MediaFrame
              src={TEAM_PHOTO_SRC}
              alt="The hexapod team at the Great Sand Dunes: Janga, Cal, Luke, and Haley, from left to right, holding the robot"
              caption="Janga, Cal, Luke, and Haley — at the Great Sand Dunes"
            />
          </div>
          <Mono className="text-neutral-400 mb-4 block">Team</Mono>
          <Text className="text-neutral-300 text-xl mb-2">
            Janga, Cal, Luke Bray, and Haley — Colorado Space Grant Robotics Competition team.
          </Text>
          <Text className="text-neutral-400 text-xl">
            Frame design based on markwtech&apos;s open-source hexapod, adapted from the Trossen PhantomX.
          </Text>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────── */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-300 mb-6 block">System Architecture</Mono>
          <div className="flex flex-wrap gap-3">
            {[
              'C++', 'Python', 'Embedded Systems', 'Inverse Kinematics',
              'Kuramoto Oscillators', 'Control Theory', 'Arduino Mega 2560',
              'Fusion 360', '3D Printing', 'PLA / TPU', 'Obstacle Recovery',
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
