import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

type ActionName = 'standing' | 'sitting' | 'shake' | 'rollover' | 'play_dead'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_130: THREE.SkinnedMesh
    GLTF_created_0_rootJoint: THREE.Bone
  }
  materials: {
    material_0: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Model(props: React.JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/baby_dog.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions['standing']) {
      actions['standing'].play()
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="RootNode0_0" scale={0.01}>
                <group name="skeletal3_3">
                  <group name="GLTF_created_0">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <group name="shiba_inu2_2_correction">
                      <group name="shiba_inu2_2" />
                    </group>
                    <skinnedMesh name="Object_130" geometry={nodes.Object_130.geometry} skeleton={nodes.Object_130.skeleton}>
                      <meshStandardMaterial 
                        map={materials.material_0?.map || null} 
                        color={materials.material_0?.map ? "#ffffff" : "#d89e65"} 
                        roughness={0.7} 
                        metalness={0.1}
                      />
                    </skinnedMesh>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/baby_dog.glb')
