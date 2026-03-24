import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

type ActionName = '0|play_dead_0' | '0|rollover_0' | '0|shake_0' | '0|sitting_0' | '0|standing_0'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_206: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    Material_0: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Model(props: any) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/animated_dog_shiba_inu.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions['0|standing_0']) {
      actions['0|standing_0'].play()
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="d2a6bc8fe88e4cbca4db3d181738fe46fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="RootNode0">
                  <group name="geo1" />
                  <group name="skeletal3">
                    <group name="0">
                      <group name="Object_13">
                        <primitive object={nodes._rootJoint} />
                        <skinnedMesh name="Object_206" geometry={nodes.Object_206.geometry} material={materials.Material_0} skeleton={nodes.Object_206.skeleton} />
                      </group>
                    </group>
                  </group>
                </group>
                <group name="shiba_inu2" />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/animated_dog_shiba_inu.glb')
