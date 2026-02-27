'use client';

import Link from 'next/link';
import LidarBackground from '@/components/LidarBackground';
import { Heading, Text, Mono } from '@/components/ui/Typography';

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
          <div className="flex items-center gap-4 mb-6">
            <Mono color="red" className="opacity-70">
              REF-05 // LASER
            </Mono>
          </div>
          
          <Heading variant="h1" className="text-5xl md:text-7xl mb-6">
            LiDAR Orbital <br/>
            <Text as="span" className="text-neutral-500 font-bold">Debris Characterization</Text>
          </Heading>
          
          <Text className="text-xl md:text-2xl text-rose-400/90 font-mono leading-relaxed max-w-2xl">
            Detecting and characterizing space debris spin-rates using high-resolution point cloud analysis.
          </Text>
        </header>

        {/* The Problem */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">01__ORBIT</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">The Kessler Syndrome</Heading>
            <Text className="text-neutral-400 mb-4">
              With over 4,000 active satellites and countless fragments of defunct rockets in orbit, space debris poses a catastrophic risk to future missions. To capture or de-orbit this debris, we first need to know <i className="text-white">exactly</i> how it is moving.
            </Text>
            <Text className="text-neutral-400">
              Capturing a tumbling object requires precise knowledge of its <strong className="text-white">rotational velocity (RPM)</strong> and physical dimensions. The LASER project utilizes LiDAR to derive these metrics in real-time.
            </Text>
          </div>
        </section>

        {/* The Hardware */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">02__SENSOR</Mono>
          </div>
          <div>
            <Heading variant="h3" className="mb-4">Hardware Architecture</Heading>
            <Text className="text-neutral-400 mb-6">
              The system integrates commercial off-the-shelf components to create a cost-effective sensing platform.
            </Text>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-900/50 border border-rose-900/30 p-4 rounded">
                    <Mono color="red" className="mb-2 block">OPTICS</Mono>
                    <Text variant="small" className="text-neutral-400">
                        <strong className="text-white">Intel RealSense L515</strong> solid-state LiDAR camera capturing depth data at 30 FPS.
                    </Text>
                </div>
                <div className="bg-neutral-900/50 border border-rose-900/30 p-4 rounded">
                    <Mono color="red" className="mb-2 block">COMPUTE</Mono>
                    <Text variant="small" className="text-neutral-400">
                        <strong className="text-white">Raspberry Pi 5 (8GB)</strong> handles data acquisition, .bag recording, and initial PLY conversion.
                    </Text>
                </div>
            </div>
          </div>
        </section>

        {/* The Algorithms */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          <div className="text-right hidden md:block">
            <Mono className="text-neutral-600 block sticky top-32">03__ALGORITHM</Mono>
          </div>
          
          <div className="min-w-0">
            <Heading variant="h3" className="mb-4">Point Cloud Processing</Heading>
            <Text className="text-neutral-400 mb-6">
              Raw LiDAR data is noisy. I developed a Python pipeline using <strong className="text-white">Open3D</strong> to isolate the target object and extract kinematic data.
            </Text>

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
            
            <Text className="text-neutral-400">
                By tracking the normal vector of the object's largest plane across timestamps, we calculate the angular velocity. Our tests achieved an RPM estimation accuracy of <strong className="text-white">99%</strong> against ground truth data.
            </Text>
          </div>
        </section>

        {/* Footer / Tech Stack */}
        <footer className="border-t border-neutral-800 pt-12 mt-20">
          <Mono className="text-neutral-500 mb-6 block">Mission Tech Stack</Mono>
          <div className="flex flex-wrap gap-3">
            {['Python', 'Open3D', 'Intel RealSense SDK', 'NumPy', 'Raspberry Pi', 'SolidWorks'].map((tech) => (
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