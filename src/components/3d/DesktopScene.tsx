"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { Model as Dog } from "./Dog";
import { Model as AnimatedCat } from "./AnimatedCat";
import { Model as Rabbit } from "./Rabbit";
import { Suspense, useState, useEffect } from "react";

export default function DesktopScene({ model = "dog" }: { model?: "dog" | "cat" | "rabbit" | "all" }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) {
      Promise.resolve().then(() => setMounted(true));
    }
  }, [mounted]);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#d2e4c8] to-[#b8d4b3]">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight 
          castShadow 
          position={[-5, 5, 5]} 
          intensity={1.5} 
          shadow-mapSize={1024} 
        />
        <pointLight position={[5, 5, -5]} intensity={0.5} color="#f4c4c4" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <group position={[0, -1.2, 0]}>
            {/* Dog */}
            {(model === "dog" || model === "all") && (
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[0, 0.2]}>
                <Dog position={model === "all" ? [-2, 0, 0] : [0, 0, 0]} rotation={[0, 0, 0]} scale={model === "all" ? 0.032 : 0.032} />
              </Float>
            )}
            
            {/* Cat */}
            {(model === "cat" || model === "all") && (
              <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6} floatingRange={[0, 0.3]}>
                <AnimatedCat position={model === "all" ? [0, 0, -1] : [0, 0, 0]} rotation={[0, -Math.PI / 8, 0]} scale={model === "all" ? 0.2 : 0.2} />
              </Float>
            )}

            {/* Rabbit */}
            {(model === "rabbit" || model === "all") && (
              <Float speed={3} rotationIntensity={0.4} floatIntensity={0.8} floatingRange={[0, 0.4]}>
                <Rabbit position={model === "all" ? [2, 0, 0] : [0, 0.5, 0]} rotation={[0, -Math.PI / 4, 0]} scale={model === "all" ? 2.5 : 4} />
              </Float>
            )}

            {/* Ground shadow */}
            <ContactShadows position={[0, -0.05, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          </group>
        </Suspense>

        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={4}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
}
