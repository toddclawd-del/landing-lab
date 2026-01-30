'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// SCROLL VELOCITY EFFECTS
// Animations that respond to scroll speed
// Demonstrates: Velocity detection, momentum, 
// stretching, and speed-based transformations
// ════════════════════════════════════════════

const CONFIG = {
  // Velocity text
  velocityMultiplier: 0.5,
  maxVelocitySkew: 30,
  smoothingFactor: 0.1,
  
  // Marquee
  baseMarqueeSpeed: 100, // pixels per second
  velocityBoost: 5,
  
  // Stretch effect
  maxStretch: 1.5,
  stretchRecovery: 0.15,
  
  // Colors
  primaryColor: '#f0f0f0',
  accentColor: '#22c55e',
  bgColor: '#0a0a0a',
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Velocity-Based Text Skew
// Text skews based on how fast you're scrolling
// ═══════════════════════════════════════════════════════════

function VelocityText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const velocityRef = useRef(0)
  
  const lines = [
    'VELOCITY',
    'DRIVES',
    'MOTION',
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    let lastScroll = window.scrollY
    let rafId: number
    
    // Track scroll velocity
    function updateVelocity() {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScroll
      
      // Smooth velocity
      velocityRef.current += (delta - velocityRef.current) * CONFIG.smoothingFactor
      
      // Apply skew to text based on velocity
      textRefs.current.forEach((text, i) => {
        if (!text) return
        const skew = gsap.utils.clamp(
          -CONFIG.maxVelocitySkew,
          CONFIG.maxVelocitySkew,
          velocityRef.current * CONFIG.velocityMultiplier * (i % 2 === 0 ? 1 : -1)
        )
        gsap.to(text, {
          skewX: skew,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
      
      lastScroll = currentScroll
      rafId = requestAnimationFrame(updateVelocity)
    }
    
    rafId = requestAnimationFrame(updateVelocity)
    
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-8 overflow-hidden">
      <div className="w-full max-w-6xl">
        <p className="text-green-400 mb-8 text-sm uppercase tracking-widest text-center">
          Scroll fast to see the skew effect
        </p>
        {lines.map((line, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el }}
            className="text-7xl md:text-[12rem] font-black text-center leading-none tracking-tighter"
            style={{ 
              WebkitTextStroke: i === 1 ? '2px currentColor' : 'none',
              color: i === 1 ? 'transparent' : 'inherit',
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Velocity-Responsive Marquee
// Marquee speed changes based on scroll velocity
// ═══════════════════════════════════════════════════════════

function VelocityMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const velocityRef = useRef(0)
  const positionRef = useRef({ track1: 0, track2: 0 })
  
  const text = 'MOMENTUM • SPEED • FLOW • ENERGY • '
  
  useEffect(() => {
    if (!containerRef.current || !track1Ref.current || !track2Ref.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    let lastScroll = window.scrollY
    let lastTime = performance.now()
    let rafId: number
    
    const trackWidth = track1Ref.current.scrollWidth / 2
    
    function animate() {
      const currentTime = performance.now()
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScroll
      const dt = (currentTime - lastTime) / 1000
      
      // Smooth velocity calculation
      velocityRef.current += (delta * 10 - velocityRef.current) * 0.1
      
      // Base speed + velocity boost
      const baseSpeed = CONFIG.baseMarqueeSpeed * dt
      const velocityBoost = Math.abs(velocityRef.current) * CONFIG.velocityBoost * dt
      
      // Update positions
      positionRef.current.track1 -= (baseSpeed + velocityBoost)
      positionRef.current.track2 += (baseSpeed + velocityBoost)
      
      // Loop the tracks
      if (positionRef.current.track1 <= -trackWidth) {
        positionRef.current.track1 += trackWidth
      }
      if (positionRef.current.track2 >= 0) {
        positionRef.current.track2 -= trackWidth
      }
      
      // Apply transforms
      gsap.set(track1Ref.current, { x: positionRef.current.track1 })
      gsap.set(track2Ref.current, { x: positionRef.current.track2 })
      
      // Apply skew based on velocity
      const skew = gsap.utils.clamp(-15, 15, velocityRef.current * 0.3)
      gsap.to([track1Ref.current, track2Ref.current], {
        skewX: skew,
        duration: 0.2,
      })
      
      lastScroll = currentScroll
      lastTime = currentTime
      rafId = requestAnimationFrame(animate)
    }
    
    rafId = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(rafId)
  }, [])
  
  return (
    <section ref={containerRef} className="py-32 overflow-hidden bg-neutral-950">
      <div className="space-y-4">
        {/* Track 1 - moves left */}
        <div className="overflow-hidden">
          <div 
            ref={track1Ref}
            className="flex text-6xl md:text-8xl font-black text-green-400 whitespace-nowrap"
          >
            {text.repeat(4)}
            {text.repeat(4)}
          </div>
        </div>
        
        {/* Track 2 - moves right */}
        <div className="overflow-hidden">
          <div 
            ref={track2Ref}
            className="flex text-6xl md:text-8xl font-black whitespace-nowrap"
            style={{ WebkitTextStroke: '2px #22c55e', color: 'transparent' }}
          >
            {text.repeat(4)}
            {text.repeat(4)}
          </div>
        </div>
      </div>
      
      <p className="text-center text-neutral-500 mt-12 text-lg">
        Scroll to change marquee speed and direction
      </p>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Stretch/Squash Based on Velocity
// Elements stretch when scrolling fast
// ═══════════════════════════════════════════════════════════

function StretchEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const velocityRef = useRef(0)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    let lastScroll = window.scrollY
    let rafId: number
    
    function update() {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScroll
      
      // Smooth velocity
      velocityRef.current += (delta - velocityRef.current) * CONFIG.stretchRecovery
      
      // Calculate stretch
      const stretch = gsap.utils.clamp(1, CONFIG.maxStretch, 1 + Math.abs(velocityRef.current) * 0.01)
      
      elementsRef.current.forEach((el, i) => {
        if (!el) return
        
        gsap.to(el, {
          scaleY: stretch,
          scaleX: 2 - stretch, // Inverse - squash horizontally when stretching vertically
          y: velocityRef.current * 0.2 * (i % 2 === 0 ? 1 : -1),
          duration: 0.1,
          ease: 'power1.out',
        })
      })
      
      lastScroll = currentScroll
      rafId = requestAnimationFrame(update)
    }
    
    rafId = requestAnimationFrame(update)
    
    return () => cancelAnimationFrame(rafId)
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-[150vh] flex items-center justify-center px-8">
      <div className="sticky top-1/2 -translate-y-1/2">
        <p className="text-green-400 mb-12 text-sm uppercase tracking-widest text-center">
          Stretch Effect — Scroll fast!
        </p>
        
        <div className="flex gap-8 justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              ref={(el) => { elementsRef.current[i] = el }}
              className="w-16 h-32 md:w-24 md:h-48 rounded-full bg-gradient-to-b from-green-400 to-emerald-600"
              style={{ transformOrigin: 'center center' }}
            />
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-center text-lg">
          Elements stretch and squash based on your scroll velocity
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Momentum-Based Parallax
// Layers move with momentum that continues after scroll stops
// ═══════════════════════════════════════════════════════════

function MomentumParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<(HTMLDivElement | null)[]>([])
  const velocitiesRef = useRef<number[]>([0, 0, 0, 0])
  
  const layers = [
    { color: 'bg-green-900/30', speed: 0.2, size: 300 },
    { color: 'bg-green-700/40', speed: 0.4, size: 200 },
    { color: 'bg-green-500/50', speed: 0.6, size: 150 },
    { color: 'bg-green-400/60', speed: 0.8, size: 100 },
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    let lastScroll = window.scrollY
    let rafId: number
    
    function update() {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScroll
      
      layersRef.current.forEach((layer, i) => {
        if (!layer) return
        
        // Add velocity based on scroll
        velocitiesRef.current[i] += delta * layers[i].speed
        
        // Apply friction (momentum decay)
        velocitiesRef.current[i] *= 0.95
        
        gsap.to(layer, {
          y: velocitiesRef.current[i],
          rotation: velocitiesRef.current[i] * 0.1,
          duration: 0.5,
          ease: 'power2.out',
        })
      })
      
      lastScroll = currentScroll
      rafId = requestAnimationFrame(update)
    }
    
    rafId = requestAnimationFrame(update)
    
    return () => cancelAnimationFrame(rafId)
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-[200vh] relative overflow-hidden bg-neutral-950">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <p className="text-green-400 absolute top-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-widest z-10">
          Momentum Parallax
        </p>
        
        {/* Parallax layers */}
        <div className="relative w-[400px] h-[400px]">
          {layers.map((layer, i) => (
            <div
              key={i}
              ref={(el) => { layersRef.current[i] = el }}
              className={`absolute rounded-full ${layer.color} backdrop-blur-sm`}
              style={{
                width: layer.size,
                height: layer.size,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
          
          {/* Center dot */}
          <div className="absolute w-4 h-4 bg-green-400 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <p className="text-neutral-500 absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-lg max-w-md">
          Each layer has different inertia — scroll and watch them continue moving
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function ScrollVelocityShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Scroll Velocity
          </h1>
          <p className="text-xl text-neutral-400">
            Animations that respond to how fast you scroll
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll quickly to see effects
          </div>
        </div>
      </section>
      
      <VelocityText />
      <VelocityMarquee />
      <StretchEffect />
      <MomentumParallax />
      
      {/* Footer */}
      <section className="py-32 text-center bg-neutral-900">
        <p className="text-neutral-500">End of Scroll Velocity Showcase</p>
      </section>
    </div>
  )
}
