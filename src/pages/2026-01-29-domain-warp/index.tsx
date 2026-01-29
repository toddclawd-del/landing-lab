/**
 * Calm — Domain Warp Landing Page
 * BLUEPRINT: Warm organic flow, expensive + friendly
 * Shader: Domain warping with cream/sky blue/amber/earth brown palette
 */

import { useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls, Leva } from 'leva'
import * as THREE from 'three'

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
// Flowing Icon Components
// ============================================

const FlowIcon1 = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path 
      d="M8 24c0-8 4-16 16-16s16 8 16 16-4 16-16 16c-6 0-10-2-12-4" 
      stroke={colors.sky} 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M16 24c0-4 2-8 8-8s8 4 8 8-2 8-8 8" 
      stroke={colors.amber} 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="24" cy="24" r="3" fill={colors.earth} />
  </svg>
)

const FlowIcon2 = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path 
      d="M6 32c8-4 12-16 18-16s10 12 18 8" 
      stroke={colors.amber} 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M6 24c8-2 14-10 18-10s10 8 18 6" 
      stroke={colors.sky} 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M6 16c8 0 16-4 18-4s10 4 18 2" 
      stroke={colors.earth} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
  </svg>
)

const FlowIcon3 = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="18" ry="10" stroke={colors.sky} strokeWidth="2.5" fill="none" />
    <ellipse cx="24" cy="24" rx="12" ry="6" stroke={colors.amber} strokeWidth="2.5" fill="none" />
    <ellipse cx="24" cy="24" rx="5" ry="2.5" fill={colors.earth} />
  </svg>
)

const FlowIcon4 = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path 
      d="M12 36 C16 28, 20 20, 24 12 C28 20, 32 28, 36 36" 
      stroke={colors.sky} 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M18 36 C20 30, 22 24, 24 18 C26 24, 28 30, 30 36" 
      stroke={colors.amber} 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="24" cy="12" r="3" fill={colors.earth} />
  </svg>
)

// ============================================
// Organic Blob SVG
// ============================================

const BlobDivider = ({ flip = false }: { flip?: boolean }) => (
  <svg 
    viewBox="0 0 1440 120" 
    style={{ 
      width: '100%', 
      height: 'auto', 
      display: 'block',
      transform: flip ? 'scaleY(-1)' : 'none',
    }}
    preserveAspectRatio="none"
  >
    <path 
      d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" 
      fill={colors.cream}
    />
  </svg>
)

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
// Feature Data
// ============================================

const features = [
  {
    icon: <FlowIcon1 />,
    title: 'Focused Workspaces',
    desc: 'Distraction-free environments that adapt to how you work. No clutter, no overwhelm — just you and your best thinking.',
  },
  {
    icon: <FlowIcon2 />,
    title: 'Mindful Notifications',
    desc: 'Smart batching and quiet hours built in. Stay informed without being interrupted. Your attention is sacred.',
  },
  {
    icon: <FlowIcon3 />,
    title: 'Team Breathing Room',
    desc: 'Async-first collaboration that respects everyone\'s time and creative flow. Great work happens when people aren\'t rushed.',
  },
  {
    icon: <FlowIcon4 />,
    title: 'Clarity Reports',
    desc: 'Understand where time goes without micromanaging. Insights that illuminate, not surveillance that suffocates.',
  },
]

// ============================================
// Main Page Component
// ============================================

function DomainWarpPage() {
  return (
    <div style={styles.page}>
      <Leva hidden={true} />
      
      {/* Header */}
      <header style={styles.header}>
        <Link to="/" style={styles.backLink}>← Back</Link>
        <div style={styles.logo}>Calm</div>
        <nav style={styles.nav}>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#philosophy" style={styles.navLink}>Philosophy</a>
          <a href="#" style={styles.navCta}>Begin Your Journey</a>
        </nav>
      </header>
      
      {/* Hero Section — Full Shader */}
      <section style={styles.hero}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 50 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <ShaderPlane />
        </Canvas>
        
        {/* Scroll indicator */}
        <div style={styles.scrollIndicator}>
          <div style={styles.scrollLine} />
          <span style={styles.scrollText}>Discover</span>
        </div>
      </section>
      
      {/* Intro Section */}
      <section style={styles.intro}>
        <div style={styles.introInner}>
          <span style={styles.introLabel}>A new way to work</span>
          <h1 style={styles.introTitle}>
            Project management<br />
            <em style={styles.introItalic}>for mindful teams</em>
          </h1>
          <p style={styles.introSub}>
            Calm brings clarity to your workflow. Less noise, more focus, 
            better work — designed for teams who value intentional productivity 
            and believe great things take time.
          </p>
          <div style={styles.introCtas}>
            <a href="#" style={styles.primaryCta}>Start Free Trial</a>
            <a href="#features" style={styles.secondaryCta}>Explore Features</a>
          </div>
        </div>
      </section>
      
      {/* Blob transition */}
      <div style={{ background: '#fff', marginTop: -1 }}>
        <BlobDivider />
      </div>

      {/* Features Section — Editorial Layout */}
      <section id="features" style={styles.features}>
        <div style={styles.featuresInner}>
          <div style={styles.featuresHeader}>
            <span style={styles.featuresLabel}>What we offer</span>
            <h2 style={styles.featuresTitle}>
              Everything you need,<br />
              <em>nothing you don't</em>
            </h2>
          </div>
          
          <div style={styles.featuresList}>
            {features.map((feature, i) => (
              <div 
                key={i} 
                style={{
                  ...styles.featureItem,
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}
              >
                <div style={styles.featureIcon}>
                  {feature.icon}
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
      
      {/* Philosophy Section */}
      <section id="philosophy" style={styles.philosophy}>
        <div style={styles.philosophyInner}>
          <blockquote style={styles.quote}>
            <p style={styles.quoteText}>
              "The best work doesn't come from<br />
              <em>doing more</em> — it comes from<br />
              <span style={styles.quoteHighlight}>doing what matters.</span>"
            </p>
          </blockquote>
          <div style={styles.quoteAttr}>
            <div style={styles.quoteAttrLine} />
            <span>Our founding belief</span>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaTitle}>Ready for calm?</h2>
          <p style={styles.ctaSub}>
            Join thousands of teams who've found a better way to work together.
          </p>
          <a href="#" style={styles.ctaButton}>Begin Your Journey</a>
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
              <a href="#" style={styles.footerLink}>Our Story</a>
              <a href="#" style={styles.footerLink}>Journal</a>
              <a href="#" style={styles.footerLink}>Careers</a>
            </div>
            <div style={styles.footerCol}>
              <span style={styles.footerColTitle}>Connect</span>
              <a href="#" style={styles.footerLink}>Twitter</a>
              <a href="#" style={styles.footerLink}>LinkedIn</a>
              <a href="#" style={styles.footerLink}>Say Hello</a>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <span>© 2026 Calm. Made with intention.</span>
          <span style={styles.footerCredit}>
            Shader by <a href="https://iquilezles.org/" style={styles.footerCreditLink}>Inigo Quilez</a>
          </span>
        </div>
      </footer>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}

// ============================================
// Styles — Warm Organic Flow
// ============================================

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: colors.cream,
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.text,
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
  featureIcon: {
    flex: '0 0 auto',
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.8)',
    borderRadius: '50%',
    boxShadow: '0 8px 40px rgba(53, 35, 20, 0.08)',
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
    padding: '8rem 2rem',
    background: colors.earth,
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
    padding: '8rem 2rem',
    background: `linear-gradient(135deg, ${colors.skyLight} 0%, ${colors.amberLight} 100%)`,
    textAlign: 'center',
  },
  ctaInner: {
    maxWidth: 600,
    margin: '0 auto',
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
    padding: '5rem 2rem 2rem',
    background: colors.warmWhite,
  },
  footerInner: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '4rem',
    marginBottom: '4rem',
  },
  footerBrand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  footerLogo: {
    fontFamily: "'Fraunces', serif",
    fontSize: '1.5rem',
    fontWeight: 500,
    color: colors.earth,
  },
  footerTagline: {
    fontSize: '0.95rem',
    color: colors.textMuted,
    fontWeight: 300,
    fontStyle: 'italic',
  },
  footerLinks: {
    display: 'flex',
    gap: '5rem',
    flexWrap: 'wrap',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  footerColTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: '0.9rem',
    fontWeight: 500,
    color: colors.text,
    marginBottom: '0.5rem',
  },
  footerLink: {
    fontSize: '0.95rem',
    color: colors.textMuted,
    textDecoration: 'none',
    fontWeight: 300,
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
