'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'

type NodeConfig = {
  position: THREE.Vector3
  key: boolean
  phase: number
}

type EdgeConfig = {
  from: THREE.Vector3
  to: THREE.Vector3
  key: boolean
}

type OrbitConfig = {
  radiusX: number
  radiusY: number
  radiusZ: number
  points: number
  color: string
  rotation: [number, number, number]
}

function DataConstellation() {
  const groupRef = useRef<THREE.Group>(null)
  const nodeRefs = useRef<Array<THREE.Mesh | null>>([])

  const orbits = useMemo<OrbitConfig[]>(
    () => [
      {
        radiusX: 2.6,
        radiusY: 0.4,
        radiusZ: 2.1,
        points: 46,
        color: '#3B82F6',
        rotation: [0.3, 0.9, 0.1],
      },
      {
        radiusX: 2.2,
        radiusY: 0.45,
        radiusZ: 2.8,
        points: 42,
        color: '#3B82F6',
        rotation: [1.1, 0.25, 0.65],
      },
      {
        radiusX: 3.0,
        radiusY: 0.35,
        radiusZ: 1.9,
        points: 44,
        color: '#3B82F6',
        rotation: [0.8, 1.3, 0.45],
      },
      {
        radiusX: 1.8,
        radiusY: 0.35,
        radiusZ: 2.4,
        points: 38,
        color: '#3B82F6',
        rotation: [1.9, 0.2, 1.2],
      },
      {
        radiusX: 3.25,
        radiusY: 0.3,
        radiusZ: 2.6,
        points: 48,
        color: '#3B82F6',
        rotation: [0.45, 2.0, 0.75],
      },
    ],
    []
  )

  const nodes = useMemo<NodeConfig[]>(() => {
    const results: NodeConfig[] = []
    let counter = 0

    orbits.forEach((orbit, orbitIdx) => {
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(orbit.rotation[0], orbit.rotation[1], orbit.rotation[2])
      )

      for (let i = 0; i < orbit.points; i++) {
        const t = (i / orbit.points) * Math.PI * 2
        const base = new THREE.Vector3(
          Math.cos(t) * orbit.radiusX,
          Math.sin(t * 1.8 + orbitIdx * 0.7) * orbit.radiusY,
          Math.sin(t) * orbit.radiusZ
        ).applyQuaternion(q)

        const jitter = new THREE.Vector3(
          (Math.random() - 0.5) * 0.07,
          (Math.random() - 0.5) * 0.07,
          (Math.random() - 0.5) * 0.07
        )

        results.push({
          position: base.add(jitter),
          key: counter % 17 === 0,
          phase: counter * 0.37,
        })
        counter += 1
      }
    })

    return results
  }, [orbits])

  const edges = useMemo<EdgeConfig[]>(() => {
    const links: EdgeConfig[] = []
    let cursor = 0

    // Intra-orbit edges
    orbits.forEach((orbit) => {
      for (let i = 0; i < orbit.points; i++) {
        const a = nodes[cursor + i]
        const b = nodes[cursor + ((i + 1) % orbit.points)]
        links.push({ from: a.position, to: b.position, key: a.key || b.key })
      }
      cursor += orbit.points
    })

    // Cross-orbit plexus edges
    for (let i = 0; i < nodes.length; i += 2) {
      const targetIdx = (i * 7 + 31) % nodes.length
      if (targetIdx === i) continue
      const a = nodes[i]
      const b = nodes[targetIdx]
      links.push({ from: a.position, to: b.position, key: a.key || b.key })
    }

    return links
  }, [nodes, orbits])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.03
      groupRef.current.rotation.y += delta * 0.05
      groupRef.current.rotation.z += delta * 0.015
    }

    const t = performance.now() * 0.001
    nodeRefs.current.forEach((mesh, idx) => {
      if (!mesh) return
      const pulse = 1 + Math.sin(t * 2.6 + nodes[idx].phase) * 0.16
      const base = nodes[idx].key ? 0.07 : 0.045
      mesh.scale.setScalar(base * pulse)
    })
  })

  return (
    <group ref={groupRef}>
      {edges.map((edge, idx) => (
        <Line
          key={`edge-${idx}`}
          points={[edge.from, edge.to]}
          color={edge.key ? '#F43F5E' : '#3B82F6'}
          transparent
          opacity={edge.key ? 0.75 : 0.42}
          lineWidth={edge.key ? 1.2 : 0.8}
        />
      ))}

      {nodes.map((node, idx) => (
        <mesh
          key={`node-${idx}`}
          ref={(node) => {
            nodeRefs.current[idx] = node
          }}
          position={node.position}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color={node.key ? '#ffccd5' : '#d6e5ff'}
            emissive={node.key ? '#F43F5E' : '#3B82F6'}
            emissiveIntensity={2.0}
            metalness={0.7}
            roughness={0.15}
          />
        </mesh>
      ))}

      <mesh>
        <sphereGeometry args={[0.22, 28, 28]} />
        <meshStandardMaterial
          color="#10121c"
          emissive="#F43F5E"
          emissiveIntensity={1.0}
          metalness={0.7}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export function HeroOrbitalScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 8], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050505']} />

        <ambientLight intensity={0.18} />
        <pointLight position={[4, 3, 5]} intensity={1.35} color="#3B82F6" />
        <pointLight position={[-4, -2, 4]} intensity={0.7} color="#F43F5E" />
        <directionalLight position={[0, 3, -2]} intensity={0.5} color="#dfe8ff" />

        <DataConstellation />

        <Stars
          radius={110}
          depth={60}
          count={8500}
          factor={4}
          saturation={0}
          fade
          speed={0.28}
        />
        <Sparkles
          count={520}
          speed={0.45}
          opacity={0.62}
          size={2.2}
          scale={[18, 11, 12]}
          color="#3B82F6"
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 2 - 0.35}
          maxPolarAngle={Math.PI / 2 + 0.35}
        />

        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={0.08}
            luminanceSmoothing={0.2}
            intensity={2.1}
            radius={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
