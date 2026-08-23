import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

// Generates points evenly distributed on a sphere using the fibonacci lattice method
function fibonacciSphere(samples, radius) {
  const points = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius))
  }
  return points
}

function NetworkSphere({ mouse }) {
  const groupRef = useRef()
  const materialRef = useRef()
  const SAMPLES = 190
  const RADIUS = 2.4

  const nodePositions = useMemo(() => fibonacciSphere(SAMPLES, RADIUS), [])

  // Build line segments between nodes that are close to each other
  const lineGeometry = useMemo(() => {
    const positions = []
    const threshold = 0.62
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const d = nodePositions[i].distanceTo(nodePositions[j])
        if (d < threshold) {
          positions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z)
          positions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z)
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [nodePositions])

  const pointsGeometry = useMemo(() => {
    const positions = new Float32Array(nodePositions.length * 3)
    nodePositions.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [nodePositions])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.08
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.35,
      0.04
    )
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      mouse.current.x * -0.2,
      0.04
    )
    const t = state.clock.getElapsedTime()
    const pulse = 1 + Math.sin(t * 0.6) * 0.04
    groupRef.current.scale.setScalar(pulse)
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#5b5bf6" transparent opacity={0.28} />
      </lineSegments>
      <points geometry={pointsGeometry}>
        <pointsMaterial
          ref={materialRef}
          color="#5ff2ff"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.95}
        />
      </points>
      {/* inner glowing core */}
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function DriftingParticles() {
  const ref = useRef()
  const count = 400
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#8a8afb" size={0.02} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  const handlePointerMove = (e) => {
    mouse.current = {
      x: (e.clientX / size.width) * 2 - 1,
      y: (e.clientY / size.height) * 2 - 1,
    }
  }

  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('pointermove', handlePointerMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00e5ff" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#5b5bf6" />
      <NetworkSphere mouse={mouse} />
      <DriftingParticles />
      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={0.9} />
      </EffectComposer>
    </>
  )
}

export default function Hero3D() {
  const [ready, setReady] = useState(false)

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={() => setReady(true)}
      >
        <color attach="background" args={['#050608']} />
        <fog attach="fog" args={['#050608', 6, 14]} />
        <Scene />
      </Canvas>
    </div>
  )
}
