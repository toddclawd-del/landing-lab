import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════
// NEO-BRUTALISM LANDING PAGE
// A bold, unapologetic design for "SMASH STUDIO" — a creative agency
// ═══════════════════════════════════════════════════════════════

// Color Palette — High contrast, clashing but harmonious
const colors = {
  bg: '#FFFEF5', // Warm off-white
  black: '#1a1a1a',
  yellow: '#FFE600', // Electric yellow
  pink: '#FF5CAA', // Hot pink
  blue: '#3B82F6', // Bright blue
  green: '#22C55E', // Lime green
  purple: '#A855F7', // Vivid purple
  orange: '#FF6B35', // Burnt orange
}

// Typography — Chunky display + clean sans
const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
}

// ─────────────────────────────────────────────────────────────────
// BRUTALIST BUTTON
// Hard shadow, thick border, hover lifts the element
// ─────────────────────────────────────────────────────────────────
interface BrutalButtonProps {
  children: React.ReactNode
  color?: string
  shadowColor?: string
  onClick?: () => void
  size?: 'normal' | 'large'
}

function BrutalButton({ children, color = colors.yellow, shadowColor = colors.black, onClick, size = 'normal' }: BrutalButtonProps) {
  const padding = size === 'large' ? '1.25rem 2.5rem' : '0.875rem 1.75rem'
  const fontSize = size === 'large' ? '1.125rem' : '1rem'
  
  return (
    <motion.button
      onClick={onClick}
      style={{
        background: color,
        color: colors.black,
        border: `3px solid ${colors.black}`,
        padding,
        fontSize,
        fontFamily: fonts.display,
        fontWeight: 700,
        cursor: 'pointer',
        position: 'relative',
        boxShadow: `6px 6px 0 ${shadowColor}`,
      }}
      whileHover={{ 
        x: -3, 
        y: -3,
        boxShadow: `9px 9px 0 ${shadowColor}`,
      }}
      whileTap={{ 
        x: 3, 
        y: 3,
        boxShadow: `3px 3px 0 ${shadowColor}`,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  )
}

// ─────────────────────────────────────────────────────────────────
// BRUTAL CARD
// Offset shadow, thick border, hover effects
// ─────────────────────────────────────────────────────────────────
interface BrutalCardProps {
  children: React.ReactNode
  color?: string
  delay?: number
}

function BrutalCard({ children, color = '#fff', delay = 0 }: BrutalCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      style={{
        background: color,
        border: `3px solid ${colors.black}`,
        boxShadow: `8px 8px 0 ${colors.black}`,
        padding: '2rem',
        position: 'relative',
      }}
      whileHover={{
        x: -4,
        y: -4,
        boxShadow: `12px 12px 0 ${colors.black}`,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// MARQUEE STRIP
// Infinite scrolling text with rotated labels
// ─────────────────────────────────────────────────────────────────
function MarqueeStrip({ text, bgColor = colors.yellow, textColor = colors.black, direction = 'left' }: {
  text: string
  bgColor?: string
  textColor?: string
  direction?: 'left' | 'right'
}) {
  const content = Array(10).fill(text).join(' ★ ')
  
  return (
    <div style={{
      background: bgColor,
      borderTop: `3px solid ${colors.black}`,
      borderBottom: `3px solid ${colors.black}`,
      padding: '1rem 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <motion.div
        animate={{ x: direction === 'left' ? [0, -1000] : [-1000, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: '1.5rem',
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {content} ★ {content}
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// NAV COMPONENT
// Fixed nav with brutal styling
// ─────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? colors.bg : 'transparent',
        borderBottom: scrolled ? `3px solid ${colors.black}` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <motion.div
        style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: '1.75rem',
          color: colors.black,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        whileHover={{ scale: 1.05 }}
      >
        <span style={{
          display: 'inline-block',
          width: '32px',
          height: '32px',
          background: colors.pink,
          border: `3px solid ${colors.black}`,
          transform: 'rotate(45deg)',
        }} />
        SMASH
      </motion.div>
      
      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {['Work', 'About', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: '1rem',
              color: colors.black,
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
            whileHover={{ y: -2, color: colors.pink }}
          >
            {item}
          </motion.a>
        ))}
        <BrutalButton color={colors.pink}>Let's Talk</BrutalButton>
      </div>
    </motion.nav>
  )
}

// ─────────────────────────────────────────────────────────────────
// HERO SECTION
// Bold headline with stacked text, floating shapes
// ─────────────────────────────────────────────────────────────────
function Hero() {
  const shapes = [
    { color: colors.yellow, size: 120, top: '15%', left: '8%', rotate: 15 },
    { color: colors.blue, size: 80, top: '60%', left: '5%', rotate: -20 },
    { color: colors.green, size: 60, top: '75%', right: '10%', rotate: 45 },
    { color: colors.purple, size: 100, top: '20%', right: '12%', rotate: -10 },
    { color: colors.orange, size: 50, top: '45%', right: '5%', rotate: 30 },
  ]
  
  return (
    <section style={{
      minHeight: '100vh',
      background: colors.bg,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 2rem 4rem',
      overflow: 'hidden',
    }}>
      {/* Floating shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: shape.size,
            height: shape.size,
            background: shape.color,
            border: `3px solid ${colors.black}`,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            transform: `rotate(${shape.rotate}deg)`,
            zIndex: 1,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [shape.rotate, shape.rotate + 5, shape.rotate],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Hero content */}
      <div style={{ 
        textAlign: 'center', 
        maxWidth: '1000px', 
        position: 'relative', 
        zIndex: 10 
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-block',
            background: colors.yellow,
            border: `3px solid ${colors.black}`,
            boxShadow: `4px 4px 0 ${colors.black}`,
            padding: '0.5rem 1.25rem',
            marginBottom: '2rem',
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
          }}
        >
          🔥 Denver's Boldest Creative Agency
        </motion.div>
        
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            lineHeight: 1,
            color: colors.black,
            marginBottom: '2rem',
          }}
        >
          WE MAKE
          <br />
          <span style={{
            display: 'inline-block',
            background: colors.pink,
            padding: '0 0.5rem',
            border: `4px solid ${colors.black}`,
            boxShadow: `6px 6px 0 ${colors.black}`,
            transform: 'rotate(-2deg)',
          }}>
            LOUD
          </span>
          {' '}BRANDS
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: fonts.body,
            fontSize: 'clamp(1.125rem, 2vw, 1.35rem)',
            color: colors.black,
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}
        >
          Strategy. Design. Development. We build digital experiences 
          that refuse to be ignored.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <BrutalButton color={colors.blue} size="large">
            See Our Work →
          </BrutalButton>
          <BrutalButton color={colors.yellow} size="large">
            Start a Project
          </BrutalButton>
        </motion.div>
        
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '4rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '150+', label: 'Projects Shipped' },
            { num: '8', label: 'Years Running' },
            { num: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: '2.5rem',
                color: colors.black,
              }}>
                {stat.num}
              </div>
              <div style={{
                fontFamily: fonts.body,
                fontSize: '0.9rem',
                color: colors.black,
                opacity: 0.6,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SERVICES SECTION
// Grid of service cards with brutal styling
// ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: '🎨',
      title: 'Brand Identity',
      description: 'Logos, colors, and visual systems that make competitors sweat.',
      color: colors.yellow,
    },
    {
      icon: '💻',
      title: 'Web Design',
      description: 'Websites so good, users forget what they came for.',
      color: colors.pink,
    },
    {
      icon: '📱',
      title: 'App Design',
      description: 'Mobile experiences that actually deserve screen time.',
      color: colors.blue,
    },
    {
      icon: '🚀',
      title: 'Development',
      description: 'We ship fast, we ship clean, we ship things that work.',
      color: colors.green,
    },
    {
      icon: '📈',
      title: 'Strategy',
      description: 'Research and planning that makes everything else easier.',
      color: colors.purple,
    },
    {
      icon: '✨',
      title: 'Motion Design',
      description: 'Animation that makes static stuff look sad.',
      color: colors.orange,
    },
  ]
  
  return (
    <section style={{
      background: colors.bg,
      padding: '6rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              background: colors.green,
              border: `3px solid ${colors.black}`,
              boxShadow: `4px 4px 0 ${colors.black}`,
              padding: '0.5rem 1.25rem',
              marginBottom: '1.5rem',
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
            }}
          >
            What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: colors.black,
            }}
          >
            Services That Slap
          </motion.h2>
        </div>
        
        {/* Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {services.map((service, i) => (
            <BrutalCard key={i} color={service.color} delay={i * 0.1}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: '1.5rem',
                color: colors.black,
                marginBottom: '0.75rem',
              }}>
                {service.title}
              </h3>
              <p style={{
                fontFamily: fonts.body,
                fontSize: '1rem',
                color: colors.black,
                opacity: 0.8,
                lineHeight: 1.6,
              }}>
                {service.description}
              </p>
            </BrutalCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// TRUCHET TILES SHADER BACKGROUND
// Animated procedural pattern for visual interest
// ─────────────────────────────────────────────────────────────────

const truchetVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const truchetFragment = `
varying vec2 vUv;
uniform float uTime;
uniform float uScale;
uniform float uLineWidth;
uniform float uAnimSpeed;
uniform float uColorSpeed;
uniform float uTileStyle;
uniform float uAntiAlias;
uniform float uAnimateTiles;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackgroundColor;
uniform float uAspect;

#define PI 3.14159265359

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float sdRing(vec2 p, vec2 c, float r, float w) {
  return abs(length(p - c) - r) - w;
}

float truchetDoubleArcs(vec2 p, float flip, float w) {
  vec2 corner1 = flip > 0.5 ? vec2(0.0, 0.0) : vec2(1.0, 0.0);
  vec2 corner2 = flip > 0.5 ? vec2(1.0, 1.0) : vec2(0.0, 1.0);
  float d1 = sdRing(p, corner1, 0.5, w);
  float d2 = sdRing(p, corner2, 0.5, w);
  float d3 = sdRing(p, corner1, 0.25, w * 0.7);
  float d4 = sdRing(p, corner2, 0.25, w * 0.7);
  return min(min(d1, d2), min(d3, d4));
}

vec3 palette(float t) {
  t = fract(t);
  if (t < 0.33) {
    return mix(uColor1, uColor2, t * 3.0);
  } else if (t < 0.66) {
    return mix(uColor2, uColor3, (t - 0.33) * 3.0);
  } else {
    return mix(uColor3, uColor1, (t - 0.66) * 3.0);
  }
}

void main() {
  vec2 uv = vUv;
  // Correct for aspect ratio - scale X so tiles stay square
  uv.x *= uAspect;
  vec2 p = uv * uScale;
  vec2 cellId = floor(p);
  vec2 cellUv = fract(p);
  float time = uTime * uAnimSpeed;
  float hash = hash21(cellId);
  float flip = hash;
  if (uAnimateTiles > 0.5) {
    float flipPeriod = 4.0 + hash * 4.0;
    float flipPhase = floor(time / flipPeriod);
    flip = fract(hash + flipPhase * 0.5);
  }
  flip = step(0.5, flip);
  float w = uLineWidth / uScale;
  float d = truchetDoubleArcs(cellUv, flip, w);
  float aa = uAntiAlias / uScale;
  float mask = 1.0 - smoothstep(-aa, aa, d);
  float pathColor = length(uv) + time * uColorSpeed;
  float cellColor = hash21(cellId + vec2(127.1, 311.7));
  vec2 nearestCorner = flip > 0.5 ? 
    (length(cellUv) < length(cellUv - vec2(1.0, 1.0)) ? vec2(0.0) : vec2(1.0)) :
    (length(cellUv - vec2(1.0, 0.0)) < length(cellUv - vec2(0.0, 1.0)) ? vec2(1.0, 0.0) : vec2(0.0, 1.0));
  float arcProgress = atan(cellUv.y - nearestCorner.y, cellUv.x - nearestCorner.x) / PI;
  float colorIndex = pathColor * 0.3 + cellColor * 0.3 + arcProgress * 0.4;
  vec3 lineColor = palette(colorIndex);
  lineColor += vec3(0.15) * smoothstep(w * 0.8, w * 0.3, abs(d));
  vec3 color = mix(uBackgroundColor, lineColor, mask);
  color *= 1.0 - 0.3 * length(uv - 0.5);
  gl_FragColor = vec4(color, 1.0);
}
`

function TruchetPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScale: { value: 18.0 },
    uLineWidth: { value: 0.28 },
    uAnimSpeed: { value: 0.90 },
    uColorSpeed: { value: 0.55 },
    uTileStyle: { value: 3.0 },
    uAntiAlias: { value: 1.5 },
    uAnimateTiles: { value: 1.0 },
    uColor1: { value: new THREE.Color('#00d4ff') },
    uColor2: { value: new THREE.Color('#ff0080') },
    uColor3: { value: new THREE.Color('#ffcc00') },
    uBackgroundColor: { value: new THREE.Color('#171731') },
    uAspect: { value: 1.0 },
  }), [])
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      // Update aspect ratio based on viewport
      const aspect = state.viewport.width / state.viewport.height
      material.uniforms.uAspect.value = aspect
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={truchetVertex}
        fragmentShader={truchetFragment}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function TruchetBackground() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      opacity: 0.85,
    }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 90 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <TruchetPlane />
      </Canvas>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// WORK/PORTFOLIO SECTION
// Project showcase with hover reveals
// ─────────────────────────────────────────────────────────────────
function Work() {
  const projects = [
    {
      title: 'CRYPTO CHAOS',
      category: 'Branding + Web',
      image: 'https://picsum.photos/seed/crypto/800/600',
      color: colors.purple,
    },
    {
      title: 'NEON NIGHTS',
      category: 'App Design',
      image: 'https://picsum.photos/seed/neon/800/600',
      color: colors.pink,
    },
    {
      title: 'ORGANIC ORIGINS',
      category: 'Brand Identity',
      image: 'https://picsum.photos/seed/organic/800/600',
      color: colors.green,
    },
    {
      title: 'RETRO REWIND',
      category: 'Web + Motion',
      image: 'https://picsum.photos/seed/retro/800/600',
      color: colors.orange,
    },
  ]
  
  return (
    <section id="work" style={{
      background: colors.black,
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Truchet Tiles Shader Background */}
      <TruchetBackground />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              background: colors.yellow,
              border: `3px solid ${colors.bg}`,
              boxShadow: `4px 4px 0 ${colors.bg}`,
              padding: '0.5rem 1.25rem',
              marginBottom: '1.5rem',
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              color: colors.black,
            }}
          >
            Selected Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: colors.bg,
            }}
          >
            Work We're Proud Of
          </motion.h2>
        </div>
        
        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface Project {
  title: string
  category: string
  image: string
  color: string
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '4/3',
        border: `4px solid ${colors.bg}`,
        boxShadow: `8px 8px 0 ${project.color}`,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: project.color,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
            }}
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: fonts.body,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: colors.black,
                marginBottom: '0.5rem',
              }}
            >
              {project.category}
            </motion.span>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: '2rem',
                color: colors.black,
                textAlign: 'center',
              }}
            >
              {project.title}
            </motion.h3>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                marginTop: '1.5rem',
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: '1rem',
                color: colors.black,
                borderBottom: `2px solid ${colors.black}`,
              }}
            >
              View Project →
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// TESTIMONIALS SECTION
// Client quotes with brutal card styling
// ─────────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote: "SMASH took our boring fintech brand and made it actually cool. Our conversion rate doubled.",
      author: "Sarah Chen",
      role: "CEO, PayFlow",
      color: colors.yellow,
    },
    {
      quote: "Working with them was like having a creative SWAT team. Fast, precise, no BS.",
      author: "Marcus Johnson",
      role: "Founder, Hype Studios",
      color: colors.pink,
    },
    {
      quote: "They somehow made an enterprise SaaS product feel fun. Magic.",
      author: "Alex Rivera",
      role: "CPO, DataVault",
      color: colors.blue,
    },
  ]
  
  return (
    <section style={{
      background: colors.bg,
      padding: '6rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              background: colors.purple,
              border: `3px solid ${colors.black}`,
              boxShadow: `4px 4px 0 ${colors.black}`,
              padding: '0.5rem 1.25rem',
              marginBottom: '1.5rem',
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              color: colors.bg,
            }}
          >
            Kind Words
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: colors.black,
            }}
          >
            What Clients Say
          </motion.h2>
        </div>
        
        {/* Testimonials grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {testimonials.map((t, i) => (
            <BrutalCard key={i} color={t.color} delay={i * 0.15}>
              <div style={{
                fontFamily: fonts.display,
                fontSize: '4rem',
                lineHeight: 1,
                color: colors.black,
                opacity: 0.2,
                marginBottom: '-1rem',
              }}>
                "
              </div>
              <p style={{
                fontFamily: fonts.body,
                fontSize: '1.15rem',
                color: colors.black,
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}>
                {t.quote}
              </p>
              <div style={{
                borderTop: `2px solid ${colors.black}`,
                paddingTop: '1rem',
              }}>
                <div style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: colors.black,
                }}>
                  {t.author}
                </div>
                <div style={{
                  fontFamily: fonts.body,
                  fontSize: '0.9rem',
                  color: colors.black,
                  opacity: 0.7,
                }}>
                  {t.role}
                </div>
              </div>
            </BrutalCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// CTA SECTION
// Big bold call to action
// ─────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{
      background: colors.pink,
      borderTop: `4px solid ${colors.black}`,
      borderBottom: `4px solid ${colors.black}`,
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          border: `4px solid ${colors.black}`,
          opacity: 0.3,
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          border: `4px solid ${colors.black}`,
          borderRadius: '50%',
          opacity: 0.3,
        }}
      />
      
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            color: colors.black,
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}
        >
          READY TO MAKE <br />
          <span style={{
            display: 'inline-block',
            background: colors.yellow,
            padding: '0 0.5rem',
            border: `4px solid ${colors.black}`,
            boxShadow: `6px 6px 0 ${colors.black}`,
            transform: 'rotate(2deg)',
          }}>
            SOME NOISE?
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: fonts.body,
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: colors.black,
            opacity: 0.9,
            marginBottom: '2.5rem',
            maxWidth: '500px',
            margin: '0 auto 2.5rem',
          }}
        >
          Drop us a line. We'll buy the first round of coffee 
          and figure out how to make your brand unforgettable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <BrutalButton color={colors.black} shadowColor={colors.yellow} size="large">
            <span style={{ color: colors.bg }}>Start a Conversation →</span>
          </BrutalButton>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// Simple brutal footer
// ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: colors.black,
      padding: '4rem 2rem',
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: '2rem',
            color: colors.bg,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}>
            <span style={{
              display: 'inline-block',
              width: '28px',
              height: '28px',
              background: colors.pink,
              border: `3px solid ${colors.bg}`,
              transform: 'rotate(45deg)',
            }} />
            SMASH
          </div>
          <p style={{
            fontFamily: fonts.body,
            fontSize: '0.95rem',
            color: colors.bg,
            opacity: 0.7,
            lineHeight: 1.6,
          }}>
            Denver's boldest creative agency. <br />
            Making brands that refuse to blend in.
          </p>
        </div>
        
        {/* Links */}
        <div>
          <h4 style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: '1rem',
            color: colors.bg,
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Studio
          </h4>
          {['Work', 'Services', 'About', 'Careers'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                display: 'block',
                fontFamily: fonts.body,
                fontSize: '0.95rem',
                color: colors.bg,
                opacity: 0.7,
                textDecoration: 'none',
                marginBottom: '0.5rem',
              }}
            >
              {link}
            </a>
          ))}
        </div>
        
        {/* Social */}
        <div>
          <h4 style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: '1rem',
            color: colors.bg,
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Connect
          </h4>
          {['Twitter', 'Instagram', 'Dribbble', 'LinkedIn'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                display: 'block',
                fontFamily: fonts.body,
                fontSize: '0.95rem',
                color: colors.bg,
                opacity: 0.7,
                textDecoration: 'none',
                marginBottom: '0.5rem',
              }}
            >
              {link}
            </a>
          ))}
        </div>
        
        {/* Contact */}
        <div>
          <h4 style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: '1rem',
            color: colors.bg,
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Say Hi
          </h4>
          <a
            href="mailto:hello@smash.studio"
            style={{
              fontFamily: fonts.body,
              fontSize: '0.95rem',
              color: colors.yellow,
              textDecoration: 'none',
            }}
          >
            hello@smash.studio
          </a>
          <p style={{
            fontFamily: fonts.body,
            fontSize: '0.95rem',
            color: colors.bg,
            opacity: 0.7,
            marginTop: '1rem',
            lineHeight: 1.6,
          }}>
            1234 Larimer St<br />
            Denver, CO 80202
          </p>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '3rem auto 0',
        paddingTop: '2rem',
        borderTop: `2px solid ${colors.bg}20`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{
          fontFamily: fonts.body,
          fontSize: '0.9rem',
          color: colors.bg,
          opacity: 0.5,
        }}>
          © 2026 SMASH Studio. All rights reserved.
        </span>
        <span style={{
          fontFamily: fonts.body,
          fontSize: '0.9rem',
          color: colors.bg,
          opacity: 0.5,
        }}>
          Built with 🔥 in Denver
        </span>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────
export default function NeoBrutalism() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background: ${colors.bg};
          overflow-x: hidden;
        }
        
        ::selection {
          background: ${colors.yellow};
          color: ${colors.black};
        }
        
        @media (max-width: 768px) {
          nav > div:last-child {
            display: none !important;
          }
        }
      `}</style>
      <Nav />
      <Hero />
      <MarqueeStrip text="STRATEGY • DESIGN • DEVELOPMENT • BRANDING • MOTION" />
      <Services />
      <Work />
      <MarqueeStrip 
        text="WE MAKE LOUD BRANDS • DENVER'S BOLDEST AGENCY" 
        bgColor={colors.blue} 
        textColor={colors.bg}
        direction="right"
      />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
