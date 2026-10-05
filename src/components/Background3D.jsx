import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Flower-like loop formed by glossy metallic butter-yellow ribbon
function FlowerLoop({ mouse }) {
  const groupRef = useRef();
  const knot1Ref = useRef();
  const knot2Ref = useRef();
  const ringRef = useRef();

  // Target mouse coordinates for smooth parallax
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame((state, delta) => {
    // Parallax lerp
    targetX.current = THREE.MathUtils.lerp(targetX.current, mouse.current.x * 0.5, 0.05);
    targetY.current = THREE.MathUtils.lerp(targetY.current, mouse.current.y * 0.3, 0.05);

    if (groupRef.current) {
      // Gentle floating wobble & parallax
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.18 + targetY.current;
      groupRef.current.position.x = Math.cos(t * 0.5) * 0.15 + targetX.current;
      groupRef.current.rotation.y = t * 0.08 + targetX.current * 0.3;
    }

    if (knot1Ref.current) {
      knot1Ref.current.rotation.x += delta * 0.12;
      knot1Ref.current.rotation.z += delta * 0.09;
    }

    if (knot2Ref.current) {
      knot2Ref.current.rotation.y -= delta * 0.15;
      knot2Ref.current.rotation.x += delta * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
      ringRef.current.rotation.x -= delta * 0.04;
    }
  });

  // Premium butter-yellow metallic physical material
  const ribbonMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F5D100'),
      emissive: new THREE.Color('#664d00'),
      emissiveIntensity: 0.12,
      roughness: 0.32,
      metalness: 0.62,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
      reflectivity: 0.85,
      side: THREE.DoubleSide,
    });
  }, []);

  const goldAccentMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFE45C'),
      emissive: new THREE.Color('#785800'),
      emissiveIntensity: 0.15,
      roughness: 0.28,
      metalness: 0.75,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      {/* Primary Flower-like loop (p=3, q=4 gives lovely petal lobing) */}
      <mesh ref={knot1Ref} material={ribbonMaterial} castShadow>
        <torusKnotGeometry args={[1.7, 0.38, 140, 36, 3, 4]} />
      </mesh>

      {/* Secondary interwoven delicate ribbon */}
      <mesh ref={knot2Ref} material={goldAccentMaterial} scale={[0.82, 0.82, 0.82]}>
        <torusKnotGeometry args={[1.5, 0.18, 120, 24, 2, 5]} />
      </mesh>

      {/* Outer subtle halo ring */}
      <mesh ref={ringRef} material={goldAccentMaterial} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.7, 0.07, 24, 80]} />
      </mesh>

      {/* Floating glossy metallic pearls */}
      <mesh position={[2.2, 1.2, -0.5]} material={goldAccentMaterial}>
        <sphereGeometry args={[0.22, 32, 32]} />
      </mesh>
      <mesh position={[-2.0, -1.3, 0.4]} material={ribbonMaterial}>
        <sphereGeometry args={[0.18, 32, 32]} />
      </mesh>
      <mesh position={[1.4, -2.1, -0.8]} material={goldAccentMaterial}>
        <sphereGeometry args={[0.14, 32, 32]} />
      </mesh>
    </group>
  );
}

// Fallback CSS backdrop for prefers-reduced-motion or low-end devices
function StaticGradientFallback() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FEFCE0] overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-300/40 via-yellow-400/30 to-amber-200/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-yellow-300/30 to-amber-500/20 blur-2xl" />
    </div>
  );
}

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn("Background3D Canvas error:", error);
  }
  render() {
    if (this.state.hasError) {
      return <StaticGradientFallback />;
    }
    return this.props.children;
  }
}

export default function Background3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (event) => {
      // Normalize mouse to -1 to 1
      const { innerWidth, innerHeight } = window;
      mouse.current.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (reducedMotion) {
    return <StaticGradientFallback />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FEFCE0]">
      {/* Subtle ambient lighting gradients on background */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-yellow-300/25 blur-3xl pointer-events-none" />

      <CanvasErrorBoundary>
        <Suspense fallback={<StaticGradientFallback />}>
          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}
          >
            {/* Studio Lighting Setup tailored for metallic gold clearcoat */}
            <ambientLight intensity={0.9} color="#FFFEE8" />
            
            {/* Key directional light */}
            <directionalLight
              position={[5, 6, 5]}
              intensity={2.2}
              color="#FFFFFF"
            />

            {/* Warm fill light */}
            <directionalLight
              position={[-5, -3, -3]}
              intensity={1.1}
              color="#FFEAA7"
            />

            {/* Golden rim light */}
            <pointLight
              position={[0, 4, -4]}
              intensity={1.8}
              color="#FFE57F"
            />

            <FlowerLoop mouse={mouse} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}
