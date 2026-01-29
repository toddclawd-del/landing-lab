/**
 * Calm — Domain Warp Landing Page
 * BLUEPRINT: Scandinavian clean, light & elegant
 * Shader: Domain warping with white/light blue/brown palette
 */

import { useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls, Leva } from 'leva'
import * as THREE from 'three'

// ============================================
// Shader Code
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

vec2 hash22(vec2 p) {
    vec3 a = fract(p.xyx * vec3(234.34, 435.345, 654.165));
    a += dot(a, a + 34.23);
    return fract(vec2(a.x * a.y, a.y * a.z));
}

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
    
    gl_FragColor = vec4(color, 1.0);
}
`

// ============================================
// Shader Mesh Component
// ============================================

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const controls = useControls('Shader', {
    scale: { value: 3.0, min: 0.5, max: 10, step: 0.1 },
    warpIntensity1: { value: 4.0, min: 0, max: 10, step: 0.1 },
    warpIntensity2: { value: 4.0, min: 0, max: 10, step: 0.1 },
    animSpeed: { value: 0.08, min: 0, max: 0.5, step: 0.01 },
    octaves: { value: 5, min: 1, max: 8, step: 1 },
    lacunarity: { value: 2.0, min: 1, max: 4, step: 0.1 },
    gain: { value: 0.5, min: 0.1, max: 0.9, step: 0.05 },
    colorVariation: { value: 0.6, min: 0, max: 1, step: 0.05 },
  })
  
  const colors = useControls('Colors', {
    color1: '#ffffff',      // White
    color2: '#a8c5d9',      // Light blue
    color3: '#c4a882',      // Brown/tan
    color4: '#e8e4df',      // Warm white
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
    uColor1: { value: new THREE.Color(colors.color1) },
    uColor2: { value: new THREE.Color(colors.color2) },
    uColor3: { value: new THREE.Color(colors.color3) },
    uColor4: { value: new THREE.Color(colors.color4) },
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
      material.uniforms.uColor1.value.set(colors.color1)
      material.uniforms.uColor2.value.set(colors.color2)
      material.uniforms.uColor3.value.set(colors.color3)
      material.uniforms.uColor4.value.set(colors.color4)
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
// Main Page Component
// ============================================

function DomainWarpPage() {
  return (
    <div style={styles.page}>
      <Leva collapsed={false} />
      
      {/* Header */}
      <header style={styles.header}>
        <Link to="/" style={styles.backLink}>← Back</Link>
        <div style={styles.logo}>Calm</div>
        <nav style={styles.nav}>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#pricing" style={styles.navLink}>Pricing</a>
          <a href="#" style={styles.navCta}>Get Started</a>
        </nav>
      </header>
      
      {/* Hero Section with Shader */}
      <section style={styles.hero}>
        <div style={styles.shaderContainer}>
          <Canvas
            camera={{ position: [0, 0, 1], fov: 50 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <ShaderPlane />
          </Canvas>
        </div>
        
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Project management<br />
            <span style={styles.heroAccent}>for mindful teams</span>
          </h1>
          <p style={styles.heroSub}>
            Calm brings clarity to your workflow. Less noise, more focus, 
            better work — designed for teams who value intentional productivity.
          </p>
          <div style={styles.heroCtas}>
            <a href="#" style={styles.primaryCta}>Start Free Trial</a>
            <a href="#features" style={styles.secondaryCta}>Learn More →</a>
          </div>
        </div>
      </section>
      
      {/* Product Section */}
      <section id="features" style={styles.product}>
        <div style={styles.productInner}>
          <span style={styles.productLabel}>Features</span>
          <h2 style={styles.productTitle}>Everything you need,<br />nothing you don't</h2>
          
          <div style={styles.features}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>○</div>
              <h3 style={styles.featureTitle}>Focused Workspaces</h3>
              <p style={styles.featureDesc}>
                Distraction-free environments that adapt to how you work. 
                No clutter, no overwhelm.
              </p>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>◇</div>
              <h3 style={styles.featureTitle}>Mindful Notifications</h3>
              <p style={styles.featureDesc}>
                Smart batching and quiet hours built in. 
                Stay informed without being interrupted.
              </p>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>□</div>
              <h3 style={styles.featureTitle}>Team Breathing Room</h3>
              <p style={styles.featureDesc}>
                Async-first collaboration that respects everyone's time 
                and creative flow.
              </p>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>△</div>
              <h3 style={styles.featureTitle}>Clarity Reports</h3>
              <p style={styles.featureDesc}>
                Understand where time goes without micromanaging. 
                Insights, not surveillance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}>Calm</div>
            <p style={styles.footerTagline}>Work with intention.</p>
          </div>
          
          <div style={styles.footerLinks}>
            <div style={styles.footerCol}>
              <span style={styles.footerColTitle}>Product</span>
              <a href="#" style={styles.footerLink}>Features</a>
              <a href="#" style={styles.footerLink}>Pricing</a>
              <a href="#" style={styles.footerLink}>Integrations</a>
            </div>
            <div style={styles.footerCol}>
              <span style={styles.footerColTitle}>Company</span>
              <a href="#" style={styles.footerLink}>About</a>
              <a href="#" style={styles.footerLink}>Blog</a>
              <a href="#" style={styles.footerLink}>Careers</a>
            </div>
            <div style={styles.footerCol}>
              <span style={styles.footerColTitle}>Connect</span>
              <a href="#" style={styles.footerLink}>Twitter</a>
              <a href="#" style={styles.footerLink}>LinkedIn</a>
              <a href="#" style={styles.footerLink}>Contact</a>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <span>© 2026 Calm. All rights reserved.</span>
          <span style={styles.footerCredit}>
            Shader by <a href="https://iquilezles.org/" style={styles.footerCreditLink}>Inigo Quilez</a>
          </span>
        </div>
      </footer>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

// ============================================
// Styles — Scandinavian Clean
// ============================================

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fafafa',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: '#1a1a1a',
  },
  
  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 3rem',
    zIndex: 100,
    background: 'rgba(250, 250, 250, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  },
  backLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: '#1a1a1a',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 400,
  },
  navCta: {
    color: '#1a1a1a',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '0.6rem 1.25rem',
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
  },
  
  // Hero
  hero: {
    position: 'relative',
    height: '100vh',
    minHeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    maxWidth: 700,
    padding: '0 2rem',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 300,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    marginBottom: '1.5rem',
    color: '#1a1a1a',
  },
  heroAccent: {
    fontWeight: 500,
  },
  heroSub: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontWeight: 300,
    lineHeight: 1.6,
    color: '#555',
    marginBottom: '2.5rem',
    maxWidth: 520,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heroCtas: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryCta: {
    padding: '0.9rem 2rem',
    background: '#1a1a1a',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    borderRadius: 8,
  },
  secondaryCta: {
    padding: '0.9rem 2rem',
    background: 'transparent',
    color: '#1a1a1a',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 400,
  },
  
  // Product
  product: {
    padding: '8rem 2rem',
    background: '#fff',
  },
  productInner: {
    maxWidth: 1000,
    margin: '0 auto',
  },
  productLabel: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: '1rem',
  },
  productTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 300,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    marginBottom: '4rem',
    color: '#1a1a1a',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '3rem',
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  featureIcon: {
    fontSize: '1.5rem',
    color: '#a8c5d9',
    marginBottom: '0.5rem',
  },
  featureTitle: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#1a1a1a',
  },
  featureDesc: {
    fontSize: '0.95rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: '#666',
  },
  
  // Footer
  footer: {
    padding: '4rem 2rem 2rem',
    background: '#fafafa',
    borderTop: '1px solid #eee',
  },
  footerInner: {
    maxWidth: 1000,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '3rem',
    marginBottom: '3rem',
  },
  footerBrand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  footerLogo: {
    fontSize: '1.25rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
  },
  footerTagline: {
    fontSize: '0.9rem',
    color: '#888',
    fontWeight: 300,
  },
  footerLinks: {
    display: 'flex',
    gap: '4rem',
    flexWrap: 'wrap',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  footerColTitle: {
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: '0.5rem',
  },
  footerLink: {
    fontSize: '0.9rem',
    color: '#555',
    textDecoration: 'none',
    fontWeight: 300,
  },
  footerBottom: {
    maxWidth: 1000,
    margin: '0 auto',
    paddingTop: '2rem',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    fontSize: '0.8rem',
    color: '#aaa',
  },
  footerCredit: {
    color: '#aaa',
  },
  footerCreditLink: {
    color: '#888',
    textDecoration: 'none',
  },
}

export default DomainWarpPage
