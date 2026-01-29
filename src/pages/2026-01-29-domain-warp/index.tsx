/**
 * Calm — Domain Warp Landing Page
 * BLUEPRINT: Warm organic flow, expensive + friendly
 * Shader elements throughout, full-bleed only in hero
 */

import { useRef, useMemo, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls, Leva } from 'leva'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// ============================================
// Brand Colors
// ============================================
const colors = {
  cream: '#fffbf7',
  warmWhite: '#faf8f5',
  sky: '#73b7df',
  skyLight: '#a8d4ef',
  amber: '#eca461',
  amberLight: '#f5d4a8',
  earth: '#352314',
  earthMid: '#5c4033',
  text: '#2a2522',
  textMuted: '#6b635c',
}

// ============================================
// Shared Shader Code
// ============================================

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;

uniform float uTime;
uniform float uScale;
uniform float uWarpIntensity1;
uniform float uWarpIntensity2;
uniform float uAnimSpeed;
uniform float uOctaves;
uniform float uLacunarity;
uniform float uGain;
uniform float uColorVariation;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform float uCircleMask;

float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

vec2 quintic(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    
    vec2 u = quintic(f);
    
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p, float octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float maxValue = 0.0;
    
    for (int i = 0; i < 8; i++) {
        if (float(i) >= octaves) break;
        value += amplitude * noise(p * frequency);
        maxValue += amplitude;
        frequency *= uLacunarity;
        amplitude *= uGain;
    }
    
    return value / maxValue;
}

float pattern(vec2 p, out vec2 q, out vec2 r, float octaves) {
    float t = uTime * uAnimSpeed;
    
    q = vec2(
        fbm(p + vec2(0.0, 0.0) + 0.1 * t, octaves),
        fbm(p + vec2(5.2, 1.3) - 0.12 * t, octaves)
    );
    
    r = vec2(
        fbm(p + uWarpIntensity1 * q + vec2(1.7, 9.2) + 0.15 * t, octaves),
        fbm(p + uWarpIntensity1 * q + vec2(8.3, 2.8) - 0.13 * t, octaves)
    );
    
    return fbm(p + uWarpIntensity2 * r, octaves);
}

void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * uScale;
    
    // Circle mask for mini shaders
    float dist = length(uv - 0.5);
    float circleMask = uCircleMask > 0.5 ? smoothstep(0.5, 0.45, dist) : 1.0;
    
    vec2 q, r;
    float f = pattern(p, q, r, uOctaves);
    
    vec3 color = mix(uColor1, uColor2, f);
    
    float qMag = length(q);
    color = mix(color, uColor3, qMag * uColorVariation);
    
    float rComponent = clamp(r.y + 0.5, 0.0, 1.0);
    color = mix(color, uColor4, rComponent * uColorVariation * 0.7);
    
    float qAngle = atan(q.y, q.x) / 6.28318 + 0.5;
    color += (uColor2 - uColor1) * qAngle * 0.1 * uColorVariation;
    
    color = pow(color, vec3(0.95));
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, circleMask);
}
`

// ============================================
// Hero Shader (Full bleed)
// ============================================

function HeroShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const controls = useControls('Shader', {
    scale: { value: 4.9, min: 0.5, max: 10, step: 0.1 },
    warpIntensity1: { value: 6.3, min: 0, max: 10, step: 0.1 },
    warpIntensity2: { value: 6.6, min: 0, max: 10, step: 0.1 },
    animSpeed: { value: 0.34, min: 0, max: 0.5, step: 0.01 },
    octaves: { value: 4, min: 1, max: 8, step: 1 },
    lacunarity: { value: 2.6, min: 1, max: 4, step: 0.1 },
    gain: { value: 0.45, min: 0.1, max: 0.9, step: 0.05 },
    colorVariation: { value: 0.55, min: 0, max: 1, step: 0.05 },
  })
  
  const shaderColors = useControls('Colors', {
    color1: '#ffffff',
    color2: '#73b7df',
    color3: '#eca461',
    color4: '#352314',
  })
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScale: { value: controls.scale },
    uWarpIntensity1: { value: controls.warpIntensity1 },
    uWarpIntensity2: { value: controls.warpIntensity2 },
    uAnimSpeed: { value: controls.animSpeed },
    uOctaves: { value: controls.octaves },
    uLacunarity: { value: controls.lacunarity },
    uGain: { value: controls.gain },
    uColorVariation: { value: controls.colorVariation },
    uColor1: { value: new THREE.Color(shaderColors.color1) },
    uColor2: { value: new THREE.Color(shaderColors.color2) },
    uColor3: { value: new THREE.Color(shaderColors.color3) },
    uColor4: { value: new THREE.Color(shaderColors.color4) },
    uCircleMask: { value: 0 },
  }), [])
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uScale.value = controls.scale
      material.uniforms.uWarpIntensity1.value = controls.warpIntensity1
      material.uniforms.uWarpIntensity2.value = controls.warpIntensity2
      material.uniforms.uAnimSpeed.value = controls.animSpeed
      material.uniforms.uOctaves.value = controls.octaves
      material.uniforms.uLacunarity.value = controls.lacunarity
      material.uniforms.uGain.value = controls.gain
      material.uniforms.uColorVariation.value = controls.colorVariation
      material.uniforms.uColor1.value.set(shaderColors.color1)
      material.uniforms.uColor2.value.set(shaderColors.color2)
      material.uniforms.uColor3.value.set(shaderColors.color3)
      material.uniforms.uColor4.value.set(shaderColors.color4)
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

// ============================================
// Mini Shader Orb (for feature icons)
// ============================================

interface MiniShaderProps {
  size?: number
  scale?: number
  speed?: number
  offset?: number
  colorShift?: number
}

function MiniShaderPlane({ scale = 3, speed = 0.15, offset = 0, colorShift = 0 }: MiniShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Shift colors based on colorShift prop
  const baseColors = [
    ['#ffffff', '#73b7df', '#eca461', '#352314'],
    ['#ffffff', '#eca461', '#73b7df', '#352314'],
    ['#73b7df', '#ffffff', '#352314', '#eca461'],
    ['#eca461', '#ffffff', '#73b7df', '#352314'],
  ]
  const colorSet = baseColors[colorShift % baseColors.length]
  
  const uniforms = useMemo(() => ({
    uTime: { value: offset },
    uScale: { value: scale },
    uWarpIntensity1: { value: 4.0 },
    uWarpIntensity2: { value: 4.0 },
    uAnimSpeed: { value: speed },
    uOctaves: { value: 3 },
    uLacunarity: { value: 2.2 },
    uGain: { value: 0.5 },
    uColorVariation: { value: 0.6 },
    uColor1: { value: new THREE.Color(colorSet[0]) },
    uColor2: { value: new THREE.Color(colorSet[1]) },
    uColor3: { value: new THREE.Color(colorSet[2]) },
    uColor4: { value: new THREE.Color(colorSet[3]) },
    uCircleMask: { value: 1 },
  }), [scale, speed, offset, colorSet])
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime + offset
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  )
}

// Flat shader orb (kept for reference but using 3D shapes now)
const _MiniShaderOrb = ({ size = 120, scale = 3, speed = 0.15, offset = 0, colorShift = 0 }: MiniShaderProps) => (
  <div style={{ 
    width: size, 
    height: size, 
    borderRadius: '50%', 
    overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(53, 35, 20, 0.12)',
  }}>
    <Canvas camera={{ position: [0, 0, 1], fov: 50 }} style={{ width: '100%', height: '100%' }} gl={{ alpha: true }}>
      <MiniShaderPlane scale={scale} speed={speed} offset={offset} colorShift={colorShift} />
    </Canvas>
  </div>
)
void _MiniShaderOrb // silence unused warning

// ============================================
// 3D Shader Sphere (for CTA section)
// ============================================

// Sphere-specific shaders with lighting
const sphereVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`

const sphereFragmentShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

uniform float uTime;
uniform float uScale;
uniform float uWarpIntensity1;
uniform float uWarpIntensity2;
uniform float uAnimSpeed;
uniform float uOctaves;
uniform float uLacunarity;
uniform float uGain;
uniform float uColorVariation;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

vec2 quintic(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    vec2 u = quintic(f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p, float octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float maxValue = 0.0;
    for (int i = 0; i < 8; i++) {
        if (float(i) >= octaves) break;
        value += amplitude * noise(p * frequency);
        maxValue += amplitude;
        frequency *= uLacunarity;
        amplitude *= uGain;
    }
    return value / maxValue;
}

float pattern(vec2 p, out vec2 q, out vec2 r, float octaves) {
    float t = uTime * uAnimSpeed;
    q = vec2(fbm(p + vec2(0.0, 0.0) + 0.1 * t, octaves), fbm(p + vec2(5.2, 1.3) - 0.12 * t, octaves));
    r = vec2(fbm(p + uWarpIntensity1 * q + vec2(1.7, 9.2) + 0.15 * t, octaves), fbm(p + uWarpIntensity1 * q + vec2(8.3, 2.8) - 0.13 * t, octaves));
    return fbm(p + uWarpIntensity2 * r, octaves);
}

void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * uScale;
    
    vec2 q, r;
    float f = pattern(p, q, r, uOctaves);
    
    vec3 baseColor = mix(uColor1, uColor2, f);
    float qMag = length(q);
    baseColor = mix(baseColor, uColor3, qMag * uColorVariation);
    float rComponent = clamp(r.y + 0.5, 0.0, 1.0);
    baseColor = mix(baseColor, uColor4, rComponent * uColorVariation * 0.7);
    
    // Lighting
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Fresnel rim lighting
    float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 3.0);
    
    // Soft directional light from top-right
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
    float diffuse = max(dot(normal, lightDir), 0.0) * 0.3 + 0.7;
    
    // Combine
    vec3 color = baseColor * diffuse;
    color += vec3(1.0, 0.98, 0.95) * fresnel * 0.4; // Warm rim light
    
    color = pow(color, vec3(0.95));
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
}
`

// Reusable hook for shader uniforms
function useShaderUniforms(scale: number, speed: number, offset: number, colorShift: number) {
  const baseColors = [
    ['#ffffff', '#73b7df', '#eca461', '#352314'],
    ['#ffffff', '#eca461', '#73b7df', '#352314'],
    ['#73b7df', '#ffffff', '#352314', '#eca461'],
    ['#eca461', '#ffffff', '#73b7df', '#352314'],
  ]
  const colorSet = baseColors[colorShift % baseColors.length]
  
  return useMemo(() => ({
    uTime: { value: offset },
    uScale: { value: scale },
    uWarpIntensity1: { value: 4.0 },
    uWarpIntensity2: { value: 4.0 },
    uAnimSpeed: { value: speed },
    uOctaves: { value: 3 },
    uLacunarity: { value: 2.2 },
    uGain: { value: 0.5 },
    uColorVariation: { value: 0.6 },
    uColor1: { value: new THREE.Color(colorSet[0]) },
    uColor2: { value: new THREE.Color(colorSet[1]) },
    uColor3: { value: new THREE.Color(colorSet[2]) },
    uColor4: { value: new THREE.Color(colorSet[3]) },
  }), [scale, speed, offset, colorSet])
}

// Sphere
function ShaderSphereMesh({ scale = 3, speed = 0.15, offset = 0, colorShift = 0 }: MiniShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useShaderUniforms(scale, speed, offset, colorShift)
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime + offset
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial vertexShader={sphereVertexShader} fragmentShader={sphereFragmentShader} uniforms={uniforms} />
    </mesh>
  )
}

// Torus (donut)
function ShaderTorusMesh({ scale = 3, speed = 0.15, offset = 0, colorShift = 0 }: MiniShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useShaderUniforms(scale, speed, offset, colorShift)
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime + offset
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.7, 0.3, 64, 128]} />
      <shaderMaterial vertexShader={sphereVertexShader} fragmentShader={sphereFragmentShader} uniforms={uniforms} />
    </mesh>
  )
}

// Octahedron
function ShaderOctahedronMesh({ scale = 3, speed = 0.15, offset = 0, colorShift = 0 }: MiniShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useShaderUniforms(scale, speed, offset, colorShift)
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime + offset
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.08
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1, 2]} />
      <shaderMaterial vertexShader={sphereVertexShader} fragmentShader={sphereFragmentShader} uniforms={uniforms} />
    </mesh>
  )
}

// Torus Knot
function ShaderTorusKnotMesh({ scale = 3, speed = 0.15, offset = 0, colorShift = 0 }: MiniShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useShaderUniforms(scale, speed, offset, colorShift)
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime + offset
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <mesh ref={meshRef} scale={0.6}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <shaderMaterial vertexShader={sphereVertexShader} fragmentShader={sphereFragmentShader} uniforms={uniforms} />
    </mesh>
  )
}

type ShapeType = 'sphere' | 'torus' | 'octahedron' | 'torusKnot'

interface Shader3DShapeProps extends MiniShaderProps {
  shape?: ShapeType
}

function Shader3DShape({ size = 160, scale = 3, speed = 0.15, offset = 0, colorShift = 0, shape = 'sphere' }: Shader3DShapeProps) {
  const ShapeMesh = {
    sphere: ShaderSphereMesh,
    torus: ShaderTorusMesh,
    octahedron: ShaderOctahedronMesh,
    torusKnot: ShaderTorusKnotMesh,
  }[shape]
  
  return (
    <div style={{ 
      width: size, 
      height: size,
      filter: 'drop-shadow(0 12px 40px rgba(53, 35, 20, 0.2))',
    }}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <ShapeMesh scale={scale} speed={speed} offset={offset} colorShift={colorShift} />
      </Canvas>
    </div>
  )
}

// Keep ShaderSphere for backwards compatibility (CTA section)
function ShaderSphere({ size = 160, scale = 3, speed = 0.15, offset = 0, colorShift = 0 }: MiniShaderProps) {
  return <Shader3DShape size={size} scale={scale} speed={speed} offset={offset} colorShift={colorShift} shape="sphere" />
}

// ============================================
// Animated Blob Divider
// ============================================

const AnimatedBlobDivider = ({ flip = false, color = colors.cream }: { flip?: boolean, color?: string }) => (
  <div style={{ 
    width: '100%', 
    overflow: 'hidden',
    transform: flip ? 'scaleY(-1)' : 'none',
    marginTop: flip ? 0 : -1,
    marginBottom: flip ? -1 : 0,
  }}>
    <svg 
      viewBox="0 0 1440 120" 
      style={{ 
        width: '100%', 
        height: 'auto', 
        display: 'block',
        animation: 'blobFloat 8s ease-in-out infinite',
      }}
      preserveAspectRatio="none"
    >
      <path 
        d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" 
        fill={color}
      >
        <animate 
          attributeName="d" 
          dur="8s" 
          repeatCount="indefinite"
          values="
            M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z;
            M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z;
            M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z
          "
        />
      </path>
    </svg>
  </div>
)

// ============================================
// Feature Data
// ============================================

const features: Array<{
  title: string
  desc: string
  colorShift: number
  shape: ShapeType
}> = [
  {
    title: 'Space to Think',
    desc: 'Your workspace clears itself. What remains is just you and the work that matters.',
    colorShift: 0,
    shape: 'sphere',
  },
  {
    title: 'Quiet When You Need It',
    desc: 'Notifications wait for you — not the other way around. Your attention is yours to give.',
    colorShift: 1,
    shape: 'torus',
  },
  {
    title: 'Room to Breathe',
    desc: 'Async by nature. Your team moves at their own pace, together.',
    colorShift: 2,
    shape: 'octahedron',
  },
  {
    title: 'Insight Without Intrusion',
    desc: 'See where time flows. No tracking, no surveillance — just clarity.',
    colorShift: 3,
    shape: 'torusKnot',
  },
]

// ============================================
// Header Component with Mobile Menu
// ============================================

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <>
      <header style={styles.header}>
        <Link to="/" style={styles.backLink} className="back-link">← Back</Link>
        <div style={styles.logo}>Calm</div>
        
        {/* Desktop nav */}
        <nav style={styles.nav} className="desktop-nav">
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#philosophy" style={styles.navLink}>Philosophy</a>
          <a href="#" style={styles.navCta}>Begin Your Journey</a>
        </nav>
        
        {/* Mobile hamburger */}
        <button 
          style={styles.hamburger}
          className="mobile-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{
            ...styles.hamburgerLine,
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            ...styles.hamburgerLine,
            opacity: mobileMenuOpen ? 0 : 1,
          }} />
          <span style={{
            ...styles.hamburgerLine,
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </header>
      
      {/* Mobile dropdown menu */}
      <div 
        style={{
          ...styles.mobileMenu,
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        className="mobile-menu"
      >
        <a href="#features" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Features</a>
        <a href="#philosophy" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Philosophy</a>
        <a href="#" style={styles.mobileNavCta} onClick={() => setMobileMenuOpen(false)}>Begin Your Journey</a>
      </div>
    </>
  )
}

// ============================================
// Main Page Component
// ============================================

function DomainWarpPage() {
  // Refs for GSAP animations
  const introRef = useRef<HTMLDivElement>(null)
  const introLabelRef = useRef<HTMLSpanElement>(null)
  const introTitleRef = useRef<HTMLHeadingElement>(null)
  const introSubRef = useRef<HTMLParagraphElement>(null)
  const introCtasRef = useRef<HTMLDivElement>(null)
  const featuresHeaderRef = useRef<HTMLDivElement>(null)
  const featuresListRef = useRef<HTMLDivElement>(null)
  const philosophyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  
  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero scroll indicator entrance
      gsap.fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: 'power2.out' }
      )
      
      // Scroll indicator fade on scroll
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: scrollIndicatorRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        }
      })
      
      // Intro section animations
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        }
      })
      
      introTl
        .fromTo(introLabelRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(introTitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(introSubRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(introCtasRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
      
      // Features header animation
      gsap.fromTo(featuresHeaderRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresHeaderRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
      
      // Feature items staggered entrance
      const featureItems = featuresListRef.current?.querySelectorAll('[data-feature]')
      if (featureItems) {
        featureItems.forEach((item, i) => {
          const isEven = i % 2 === 0
          gsap.fromTo(item,
            { 
              opacity: 0, 
              x: isEven ? -60 : 60,
              y: 30,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          )
        })
      }
      
      // Philosophy quote reveal
      const quoteText = philosophyRef.current?.querySelector('[data-quote]')
      if (quoteText) {
        gsap.fromTo(quoteText,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
      
      // CTA section with orbs floating in
      const ctaOrbs = ctaRef.current?.querySelectorAll('[data-orb]')
      const ctaContent = ctaRef.current?.querySelector('[data-cta-content]')
      
      if (ctaOrbs && ctaContent) {
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        })
        
        ctaTl
          .fromTo(ctaOrbs[0],
            { opacity: 0, x: -100, scale: 0.8, rotation: -15 },
            { opacity: 1, x: 0, scale: 1, rotation: 0, duration: 1.2, ease: 'power3.out' }
          )
          .fromTo(ctaOrbs[1],
            { opacity: 0, x: 100, scale: 0.8, rotation: 15 },
            { opacity: 1, x: 0, scale: 1, rotation: 0, duration: 1.2, ease: 'power3.out' },
            '-=1'
          )
          .fromTo(ctaContent,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
          )
      }
      
      // Parallax effect on hero shader
      gsap.to('.hero-shader-container', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <div style={styles.page}>
      <Leva hidden={true} />
      
      {/* Header */}
      <Header />
      
      {/* Hero Section — Full Shader */}
      <section style={styles.hero} className="hero-section">
        <div className="hero-shader-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120%' }}>
          <Canvas
            camera={{ position: [0, 0, 1], fov: 50 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <HeroShaderPlane />
          </Canvas>
        </div>
        
        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} style={styles.scrollIndicator}>
          <div style={styles.scrollLine} />
          <span style={styles.scrollText}>Discover</span>
        </div>
      </section>
      
      {/* Intro Section */}
      <section ref={introRef} style={styles.intro}>
        <div style={styles.introInner}>
          <span ref={introLabelRef} style={styles.introLabel}>Let your work breathe</span>
          <h1 ref={introTitleRef} style={styles.introTitle}>
            Where good work<br />
            <em style={styles.introItalic}>finds its rhythm</em>
          </h1>
          <p ref={introSubRef} style={styles.introSub}>
            Some teams rush. Others flow. Calm is for the ones who know 
            that the best ideas arrive when you stop chasing them.
          </p>
          <div ref={introCtasRef} style={styles.introCtas}>
            <a href="#" style={styles.primaryCta}>Try it free</a>
            <a href="#features" style={styles.secondaryCta}>See how it works</a>
          </div>
        </div>
      </section>
      
      {/* Animated blob transition */}
      <div style={{ background: '#fff' }}>
        <AnimatedBlobDivider />
      </div>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <div style={styles.featuresInner}>
          <div ref={featuresHeaderRef} style={styles.featuresHeader}>
            <span style={styles.featuresLabel}>The gentle way</span>
            <h2 style={styles.featuresTitle}>
              Tools that settle,<br />
              <em>never startle</em>
            </h2>
          </div>
          
          <div ref={featuresListRef} style={styles.featuresList}>
            {features.map((feature, i) => (
              <div 
                key={i}
                data-feature
                style={{
                  ...styles.featureItem,
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}
              >
                <div style={styles.featureIconWrapper}>
                  <Shader3DShape 
                    size={160} 
                    scale={3 + i * 0.3} 
                    speed={0.12 + i * 0.02} 
                    offset={i * 10} 
                    colorShift={feature.colorShift}
                    shape={feature.shape}
                  />
                </div>
                <div style={styles.featureContent}>
                  <span style={styles.featureNumber}>0{i + 1}</span>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDesc}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blob transition to philosophy */}
      <div style={{ background: colors.cream }}>
        <AnimatedBlobDivider color={colors.earth} />
      </div>
      
      {/* Philosophy Section */}
      <section ref={philosophyRef} id="philosophy" style={styles.philosophy}>
        <div style={styles.philosophyInner}>
          <blockquote data-quote style={styles.quote}>
            <p style={styles.quoteText}>
              "Slow down.<br />
              <em>The work will wait.</em><br />
              <span style={styles.quoteHighlight}>You're worth more than your output.</span>"
            </p>
          </blockquote>
          <div style={styles.quoteAttr}>
            <div style={styles.quoteAttrLine} />
            <span>What we believe</span>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section ref={ctaRef} style={styles.ctaSection}>
        <div style={styles.ctaLayout}>
          {/* Left sphere */}
          <div data-orb style={styles.ctaOrb}>
            <ShaderSphere size={180} scale={3} speed={0.1} offset={0} colorShift={0} />
          </div>
          
          {/* Center content */}
          <div data-cta-content style={styles.ctaInner}>
            <h2 style={styles.ctaTitle}>Ready to slow down?</h2>
            <p style={styles.ctaSub}>
              Join teams who've learned that the best work happens when you stop rushing.
            </p>
            <a href="#" style={styles.ctaButton}>Begin</a>
          </div>
          
          {/* Right sphere */}
          <div data-orb style={styles.ctaOrb}>
            <ShaderSphere size={180} scale={3.5} speed={0.12} offset={20} colorShift={1} />
          </div>
        </div>
      </section>
      
      {/* Footer — Minimal */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerMinimal}>
            <div style={styles.footerLogo}>Calm</div>
            <nav style={styles.footerNav}>
              <a href="#features" style={styles.footerNavLink}>Features</a>
              <a href="#philosophy" style={styles.footerNavLink}>Philosophy</a>
              <a href="#" style={styles.footerNavLink}>Pricing</a>
              <a href="#" style={styles.footerNavLink}>Say Hello</a>
            </nav>
          </div>
          
          <div style={styles.footerBottom}>
            <span>© 2026 Calm</span>
            <span style={styles.footerCredit}>
              Shader by <a href="https://iquilezles.org/" style={styles.footerCreditLink}>Inigo Quilez</a>
            </span>
          </div>
        </div>
      </footer>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
          .back-link {
            font-size: 0 !important;
          }
          .back-link::before {
            content: '←';
            font-size: 1.25rem;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

// ============================================
// Styles
// ============================================

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: colors.cream,
    fontFamily: "'Lora', Georgia, serif",
    color: colors.text,
    overflow: 'hidden',
  },
  
  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    padding: '1.5rem 4rem',
    zIndex: 100,
    background: 'rgba(255, 251, 247, 0.85)',
    backdropFilter: 'blur(12px)',
  },
  backLink: {
    color: colors.textMuted,
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 400,
    justifySelf: 'start',
    transition: 'color 0.2s',
  },
  logo: {
    fontFamily: "'Fraunces', serif",
    fontSize: '1.5rem',
    fontWeight: 500,
    color: colors.earth,
    justifySelf: 'center',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
    justifySelf: 'end',
  },
  navLink: {
    color: colors.textMuted,
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 400,
    transition: 'color 0.2s',
  },
  navCta: {
    color: colors.cream,
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '0.75rem 1.5rem',
    background: colors.earth,
    borderRadius: 100,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    justifySelf: 'end',
  },
  hamburgerLine: {
    width: 24,
    height: 2,
    background: colors.earth,
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    position: 'fixed',
    top: 70,
    left: 0,
    right: 0,
    background: 'rgba(255, 251, 247, 0.98)',
    backdropFilter: 'blur(12px)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    zIndex: 99,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    borderBottom: `1px solid rgba(53, 35, 20, 0.1)`,
  },
  mobileNavLink: {
    color: colors.text,
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 400,
    fontFamily: "'Fraunces', serif",
    padding: '0.5rem 0',
  },
  mobileNavCta: {
    color: colors.cream,
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '1rem 2rem',
    background: colors.earth,
    borderRadius: 100,
    textAlign: 'center',
    marginTop: '0.5rem',
  },
  
  // Hero
  hero: {
    position: 'relative',
    height: '100vh',
    minHeight: 700,
    overflow: 'hidden',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 60,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
  },
  scrollLine: {
    width: 1,
    height: 40,
    background: `linear-gradient(to bottom, transparent, ${colors.earth})`,
  },
  scrollText: {
    fontFamily: "'Fraunces', serif",
    fontSize: 13,
    fontWeight: 400,
    fontStyle: 'italic',
    color: colors.earth,
    letterSpacing: '0.05em',
  },
  
  // Intro
  intro: {
    padding: '10rem 2rem 8rem',
    background: '#fff',
    textAlign: 'center',
  },
  introInner: {
    maxWidth: 800,
    margin: '0 auto',
  },
  introLabel: {
    display: 'inline-block',
    fontFamily: "'Fraunces', serif",
    fontSize: '0.9rem',
    fontWeight: 400,
    fontStyle: 'italic',
    color: colors.amber,
    marginBottom: '2rem',
  },
  introTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 'clamp(2.75rem, 7vw, 4.5rem)',
    fontWeight: 300,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginBottom: '2rem',
    color: colors.text,
  },
  introItalic: {
    fontStyle: 'italic',
    color: colors.sky,
  },
  introSub: {
    fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
    fontWeight: 300,
    lineHeight: 1.7,
    color: colors.textMuted,
    marginBottom: '3rem',
    maxWidth: 560,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  introCtas: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryCta: {
    padding: '1rem 2.5rem',
    background: colors.earth,
    color: colors.cream,
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: 100,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  secondaryCta: {
    padding: '1rem 2.5rem',
    background: 'transparent',
    color: colors.earth,
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 400,
    borderRadius: 100,
    border: `1.5px solid ${colors.earth}`,
    transition: 'background 0.2s',
  },
  
  // Features
  features: {
    padding: '6rem 2rem 8rem',
    background: colors.cream,
  },
  featuresInner: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  featuresHeader: {
    textAlign: 'center',
    marginBottom: '6rem',
  },
  featuresLabel: {
    display: 'inline-block',
    fontFamily: "'Fraunces', serif",
    fontSize: '0.9rem',
    fontWeight: 400,
    fontStyle: 'italic',
    color: colors.amber,
    marginBottom: '1.5rem',
  },
  featuresTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    fontWeight: 300,
    lineHeight: 1.2,
    color: colors.text,
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureIconWrapper: {
    flex: '0 0 auto',
    animation: 'float 6s ease-in-out infinite',
  },
  featureContent: {
    flex: '1 1 400px',
    maxWidth: 500,
  },
  featureNumber: {
    display: 'block',
    fontFamily: "'Fraunces', serif",
    fontSize: '0.85rem',
    fontWeight: 400,
    color: colors.amber,
    marginBottom: '0.75rem',
  },
  featureTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 400,
    color: colors.text,
    marginBottom: '1rem',
  },
  featureDesc: {
    fontSize: '1.05rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: colors.textMuted,
  },
  
  // Philosophy
  philosophy: {
    position: 'relative',
    padding: '8rem 2rem',
    background: colors.earth,
    overflow: 'hidden',
  },
  philosophyInner: {
    maxWidth: 900,
    margin: '0 auto',
    textAlign: 'center',
  },
  quote: {
    marginBottom: '3rem',
  },
  quoteText: {
    fontFamily: "'Fraunces', serif",
    fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
    fontWeight: 300,
    lineHeight: 1.4,
    color: colors.cream,
  },
  quoteHighlight: {
    color: colors.amber,
  },
  quoteAttr: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    color: 'rgba(255, 251, 247, 0.6)',
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
  quoteAttrLine: {
    width: 40,
    height: 1,
    background: 'rgba(255, 251, 247, 0.3)',
  },
  
  // CTA Section
  ctaSection: {
    position: 'relative',
    padding: '6rem 2rem',
    overflow: 'hidden',
    background: colors.cream,
  },
  ctaLayout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4rem',
    maxWidth: 1100,
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  ctaOrb: {
    flex: '0 0 auto',
    animation: 'float 6s ease-in-out infinite',
  },
  ctaInner: {
    flex: '1 1 400px',
    maxWidth: 500,
    textAlign: 'center',
  },
  ctaTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 400,
    color: colors.earth,
    marginBottom: '1rem',
  },
  ctaSub: {
    fontSize: '1.1rem',
    fontWeight: 300,
    color: colors.earthMid,
    marginBottom: '2.5rem',
    lineHeight: 1.6,
  },
  ctaButton: {
    display: 'inline-block',
    padding: '1.1rem 3rem',
    background: colors.earth,
    color: colors.cream,
    textDecoration: 'none',
    fontSize: '1.05rem',
    fontWeight: 500,
    borderRadius: 100,
    boxShadow: '0 4px 20px rgba(53, 35, 20, 0.25)',
    transition: 'transform 0.2s',
  },
  
  // Footer
  footer: {
    background: colors.warmWhite,
    overflow: 'hidden',
  },
  footerContent: {
    padding: '3rem 2rem 2rem',
  },
  footerMinimal: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '3rem',
  },
  footerLogo: {
    fontFamily: "'Fraunces', serif",
    fontSize: '1.75rem',
    fontWeight: 500,
    color: colors.earth,
  },
  footerNav: {
    display: 'flex',
    gap: '2.5rem',
    flexWrap: 'wrap',
  },
  footerNavLink: {
    color: colors.textMuted,
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s',
  },
  footerBottom: {
    maxWidth: 1100,
    margin: '0 auto',
    paddingTop: '2rem',
    borderTop: `1px solid rgba(53, 35, 20, 0.1)`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    fontSize: '0.85rem',
    color: colors.textMuted,
  },
  footerCredit: {
    color: colors.textMuted,
  },
  footerCreditLink: {
    color: colors.sky,
    textDecoration: 'none',
  },
}

export default DomainWarpPage
