'use client';

import Link from 'next/link';
import LidarBackground from '@/components/LidarBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

// ─── MEDIA CONFIG ────────────────────────────────────────────
// All assets below were extracted directly from the team's final
// review deck (Fort Lewis College, Dec 2024) — real photos of the
// hardware, real diagrams, and real result plots, not stock art.
const CONCEPT_OPS_SRC     = '/media/laser/concept-of-operations.png';
const TEST_SETUP_SRC      = '/media/laser/test-setup.png';
const SOFTWARE_DIAGRAM_SRC = '/media/laser/software-diagram.png';
const UNPROCESSED_PLY_SRC  = '/media/laser/unprocessed-ply.png';
const PCD_UNFILTERED_SRC   = '/media/laser/pcd-unfiltered.png';
const PCD_FILTERED_SRC     = '/media/laser/pcd-filtered.png';
const PCD_ANIMATION_SRC    = '/media/laser/pcd-animation.png';
const RESULTS_WIDTH_SRC    = '/media/laser/results-width.png';
const RESULTS_RPM_SRC      = '/media/laser/results-rpm.png';
const TEAM_PHOTO_SRC       = '/media/laser/team-thankyou.png';
const DEMO_VIDEO_ID        = '3hmqK6G04ww';
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
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-rose-900/40 bg-neutral-950">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain bg-white"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
          const next = e.currentTarget.nextElementSibling as HTMLElement | null;
          if (next) next.style.display = 'flex';
        }}
      />
      <div
        className="absolute inset-0 hidden items-center justify-center flex-col gap-3 bg-neutral-950"
        style={{ display: 'none' }}
      >
        <div className="w-16 h-16 border-2 border-rose-900/40 rounded-full flex items-center justify-center">
          <Mono className="text-rose-900/60 text-xl">📷</Mono>
        </div>
        <Mono className="text-neutral-700 text-xs">// image pending</Mono>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(244,63,94,0.015)_2px,rgba(244,63,94,0.015)_4px)] rounded-lg" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-3 left-4">
        <Mono className="text-rose-500/70 text-xs">{caption}</Mono>
      </div>
    </div>
  );
}

export default function LaserPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-rose-500/30">

      {/* 1. Background */}
      <LidarBackground />

      {/* 2. Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-rose-500 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href="/projects">
          <Mono className="text-neutral-400 hover:text-rose-500 hover:underline transition-colors">
            // Return to Archives
          </Mono>
        </Link>
      </nav>

      {/* 3. Main Content */}
      <article className="relative z-10 pt-32 pb-20 px-4 max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-24 border-b border-rose-900/50 pb-12">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Mono color="red" className="opacity-70">
              REF-05 // LASER
            </Mono>
            <span className="text-neutral-700">|</span>
            <Mono className="text-neutral-600 text-xs">FORT LEWIS COLLEGE // CAPSTONE, DEC 2024</Mono>
            <span className="text-neutral-700">|</span>
            <Mono className="text-neutral-600 text-xs">CUSTOMER: CLEAN SPACE LLC</Mono>
          </div>

          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            LiDAR Orbital <br/>
            <Text as="span" className="text-neutral-500 font-bold">Debris Characterization</Text>
          </Heading>

          <Text className="text-xl md:text-2xl text-rose-400/90 font-mono leading-relaxed max-w-2xl">
            Detecting and characterizing space debris spin-rates using high-resolution point cloud analysis.
          </Text>

          {/* Stat bar — honest results, see 05__RESULTS below */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '~2%',   label: 'Width Error' },
              { val: '~16%',  label: 'Depth Error' },
              { val: '~13%',  label: 'RPM Error' },
              { val: '~25%',  label: 'Height Error' },
            ].map(({ val, label }) => (
              <div key={label} className="border border-rose-900/30 bg-neutral-950/60 p-4 rounded">
                <div className="text-2xl font-bold text-rose-400 font-mono">{val}</div>
                <Mono className="text-neutral-500 text-xs mt-1">{label}</Mono>
              </div>
            ))}
          </div>
        </header>

        {/* 01 — The Problem */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">01__ORBIT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Kessler Syndrome</Heading>
            <Text className="text-neutral-400 mb-4">
              With over 4,000 active satellites and countless fragments of defunct rockets in orbit, space debris poses a catastrophic risk to future missions. To capture or de-orbit this debris, we first need to know <i className="text-white">exactly</i> how it is moving.
            </Text>
            <Text className="text-neutral-400 mb-6">
              Our customer, <strong className="text-white">Clean Space LLC</strong>, is developing a debris-capture mission and needed a way to measure a target&apos;s dimensions and rotational velocity before attempting to grapple it. LASER — <i>LiDAR And Sensor Engineering Researchers</i> — built a LiDAR-based system to derive those metrics and produce a 3D rendering of the debris for use in a subsequent capture mission.
            </Text>

            <div className="bg-neutral-900/50 border border-rose-900/30 p-5 rounded-lg mb-6">
              <Mono color="red" className="mb-3 block text-xs">// CONCEPT OF OPERATIONS</Mono>
              <MediaFrame
                src={CONCEPT_OPS_SRC}
                alt="Concept of operations diagram: LiDAR captures data on rotating space debris, data is stored and sent to a processing system, which converts, visualizes, and estimates rotation and size."
                caption="Fig. 2 — Concept of Operations"
              />
            </div>

            <Text className="text-neutral-400">
              Capturing a tumbling object requires precise knowledge of its <strong className="text-white">rotational velocity (RPM)</strong> and physical dimensions. The LASER project utilizes LiDAR to derive these metrics in near real-time.
            </Text>
          </div>
        </section>

        {/* 02 — The Hardware */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">02__SENSOR</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Hardware Architecture</Heading>
            <Text className="text-neutral-400 mb-6">
              The system integrates commercial off-the-shelf components with a custom-built, motorized test stand to create a cost-effective sensing and validation platform.
            </Text>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-neutral-900/50 border border-rose-900/30 p-4 rounded">
                <Mono color="red" className="mb-2 block">OPTICS</Mono>
                <Text variant="small" className="text-neutral-400">
                  <strong className="text-white">Intel RealSense L515</strong> solid-state LiDAR camera capturing depth data at ~30 FPS.
                </Text>
              </div>
              <div className="bg-neutral-900/50 border border-rose-900/30 p-4 rounded">
                <Mono color="red" className="mb-2 block">COMPUTE</Mono>
                <Text variant="small" className="text-neutral-400">
                  <strong className="text-white">Raspberry Pi 5 (8GB)</strong> + 512GB SSD handles data acquisition, .bag recording, and PLY conversion.
                </Text>
              </div>
              <div className="bg-neutral-900/50 border border-rose-900/30 p-4 rounded">
                <Mono color="red" className="mb-2 block">TEST STAND</Mono>
                <Text variant="small" className="text-neutral-400">
                  Custom plastic/steel/aluminum rig, adjustable rotation up to <strong className="text-white">~5 RPM</strong>, 12.07 × 26.6 cm base.
                </Text>
              </div>
            </div>

            <MediaFrame src={TEST_SETUP_SRC} alt="Labeled recording and testing setup: LiDAR Camera on tripod, Raspberry Pi, and rotating Test Stand with triangular test object" caption="Fig. 9 — Recording / Testing Setup" />
          </div>
        </section>

        {/* 03 — The Algorithms */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">03__ALGORITHM</Mono>
          </div>

          <div className="min-w-0">
            <Heading variant="h3" className="mb-4">Point Cloud Processing</Heading>
            <Text className="text-neutral-400 mb-6">
              Raw LiDAR data is noisy. The pipeline runs <Mono variant="code" color="red">rs-data-capture</Mono> to record a 15-second <Mono variant="code" color="red">.bag</Mono> (~424 frames), then a custom <Mono variant="code" color="red">ConversionScript.sh</Mono> converts it to per-frame <Mono variant="code" color="red">.ply</Mono> + <Mono variant="code" color="red">metadata.txt</Mono> using the RealSense library.
            </Text>

            <Text className="text-neutral-400 mb-4">
              Each frame is then filtered with <strong className="text-white">Open3D</strong>: a dynamic Z-axis filter, statistical outlier removal, radius outlier removal, and Euclidean clustering isolate the object from background noise.
            </Text>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <MediaFrame src={PCD_UNFILTERED_SRC} alt="Unfiltered point cloud, dominated by background wall noise" caption="Fig. 7 — Unfiltered PCD" />
              <MediaFrame src={PCD_FILTERED_SRC} alt="Filtered point cloud isolating the triangular test object" caption="Fig. 8 — Filtered PCD" />
            </div>

            {/* Code Block: RANSAC Plane Fitting */}
            <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto border border-neutral-800 mb-6 shadow-xl">
              <pre className="font-mono text-sm text-neutral-300 leading-relaxed">
{`def get_plane_normal(pcd):
    # Segment the largest plane using RANSAC
    plane_model, inliers = pcd.segment_plane(
        distance_threshold=0.01,
        ransac_n=3,
        num_iterations=1000
    )

    # Extract normal vector [a, b, c]
    [a, b, c, d] = plane_model
    normal_vector = np.array([a, b, c])

    # Normalize
    return normal_vector / np.linalg.norm(normal_vector)`}
              </pre>
            </div>

            <Text className="text-neutral-400 mb-4">
              For <strong className="text-white">dimensions</strong>, an oriented bounding box is fit to the filtered cloud, then scaled using a linear regression against known test distances:
            </Text>

            <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg mb-6 font-mono text-sm text-center">
              <Mono color="red">Scaling Factor = &minus;0.0287 &times; Depth + 0.8376</Mono>
            </div>

            <Text className="text-neutral-400 mb-4">
              For <strong className="text-white">rotational velocity</strong>, the normal vector of the object&apos;s largest RANSAC-fit plane is tracked across consecutive frames — the change in phase angle (Δθ) over the change in timestamp (Δt) gives angular velocity, converted to RPM.
            </Text>

            <div className="mb-2">
              <MediaFrame src={PCD_ANIMATION_SRC} alt="Animated point cloud frame of the cleaned, filtered triangular test object" caption="Fig. 20 — Cleaned PCD Frame" />
            </div>
          </div>
        </section>

        {/* 04 — Testing */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">04__TESTING</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Ground Truth &amp; Validation</Heading>
            <Text className="text-neutral-400 mb-4">
              The test object&apos;s true dimensions were measured with a caliper (±0.002 cm): <strong className="text-white">15.134 × 11.307 × 2.540 cm</strong> (W × H × D). Its rotation was held constant at a measured <strong className="text-white">5.22 RPM</strong>, verified independently by filming the stand at 59.96 fps on an iPhone (±0.0083 RPM error).
            </Text>
            <Text className="text-neutral-400 mb-6">
              Below is the cleaned point cloud of that same test object spinning at 5.22 RPM, rendered from the filtered .ply sequence.
            </Text>

            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-rose-900/40 bg-neutral-950 mb-3">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}`}
                title="LASER — Point cloud animation of the spinning triangular test object"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <Mono className="text-rose-500/70 text-xs">// PCD animation — cleaned triangular test object spinning at 5.22 RPM</Mono>
          </div>
        </section>

        {/* 05 — Results */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">05__RESULTS</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Measured vs. Truth</Heading>
            <Text className="text-neutral-400 mb-6">
              The requirements called for ≤5% dimension and RPM error at 90% likelihood. Across n=9&ndash;10 trials, the system met that bar on width but fell short on height, depth, and RPM — an honest result, not a polished one.
            </Text>

            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-rose-900/30">
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-500 text-xs">METRIC</Mono></th>
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-500 text-xs">TRUTH</Mono></th>
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-500 text-xs">AVG DEVIATION</Mono></th>
                    <th className="text-left py-2 pr-6"><Mono className="text-neutral-500 text-xs">% ERROR</Mono></th>
                    <th className="text-left py-2"><Mono className="text-neutral-500 text-xs">REQ. (≤5%)</Mono></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {[
                    { metric: 'Width',  truth: '15.1 cm',  dev: '0.31 cm', err: '~2.1%',  met: true },
                    { metric: 'Height', truth: '11.3 cm',  dev: '2.77 cm', err: '~24.5%', met: false },
                    { metric: 'Depth',  truth: '2.54 cm',  dev: '0.41 cm', err: '~16.1%', met: false },
                    { metric: 'RPM',    truth: '5.22 rpm', dev: '0.70 rpm', err: '~13.4%', met: false },
                  ].map(({ metric, truth, dev, err, met }) => (
                    <tr key={metric}>
                      <td className="py-3 pr-6"><Text className="text-white font-semibold">{metric}</Text></td>
                      <td className="py-3 pr-6"><Mono className="text-neutral-300">{truth}</Mono></td>
                      <td className="py-3 pr-6"><Mono className="text-neutral-300">{dev}</Mono></td>
                      <td className="py-3 pr-6">
                        <span className={`font-mono text-sm uppercase tracking-widest ${met ? 'text-green-500' : 'text-red-500'}`}>{err}</span>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${met ? 'border-green-900/50 text-green-500 bg-green-900/20' : 'border-red-900/50 text-red-500 bg-red-900/20'}`}>
                          {met ? 'MET' : 'MISSED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg overflow-hidden border border-rose-900/40 bg-white p-2">
                <img src={RESULTS_WIDTH_SRC} alt="Graph of measured width vs. 15.1cm truth value, n=10" className="w-full h-auto" />
              </div>
              <div className="rounded-lg overflow-hidden border border-rose-900/40 bg-white p-2">
                <img src={RESULTS_RPM_SRC} alt="Graph of measured rotational velocity vs. 5.22 rpm truth value, n=9" className="w-full h-auto" />
              </div>
            </div>

            <Text className="text-neutral-400">
              Width — measured off the object&apos;s widest, most consistently-visible face — held tightly to truth. Height and depth suffered from the test stand itself bleeding into the bounding box, and RPM estimation degraded sharply near edge-on frames where the tracked plane briefly vanished (see the raw per-frame spikes in <Mono variant="code" color="red">Fig. 21</Mono>).
            </Text>
          </div>
        </section>

        {/* 06 — Reflection & Future Work */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">06__REFLECTION</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-6">Challenges &amp; Future Work</Heading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <Mono color="red" className="mb-3 block text-xs">// HARDWARE CHALLENGES</Mono>
                <ul className="space-y-2">
                  {[
                    '3D-printing tolerances on the test object',
                    'Constant redesign of the stand legs',
                    'Achieving smooth, constant rotation',
                    'Motor swaps for driver compatibility',
                    'Isolating the LiDAR from background clutter',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                      <Text className="text-neutral-400 text-sm">{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Mono color="red" className="mb-3 block text-xs">// SOFTWARE CHALLENGES</Mono>
                <ul className="space-y-2">
                  {[
                    'RealSense library quirks and edge cases',
                    'Deriving the depth-to-scaling-factor relationship',
                    'Accurately isolating RPM from noisy frames',
                    'Tuning the PCD filtering chain',
                    'Building the C++ Point Cloud Library toolchain',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                      <Text className="text-neutral-400 text-sm">{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Improved Accuracy',
                  body: 'Better edge-case handling and filtering, a higher-accuracy camera, a refined test setup, and dual-camera splicing to eliminate blind spots.',
                },
                {
                  title: 'Faster Data Pipeline',
                  body: '.bag → .ply conversion currently takes ~20 min per 1 min recorded, plus ~15 min to transfer. A direct USB-to-USB link and leaner output formats could roughly halve both.',
                },
                {
                  title: 'Better Test Simulation',
                  body: 'A larger, black 4×4×2 m test volume (the current background is too close and the stand itself gets picked up in the size estimate) — explored magnetic levitation or a plastic-thread suspension to remove the stand from frame entirely.',
                },
                {
                  title: 'Broader Testing Scope',
                  body: 'Only the one extruded triangle has been tested so far. Next: more basic geometric shapes, more realistic "debris," and a CV pipeline to dynamically detect and isolate the object of interest instead of a fixed stand.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="border border-neutral-800 rounded-lg p-4">
                  <Text className="text-white font-semibold mb-1">{title}</Text>
                  <Text className="text-neutral-500 text-sm">{body}</Text>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team photo + Credits */}
        <section className="mb-20">
          <div className="rounded-lg overflow-hidden border border-rose-900/40 mb-6 max-w-sm">
            <img src={TEAM_PHOTO_SRC} alt="The LASER team, captured in false-color on the project's own LiDAR camera" className="w-full h-auto" />
          </div>

          <Mono className="text-neutral-500 mb-4 block">Credits</Mono>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <Mono color="red" className="text-xs block mb-1">FACULTY ADVISOR</Mono>
              <Text className="text-neutral-300 text-sm">Dr. Yu Takahashi</Text>
            </div>
            <div>
              <Mono color="red" className="text-xs block mb-1">CUSTOMER</Mono>
              <Text className="text-neutral-300 text-sm">Clean Space LLC</Text>
            </div>
            <div>
              <Mono color="red" className="text-xs block mb-1">PROJECT MANAGER</Mono>
              <Text className="text-neutral-300 text-sm">Luke Bray</Text>
            </div>
            <div>
              <Mono color="red" className="text-xs block mb-1">HEAD OF SOFTWARE ENGINEERING</Mono>
              <Text className="text-neutral-300 text-sm">Alex Olson</Text>
            </div>
            <div>
              <Mono color="red" className="text-xs block mb-1">HEAD OF HARDWARE ENGINEERING</Mono>
              <Text className="text-neutral-300 text-sm">Gavin Wakefield</Text>
            </div>
            <div>
              <Mono color="red" className="text-xs block mb-1">CO-HEAD OF HARDWARE ENGINEERING</Mono>
              <Text className="text-neutral-300 text-sm">Martin Coba</Text>
            </div>
          </div>
          <Text className="text-neutral-600 text-xs mt-4">
            L.A.S.E.R. — LiDAR And Sensor Engineering Researchers — Fort Lewis College Capstone, December 2024.
          </Text>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-500 mb-6 block">Mission Tech Stack</Mono>
          <div className="flex flex-wrap gap-3">
            {['Python', 'Open3D', 'Intel RealSense SDK', 'NumPy', 'Point Cloud Library', 'RANSAC', 'Linear Regression', 'Raspberry Pi 5', 'Fusion 360 / SolidWorks'].map((tech) => (
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
