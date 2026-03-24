"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DogModel(props: any) {
  const tailRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Tail wagging
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 12) * 0.4;
    }
    // Head bobbing slightly
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2.5) * 0.05;
    }
  });

  return (
    <group {...props}>
      {/* Body */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.7, 1.4]} />
        <meshStandardMaterial color="#c4a484" roughness={0.8} />
      </mesh>
      
      {/* Front Legs */}
      <mesh position={[-0.3, 0.3, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#a68868" roughness={0.9} />
      </mesh>
      <mesh position={[0.3, 0.3, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#a68868" roughness={0.9} />
      </mesh>

      {/* Back Legs */}
      <mesh position={[-0.3, 0.3, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#a68868" roughness={0.9} />
      </mesh>
      <mesh position={[0.3, 0.3, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#a68868" roughness={0.9} />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 1.35, 0.7]}>
        {/* Head Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#c4a484" roughness={0.8} />
        </mesh>
        
        {/* Snout */}
        <mesh position={[0, -0.1, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.3, 0.4]} />
          <meshStandardMaterial color="#ecd5c0" roughness={0.6} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, 0.05, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[0.12, 0.1, 0.05]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        
        {/* Ears */}
        <mesh position={[-0.35, 0.3, 0]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.2]} />
          <meshStandardMaterial color="#947758" />
        </mesh>
        <mesh position={[0.35, 0.3, 0]} rotation={[0, 0, -0.3]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.2]} />
          <meshStandardMaterial color="#947758" />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-0.15, 0.15, 0.31]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0.15, 0.15, 0.31]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>

      {/* Tail (Grouped so it pivots from base) */}
      <group position={[0, 1.1, -0.7]} rotation={[0.5, 0, 0]} ref={tailRef}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#c4a484" />
        </mesh>
      </group>
    </group>
  );
}
