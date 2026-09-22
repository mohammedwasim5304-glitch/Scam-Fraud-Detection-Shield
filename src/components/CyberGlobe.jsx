import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function WireframeGlobe() {
  const globeRef = useRef()
  const innerGlobeRef = useRef()

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12
      globeRef.current.rotation.x += delta * 0.04
    }
    if (innerGlobeRef.current) {
      innerGlobeRef.current.rotation.y -= delta * 0.08
    }
  })

  return (
    <group>

      <mesh ref={globeRef}>
        <icosahedronGeometry args={[2.5, 3]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>


      <mesh ref={innerGlobeRef}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial
          color="#818cf8"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>


      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[3.2, 3.25, 64]} />
        <meshBasicMaterial
          color="#c084fc"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}

function ParticleField({ count = 150 }) {
  const pointsRef = useRef()

  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18
    }
    return pos
  })

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
      pointsRef.current.rotation.x += delta * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#0ea5e9"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function CyberGlobeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <WireframeGlobe />
        </Float>
        <ParticleField count={200} />
      </Canvas>
    </div>
  )
}
