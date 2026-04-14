import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

type ActionName = 'Take 001'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_12: THREE.SkinnedMesh
    Object_14: THREE.SkinnedMesh
    Object_16: THREE.SkinnedMesh
    GLTF_created_0_rootJoint: THREE.Bone
  }
  materials: {
    Material_81: THREE.MeshStandardMaterial
    Material_105: THREE.MeshStandardMaterial
    Material_93: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Model(props: React.JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/an_animated_cat.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions['Take 001']) {
      actions['Take 001'].play()
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="RootNode_(gltf_orientation_matrix)_0" rotation={[-Math.PI / 2, 0, 0]}>
                <group name="RootNode_(model_correction_matrix)_1">
                  <group name="catfbx_2" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="_3">
                      <group name="RootNode_4">
                        <group name="_5">
                          <group name="GLTF_created_0">
                            <primitive object={nodes.GLTF_created_0_rootJoint} />
                            <group name="_8" />
                            <group name="_9" />
                            <group name="_10" />
                            <skinnedMesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials.Material_81} skeleton={nodes.Object_12.skeleton} />
                            <skinnedMesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials.Material_105} skeleton={nodes.Object_14.skeleton} />
                            <skinnedMesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials.Material_93} skeleton={nodes.Object_16.skeleton} />
                          </group>
                        </group>
                      </group>
                    </group>
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

useGLTF.preload('/an_animated_cat.glb')
