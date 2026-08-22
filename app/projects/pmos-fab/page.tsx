'use client';

import Link from 'next/link';
import WaferBackground from '@/components/WaferBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

// ─── MEDIA CONFIG ────────────────────────────────────────────
const WAFER_DRYING_SRC     = '/media/pmos-fab/wafer-drying.jpg';
const FURNACE_SRC          = '/media/pmos-fab/furnace-viewport.jpg';
const SEM_FOX_SRC          = '/media/pmos-fab/sem-fox-thickness.png';
const ALIGNER_SRC          = '/media/pmos-fab/aligner-uv-meter.png';
const MASK_SRC             = '/media/pmos-fab/chromium-mask.jpg';
const DENTON_PANEL_SRC     = '/media/pmos-fab/denton-power-panel.png';
const GAS_VALVES_SRC       = '/media/pmos-fab/gas-valve-manifold.png';
const FINISHED_WAFER_SRC   = '/media/pmos-fab/finished-wafer.jpg';
const SERPENTINE_SRC       = '/media/pmos-fab/serpentine-structure.png';
const COMB_PROBE_SRC       = '/media/pmos-fab/comb-structure-probe.png';
const IV_CURVE_1_SRC       = '/media/pmos-fab/iv-curve-1.png';
const IV_CURVE_2_SRC       = '/media/pmos-fab/iv-curve-2.png';
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
    <div className="rounded-lg overflow-hidden border border-red-900/40 bg-white p-2 mb-3">
      <img src={src} alt={alt} className="w-full h-auto" />
      {caption && (
        <Mono className="text-red-400 text-xl block text-center mt-2">{caption}</Mono>
      )}
    </div>
  );
}

export default function PMOSFabPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-red-500/30">

      {/* 1. Background */}
      <WaferBackground />

      {/* 2. Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-red-500 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href="/projects">
          <Mono className="text-neutral-400 hover:text-red-500 hover:underline transition-colors">
            // Return to Archives
          </Mono>
        </Link>
      </nav>

      {/* 3. Main Content */}
      <article className="relative z-10 pt-32 pb-20 px-4 max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-24 border-b border-red-900/50 pb-12">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Mono color="red">
              REF-06 // PMOS FAB
            </Mono>
            <span className="text-neutral-500">|</span>
            <Mono className="text-neutral-400">FORT LEWIS COLLEGE // ENGR 430, SPRING 2026</Mono>
          </div>

          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            PMOS Transistor <br/>
            <span className="text-neutral-300 font-bold tracking-normal">Fabrication</span>
          </Heading>

          <Text className="text-xl md:text-2xl text-red-300 font-mono leading-relaxed max-w-2xl">
            Eleven labs, four photomasks, and one ruined evaporator run to turn bare silicon into a working p-n junction.
          </Text>

          {/* Stat bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '11',   label: 'Labs' },
              { val: '4',    label: 'Photomasks' },
              { val: '2"',   label: 'Wafer Diameter' },
              { val: '3.3×', label: 'Oxide Overshoot' },
            ].map(({ val, label }) => (
              <div key={label} className="border border-red-900/30 bg-neutral-950/60 p-4 rounded">
                <div className="text-2xl font-bold text-red-400 font-mono">{val}</div>
                <Mono className="text-neutral-300 mt-1">{label}</Mono>
              </div>
            ))}
          </div>
        </header>

        {/* 01 — Wafer */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">01__WAFER</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Starting Material</Heading>
            <Text className="text-neutral-400 mb-4">
              ENGR 430 — Semiconductor Device Fabrication, Fort Lewis College, Spring 2026 — is an
              eleven-lab cleanroom sequence that carries a bare silicon wafer through a full{' '}
              <strong className="text-white">PMOS transistor process flow</strong>. Every wafer started
              identical: <strong className="text-white">2&quot; phosphorus-doped n-type [100] silicon</strong>,
              3&ndash;9 Ω·cm resistivity, 280 ± 25 µm thick.
            </Text>
            <Text className="text-neutral-400 mb-6">
              Lab 1 is entirely about knowing that starting point cold — wafer handling and cleaning
              technique, then a four-point probe resistivity measurement (1 mA test current) to confirm
              each wafer actually falls inside spec before a single process step touches it.
            </Text>
            <MediaFrame
              src={WAFER_DRYING_SRC}
              alt="Drying a silicon wafer with a nitrogen gun using a gimbling motion to clear solvent without streaking"
              caption="Drying the wafer post-clean with the N₂ gun"
            />
          </div>
        </section>

        {/* 02 — Oxidation */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">02__OXIDATION</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Field Oxide Growth</Heading>
            <Text className="text-neutral-400 mb-4">
              The field oxide (FOX) that will isolate devices is grown with a dry-wet-dry (DWD) thermal
              cycle, modeled with the <strong className="text-white">Deal-Grove equation</strong>. We only
              adjusted the first dry-cycle time — 65 and 75 minutes across two runs — and used the model
              to predict a resulting oxide thickness of <strong className="text-white">3300 Å</strong>.
            </Text>
            <Text className="text-neutral-400 mb-6">
              The ellipsometer and a cleaved SEM cross-section told a different story: real oxide
              thickness measured <strong className="text-white">~1.1 µm (11,000 Å)</strong> — over three
              times the Deal-Grove prediction. A large FOX isn&apos;t necessarily bad (it buys margin against
              over-etching later), but it&apos;s a real gap between the model and the furnace worth
              flagging rather than quietly rounding away.
            </Text>
            <div className="space-y-4">
              <MediaFrame
                src={FURNACE_SRC}
                alt="Viewport of the oxidation and diffusion furnace showing the thermal block alignment used for wafer insertion"
                caption="Oxidation/diffusion furnace, thermal block"
              />
              <MediaFrame
                src={SEM_FOX_SRC}
                alt="SEM cross-sectional micrograph measuring the grown field oxide layer at 1.19 micrometers"
                caption="SEM cross-section — measured FOX: 1.19 µm"
              />
            </div>
          </div>
        </section>

        {/* 03 — Lithography */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">03__LITHOGRAPHY</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Four Photomasks, One Routine</Heading>
            <Text className="text-neutral-400 mb-4">
              Every patterning step in this process — active area, gate strip, contact openings, and
              final metal — runs the same core routine on a <strong className="text-white">Karl Süss
              contact aligner</strong>: spin coat photoresist, soft bake, align to the previous layer,
              expose under UV (dose calculated from a measured lamp intensity, not a fixed timer), develop,
              wet-etch with buffered oxide etch (BOE), then strip the resist.
            </Text>
            <Text className="text-neutral-400 mb-6">
              Mid-semester we adjusted the spin speed from 3000 to 5000 RPM for a thinner, more uniform
              resist coat, and changed our Karl Süss alignment habits to stop the wafer from shifting
              during exposure — both fixes are now baked into the standard procedure for the next class.
            </Text>
            <div className="space-y-4">
              <MediaFrame
                src={ALIGNER_SRC}
                alt="Karl Suss contact aligner with a UV light meter sensor placed on the chuck to measure exposure intensity"
                caption="Karl Süss aligner — measuring UV lamp intensity"
              />
              <MediaFrame
                src={MASK_SRC}
                alt="Chromium photomask held up to the light, showing the dark-field patterns for one of the four mask layers"
                caption="Chromium photomask, dark-field pattern"
              />
            </div>
          </div>
        </section>

        {/* 04 — Diffusion */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">04__DIFFUSION</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Spin-On Dopant &amp; Drive-In</Heading>
            <Text className="text-neutral-400 mb-4">
              With the active area opened, a spin-on dopant (SOD) is applied and driven into the
              exposed silicon in two thermal steps — a short, high-concentration{' '}
              <strong className="text-white">predeposition</strong> followed by a longer{' '}
              <strong className="text-white">drive-in</strong> that pushes the dopant to its target
              junction depth. Wafers were laid flat and parallel in the quartz boat, not stood on edge,
              and kept to four per furnace run for even heating.
            </Text>
            <Text className="text-neutral-400 mb-6">
              Same story as the field oxide: predicted diffusion-oxide thickness was{' '}
              <strong className="text-white">1080 Å</strong>, SEM measured{' '}
              <strong className="text-white">2100 Å</strong>. Working backward from that, we estimated a
              real BOE etch rate of about 518.5 Å/min for this step and now build in a 15% over-etch to
              cover wafer-to-wafer variation. A separate spin-on dopant removal step (Lab 5) then strips
              the SOD layer before moving on to the gate mask.
            </Text>
          </div>
        </section>

        {/* 05 — Gate */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">05__GATE</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Gate Region Strip &amp; Reoxidation</Heading>
            <Text className="text-neutral-400">
              Mask 2 strips the oxide back off the gate region, and a second, thinner oxidation regrows
              a dedicated <strong className="text-white">gate oxide</strong> in its place. Expected
              thickness from the process model was 500&ndash;600 Å; the ellipsometer measured{' '}
              <strong className="text-white">680&ndash;740 Å</strong> across our runs — closer than the field
              oxide gap, but still consistently thicker than modeled, which tracks with everything else
              we saw from this furnace.
            </Text>
          </div>
        </section>

        {/* 06 — Metallization */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">06__METAL</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Metallization</Heading>
            <Text className="text-neutral-400 mb-4">
              After Mask 3 opens the contact windows, aluminum needs to land on the wafer to form
              ohmic contacts. This lab is where the semester&apos;s biggest detour happened.
            </Text>

            <div className="bg-neutral-900/50 border border-red-900/30 p-4 rounded-lg mb-6">
              <Mono color="red" className="mb-2 block">// THE EVAPORATOR PROBLEM</Mono>
              <Text className="text-neutral-300">
                Our first choice was the thermal evaporator. Run one finished, but a carbon deposit
                inside the tool — leftover from it sitting unused — vaporized along with the aluminum
                and contaminated the film. Run two was worse: the diffusion pump&apos;s chiller lines
                failed mid-deposition and started leaking water. We killed the bias and vented the
                chamber immediately, but the exposed aluminum oxidized into a hard, sapphire-like layer.
                Every sample from both evaporator runs had its aluminum etched back off and started over.
              </Text>
            </div>

            <Text className="text-neutral-400 mb-4">
              We moved to the lab&apos;s <strong className="text-white">Denton Desktop Pro DC sputter
              coater</strong> instead. The first sputter attempts came out with a visibly non-uniform,
              cloudy aluminum film, which took several runs of parameter tuning to chase down. The
              settings that finally gave a clean, even film: <strong className="text-white">60 W</strong>{' '}
              DC power, <strong className="text-white">2 mTorr</strong> argon working pressure (5N
              purity), pumped to a <strong className="text-white">5×10⁻⁶ Torr</strong> base pressure
              before deposition, run for <strong className="text-white">~40 minutes</strong>.
            </Text>

            <div className="space-y-4 mb-6">
              <MediaFrame
                src={DENTON_PANEL_SRC}
                alt="Denton Vacuum sputter coater DC power switch panel"
                caption="Denton Desktop Pro — DC power panel"
              />
              <MediaFrame
                src={GAS_VALVES_SRC}
                alt="Labeled gas supply valves for argon, nitrogen, and compressed air on the sputter coater"
                caption="Argon / N₂ / compressed air supply valves"
              />
            </div>

            <Text className="text-neutral-400 mb-2">
              The payoff: a fully metallized wafer, aluminum landing clean and even across all nine
              dies.
            </Text>
            <MediaFrame
              src={FINISHED_WAFER_SRC}
              alt="Finished wafer after aluminum deposition and patterning, showing nine iridescent dies with visible circuit patterns"
              caption="Post-metallization — all nine dies, evenly coated"
            />
          </div>
        </section>

        {/* 07 — Devices */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-400 block sticky top-32">07__DEVICES</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Device Analysis</Heading>
            <Text className="text-neutral-400 mb-4">
              After Mask 4 patterns the aluminum into isolated contacts, every die carries a set of test
              structures alongside the transistors: resistors, contact-resistance chains, p-n junction
              diodes, MOS capacitors, and the PMOS devices themselves. All of it gets probed on an{' '}
              <strong className="text-white">HP4145B Semiconductor Parameter Analyzer</strong> for I-V
              and C-V characteristics, and a cleaved cross-section goes under the{' '}
              <strong className="text-white">SEM</strong> for a direct physical check against what the
              electrical measurements imply.
            </Text>

            <div className="space-y-4 mb-6">
              <MediaFrame
                src={COMB_PROBE_SRC}
                alt="Microscope view of a comb test structure die being contacted by tungsten needle probes on the probe station"
                caption="Comb structure under the probe station"
              />
              <MediaFrame
                src={SERPENTINE_SRC}
                alt="Microscope image of serpentine resistor test structures in thin metal and aluminum"
                caption="Serpentine resistor structures, post metal-etch"
              />
            </div>

            <Text className="text-neutral-400 mb-4">
              The HP4145B&apos;s CRT plot came through loud and clear on the diode structures — clean
              forward I-V curves that behave like the ideal diode equation predicts.
            </Text>
            <MediaFrame src={IV_CURVE_1_SRC} alt="HP4145B CRT graphics plot of diode forward I-V curve" caption="HP4145B — diode forward I-V curve (run 1)" />
            <MediaFrame src={IV_CURVE_2_SRC} alt="HP4145B CRT graphics plot of a second diode forward I-V curve" caption="HP4145B — diode forward I-V curve (run 2)" />

            <div className="bg-neutral-900/50 border border-red-900/30 p-4 rounded-lg">
              <Mono color="red" className="mb-2 block">// OUTCOME</Mono>
              <Text className="text-neutral-300">
                Honest result: this run produced a working <strong className="text-white">p-n junction
                diode</strong> with measurable, well-behaved I-V curves — not a fully functional PMOS
                transistor. Between the evaporator losses and the discrepancies compounding from
                oxidation through diffusion, the three-terminal devices didn&apos;t come out clean enough
                to characterize as transistors by the end of the semester. The diode structures did,
                and that&apos;s a real, physically verified p-n junction built by hand through all eleven
                labs.
              </Text>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="mb-20">
          <Mono className="text-neutral-400 mb-4 block">Credits</Mono>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
            <div>
              <Mono color="red" className="block mb-1">INSTRUCTOR</Mono>
              <Text className="text-neutral-300">Dr. Jeff Jessing, Fort Lewis College</Text>
            </div>
            <div>
              <Mono color="red" className="block mb-1">SPRING 2026 MANUAL REVISION</Mono>
              <Text className="text-neutral-300">Hunter Goggin, Daniella Masha, Luke Bray</Text>
            </div>
          </div>
          <Text className="text-neutral-400">
            Original lab manual developed by the Fort Lewis College 2024&ndash;25 Engineering Senior
            Seminar team: Sahra Genc, Ian Van Horn, Leif Gislason, Jade Martinez, Natalia Lambos,
            Lincoln Scheer, and Eric Hill. Revised for accuracy and clarity by the Spring 2026 ENGR 430
            cohort based on our own run through the process.
          </Text>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-400 mb-6 block">Process &amp; Equipment</Mono>
          <div className="flex flex-wrap gap-3">
            {[
              'Thermal Oxidation', 'Photolithography', 'Spin-On Dopant Diffusion',
              'PVD Sputtering', 'Deal-Grove Modeling', 'Four-Point Probe',
              'Ellipsometry', 'SEM', 'HP4145B', 'Cleanroom Process',
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
