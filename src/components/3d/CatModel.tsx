"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CatModel(props: any) {
  const tailRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Slower, elegant tail swish
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2.5) * 0.3;
    }
    // Subtle head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group {...props}>
      {/* Body */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.5, 1.1]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, 0.3, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.3, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      <mesh position={[-0.2, 0.3, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.3, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 1.1, 0.6]}>
        {/* Head Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.4, 0.45]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
        </mesh>
        
        {/* Snout */}
        <mesh position={[0, -0.05, 0.25]} castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.15, 0.1]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        {/* Nose */}
        <mesh position={[0, 0.05, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 0.04, 0.04]} />
          <meshStandardMaterial color="#fca5a5" /> 
        </mesh>
        
        {/* Ears (pointy) */}
        <mesh position={[-0.15, 0.3, 0]} rotation={[0, 0, 0.4]} castShadow>
          <boxGeometry args={[0.15, 0.25, 0.1]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[0.15, 0.3, 0]} rotation={[0, 0, -0.4]} castShadow>
          <boxGeometry args={[0.15, 0.25, 0.1]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        
        {/* Eyes (cat-like slits) */}
        <mesh position={[-0.12, 0.1, 0.23]}>
          <boxGeometry args={[0.04, 0.1, 0.02]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0.12, 0.1, 0.23]}>
          <boxGeometry args={[0.04, 0.1, 0.02]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Tail (long and elegant) */}
      <group position={[0, 0.9, -0.55]} rotation={[0.8, 0, 0]} ref={tailRef}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      </group>
    </group>
  );
}
